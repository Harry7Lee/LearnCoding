//www.raymondcamden.com/2018/01/05/another-example-of-vuejs-and-vuex-an-api-wrapper
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import db from "@/firebase/init";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    stocks: [],
    apiKey: "YQP8Z4ROSKNTCPP7",
    stockData: [],
    dataLoaded: false
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
    },
    addStocks(state, stocks) {
      state.stocks = stocks;
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
            datasets: {
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
          };
          commit("getStocks", cleanData);
        })
        .then(() => {
          console.log("Get One data from APi");
        })
        .catch(err => {
          console.log(err);
        });
    },
    addStock({ commit, dispatch, getters }, stock) {
      dispatch("getData", stock);
    },
    loadStocks({ commit, dispatch, getters }) {
      db.collection("addedStocks")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            commit("addStocks", doc.data().Stocks);
          });
        })
        .then(() => {
          getters.addedStocks.forEach(stock => {
            dispatch("getData", stock);
          });
          this.dataLoaded = true;
        });
    }
  }
});
