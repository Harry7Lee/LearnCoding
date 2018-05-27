<template>
    <div class="map">
        <div id='map'>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
export default {
  name: "index",
  data() {
    return {
      lat: null,
      lng: null
    };
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
        maxZoom: 15,
        minZoom: 3,
        streetViewContorl: false
      });
    }
  },
  mounted() {
    this.renderMap();
  }
};
</script>

<style>
#map {
  width: 100%;
  height: 100%;
  margin: 0;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
