//www.raymondcamden.com/2018/01/05/another-example-of-vuejs-and-vuex-an-api-wrapper

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    stocks: ["AMAZ", "AAPL", "C", "GOOGL", "MSFT"],
    apiKey: "YQP8Z4ROSKNTCPP7",
    stockData: []
  },
  getters: {
    addedStocks: state => {
      return state.stocks;
    },
    stockData: state => {
      return state.stockData;
    }
  },
  mutations: {
    getStocks(state, stock) {
      state.stockData.push(stock);
    }
  },
  actions: {
    getStocks({ commit, getters }) {
      getters.addedStocks.forEach(stock => {
        axios
          .get(
            "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" +
              stock +
              "&apikey=YQP8Z4ROSKNTCPP7"
          )
          .then(response => {
            commit("getStocks", response.data);
          })
          .catch(err => {
            console.log(err);
          });
      });
      console.log(getters.stockData);
    }
  }
});
