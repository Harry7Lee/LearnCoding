<template>
  <div class="myImages container">
    <!-- add image -->
    <form class="addImage" @submit.prevent="addImage">
      <h3>Add Image</h3>
      <div class="input-field col s12">
        <input id="last_name" type="text" class="validate" v-model="title">
        <label for="last_name">Title</label>
      </div>
      <div class="input-field col s12">
        <input id="last_name" type="text" class="validate" v-model="imageUrl">
        <label for="last_name">Image URL</label>
      </div>
      <p class="red-text">{{feedback}}</p>
      <button class="btn btn-primary">ADD IMAGE</button>
    </form>
    <h5>My Images ({{myImages.length}})</h5>
    <!-- preloader -->
    <div v-if="loading" class="progress white">
      <div class="indeterminate blue"></div>
    </div>
    <!-- my images -->
    <div class="row">
      <div v-for="(image, index) in myImages" :key=" index " class="card">
        <div class="card-image images">
          <img :src="image.imageUrl" alt='Image Not Found' onerror="this.src='https://www.underconsideration.com/brandnew/archives/google_broken_image_00_b_logo_detail.gif'">
          <a class="btn-floating halfway-fab waves-effect waves-light red deleteBtn" @click="deleteImage(image.imageId)">
            <i class="material-icons">delete</i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  props: ["user", "userId"],
  data() {
    return {
      title: null,
      imageUrl: null,
      isLoaded: false,
      myImages: [],
      loading: true,
      feedback: null
    };
  },
  methods: {
    addImage() {
      if (this.title && this.imageUrl) {
        let imageId = null;
        db
          .collection("images")
          .add({
            title: this.title,
            imageUrl: this.imageUrl,
            userId: firebase.auth().currentUser.uid
          })
          .then(docRef => {
            imageId = docRef.id;
            db
              .collection("images")
              .doc(docRef.id)
              .update({
                imageId: docRef.id
              })
              .then(doc => {
                this.myImages.push({
                  title: this.title,
                  imageUrl: this.imageUrl,
                  userId: firebase.auth().currentUser.uid,
                  imageId: imageId
                });
                // this.title = null;
                // this.imageUrl = null;
                this.feedback = "Image Added!";
              });
          });
      } else {
        this.feedback = "Please Enter both title and url!";
      }
    },
    deleteImage(id) {
      db
        .collection("images")
        .doc(id)
        .delete()
        .then(
          (this.myImages = this.myImages.filter(image => {
            return image.imageId != id;
          }))
        );
    },
    loadMyImages() {
      db
        .collection("images")
        .where("userId", "==", this.$route.params.id)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.myImages.push(doc.data());
          });
        })
        .then(() => {
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.loadMyImages();
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
.deleteBtn {
  position: relative;
  top: -15px;
  left: 175px;
}
</style>
