
function recuperarDadosUsuario(userId) {
  const userRef = database.ref('users/' + userId);

  userRef.once('value')
    .then((snapshot) => {
      if (snapshot.exists()) {
        const dadosUsuario = snapshot.val();
        console.log("Dados do usuário:", dadosUsuario);
      } else {
        console.log("Usuário não encontrado.");
      }
    })
    .catch((error) => {
      console.error("Erro ao recuperar dados:", error);
    });
}

const form = {
    nome: () => document.getElementById("nome_usuario"),
    email: () => document.getElementById("email_usuario"),
    emocao_usuario: () =>  document.getElementById("emocao_usuario"),
    pontos: () => document.getElementById("pontos_usuario")
}

