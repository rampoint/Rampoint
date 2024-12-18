const usersRef = database.ref("users");

usersRef.once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        var id = childSnapshot.key;
        const usersChild = database.ref("users/" + id + "/peças");

        usersChild.once("value", (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    var dataPeca = childSnapshot.val();
                    console.log(dataPeca.nome_peca)
                    criarTabela(
                        dataPeca.nome_peca,
                        dataPeca.tipo,
                        dataPeca.email,
                        dataPeca.nome,
                        dataPeca.qtd,
                        childSnapshot.key

                    );
                });
            }
        });
    });
});
function criarTabela(nome_peca, estrutura, email_doador, nome_doador, qtd, id) {
    const novaLinha = document.createElement("tr");

    novaLinha.innerHTML = ` 
    <td>
      <div class="peca">
        <p class="nome-peca" style="margin-left: 1em;">${nome_peca}</p>
      </div>
    </td>
    <td>
      <button class="tipo-estrutura">${estrutura}</button>
    </td>
    <td>
      <p class="nome">${nome_doador}</p>
    </td>
    <td>
      <p class="email">${email_doador}</p>
    </td>
    <td>
      <p class="qtd-total">${qtd}</p>
    </td>
    <td>
      <button onclick=editarDados('${id}') class="btn-vistoria">
        <a>
          <img src="./img/chevron-right.svg" alt="">
        </a>
      </button>
    </td>
  `
    document.getElementById("tbody").appendChild(novaLinha);
}