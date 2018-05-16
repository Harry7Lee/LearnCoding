<template>
  <div>
    <nav>
      <div class="nav-wrapper darken blue">
        <router-link :to="{name: 'index'}">
          <a class="brand-logo">
            <i style="width: 20px;" class="material-icons">star_rate</i>Vote Everything</a>
        </router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">

          <div v-if="searchOn" class="left white black-text">
            <input type="text" v-model="searchTxt" @input="searchPoll">
          </div>

          <li v-if="!searchOn">
            <a href="#" @click="search">
              <i class="material-icons left">search</i>Search</a>
          </li>
          <li>
            <a href="#">
              <i class="material-icons left">perm_identity</i>Login</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import db from "@/firebase/init";
import index from "@/components/index.vue";
import { bus } from "../main.js";

export default {
  data() {
    return {
      searchTxt: null,
      searchOn: false
    };
  },
  methods: {
    search() {
      this.searchOn = !this.searchOn;
    }
  },
  computed: {
    searchPoll() {
      bus.$emit("searchPoll", this.searchTxt);
    }
  }
};
</script>

<style>
.nav-wrapper {
  position: absolute;
  top: 0px;
}
.brand-logo {
  position: relative;
  left: 10px;
}

#floatAdd {
  position: fixed;
  right: 20px;
  top: 100px;
}
</style>

