/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-55036c5';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./cirkus_humberto_002.html","./cirkus_humberto_005.html","./cirkus_humberto_006.html","./cirkus_humberto_007.html","./cirkus_humberto_008.html","./cirkus_humberto_009.html","./cirkus_humberto_010.html","./cirkus_humberto_011.html","./cirkus_humberto_012.html","./cirkus_humberto_013.html","./cirkus_humberto_014.html","./cirkus_humberto_015.html","./cirkus_humberto_016.html","./cirkus_humberto_017.html","./cirkus_humberto_018.html","./cirkus_humberto_019.html","./cirkus_humberto_020.html","./cirkus_humberto_021.html","./cirkus_humberto_022.html","./cirkus_humberto_023.html","./cirkus_humberto_024.html","./cirkus_humberto_025.html","./cirkus_humberto_026.html","./cirkus_humberto_027.html","./cirkus_humberto_028.html","./cirkus_humberto_029.html","./cirkus_humberto_030.html","./cirkus_humberto_031.html","./cirkus_humberto_032.html","./cirkus_humberto_033.html","./cirkus_humberto_034.html","./cirkus_humberto_035.html","./cirkus_humberto_036.html","./cirkus_humberto_037.html","./cirkus_humberto_038.html","./cirkus_humberto_039.html","./cirkus_humberto_040.html","./cirkus_humberto_041.html","./cirkus_humberto_042.html","./cirkus_humberto_043.html","./cirkus_humberto_044.html","./cirkus_humberto_045.html","./cirkus_humberto_046.html","./cirkus_humberto_047.html","./cirkus_humberto_048.html","./cirkus_humberto_049.html","./cirkus_humberto_050.html","./cirkus_humberto_051.html","./cirkus_humberto_052.html","./cirkus_humberto_053.html","./cirkus_humberto_054.html","./cirkus_humberto_055.html","./cirkus_humberto_056.html","./cirkus_humberto_057.html","./cirkus_humberto_058.html","./cirkus_humberto_059.html","./cirkus_humberto_060.html","./cirkus_humberto_061.html","./cirkus_humberto_062.html","./colophon.html","./favicon.png","./index.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/image003.png","./resources/obalka.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
