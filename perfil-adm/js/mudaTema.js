document.addEventListener("DOMContentLoaded", () => {
  const themeIcon = document.getElementById("theme-icon");
  const mainContent = document.querySelector(".main-content");
  const sidebar = document.querySelector(".sidebar");
  const spanLogo = document.querySelector(".span-logo");
  const nameUser = document.querySelector(".nome-usuario");
  const linkSidebar = document.querySelectorAll(".nav-item");
  const iconSidebar = document.querySelectorAll("i");

  const tituloPagina = document.querySelector(".titulo-pagina");
  const fundoTitulo = document.querySelector(".fundo-titulo");
  const titulo1 = document.querySelector(".titulo-inicial");
  const fundoPerfil = document.querySelector(".fundo-perfil");
  const nomeAdm = document.querySelector(".nome-adm");
  const emailAdm = document.querySelector(".email-adm");
  const modalBtn = document.querySelector(".modalBtn-perfil");
  const fundoModal = document.querySelector(".modal-perfil");
  const contentModal = document.querySelector(".content-perfil");
  const labelModal = document.querySelectorAll("label");
  const inputModal = document.querySelectorAll("input");
  const editarModal = document.querySelector(".excluir-conta");
  const titulo2 = document.querySelector(".titulo-doacoes");
  const fundoGrafico = document.querySelector(".grafico-coluna");
  const fundoGrafico2 = document.querySelector(".grafico-pizza");

  const updateGraficoBackground = (theme) => {
    Highcharts.chart("container", {
      chart: {
        type: "column",
        backgroundColor: theme === "dark" ? "#282828" : "#fff",
        borderWidth: 0,
      },
      title: {
        text: "",
        align: "left",
      },
      xAxis: {
        categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
        labels: {
          style: {
            color: theme === "dark" ? "#718EBF" : "#718ebf",
          },
        },
      },
      yAxis: {
        labels: {
          style: {
            color: theme === "dark" ? "#718EBF" : "#000",
          },
        },
      },

      tooltip: {
        valueSuffix: "",
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      legend: {
        itemStyle: {
          color: theme === "dark" ? "#fff" : "#000",
        },
      },
      series: [
        {
          name: "Doações",
          data: [30, 45, 12, 64, 54, 34],
          color: "#2A55C2",
        },
        {
          name: "Novos Usuários",
          data: [45, 14, 10, 14, 19, 11],
          color: "#7AD761",
        },
      ],
    });

    Highcharts.chart("container2", {
      chart: {
        type: "variablepie",
        backgroundColor: theme === "dark" ? "#282828" : "#fff",
      },
      title: {
        text: "",
      },
      series: [
        {
          innerSize: "20%",
          data: [
            { name: "Interno", y: 50592, z: 92, color: "#FFBB38" },
            { name: "Resfriamento", y: 551695, z: 95, color: "#7AD761" },
            { name: "Estrutura", y: 312679, z: 121, color: "#C67DFF" },
            { name: "Periférico", y: 78865, z: 136, color: "#2A55C2" },
          ],
        },
      ],
    });
  };

  const applyTheme = (theme) => {
    console.log(theme);
    document.body.classList.toggle("dark-theme", theme === "dark");
    document.body.classList.toggle("light-theme", theme === "light");

    mainContent.classList.toggle("dark-theme", theme === "dark");
    sidebar.classList.toggle("dark-theme", theme === "dark");
    nameUser.classList.toggle("dark-theme", theme === "dark");
    spanLogo.classList.toggle("dark-theme", theme === "dark");

    tituloPagina.classList.toggle("dark-theme", theme === "dark");
    fundoTitulo.classList.toggle("dark-theme", theme === "dark");
    titulo1.classList.toggle("dark-theme", theme === "dark");
    fundoPerfil.classList.toggle("dark-theme", theme === "dark");
    nomeAdm.classList.toggle("dark-theme", theme === "dark");
    emailAdm.classList.toggle("dark-theme", theme === "dark");
    modalBtn.classList.toggle("dark-theme", theme === "dark");
    fundoModal.classList.toggle("dark-theme", theme === "dark");
    contentModal.classList.toggle("dark-theme", theme === "dark");
    editarModal.classList.toggle("dark-theme", theme === "dark");
    titulo2.classList.toggle("dark-theme", theme === "dark");
    fundoGrafico.classList.toggle("dark-theme", theme === "dark");
    fundoGrafico2.classList.toggle("dark-theme", theme === "dark");

    labelModal.forEach((label) =>
      label.classList.toggle("dark-theme", theme === "dark")
    );
    inputModal.forEach((input) =>
      input.classList.toggle("dark-theme", theme === "dark")
    );
    iconSidebar.forEach((icon) =>
      icon.classList.toggle("dark-theme", theme === "dark")
    );
    linkSidebar.forEach((link) =>
      link.classList.toggle("dark-theme", theme === "dark")
    );

    themeIcon.classList.toggle("bx-moon", theme === "dark");
    themeIcon.classList.toggle("bx-sun", theme !== "dark");
    var alteracao = document.querySelector(`#alteracao_popup_light`);
    var outro = document.querySelector(`#alteracao_popup_dark`);
    if (theme == "light") {
      outro.classList.remove("-active");
      alteracao.classList.toggle("-active");
    } else {
      var alteracao = document.querySelector(`#alteracao_popup_light`);
      var outro = document.querySelector(`#alteracao_popup_dark`);
      alteracao.classList.remove("-active");
      outro.classList.toggle("-active");
    }

    updateGraficoBackground(theme);
    localStorage.setItem("theme", theme);
  };

  const currentTheme = localStorage.getItem("theme") || "light";
  applyTheme(currentTheme);

  themeIcon.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark-theme")
      ? "light"
      : "dark";
    applyTheme(newTheme);
  });
});
