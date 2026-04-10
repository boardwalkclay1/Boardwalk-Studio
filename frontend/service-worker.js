const CACHE = "boardwalk-studio-v3"; // bump version to force fresh cache

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Network-first, but ONLY fall back to index.html for navigation requests.
// Never return HTML for JS/CSS/etc.
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // If it's a navigation request (user typing URL, clicking link)
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match("/index.html"))
    );
    return;
  }

  // For everything else (JS, CSS, images, API calls):
  // Just pass through to network. No caching.
  event.respondWith(fetch(req));
});
