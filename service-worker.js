// Kill the old cache completely
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

// Don't cache anything for now - just fetch fresh
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
