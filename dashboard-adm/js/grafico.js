const QuickChart = require('quickchart-js');

const chart = new QuickChart();

chart.setWidth(500)
chart.setHeight(300);

// Config can be set as string or as a Javascript object
chart.setConfig(`{
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Users',
      data: [50, 60, 70, 180]
    }]
  }
}`);

// Print the chart URL
console.log(chart.getUrl());

// Get the image...
const image = await chart.toBinary();

// Or write it to a file
chart.toFile('chart.png');