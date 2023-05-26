// Instalação do Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('app-cache').then(function(cache) {
      return cache.addAll([
        '/',
        'script.js', 'rota.js',
        'style.css', 'rota.css', 'documentacao.css',
        'index.html', 'rota.html', 'documentacao.html',
        'documentos.png', 'icone.png', 'mapa.png', 'rota.png',
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
