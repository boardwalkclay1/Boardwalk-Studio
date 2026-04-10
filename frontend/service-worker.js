const CACHE = "boardwalk-studio-v2"; // bump version to force fresh cache

self.addEventListener("install", (event) => {
  // Skip waiting so new SW takes control immediately
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Delete ALL old caches
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => caches.delete(key)))
    )
  );

  self.clients.claim();
});

// DO NOT CACHE JS FILES ANYMORE
// Only pass-through to network
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request).catch(() => caches.match("./index.html")));
});
