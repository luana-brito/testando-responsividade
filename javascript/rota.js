
// Função para obter as coordenadas (latitude e longitude) pelo CEP
async function getCoordinatesByCep(cep) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${cep}`);
  const data = await response.json();

  if (data.length > 0) {
    const { lat, lon } = data[0];
    return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
  } else {
    throw new Error('Endereço não encontrado');
  }
}
// Função auxiliar para converter graus em radianos
function deg2rad(deg) {
  return (deg * Math.PI) / 180;
}


// Função para exibir a rota no mapa
  function displayRoute(start, end) {
    const map = L.map('map').setView([start.latitude, start.longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    const startMarker = L.marker([start.latitude, start.longitude]).addTo(map);
    const endMarker = L.marker([end.latitude, end.longitude]).addTo(map);

    const routeLine = L.polyline([[start.latitude, start.longitude], [end.latitude, end.longitude]], { color: 'red' }).addTo(map);
    map.fitBounds(routeLine.getBounds());
  }

  
// Envio do formulário
  document.getElementById('routeForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const startCep = document.getElementById('start').value;
    const endCep = document.getElementById('end').value;

    try {
      const startCoordinates = await getCoordinatesByCep(startCep);
      const endCoordinates = await getCoordinatesByCep(endCep);

      displayRoute(startCoordinates, endCoordinates);
    } catch (error) {
      console.error(error);
    }
  });

// Configuração do Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
      console.log('Service Worker registrado com sucesso:', registration);
    })
    .catch(function(error) {
      console.log('Falha ao registrar o Service Worker:', error);
    });
}

