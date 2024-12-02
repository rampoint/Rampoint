function logout(){
    firebase.auth().signOut().then(() =>{
        window.location.href = "../pagina-login/index.html"
    }).catch(() =>{
        alert("Erro ao fazer logout")
    })
}

document.getElementsByClassName('sair')[0].addEventListener('click', () => {
    firebase.auth().signOut().then(() =>{
        window.location.href = "../pagina-login/index.html"
    }).catch(() =>{
        alert("Erro ao fazer logout")
    })
})