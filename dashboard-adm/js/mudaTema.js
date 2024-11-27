document.addEventListener("DOMContentLoaded", () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDUzAILLjPJy3zoUVWkD7U4YdI6MDh_QlS4",
    authDomain: "rampoint-81352.firebaseapp.com",
    databaseURL: "https://rampoint-81352-default-rtdb.firebaseio.com",
    projectId: "rampoint-81352",
    storageBucket: "rampoint-81352.appspot.com",
    messagingSenderId: "694254448576",
    appId: "1:694254448576:web:7b78f9707f2625aa9ca225",
    measurementId: "G-5GMT9136G7",
  };

  // Inicialização do Firebase
  const database = firebase.database();

  // Função para processar dados do Firebase
  const processFirebaseData = (data) => {
    const months = Array(12).fill(0); // Array para contar doações por mês
    const newUsers = Array(12).fill(0); // Array para contar novos usuários por mês
    const pecasPorTipo = {
      Interno: 0,
      Resfriamento: 0,
      Estrutura: 0,
      Periférico: 0,
    };

    // Processar dados dos usuários
    Object.values(data.users || {}).forEach((user) => {
      // Verifica se dataCriacao está definido e é uma string
      if (user.dataCriacao && typeof user.dataCriacao === "string") {
        const [dia, mes, ano] = user.dataCriacao.split("/");
        const mesIndex = parseInt(mes) - 1; // Arrays são 0-based
        newUsers[mesIndex]++;
      } else {
        console.warn(
          `dataCriacao indefinido ou inválido para o usuário: ${JSON.stringify(
            user
          )}`
        );
      }

      // Processar peças do usuário
      Object.values(user.peças || {}).forEach((peca) => {
        const pecaData = new Date(peca.data);
        const pecaMes = pecaData.getMonth();
        months[pecaMes]++;

        // Contar peças por tipo
        if (pecasPorTipo.hasOwnProperty(peca.tipo)) {
          pecasPorTipo[peca.tipo] += parseInt(peca.qtd);
        }
      });
    });

    return {
      doacoesPorMes: months,
      usuariosPorMes: newUsers,
      pecasPorTipo: Object.entries(pecasPorTipo).map(([name, value]) => ({
        name,
        y: value,
        z: 90 + Math.random() * 50,
      })),
    };
  };

  // Função para buscar dados do Firebase
  const fetchFirebaseData = () => {
    const usersRef = database.ref("users");

    usersRef
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          const processedData = processFirebaseData({ users: snapshot.val() });
          const currentTheme = document.body.classList.contains("dark-theme")
            ? "dark"
            : "light";
          updateCharts(currentTheme, processedData);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  };

  // Função para atualizar os gráficos com os dados processados
  const updateCharts = (theme, data) => {
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
        categories: [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez",
        ],
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
          data: data.doacoesPorMes,
          color: "#2A55C2",
        },
        {
          name: "Novos Usuários",
          data: data.usuariosPorMes,
          color: "#7AD761",
        },
      ],
    });
  };

  // Theme Toggle Setup
  const themeIcon = document.getElementById("theme-icon");
  const elementsToToggle = [
    document.body,
    document.querySelector(".main-content"),
    document.querySelector(".sidebar"),
    document.querySelector(".span-logo"),
    document.querySelector(".nome-usuario"),
    document.querySelector(".titulo-pagina"),
    document.querySelector(".fundo-titulo"),
    document.querySelector(".titulo-inicial"),
    document.querySelector(".subtitulo"),
    document.querySelector(".titulo-notificacoes"),
    document.querySelector(".titulo-doadores"),
    document.querySelector(".titulo-mensagem"),
    document.querySelector(".grafico-coluna"),
    document.querySelector(".fundo-notificacoes"),
    document.querySelector(".link-doacoes"),
    document.querySelector(".tabela-doadores"),
  ];

  const iconSidebar = document.querySelectorAll("i");
  const linkSidebar = document.querySelectorAll(".nav-item");
  const titulotabela = document.querySelectorAll("th");
  const conteudoTabela = document.querySelectorAll("td");
  const mensagens = document.querySelectorAll(".mensagem");
  const spanMensagens = document.querySelectorAll(".span-mensagem");
  const tituloMsg = document.querySelectorAll(".titulo-mensagem");
  const horaMsg = document.querySelectorAll(".horario");

  const applyTheme = (theme) => {
    const collections = [
      titulotabela,
      conteudoTabela,
      iconSidebar,
      linkSidebar,
      mensagens,
      spanMensagens,
      tituloMsg,
      horaMsg,
    ];

    elementsToToggle.forEach((el) => {
      if (el) {
        el.classList.remove(theme === "dark" ? "light-theme" : "dark-theme");
        el.classList.add(theme === "dark" ? "dark-theme" : "light-theme");
      }
    });

    collections.forEach((collection) => {
      collection.forEach((item) => {
        item.classList.remove(theme === "dark" ? "light-theme" : "dark-theme");
        item.classList.add(theme === "dark" ? "dark-theme" : "light-theme");
      });
    });

    if (themeIcon) {
      themeIcon.classList.toggle("bx-sun", theme !== "dark");
      themeIcon.classList.toggle("bx-moon", theme === "dark");
    }

    localStorage.setItem("theme", theme);
    fetchFirebaseData(); // Refresh chart on theme change
  };

  // Initial theme setup
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  // Theme toggle event listener
  if (themeIcon) {
    themeIcon.addEventListener("click", () => {
      const currentTheme =
        localStorage.getItem("theme") === "dark" ? "light" : "dark";
      applyTheme(currentTheme);
    });
  }

  // Initial data fetch
  fetchFirebaseData();
});

const applyTheme = (theme) => {
  document.body.classList.toggle("modo-escuro", theme === "escuro");
  document.body.classList.toggle("modo-claro", theme === "claro");
  localStorage.setItem("modoLeitura", theme);

  const modoLeituraBtn = document.querySelector(".modo-leitura-btn");
  if (modoLeituraBtn) {
    if (theme === "escuro") {
      modoLeituraBtn.classList.remove("bx-sun");
      modoLeituraBtn.classList.add("bx-moon");
      modoLeituraBtn.style.color = "#ffffff";
    } else {
      modoLeituraBtn.classList.remove("bx-moon");
      modoLeituraBtn.classList.add("bx-sun");
      modoLeituraBtn.style.color = "";
    }
  }
};

const carregarModoLeitura = () => {
  const modoSalvo = localStorage.getItem("modoLeitura") || "claro";
  applyTheme(modoSalvo);
};

const toggleModoLeitura = () => {
  const isDarkMode = document.body.classList.contains("modo-escuro");
  const newTheme = isDarkMode ? "claro" : "escuro";
  applyTheme(newTheme);
};

document.addEventListener("DOMContentLoaded", () => {
  const modoLeituraBtn = document.querySelector(".modo-leitura-btn");
  if (modoLeituraBtn) {
    modoLeituraBtn.addEventListener("click", toggleModoLeitura);
  }

  carregarModoLeitura();
});
