document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalSemPerfil");
  const openModalBtn = document.getElementById("openModalBtn");

  openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  window.addEventListener("scroll", () => {
    if (modal.style.display === "block") {
      modal.style.display = "none";
    }
  });

  // Fechar o modal ao clicar fora dele
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});