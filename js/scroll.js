document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top:
          targetElement.offsetTop - document.querySelector("nav").offsetHeight, // Compensa o menu fixo
        behavior: "smooth",
      });
    }
  });
});
