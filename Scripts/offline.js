/*
 This is the part that would make the website work offline by cacheing all the assets of the website to the users broweser. 
  The service worker will intercept all network requests and serve the cached assets when the user is offline, ensuring that the website remains functional even without an internet connection.
  you will need to complete this on your end./*/


const CACHE_NAME = 'offline-v1'; // you can change this if you want to would not really matter 
const ASSETS = [// costant vars full of the assets of the website that will be cached to the users browser 
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
self.addEventListener('install', event => {// adds an event listener to the service worker that listens for the install event 
  event.waitUntil(// waits until the promise is resolved before finishing the intall event
    caches.open(CACHE_NAME)// opens a cache with the name defined in CACHE_NAME
      .then(cache => cache.addAll(ASSETS))// adds all the assets defined in ASSETS to the cache
  );
  });

// Serve cached content when offline
self.addEventListener('fetch', event => {// adds an event listener to the service worker that listens for the fetch event 
  event.respondWith(// responds with the cached asset if it exists, otherwise it fetches the asset from the network
    caches.match(event.request)// checks if the request matches any of the cached assets
      .then(response => response || fetch(event.request))// if the response is found in the cache it is returned, otherwise it fetches the asset from the network
      .catch(() => {// if there is an error fetching the asset from the network it will fetch the asset from the cache 
        // Optionally return a fallback page or asset
        return caches.match('/index.html');// if the asset is not found in the cache it will return the main HTML page as a fallback
      })
  );
});

if ('serviceWorker' in navigator) {// checks if the browser supports service workers 
  window.addEventListener('load', () => {// adds an event listener to the window that listens for the load event 
      navigator.serviceWorker.register('/Scripts/offline.js')// registers the service worker with the file defined in the path
          .then(registration => {// if the registration is successful it will log the scope of the service worker to the console
              console.log('Service Worker registered with scope:', registration.scope);// logs the scope of the service worker to the console
          })
          .catch(error => {// if there is an error registering the service worker it will log the error to the console 
              console.error('Service Worker registration failed:', error);// logs the error to the console
          });
  });
}