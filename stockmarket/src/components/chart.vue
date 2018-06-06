<template>
  <div id='chart' class="container">
    <button @click="createChart(data)">Create Chart</button>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        type: "line",
        labels: [],
        data: {
          datasets: []
        },
        options: {
          title: {
            display: true,
            text: "Stocks",
            fontSize: 20,
            fontColor: "white"
          },
          tooltips: {
            mode: "index",
            intersect: false
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      }
    };
  },
  methods: {
    createChart(data) {
      this.updateDatasets();
      this.data.data.labels = this.$store.state.stockData[0].labels;
      const ctx = document.getElementById("myChart").getContext("2d");
      const chart = new Chart(ctx, data);
      Chart.defaults.global.elements.point.radius = 0.1;
    },
    updateDatasets() {
      for (var i = 0; i < this.$store.state.stockData.length; i++) {
        this.data.data.datasets.push(this.$store.state.stockData[i].datasets);
      }
    }
  },
  mounted() {}
};
</script>

<style>
#myChart {
  background-color: #333;
}
</style>
