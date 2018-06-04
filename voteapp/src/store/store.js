//www.raymondcamden.com/2018/01/05/another-example-of-vuejs-and-vuex-an-api-wrapper

https: import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    data: {}
  }
});
