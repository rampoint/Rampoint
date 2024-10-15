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
          var nome_pecas = childSnapshot.key;
          var dataPeca = childSnapshot.val();

          criarTabela(
            dataPeca.nome_peca,
            dataPeca.tipo,
            dataPeca.email,
            dataPeca.nome,
            dataPeca.qtd,
            dataPeca.vistoria,
            childSnapshot.key

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
  key
) {
  const novaLinha = document.createElement("tr");

  novaLinha.innerHTML = `
        <td>
            <div class="peca">
                <img src="./img/gabinete.svg" id="gabinete" alt="Imagem de um gabinete">
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
                <img src="img/excluir.png" id="excluir_editar" onclick="excluirDoacao('${key}')" alt="" srcset="">
                <img src="img/editar.png" id="lapis_editar" onclick="editarDados('${key}')" alt="" srcset="">
        </td>`;

  // Adiciona a nova linha ao corpo da tabela
  document.getElementById("tbody").appendChild(novaLinha);
}

function excluirDoacao(id) {
  usersRef.once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      var ids = childSnapshot.key;
    database.ref('users/'+ids+'/peças/'+id).remove().then(() =>{
        alert('doação removida com sucesso')
    })
})
  })
}


function pegarIdUrl(){
  const urlParams = new URLSearchParams(window.location.search)
  console.log(urlParams.get('id'))
}

function editarDados(id){
  window.location.href = '../../check-vistoria-adm/check-vistoria.html?id='+id
}