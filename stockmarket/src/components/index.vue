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
      <div v-for="stockData in stockData">{{stockData["Meta Data"]}}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "index",
  data() {
    return {
      stock: null
    };
  },
  computed: {
    stocks() {
      return this.$store.state.stocks;
    },
    stockData() {
      return this.$store.state.stockData;
    }
  },
  methods: {
    addStock() {
      this.stocks.push(this.stock);
      this.$store.dispatch("getStocks");
    }
  },
  created() {
    this.addStock();
  }
};
</script>

<style>
</style>
