document.addEventListener("DOMContentLoaded", function () {
  const modoLeituraBtn = document.querySelector(".modo-leitura-btn");
  const accessibilityMenu = document.getElementById("accessibilityMenu");
  const accessibilityBtn = document.getElementById("accessibilityBtn");
  const iconContainer = accessibilityBtn.querySelector(".icon");

  const imageElement = document.querySelector(".imagem-inicial");
  const medalhasImage = document.getElementById("medalhas");
  const ramEmpeImage = document.querySelector(".ramEmpe");

  // Alternar menu de acessibilidade
  const toggleMenu = () => {
    const isMenuActive = accessibilityMenu.classList.toggle("active");

    if (isMenuActive) {
      accessibilityBtn.classList.add("menu-open");
      iconContainer.innerHTML =
        "<span class='icon-x' style='font-size: 24px; color: #2A55C2; font-weight: bold;'>×</span>";
    } else {
      accessibilityBtn.classList.remove("menu-open");
      iconContainer.innerHTML =
        "<img src='./img/icon-acessibilidade.svg' alt='Acessibilidade'>";
    }
  };

  if (accessibilityBtn) {
    accessibilityBtn.addEventListener("click", toggleMenu);
  }

  document.addEventListener("click", function (event) {
    if (
      !accessibilityBtn.contains(event.target) &&
      !accessibilityMenu.contains(event.target)
    ) {
      if (accessibilityMenu.classList.contains("active")) {
        toggleMenu();
      }
    }
  });

  // Alterar imagens com base no tema
  const changeImages = (theme) => {
    if (theme === "escuro") {
      imageElement.src = "./img/imagem-inicial-dark.svg";
      medalhasImage.src = "./img/medalhas-dark.svg";
      ramEmpeImage.src = "./img/ramEmpe-dark.svg";
    } else {
      imageElement.src = "./img/imagem-inicial.svg";
      medalhasImage.src = "./img/medalhas.svg";
      ramEmpeImage.src = "./img/ramEmpe.svg";
    }
  };

  // Aplicar tema claro/escuro
  const applyTheme = (theme) => {
    document.body.classList.toggle("modo-escuro", theme === "escuro");
    document.body.classList.toggle("modo-claro", theme === "claro");

    changeImages(theme);

    if (theme === "escuro") {
      modoLeituraBtn.classList.remove("bx-sun");
      modoLeituraBtn.classList.add("bx-moon");
      modoLeituraBtn.style.color = "#ffffff";
    } else {
      modoLeituraBtn.classList.remove("bx-moon");
      modoLeituraBtn.classList.add("bx-sun");
      modoLeituraBtn.style.color = "";
    }

    localStorage.setItem("modoLeitura", theme);
  };

  const carregarModoLeitura = () => {
    const modoSalvo = localStorage.getItem("modoLeitura") || "claro";
    applyTheme(modoSalvo);
  };

  const toggleModoLeitura = () => {
    const isDarkMode = document.body.classList.contains("modo-escuro");
    const newTheme = isDarkMode ? "claro" : "escuro";
    applyTheme(newTheme);
  };

  if (modoLeituraBtn) {
    modoLeituraBtn.addEventListener("click", toggleModoLeitura);
  }

  carregarModoLeitura();
});
