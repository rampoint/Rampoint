function pegarValorFotoFeliz() {
  var ram = document.getElementById("ram-feliz").value;
  document.getElementById("ram-feliz").style.border = "solid";
  document.getElementById("ram-feliz").style.color = "#499136";

  const userRef = firebase
    .database()
    .ref("users/" + globalUserId)
    .child("fotoPerfil");
  userRef
    .set({
      fotoPerfil:
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2FGroup%20525.svg?alt=media&token=964936c0-bfcf-4ba4-afa5-6c397715b692",
      fotoMensage: ram,
      cor_foto:"#FEBF1F",
      cor_texto:'#5B4B22'
    })
    .then(() => {
      console.log("foto de perfil enviada");
    })
    .catch((error) => {
      console.log("nao foi amigo" + error);
    });
  console.log(ram);
  console.log(globalUserId);
}

function pegarValorFotoEmocionado() {
  var ram = document.getElementById("ram-emocionado").value;
  document.getElementById("ram-emocionado").style.border = "solid";
  document.getElementById("ram-emocionado").style.color = "#499136";
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
      fotoMensage: ram,
      cor_foto:"#9D4EDD",
      cor_texto:'#9D4EDD'
    })
    .then(() => {
      console.log("foto de perfil enviada");
    })
    .catch((error) => {
      console.log("nao foi amigo" + error);
    });
}
function pegarValorFotoTriste() {
  var ram = document.getElementById("ram-triste").value;
  document.getElementById("ram-triste").style.border = "solid";
  document.getElementById("ram-triste").style.color = "#499136";
  const userRef = firebase
    .database()
    .ref("users/" + globalUserId)
    .child("fotoPerfil");

  userRef
    .set({
      fotoPerfil:
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2FGroup%20515.svg?alt=media&token=adfc3f86-6e04-4160-baa1-c0e38ffa7117",
      fotoMensage: ram,
      cor_foto:"#0076AC",
      cor_texto:'#0076AC'
    })
    .then(() => {
      console.log("foto de perfil enviada");
    })
    .catch((error) => {
      console.log("nao foi amigo" + error);
    });
  console.log(ram);
}
function pegarValorFotoEntediado() {
  var ram = document.getElementById("ram-entediado").value;
  document.getElementById("ram-entediado").style.border = "solid";
  document.getElementById("ram-entediado").style.color = "#499136";
  const userRef = firebase
    .database()
    .ref("users/" + globalUserId)
    .child("fotoPerfil");

  userRef
    .set({
      fotoPerfil:
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2FGroup%20517.svg?alt=media&token=dee8203f-843f-421a-b955-395ff4407476",
      fotoMensage: ram,
      cor_foto:"#808080",
      cor_texto:'#808080'
    })
    .then(() => {
      console.log("foto de perfil enviada");
    })
    .catch((error) => {
      console.log("nao foi amigo" + error);
    });
  console.log(ram);
}
function pegarValorFotoFurioso() {
  var ram = document.getElementById("ram-furioso").value;
  document.getElementById("ram-furioso").style.border = "solid";
  document.getElementById("ram-furioso").style.color = "#499136";
  const userRef = firebase
    .database()
    .ref("users/" + globalUserId)
    .child("fotoPerfil");

  userRef
    .set({
      fotoPerfil:
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2FGroup%20519.svg?alt=media&token=83bd63a2-ab4f-4ef1-9141-7534da8f3ab7",
      fotoMensage: ram,
      cor_foto:'#E10531',
      cor_texto:'#850014'
    })
    .then(() => {
      console.log("foto de perfil enviada");
    })
    .catch((error) => {
      console.log("nao foi amigo" + error);
    });
  console.log(ram);
}

function pegarValorFotoApaixonado() {
  var ram = document.getElementById("ram-apaixonado").value;
  document.getElementById("ram-apaixonado").style.border = "solid";
  document.getElementById("ram-apaixonado").style.color = "#499136";
  const userRef = firebase
    .database()
    .ref("users/" + globalUserId)
    .child("fotoPerfil");

  userRef
    .set({
      fotoPerfil:
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2FGroup%20524.svg?alt=media&token=d101ece0-987f-45a8-9631-a29763acd20a",
      fotoMensage: ram,
      cor_foto:"#FF9090",
      cor_texto:'#E6322B'
    })
    .then(() => {
      console.log("foto de perfil enviada");
    })
    .catch((error) => {
      console.log("nao foi amigo" + error);
    });
  console.log(ram);
}
function pegarValorFotoPadrao() {
  var ram = document.getElementById("ram-padrao").value;
  document.getElementById("ram-padrao").style.border = "solid";
  document.getElementById("ram-padrao").style.color = "#499136";
  const userRef = firebase
    .database()
    .ref("users/" + globalUserId)
    .child("fotoPerfil");

  userRef
    .set({
      fotoPerfil:
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2FGroup%20518.svg?alt=media&token=f876fea9-e991-472d-bd42-83fca4132ed1",
      fotoMensage: ram,
      cor_foto:"#61D243",
      cor_texto:'#499036'
    })
    .then(() => {
      console.log("foto de perfil enviada");
    })
    .catch((error) => {
      console.log("nao foi amigo" + error);
    });
  console.log(ram);
}

function pegarValorFotoNomood() {
  var ram = document.getElementById("ram-sem-mood").value;
  document.getElementById("ram-sem-mood").style.border = "solid";
  document.getElementById("ram-sem-mood").style.color = "#499136";
  const userRef = firebase
    .database()
    .ref("users/" + globalUserId)
    .child("fotoPerfil");

  userRef
    .set({
      fotoPerfil:
        "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2FGroup%20526.svg?alt=media&token=0f273e2b-4392-468a-9819-a7378ef88957",
      fotoMensage: ram,
      cor_foto:'#808080',
    })
    .then(() => {
      console.log("foto de perfil enviada");
    })
    .catch((error) => {
      console.log("nao foi amigo" + error);
    });
  console.log(ram);
}
