<template>
  <div id='chart' class="container">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
export default {
  computed: {
    stocks() {
      return this.$store.state.stocks;
    },
    stockData() {
      return this.$store.state.stockData;
    }
  },
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
      this.updateDatasets().then(() => {
        this.data.data.labels = this.$store.state.stockData[0].labels;
        const ctx = document.getElementById("myChart").getContext("2d");
        const chart = new Chart(ctx, data);
        Chart.defaults.global.elements.point.radius = 0.1;
      });
    },
    updateDatasets() {
      return new Promise((resolve, reject) => {
        for (var i = 0; i < this.$store.state.stockData.length; i++) {
          this.data.data.datasets.push(this.$store.state.stockData[i].datasets);
        }
        resolve();
      });
    },
    loadStocks() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch("loadStocks");
        resolve();
      });
    }
  },
  watch: {
    stockData: function() {
      if (this.stockData.length === this.stocks.length) {
        this.createChart(this.data);
      }
    }
  },
  created() {
    this.loadStocks();
  },
  mounted() {}
};
</script>

<style>
#myChart {
  background-color: #333;
}
</style>
