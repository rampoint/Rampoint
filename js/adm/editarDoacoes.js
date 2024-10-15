function pegarIdUrl(){
    const urlParams = new URLSearchParams(window.location.search)
    console.log(urlParams.get('id'))
  }
  const uid = pegarIdUrl();
  acharDoacaoUrl(uid)

  function acharDoacaoUrl(uid){
    
    firebase.database().ref('users').orderByChild('peças').equalTo(`${uid}`).once('value').then((snapshot) => {
        if(snapshot.exists()){
            console.log(snapshot.val())
        }else{
            console.log('amigo nao tem nada')
        }

    }).catch((error) => {
        console.log(error)
    })
  }
