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

    // Alterar a imagem do modo escuro e claro
    const imagemInicial = document.querySelector(".imagem-inicial");
    if (imagemInicial) {
      imagemInicial.src =
        theme === "escuro"
          ? "./img/imagem-inicial-dark.svg"
          : "./img/imagem-inicial.svg";
    }

    // Alterar a imagem das medalhas
    const medalhasImagem = document.getElementById("medalhas");
    if (medalhasImagem) {
      medalhasImagem.src =
        theme === "escuro" ? "./img/medalhas-dark.svg" : "./img/medalhas.svg";
    }

    // Alterar a imagem do mascote Ram
    const ramEmpeImagem = document.querySelector(".ramEmpe");
    if (ramEmpeImagem) {
      ramEmpeImagem.src =
        theme === "escuro" ? "./img/ramEmpe-dark.svg" : "./img/ramEmpe.svg";
    }

    // Alterar a imagem do ícone de madeira
    const iconMadeira = document.querySelector("#iconMadeira");
    if (iconMadeira) {
      iconMadeira.src =
        theme === "escuro"
          ? "./img/icon-madeira-dark.svg"
          : "./img/icon-madeira.svg";
    }

    // Alterar a imagem do ícone de pneu
    const iconPneu = document.querySelector("#iconPneu");
    if (iconPneu) {
      iconPneu.src =
        theme === "escuro" ? "./img/icon-pneu-dark.svg" : "./img/icon-pneu.svg";
    }

    // Alterar a imagem do ícone reciclável
    const iconReciclavel = document.querySelector("#iconReciclavel");
    if (iconReciclavel) {
      iconReciclavel.src =
        theme === "escuro"
          ? "./img/icon-reciclavel-dark.svg"
          : "./img/icon-reciclavel.svg";
    }

    // Alterar a imagem do ícone de metal
    const iconMetal = document.querySelector("#iconMetal");
    if (iconMetal) {
      iconMetal.src =
        theme === "escuro"
          ? "./img/icon-metal-dark.svg"
          : "./img/icon-metal.svg";
    }

    // Alterar a imagem do ícone eletrônico
    const iconEletronico = document.querySelector("iconEletronico");
    if (iconEletronico) {
      iconEletronico.src =
        theme === "escuro"
          ? "./img/icon-eletronico-dark.svg"
          : "./img/icon-eletronico.svg";
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
