const CACHE_NAME = "meu-cache-v1";
const urlsToCache = [
  "/feira-de-ciencias/index.html",
  "/feira-de-ciencias/tela-principal.html",
  "/feira-de-ciencias/sem-conexao.html",
  "/feira-de-ciencias/manifest.json"
];

// Instala o Service Worker e guarda os arquivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Tenta buscar online, se não conseguir, pega do cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request)
        .then(response => {
          return response || caches.match('/feira-de-ciencias/sem-conexao.html');
        });
    })
  );
});
