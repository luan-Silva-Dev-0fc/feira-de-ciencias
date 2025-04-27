const CACHE_NAME = 'feira-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/tela-principal.html',
  '/sem-conexao.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna o cache se tiver, senão tenta buscar da internet
        return response || fetch(event.request);
      })
      .catch(() => caches.match('/sem-conexao.html')) // Se não tiver internet, mostra a página offline
  );
});