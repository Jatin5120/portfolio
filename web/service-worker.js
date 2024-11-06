// Cache name
const VERSION = "1.0.0";
const CACHE_NAME = `flutter-app-cache-v${VERSION}`;

// Resources to cache
const RESOURCES = [
  "/",
  "/index.html",
  "/main.dart.js",
  "/flutter.js",
  "/favicon.png",
  "/manifest.json",
  "/assets/fonts/MaterialIcons-Regular.otf",
  "/icons/Icon-192.png",
  "/icons/Icon-512.png",
  "/splash/img/light-1x.png",
  "/splash/img/light-2x.png",
  "/splash/img/light-3x.png",
  "/splash/img/light-4x.png",
  "/splash/img/dark-1x.png",
  "/splash/img/dark-2x.png",
  "/splash/img/dark-3x.png",
  "/splash/img/dark-4x.png",
  "/offline.html",
  "/icons/Icon-maskable-192.png",
  "/icons/Icon-maskable-512.png",
];

// Install service worker and cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(RESOURCES))
  );
});

// Serve cached content when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        if (event.request.mode === "navigate") {
          return caches.match("offline.html");
        }
        return new Response("", {
          status: 408,
          statusText: "Request timed out.",
        });
      });
    })
  );
});

// Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
