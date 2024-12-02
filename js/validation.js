// Import the functions you need from the SDKs you need
//import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUzAILjPJy3zoUVWkD7U4YdI6MDh_QlS4",
  authDomain: "rampoint-81352.firebaseapp.com",
  databaseURL: "https://rampoint-81352-default-rtdb.firebaseio.com",
  projectId: "rampoint-81352",
  storageBucket: "rampoint-81352.appspot.com",
  messagingSenderId: "694254448576",
  appId: "1:694254448576:web:7b78f9707f2625aa9ca225",
  measurementId: "G-5GMT9136G7",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function login() {
  firebase
    .auth()
    .signInWithEmailAndPassword(form.email().value, form.senha().value)
    .then((userCredential) => {
      redirecionar(userCredential)
      
    })
    .catch((error) => {
      alert(getErrorCode(error));
    });
}

function redirecionar(){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      console.log(uid)
      firebase.database().ref().child('users/'+uid).child('cargo').get().then((snapshot) => {
         
        if(snapshot.exists()){
          window.location.href = '../dashboard-adm/dashboard.html'
        }else{window.location.href = '../pagina-inicialLogado/inicial-logado.html'}
      })
    } else {
      
    }
  });
}

function getErrorCode(error) {
  if (error.code == "auth/invalid-credential") {
    return "Usuário não encontrado";
  }
  return error.message;
}

function validarcampoEmail() {
  mudarBotoes();
  mudarErroEmail();
}

function validarcampoSenha() {
  mudarBotoes();
  mudarErroSenha();
}

function emailIsValid() {
  var email = form.email().value;

  if (!email) {
    return false;
  }
  return validarEmail(email);
}

function senhaIsValid() {
  var senha = form.senha().value;
  if (!senha) {
    return false;
  }
  return true;
}

function validarEmail(email) {
  return /\S+@\S+\.\S+/.test(email); // Usa o e-mail do formulário
}

function mudarErroEmail() {
  const email = form.email().value;

  form.email().style.border = email ? "none" : "rgb(193, 91, 91) solid";
  form.erro_email_vazio().style.display = email ? "none" : "block";
}

function mudarErroSenha() {
  const senha = form.senha().value;

  form.senha().style.border = senha ? "none" : "rgb(193, 91, 91) solid";
  form.erro_senha().style.display = senha ? "none" : "block";
}

function mudarBotoes() {
  var email = form.email().value;
  var senha = form.senha().value;

  var emailvalido = emailIsValid();
  form.recuperar_senha().disabled = !emailvalido;

  var senhaValida = senhaIsValid();
  form.entrar().disabled = !senhaValida;
}

function recuperarSenha() {
  const email = form.email().value;
  console.log(email);
  // Supondo que você tenha um campo de entrada com o ID "email"
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      // E-mail de redefinição de senha enviado!
      alert("Um e-mail de redefinição de senha foi enviado para " + email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Trate o erro aqui
      alert("Erro: " + errorMessage);
    });
}


function signInWithMicrosoft() {
  var provider = new firebase.auth.OAuthProvider('microsoft.com');
  firebase.auth().signInWithPopup(provider)
  .then((result) => {
    // IdP data available in result.additionalUserInfo.profile.
    // ...

    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // OAuth access and id tokens can also be retrieved:
    var accessToken = credential.accessToken;
    var idToken = credential.idToken;
    console.log(idToken)
    console.log(accessToken)
  })
  .catch((error) => {
    console.log(error)
  });

}

function googleauth() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;

      // Obtendo os dados do perfil do usuário
      const nomeGoogle = user.displayName; // Nome do usuário
      const emailGoogle = user.email; // E-mail do usuário
      const fotoPerfil = user.photoURL; // URL da foto de perfil
      const uidGoogle = user.uid; // UID do usuário no Firebase

      // Exibindo os dados no console
      console.log('Nome:', nomeGoogle);
      console.log('E-mail:', emailGoogle);
      console.log('UID:', uidGoogle);
      saveUserDataGoogle(uidGoogle, emailGoogle, nomeGoogle);
      setTimeout(() => {
        redirecionar()
      }, 2000);
    })
    .catch((error) => {
      // Tratar erros aqui.
      var errorCode = error.code;
      console.error('Código de erro:', errorCode);
      var errorMessage = error.message;
      console.error('Mensagem de erro:', errorMessage);
      
      // O email da conta usada.
      var email = error.email;
      console.error('Email usado:', email);
      
      // O tipo de credencial utilizada.
      var credential = error.credential;
      console.error('Credencial:', credential);
    });
}

function saveUserDataGoogle(uid, email, nome) {
  const telefone = Form.telefone().value; // Supondo que você tenha um formulário para obter esses dados
  const dataNascimento = Form.data().value;
  const genero = Form.genero().value;
  const cep = Form.cep().value;
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
      cep: cep,
      pontos: 0,
    })
    .then(() => {
      console.log("Dados do usuário salvos com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao salvar dados do usuário:", error);
    });
}
//dados pegos de forma mais facil

const form = {
  email: () => document.getElementById("email"),
  senha: () => document.getElementById("senha"),
  erro_senha: () => document.getElementById("erro-senha"),
  erro_email_invalido: () => document.getElementById("erro-login-invalido"),
  erro_email_vazio: () => document.getElementById("erro-login"),
  recuperar_senha: () => document.getElementById("recover-password"),
  entrar: () => document.getElementById("entrar"),
};
