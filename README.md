# quickstart-web-npm-js

## Using DeepAR in Chrome extension

Make sure to use the [deepar](https://www.npmjs.com/package/deepar) npm package with a `chromeExtension` version.
For example `deepar@5.2.0-chromeExtension`.

To use DeepAR inside Chrome extension add the following CSP to manifest.
```json lines
"content_security_policy": {
  "extension_pages": "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';"
}
```
It is important to have `wasm-unsafe-eval` CSP flag otherwise Chrome extension cannot execute wasm code that is needed to run DeepAR.

> ⚠️ DeepAR cannot run inside Sandbox pages.


- Contact DeepAR Support to setup dev and prod license keys for Chrome extension.
- Paste license key into `src/index.js` (replace `your_license_key_goes_here`).
- Run `npm install`.
- Run `npm run build`.
- The `dist` folder now contains the Chrome extension packet.

