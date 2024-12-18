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
    const dbRef = firebase.database().ref("users/" + globalUserId);
  
    dbRef
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          const dadosUsuario = snapshot.val();
          
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do usuário:", error);
      });
  }
  
