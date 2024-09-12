const switchModal = () => {
  const modal = document.querySelector(".modal-perfil");
  modal.style.display = modal.style.display === "block" ? "none" : "block";
  document.body.style.overflow =
    modal.style.display === "block" ? "hidden" : ""; // Bloqueia a rolagem da página principal quando o modal está aberto
};

document
  .querySelector(".modalBtn-perfil")
  .addEventListener("click", switchModal);

document.querySelector(".icon-x").addEventListener("click", switchModal);

window.onclick = function (event) {
  const modal = document.querySelector(".modal-perfil");
  if (event.target === modal) {
    switchModal();
  }
};
