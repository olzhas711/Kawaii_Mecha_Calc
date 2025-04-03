const CACHE_NAME = 'anime-calc-v1';
const urlsToCache = [
  '/Kawaii_Mecha_Calc/',
  '/Kawaii_Mecha_Calc/index.html',
  '/Kawaii_Mecha_Calc/manifest.json',
  '/Kawaii_Mecha_Calc/kawaii-character1.webp',
  '/Kawaii_Mecha_Calc/kawaii-character2.webp',
  '/Kawaii_Mecha_Calc/kawaii-character3.webp',
  '/Kawaii_Mecha_Calc/mecha-character1.webp',
  '/Kawaii_Mecha_Calc/mecha-character2.webp',
  '/Kawaii_Mecha_Calc/mecha-character3.webp',
  '/Kawaii_Mecha_Calc/service-worker.js',
  'https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.8.0/math.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.21.2/babel.min.js',
  'https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@700&family=Fredoka+One&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    }).catch(err => console.log('Cache error:', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => caches.match('/Kawaii_Mecha_Calc/index.html'))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
});