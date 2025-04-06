document.addEventListener("DOMContentLoaded", function () {
  // Check if the chart container exists
  const chartContainer = document.getElementById("account-activity-chart");
  if (!chartContainer) return;

  // Sample data for a doughnut chart - shows income vs expenses distribution
  const labels = ["Ingresos", "Egresos"];
  const data = [12500, 10100];
  const backgroundColor = [
    "rgba(255, 202, 8, 0.8)", // Yellow for income
    "rgba(51, 107, 170, 0.8)", // Blue for expenses
  ];
  const borderColor = ["#ffca08", "#336baa"];

  // Create chart context
  const ctx = chartContainer.getContext("2d");

  // Set default font color for Chart.js
  Chart.defaults.color = "#ffffff";
  Chart.defaults.font.family = "'Inter', sans-serif";

  // Create the doughnut chart
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              family: "'Inter', sans-serif",
              size: 14,
              weight: "bold",
            },
            padding: 20,
            boxWidth: 15,
            usePointStyle: true,
            generateLabels: function (chart) {
              // Custom label generation (advanced)
              const data = chart.data;
              return data.labels.map(function (label, i) {
                return {
                  text: `${label}: $${data.datasets[0].data[
                    i
                  ].toLocaleString()}`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].borderColor[i],
                  lineWidth: 1,
                  hidden: false,
                  index: i,
                  // Force text color here as well
                  fontColor: "#ffffff",
                };
              });
            },
          },
        },
        tooltip: {
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
          callbacks: {
            label: function (context) {
              const total = context.dataset.data.reduce(
                (sum, val) => sum + val,
                0
              );
              const percentage = Math.round((context.raw / total) * 100);
              return `${
                context.label
              }: $${context.raw.toLocaleString()} (${percentage}%)`;
            },
          },
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      },
      // Additional text color setting
      color: "#ffffff",
    },
  });
});
