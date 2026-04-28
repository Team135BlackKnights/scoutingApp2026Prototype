const CACHE_NAME = 'offline-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/classes.css',
  '/colors.css',
  '/ids.css',
  '/mobileFriendly.css',
  '/style.css',
  '/allainceButtonLogic.js',
  '/buttonMap.js',
  '/data.js',
  '/offline.js',
  '/saveQr.js',
  '/scoreButton.js',
  '/App_Logo.png',
  '/Background_Wode.png',
  '/Blue_Alliance_BG.png',
  '/Red_Alliance_BG.png',
  '/Blue)allaince_Button.png',
  '/Red_Alliance_Button.png',
];

// Install and cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
 