const CACHE_NAME = 'offline-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'logo.png', // A imagem local
  'styles.css'
];

// Instala o service worker e adiciona arquivos ao cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Recolhe os arquivos do cache quando não houver internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});