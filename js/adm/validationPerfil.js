let globalUserId = null;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    globalUserId = user.uid;
    buscarDadosUsuario(user.uid);
  } else {
    console.log("Nenhum usuário logado.");
  }
});

function buscarDadosUsuario(globalUserId) {
    console.log(globalUserId)
    const dbRef = firebase.database().ref("users/" + globalUserId);
    dbRef
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          const dadosUsuario = snapshot.val();
          exibirDadosUsuario(dadosUsuario)
          localStorage.setItem("nomeAdm",dadosUsuario.nome)
          console.log(localStorage.getItem('nomeAdm'))
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do usuário:", error);
      });
  }
  

function exibirDadosUsuario(users) {
      document.getElementById('nome-adm').innerHTML = users.nome
      document.getElementById('email-adm').innerHTML = users.email
      document.getElementById('nome').value = users.nome
      document.getElementById('email').value = users.nome
  }
  
