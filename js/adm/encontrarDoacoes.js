const formAdd = {
  nome_peca: () => document.getElementById("nome-peca").innerHTML,
  estrutura: () => document.getElementById("tipo-estrutura").innerHTML,
  email_doador: () => document.getElementById("nome-doador").innerHTML,
  nome_doador: () => document.getElementById("email-doador").innerHTML,
  qtd: () => document.getElementById("email-doador").innerHTML,
  vistoria: () => document.getElementById("status").innerHTML,
};

const usersRef = database.ref("users");

usersRef.once("value", (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    var id = childSnapshot.key;
    const usersChild = database.ref("users/" + id + "/peças");

    usersChild.once("value", (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          var dataPeca = childSnapshot.val();

          criarTabela(
            dataPeca.nome_peca,
            dataPeca.tipo,
            dataPeca.email,
            dataPeca.nome,
            dataPeca.qtd,
            dataPeca.vistoria,
            childSnapshot.key,
            id
          );
        });
      }
    });
  });
});

function criarTabela(
  nome_peca,
  estrutura,
  email_doador,
  nome_doador,
  qtd,
  vistoria,
  key,
  idUser
) {
  const novaLinha = document.createElement("tr");
  
  // Atribuindo um ID único à linha para facilitar a remoção
  novaLinha.setAttribute('id', `peca-${key}`);

  novaLinha.innerHTML = `
        <td>
            <div class="peca">
                <p class="nome-peca">${nome_peca}</p>
            </div>
        </td>
        <td>
            <button class="tipo-estrutura">${estrutura}</button>
        </td>
        <td><p id="nome-peca" class="nome">${nome_doador}</p></td>
        <td><p class="email">${email_doador}</p></td>
        <td><p class="qtd-total">${qtd}</p></td>
        <td>
            <button class="vistoria-${vistoria}">
                <img src="./img/${vistoria}.svg" alt="">
                ${vistoria}
            </button>
        </td>
      <td>
                  <a onclick="excluirDoacao('${key}','${idUser}')"><i class='bx bx-trash-alt' id="excluir_editar"></i></a>
                  <a onclick="editarDados('${key}')"><i class='bx bx-edit-alt' id="lapis_editar"></i></a>
        </td>`;

  // Adiciona a nova linha ao corpo da tabela
  document.getElementById("tbody").appendChild(novaLinha);
}

function excluirDoacao(id, idUser) {
  console.log(id);
  console.log(idUser);
  
  // Remover do banco de dados
  firebase
    .database()
    .ref("users/" + idUser + "/peças/" + id)
    .remove()
    .then(() => {

      
      // Remover a linha da tabela
      const linhaParaRemover = document.getElementById(`peca-${id}`);
      if (linhaParaRemover) {
        linhaParaRemover.remove();
      }
    })
    .catch((error) => {
      console.error("Erro ao remover doação:", error);
      alert("Erro ao remover a doação.");
    });
}

function pegarIdUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("id"));
}