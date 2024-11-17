let map;

function initMap(lat, long) {
  const barueri = { lat: lat, lng: long };
  console.log(barueri); // Coordenadas de Barueri
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: barueri,
  });

  const request = {
    location: barueri,
    radius: "3000", // Raio em metros para buscar ecopontos
    keyword: "ecoponto", // Palavra-chave para busca
  };
  document.getElementById("lugares").innerHTML = "";
  const service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        getPlaceDetails(results[i]);
      }
    } else {
      console.error("Erro ao buscar ecopontos:", status);
    }
  });
}

function getPlaceDetails(place) {
  const service = new google.maps.places.PlacesService(map);
  service.getDetails({ placeId: place.place_id }, (details, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      createMarker(details);
      criarTabelaMapa(details);
    } else {
      console.error("Erro ao obter detalhes do lugar:", status);
    }
  });
}

function createMarker(place) {
  const marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    title: place.name,
  });

  const infowindow = new google.maps.InfoWindow();
  let contentString = `<div class="infowindow-content">
                            <strong>${place.name}</strong><br>
                            ${
                              place.formatted_address
                                ? place.formatted_address
                                : "Endereço não disponível"
                            }<br>
                            ${
                              place.formatted_phone_number
                                ? place.formatted_phone_number
                                : "Telefone não disponível"
                            }<br>`;

  // Adiciona a imagem se disponível
  if (place.photos && place.photos.length > 0) {
    const photoUrl = place.photos[0].getUrl({ maxWidth: 200 }); // Obtém a URL da primeira foto
    contentString += `<img src="${photoUrl}" class="imagem-ecoponto" alt="Foto de ${place.name}">`;
  } else {
    contentString += "<p>Imagem não disponível</p>";
  }

  contentString += "</div>";

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });
}

function criarTabelaMapa(ecoponto) {
  // Cria um novo elemento <section>
  var lugar = document.createElement("section");
  lugar.classList.add("card");
  // Adiciona o conteúdo HTML ao lugar
  lugar.innerHTML = `
    <div class="card-content">
        <h1 id="info-ecoponto">Ecoponto</h1>
        <h1 id="nome-ecoponto">${ecoponto.name}</h1>
        <p id="texto-endereco"><span id="endereco">Endereço:</span> ${
          ecoponto.formatted_address
        }</p>
        <p><span id="telefone">Telefone:</span> <span class="numero">${
          ecoponto.formatted_phone_number
            ? ecoponto.formatted_phone_number
            : "Telefone não disponível"
        }</span></p>
    </div>
`;

  // Verifica se há fotos e adiciona a imagem
  if (ecoponto.photos && ecoponto.photos.length > 0) {
    const photoUrl = ecoponto.photos[0].getUrl({ width: 500, height: 150 }); // Obtém a URL da primeira foto
    const img = document.createElement("img"); // Cria um novo elemento <img>
    img.src = photoUrl; // Define a URL da imagem
    img.classList.add("imagem-ecoponto"); // Adiciona a classe à imagem
    lugar.appendChild(img); // Adiciona a imagem ao lugar
  }

  // Adiciona o lugar ao contêiner com o ID 'lugares'
  document.getElementById("lugares").appendChild(lugar);
}

document.getElementById("cep").addEventListener("blur", function () {
  pesquisacep(this.value);
});

function limpa_formulário_cep() {
  // Limpa valores do formulário de cep.
  document.getElementById("rua").value = "";
  document.getElementById("bairro").value = "";
}

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
    // Atualiza os campos com os valores.

    document.getElementById("rua").value = conteudo.logradouro;
    document.getElementById("bairro").value = conteudo.bairro;

    const geocoder = new google.maps.Geocoder();

    // Faz a busca usando o nome do local
    geocoder.geocode({ address: conteudo.localidade }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        // Exibe o primeiro resultado encontrado
        const endereco = results[0].formatted_address;
        const latitude = results[0].geometry.location.lat();
        const longitude = results[0].geometry.location.lng();
        console.log(latitude);
        console.log(longitude);
        initMap(latitude, longitude);
      } else {
        document.getElementById("resultado").innerHTML =
          "Nenhum resultado encontrado.";
        console.error("Erro ao buscar endereço:", status);
      }
    });
  } else {
    // CEP não encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
  }
}

function pesquisacep(valor) {
  // Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, "");

  // Verifica se o campo cep possui valor informado.
  if (cep != "") {
    // Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    // Valida o formato do CEP.
    if (validacep.test(cep)) {
      // Preenche os campos com "..." enquanto consulta webservice.
      document.getElementById("rua").value = "...";
      document.getElementById("bairro").value = "...";

      // Cria um elemento javascript.
      var script = document.createElement("script");

      // Sincroniza com o callback.
      script.src =
        "https://viacep.com.br/ws/" + cep + "/json/?callback=meu_callback";

      // Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);
    } else {
      // cep é inválido.
      limpa_formulário_cep();
      alert("Formato de CEP inválido.");
    }
  } else {
    // cep sem valor, limpa formulário.
    limpa_formulário_cep();
  }
}
