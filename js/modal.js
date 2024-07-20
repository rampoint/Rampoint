document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalSemPerfil");
  const openModalBtn = document.getElementById("openModalBtn");

  openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Esconde o modal ao rolar a página
  window.addEventListener("scroll", () => {
    if (modal.style.display === "block") {
      modal.style.display = "none";
    }
  });
});