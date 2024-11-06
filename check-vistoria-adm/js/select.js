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
      const imageSrc = this.dataset.image; 
      selectedOption.querySelector("span").textContent =
        this.textContent.trim();
      selectedImage.src = imageSrc; 
      selectedImage.alt = this.textContent.trim(); 
      selectedImage.style.display = "inline"; 
      document.getElementById("selected-option").value = this.dataset.value; 
      optionsContainer.style.display = "none"; 
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".custom-select")) {
      optionsContainer.style.display = "none";
    }
  });
});
