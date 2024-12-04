firebase.database().ref(`users/${uid}`).once('value').then((snapshot) => {
    if(snapshot.exists()){
        var data = snapshot.val()
        document.getElementById('email-add').value = data.email
        document.getElementById('nome-add').value = data.nome
        document.getElementById('tel').value = data.tel
    }
})