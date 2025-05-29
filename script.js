document.getElementById('healthForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const age = parseInt(document.getElementById('age').value);
  const heartRate = parseInt(document.getElementById('heartRate').value);
  const temperature = parseFloat(document.getElementById('temperature').value);
  const oxygen = parseInt(document.getElementById('oxygen').value);
  const sugar = parseInt(document.getElementById('sugar').value);

  let healthMessage = `Hello, ${name}. Here's your health analysis:<br><ul>`;

  if (heartRate < 60 || heartRate > 100) {
    healthMessage += `<li>💓 Heart Rate: ${heartRate} bpm — <strong>Abnormal</strong></li>`;
  } else {
    healthMessage += `<li>💓 Heart Rate: ${heartRate} bpm — <strong>Normal</strong></li>`;
  }

  if (temperature < 36.1 || temperature > 37.2) {
    healthMessage += `<li>🌡️ Temperature: ${temperature} °C — <strong>Abnormal</strong></li>`;
  } else {
    healthMessage += `<li>🌡️ Temperature: ${temperature} °C — <strong>Normal</strong></li>`;
  }

  if (oxygen < 95) {
    healthMessage += `<li>🫁 Oxygen Saturation: ${oxygen}% — <strong>Low</strong></li>`;
  } else {
    healthMessage += `<li>🫁 Oxygen Saturation: ${oxygen}% — <strong>Normal</strong></li>`;
  }

  if (sugar < 70 || sugar > 140) {
    healthMessage += `<li>🩸 Blood Sugar: ${sugar} mg/dL — <strong>Abnormal</strong></li>`;
  } else {
    healthMessage += `<li>🩸 Blood Sugar: ${sugar} mg/dL — <strong>Normal</strong></li>`;
  }

  healthMessage += `</ul>`;

  document.getElementById('result').innerHTML = healthMessage;

  drawChart(heartRate, temperature, oxygen, sugar);
});

function drawChart(hr, temp, oxygen, sugar) {
  const ctx = document.getElementById('healthChart').getContext('2d');

  if (window.healthChartInstance) {
    window.healthChartInstance.destroy();
  }

  window.healthChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Heart Rate', 'Temperature', 'Oxygen Saturation', 'Blood Sugar'],
      datasets: [{
        label: 'Vitals',
        data: [hr, temp, oxygen, sugar],
        backgroundColor: ['#166534', '#1e40af', '#92400e', '#7f1d1d']

      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
