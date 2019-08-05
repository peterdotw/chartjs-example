// Data from: https://people.sc.fsu.edu/~jburkardt/data/csv/csv.html

async function makeChart(data) {
  const playerNumbers = await data.map(function(d) {
    return d.number;
  });
  const gamesLength = await data.map(function(d) {
    return d.length;
  });

  const ctx = await document.querySelector(".chart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: playerNumbers,
      datasets: [
        {
          label: "# of minutes",
          data: gamesLength,
          fill: false,
          borderColor: "rgba(23, 230, 95, 1)",

          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        xAxes: [
          {
            ticks: {
              callback: function(value) {
                return "Player " + value;
              }
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              callback: function(value) {
                return value + " minutes";
              }
            }
          }
        ]
      },
      title: {
        display: true,
        fontSize: 30,
        text: "Game length for one-player version of Snakes and Ladders"
      },
      legend: {
        display: false
      },
      chart: {
        fill: false
      }
    }
  });
}

async function fetchData() {
  const data = await d3.csv("./snakes_count_100.csv");
  makeChart(data);
}

fetchData();
