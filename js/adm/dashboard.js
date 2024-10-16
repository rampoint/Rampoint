const usersRef = database.ref("users");

usersRef.once("value", (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    var id = childSnapshot.key;
    const usersChild = database.ref("users/" + id + "/peças");
    const userProfile = database.ref("users/" + id)

    userProfile.once('value', (snapshot) => {
        if(snapshot.exists()){
            var perfil = snapshot.val()
        }
    })
    
    usersChild.once("value", (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          var nome_pecas = childSnapshot.key;
          var dataPeca = childSnapshot.val();

          criarTabela(
            dataPeca.nome,
            dataPeca.hora_doacao,
            childSnapshot.key

          );
        });
      }
    });
  });
});

function criarTabela(
  nome_doador,
  hora
) {
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
  document.getElementsByClassName("fundo-notificacoes")[0].appendChild(novaLinha);
}