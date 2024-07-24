document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const accordionCollapse = header.nextElementSibling;

    if (header.classList.contains("active")) {
      header.classList.remove("active");
      accordionCollapse.style.display = "none";
    } else {
      document
        .querySelectorAll(".accordion-header")
        .forEach((hdr) => hdr.classList.remove("active"));
      document
        .querySelectorAll(".accordion-collapse")
        .forEach((collapse) => (collapse.style.display = "none"));

      header.classList.add("active");
      accordionCollapse.style.display = "block";
    }
  });
});
