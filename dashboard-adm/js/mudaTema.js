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
  const subtitulo = document.querySelector(".subtitulo");

  const tituloDoadores = document.querySelector(".titulo-doadores");
  const fundoGrafico = document.querySelector(".grafico-coluna");

  const tituloNotf = document.querySelector(".titulo-notificacoes");
  const fundoNotf = document.querySelector(".fundo-notificacoes");
  const tituloMsg = document.querySelectorAll(".titulo-mensagem");
  const mensagens = document.querySelectorAll(".mensagem");
  const spanMensagens = document.querySelectorAll(".span-mensagem");
  const horaMsg = document.querySelectorAll(".horario");

  const linkDoacao = document.querySelector(".link-doacoes");
  const tabelaDoacoes = document.querySelector(".tabela-doadores");
  const titulotabela = document.querySelectorAll("th");
  const conteudoTabela = document.querySelectorAll("td");

  const updateGraficoBackground = (theme) => {
    Highcharts.chart("container", {
      chart: {
        type: "column",
        backgroundColor: theme === "dark" ? "#282828" : "#fff",
      },
      title: {
        text: "",
        align: "left",
      },
      subtitle: {
        text: "",
        align: "left",
      },
      xAxis: {
        categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
        crosshair: true,
        labels: {
          style: {
            color: theme === "dark" ? "#718EBF" : "#000",
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "",
        },
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
          color: theme === "dark" ? "#2A55C2" : "#2A55C2",
        },
        {
          name: "Novos Usuários",
          data: [45, 14, 10, 14, 19, 11],
          color: theme === "dark" ? "#7AD761" : "#7AD761",
        },
      ],
    });
  };

  const applyThemeToTH = (theme) => {
    titulotabela.forEach((th) => {
      if (theme === "dark") {
        th.classList.add("dark-theme");
        th.classList.remove("light-theme");
      } else {
        th.classList.add("light-theme");
        th.classList.remove("dark-theme");
      }
    });
  };

  const applyThemeToTD = (theme) => {
    conteudoTabela.forEach((td) => {
      if (theme === "dark") {
        td.classList.add("dark-theme");
        td.classList.remove("light-theme");
      } else {
        td.classList.add("light-theme");
        td.classList.remove("dark-theme");
      }
    });
  };

  if (localStorage.getItem("theme") === "dark") {
    updateGraficoBackground("dark");
    applyThemeToTH("dark");
  } else {
    updateGraficoBackground("light");
    applyThemeToTH("light");
  }

  if (localStorage.getItem("theme") === "dark") {
    updateGraficoBackground("dark");
    applyThemeToTD("dark");
  } else {
    updateGraficoBackground("light");
    applyThemeToTD("light");
  }

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");

    mainContent.classList.remove("light-theme");
    mainContent.classList.add("dark-theme");

    sidebar.classList.remove("light-theme");
    sidebar.classList.add("dark-theme");

    spanLogo.classList.remove("light-theme");
    spanLogo.classList.add("dark-theme");

    nameUser.classList.remove("light-theme");
    nameUser.classList.add("dark-theme");

    tituloPagina.classList.remove("light-theme");
    tituloPagina.classList.add("dark-theme");

    fundoTitulo.classList.remove("light-theme");
    fundoTitulo.classList.add("dark-theme");

    titulo1.classList.remove("light-theme");
    titulo1.classList.add("dark-theme");

    subtitulo.classList.remove("light-theme");
    subtitulo.classList.add("dark-theme");

    tituloNotf.classList.remove("light-theme");
    tituloNotf.classList.add("dark-theme");

    tituloDoadores.classList.remove("light-theme");
    tituloDoadores.classList.add("dark-theme");

    fundoGrafico.classList.remove("light-theme");
    fundoGrafico.classList.add("dark-theme");

    fundoNotf.classList.remove("light-theme");
    fundoNotf.classList.add("dark-theme");

    linkDoacao.classList.remove("light-theme");
    linkDoacao.classList.add("dark-theme");

    tabelaDoacoes.classList.remove("light-theme");
    tabelaDoacoes.classList.add("dark-theme");

    iconSidebar.forEach((icon) => {
      icon.classList.remove("light-theme");
      icon.classList.add("dark-theme");
    });

    linkSidebar.forEach((link) => {
      link.classList.remove("light-theme");
      link.classList.add("dark-theme");
    });

    mensagens.forEach((mensagem) => {
      mensagem.classList.remove("light-theme");
      mensagem.classList.add("dark-theme");
    });

    spanMensagens.forEach((spanMensagem) => {
      spanMensagem.classList.remove("light-theme");
      spanMensagem.classList.add("dark-theme");
    });

    tituloMsg.forEach((titulo) => {
      titulo.classList.remove("light-theme");
      titulo.classList.add("dark-theme");
    });

    horaMsg.forEach((hora) => {
      hora.classList.remove("light-theme");
      hora.classList.add("dark-theme");
    });

    titulotabela.forEach((th) => {
      th.classList.remove("light-theme");
      th.classList.add("dark-theme");
    });

    conteudoTabela.forEach((td) => {
      td.classList.remove("light-theme");
      td.classList.add("dark-theme");
    });

    themeIcon.classList.remove("bx-sun");
    themeIcon.classList.add("bx-moon");
  }

  themeIcon.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");

    mainContent.classList.toggle("dark-theme");
    mainContent.classList.toggle("light-theme");

    sidebar.classList.toggle("dark-theme");
    sidebar.classList.toggle("light-theme");

    nameUser.classList.toggle("dark-theme");
    nameUser.classList.toggle("light-theme");

    spanLogo.classList.toggle("dark-theme");
    spanLogo.classList.toggle("light-theme");

    tituloPagina.classList.toggle("dark-theme");
    tituloPagina.classList.toggle("light-theme");

    fundoTitulo.classList.toggle("dark-theme");
    fundoTitulo.classList.toggle("light-theme");

    titulo1.classList.toggle("dark-theme");
    titulo1.classList.toggle("light-theme");

    subtitulo.classList.toggle("dark-theme");
    subtitulo.classList.toggle("light-theme");

    tituloNotf.classList.toggle("dark-theme");
    tituloNotf.classList.toggle("light-theme");

    tituloDoadores.classList.toggle("dark-theme");
    tituloDoadores.classList.toggle("light-theme");

    fundoGrafico.classList.toggle("dark-theme");
    fundoGrafico.classList.toggle("light-theme");

    fundoNotf.classList.toggle("dark-theme");
    fundoNotf.classList.toggle("light-theme");

    linkDoacao.classList.toggle("dark-theme");
    linkDoacao.classList.toggle("light-theme");

    tabelaDoacoes.classList.toggle("dark-theme");
    tabelaDoacoes.classList.toggle("light-theme");

    iconSidebar.forEach((icon) => {
      icon.classList.toggle("dark-theme");
      icon.classList.toggle("light-theme");
    });

    linkSidebar.forEach((link) => {
      link.classList.toggle("dark-theme");
      link.classList.toggle("light-theme");
    });

    titulotabela.forEach((th) => {
      th.classList.toggle("dark-theme");
      th.classList.toggle("light-theme");
    });

    conteudoTabela.forEach((td) => {
      td.classList.toggle("dark-theme");
      td.classList.toggle("light-theme");
    });

    mensagens.forEach((mensagem) => {
      mensagem.classList.toggle("dark-theme");
      mensagem.classList.toggle("light-theme");
    });

    spanMensagens.forEach((spanMensagem) => {
      spanMensagem.classList.toggle("dark-theme");
      spanMensagem.classList.toggle("light-theme");
    });

    tituloMsg.forEach((titulo) => {
      titulo.classList.toggle("dark-theme");
      titulo.classList.toggle("light-theme");
    });

    horaMsg.forEach((hora) => {
      hora.classList.toggle("dark-theme");
      hora.classList.toggle("light-theme");
    });

    const currentTheme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
    updateGraficoBackground(currentTheme);

    if (themeIcon.classList.contains("bx-sun")) {
      themeIcon.classList.remove("bx-sun");
      themeIcon.classList.add("bx-moon");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.remove("bx-moon");
      themeIcon.classList.add("bx-sun");
      localStorage.setItem("theme", "light");
    }
  });
});
