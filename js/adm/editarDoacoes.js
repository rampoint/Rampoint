function pegarIdUrl(){
    const urlParams = new URLSearchParams(window.location.search)
    return (urlParams.get('id'))
  }
  const uid = pegarIdUrl();
  acharDoacaoUrl(uid)

  function acharDoacaoUrl(uid){
    const userRef = firebase.database()
    userRef.ref('users').once('value').then((childSnapshot) => {
        childSnapshot.forEach((snapshot) => {
            console.log(snapshot.key)
            userRef.ref(`users/${snapshot.key}/peças/${uid}`).once('value')
            .then((snapshot) =>{
                if(snapshot.exists()){
                    var Dados = snapshot.val()
                    mostrarDados(Dados)
                }else{
                    console.log('tem nao amigo')
                }
            }).catch((error) =>{
                console.log(error)
            })

        })
    })

    // userRef.orderByChild('peças').equalTo(`${uid}`).once('value').then((snapshot) => {
    //     if(snapshot.exists()){
    //         console.log(snapshot.val())
    //     }else{
    //         console.log('amigo nao tem nada')
    //     }

    // }).catch((error) => {
    //     console.log(error)
    // })
  }

  function mostrarDados(data){
    
    document.getElementById('nome-placeholder').placeholder = data.nome
    document.getElementById('email-placeholder').placeholder = data.email
    // document.getElementById('telefone-placeholder').placeholder = data.tel
    document.getElementById('tipo-placeholder').innerHTML = data.tipo
    document.getElementById('qtd-placeholder').placeholder = data.qtd
    document.getElementById('search').placeholder = data.nome_peca
    document.getElementById('descricao-peca').placeholder = data.desc

  }

  function atualizarVistoria(){
    const userRef = firebase.database()
    userRef.ref('users').once('value').then((childSnapshot) => {
        childSnapshot.forEach((snapshot) => {
            console.log(snapshot.key)
            userRef.ref(`users/${snapshot.key}/peças/${uid}`)
            .update({
                vistoria:'Realizada'
            })
            .then((snapshot) =>{
                if(snapshot.exists()){
                alert('atualizoooo')
                    
                }else{
                    console.log('tem nao amigo')
                }
            }).catch((error) =>{
                console.log(error)
            })

        })
    })
  }