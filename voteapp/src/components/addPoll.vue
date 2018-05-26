<template>
  <div class="addPoll">
    <blockquote>
      <h2>Add Poll</h2>
    </blockquote>
    <form @submit.prevent="addPoll">
      <div class="input-field col s6">
        <i class="material-icons prefix">title</i>
        <input placeholder="Title" id="pollTitle" type="text" v-model="pollTitle">
      </div>
      <div class="input-field col s6" v-for="(option, index) in options" :key="index">
        <i class="material-icons prefix">radio_button_checked</i>
        <input id="pollOption" type="text" v-model="options[index].optTitle">
        <i class="material-icons delBtn right" @click="delOpt(option)">clear</i>
      </div>

      <div class="input-field col s6">
        <i class="material-icons prefix">radio_button_checked</i>
        <input placeholder="Option" id="pollOption" type="text" v-model="another" @keydown.tab.prevent="addOpt">
      </div>
      <i class="material-icons addBtn right" @click="addOpt">add</i>

      <div class="file-field input-field">
        <div class="btn" @change="onFilePicked">
          <span>Image</span>
          <input type="file" accept="image/*">
        </div>
        <div class="file-path-wrapper">
          <input placeholder="Upload Cover image" class="file-path validate" type="text">
        </div>
      </div>
      <div v-if="imageUrl" class="preview container">
        <img :src="imageUrl" alt="Cover Image">
      </div>
      <div v-if="progress>0" class="progress">
        <div class="determinate" v-bind:style="{ width: progress + '%' }"></div>
      </div>
      <p v-if="feedback" class="feedback">{{feedback}}</p>
      <button id="subBtn" class="btn waves-effect waves-light" type="submit" name="action">Submit
        <i class="material-icons right">send</i>
      </button>
      <button @click="addFaker">Add Faker</button>
    </form>

  </div>
</template>

<script>
import Vue from "vue";
var vm = new Vue({
  methods: {
    checkDup(arr, title) {
      var contains =
        arr.filter(obj => {
          return obj.optTitle == title;
        }).length >= 1;
      return contains;
    }
  }
});

import db from "@/firebase/init";
import slugify from "slugify";
import firebase from "firebase";
export default {
  name: "addPoll",
  data() {
    return {
      pollTitle: null,
      finalOptions: [],
      another: null,
      options: [],
      feedback: null,
      slug: null,
      imageUrl: null,
      image: null,
      imageName: null,
      downloadURL: null,
      pollId: null,
      progress: 0,
      fileName: null
    };
  },
  methods: {
    addPoll() {
      if (
        this.pollTitle &&
        (this.another || this.options[0].optTitle) &&
        this.imageUrl
      ) {
        this.feedback = null;
        this.options.forEach(option => {
          this.finalOptions.push(option);
        });
        this.finalOptions.push({
          optTitle: this.another,
          optCount: 0
        });
        this.slug = slugify(this.pollTitle, {
          replacement: "-",
          remove: /[ $*_+~.()'"!\-:@]/g,
          lower: true
        });
        db
          .collection("polls")
          .add({
            title: this.pollTitle,
            slug: this.slug,
            options: this.finalOptions,
            user_id: firebase.auth().currentUser.uid,
            downloadURL: this.downloadURL,
            fileName: this.fileName
          })
          .then(doc => {
            this.pollId = doc.id;
            const ext = this.imageName.slice(this.imageName.lastIndexOf("."));
            this.fileName = doc.id + ext;
            var imageRef = firebase.storage().ref();
            var file = this.image;
            var uploadTask = imageRef.child(this.pollId + ext).put(file);
            uploadTask.on(
              firebase.storage.TaskEvent.STATE_CHANGED,
              snapshot => {
                let progress =
                  snapshot.bytesTransferred / snapshot.totalBytes * 100;
                this.progress = progress;
              },
              err => {
                console.log(err);
              },
              () => {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                  this.downloadURL = downloadURL;
                  db
                    .collection("polls")
                    .doc(this.pollId)
                    .update({
                      downloadURL: downloadURL,
                      fileName: this.fileName
                    })
                    .then(() => {
                      this.$router.push({ name: "index" });
                    });
                });
              }
            );
          })
          .catch(err => {
            console.log(err);
          });
      } else if (
        this.pollTitle &&
        (this.another || this.options[0].optTitle) &&
        !this.imageUrl
      ) {
        this.feedback = "Please upload a cover image!";
      } else {
        this.feedback = "Please fill in all fields!";
      }
    },
    addOpt() {
      if (this.another && !vm.checkDup(this.options, this.another)) {
        this.options.push({
          optTitle: this.another,
          optCount: 0
        });
        this.another = null;
        this.feedback = null;
      } else if (vm.checkDup(this.options, this.another)) {
        this.feedback = "Option exists";
      } else {
        this.feedback = "Please Enter Option";
      }
    },
    delOpt(opt) {
      this.options = this.options.filter(option => {
        return option.optTitle != opt.optTitle;
      });
    },
    addFaker() {
      for (var i = 1; i < 30; i++) {
        db
          .collection("polls")
          .add({
            title: "fakerTitle " + i,
            slug: i,
            options: [
              { optTitle: "option1", optCount: 0 },
              { optTitle: "option2", optCount: 0 }
            ]
          })
          .then(() => {
            this.$router.push({ name: "index" });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    onFilePicked(event) {
      const files = event.target.files;
      let fileName = files[0].name;
      if (fileName.lastIndexOf(".") < 0) {
        this.feedback = "Please upload a valid file!";
      } else {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          this.imageUrl = fileReader.result;
        });
        fileReader.readAsDataURL(files[0]);
        this.feedback = null;
        this.image = files[0];
        this.imageName = fileName;
      }
    },
    uploadImage() {}
  }
};
</script>

<style>
.addPoll {
  max-width: 500px;
  margin: 20px auto;
}

.addPoll blockquote {
  margin-bottom: 30px;
}

#subBtn {
  position: relative;
  left: 380px;
}
.feedback {
  color: red;
}

.addBtn {
  position: relative;
  top: -65px;
  cursor: pointer;
}

.delBtn {
  position: relative;
  top: -45px;
  cursor: pointer;
}
.input-field {
  height: 63px;
}
.preview img {
  max-width: 500px;
  margin-top: 20px;
  margin-left: -70px;
  margin-bottom: 30px;
}
</style>
