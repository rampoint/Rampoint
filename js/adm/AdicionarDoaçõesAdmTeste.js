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
  tel: () => document.getElementById("tel").value,
};

function gerarCodigoAleatorio(tamanho = 8) {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let codigo = "";

  for (let i = 0; i < tamanho; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres[indiceAleatorio];
  }

  return codigo;
}

// Chamada da função para gerar o código

function criarUsuarioDoacao() {
  const codigoGerado = gerarCodigoAleatorio();
  firebase
    .database()
    .ref("doacoes/" + codigoGerado)
    .set({
      nome_peca: formDoacoes.Peca(),
      nome: formDoacoes.nome(),
      email: formDoacoes.email(),
      qtd: formDoacoes.Qtd_peca(),
      tipo: formDoacoes.tipo_componente(),
      data: formDoacoes.data_doacao(),
      hora_doacao: formDoacoes.hora_doacao(),
      desc: formDoacoes.desc_doacao(),
      vistoria: "Pendente",
      tel:formDoacoes.tel()
    })
    .then((snapshot) => {
      console.log("foi pa krai");
    })
    .catch((error) => {
      console.log("nao foi pa krai");
    });
  document.getElementById("codigo").value = codigoGerado;
}
function buscarCodigo(codigoGerado) {
  firebase
    .database()
    .ref("doacoes/" + codigoGerado)
    .get().then((snapshot) => {
      var data = snapshot.val();
      document.getElementById("nome-add").value == data.nome_peca;
      document.getElementById("email-add").value == data.nome;
      document.getElementById("search").value == data.email;
      document.getElementById("qtd_peca").value == data.qtd;
      document.getElementById("tipo-componente").value == data.tipo;
      document.getElementById("descricao-peca").value == data.desc;
      alert('achou né')
    }).catch((error) => {
      alert("nao foi pa krai");
      alert(error);
    });
}
