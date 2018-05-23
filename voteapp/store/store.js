import Vue from "vue";
import Vuex from "vuex";
import db from "../src/firebase/init";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedFirebase: {}
  },
  getters: {
    loadedFirebase: state => {
      return state.loadedFirebase;
    }
  },
  mutations: {
    loadFirebase: state => {
      db
        .collection("polls")
        .get()
        .then(snapshot => {
          console.log(snapshot);
          return snapshot;
        });
    }
  },
  actions: {
    loadFirebase: context => {
      context.commit("loadFirebase");
    }
  }
});
