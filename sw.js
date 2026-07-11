const CACHE = 'qr2-v1';
const ASSETS = [
  '/QR/',
  '/QR/index.html',
  '/QR/qr2-part1-logic-foundations.html',
  '/QR/qr2-part2-logic-in-action.html',
  '/QR/qr2-part3-mathematical-modeling.html',
  '/QR/qr2-part4-bivariate-regression.html',
  '/QR/qr2-correlation-regression.html',
  '/QR/qr2-derivatives.html',
  '/QR/qr2-predicates.html',
  '/QR/qr2-quantifiers.html',
  '/QR/icons/icon-192.png',
  '/QR/icons/icon-512.png'
];

// Install: cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clear old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first, fallback to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
