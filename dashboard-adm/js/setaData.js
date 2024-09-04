const tabela = document.querySelector(".tabela-doadores tbody");
const colunaData = document.getElementById("coluna-data");
const seta = document.getElementById("seta");

let ordemCrescente = true;

colunaData.addEventListener("click", () => {
  const linhas = Array.from(tabela.querySelectorAll("tr"));

  linhas.sort((a, b) => {
    const dataA = a.cells[2].innerText.split("/").reverse().join("");
    const dataB = b.cells[2].innerText.split("/").reverse().join("");

    return ordemCrescente
      ? dataA.localeCompare(dataB)
      : dataB.localeCompare(dataA);
  });

  ordemCrescente = !ordemCrescente;

  linhas.forEach((linha) => tabela.appendChild(linha));

  seta.innerHTML = ordemCrescente ? "&darr;" : "&uarr;";
});
