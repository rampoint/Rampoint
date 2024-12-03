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

  const changeFontSize = () => (document.body.style.fontSize = "larger");
  const changeLineHeight = () => (document.body.style.lineHeight = "1.8");
  const changeLetterSpacing = () => (document.body.style.letterSpacing = "2px");

  const clearAccessibility = () => {
    document.body.style.fontSize = "";
    document.body.style.lineHeight = "";
    document.body.style.letterSpacing = "";
    document.body.style.filter = ""; // Resetando filtros de contraste e saturação
  };

  const clearBtn = document.getElementById("clearAccessibility");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearAccessibility);
  }

  const groupButtons = document.querySelectorAll(".group-btn");

  groupButtons.forEach((button, index) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      switch (index) {
        case 0:
          changeFontSize();
          break;
        case 1:
          changeLineHeight();
          break;
        case 2:
          changeLetterSpacing();
          break;
        case 7: // Contraste
          toggleContrast();
          break;
        case 8: // Saturação
          toggleSaturation();
          break;
        default:
          break;
      }
    });
  });

  const toggleContrast = () => {
    const currentFilter = document.body.style.filter;
    if (currentFilter.includes("contrast")) {
      document.body.style.filter = ""; // Resetando o contraste
    } else {
      document.body.style.filter = "contrast(200%)"; // Aplicando o contraste
    }
  };

  const toggleSaturation = () => {
    const currentFilter = document.body.style.filter;
    if (currentFilter.includes("saturate")) {
      document.body.style.filter = ""; // Resetando a saturação
    } else {
      document.body.style.filter = "saturate(2)"; // Aplicando saturação
    }
  };

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
