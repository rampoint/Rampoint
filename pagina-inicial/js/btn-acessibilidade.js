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

  // Funções de acessibilidade para os 4 primeiros botões
  const changeFontSize = () => document.body.style.fontSize = 'larger';
  const changeFontFamily = () => document.body.style.fontFamily = 'Arial, sans-serif';
  const changeLineHeight = () => document.body.style.lineHeight = '1.8';
  const changeLetterSpacing = () => document.body.style.letterSpacing = '2px';

  const clearAccessibility = () => {
    document.body.style.fontSize = "";
    document.body.style.fontFamily = "";
    document.body.style.lineHeight = "";
    document.body.style.letterSpacing = "";
  };

  const clearBtn = document.getElementById("clearAccessibility");
  clearBtn.addEventListener("click", clearAccessibility);

  const groupButtons = document.querySelectorAll('.group-btn');

  groupButtons.forEach((button, index) => {
    button.addEventListener('click', function (event) {
      event.preventDefault();

      switch (index) {
        case 0:
          changeFontSize();
          break;
        case 1:
          changeFontFamily();
          break;
        case 2:
          changeLineHeight();
          break;
        case 3:
          changeLetterSpacing();
          break;
        default:
          break;
      }
    });
  });
});
