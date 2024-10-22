document.addEventListener("DOMContentLoaded", function () {
  const selectedOption = document.querySelector(".selected-option");
  const optionsContainer = document.querySelector(".options");
  const selectedImage = document.getElementById("selected-image");

  selectedOption.addEventListener("click", function () {
    optionsContainer.style.display =
      optionsContainer.style.display === "block" ? "none" : "block";
  });

  const optionsList = document.querySelectorAll(".option");

  optionsList.forEach((option) => {
    option.addEventListener("click", function () {
      const imageSrc = this.dataset.image; // Pega a imagem da opção selecionada
      selectedOption.querySelector("span").textContent =
        this.textContent.trim();
      selectedImage.src = imageSrc; // Atualiza a imagem selecionada
      selectedImage.alt = this.textContent.trim(); // Atualiza o texto alternativo da imagem
      selectedImage.style.display = "inline"; // Exibe a imagem
      document.getElementById("selected-option").value = this.dataset.value; // Atualiza o valor oculto
      optionsContainer.style.display = "none"; // Fecha o menu de opções
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".custom-select")) {
      optionsContainer.style.display = "none";
    }
  });
});
