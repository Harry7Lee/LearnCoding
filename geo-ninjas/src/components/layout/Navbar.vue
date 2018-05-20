<template>
    <div class="navbar">
        <nav class="deep-purple darken-1">
            <div class="container">
                <router-link :to="{name: 'GMap'}">
                    <a href="" class="brand-logo left">GeoNinjas</a>
                </router-link>
                <ul class="right">
                    <li v-if="!user">
                        <router-link :to="{name: 'Signup'}">
                            <a>Sign Up</a>
                        </router-link>
                    </li>
                    <li v-if="user">
                        <a>{{user.email}}</a>
                    </li>
                    <li v-if="user">
                        <a @click="logout">Log Out</a>
                    </li>
                    <li v-if="!user">
                        <router-link :to="{name: 'Login'}">
                            <a href="">Log In</a>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>


<script>
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {
      user: null
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<style>
</style>


