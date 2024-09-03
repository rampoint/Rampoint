google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['', '', '', ''],
    ['Jan', 1000, 400, 0],
    ['Fev', 1170, 460, 0],
    ['Mar', 660, 1120, 0],
    ['Abr', 1030, 540, 0]
  ]);

  var options = {
    chart: {
      title: '',
      subtitle: '',
    },
    bars: 'vertical',
    vAxis: {format: 'decimal'},
    width: 800,
    height: 450,
    colors: ['#1b9e77', '#d95f02', '#7570b3']
  };

  var chart = new google.charts.Bar(document.getElementById('chart_div'));

  chart.draw(data, google.charts.Bar.convertOptions(options));

  var btns = document.getElementById('btn-group');

  btns.onclick = function (e) {

    if (e.target.tagName === 'BUTTON') {
      options.vAxis.format = e.target.id === 'none' ? '' : e.target.id;
      chart.draw(data, google.charts.Bar.convertOptions(options));
    }
  }
}