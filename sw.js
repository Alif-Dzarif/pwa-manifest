const staticCacheName = "site-static";

const dynamicCacheName = "site-dynamic";

const assets = [
  '/',
  '/index.html',
  '/pages/',
  '/pages/products.html',
  '/js/app.js',
  '/styles/style.css',
  '/src/index.js',
  '/assets/shopping-bag.png',
  'https://65addbab1dfbae409a737b66.mockapi.io/api/v1/products',
  '/pages/fallback.html'
];

const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[2]).then(limitCacheSize(name, size));
      }
    })
  })
}

self.addEventListener("online", evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      )
    })
  );
})


self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(dynamicCacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      )
    })
  );
});

self.addEventListener('fetch', evt => {
  if (navigator.onLine) {
    // User is online, fetch the latest data
    evt.respondWith(
      fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          limitCacheSize(dynamicCacheName, 2);
          return fetchRes;
        })
      })
    );
  } else {
    // User is offline, serve the cached data
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request).then(fetchRes => {
          return caches.open(dynamicCacheName).then(cache => {
            cache.put(evt.request.url, fetchRes.clone());
            limitCacheSize(dynamicCacheName, 2);
            return fetchRes;
          })
        });
      }).catch(() => {
        if (evt.request.url.indexOf('.html') > -1) {
          return caches.match('/pages/fallback.html')
        }
      })
    );
  }
});
