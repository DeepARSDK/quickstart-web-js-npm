import { DeepAR } from 'deepar';
import deeparWasmPath from 'deepar/wasm/deepar.wasm';
import faceTrackingModelPath from 'deepar/models/face/models-68-extreme.bin';
import segmentationModelPath from 'deepar/models/segmentation/segmentation-160x160-opt.bin';
import poseEstimationWasmPath from 'deepar/wasm/libxzimgPoseEstimation.wasm';
import footDetectorPath from 'deepar/models/foot/foot-detector-android.bin';
import footTrackerPath from 'deepar/models/foot/foot-tracker-android.bin';
import footObjPath from 'deepar/models/foot/foot-model.obj';
import * as effects from './effects';


const canvas = document.getElementById('deepar-canvas');
canvas.width = window.innerWidth > window.innerHeight ? Math.floor(window.innerHeight * 0.66) : window.innerWidth;
canvas.height = window.innerHeight;

const deepAR = new DeepAR({
  licenseKey: 'your_license_key_goes_here',
  deeparWasmPath,
  canvas,
  segmentationConfig: {
    modelPath: segmentationModelPath,
  },
  footTrackingConfig: {
    poseEstimationWasmPath,
    detectorPath: footDetectorPath,
    trackerPath: footTrackerPath,
    objPath: footObjPath,
  },
  callbacks: {
    onInitialize: () => {
      // start video immediately after the initalization, mirror = true
      deepAR.startVideo(true);

      // or we can setup the video element externally and call deepAR.setVideoElement (see startExternalVideo function below)

      deepAR.switchEffect(0, 'slot', effects.background_segmentation, () => {
        // effect loaded
      });
    }
  },
});

deepAR.callbacks.onCameraPermissionAsked = () => {
  console.log('camera permission asked');
};

deepAR.callbacks.onCameraPermissionGranted = () => {
  console.log('camera permission granted');
};

deepAR.callbacks.onCameraPermissionDenied = () => {
  console.log('camera permission denied');
};

deepAR.callbacks.onScreenshotTaken = (photo) => {
  console.log('screenshot taken ' + photo);
};

deepAR.callbacks.onImageVisibilityChanged = (visible) => {
  console.log('image visible ' + visible);
};

deepAR.callbacks.onFaceVisibilityChanged = (visible) => {
  console.log('face visible ' + visible);
};

deepAR.callbacks.onVideoStarted = () => {
  const loaderWrapper = document.getElementById('loader-wrapper');
  loaderWrapper.style.display = 'none';
};

deepAR.downloadFaceTrackingModel(faceTrackingModelPath);

let isRecording = false;
document.getElementById('recording-btn').onclick = (e) => {
  if (!isRecording) {
    isRecording = true;
    deepAR.startVideoRecording();
    console.log("Recording started!");
  } else {
    deepAR.finishVideoRecording((video) => {
      window.open(URL.createObjectURL(video), '_blank').focus();
      console.log("Recording finished!");
      isRecording = false;
    });
  }
};

// Store video objects for cleanup
let videoObjects = {};

function startExternalVideo() {
  cleanupVideoObjects();
  // create video element
  const video = document.createElement('video');
  video.muted = true;
  video.loop = true;
  video.controls = true;
  video.setAttribute('playsinline', 'playsinline');
  video.style.width = '100%';
  video.style.height = '100%';

  // put it somewhere in the DOM
  const videoContainer = document.createElement('div');
  videoContainer.appendChild(video);
  videoContainer.style.width = '1px';
  videoContainer.style.height = '1px';
  videoContainer.style.position = 'absolute';
  videoContainer.style.top = '0px';
  videoContainer.style.left = '0px';
  videoContainer.style['z-index'] = '-1';
  document.body.appendChild(videoContainer);

  videoObjects.videoContainer = videoContainer;
  videoObjects.video = video;

  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    try {
      video.srcObject = stream;
    } catch (error) {
      video.src = URL.createObjectURL(stream);
    }
    setTimeout(function () {
      video.play();
    }, 50);
  }).catch(function (error) {
    console.log('error in video play:', error);
  });

  // tell the DeepAR SDK about our new video element
  deepAR.setVideoElement(video, true);

  const loaderWrapper = document.getElementById('loader-wrapper');
  loaderWrapper.style.display = 'none';
}

function cleanupVideoObjects() {
  if (videoObjects.length > 0) {
    videoObjects.videoContainer.parentNode.removeChild(videoObjects.videoContainer);
    videoObjects.videoContainer = null;
    if (videoObjects.video.srcObject) {
      // getUserMedia starts a stream, all tracks on all streams need to be stopped before calling getUserMedia again
      videoObjects.video.srcObject.getTracks().forEach((track) => track.stop());
    }
    videoObjects.video.pause();
    videoObjects = {};
  }
}

// Position the carousel to cover the canvas
if (window.innerWidth > window.innerHeight) {
  const width = Math.floor(window.innerHeight * 0.66);
  const carousel = document.getElementsByClassName('effect-carousel')[0];
  carousel.style.width = width + 'px';
  carousel.style.marginLeft = (window.innerWidth - width) / 2 + "px";
}


$(document).ready(function () {
  $('.effect-carousel').slick({
    slidesToShow: 1,
    centerMode: true,
    focusOnSelect: true,
    arrows: false,
    accessibility: false,
    variableWidth: true,
  });

  const effectList = [
    effects.background_segmentation,
    effects.aviators,
    effects.beard,
    effects.dalmatian,
    effects.flowers,
    effects.koala,
    effects.lion,
    effects.teddycigar,
  ];

  $('.effect-carousel').on('afterChange', function (event, slick, currentSlide) {
    deepAR.switchEffect(0, 'slot', effectList[currentSlide]);
  });
});
