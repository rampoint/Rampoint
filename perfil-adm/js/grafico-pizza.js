Highcharts.chart("container2", {
  chart: {
    type: "variablepie",
  },
  title: {
    text: "",
  },
  tooltip: {
    headerFormat: "",
    pointFormat: "Quantidade de peças: <b>{point.z}</b>",
  },
  series: [
    {
      minPointSize: 10,
      innerSize: "20%",
      zMin: 0,
      name: "pecas",
      borderRadius: 5,
      data: [
        {
          name: "Interno",
          y: 50592,
          z: 92,
          colors: "#417932",
        },
        {
          name: "Resfriamento",
          y: 551695,
          z: 95,
        },
        {
          name: "Estrutura",
          y: 312679,
          z: 121,
        },
        {
          name: "Periférico",
          y: 78865,
          z: 136,
        },
      ],
      colors: ["#FFBB38", "#7AD761", "#C67DFF", "#2A55C2"],
    },
  ],
});
