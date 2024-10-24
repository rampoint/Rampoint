Highcharts.chart("container", {
  chart: {
    type: "column",
    backgroundColor: "#fff",
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
    accessibility: {
      description: "",
    },
  },
  yAxis: {
    min: 0,
    title: {
      text: "",
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
  series: [
    {
      name: "Doações",
      data: [30, 45, 12, 64, 54, 34],
    },
    {
      name: "Novos Usuários",
      data: [45, 14, 10, 14, 19, 11],
    },
  ],
});
