// Script para alternar temas
document.addEventListener("DOMContentLoaded", () => {
  const themeIcon = document.getElementById("theme-icon");
  const mainContent = document.querySelector(".main-content");
  const sidebar = document.querySelector(".sidebar");
  const spanLogo = document.querySelector(".span-logo");
  const nameUser = document.querySelector(".nome-usuario");
  const linkSidebar = document.querySelectorAll(".sidebar ul li a .nav-item");
  const iconSidebar = document.querySelectorAll("i");
  const fundoPopUp = document.querySelector(".fundo-popUp-doacao");

  const tituloPagina = document.querySelector(".titulo-pagina");
  const fundoTitulo = document.querySelector(".fundo-titulo");

  const titulo1 = document.querySelector(".titulo-inicial");

  const labelForms = document.querySelectorAll(".titulo-form");
  const input = document.querySelectorAll("input");
  const selectedOption = document.querySelector("#tipo-componente");
  const textarea = document.querySelector("#descricao-peca");

  const btnCancelar = document.querySelector(".btn-cancelar");

  if (localStorage.getItem("theme") === "dark") {
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
    labelForms.forEach((label) => label.classList.add("dark-theme"));
    
    input.forEach((input) => input.classList.add("dark-theme"));
    
    selectedOption.classList.add("dark-theme");
    
    textarea.classList.add("dark-theme");
    
    btnCancelar.classList.add("dark-theme");

    fundoPopUp.classList.add("dark-theme");

    themeIcon.classList.replace("bx-sun", "bx-moon");
  }

  themeIcon.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    mainContent.classList.toggle("dark-theme");
    sidebar.classList.toggle("dark-theme");
    spanLogo.classList.toggle("dark-theme");
    nameUser.classList.toggle("dark-theme");

    iconSidebar.forEach((icon) => icon.classList.toggle("dark-theme"));
    linkSidebar.forEach((link) => link.classList.toggle("dark-theme"));

    tituloPagina.classList.toggle("dark-theme");
    fundoTitulo.classList.toggle("dark-theme");
    titulo1.classList.toggle("dark-theme");
    labelForms.forEach((label) => label.classList.toggle("dark-theme"));
    
    input.forEach((input) => input.classList.toggle("dark-theme"));
    
    selectedOption.classList.toggle("dark-theme");
    
    textarea.classList.toggle("dark-theme");

    btnCancelar.classList.toggle("dark-theme");
    fundoPopUp.classList.toggle("dark-theme");

    if (themeIcon.classList.contains("bx-sun")) {
      themeIcon.classList.replace("bx-sun", "bx-moon");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.replace("bx-moon", "bx-sun");
      localStorage.setItem("theme", "light");
    }
  });
});
