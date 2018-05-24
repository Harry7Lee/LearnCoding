import Vue from "vue";
import Router from "vue-router";
import index from "@/components/index";
import addPoll from "@/components/addPoll";
import editPoll from "@/components/editPoll";
import pollDetail from "@/components/pollDetail";
import login from "@/components/auth/login";
import firebasE from "firebase";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: index
    },
    {
      path: "/addPoll",
      name: "addPoll",
      component: addPoll,
      requireAuth: true
    },
    {
      path: "/editPoll/:poll_slug",
      name: "editPoll",
      component: editPoll,
      requireAuth: true
    },
    {
      path: "/pollDetail/:poll_slug",
      name: "pollDetail",
      component: pollDetail
    },
    {
      path: "/login",
      name: "login",
      component: login
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requireAuth)) {
    let user = firebase.auth().currentUser;
    if (user) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
