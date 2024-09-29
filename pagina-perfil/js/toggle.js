document.addEventListener("DOMContentLoaded", () => {
  const conquistasButton = document.getElementById("conquistasButton");
  const cuponsButton = document.getElementById("cuponsButton");

  const conquistasContent = document.getElementById("conquistasContent");
  const cuponsContent = document.getElementById("cuponsContent");
  
  conquistasButton.addEventListener("click", () => {
    conquistasButton.classList.add("active");
    cuponsButton.classList.remove("active");

    conquistasContent.classList.add("active");
    cuponsContent.classList.remove("active");
  });

  cuponsButton.addEventListener("click", () => {
    cuponsButton.classList.add("active");
    conquistasButton.classList.remove("active");

    cuponsContent.classList.add("active");
    conquistasContent.classList.remove("active");
  });
});
