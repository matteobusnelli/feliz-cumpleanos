/* Service worker: tutto il gioco resta in cache e funziona anche senza connessione.
   Per pubblicare una nuova versione basta cambiare VERSION. */
const VERSION = 'feliz-v1';
const ASSETS = [
  "./",
  "icons/apple-touch-icon.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "index.html",
  "manifest.webmanifest",
  "vendor/confetti.browser.js",
  "vendor/fonts.css",
  "vendor/fonts/caveat-latin-600-normal.woff2",
  "vendor/fonts/caveat-latin-700-normal.woff2",
  "vendor/fonts/dm-sans-latin-400-italic.woff2",
  "vendor/fonts/dm-sans-latin-400-normal.woff2",
  "vendor/fonts/dm-sans-latin-500-normal.woff2",
  "vendor/fonts/dm-sans-latin-700-normal.woff2",
  "vendor/fonts/unbounded-latin-400-normal.woff2",
  "vendor/fonts/unbounded-latin-600-normal.woff2",
  "vendor/fonts/unbounded-latin-800-normal.woff2",
  "vendor/fonts/unbounded-latin-900-normal.woff2",
  "vendor/gsap.min.js",
  "vendor/three/build/three.module.js",
  "vendor/three/examples/jsm/postprocessing/EffectComposer.js",
  "vendor/three/examples/jsm/postprocessing/MaskPass.js",
  "vendor/three/examples/jsm/postprocessing/OutputPass.js",
  "vendor/three/examples/jsm/postprocessing/Pass.js",
  "vendor/three/examples/jsm/postprocessing/RenderPass.js",
  "vendor/three/examples/jsm/postprocessing/ShaderPass.js",
  "vendor/three/examples/jsm/postprocessing/UnrealBloomPass.js",
  "vendor/three/examples/jsm/shaders/CopyShader.js",
  "vendor/three/examples/jsm/shaders/LuminosityHighPassShader.js",
  "vendor/three/examples/jsm/shaders/OutputShader.js"
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
