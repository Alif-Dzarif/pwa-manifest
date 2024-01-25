const staticCacheName = "site-static";

const preCache = [
  '/',
  '/index.html',
  '/pages/',
  '/pages/products.html',
  '/js/app.js',
  '/styles/style.css',
  '/src/index.js',
  '/assets/shopping-bag.png',
  // 'https://65addbab1dfbae409a737b66.mockapi.io/api/v1/products',
  '/pages/fallback.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(staticCacheName)
    cache.addAll(preCache)
  })())
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const cache = await caches.open(staticCacheName);
    const resCache = await cache.match(e.request);

    if (e.request.url.startsWith('http')) {
      if (navigator.onLine) {
        await cache.delete(e.request);
        const res = await fetch(e.request);
        cache.put(e.request, res.clone());
        return res;
      }

      if (resCache) {
        return resCache;
      } else {
        try {
          const res = await fetch(e.request);
          cache.put(e.request, res.clone());
          return res;
        } catch (error) {
          console.log(error);
        }
      }
    }
  })());
});
