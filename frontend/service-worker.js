const CACHE = "boardwalk-studio-v1";

const OFFLINE_ASSETS = [
  "./",
  "./index.html",
  "./bw-studio.css",
  "./app.js",
  "./components/CapabilitiesPanel.js",
  "./components/ProjectSwitcher.js",
  "./components/FileTree.js",
  "./components/Editor.js",
  "./components/RunDeployPanel.js",
  "./components/PreviewPanel.js",
  "./components/PluginSlots.js",
  "./components/CloudflarePanel.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(OFFLINE_ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});
