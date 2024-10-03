// function escreverMensagem(){
//   var mensagem = 'Entediad'
//   var genero = generoRam()

//   var mensagemGenero = mensagem+genero
//   console.log(mensagemGenero)
// }

function pegarValorFotoFeliz() {
  var ram = document.getElementById("ram-feliz").value;
  var img = "/pagina-perfil/img/notfFeliz-1.svg";

  const userRef = firebase
    .database()
    .ref("users/" + globalUserId)
    .child("fotoPerfil");
  userRef
    .set({
      fotoPerfil:
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2FGroup%20525.svg?alt=media&token=964936c0-bfcf-4ba4-afa5-6c397715b692",
      fotoMensage: ram,
      cor_foto: "#FEBF1F",
      cor_texto: "#FFC01E",
      cor_texto_fundo: "rgb(255, 192, 30, 0.30) 0px 5px 20px",
    })
    .then(() => {
      mostrarPopupAlteracaoMood(img);
      console.log("foto de perfil enviada");
    })
    .catch((error) => {
      console.log("Foto não enviada" + error);
    });
  console.log(ram);
  console.log(globalUserId);
}

function pegarValorFotoEmocionado() {
  var ram = document.getElementById("ram-emocionado").value;
  var img = "/pagina-perfil/img//emocionadoNoft.svg";

  const userRef = firebase
    .database()
    .ref("users/" + globalUserId)
    .child("fotoPerfil");
  console.log(globalUserId);
  console.log(ram);

  userRef
    .set({
      fotoPerfil:
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2FGroup%20526.svg?alt=media&token=0f273e2b-4392-468a-9819-a7378ef88957",
      fotoMensage: ram + genero(),
      cor_foto: "#9D4EDD",
      cor_texto: "#9D4EDD",
      cor_texto_fundo: "rgb(156,78,220, 0.30) 0px 5px 20px",
    })
    .then(() => {
      mostrarPopupAlteracaoMood(img);
      console.log("foto de perfil enviada");
    })
    .catch((error) => {
      console.log("Foto não enviada" + error);
    });
}
function pegarValorFotoTriste() {
  var ram = document.getElementById("ram-triste").value;
  var img = "/pagina-perfil/img/notfTriste.svg";
  const userRef = firebase
    .database()
    .ref("users/" + globalUserId)
    .child("fotoPerfil");

  userRef
    .set({
      fotoPerfil:
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2FGroup%20515.svg?alt=media&token=adfc3f86-6e04-4160-baa1-c0e38ffa7117",
      fotoMensage: ram,
      cor_foto: "#0076AC",
      cor_texto: "#0076AC",
      cor_texto_fundo: "rgb(0,118,172, 0.30) 0px 5px 20px",
    })
    .then(() => {
      mostrarPopupAlteracaoMood(img);
      console.log("foto de perfil enviada");
    })
    .catch((error) => {
      console.log("Foto não enviada" + error);
    });
  console.log(ram);
}
function pegarValorFotoEntediado() {
  var ram = document.getElementById("ram-entediado").value;
  var img = "/pagina-perfil/img/notfEntediado.svg";
  const userRef = firebase
    .database()
    .ref("users/" + globalUserId)
    .child("fotoPerfil");

  userRef
    .set({
      fotoPerfil:
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2FGroup%20517.svg?alt=media&token=dee8203f-843f-421a-b955-395ff4407476",
      fotoMensage: ram + genero(),
      cor_foto: "#808080",
      cor_texto: "#808080",
      cor_texto_fundo: "rgb(128,128,128, 0.30) 0px 5px 20px",
    })
    .then(() => {
      mostrarPopupAlteracaoMood(img);
      console.log("foto de perfil enviada");
    })
    .catch((error) => {
      console.log("Foto não enviada" + error);
    });
  console.log(ram);
}
function pegarValorFotoFurioso() {
  var ram = document.getElementById("ram-furioso").value;
  var img = "/pagina-perfil/img/notfFurioso.svg";
  const userRef = firebase
    .database()
    .ref("users/" + globalUserId)
    .child("fotoPerfil");

  userRef
    .set({
      fotoPerfil:
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2FGroup%20519.svg?alt=media&token=83bd63a2-ab4f-4ef1-9141-7534da8f3ab7",
      fotoMensage: ram + genero(),
      cor_foto: "#E10531",
      cor_texto: "#850014",
      cor_texto_fundo: "rgb(255,5,49, 0.30) 0px 5px 20px",
    })
    .then(() => {
      mostrarPopupAlteracaoMood(img);
      console.log("foto de perfil enviada");
    })
    .catch((error) => {
      console.log("Foto não enviada" + error);
    });
  console.log(ram);
}

function pegarValorFotoApaixonado() {
  var ram = document.getElementById("ram-apaixonado").value;
  var img = "/pagina-perfil/img/noftApaixonado.svg";
  const userRef = firebase
    .database()
    .ref("users/" + globalUserId)
    .child("fotoPerfil");

  userRef
    .set({
      fotoPerfil:
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2FGroup%20524.svg?alt=media&token=d101ece0-987f-45a8-9631-a29763acd20a",
      fotoMensage: ram + genero(),
      cor_foto: "#FF9090",
      cor_texto: "#E6322B",
      cor_texto_fundo: "rgb(255,144,144, 0.30) 0px 5px 20px",
    })
    .then(() => {
      mostrarPopupAlteracaoMood(img);
      console.log("foto de perfil enviada");
    })
    .catch((error) => {
      console.log("Foto não enviada" + error);
    });
  console.log(ram);
}
function pegarValorFotoPadrao() {
  var ram = document.getElementById("ram-padrao").value;
  var img = "/pagina-perfil/img/notfNormal.svg";
  const userRef = firebase
    .database()
    .ref("users/" + globalUserId)
    .child("fotoPerfil");

  userRef
    .set({
      fotoPerfil:
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2FGroup%20518.svg?alt=media&token=f876fea9-e991-472d-bd42-83fca4132ed1",
      fotoMensage: ram,
      cor_foto: "#61D243",
      cor_texto: "#499036",
      cor_texto_fundo: "rgb(97,210,67, 0.30) 0px 5px 20px",
    })
    .then(() => {
      mostrarPopupAlteracaoMood(img);
      console.log("foto de perfil enviada");
    })
    .catch((error) => {
      console.log("Foto não enviada" + error);
    });
  console.log(ram);
}

function pegarValorFotoNomood() {
  var ram = document.getElementById("ram-sem-mood").value;
  const userRef = firebase
    .database()
    .ref("users/" + globalUserId)
    .child("fotoPerfil");

  userRef
    .set({
      fotoPerfil:
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2FGroup%20526.svg?alt=media&token=0f273e2b-4392-468a-9819-a7378ef88957",
      fotoMensage: ram,
      cor_foto: "#808080",
    })
    .then(() => {
      console.log("foto de perfil enviada");
    })
    .catch((error) => {
      console.log("Foto não enviada" + error);
    });
  console.log(ram);
}

function mostrarPopupAlteracaoMood(img) {
  const popup = document.getElementById("alteracao_popup_Mood");
  var img = (document.getElementById("alteracao_Mood").src = img);

  // Faz o pop-up deslizar para baixo
  popup.style.top = "20px"; // Ajuste a posição conforme necessário

  // Após 3 segundos, faz o pop-up deslizar de volta para cima
  setTimeout(() => {
    popup.style.top = "-120px"; // Volta para fora da tela
  }, 3000); // 3000 milissegundos = 3 segundos
}

function genero() {
  var genero = document.getElementById("genero-mudar").value;
  if (genero == "feminino") {
    return "a";
  } else if (genero == "masculino") {
    return "o";
  } else {
    return "x";
  }
}

// Aguarda o carregamento completo do DOM
  document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn-mood");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove a classe "active" de todos os botões
      buttons.forEach((btn) => btn.classList.remove("active"));

      // Adiciona a classe "active" ao botão clicado
      button.classList.add("active");

      // Chama a função correspondente ao botão clicado
      switch (button.value) {
        case "Emocionado":
          pegarValorFotoEmocionado();
          break;
        case "Triste":
          pegarValorFotoTriste();
          break;
        case "Entediado":
          pegarValorFotoEntediado();
          break;
        case "Furioso":
          pegarValorFotoFurioso();
          break;
        case "Feliz":
          pegarValorFotoFeliz();
          break;
        case "Apaixonado":
          pegarValorFotoApaixonado();
          break;
        case "Padrão":
          pegarValorFotoPadrao();
          break;
        case "Sem mood":
          pegarValorFotoNomood();
          break;
      }
    });
  });
});
