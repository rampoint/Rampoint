function initMap() {
  // Define a localização do centro de Barueri
  const barueriLocation = { lat: -23.5015, lng: -46.8757 }; // Coordenadas aproximadas do centro

  // Cria um novo mapa
  const map = new google.maps.Map(document.getElementById("map"), {
      center: barueriLocation,
      zoom: 13,
  });

  // Cria um marcador para o centro de Barueri
  const marker = new google.maps.Marker({
      position: barueriLocation,
      map: map,
      title: "Centro de Barueri"
  });

  // Define o serviço de busca de lugares
  const service = new google.maps.places.PlacesService(map);

  // Configura a requisição para buscar ecopontos
  const request = {
      location: barueriLocation,
      radius: '50000', // Raio em metros
      type: ['point_of_interest'], // Tipo de lugar
      keyword: 'ecoponto' // Palavra-chave para filtrar ecopontos
  };

  // Faz a busca por lugares
  service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
          if (results.length > 0) {
              const ecopontoMaisProximo = results[0]; // Pega o primeiro ecoponto encontrado
              createMarker(ecopontoMaisProximo); // Cria um marcador no mapa

              // Calcula a distância até o ecoponto mais próximo
              calcularDistancia(barueriLocation, ecopontoMaisProximo.geometry.location);

              // Obtém o endereço formatado do ecoponto
              obterEndereco(ecopontoMaisProximo.place_id);
          } else {
              document.getElementById("distancia").innerText = "Nenhum ecoponto encontrado.";
          }
      } else {
          console.error('Erro ao buscar ecopontos:', status);
      }
  });

  // Função para criar marcadores no mapa
  function createMarker(place) {
      const marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          title: place.name,
      });

      // Adiciona um evento de clique para exibir informações sobre o lugar
      google.maps.event.addListener(marker, 'click', () => {
          const infowindow = new google.maps.InfoWindow();
          infowindow.setContent(place.name);
          infowindow.open(map, marker);
      });
  }

  // Função para calcular a distância entre dois pontos
  function calcularDistancia(origem, destino) {
      const distanceService = new google.maps.DistanceMatrixService();
      distanceService.getDistanceMatrix({
          origins: [origem],
          destinations: [destino],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
      }, (response, status) => {
          if (status === google.maps.DistanceMatrixStatus.OK) {
              const distanciaEmMetros = response.rows[0].elements[0].distance.value; // Pega a distância em metros
              const distanciaEmKm = (distanciaEmMetros / 1000).toFixed(2); // Converte para quilômetros e formata com duas casas decimais
              document.getElementById("distancia").innerText = "Distância até o ecoponto mais próximo: " + distanciaEmKm + " km"; // Exibe no HTML
          } else {
              console.error('Erro ao calcular a distância:', status);
          }
      });
  }

  // Função para obter o endereço formatado do ecoponto usando seu place_id
  function obterEndereco(placeId) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ placeId: placeId }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results[0]) {
              const enderecoFormatado = results[0].formatted_address; // Pega o endereço formatado
              document.getElementById("texto-endereco").innerText = "Endereço do ecoponto mais próximo: " + enderecoFormatado; // Exibe no HTML
          } else {
              console.error('Erro ao obter o endereço:', status);
          }
      });
  }
}

// Inicializa o mapa quando a página carrega
window.onload = initMap;