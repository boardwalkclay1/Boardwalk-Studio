const CACHE = "boardwalk-studio-v4";

// Install: activate immediately
self.addEventListener("install", () => {
  self.skipWaiting();
});

// Activate: clear old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch handler — SAFE VERSION
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // 1. NEVER touch API calls
  if (req.url.includes("/api/")) {
    return; // let network handle it
  }

  // 2. ONLY handle navigation requests (SPA routing)
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match("/index.html"))
    );
    return;
  }

  // 3. Everything else: pass-through
  event.respondWith(fetch(req));
});
