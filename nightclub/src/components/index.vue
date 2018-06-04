TODO:
Story： 作为一个未授权用户，我可以看到我附近的所有酒吧。

Story： 作为一个已授权用户，我可以把我自己添加到一个酒吧，表示我今晚将会去那儿。

Story： 作为一个已授权用户，如果我不再想去某个酒吧，可以把自己从酒吧中移出。

Story： 作为一个未授权用户，在我登录后我不需要重新搜索附近的酒吧。

https://developers.google.com/maps/documentation/javascript/examples/places-searchbox

<template>
  <div class="map">
    <div id='map'>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
import axios from "axios";
import { bus } from "../main.js";

export default {
  name: "index",
  data() {
    return {
      lat: null,
      lng: null,
      map: null,
      place: null
    };
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 15,
        maxZoom: 15,
        minZoom: 3,
        streetViewContorl: false,
        mapTypeId: "roadmap"
      });
      this.map = map;
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(
        {
          location: { lat: this.lat, lng: this.lng },
          radius: 500,
          type: [this.place]
        },
        this.callback
      );
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;
          this.renderMap();
        });
      }
    },
    callback(results, status) {
      for (var i = 0; i < results.length; i++) {
        new google.maps.Marker({
          map: this.map,
          position: results[i].geometry.location
        });
      }
    },
    clearMarkers() {
      var markers = [];
      markers.forEach(marker => {
        new google.maps.Marker(null);
      });
      markers = [];
    }
  },
  created() {
    bus.$on("search", place => {
      this.place = place;
      this.renderMap();
    });
  },
  mounted() {
    this.getLocation();
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
button {
  z-index: 1;
}
</style>
