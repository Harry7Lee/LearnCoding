<template>
  <div v-if="poll" class="editPoll">
    <blockquote>
      <h5>Edit Poll:</h5>
      <h3 class="noMargin"> {{poll.title}}</h3>
    </blockquote>
    <form @submit.prevent="updatePoll">
      <div class="input-field col s6">
        <i class="material-icons prefix">title</i>
        <input placeholder="Title" id="pollTitle" type="text" v-model="poll.title">
      </div>
      <div class="input-field col s6" v-for="(option, index) in poll.options" :key="index">
        <i class="material-icons prefix">radio_button_checked</i>
        <input id="pollOption" type="text" v-model="poll.options[index].optTitle">
        <i class="material-icons delBtn right" @click="delOpt(option)">clear</i>
      </div>

      <div class="input-field col s6">
        <i class="material-icons prefix">radio_button_checked</i>
        <input placeholder="Option" id="pollOption" type="text" v-model="another" @keydown.tab.prevent="addOpt">
      </div>
      <i class="material-icons addBtn right" @click="addOpt">add</i>

      <div class="file-field input-field">
        <div class="btn">
          <span>Image</span>
          <input type="file" accept="image/*" @change="onFilePicked">
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
      <button id="subBtn" class="btn waves-effect waves-light" type="submit" name="action">Update
        <i class="material-icons right">send</i>
      </button>
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
  name: "editPoll",
  data() {
    return {
      poll: null,
      feedback: null,
      another: null,
      finalOptions: [],
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
    updatePoll() {
      if (
        this.poll.title &&
        (this.another || this.poll.options[0].optTitle) &&
        this.imageUrl
      ) {
        this.feedback = null;
        this.poll.options.forEach(option => {
          this.finalOptions.push(option);
        });
        this.slug = slugify(this.poll.title, {
          replacement: "-",
          remove: /[ $*_+~.()'"!\-:@]/g,
          lower: true
        });
        db
          .collection("polls")
          .doc(this.poll.id)
          .update({
            title: this.poll.title,
            slug: this.poll.slug,
            options: this.finalOptions,
            user_id: firebase.auth().currentUser.uid,
            downloadURL: this.downloadURL,
            timestamp: Date.now()
          })
          .then(() => {
            this.pollId = this.poll.id;
            const ext = this.imageName.slice(this.imageName.lastIndexOf("."));
            this.fileName = this.poll.id + ext;
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
      } else if (this.another) {
        this.finalOptions.push({
          optTitle: this.another,
          optCount: 0
        });
      } else {
        this.feedback = "Please enter both Title and Option";
      }
    },
    addOpt() {
      if (this.another && !vm.checkDup(this.poll.options, this.another)) {
        this.poll.options.push({
          optTitle: this.another,
          optCount: 0
        });
        this.another = null;
        this.feedback = null;
      } else if (vm.checkDup(this.poll.options, this.another)) {
        this.feedback = "Option exists";
      } else {
        this.feedback = "Please Enter Option";
      }
    },
    delOpt(opt) {
      this.poll.options = this.poll.options.filter(option => {
        return option.optTitle != opt.optTitle;
      });
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
    }
  },
  created() {
    let ref = db
      .collection("polls")
      .where("slug", "==", this.$route.params.poll_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.poll = doc.data();
        this.poll.id = doc.id;
        this.imageUrl = doc.data().downloadURL;
      });
    });
  }
};
</script>

<style>
blockquote {
  width: 800px;
}

.editPoll {
  max-width: 500px;
  margin: 20px auto;
}

.editPoll blockquote {
  margin-bottom: 30px;
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
#subBtn {
  position: relative;
  left: 380px;
}
.feedback {
  color: red;
}
.noMargin {
  margin: 0;
}

.preview img {
  max-width: 500px;
  margin-top: 20px;
  margin-left: -70px;
}
</style>
