const token = "BrpkvYsCXZxnUXqa7zDn1dWrEfGMQrHs";

async function getBlynkValue(pin) {
  const url = `https://blynk.cloud/external/api/get?token=${token}&${pin}`;
  const response = await fetch(url);
  return await response.json();
}

function createChart(ctx, label, color) {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: label,
        data: [],
        borderColor: color,
        fill: false
      }]
    }
  });
}

const chartTemp = createChart(document.getElementById('chartTemp').getContext('2d'), "Temperatura", "red");
const chartUmidade = createChart(document.getElementById('chartUmidade').getContext('2d'), "Umidade", "blue");
const chartAgua = createChart(document.getElementById('chartAgua').getContext('2d'), "Nível da Água", "green");
const chartSolo = createChart(document.getElementById('chartSolo').getContext('2d'), "Umidade do Solo", "brown");

async function atualizar() {
  const temp = await getBlynkValue("V1");
  const umidade = await getBlynkValue("V2");
  const agua = await getBlynkValue("V3");
  const solo = await getBlynkValue("V4");

  const agora = new Date().toLocaleTimeString();

  function updateChart(chart, valor) {
    chart.data.labels.push(agora);
    chart.data.datasets[0].data.push(valor);
    if(chart.data.labels.length > 10) {
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
    }
    chart.update();
  }

  updateChart(chartTemp, temp);
  updateChart(chartUmidade, umidade);
  updateChart(chartAgua, agua);
  updateChart(chartSolo, solo);
}

setInterval(atualizar, 5000);
