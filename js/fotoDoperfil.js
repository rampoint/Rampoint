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
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2Fram-feliz.svg?alt=media&token=392bc095-1e4f-4bda-8411-69144c0637bc",
      fotoMensage: ram,
      cor_foto: "#FEBF1F",
      cor_texto: "#FFC01E",
      cor_texto_fundo: " 0px 5px 20px rgb(255, 192, 30, 0.30) ",
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
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2Fram-emocionado.svg?alt=media&token=fbd804eb-2504-460d-afa5-eeee0fe541ee",
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
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2Fram-triste.svg?alt=media&token=83dbe215-0aee-40a7-b9e1-3d66ec59063c",
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
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2Fram-entediado.svg?alt=media&token=d4d91ef9-49d9-4466-936e-dd905281adca",
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
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2Fram-furioso.svg?alt=media&token=73cff9a4-e17d-4bd8-b339-46e6ff6b19bf",
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
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2Fram-apaixonado.svg?alt=media&token=1a353a16-1b52-4f7f-b298-ac8102d95896",
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
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2Fram-padrao.svg?alt=media&token=566f17ad-1a3d-4a0d-a148-d3a84e2715c7",
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
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2Fsem-mood.svg?alt=media&token=5ffcf05a-e0f3-47c9-92f9-5a63e6296e2b",
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

function mostrarPopupexcluir(){
  const popup = document.getElementById("exclusaoModel");
  
  popup.style.top = "70px";
  
}

function fecharPop(){
  const popup = document.getElementById("exclusaoModel");
  
  popup.style.top = "-120px"; // Volta para fora da tela
  
}