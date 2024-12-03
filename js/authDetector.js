document.addEventListener("DOMContentLoaded", () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      document.querySelector(".botao").style.display = "none";
    } else {
      document.getElementById("Perfil/entrar").innerHTML = "Entrar";
      document.querySelector(".login").innerHTML = "Cadastrar";
      document.querySelector(".login").style.color = "#0076ac";
      document.querySelector(".cadastro").href = "../pagina-login/index.html";
      document.querySelector(".login").href = "../pagina-login/index.html";
      document.querySelector(".login").removeEventListener('onclick', logout)
      document.querySelector('.perfil-mobile').style.display = 'none'
      document.querySelector('.sair-mobile').style.display = 'none'
      document.getElementById('open-modal-small').style.display = 'none'
    }
  });
});
