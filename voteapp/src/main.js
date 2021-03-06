// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Vuex from 'Vuex'
import { store } from '../store/store'

Vue.config.productionTip = false;

export const bus = new Vue();
Vue.prototype.$eventHub = new Vue();

/* eslint-disable no-new */
new Vue({
    store: store,
    el: "#app",
    router,
    components: { App },
    template: "<App/>"
});