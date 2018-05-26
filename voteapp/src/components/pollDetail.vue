<template>
  <div v-if='poll' class="pollDetail">
    <blockquote>
      <h2>{{this.poll.title}}</h2>
    </blockquote>
    <div class="container left fixedBox">
      <img :src="downloadURL" alt="">
    </div>
    <div class="chart">
      <chart></chart>
    </div>

    <form class="optList" @submit.prevent="submitVote">
      <p v-for="(option, index) in poll.options" :key="index">
        <label>
          <input class="with-gap" name="group1" type="radio" v-model="picked" v-bind:value="poll.options[index]" />
          <span id="optTitle">
            {{poll.options[index].optTitle}}:
            <span id="optCount">{{poll.options[index].optCount}}</span>
          </span>
        </label>
      </p>

      <button id="subBtn" class="btn waves-effect waves-light left" type="submit" name="action">VOTE
        <i class="material-icons right">send</i>
      </button>
    </form>
    <a class="tweet btn btn-large blue" :href="tweet">
      Share this poll</a>
  </div>
</template>

<script>
import db from "@/firebase/init";
import chart from "@/components/chart.vue";
import firebase from "firebase";
import { bus } from "../main.js";
export default {
  name: "pollDetail",
  data() {
    return {
      poll: null,
      picked: null,
      downloadURL: null,
      tweet: null
    };
  },
  components: { chart },
  created() {
    this.tweet =
      "https://twitter.com/intent/tweet?text=Share%20This%20Poll%20to%20Your%20Friend:%20http://localhost:8080/#" +
      this.$route.path;
    let optRef = db
      .collection("polls")
      .where("slug", "==", this.$route.params.poll_slug);
    optRef
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.poll = doc.data();
          this.poll.id = doc.id;
          this.downloadURL = doc.data().downloadURL;
        });
      })
      .then(() => {
        this.showChart();
      });
  },
  methods: {
    submitVote() {
      let userLogged = firebase.auth().currentUser;
      if (userLogged) {
        this.poll.options.forEach(option => {
          if (option.optTitle == this.picked.optTitle) {
            option.optCount++;
          }
        });
        db
          .collection("polls")
          .doc(this.poll.id)
          .update({
            options: this.poll.options,
            slug: this.$route.params.poll_slug,
            title: this.poll.title
          })
          .then(() => {
            alert("You have vote for " + this.picked.optTitle);
            this.$router.push({ name: "index" });
            this.$router.go(0);
          });
      } else {
        this.$router.push({ name: "login" });
        this.$router.go(0);
      }
    },
    showChart: function() {
      bus.$emit("showChart", this.poll);
    }
  }
};
</script>
<style>
.pollDetail blockquote {
  display: block;
  max-width: 800px;
  margin: 0 auto;
}
.container img {
  width: auto;
  height: auto;
  max-width: 500px;
}
.fixedBox {
  margin-left: 250px;
  margin-top: 100px;
  width: 500px;
  height: 500px;
}
#optTitle {
  font-size: 20px;
}
#optCount {
  font-size: 16px;
  color: darkorange;
}
.pollDetail form {
  float: left;
  position: relative;
  left: 100px;
  top: 100px;
  margin-left: 50px;
  max-width: 300px;
}
.chart {
  margin-left: 50px;
  margin-top: 40px;
  float: left;
  max-width: 400px;
  max-height: 400px;
}
.tweet {
  position: absolute;
  bottom: 400px;
  left: 800px;
}
</style>
