<template>
  <div v-if='poll' class="pollDetail">
    <blockquote>
      <h2>{{this.poll.title}}</h2>
    </blockquote>
    <div class="container left fixedBox">
      <img src="@/assets/sample-1.jpg" alt="">
      <div @click.prevent='showChart' class="chart">
        <chart></chart>
      </div>
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
      <button id="subBtn" class="btn waves-effect waves-light" type="submit" name="action">VOTE
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import chart from "@/components/chart.vue";
import { bus } from "../main.js";
import Vue from "vue";
var vm = new Vue({
  methods: {
    showChart() {
      bus.$emit("showChart", this.poll);
    }
  }
});
export default {
  name: "pollDetail",
  data() {
    return {
      poll: null,
      picked: null,
      vm
    };
  },
  components: { chart },
  created() {
    let ref = db.collection("polls");
    let optRef = ref.where("slug", "==", this.$route.params.poll_slug);
    optRef.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.poll = doc.data();
        this.poll.id = doc.id;
      });
    });
  },
  mounted() {
    console.log("12");
  },
  methods: {
    submitVote() {
      this.poll.options.forEach(option => {
        if (option.optTitle == this.picked.optTitle) {
          option.optCount++;
        }
      });
      db
        .collection("polls")
        .doc(this.poll.id)
        .set({
          options: this.poll.options,
          slug: this.$route.params.poll_slug,
          title: this.poll.title
        });
      this.$router.push({ name: "index" });
    },
    showChart() {
      bus.$emit("showChart", this.poll);
    }
    //need to learn state management to know how to share data between components!!!!!!!!!!!!

    // submitVote() {
    //   var optRef = db
    //     .collection("polls")
    //     .where("slug", "==", this.$route.params.poll_slug);
    //   optRef.get().then(snapshot => {
    //     snapshot.forEach(doc => {
    //       var pollOpts = doc.data().options;
    //       console.log(pollOpts, optRef);
    //       for (var i = 0; i <= pollOpts.length; i++) {
    //         if (pollOpts[i].optTitle === this.picked.optTitle) {
    //           pollOpts[i].optCount++;
    //           // optRef.set({
    //           //   options: pollOpts
    //           // });
    //           console.log(pollOpts[i].optCount);
    //           // return (var pickedOpt = pollOpts[i]);
    //         }
    //       }
    //     });
    //   });
    // }
  }
};
</script>
<style>
.pollDetail blockquote {
  display: block;
  width: 400px;
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
.pollDetail .optList {
  position: relative;
  left: 100px;
  top: 100px;
}
.chart {
  max-width: 500px;
  max-height: 500px;
}
</style>
