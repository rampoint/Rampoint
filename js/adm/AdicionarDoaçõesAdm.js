const usersRef = database.ref("users");
const formDoacoes = {
  nome: () => document.getElementById("nome-add").value,
  email: () => document.getElementById("email-add").value,
  Peca: () => document.getElementById("search").value,
  Qtd_peca: () => document.getElementById("qtd_peca").value,
  tipo_componente: () => document.getElementById("tipo-componente").value,
  data_doacao: () => document.getElementById("data_doacao").value,
  hora_doacao: () => document.getElementById("hora_doacao").value,
  desc_doacao: () => document.getElementById("descricao-peca").value,
  cod: () => document.getElementById("cod").value,
};

function adicionarDoacao() {
  usersRef
    .orderByChild("email")
    .equalTo(formDoacoes.email())
    .once("value", (snapshot) => {
      console.log(formDoacoes.email());
      if (snapshot.exists()) {
        // O email foi encontrado
        snapshot.forEach((childSnapshot) => {
          const userId = childSnapshot.key; // ID do usuário encontrado
          const data = childSnapshot.val();
          console.log(data);
          // Atualiza ou adiciona dados dentro do nó do usuário
          childSnapshot.ref
            .child("peças")
            .push({
              nome_peca: formDoacoes.Peca(),
              nome: formDoacoes.nome(),
              nomeAdm: localStorage.getItem("nomeAdm"),
              email: formDoacoes.email(),
              qtd: formDoacoes.Qtd_peca(),
              tipo: formDoacoes.tipo_componente(),
              data: formDoacoes.data_doacao(),
              hora_doacao: formDoacoes.hora_doacao(),
              desc: formDoacoes.desc_doacao(),
              pontos: mostrarValor() * formDoacoes.Qtd_peca(),
              vistoria: "Pendente",
              // Atualiza o novo campo com o novo valor
            })
            .then(() => {
              mostrarPopupAdicionando();
            })
            .catch((error) => {
              alert("Erro ao atualizar os dados:", error);
            });
        });
      } else {
        alert("Email não encontrado");
      }
    });
}

// Chame a função após o login ou quando necessário

function pegarCod() {
  var cod = formDoacoes.cod();
  console.log(cod);
  const usersRefCod = database.ref("doacoes/" + cod);
  usersRefCod.on("value", (snapshot) => {
    const data = snapshot.val();
    var tipo = data.tipo;
    document.getElementById("nome-add").value = data.nome;
    document.getElementById("email-add").value = data.email;
    document.getElementById("tel").value = data.tel;
    document.getElementById("qtd_peca").value = data.qtd;
    document.getElementById("search").value = data.nome_peca;
    document.getElementById("descricao-peca").value = data.desc;
    document.getElementById("tipo-placeholder").innerHTML = data.tipo;
    document.getElementById("tipo-placeholder").value = data.tipo;

  });
}

function mostrarValor() {
  const input = document.getElementById("search").value;
  const options = document.querySelectorAll("#Pecas option");
  let valorEncontrado = null;

  options.forEach((option) => {
    if (input === option.value) {
      valorEncontrado = option.textContent;
      return valorEncontrado; // Retorna a quantidade em ramcoins
    }
  });

  if (valorEncontrado) {
    console.log(`O valor para "${input}" é: ${valorEncontrado} ramcoins.`);
    return valorEncontrado;
  } else {
    console.log("Componente não encontrado.");
  }
}
let globalUserId = null;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    globalUserId = user.uid;
    buscarDadosUsuario(user.uid);
  } else {
    console.log("Nenhum usuário logado.");
  }
});

function buscarDadosUsuario(globalUserId) {
  console.log(globalUserId);
  const dbRef = firebase.database().ref("users/" + globalUserId);
  dbRef
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        const dadosUsuario = snapshot.val();
        localStorage.setItem("nomeAdm", dadosUsuario.nome);
        console.log(localStorage.getItem("nomeAdm"));
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar dados do usuário:", error);
    });
}

function mostrarPopupAdicionando() {
  const popup = document.getElementById("doacao_add");
  // Faz o pop-up deslizar para baixo
  popup.style.top = "100px"; // Ajuste a posição conforme necessário

  // Após 3 segundos, faz o pop-up deslizar de volta para cima
  setTimeout(() => {
    popup.style.top = "-120px"; // Volta para fora da tela
  }, 3000); // 3000 milissegundos = 3 segundos
}
