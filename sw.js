const CACHE = 'ruhani-kotri-v5';
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then(async (c) => {
      await c.add('./index.html');
      await c.add('./manifest.json');
      await c.add('./icon-192.png');
      await c.add('./icon-512.png');
      await c.add('./');
    }).then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => { if (k !== CACHE) return caches.delete(k); }))).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
