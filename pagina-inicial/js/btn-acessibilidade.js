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

  const clearAccessibility = () => {
    document.body.style.fontSize = "";
    document.body.style.fontFamily = "";
    document.body.style.lineHeight = "";
    document.body.style.letterSpacing = "";
    document.body.style.filter = "";
  };

  const clearBtn = document.getElementById("clearAccessibility");
  clearBtn.addEventListener("click", clearAccessibility);
});
