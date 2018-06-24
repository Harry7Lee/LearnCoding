import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import MyImages from "@/components/MyImages";

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
      path: "/:id/MyImages",
      name: "MyImages",
      component: MyImages
    }
  ]
});
