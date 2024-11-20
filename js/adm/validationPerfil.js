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
      document.getElementById('nome_adm').value = users.nome
      document.getElementById('email_adm').value = users.email
      document.getElementById('telefone_adm').value = users.tel

  }
  
  function atualizarDados() {
    const nome_mudanca = document.getElementById("nome_adm").value;
    const telefone_mudanca = document.getElementById('telefone_adm').value
     
    firebase.database().ref("users/" + globalUserId).update({
        nome: nome_mudanca,
        tel: telefone_mudanca,
      })
      .then(() => {
        mostrarPopupAlteracao()
        
      });
  }
  
  function mostrarPopupAlteracao() {
    
    const popup = document.getElementsByClassName('alteracao -active')[0];
    // Faz o pop-up deslizar para baixo
    popup.style.top = '20px'; // Ajuste a posição conforme necessário
    // Após 3 segundos, faz o pop-up deslizar de volta para cima
    setTimeout(() => {
        popup.style.top = '-120px'; // Volta para fora da tela
    }, 3000); // 3000 milissegundos = 3 segundos
  }