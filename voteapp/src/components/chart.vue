<template>
  <div class="chart" ref='chart'>
    <canvas id="myChart" width="400" height="400"></canvas>
  </div>

</template>

<script>
import { bus } from "../main.js";
export default {
  name: "chart",
  data() {
    return {
      newChart: null,
      poll: null,
      label: [],
      data: [],
      chartData: {
        type: "pie",
        data: {
          labels: [],
          datasets: [
            {
              label: "# of Votes",
              data: [],
              backgroundColor: [
                "rgba(255, 99, 132)",
                "rgba(54, 162, 235)",
                "rgba(255, 206, 86)",
                "rgba(75, 192, 192)",
                "rgba(153, 102, 255)",
                "rgba(255, 159, 64)"
              ]
            }
          ]
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
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      window.myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    },
     destoryChart(){
       window.myChart.destroy();
     }
  },
  mounted() {
      bus.$on("showChart", data => {
      data.options.forEach(option => {
        this.chartData.data.labels.push(option.optTitle);
        this.chartData.data.datasets[0].data.push(option.optCount);
      })
      this.poll = data;
      this.createChart("myChart", this.chartData);
    }) 
    }
};
</script>

<style>
</style>
