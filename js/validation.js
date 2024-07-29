
function validarCampos(){
    var email = document.getElementById("email").value
    var senha = document.getElementById("senha").value
    

    if(!email){
        document.getElementById("recover-password").disabled = true
        document.getElementById("entrar").disabled = true
        console.log("nao foi")
    }else if(validarEmail(email)){
        document.getElementById("recover-password").disabled = false
        document.getElementById("entrar").disabled = false
        console.log("Foi")
        console.log(validarEmail(email))
    }else{
        document.getElementById("recover-password").disabled = true
        console.log("nao foi")
        document.getElementById("entrar").disabled = true
    }
}


function validarEmail(email){
    return /\S+@\S+\.\S+/.test(email)
}