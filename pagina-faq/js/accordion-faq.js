document.addEventListener("DOMContentLoaded", function () {
  var accordions = document.querySelectorAll(".accordion-header");
  var categoryLinks = document.querySelectorAll(".category-link");
  var accordionContainers = document.querySelectorAll(".accordion");

  // Exibir a categoria "Geral" por padrão
  document.getElementById("geral").style.display = "block";

  // Alternar a exibição de categorias ao clicar nos links da barra lateral
  categoryLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var category = this.getAttribute("data-category");

      // Ativar o link da categoria selecionada e desativar os outros
      categoryLinks.forEach(function (link) {
        link.classList.remove("active");
      });
      this.classList.add("active");

      // Exibir a categoria correspondente e ocultar as outras
      accordionContainers.forEach(function (container) {
        if (container.getAttribute("id") === category) {
          container.style.display = "block";
        } else {
          container.style.display = "none";
        }
      });
    });
  });

  // Funcionalidade do accordion
  accordions.forEach(function (header) {
    header.addEventListener("click", function () {
      var body = this.nextElementSibling;
      var isActive = this.classList.contains("active");

      // Fechar todos os acordions
      accordions.forEach(function (header) {
        header.classList.remove("active");
        header.nextElementSibling.style.display = "none";
      });

      // Abrir o accordion clicado se não estava ativo
      if (!isActive) {
        this.classList.add("active");
        body.style.display = "block";
      }
    });
  });
});
