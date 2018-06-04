https://www.alphavantage.co

<template>
  <div id="stock" class="container">
    <div class="container chart"></div>
    <div class="selection">
      <form @submit.prevent="addStock">
        <label for="addStock"></label>
        <input type="text" name="addStock" v-model="stock">
        <button>ADD</button>
      </form>
      <div v-for="(stock, index) in stocks" :key='index'>{{stock}}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "index",
  data() {
    return {
      stocks: [],
      apiKey: "YQP8Z4ROSKNTCPP7",
      symbol: [],
      stock: null
    };
  },
  methods: {
    addStock() {
      this.stocks.push(this.stock);
    }
  },
  created() {
    axios
      .get(
        "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=AMAZ&apikey=" +
          this.apiKey
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>
