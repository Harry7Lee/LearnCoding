import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import Mybooks from "@/components/Mybooks";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/:id/Mybooks",
      name: "Mybooks",
      component: Mybooks
    }
  ]
});
