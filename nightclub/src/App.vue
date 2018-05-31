<template>
  <div id="app">
    <searchBar></searchBar>
    <router-view/>
  </div>
</template>

<script>
import searchBar from "@/components/searchBar.vue";
export default {
  name: "App",
  components: {
    searchBar
  }
};
</script>

<style>
</style>
