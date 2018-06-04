<template>
  <div id="search" class="row container z-depth-5">
    <form @submit.prevent="search">
      <div class="col s9 input-field validate">
        <i class="material-icons prefix">pin_drop</i>
        <label for="place"></label>
        <input type="text" placeholder="Where are you at?" v-model="place">
      </div>
      <button class="waves-effect waves-light btn-small col s2">
        Search</button>
    </form>
  </div>
</template>

<script>
import { bus } from "../main.js";

export default {
  name: "searchBar",
  data() {
    return {
      place: null
    };
  },
  methods: {
    search() {
      bus.$emit("search", this.place);
    }
  }
};
</script>

<style>
#search {
  background-color: white;
  max-width: 600px;
  height: 100px;
  margin-top: 100px;
}
.material-icons {
  margin: 10px 0px 0px 0px;
}
.input-field {
  padding: 20px;
}
.validate {
  max-width: 500px;
}
button {
  margin-top: 30px;
}
</style>
