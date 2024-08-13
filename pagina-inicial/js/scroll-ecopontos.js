document.getElementById('ecoponto').addEventListener('click', function () {
  const targetSection = document.getElementById('ecopontos');

  if (targetSection) {
      targetSection.scrollIntoView({
          behavior: 'smooth'
      });
  }
});
