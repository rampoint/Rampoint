
function validarcampoEmail() {
    mudarBotoes()
    mudarErroEmail()
}

function validarcampoSenha() {
    mudarBotoes()
    mudarErroSenha()
}

function emailIsValid() {
    var email = form.email().value

    if (!email) {
        return false
    }

    return validarEmail(email)
}

function senhaIsValid() {
    var senha = form.senha().value
    if (!senha) {
        return false
    }
    return true
}

function validarEmail(email) {
    return /\S+@\S+\.\S+/.test(email)
}

function mudarErroEmail() {
    const email = form.email().value

    form.email().style.border = email ? "none":"rgb(193, 91, 91) solid"
    form.erro_email_vazio().style.display = email ? "none":"block"

    form.email().style.border = validarEmail(email) ? "none" :"rgb(193, 91, 91) solid"
        form.erro_email_invalido().style.display = validarEmail(email) ? "none" : "block"

}

function mudarErroSenha() {
    const senha = form.senha().value

        form.senha().style.border = !senha ? 'none' : "rgb(193, 91, 91) solid"
        form.erro_senha().style.display = !senha ? "none" : "block"

    
}

function mudarBotoes() {
    var email = form.email().value
    var senha = form.senha().value

    var emailvalido = emailIsValid()
    form.recuperar_senha().disabled = !emailvalido

    var senhaValida = senhaIsValid()
    form.entrar().disabled = !senhaValida


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
}