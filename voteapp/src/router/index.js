import Vue from "vue";
import Router from "vue-router";
import index from "@/components/index";
import addPoll from "@/components/addPoll";
import editPoll from "@/components/editPoll";
import pollDetail from "@/components/pollDetail";

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
    },
    {
      path: "/editPoll/:poll_slug",
      name: "editPoll",
      component: editPoll
    },
    {
      path: "/pollDetail/:poll_slug",
      name: "pollDetail",
      component: pollDetail
    }
  ]
});
