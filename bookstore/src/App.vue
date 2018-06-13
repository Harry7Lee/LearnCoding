<template>
  <div id="app">
    <Navbar v-bind:user="user" v-bind:userId="userId"></Navbar>
    <router-view :user='user' :userId='userId' />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import firebase from "firebase";
export default {
  name: "App",
  data() {
    return {
      user: null,
      userId: null
    };
  },
  components: {
    Navbar
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user.email;
        this.userId = user.uid;
      } else {
      }
    });
  }
};
</script>

<style>
</style>
