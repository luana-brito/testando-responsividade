function initMap(latitude, longitude) {
      const map = L.map('map').setView([latitude, longitude], 15);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 19,
        id: 'mapbox/dark-v10', // Utilizando um estilo dark
        tileSize: 512,
        zoomOffset: -1
      }).addTo(map);

      const marker = L.marker([latitude, longitude]).addTo(map);
    }

    function obterLocalizacao() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            initMap(latitude, longitude);
          },
          function (error) {
            console.error('Erro ao obter a localização:', error.message);
          }
        );
      } else {
        console.error('Geolocalização não é suportada pelo navegador.');
      }
    }
//configuração wpa
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(function(error) {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  }


