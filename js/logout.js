function logout(){
    firebase.auth().signOut().then(() =>{
        window.location.href = "../pagina-login/index.html"
    }).catch(() =>{
        alert("Erro ao fazer logout")
    })
}