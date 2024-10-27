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

  const titulo1 = document.querySelector(".titulo-inicial");

  const fundoTabela = document.querySelector(".fundo-doacoes");
  const tituloTabela = document.querySelectorAll(".tituloThead");
  const linhaTabela = document.querySelectorAll(".trbody");

  const tipoInterno = document.querySelectorAll(".tipo-interno");
  const tipoPeriferico = document.querySelectorAll(".tipo-periferico");
  const tipoEstrutura = document.querySelectorAll(".tipo-estrutura");

  const aplicarTemaEscuro = () => {
    document.body.classList.add("dark-theme");

    mainContent.classList.add("dark-theme");
    sidebar.classList.add("dark-theme");
    spanLogo.classList.add("dark-theme");
    nameUser.classList.add("dark-theme");

    iconSidebar.forEach((icon) => icon.classList.add("dark-theme"));
    linkSidebar.forEach((link) => link.classList.add("dark-theme"));

    tituloPagina.classList.add("dark-theme");
    fundoTitulo.classList.add("dark-theme");
    titulo1.classList.add("dark-theme");

    fundoTabela.classList.add("dark-theme");
    tituloTabela.forEach((title) => title.classList.add("dark-theme"));
    linhaTabela.forEach((line) => line.classList.add("dark-theme"));

    tipoInterno.forEach((typeIn) => typeIn.classList.add("dark-theme"));
    tipoPeriferico.forEach((typePer) => typePer.classList.add("dark-theme"));
    tipoEstrutura.forEach((typeEst) => typeEst.classList.add("dark-theme"));

    themeIcon.classList.remove("bx-sun");
    themeIcon.classList.add("bx-moon");
  };

  const aplicarTemaClaro = () => {
    document.body.classList.remove("dark-theme");

    mainContent.classList.remove("dark-theme");
    sidebar.classList.remove("dark-theme");
    spanLogo.classList.remove("dark-theme");
    nameUser.classList.remove("dark-theme");

    iconSidebar.forEach((icon) => icon.classList.remove("dark-theme"));
    linkSidebar.forEach((link) => link.classList.remove("dark-theme"));

    tituloPagina.classList.remove("dark-theme");
    fundoTitulo.classList.remove("dark-theme");
    titulo1.classList.remove("dark-theme");

    fundoTabela.classList.remove("dark-theme");
    tituloTabela.forEach((title) => title.classList.remove("dark-theme"));
    linhaTabela.forEach((line) => line.classList.remove("dark-theme"));

    tipoInterno.forEach((typeIn) => typeIn.classList.remove("dark-theme"));
    tipoPeriferico.forEach((typePer) => typePer.classList.remove("dark-theme"));
    tipoEstrutura.forEach((typeEst) => typeEst.classList.remove("dark-theme"));

    themeIcon.classList.add("bx-sun");
    themeIcon.classList.remove("bx-moon");
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
