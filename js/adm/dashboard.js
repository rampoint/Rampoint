const usersRef = database.ref("users");
usersRef.once("value", (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    var id = childSnapshot.key;
    const usersChild = database.ref("users/" + id + "/peças");
    const userProfile = database.ref("users/" + id);

    userProfile.once("value", (snapshot) => {
      if (snapshot.exists()) {
        var perfil = snapshot.val();
      }
    });

    usersChild.once("value", (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          var nome_pecas = childSnapshot.key;
          var dataPeca = childSnapshot.val();

          criarTabela(dataPeca.nome, dataPeca.hora_doacao, childSnapshot.key);
        });
      }
    });
  });
});

function criarTabela(nome_doador, hora) {
  const novaLinha = document.createElement("tr");

  novaLinha.innerHTML = `
  <article class="grupo-mensagem">
  <img src="./img/perfilADM.svg" alt="Perfil" />
  <div class="coluna-mensagem">
    <h4 class="titulo-mensagem">Nova doação!</h4>
    <p class="mensagem">
      Nome do doador:<span class="span-mensagem">
        ${nome_doador}</span>
    </p>
  </div>
  <p class="horario">${hora}</p>
</article>
<div class="linha"></div>`;

  // Adiciona a nova linha ao corpo da tabela
  document
    .getElementsByClassName("fundo-notificacoes")[0]
    .appendChild(novaLinha);
}

function pegarUltimasTresPecasDeTodosUsuarios() {
  const referenciaUsuarios = firebase.database().ref("users");

  // Usando onValue para escutar mudanças nos dados dos usuários
  referenciaUsuarios.on("value", (snapshot) => {
    const dadosUsuarios = snapshot.val();
    if (dadosUsuarios) {
      Object.keys(dadosUsuarios).forEach((userId) => {
        pegarUltimasTresPecas(userId);
      });
    } else {
      console.log("Nenhum usuário encontrado.");
    }
  });
}

// Função para pegar as últimas 3 peças do usuário
function pegarUltimasTresPecas(userId) {
  const referenciaPecas = firebase.database().ref(`users/${userId}/peças`);

  // Criando uma consulta para limitar a 3 peças mais recentes
  const consultaUltimasTresPecas = referenciaPecas.limitToLast(3);

  // Usando onValue para escutar mudanças nos dados das peças
  consultaUltimasTresPecas.on("value", (snapshot) => {
    const dadosPecas = snapshot.val();
    if (dadosPecas) {
      const arrayPecas = Object.values(dadosPecas);
      exibirPecas(userId, arrayPecas.reverse()); // Exibir as peças em ordem correta
    } else {
      console.log(`Nenhuma peça encontrada para o usuário ${userId}.`);
    }
  });
}

// Função para exibir os dados das peças no console ou em outro lugar desejado
function exibirPecas(userId, pecas) {
  console.log(`Últimas 3 peças do usuário ${userId}:`);
  pecas.forEach((peca) => {
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
  <td>${peca.nome}</td>
  <td>${peca.nome_peca}</td>
  <td>${peca.data}</td>
  `;

    // Adiciona a nova linha ao corpo da tabela
    document.getElementById("ultimas_doacoes").appendChild(novaLinha);
    console.log(`Nome da Peça: ${peca.nome_peca}`);
    console.log(`Descrição: ${peca.desc}`);
    console.log(`Pontos: ${peca.pontos}`);
    console.log(`Data de Doação: ${peca.data}`);
    console.log("-----------------------");
  });
}

// Chame a função para buscar as últimas 3 peças de todos os usuários
pegarUltimasTresPecasDeTodosUsuarios();
