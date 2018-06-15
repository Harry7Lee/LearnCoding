import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import Settings from "@/components/Settings";
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
      path: "/:id/settings",
      name: "Settings",
      component: Settings
    },
    {
      path: "/:id/Mybooks",
      name: "Mybooks",
      component: Mybooks
    }
  ]
});
