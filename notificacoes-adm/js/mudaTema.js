document.addEventListener("DOMContentLoaded", () => {
  const themeIcon = document.getElementById("theme-icon");
  const mainContent = document.querySelector(".main-content");
  const sidebar = document.querySelector(".sidebar");
  const spanLogo = document.querySelector(".span-logo");
  const nameUser = document.querySelector(".nome-usuario");
  const linkSidebar = document.querySelectorAll(".sidebar ul li a .nav-item");
  const iconSidebar = document.querySelectorAll("i");

  const tituloPagina = document.querySelector(".titulo-pagina");
  const fundoTitulo = document.querySelector(".fundo-titulo");

  const titulo1 = document.querySelector(".mensagens h2");

  const tituloMsg = document.querySelectorAll(".mensagem-info p");
  const setaMsg = document.querySelectorAll(".seta-mensagem i");
  const doadorMsg = document.querySelectorAll(".coluna-mensagem h3");
  const dataMsg = document.querySelectorAll(".data-hora");
  const descricaoMsg = document.querySelectorAll(".descricao");
  const conteudoDescricao = document.querySelectorAll(".conteudo-descricao");
  const infoMsg = document.querySelector(".info h4");

  const aplicarTemaEscuro = () => {
    document.body.classList.add("dark-theme");
    mainContent.classList.add("dark-theme");
    sidebar.classList.add("dark-theme");
    spanLogo.classList.add("dark-theme");
    nameUser.classList.add("dark-theme");
    iconSidebar.forEach(icon => icon.classList.add("dark-theme"));
    linkSidebar.forEach(link => link.classList.add("dark-theme"));

    tituloPagina.classList.add("dark-theme");
    fundoTitulo.classList.add("dark-theme");

    titulo1.classList.add("dark-theme");

    tituloMsg.forEach(title => title.classList.add("dark-theme"));
    setaMsg.forEach(arrow => arrow.classList.add("dark-theme"));
    doadorMsg.forEach(doador => doador.classList.add("dark-theme"));
    dataMsg.forEach(date => date.classList.add("dark-theme"));
    descricaoMsg.forEach(descricao => descricao.classList.add("dark-theme"));
    conteudoDescricao.forEach(conteudo => conteudo.classList.add("dark-theme"));
    infoMsg.classList.add("dark-theme");

    themeIcon.classList.replace("bx-sun", "bx-moon");
  };

  const aplicarTemaClaro = () => {
    document.body.classList.remove("dark-theme");
    mainContent.classList.remove("dark-theme");
    sidebar.classList.remove("dark-theme");
    spanLogo.classList.remove("dark-theme");
    nameUser.classList.remove("dark-theme");
    iconSidebar.forEach(icon => icon.classList.remove("dark-theme"));
    linkSidebar.forEach(link => link.classList.remove("dark-theme"));

    tituloPagina.classList.remove("dark-theme");
    fundoTitulo.classList.remove("dark-theme");

    titulo1.classList.remove("dark-theme");

    tituloMsg.forEach(title => title.classList.remove("dark-theme"));
    setaMsg.forEach(arrow => arrow.classList.remove("dark-theme"));
    doadorMsg.forEach(doador => doador.classList.remove("dark-theme"));
    dataMsg.forEach(date => date.classList.remove("dark-theme"));
    descricaoMsg.forEach(descricao => descricao.classList.remove("dark-theme"));
    conteudoDescricao.forEach(conteudo => conteudo.classList.remove("dark-theme"));
    infoMsg.classList.remove("dark-theme");

    themeIcon.classList.replace("bx-moon", "bx-sun");
  };

  if (localStorage.getItem("theme") === "dark") {
    aplicarTemaEscuro();
  }

  themeIcon.addEventListener("click", () => {
    if (document.body.classList.contains("dark-theme")) {
      aplicarTemaClaro();
      localStorage.setItem("theme", "light");
    } else {
      aplicarTemaEscuro();
      localStorage.setItem("theme", "dark");
    }
  });
});
