const CACHE_NAME = 'offline-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/Styles/classes.css',
  '/Styles/colors.css',
  '/Styles/ids.css',
  '/Styles/mobileFriendly.css',
  '/Styles/style.css',
  '/Styles/rebuilt.css',
  '/Scripts/allianceButtonLogic.js',
  '/Scripts/buttonRoute.js',
  '/Scripts/data.js',
  '/Scripts/offline.js',
  '/Scripts/saveQr.js',
  '/Scripts/scoreButton.js',
  '/Scripts/rebuiltGameLogic.js',
  '/Images/App_Logo.png',
  '/Images/Background_Wide.png',
  '/Images/Blue_Alliance_BG.png',
  '/Images/Red_Alliance_BG.png',
  '/Images/Blue_Alliance_Button.png',
  '/Images/Red_Alliance_Button.png',
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
      .catch(() => {
        // Optionally return a fallback page or asset
        return caches.match('/index.html');
      })
  );
});