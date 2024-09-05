const ddds = [
  { ddd: "11" },
  { ddd: "21"},
  { ddd: "31"},
  { ddd: "41"},
  { ddd: "51"},
  { ddd: "61"},
  { ddd: "71"},
  { ddd: "81"},
  { ddd: "91"}
];

const selectElement = document.getElementById('ddd-select');

ddds.forEach(ddd => {
  const option = document.createElement('option');
  option.value = ddd.ddd;
  option.text = `${ddd.ddd}`;
  selectElement.appendChild(option);
});