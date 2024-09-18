
const userRef = firebase.database().ref("users/" + globalUserId).child('fotoPerfil')

function pegarValorFotoFeliz(){
    var ram = document.getElementById('ram-feliz').value
    
   
    console.log(ram)
    console.log(globalUserId)
}

function pegarValorFotoEmocionado(){
    var ram = document.getElementById('ram-emocionado').value
    userRef.set({
        fotoPerfil:"https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/imagens%2FGroup%20525.svg?alt=media&token=964936c0-bfcf-4ba4-afa5-6c397715b692",
        fotoMensage: ram
    }).then(() =>{
        console.log('foto de perfil enviada')
    }).catch((error) =>{
        console.log('nao foi amigo'+error)
    })
    console.log(globalUserId)
    console.log(ram)
    
}
function pegarValorFotoTriste(){
    var ram = document.getElementById('ram-triste').value

    console.log(ram)
}
function pegarValorFotoEntediado(){
    var ram = document.getElementById('ram-entediado').value

    console.log(ram)
}
function pegarValorFotoFurioso(){
    var ram = document.getElementById('ram-furioso').value

    console.log(ram)
}
function pegarValorFotoFeliz(){
    var ram = document.getElementById('ram-feliz').value

    console.log(ram)
}
function pegarValorFotoApaixonado(){
    var ram = document.getElementById('ram-apaixonado').value


    console.log(ram)
}
function pegarValorFotoPadrao(){
    var ram = document.getElementById('ram-padrao').value

    console.log(ram)
}

function pegarValorFotoNomood(){
    var ram = document.getElementById('ram-sem-mood').value

    console.log(ram)
}

