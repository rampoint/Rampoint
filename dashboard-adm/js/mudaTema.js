document.addEventListener("DOMContentLoaded", () => {
  const themeIcon = document.getElementById("theme-icon");
  const mainContent = document.querySelector(".main-content");
  const sidebar = document.querySelector(".sidebar");
  const fundoTitulo = document.querySelector(".fundo-titulo");
  const titulo1 = document.querySelector(".titulo-inicial");
  const subtitulo = document.querySelector(".subtitulo");
  const tituloNotf = document.querySelector(".titulo-notificacoes");
  const tituloDoadores = document.querySelector(".titulo-doadores");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    mainContent.classList.remove("light-theme");
    mainContent.classList.add("dark-theme");

    sidebar.classList.remove("light-theme");
    sidebar.classList.add("dark-theme");

    fundoTitulo.classList.remove("light-theme");
    fundoTitulo.classList.add("dark-theme");

    titulo1.classList.remove("light-theme");
    titulo1.classList.add("dark-theme");

    subtitulo.classList.remove("light-theme");
    subtitulo.classList.add("dark-theme");

    tituloNotf.classList.remove("light-theme");
    tituloNotf.classList.add("dark-theme");

    tituloDoadores.classList.remove("light-theme");
    tituloDoadores.classList.add("dark-theme");

    themeIcon.classList.remove("bx-sun");
    themeIcon.classList.add("bx-moon");
  }

  // Adiciona evento de clique ao ícone
  themeIcon.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");
    mainContent.classList.toggle("dark-theme");
    mainContent.classList.toggle("light-theme");

    sidebar.classList.toggle("dark-theme");
    sidebar.classList.toggle("light-theme");

    fundoTitulo.classList.toggle("dark-theme");
    fundoTitulo.classList.toggle("light-theme");

    titulo1.classList.toggle("dark-theme");
    titulo1.classList.toggle("light-theme");

    subtitulo.classList.toggle("dark-theme");
    subtitulo.classList.toggle("light-theme");

    tituloNotf.classList.toggle("dark-theme");
    tituloNotf.classList.toggle("light-theme");

    tituloDoadores.classList.toggle("dark-theme");
    tituloDoadores.classList.toggle("light-theme");

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
