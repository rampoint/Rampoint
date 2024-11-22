const switchModal = () => {
    const modal = document.querySelector('.modal-sem-perfil')
    const actualStyle = modal.style.display
    if(actualStyle == 'block') {
      modal.style.display = 'none'
    }
    else {
      modal.style.display = 'block'
    }
  }
  
  const btn = document.querySelector('.modalBtn')
  btn.addEventListener('click', switchModal)
  
  window.onclick = function(event) {
      const modal = document.querySelector('.modal-sem-perfil')
    if (event.target == modal) {
      switchModal()
    }
  }

  function mostrarPopupSalvo() {
    const popup = document.getElementById("qrcodeSalvo");
    popup.style.top = "20px";
    setTimeout(() => {
      popup.style.top = "-120px"; 
    }, 3000); 
  }
  