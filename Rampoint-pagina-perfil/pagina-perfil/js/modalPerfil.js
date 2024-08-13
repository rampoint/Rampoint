const switchModal = () => {
  const modal = document.querySelector(".modal-perfil");
  const actualStyle = modal.style.display;
  if (actualStyle == "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
};

const btn = document.querySelector(".modalBtn-perfil");
btn.addEventListener("click", switchModal);

window.onclick = function (event) {
  const modal = document.querySelector(".modal-perfil");
  if (event.target == modal) {
    switchModal();
  }
};
