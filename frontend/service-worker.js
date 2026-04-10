const CACHE = "boardwalk-studio-v5";

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

// Fetch handler — FINAL SAFE VERSION
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 0. NEVER touch localhost dev server (Vite)
  if (url.origin.includes("localhost:3000")) {
    return; // bypass SW entirely
  }

  // 1. NEVER touch API calls
  if (url.pathname.startsWith("/api/")) {
    return; // let backend handle it
  }

  // 2. NEVER touch JS, CSS, images, assets
  if (
    req.destination === "script" ||
    req.destination === "style" ||
    req.destination === "image" ||
    req.destination === "font" ||
    req.destination === "manifest"
  ) {
    event.respondWith(fetch(req));
    return;
  }

  // 3. ONLY handle navigation requests (SPA routing)
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match("/index.html"))
    );
    return;
  }

  // 4. Everything else: pass-through
  event.respondWith(fetch(req));
});
