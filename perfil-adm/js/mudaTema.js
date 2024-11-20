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

  // Configuração do Firebase
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

  // Função para processar dados do Firebase
  const processFirebaseData = (data) => {
    const months = Array(12).fill(0); // Array para contar doações por mês
    const newUsers = Array(12).fill(0); // Array para contar novos usuários por mês
    const pecasPorTipo = {
      Interno: 0,
      Resfriamento: 0,
      Estrutura: 0,
      Periférico: 0
    };

    // Processar dados dos usuários
    Object.values(data.users || {}).forEach(user => {
      // Converter data de criação para objeto Date
      const [dia, mes, ano] = user.dataCriacao.split('/');
      const mesIndex = parseInt(mes) - 1; // Arrays são 0-based
      newUsers[mesIndex]++;

      // Processar peças do usuário
      Object.values(user.peças || {}).forEach(peca => {
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
      pecasPorTipo: Object  .entries(pecasPorTipo).map(([name, value]) => ({
        name,
        y: value,
        z: 90 + Math.random() * 50
      }))
    };
  };

  // Função para buscar dados do Firebase
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

    Highcharts.chart("container2", {
      chart: {
        type: "variablepie",
        backgroundColor: theme === "dark" ? "#282828" : "#fff",
      },
      title: {
        text: "",
      },
      series: [{
        innerSize: "20%",
        data: data.pecasPorTipo,
        colors: ["#FFBB38", "#7AD761", "#C67DFF", "#2A55C2"]
      }],
    });
  };

  // Função para aplicar o tema
  const applyTheme = (theme) => {
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

    // Buscar e atualizar dados do Firebase
    fetchFirebaseData();
    
    localStorage.setItem("theme", theme);
  };

  // Inicialização
  const currentTheme = localStorage.getItem("theme") || "light";
  applyTheme(currentTheme);

  // Event listener para mudança de tema
  themeIcon.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark-theme")
      ? "light"
      : "dark";
    applyTheme(newTheme);
  });
});