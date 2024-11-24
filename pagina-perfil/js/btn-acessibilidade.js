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

  const changeAlertImages = (theme) => {
    const alerts = document.querySelectorAll(".alerta_del");
    alerts.forEach((alert) => {
      if (theme === "escuro") {
        alert.src = "./img/info-circle-dark.svg"; // Caminho para o tema escuro
      } else {
        alert.src = "./img/info-circle.svg"; // Caminho para o tema claro
      }
    });
  };

  const applyTheme = (theme) => {
    document.body.classList.toggle("modo-escuro", theme === "escuro");
    document.body.classList.toggle("modo-claro", theme === "claro");

    // Atualizar imagens conforme o tema
    changeAlertImages(theme);

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

  const modoLeituraBtn = document.querySelector(".modo-leitura-btn");
  if (modoLeituraBtn) {
    modoLeituraBtn.addEventListener("click", toggleModoLeitura);
  }

  carregarModoLeitura();
});
