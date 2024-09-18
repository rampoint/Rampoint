// Firebase Authentication and User Management
// Utility Functions
const Form = {
  email: () => document.getElementById("email-cadastro"),
  senha: () => document.getElementById("senha-cadastro"),
  nome: () => document.getElementById("Nome"),
  telefone: () => document.getElementById("telefone"),
  genero: () => document.getElementById("genero"),
  confirmarSenha: () => document.getElementById("confirmarSenha"),
  data: () => document.getElementById("data-cadastro"),
  erro_email_register: () => document.getElementById("erro-email-register"),
  erro_data: () => document.getElementById("erro-data"),
  erro_email_obrigatorio: () =>
    document.getElementById("erro-email-obrigatorio"),
  erro_senha_min: () => document.getElementById("erro-senha-min"),
  erro_senha_register: () => document.getElementById("erro-senha-register"),
  erro_senha_obrigatorio: () =>
    document.getElementById("erro-senha-obrigatorio"),
  erro_nao_corresponde: () => document.getElementById("erro-nao-corresponde"),
  cadastrar_button: () => document.getElementById("cadastrar"),
};

const form_usuario = {
  nome_perfil: () => document.getElementById("nome_usuario"),
  email_perfil: () => document.getElementById("email_usuario"),
  emocao_usuario: () => document.getElementById("emocao_usuario"),
  pontos: () => document.getElementById("pontos_usuario"),
  foto_perfil: () => document.getElementById("foto-usuario"),
};

function mudandoBotao(mensagem) {
  Form.cadastrar_button().innerHTML = mensagem;
}

function getErrorMessage(error) {
  if (error.code === "auth/email-already-in-use") {
    return "Usuário já está registrado";
  }
  return error.message;
}

function validarEmail_cadastro() {
  return /\S+@\S+\.\S+/.test(Form.email().value);
}

function calcularIdade(dataNascimento) {
  const hoje = new Date();
  let idade = hoje.getFullYear() - dataNascimento.getFullYear();
  const mesAtual = hoje.getMonth();
  const mesNascimento = dataNascimento.getMonth();

  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && hoje.getDate() < dataNascimento.getDate())
  ) {
    idade--;
  }
  return idade;
}

// User Registration
function register() {
  const email = Form.email().value;
  const senha = Form.senha().value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      mudandoBotao("Cadastrando...");
      let uid = userCredential.user.uid;
      saveUserData(uid, email);
      setTimeout(() => {
        window.location.href = "../../pagina-inicial/inicial.html";
      }, 3000);
    })
    .catch((error) => {
      mudandoBotao("Cadastrar");
      alert(getErrorMessage(error));
    });
}

function saveUserData(uid, email) {
  const nome = Form.nome().value;
  const telefone = Form.telefone().value;
  const dataNascimento = Form.data().value;
  const genero = Form.genero().value;
  const database = firebase.database();
  const userRef = database.ref("users/" + uid);

  userRef
    .set({
      email: email,
      nome: nome,
      data: dataNascimento,
      tel: telefone,
      genero: genero,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    })
    .then(() => {
      console.log("Dados do usuário salvos com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao salvar dados do usuário:", error);
    });
}

// Form Validation
function onchangeEmail() {
  const email = Form.email().value;
  Form.erro_email_obrigatorio().style.display = email ? "none" : "block";
  Form.erro_email_register().style.display = validarEmail_cadastro(email)
    ? "none"
    : "block";
  botaoDesativar();
}

function onchangePassword() {
  const senha = Form.senha().value;
  Form.erro_senha_register().style.display = senha ? "none" : "block";
  Form.erro_senha_min().style.display = senha.length >= 6 ? "none" : "block";
  botaoDesativar();
  validarSenhaCorresponde();
}

function onchangePasswordConfirm() {
  validarSenhaCorresponde();
  botaoDesativar();
}

function validarSenhaCorresponde() {
  const senha = Form.senha().value;
  const confirmarSenha = Form.confirmarSenha().value;
  Form.erro_nao_corresponde().style.display =
    senha === confirmarSenha ? "none" : "block";
}

function botaoDesativar() {
  Form.cadastrar_button().disabled = !isFormValid();
}

function isFormValid() {
  const email = Form.email().value;
  const senha = Form.senha().value;
  const confirmarSenha = Form.confirmarSenha().value;

  return (
    email &&
    validarEmail_cadastro() &&
    senha &&
    senha.length > 5 &&
    senha === confirmarSenha &&
    VerificarData()
  );
}

function VerificarData() {
  const dataNascimento = new Date(Form.data().value);
  const idade = calcularIdade(dataNascimento);
  const resultado = document.getElementById("erro-data-18");
  if (idade < 18) {
    resultado.style.display = "block";
    return false;
  } else {
    resultado.style.display = "none";
    return true;
  }
}

// User Data Management
let globalUserId = null;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    globalUserId = user.uid;
    buscarDadosUsuario(user.uid);
  } else {
    console.log("Nenhum usuário logado.");
  }
});

function buscarDadosUsuario(uid) {
  const dbRef = firebase.database().ref("users/" + uid);

  dbRef
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        const dadosUsuario = snapshot.val();
        console.log("Dados do usuário:", dadosUsuario);
        exibirDadosUsuario(dadosUsuario);
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar dados do usuário:", error);
    });
}

function exibirDadosUsuario(users) {
  // Obtém a URL atual da página
  var currentPage = window.location.href;

  // Verifica se a URL contém uma string específica
  if (currentPage.includes("/pagina-inicial/inicial.html")) {
    document.getElementById("nome_modal").innerHTML = users.nome;
  } else if (currentPage.includes("/pagina-perfil/")) {
    form_usuario.nome_perfil().innerHTML = users.nome;
    form_usuario.email_perfil().innerHTML = users.email;
    document.getElementById("nome-mudar").placeholder = users.nome;
    document.getElementById("email-mudar").placeholder = users.email;
    document.getElementById("telefone-mudar").placeholder = users.tel;
    document.getElementById("nome-mudar").value = users.nome;
    document.getElementById("email-mudar").value = users.email;
    document.getElementById("telefone-mudar").value = users.tel;
    document.getElementById("medalha-azul").style.display =
      users.medalhas.azul.display;
    document.getElementById("medalha-azul-img").src = users.medalhas.azul.img;
    document.getElementById("nome_modal").innerHTML = users.nome;
    document.getElementById('foto-usuario').src = users.fotoPerfil.fotoPerfil
    console.log(users.fotoPerfil.fotoPerfil)
  } else {
    console.log("O usuário está em outra página");
  }
}

function mudarDados() {
  const nome_mudanca = document.getElementById("nome-mudar").value;
  const telefone_mudanca = document.getElementById("telefone-mudar").value;
  const genero_mudanca = document.getElementById("genero-mudar").value;
  const userRef = firebase.database().ref("users/" + globalUserId);
  userRef
    .update({
      nome: nome_mudanca,
      tel: telefone_mudanca,
      genero: genero_mudanca,
    })
    .then(() => {
      adicionarMedalhas();
      alert("Dados do usuário modificados com sucesso");
    });
}

function adicionarMedalhas() {
  const userRef = firebase.database().ref("users/" + globalUserId);
  userRef
    .child("medalhas/azul")
    .set({
      nome: "Engrenagem Solidária",
      display: "flex",
      descricao: "Personalizou perfil",
      img: "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/medalhas%2Fmedalha%20azul.svg?alt=media&token=c7134715-8121-44cb-9823-9a013761513d",
    })
    .then(() => {
      console.log("enviado para o banco");
    })
    .catch((error) => {
      console.log("nao foi esse o motivo" + error);
    });
}

function apagandoUsuario() {
  const user = firebase.auth().currentUser;

  user
    .delete()
    .then(() => {
      alert('apagado filho')
      logout()
    })
    .catch((error) => {
      alert("nao apagado essa porra" + error.code)
      // ...
    });

    const userRef = firebase.database().ref("users/" + globalUserId);

    userRef.remove().
    then(() =>{
      alert('excluido do banco tambem slc')
    })
    .catch((error) => {
      alert('receba ta errado')
    })
}
