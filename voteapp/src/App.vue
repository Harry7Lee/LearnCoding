<template>
  <div id="app">
    <navBar></navBar>
    <router-view/>
    <footerVote></footerVote>
  </div>
</template>

<script>
import navBar from "@/components/navBar.vue"
import footerVote from "@/components/footerVote.vue"

export default {
  name: 'App',
  components: {navBar,
  footerVote}
}
</script>

<style>

</style>
