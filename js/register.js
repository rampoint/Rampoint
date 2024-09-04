var currentUser;
// Função para registrar o usuário
function register() {
  const email = Form.email().value;
  const senha = Form.senha().value;

  // Cria um novo usuário com email e senha
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      console.log("Usuário criado com UID:", uid);
      // Salva os dados do usuário no Realtime Database
      saveUserData(uid, email);
      // Redireciona para a página inicial quando o registro for concluído
      //window.location.href = "../../pagina-inicial/inicial.html";
    })
    .catch((error) => {
      // Exibe uma mensagem de erro caso ocorra algum problema no registro
      alert(getErrorMessage(error));
    });
}

// Função para salvar os dados do usuário no Realtime Database
function saveUserData(uid, email) {
  const nome = Form.nome();
  const telefone = Form.telefone().value;
  const dataNascimento = Form.data().value;
  const genero = Form.genero().value;

  const database = firebase.database();
  const userRef = database.ref("users/" + uid);

  // Salva os dados do usuário no Realtime Database
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
      console.error("Código do erro:", error.code);
      console.error("Mensagem do erro:", error.message);
    });
}

// Função para obter a mensagem de erro adequada
function getErrorMessage(error) {
  if (error.code == "auth/email-already-in-use") {
    return "Usuario ja esta registrado";
  }
  return error.message;
}

// Função chamada quando o email é alterado
function onchangeEmail() {
  const email = Form.email().value;

  // Valida se o email é obrigatório
  Form.erro_email_obrigatorio().style.display = email ? "none" : "block";

  // Valida se o email é válido
  Form.erro_email_register().style.display = validarEmail(email)
    ? "none"
    : "block";

  // Desativa o botão de cadastro se o email não for válido
  botaoDesativar();
}

// Função chamada quando a senha é alterada
function onchangePassword() {
  const senha = Form.senha().value;

  // Valida se a senha é obrigatória
  Form.erro_senha_register().style.display = senha ? "none" : "block";

  // Valida se a senha tem pelo menos 6 caracteres
  Form.erro_senha_min().style.display = senha.length >= 6 ? "none" : "block";

  // Desativa o botão de cadastro se a senha não for válida
  botaoDesativar();
  validarSenhaCorresponde();
}

// Função chamada quando a confirmação de senha é alterada
function onchangePasswordConfirm() {
  validarSenhaCorresponde();
  botaoDesativar();
}

// Função para validar se as senhas correspondem
function validarSenhaCorresponde() {
  const senha = Form.senha().value;
  const confirmarSenha = Form.confirmarSenha().value;

  Form.erro_nao_corresponde().style.display =
    senha == confirmarSenha ? "none" : "block";
}

// Função para desativar o botão de cadastro se o formulário não for válido
function botaoDesativar() {
  Form.cadastrar_button().disabled = !isFormValid();
}

// Função para validar se o formulário é válido
function isFormValid() {
  const email = Form.email().value;
  if (!email || !validarEmail()) {
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

// Função para validar o formato do email
function validarEmail() {
  return /\S+@\S+\.\S+/.test(Form.email().value);
}

// Objeto com referências aos elementos do formulário
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
  erro_email_obrigatorio: () =>document.getElementById("erro-email-obrigatorio"),
  erro_senha_min: () => document.getElementById("erro-senha-min"),
  erro_senha_register: () => document.getElementById("erro-senha-register"),
  erro_senha_obrigatorio: () =>document.getElementById("erro-senha-obrigatorio"),
  erro_nao_corresponde: () => document.getElementById("erro-nao-corresponde"),
  cadastrar_button: () => document.getElementById("cadastrar"),
};

// Função para recuperar os dados do usuário
function recuperarDadosUsuario() {
  firebase.auth().onAuthStateChanged((usuario) => {
    if (usuario) {
      console.log("usuario", usuario);
    } else {
      console.log("não há usuarios logados");
    }
  });
  currentUser = firebase.auth().currentUser;
  if (currentUser) {
    console.log("current");
  }

  // const userId = "2tUMtCqlmFVcAs4aoR6OfYFjyof1"; // Certifique-se de que esta função retorna um ID válido
  const userRef = firebase.database().ref(`/users/${userId}`);
  userRef
    .once("value")
    .then((snapshot) => {
      // Seu código para lidar com os dados
      console.log('hasChild', snapshot.hasChild('"2tUMtCqlmFVcAs4aoR6OfYFjyof1"/nome'));
    })
    .catch((error) => {
      console.error("Erro ao recuperar dados:", error);
    });
}

// Objeto com referências aos elementos do perfil do usuário
const form_usuario = {
  nome_perfil: () => document.getElementById("nome_usuario"),
  email_perfil: () => document.getElementById("email_usuario"),
  emocao_usuario: () => document.getElementById("emocao_usuario"),
  pontos: () => document.getElementById("pontos_usuario"),
};
