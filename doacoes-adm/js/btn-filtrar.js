document.addEventListener("DOMContentLoaded", function () {
  // Seleciona o elemento do filtro
  const filtroSelect = document.getElementById("btn-filtrar");

  // Seleciona todas as linhas da tabela
  const linhasTabela = document.querySelectorAll(".tabela-doacoes tbody tr");

  // Função para aplicar o filtro
  function aplicarFiltro(filtro) {
    linhasTabela.forEach((linha) => {
      const buttonVistoria = linha.querySelector(
        "button.vistoria-realizada, button.vistoria-pendente"
      );

      // Verifica a classe do botão de vistoria
      const tipoVistoria = buttonVistoria
        ? buttonVistoria.textContent.trim().toLowerCase()
        : "";

      // Verifica o valor do filtro e aplica a visibilidade
      if (
        filtro === "todas" ||
        (filtro === "realizada" && tipoVistoria === "realizada") ||
        (filtro === "pendente" && tipoVistoria === "pendente")
      ) {
        linha.style.display = ""; // Mostra a linha
      } else {
        linha.style.display = "none"; // Oculta a linha
      }
    });
  }

  // Adiciona um evento ao filtro para aplicar o filtro quando a seleção mudar
  filtroSelect.addEventListener("change", function () {
    const filtroSelecionado = this.value;
    aplicarFiltro(filtroSelecionado);
  });

  // Aplica o filtro inicial (por padrão, "todas")
  aplicarFiltro("todas");
});
