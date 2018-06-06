<template>
  <div id='chart' class="container">
    <button @click="createChart(data)">Create Chart</button>
    <canvas id="myChart" width="400" height="400"></canvas>
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
    },
    updateDatasets() {
      for (var i = 0; i < this.$store.state.stockData.length; i++) {
        this.data.data.datasets.push(this.$store.state.stockData[i].datasets);
      }
    }
  },
  mounted() {
    this.createChart(this.data);
  }
};
</script>

<style>
</style>
