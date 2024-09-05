firebase.auth().onAuthStateChanged((user) => {
    if(!user){
        window.location.href = "/pagina-login/index.html"
    }
})
