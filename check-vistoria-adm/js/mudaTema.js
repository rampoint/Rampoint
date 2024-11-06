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

  const labelForms = document.querySelectorAll(".titulo-form");
  const input = document.querySelectorAll("input");
  const selectedOption = document.querySelector(".selected-option");
  const inputOptions = document.querySelector(".options");
  const option = document.querySelector(".option");
  const textarea = document.querySelectorAll("#descricao-peca");

  const btnCancelar = document.querySelector(".btn-cancelar");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");

    mainContent.classList.add("dark-theme");
    sidebar.classList.add("dark-theme");
    spanLogo.classList.add("dark-theme");
    nameUser.classList.add("dark-theme");

    iconSidebar.forEach((icon) => icon.classList.add("dark-theme"));
    linkSidebar.forEach((link) => link.classList.add("dark-theme"));

    tituloPagina.classList.remove("light-theme");
    tituloPagina.classList.add("dark-theme");

    fundoTitulo.classList.remove("light-theme");
    fundoTitulo.classList.add("dark-theme");

    titulo1.classList.remove("light-theme");
    titulo1.classList.add("dark-theme");

    labelForms.forEach((label) => label.classList.add("dark-theme"));

    input.forEach((input) => {
      input.classList.remove("light-theme");
      input.classList.add("dark-theme");
    });

    inputOptions.classList.remove("light-theme");
    inputOptions.classList.add("dark-theme");

    selectedOption.classList.remove("light-theme");
    selectedOption.classList.add("dark-theme");

    option.classList.remove("light-theme");
    option.classList.add("dark-theme");

    textarea.forEach((area) => {
      area.classList.remove("light-theme");
      area.classList.add("dark-theme");
    });

    btnCancelar.classList.add("dark-theme");

    themeIcon.classList.remove("bx-sun");
    themeIcon.classList.add("bx-moon");
  }

  themeIcon.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");

    mainContent.classList.toggle("dark-theme");
    sidebar.classList.toggle("dark-theme");
    spanLogo.classList.toggle("dark-theme");
    nameUser.classList.toggle("dark-theme");

    iconSidebar.forEach((icon) => icon.classList.toggle("dark-theme"));
    linkSidebar.forEach((link) => link.classList.toggle("dark-theme"));

    tituloPagina.classList.toggle("dark-theme");
    tituloPagina.classList.toggle("light-theme");

    fundoTitulo.classList.toggle("dark-theme");
    fundoTitulo.classList.toggle("light-theme");

    titulo1.classList.toggle("dark-theme");
    titulo1.classList.toggle("light-theme");

    labelForms.forEach((label) => label.classList.toggle("dark-theme"));

    input.forEach((input) => {
      input.classList.toggle("dark-theme");
      input.classList.toggle("light-theme");
    });

    inputOptions.classList.toggle("dark-theme");
    inputOptions.classList.toggle("light-theme");

    selectedOption.classList.toggle("dark-theme");
    selectedOption.classList.toggle("light-theme");

    option.classList.toggle("dark-theme");
    option.classList.toggle("light-theme");

    textarea.forEach((area) => {
      area.classList.toggle("dark-theme");
      area.classList.toggle("light-theme");
    });

    btnCancelar.classList.toggle("dark-theme");

    if (themeIcon.classList.contains("bx-sun")) {
      themeIcon.classList.remove("bx-sun");
      themeIcon.classList.add("bx-moon");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.remove("bx-moon");
      themeIcon.classList.add("bx-sun");
      localStorage.setItem("theme", "light");
    }
  });
});
