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
    getStocks(state, stockJson) {
      state.stockData.push(stockJson);
    }
  },
  actions: {
    getData({ commit, getters }, stock) {
      axios
        .get(
          "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" +
            stock +
            "&apikey=YQP8Z4ROSKNTCPP7"
        )
        .then(response => {
          var dayArr = [];
          var apiData = response.data["Time Series (Daily)"];
          var labels = Object.keys(apiData);
          function cleanData() {
            for (var day in apiData) {
              dayArr.push(apiData[day]["4. close"]);
            }
          }
          cleanData();
          var cleanData = {
            labels: labels,
            datasets: [
              {
                label: response.data["Meta Data"]["2. Symbol"],
                data: dayArr,
                borderColor:
                  "rgb(" +
                  Math.floor(Math.random() * 256) +
                  "," +
                  Math.floor(Math.random() * 256) +
                  "," +
                  Math.floor(Math.random() * 256) +
                  ")",
                borderWidth: 2,
                fill: false
              }
            ]
          };
          commit("getStocks", cleanData);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addStock({ commit, dispatch, getters }, stock) {
      getters.addedStocks.push(stock);
    },
    loadStocks({ commit, dispatch, getters }) {
      getters.addedStocks.forEach(stock => {
        dispatch("getData", stock);
      });
      console.log(getters.stockData);
    }
  }
});
//1. User lands on this page, load all stocks already added
//2. User adds a stock, push it to stocks array and update the chart
//3. User removes a stock, pop it from stocks array and update the chart
