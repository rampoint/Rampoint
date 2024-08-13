document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalSemPerfil");
  const openModalBtn = document.getElementById("openModalBtn");
  const modalContent = document.getElementById("modalContent");

  openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Esconde o modal ao rolar a página
  window.addEventListener("scroll", () => {
    if (modal.style.display === "block") {
      modal.style.display = "none";
    }
  });

  // Esconde o modal ao clicar fora do conteúdo do modal
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
