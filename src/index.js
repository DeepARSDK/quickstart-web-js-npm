import * as deepar from 'deepar';

// Log the version. Just in case.
console.log("Deepar version: " + deepar.version);

// Top-level await is not supported.
// So we wrap the whole code in an async function that is called immediatly.
(async function() {

  // Resize the canvas according to screen size.
  const canvas = document.getElementById('deepar-canvas');
  canvas.width = window.innerWidth > window.innerHeight ? Math.floor(window.innerHeight * 0.66) : window.innerWidth;
  canvas.height = window.innerHeight;

  // All the effects are in the public/effects folder.
  // Here we define the order of effect files.
  const effectList = [
    'effects/viking_helmet.deepar',
    'effects/MakeupLook.deepar',
    'effects/Split_View_Look.deepar',
    'effects/flower_face.deepar',
    'effects/Stallone.deepar',
    'effects/galaxy_background_web.deepar',
    'effects/Humanoid.deepar',
    'effects/Neon_Devil_Horns.deepar',
    'effects/Ping_Pong.deepar',
    'effects/Pixel_Hearts.deepar',
    'effects/Snail.deepar',
    'effects/Hope.deepar',
    'effects/Vendetta_Mask.deepar',
    'effects/Fire_Effect.deepar',
    'effects/Elephant_Trunk.deepar'
  ];
  
  // Initialize DeepAR with an effect file.
  const deepAR = await deepar.initialize({
    licenseKey: d953b3638fb4b451088dbe2ea30fa7afbb52625add558cd5cab69d85d95b1706e68d07d4da9427a4,
    canvas: canvas,
    rootPath: "./deepar-resources", // See webpack.config.js and package.json build script.
    effect: effectList[0]
  });

  // Hide the loading screen.
  document.getElementById("loader-wrapper").style.display = "none";
  
  // Position the carousel to cover the canvas
  if (window.innerWidth > window.innerHeight) {
    const width = Math.floor(window.innerHeight * 0.66);
    const carousel = document.getElementsByClassName('effect-carousel')[0];
    carousel.style.width = width + 'px';
    carousel.style.marginLeft = (window.innerWidth - width) / 2 + "px";
  }
  
  // Configure carousel.
  $(document).ready(() => {
    $('.effect-carousel').slick({
      slidesToShow: 1,
      centerMode: true,
      focusOnSelect: true,
      arrows: false,
      accessibility: false,
      variableWidth: true,
    });
  
    // Switch the effect when carusel moves.
    $('.effect-carousel').on('afterChange', async function (event, slick, currentSlide) {
      await deepAR.switchEffect(effectList[currentSlide]);
    });


  });

})();
