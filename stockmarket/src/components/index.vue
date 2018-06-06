https://www.alphavantage.co
TODO:
User Story: I can view a graph displaying the recent trend lines for each added stock.

User Story: I can add new stocks by their symbol name.

User Story: I can remove stocks.

User Story: I can see changes in real-time when any other user adds or removes a stock. For this you will need to use Web Sockets.

<template>
  <div id="stock" class="container">
    <div class="container chart"></div>
    <div class="selection">
      <form>
        <label for="addStock"></label>
        <input type="text" name="addStock" v-model="stock">
        <button @click="addStock">ADD</button>
        <button @click="loadStocks">Load</button>
      </form>
      <div v-for="(stock, index) in stocks" :key='index'>{{stock}}</div>
    </div>
    <chart></chart>
  </div>
</template>

<script>
import axios from "axios";
import chart from "@/components/chart";

export default {
  name: "index",
  data() {
    return {
      stock: null
    };
  },
  components: { chart },
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
      this.$store.state.stocks.push(this.stock);
    },
    loadStocks() {
      this.$store.dispatch("loadStocks");
    }
  },
  created() {
    this.loadStocks();
  }
};
</script>

<style>
</style>
