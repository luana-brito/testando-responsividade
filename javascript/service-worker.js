// Instalação do Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '../index.html', '../rota.html', '../documentacao.html',
        '../css/style.css', '../css/rota.css', '../css/documentacao.css',
        'script.js', 'rota.js', 'documentacao.js',
        '../icones/icone2.png', '../icones/icone64.png', '../icones/icone128.png', '../icones/mapa.png', '../icones/rota.png', '../icones/documentos.png',
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
