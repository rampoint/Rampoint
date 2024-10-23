document.addEventListener("DOMContentLoaded", () => {
  const themeIcon = document.getElementById("theme-icon");
  const mainContent = document.querySelector(".main-content");
  const sidebar = document.querySelector(".sidebar");
  const fundoTitulo = document.querySelector(".fundo-titulo");
  const labelForms = document.querySelectorAll(".titulo-form"); 
  const btnCancelar = document.querySelector(".btn-cancelar");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    mainContent.classList.remove("light-theme");
    mainContent.classList.add("dark-theme");

    sidebar.classList.remove("light-theme");
    sidebar.classList.add("dark-theme");

    fundoTitulo.classList.remove("light-theme");
    fundoTitulo.classList.add("dark-theme");

    labelForms.forEach(label => {
      label.classList.remove("light-theme");
      label.classList.add("dark-theme");
    });

    btnCancelar.classList.remove("light-theme");
    btnCancelar.classList.add("dark-theme");

    themeIcon.classList.remove("bx-sun");
    themeIcon.classList.add("bx-moon");
  }

  themeIcon.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");
    mainContent.classList.toggle("dark-theme");
    mainContent.classList.toggle("light-theme");

    sidebar.classList.toggle("dark-theme");
    sidebar.classList.toggle("light-theme");

    fundoTitulo.classList.toggle("dark-theme");
    fundoTitulo.classList.toggle("light-theme");

    labelForms.forEach(label => {
      label.classList.toggle("dark-theme");
      label.classList.toggle("light-theme");
    });

    btnCancelar.classList.toggle("dark-theme");
    btnCancelar.classList.toggle("light-theme");

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