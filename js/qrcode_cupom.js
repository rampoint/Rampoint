var cupomGolias = document.querySelector("#cupom-golias");
var cupomVidro = document.querySelector("#cupom-vidro");
var cupomDourado = document.querySelector("#cupom-dourado");

cupomGolias.addEventListener("click", () => {
  cupomGolias.classList.add("active");
  cupomDourado.classList.remove("active");
  cupomVidro.classList.remove("active");
});

cupomVidro.addEventListener("click", () => {
  cupomGolias.classList.remove("active");
  cupomDourado.classList.remove("active");
  cupomVidro.classList.add("active");
});

cupomDourado.addEventListener("click", () => {
  cupomGolias.classList.remove("active");
  cupomDourado.classList.add("active");
  cupomVidro.classList.remove("active");
});

function verificarPontos() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      globalUserId = user.uid;
      console.log(globalUserId);
      calcularPontos(globalUserId);
      // Seleciona a div com a classe 'active'
    } else {
      console.log("Nenhum usuário logado.");
    }
  });
}
function calcularPontos(uid) {
  firebase
    .database()
    .ref("users/" + uid)
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        const dadosUsuario = snapshot.val();
        console.log(snapshot.val().pontos);
        makeCode(dadosUsuario.pontos, uid);
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar dados do usuário:", error);
    });
}

function atualizarPontos(restante, uid) {
  firebase
    .database()
    .ref("users/" + uid)
    .update({
      pontos: restante,
    })
    .then(() => {
      console.log("Atualizou os pontos");
    })
    .catch((error) => {
      console.log(error + "deu não");
    });
}
function makeCode(pontos, uid) {
  var qrcode = new QRCode("qrcode", {
    width: 150,
    height: 150,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  const cupomAtivo = document.querySelector(
    ".grupo-cupons .select-cupom.active"
  );
  const pontosQrcode = cupomAtivo.getAttribute("value");
  var cupom = pontos - pontosQrcode;
  if (cupom < 0) {
    console.log("dá não filho");
  } else {
    qrcode.makeCode(cupom);
    atualizarPontos(cupom, uid);
  }
}


function salvarCupom() {
  const imgElement = document.querySelector("#qrcode img");
  const imgSrc = imgElement.getAttribute("src");
  console.log(imgSrc); 
  const cupomAtivo = document.querySelector(".grupo-cupons .select-cupom.active");
  const pontosQrcode = cupomAtivo.getAttribute("value");
  const cupomText = document.querySelector(".grupo-cupons .titulo-cupom");
  const cupomNome = cupomText.innerHTML;


  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      globalUserId = user.uid;
      console.log(globalUserId)
      firebase.database().ref('users/'+globalUserId+'/cupons').set({
        nome_cupom:cupomNome,
        porcentagem:pegarPorcentagem(pontosQrcode),
        qrCode:imgSrc
      }).then(() => {
        console.log('cupom salvo')
      }).catch((error) => {
         console.error(error) 
      } )
    } else {
      alert('Faça o login')
    }
  })
}

function pegarPorcentagem(pts){
  if(pts >= 1000){
    return 30
  }
  else 
  if(pts >= 500){
    return 20
  }else 
  if(pts >= 250){
    return 10
  }
}
function pegarNome(){
  const cupomText = document.querySelector(".grupo-cupons .titulo-cupom");
  const cupomNome = cupomText.innerHTML;
  console.log(pontosQrcode)
}