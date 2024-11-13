function editarDados(id) {
  window.location.href = "../../editar-doacoes-adm/editar-doacoes.html?id=" + id;
}

function pegarIdUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

const uid = pegarIdUrl();
acharDoacaoUrl(uid);

function acharDoacaoUrl(uid) {
  const userRef = firebase.database().ref("users");
  
  userRef.once("value").then((childSnapshot) => {
    childSnapshot.forEach((snapshot) => {
      const pieceRef = userRef.child(`${snapshot.key}/peças/${uid}`);
      pieceRef.once("value").then((snapshot) => {
        if (snapshot.exists()) {
          const Dados = snapshot.val();
          mostrarDados(Dados);
        } else {
          console.log("Peça não encontrada.");
        }
      }).catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
    });
  });
}

function mostrarDados(data) {
  document.getElementById("nome-add").value = data.nome;
  document.getElementById("email-add").value = data.email;
  document.getElementById("selected-text").innerHTML = data.tipo;
  document.getElementById("qtd_peca").value = data.qtd;
  document.getElementById("search").value = data.nome_peca;
  document.getElementById("descricao-peca").value = data.desc;
}

const form = {
  nome: () => document.getElementById("nome-add").value,
  email: () => document.getElementById("email-add").value,
  Peca: () => document.getElementById("search").value,
  Qtd_peca: () => document.getElementById("qtd_peca").value,
  tipo_componente: () => document.getElementById("selected-text").innerHTML,
  desc_doacao: () => document.getElementById("descricao-peca").value,
};

function atualizarDados() {

  const userRef = firebase.database().ref("users");


  userRef.once("value").then((childSnapshot) => {

    childSnapshot.forEach((snapshot) => {
      const pieceRef = userRef.child(`${snapshot.key}/peças/${uid}`);
      pieceRef.once('value').then((snapshot) => {
        if(snapshot.exists()){
        pieceRef.update({
          nome_peca: form.Peca(),
          nome: form.nome(),
          email: form.email(),
          qtd: form.Qtd_peca(),
          tipo: form.tipo_componente(),
          desc: form.desc_doacao(),
        })
        .then(() => {
          mostrarPopupEditado()
        })
        .catch((error) => {
          console.error('Erro ao atualizar:', error);
        })}else{
          console.log('ta aqui nao')
        }
      })
      
    });
  });
}

function mostrar() {
  console.log(form.Peca());
  console.log(form.Qtd_peca());
  console.log(form.desc_doacao());
  console.log(form.email());
  console.log(form.nome());
  console.log(form.tipo_componente());
}

function mostrarPopupEditado() {
  const popup = document.getElementById("editar_add");
  // Faz o pop-up deslizar para baixo
  popup.style.top = "100px"; // Ajuste a posição conforme necessário

  // Após 3 segundos, faz o pop-up deslizar de volta para cima
  setTimeout(() => {
    popup.style.top = "-120px"; // Volta para fora da tela
  }, 3000); // 3000 milissegundos = 3 segundos
}
