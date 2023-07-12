/**
 * A draggable snap-like carousel, optimized to work smoothly across desktop and mobile devices.
 *
 */

class Carousel {
  /**
   *
   * @param {String} sliderID the ID to query on the page
   * @param {String} sliderClass the className of the slider inner
   * @param {String} slideClass the className of the slider slides
   * @returns
   */
  constructor(
    sliderID,
    sliderClass = "carousel-slider",
    slideClass = "slide",
    centerID = "carousel-center"
  ) {
    // Grab the elements
    this.elem = document.getElementById(sliderID);
    if (this.elem == null) return Carousel.InvalidSliderStructure(sliderID);

    this.slider = this.elem.querySelector(`.${sliderClass}`);
    if (this.slider == null) return Carousel.InvalidSliderStructure(sliderID);

    this.slides = this.slider.querySelectorAll(`.${slideClass}`);
    if (!this.slides.length) return Carousel.InvalidSliderStructure(sliderID);

    this.center = document.getElementById(centerID);
    if (this.center == null) return Carousel.InvalidSliderStructure(sliderID);

    this.center.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });

    // this.slider.style.transition = "transform 0.3s ease";

    // Initialize properties
    this.activeSlide = null;
    this.startSlide = null;
    this.startX = null;
    this.dragStartX = null;
    this.moved = false;
    this.dragStarted = false;
    this.centerClick = false;
    this.activeHoldStarted = false;
    this.onChange = (activeSlide) => {};
    this.onActiveClick = () => {};
    this.onActiveHoldStart = () => {};
    this.onActiveHoldEnd = () => {};

    // Add event listeners
    this.elem.addEventListener("mousedown", (e) => {
      this.onDragStart(e);
    });
    this.elem.addEventListener("touchstart", (e) => {
      this.onDragStart(e);
    });
    this.elem.addEventListener("mouseleave", () => {
      if (this.moved) {
        this.onDragEnd();
      }
    });
    this.elem.addEventListener("mouseup", () => {
      if (this.activeHoldStarted) {
        this.endHoldTimer();
      } else if (this.moved) {
        this.onDragEnd();
      } else {
        // this.activeSlide = null;
        this.dragStarted = false;
        this.elem.classList.remove("active");
        this.slider.style.transition = "transform 0.3s ease";

        this.cancelHoldTimer();

        if (this.centerClick) {
          this.onActiveClick && this.onActiveClick();
        }
        this.centerClick = false;
      }
    });
    this.elem.addEventListener("touchend", () => {
      if (this.activeHoldStarted) {
        this.endHoldTimer();
      } else if (this.moved) {
        this.onDragEnd();
      } else {
        // this.activeSlide = null;
        this.dragStarted = false;
        this.elem.classList.remove("active");
        this.slider.style.transition = "transform 0.3s ease";

        this.cancelHoldTimer();

        // if (this.centerClick) {
        //   this.onActiveClick && this.onActiveClick();
        // }
        this.centerClick = false;
      }
    });
    this.elem.addEventListener("mousemove", (e) => {
      if (this.dragStarted && !this.activeHoldStarted) {
        this.onMove(e);
      }
    });
    this.elem.addEventListener("touchmove", (e) => {
      if (this.dragStarted && !this.activeHoldStarted) {
        this.onMove(e);
      }
    });
    window.addEventListener("resize", () => {
      this.moveToActiveSlide();
    });

    // add event listener to all slides to track clicks
    this.slides.forEach((slide, index) => {
      slide.addEventListener("mouseup", (e) => {
        if (!this.moved) {
          this.elem.classList.remove("active");
          this.setActiveSlide(index);
          this.moveToActiveSlide();
          this.moved = false;
          this.dragStarted = false;
          this.centerClick = false;
        }
      });
    });

    // Set the active slide and classes
    this.setActiveSlide(0);
    this.moveToActiveSlide();
  }

  /**
   * Logs a warning for an invalid slider structure (empty or missing elements)
   *
   * @param {String} sliderID
   */
  static InvalidSliderStructure = (sliderID) => {
    console.warn(
      `The DraggableSlider with ID ${sliderID} will not work as it has some missing elements.`
    );
  };

  /**
   * Get the index of the slide which is closest to the center of the slider
   *
   * @returns {Number} the index of the slide
   */
  getActiveSlide = () => {
    let res = 0;
    for (let i = 1; i < this.slides.length; i++)
      if (
        Math.abs(this.getSlideOffset(i)) < Math.abs(this.getSlideOffset(i - 1))
      )
        res = i;
    return res;
  };

  /**
   * Get the absolute horizontal offset of a slide from the slider's center point
   *
   * @param {Number} slide the index of the slide
   * @returns {Number} the absolute of the offset in pixels
   */
  getSlideOffset = (slide) => {
    let sliderRect = this.elem.getBoundingClientRect();
    let slideRect = this.slides[slide].getBoundingClientRect();
    return (
      slideRect.left +
      slideRect.width / 2 -
      (sliderRect.left + sliderRect.width / 2)
    );
  };

  /**
   * Get the left CSS property value of the slider's inner
   * @returns {Number}
   */
  getInnerLeft = () => {
    let res = parseInt(this.slider.style.transform.split("(")[1]);
    if (isNaN(res) || res == null) return 0;
    return res;
  };

  /**
   * Initialize the active state of the slider
   *
   * @param {Event} e
   */
  onDragStart = (e) => {
    console.log("drag start");
    const centerClick = e.target.id === "carousel-center";

    this.slider.style.transition = "";

    if (centerClick) {
      this.centerClick = true;
    }

    this.elem.classList.add("active");
    this.moved = false;
    this.startX = e.pageX || e.touches[0].pageX;
    this.dragStartX = e.pageX || e.touches[0].pageX;
    this.startSlide = this.activeSlide;
    this.dragStarted = true;

    this.startHoldTimer();
  };

  /**
   * Remove the active state of the slider
   */
  onDragEnd = () => {
    console.log("drag end");
    this.elem.classList.remove("active");
    this.slider.style.transition = "transform 0.3s ease";

    this.cancelHoldTimer();

    this.moveToActiveSlide();
    this.moved = false;
    this.dragStarted = false;
    this.dragStartX = null;
    this.centerClick = false;
  };

  /**
   * Get the touch / mouse move distance and move the slider inner
   *
   * @param {Event} e
   */
  onMove = (e) => {
    let pos = e.pageX || e.touches?.[0].pageX;

    // console.log("on move");
    // console.log("start of drag:", this.startX);
    // console.log("new position:", e.pageX);
    // console.log("new position (touch):", e.touches?.[0].pageX);
    // console.log("pos:", pos);

    const movedDistance = pos - this.dragStartX;
    const moved = movedDistance >= 1 || movedDistance <= -1;

    if (moved) {
      this.moved = true;
      if (this.holdTimer) {
        this.cancelHoldTimer();
      }
    }

    if (!this.elem.classList.contains("active")) return;

    e.preventDefault();

    let dist = pos - this.startX;

    this.startX = pos;
    // this.slider.style.left = this.getInnerLeft() + dist + "px";
    this.slider.style.transform = `translate(${this.getInnerLeft() + dist}px)`;
    this.setActiveSlide(this.getActiveSlide());
    this.centerClick = false;
  };

  /**
   * Move the slider to the active slide
   */
  moveToActiveSlide = () => {
    if (this.activeSlide == null) this.activeSlide = 0;
    this.moveToSlide(this.activeSlide);
  };

  /**
   * Move the slider to a specified slide, to the last one if the number is greater than the
   * amount of slides or to the first one if the number is inferior to zero.
   *
   * @param {Number} slide the index of the slide
   */
  moveToSlide = (slide) => {
    this.slider.style.transform = `translate(${
      this.getInnerLeft() - this.getSlideOffset(this.activeSlide) + "px"
    })`;

    setTimeout(() => {
      this.onChange && this.onChange(this.activeSlide);
    }, 100);
  };

  /**
   * Set a slide as active and update the active class
   *
   * @param {Number} slide the slide to set as active
   */
  setActiveSlide = (slide) => {
    // Edge cases
    if (slide < 0) slide = 0;
    if (slide > this.slides.length - 1) slide = this.slides.length - 1;

    this.activeSlide = slide;
    for (let i = 0; i < this.slides.length; i++) {
      if (i == this.activeSlide) this.slides[i].classList.add("active");
      else this.slides[i].classList.remove("active");
    }
  };

  startHoldTimer = () => {
    console.log("startHoldTimer");
    this.holdTimer = setTimeout(() => {
      console.log("this.moved", this.moved);
      if (!this.moved) {
        this.onActiveHoldStart && this.onActiveHoldStart();
        this.activeHoldStarted = true;
      }
      this.activeHoldStarted = true;
      this.holdTimer = null;
    }, 500); // Customize the delay before 'onActiveHoldStart' event fires
  };

  endHoldTimer = () => {
    console.log("endHoldTimer");
    clearTimeout(this.holdTimer);
    this.activeHoldStarted = false;
    if (this.onActiveHoldEnd) {
      this.onActiveHoldEnd();
    }
  };

  cancelHoldTimer = () => {
    console.log("cancelHoldTimer");
    clearTimeout(this.holdTimer);
  };
}

export default Carousel;
