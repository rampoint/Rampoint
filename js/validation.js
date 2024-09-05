// Import the functions you need from the SDKs you need
//import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUzAILjPJy3zoUVWkD7U4YdI6MDh_QlS4",
  authDomain: "rampoint-81352.firebaseapp.com",
  databaseURL: "https://rampoint-81352-default-rtdb.firebaseio.com",
  projectId: "rampoint-81352",
  storageBucket: "rampoint-81352.appspot.com",
  messagingSenderId: "694254448576",
  appId: "1:694254448576:web:7b78f9707f2625aa9ca225",
  measurementId: "G-5GMT9136G7"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
  window.location.href = "../../pagina-inicial/inicial.html";
  }
});

function login() {
  firebase
    .auth()
    .signInWithEmailAndPassword(form.email().value, form.senha().value)
    .then((response) => {
      window.location.href = "../pagina-inicial/inicial.html";
    })
    .catch((error) => {
      alert(getErrorCode(error));
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
  return /\S+@\S+\.\S+/.test(email);
}

function mudarErroEmail() {
  const email = form.email().value;

  form.email().style.border = email ? "none" : "rgb(193, 91, 91) solid";
  form.erro_email_vazio().style.display = email ? "none" : "block";

  form.email().style.border = validarEmail(email)
    ? "none"
    : "rgb(193, 91, 91) solid";
  form.erro_email_invalido().style.display = validarEmail(email)
    ? "none"
    : "block";
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
