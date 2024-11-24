document.addEventListener("DOMContentLoaded", function () {
  const accessibilityBtn = document.getElementById("accessibilityBtn");
  const accessibilityMenu = document.getElementById("accessibilityMenu");
  const iconContainer = accessibilityBtn.querySelector(".icon");
  const imageElement = document.querySelector(".imagem-inicial");
  const medalhasImage = document.getElementById("medalhas");
  const ramEmpeImage = document.querySelector(".ramEmpe");

  // Novas imagens
  const iconMadeira = document.getElementById("iconMadeira");
  const iconPneu = document.getElementById("iconPneu");
  const iconReciclavel = document.getElementById("iconReciclavel");
  const iconMetal = document.getElementById("iconMetal");
  const iconEletronico = document.getElementById("iconEletronico");

  const toggleMenu = () => {
    const isMenuActive = accessibilityMenu.classList.toggle("active");

    if (isMenuActive) {
      accessibilityBtn.classList.add("menu-open");
      iconContainer.innerHTML =
        "<span class='icon-x' style='font-size: 24px; color: #2A55C2; font-weight: bold;'>×</span>"; // Mostra o ícone de 'X' quando o menu está aberto
    } else {
      accessibilityBtn.classList.remove("menu-open");
      iconContainer.innerHTML =
        "<img src='./img/icon-acessibilidade.svg' alt='Acessibilidade'>"; // Retorna a imagem padrão quando o menu está fechado
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

  // Função para alterar as imagens do grupo de botões com base no tema
  const changeButtonImages = (theme) => {
    const buttons = document.querySelectorAll(".group-btn img");

    buttons.forEach((img) => {
      const buttonText = img
        .closest(".group-btn")
        .querySelector("h4").textContent;

      if (buttonText === "Espaço entre linhas") {
        img.src =
          theme === "escuro"
            ? "./img/btn-acessibilidade/espaco-linhas-dark.svg"
            : "./img/btn-acessibilidade/espaco-linhas.svg";
      } else if (buttonText === "Espaço entre letras") {
        img.src =
          theme === "escuro"
            ? "./img/btn-acessibilidade/espaco-letras-dark.svg"
            : "./img/btn-acessibilidade/espaco-letras.svg";
      } else if (buttonText === "Leitor de Sites") {
        img.src =
          theme === "escuro"
            ? "./img/btn-acessibilidade/leitor-sites-dark.svg"
            : "./img/btn-acessibilidade/leitor-sites.svg";
      } else if (buttonText === "Modo de Leitura") {
        img.src =
          theme === "escuro"
            ? "./img/btn-acessibilidade/modo-leitura-dark.svg"
            : "./img/btn-acessibilidade/modo-leitura.svg";
      } else if (buttonText === "Máscara de leitura") {
        img.src =
          theme === "escuro"
            ? "./img/btn-acessibilidade/mascara-leitura-dark.svg"
            : "./img/btn-acessibilidade/mascara-leitura.svg";
      } else if (buttonText === "Lupa") {
        img.src =
          theme === "escuro"
            ? "./img/btn-acessibilidade/lupa-dark.svg"
            : "./img/btn-acessibilidade/lupa.svg";
      } else if (buttonText === "Contraste") {
        img.src =
          theme === "escuro"
            ? "./img/btn-acessibilidade/contraste-dark.svg"
            : "./img/btn-acessibilidade/contraste.svg";
      } else if (buttonText === "Saturação") {
        img.src =
          theme === "escuro"
            ? "./img/btn-acessibilidade/saturacao-dark.svg"
            : "./img/btn-acessibilidade/saturacao.svg";
      } else if (buttonText === "Tamanho da fonte") {
        img.src =
          theme === "escuro"
            ? "./img/btn-acessibilidade/A+-dark.svg"
            : "./img/btn-acessibilidade/A+.svg";
      }
    });
  };

  // Função que aplica o tema e altera as imagens
  const applyTheme = (theme) => {
    document.body.classList.toggle("modo-escuro", theme === "escuro");
    document.body.classList.toggle("modo-claro", theme === "claro");

    // Atualizar imagens dos botões
    changeButtonImages(theme);

    // Atualiza as imagens adicionais
    if (theme === "escuro") {
      imageElement.src = "./img/imagem-inicial-dark.svg"; // Imagem para o modo escuro
      medalhasImage.src = "./img/medalhas-dark.svg"; // Imagem para medalhas no modo escuro
      ramEmpeImage.src = "./img/ramEmpe-dark.svg"; // Imagem para o mascote no modo escuro

      // Novas imagens para o modo escuro
      iconMadeira.src = "./img/icon-madeira-dark.svg";
      iconPneu.src = "./img/icon-pneu-dark.svg";
      iconReciclavel.src = "./img/icon-reciclavel-dark.svg";
      iconMetal.src = "./img/icon-metal-dark.svg";
      iconEletronico.src = "./img/icon-eletronico-dark.svg";
    } else {
      imageElement.src = "./img/imagem-inicial.svg"; // Imagem padrão
      medalhasImage.src = "./img/medalhas.svg"; // Imagem para medalhas no modo claro
      ramEmpeImage.src = "./img/ramEmpe.svg"; // Imagem para o mascote no modo claro

      // Novas imagens para o modo claro
      iconMadeira.src = "./img/icon-madeira.svg";
      iconPneu.src = "./img/icon-pneu.svg";
      iconReciclavel.src = "./img/icon-reciclavel.svg";
      iconMetal.src = "./img/icon-metal.svg";
      iconEletronico.src = "./img/icon-eletronico.svg";
    }

    localStorage.setItem("modoLeitura", theme); // Salva o tema no localStorage
  };

  const carregarModoLeitura = () => {
    const modoSalvo = localStorage.getItem("modoLeitura") || "claro"; // Carregar o tema salvo
    applyTheme(modoSalvo); // Aplica o tema salvo
  };

  const toggleModoLeitura = () => {
    const isDarkMode = document.body.classList.contains("modo-escuro");
    const newTheme = isDarkMode ? "claro" : "escuro"; // Alterna entre claro e escuro
    applyTheme(newTheme);
  };

  const modoLeituraBtn = document.querySelector(".modo-leitura-btn");
  if (modoLeituraBtn) {
    modoLeituraBtn.addEventListener("click", toggleModoLeitura);
  }

  carregarModoLeitura();
});
