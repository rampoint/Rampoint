document.addEventListener("DOMContentLoaded", function () {
  // Selecione os elementos principais e sub-botões
  const mainButtons = document.querySelectorAll(".main-btn");
  const subButtonsContainers = document.querySelectorAll(".sub-buttons");
  const subButtons = document.querySelectorAll(".sub-btn");
  const contents = document.querySelectorAll(".content");

  // Definir 'Estrutura' e 'Gabinete' como ativos ao carregar a página
  document.getElementById("estrutura").classList.add("active");
  subButtonsContainers[0].style.display = "flex";
  document.getElementById("content1").style.display = "block";

  // Atualiza a exibição ao clicar em um botão principal
  mainButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remover a classe ativa de todos os botões principais e sub-botões
      mainButtons.forEach((btn) => btn.classList.remove("active"));
      subButtonsContainers.forEach(
        (container) => (container.style.display = "none")
      );
      contents.forEach((content) => (content.style.display = "none"));

      // Adicionar a classe ativa ao botão principal clicado
      button.classList.add("active");

      // Mostrar o sub-botões correspondente
      const categoryIndex = button.getAttribute("data-index");
      const subButtonsContainer = document.querySelector(
        `.sub-buttons[data-category="${categoryIndex}"]`
      );
      subButtonsContainer.style.display = "flex";

      // Mostrar o primeiro conteúdo da subcategoria selecionada
      const firstSubButton = subButtonsContainer.querySelector(".sub-btn");
      firstSubButton.classList.add("active");
      const contentToShow = firstSubButton.getAttribute("data-content");
      document.getElementById(contentToShow).style.display = "block";
    });
  });

  // Atualiza a exibição ao clicar em um sub-botão
  subButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remover a classe ativa de todos os sub-botões
      subButtons.forEach((btn) => btn.classList.remove("active"));
      contents.forEach((content) => (content.style.display = "none"));

      // Adicionar a classe ativa ao sub-botão clicado
      button.classList.add("active");

      // Mostrar o conteúdo correspondente ao sub-botão clicado
      const contentToShow = button.getAttribute("data-content");
      document.getElementById(contentToShow).style.display = "block";
    });
  });
});
