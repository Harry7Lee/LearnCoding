// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import firebase from "firebase";

Vue.config.productionTip = false;
//wait for firebase auth to init before creating the app

//init app if not already created

new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
