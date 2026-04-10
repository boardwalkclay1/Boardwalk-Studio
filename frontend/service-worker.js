// ZERO-CACHE, ALWAYS-FRESH SERVICE WORKER

self.addEventListener("install", (event) => {
  // Activate immediately
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Delete ALL caches, permanently
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => caches.delete(key)))
    )
  );

  // Take control immediately
  self.clients.claim();
});

// FETCH: ALWAYS NETWORK, NEVER CACHE, NEVER FALLBACK
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 1. Never touch localhost dev server
  if (url.origin.includes("localhost:3000")) {
    return;
  }

  // 2. Never touch API calls
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  // 3. Always fetch from network, no caching, no fallback
  event.respondWith(fetch(req));
});
