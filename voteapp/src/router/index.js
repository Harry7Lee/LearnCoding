import Vue from "vue";
import Router from "vue-router";
import index from "@/components/index";
import addPoll from "@/components/addPoll";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: index
    },
    {
      path: "/addPoll",
      name: "addPoll",
      component: addPoll
    }
  ]
});
