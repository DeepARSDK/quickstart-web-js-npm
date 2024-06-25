# deepar

DeepAR Web is an augmented reality SDK
that allows users to integrate advanced, Snapchat-like
face lenses in the browser environment.

DeepAR Web supports:
- Glasses try-on.
- Face filters and masks.
- Background replacement.
- Background blur.
- Shoe try-on.
- AR mini-games.

## Documentation

- Visit official DeepAR docs for Web SDK here https://docs.deepar.ai/deepar-sdk/platforms/web/overview.
- See the official example here: https://github.com/DeepARSDK/quickstart-web-js-npm
- Set up and web ad with DeepAR: https://github.com/DeepARSDK/quickstart-web-ad
- Full API reference [here](https://docs.deepar.ai/deepar-sdk/deep-ar-sdk-for-web/api-reference).

## License key

In order to use the DeepAR Web SDK you need to set up a license key for your web app on [developer.deepar.ai](https://developer.deepar.ai).
1. Create an account: https://developer.deepar.ai/signup.
2. Create a project: https://developer.deepar.ai/projects.
3. Add a web app to the project. Note that you need to specify the domain name which you plan to use for hosting the app.

> ⚠️ The license key property is required both in a production and development (localhost) environment. Development sessions will not count towards your monthly active usage.

## Installation

Using `npm`:

```shell
$ npm install deepar
```

Using `yarn`:

```shell
$ yarn add deepar
```

## Getting started
There are two main ways to get deepar.js in your JavaScript project:
via [script tags](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_JavaScript_within_a_webpage)
or by installing it from [NPM](https://www.npmjs.com/package/deepar)
and using a build tool like
[Parcel](https://parceljs.org/),
[WebPack](https://webpack.js.org/),
or [Rollup](https://rollupjs.org/guide/en).

### via Script tag
Add the following code to an HTML file:
```html
<html>
<head>
  <!-- Load deepar.js -->
  <script src='https://cdn.jsdelivr.net/npm/deepar/js/deepar.js'> </script>
</head>

<body>
  <!-- Div element where AR preview will be inserted -->
  <div style='width: 640px; height: 360px' id='deepar-div'></div>
  <!-- Initialize DeepAR and load AR effect/filter -->
  <script>
    (async function() {
      const deepAR = await deepar.initialize({
        licenseKey: 'your_license_key_here',
        previewElement: document.querySelector('#deepar-div'),
        effect: 'https://cdn.jsdelivr.net/npm/deepar/effects/aviators'
      });
    })();
  </script>
</body>
</html>
```

Alternatively, you can import DeepAR as an ES6 module.

Via `<script type='module'>`.
```html
<script type='module'>
  import * as deepar from 'https://cdn.jsdelivr.net/npm/deepar/js/deepar.esm.js';
</script>
```

Or via dynamic [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import).
```javascript
const deepar = await import('https://cdn.jsdelivr.net/npm/deepar/js/deepar.esm.js');
```

### via NPM
Add deepar.js to your project using [yarn](https://yarnpkg.com/en/) or
[npm](https://docs.npmjs.com/cli/npm).

**Note**: Because we use ES2017 syntax (such as import),
this workflow assumes you are using a modern browser or a
bundler/transpiler to convert your code to something older browsers
understand. However, you are free to use any build tool that you prefer.

```javascript
import * as deepar from 'deepar';

const deepAR = await deepar.initialize({
  licenseKey: 'your_license_key_here', 
  previewElement: document.querySelector('#deepar-canvas'),
  effect: 'https://cdn.jsdelivr.net/npm/deepar/effects/aviators' 
});
```

## Switch effects

AR filters are represented by effect files in DeepAR. You can load them to preview the effect.

Places you can get DeepAR effects:
- Download a free filter pack: https://docs.deepar.ai/deepar-sdk/filters#free-effects-pack-content.
- Visit DeepAR asset store: https://www.store.deepar.ai/
- Create your own filters with [DeepAR Studio](https://www.deepar.ai/creator-studio).

Load an effect using the `switchEffect` method:
```javascript
await deepAR.switchEffect('path/to/effect/alien');
```

## Take screenshot or video

Take a screenshot.
```javascript
// The image is a data url.
const image = await deepAR.takeScreenshot();
```

Record a video.
```javascript
await deepAR.startVideoRecording();
// Video is now recording...
// When user is ready to stop recording.
const video = await deepAR.finishVideoRecording();
```

## Background blur

Enable background blur with strength 5.
```javascript
await deepAR.backgroundBlur(true, 5)
```

## Background replacement

This is also known as background removal or green screen effect.

Enable background replacement with an image of a sunny beach.
```javascript
await deepAR.backgroundReplacement(true, 'images/sunny_beach.png')
```

## Callbacks

DeepAR has some callbacks you can implement for additional informations. For example,
to check if feet are visible in the camera preview.
```javascript
await deepAR.switchEffect('https://cdn.jsdelivr.net/npm/deepar/effects/Shoe');
deepAR.callbacks.onFeetTracked = (leftFoot, rightFoot) => {
    if(leftFoot.detected && rightFoot.detected) {
        console.log('Both foot detected!');
    } else if (leftFoot.detected) {
        console.log('Left foot detected!');
    } else if (rightFoot.detected) {
        console.log('Right foot detected!');
    } else {
        console.log('No feet detected!');
    }
};
```

To remove callback if you don't need it anymore.
```javascript
deepAR.callbacks.onFeetTracked = undefined;
```

## Different video sources

DeepAR will by default use the user facing camera. It will also ask the
camera permission from the user.

Use the back camera on the phones:
```javascript
const deepAR = await deepar.initialize({
  // ...
  additionalOptions: {
      cameraConfig: {
          facingMode: 'environment'
      }
  }
});
```

Set up your own camera or custom video source:
```javascript
const deepAR = await deepar.initialize({
  // ...
  additionalOptions: {
      cameraConfig: {
          disableDefaultCamera: true
      }
  }
});

// HTMLVideoElement that can contain camera or any video.
const video = ...;

deepAR.setVideoElement(video, true);
```

Initialize DeepAR but start the camera later.
This is used when you do not want to ask the camera permission right away.
```javascript
const deepAR = await deepar.initialize({
    // ...
    additionalOptions: {
        cameraConfig: {
            disableDefaultCamera: true
        }
    }
});

// When you want to ask the camera permission and start the camera.
await deepAR.startCamera();
```

## Providing your own canvas for rendering

Create canvas directly in the HTML:
```html
<canvas width='1280' height='720'></canvas>
```

Or you can create it in Javascript.
```javascript
const canvas = document.createElement('canvas');
// Set canvas size, accounting screen resolution (to make it look 🤌 even on high definition displays)
const canvasSize = { width: 640, height: 360 };
const dpr = window.devicePixelRatio || 1;
canvas.style.maxWidth = `${canvasSize.width}px`;
canvas.style.maxHeight = `${canvasSize.height}px`;
canvas.width = Math.floor(canvasSize.width * dpr);
canvas.height = Math.floor(canvasSize.height * dpr);
```

> ⚠️ **Note:** Be sure to set `width` and `height` properties of the `canvas`!

You can always change the canvas dimensions and they don't have to match the
input video resolution. DeepAR will fit the input camera/video stream correctly
to any canvas size.

You pass the canvas when initializing DeepAR.
```javascript
await deepar.initialize({
  canvas: canvas, 
  // ...
});
```

## Download speed optimizations for DeepAR Web

Apart from the main *deepar.js* file and AR effect files, DeepAR uses additional files like:
- WebAssembly (WASM) files.
- ML model files.

Some of them are required and will be downloaded every time. The others will be lazy
downloaded when/if needed.

> ⚠️ DeepAR will by default automatically fetch all additional resources from the [JsDelivr](https://www.jsdelivr.com/) CDN.

Fetching files from JsDelivr is not recommended if you care about download
speeds of DeepAR Web resources. This is because the files on JsDelivr are not compressed.

### Compression

To optimize download speeds, all the DeepAR files should be compressed.
It is recommended to serve DeepAR files from your own server or some CDN which supports file compression.

> If it is supported, you should use [GZip](https://developer.mozilla.org/en-US/docs/Glossary/GZip_compression) or
> [Brotli](https://developer.mozilla.org/en-US/docs/Glossary/Brotli_compression) compression on all DeepAR files which will significantly reduce the
> SDK size. Check out your server/CDN options for compressing files.

### Custom deployment of DeepAR Web

DeepAR Web can be downloaded from [DeepAR Developer Portal](https://developer.deepar.ai/downloads).
But since most users will install DeepAR through NPM, follow the next instructions.

It is recommended to copy `./node_modules/deepar` directory which contains all the DeepAR
files into your distribution (dist) folder.
You can use `rootPath` to set a path to the custom root of the DeepAR SDK. All additional files
that need to be fetched by DeepAR will be resolved against the given `rootPath`.

```javascript
const deepAR = await deepar.initialize({
  // ...
  rootPath: 'path/to/root/deepar/directory'
});
```

> It is recommended to setup the copying of the DeepAR directory as part of you bundler build scripts,
> in case you ever need to updated to a newer version of DeepAR.

#### Specifying paths for each file

Another option, instead of using the DeepAR directory and copying it as-is, is to specify
a path to each file. The advantage of this is that you can use the bundler to keep track of your files.

For example, if using [Webpack](https://webpack.js.org/), you can use it's
[asset modules](https://webpack.js.org/guides/asset-modules/) to import all the files needed.

Pass the file paths in `additionalOptions`.

```javascript
const deepAR = await deepar.initialize({
    // ...
    additinalOptions: {
        faceTrackingConfig: {
            modelPath: 'path/to/deepar/models/face/models-68-extreme.bin'
        },
        segmentationConfig: {
            modelPath: 'path/to/deepar/models/segmentation/segmentation-160x160-opt.bin'
        },
        footTrackingConfig: {
            poseEstimationWasmPath: 'path/to/deepar/wasm/libxzimgPoseEstimation.wasm',
            detectorPath: 'path/to/deepar/models/foot/foot-detection-96x96x6.bin',
            trackerPath: 'path/to/deepar/models/foot/foot-tracker-96x96x18-test.bin',
            objPath: 'path/to/deepar/models/foot/foot-model.obj',
            tfjsBackendWasmPath: 'path/to/deepar/wasm/tfjs-backend-wasm.wasm',
            tfjsBackendWasmSimdPath: 'path/to/deepar/wasm/tfjs-backend-wasm-simd.wasm',
            tfjsBackendWasmThreadedSimdPath: 'path/to/deepar/wasm/tfjs-backend-wasm-threaded-simd.wasm',
        },
        deeparWasmPath: 'path/to/deepar/wasm/deepar.wasm'
    }
});
```

## License

Please see: https://developer.deepar.ai/customer-agreement
