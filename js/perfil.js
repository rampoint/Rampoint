
function pegarDados(){
    firebase.firestore()
    .collection('usuario_login')
    .get()
    .then(snapshot => {
        snapshot.docs.forEach(doc =>{
            console.log(doc.data())
        })
    } )    
}
const form = {
    nome: () => document.getElementById("nome_usuario"),
    email: () => document.getElementById("email_usuario"),
    emocao_usuario: () =>  document.getElementById("emocao_usuario"),
    pontos: () => document.getElementById("pontos_usuario")
}

