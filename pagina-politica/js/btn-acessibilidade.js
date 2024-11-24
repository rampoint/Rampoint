document.addEventListener("DOMContentLoaded", function () {
  const accessibilityBtn = document.getElementById("accessibilityBtn");
  const accessibilityMenu = document.getElementById("accessibilityMenu");
  const icon = accessibilityBtn.querySelector(".icon img");

  const toggleMenu = () => {
    const isMenuActive = accessibilityMenu.classList.toggle("active");

    if (isMenuActive) {
      accessibilityBtn.classList.add("menu-open");
      icon.src = "./img/icon-close.svg";
    } else {
      accessibilityBtn.classList.remove("menu-open");
      icon.src = "./img/icon-acessibilidade.svg";
    }
  };

  accessibilityBtn.addEventListener("click", toggleMenu);

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

  // Funções de acessibilidade para os botões
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
        case 6: // Contraste
          toggleContrast();
          break;
        case 7: // Saturação
          toggleSaturation();
          break;
        default:
          break;
      }
    });
  });

  // Função para alterar o contraste
  const toggleContrast = () => {
    const currentFilter = document.body.style.filter;
    if (currentFilter.includes("contrast")) {
      document.body.style.filter = ""; // Resetando o contraste
    } else {
      document.body.style.filter = "contrast(200%)"; // Aplicando o contraste
    }
  };

  // Função para alterar a saturação
  const toggleSaturation = () => {
    const currentFilter = document.body.style.filter;
    if (currentFilter.includes("saturate")) {
      document.body.style.filter = ""; // Resetando a saturação
    } else {
      document.body.style.filter = "saturate(2)"; // Aplicando saturação
    }
  };

  // Função para alterar as imagens das setas e a imagem de fundo conforme o tema
  const changeArrowImages = (theme) => {
    // Alterar imagem de fundo
    const fundoImg = document.querySelector(".img-fundo");
    if (fundoImg) {
      if (theme === "escuro") {
        fundoImg.src = "./img/imagem-fundo-dark.svg"; // Caminho para imagem de fundo no modo escuro
      } else {
        fundoImg.src = "./img/imagem-fundo.svg"; // Caminho para imagem de fundo no modo claro
      }
    }
  };

  // Modo leitura
  const modoLeituraBtn = document.querySelector(".modo-leitura-btn");
  const elementsToToggle = [document.body];

  const applyTheme = (theme) => {
    elementsToToggle.forEach((el) => {
      if (el) {
        el.classList.toggle("modo-escuro", theme === "escuro");
        el.classList.toggle("modo-claro", theme === "claro");
      }
    });

    // Alterar as imagens das setas e de fundo
    changeArrowImages(theme);

    localStorage.setItem("modoLeitura", theme);
  };

  const carregarModoLeitura = () => {
    const modoSalvo = localStorage.getItem("modoLeitura") || "claro";
    console.log("Modo de leitura carregado: " + modoSalvo); // Depuração
    applyTheme(modoSalvo);
  };

  const toggleModoLeitura = () => {
    const isDarkMode = document.body.classList.contains("modo-escuro");
    const newTheme = isDarkMode ? "claro" : "escuro";
    console.log("Trocando para o tema: " + newTheme); // Depuração
    applyTheme(newTheme);
  };

  if (modoLeituraBtn) {
    modoLeituraBtn.addEventListener("click", toggleModoLeitura);
  }

  carregarModoLeitura();
});
