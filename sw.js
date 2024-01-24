const staticCacheName = 'site-static'
const assets = [
  '/',
  '/index.html',
  'pages/',
  'pages/index.html',
  '/js/app.js',
  '/styles/style.css',
  '/src/index.js',
  '/assets/shopping-bag.png',
  'https://65addbab1dfbae409a737b66.mockapi.io/api/v1/products'
];


self.addEventListener('install', evt => {
  // evt.waitUntil(
  //   caches.open(staticCacheName).then(cache => {
  //     cache.addAll(assets);
  //   })
  // );
});

self.addEventListener('activate', evt => {
  // evt.waitUntil(
  //   caches.open(staticCacheName).then(cache => {
  //     cache.addAll(assets);
  //   })
  // );
});

self.addEventListener('fetch', evt => {
  // evt.respondWith(
  //   caches.match(evt.request).then(cacheRes => {
  //     return cacheRes || fetch(evt.request);
  //   })
  // )
})