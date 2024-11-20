document.addEventListener("DOMContentLoaded", () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDUzAILjPJy3zoUVWkD7U4YdI6MDh_QlS4",
    authDomain: "rampoint-81352.firebaseapp.com",
    databaseURL: "https://rampoint-81352-default-rtdb.firebaseio.com",
    projectId: "rampoint-81352",
    storageBucket: "rampoint-81352.appspot.com",
    messagingSenderId: "694254448576",
    appId: "1:694254448576:web:7b78f9707f2625aa9ca225",
    measurementId: "G-5GMT9136G7",
  };

  // Inicialização do Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  // Processo de elementos para tema
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
    document.querySelector(".grafico-coluna"),
    document.querySelector(".fundo-notificacoes"),
    document.querySelector(".link-doacoes"),
    document.querySelector(".tabela-doadores")
  ];

  const processFirebaseData = (data) => {
    const months = Array(12).fill(0);
    const newUsers = Array(12).fill(0);
    const pecasPorTipo = {
      Interno: 0,
      Resfriamento: 0,
      Estrutura: 0,
      Periférico: 0
    };

    Object.values(data.users || {}).forEach(user => {
      const [dia, mes, ano] = user.dataCriacao.split('/');
      const mesIndex = parseInt(mes) - 1;
      newUsers[mesIndex]++;

      Object.values(user.peças || {}).forEach(peca => {
        const pecaData = new Date(peca.data);
        const pecaMes = pecaData.getMonth();
        months[pecaMes]++;

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
        z: 90 + Math.random() * 50
      }))
    };
  };

  const fetchFirebaseData = () => {
    const usersRef = database.ref('users');
    
    usersRef.once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          const processedData = processFirebaseData({ users: snapshot.val() });
          const currentTheme = document.body.classList.contains("dark-theme") ? "dark" : "light";
          updateCharts(currentTheme, processedData);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  };

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
        categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
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

  // Tema e elementos para toggle
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
      horaMsg
    ];

    elementsToToggle.forEach(el => {
      if (el) {
        el.classList.remove(theme === "dark" ? "light-theme" : "dark-theme");
        el.classList.add(theme === "dark" ? "dark-theme" : "light-theme");
      }
    });

    collections.forEach(collection => {
      collection.forEach(item => {
        item.classList.remove(theme === "dark" ? "light-theme" : "dark-theme");
        item.classList.add(theme === "dark" ? "dark-theme" : "light-theme");
      });
    });

    if (themeIcon) {
      themeIcon.classList.toggle("bx-sun", theme !== "dark");
      themeIcon.classList.toggle("bx-moon", theme === "dark");
    }

    return { theme };
  };

  // Configuração inicial do tema
  const savedTheme = localStorage.getItem("theme") || "light";
  const initialThemeState = applyTheme(savedTheme);

  // Evento de alternância de tema
  if (themeIcon) {
    themeIcon.addEventListener("click", () => {
      const currentTheme = localStorage.getItem("theme") === "dark" ? "light" : "dark";
      const themeState = applyTheme(currentTheme);
      localStorage.setItem("theme", currentTheme);
      
      // Atualizar gráfico com dados atuais
      fetchFirebaseData();
    });
  }

  // Busca inicial de dados
  fetchFirebaseData();
});