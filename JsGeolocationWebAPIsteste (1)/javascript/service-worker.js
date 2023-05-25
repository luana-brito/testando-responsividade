// Instalação do Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('app-cache').then(function(cache) {
      return cache.addAll([
        '/',
        'style.css',
        'script.js',
        // Adicione aqui todos os arquivos que você deseja armazenar em cache
      ]);
    })
  );
});

// Intercepta as requisições e busca os recursos em cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
