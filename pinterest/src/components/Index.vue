<template>
  <div class="index">
    <div class="container bookList">
      <div class="brand center">
        <h1 class="blue-text">
          <i class="medium material-icons">
            image
          </i>Pinterest Clone</h1>
      </div>
      <div class="myImages">
        <h4>Total image ({{myImages.length}})</h4>
        <!-- preloader -->
        <div v-if="!isLoaded" class="progress white">
          <div class="indeterminate blue"></div>
        </div>
        <!-- booklist -->
        <div class="row">
          <div v-if="isLoaded">
            <div v-for="(image, index) in myImages" :key=" index " class="card">
              <div class="card-image images">
                <img :src="image.imageUrl" onerror="this.src='https://www.underconsideration.com/brandnew/archives/google_broken_image_00_b_logo_detail.gif'">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
import axios from "axios";
export default {
  name: "index",
  props: ["user", "userId"],
  data() {
    return {
      myImages: [],
      isLoaded: false,
      showModal: false,
      feedback: null
    };
  },
  methods: {
    loadImages() {
      db
        .collection("images")
        .orderBy("title")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.myImages.push(doc.data());
          });
        })
        .then(() => {
          this.isLoaded = true;
        });
    }
  },
  created() {
    this.loadImages();
  }
};
</script>


<style>
.card {
  float: left;
  margin: 20px;
}
.images {
  width: 200px;
}
.images img {
  width: 200px;
  height: 150px;
}
.preloader {
  z-index: 2;
}
</style>
