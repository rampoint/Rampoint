// Função para registrar o usuário
function register() {
  const email = Form.email().value;
  const senha = Form.senha().value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      console.log(telefone)
      console.log("Usuário criado com UID:", uid);
      saveUserData(uid, email);

      // Descomente a linha abaixo quando estiver pronto para redirecionar
      // window.location.href = "../../pagina-inicial/inicial.html";
    })
    .catch((error) => {
      alert(getErrorMessage(error));
    });
}

// Função para salvar os dados do usuário no Realtime Database
function saveUserData(uid, email) {

  var nome = Form.nome()
  var telefone = Form.telefone()
  var data_naci = Form.data()
  var genero = Form.genero()
  const database = firebase.database();
  const userRef = database.ref("users/" + uid);
  userRef
    .set({
      email: email,
      nome: nome,
      data: data_naci,
      tel: telefone,
      genero:genero,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    })
    .then(() => {
      console.log("Dados do usuário salvos com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao salvar dados do usuário:", error);
      console.error("Código do erro:", error.code);
      console.error("Mensagem do erro:", error.message);
    });
}
function getErrorMessage(error) {
  if (error.code == "auth/email-already-in-use") {
    return "Usuario ja esta registrado";
  }
  return error.message;
}

function onchangeEmail() {
  const email = Form.email().value;
  Form.erro_email_obrigatorio().style.display = email ? "none" : "block";

  Form.erro_email_register().style.display = validarEmail(email)
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
    senha == confirmarSenha ? "none" : "block";
}

function botaoDesativar() {
  Form.cadastrar_button().disabled = !isFormValid();
}

function isFormValid() {
  const email = Form.email().value;
  if (!email || !ValidarEmail()) {
    return false;
  }
  const senha = Form.senha().value;
  if (!senha || senha.length <= 5) {
    return false;
  }
  const confirmarSenha = Form.confirmarSenha().value;
  if (senha != confirmarSenha) {
    return false;
  }

  return true;
}

function ValidarEmail() {
  return /\S+@\S+\.\S+/.test(Form.email().value);
}
const Form = {
  email: () => document.getElementById("email-cadastro"),
  senha: () => document.getElementById("senha-cadastro"),
  nome: () => document.getElementById('Nome').value,
  telefone: () => document.getElementById('telefone').value,
  genero: () => document.getElementById('genero').value,
  confirmarSenha: () => document.getElementById("confirmarSenha"),
  data: () => document.getElementById("data-cadastro").value,
  erro_email_register: () => document.getElementById("erro-email-register"),
  erro_data: () => document.getElementById("erro-data"),
  erro_email_obrigatorio: () =>document.getElementById("erro-email-obrigatorio"),
  erro_senha_min: () => document.getElementById("erro-senha-min"),
  erro_senha_register: () => document.getElementById("erro-senha-register"),
  erro_senha_obrigatorio: () =>document.getElementById("erro-senha-obrigatorio"),
  erro_nao_corresponde: () => document.getElementById("erro-nao-corresponde"),
  cadastrar_button: () => document.getElementById("cadastrar"),
};
