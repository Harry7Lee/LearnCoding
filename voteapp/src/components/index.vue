<template>
    <div class="index">
<div class="container">
  <div class="intro">
    <blockquote>
      <h3>Vote Everything
        </h3>
        <h5>Vote Everything You can vote for anything you want or even better create a new poll!
</h5>
      </blockquote>
<h2></h2>
<h4></h4>
  </div>
    <div class="row">
      <div class="card" v-for="(poll, index) in polls" :key="index">
        <div class="card-image">
          <img src="@/assets/sample-1.jpg">
          <span class="card-title">{{poll.title}}</span>
          <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">edit</i></a>
        </div>
        <div class="card-content">
          <ul>
            <li v-for="(opt, index) in poll.options" :key="index">
              <span class="chip">{{opt}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
    </div>

</template>

<script>
import db from "@/firebase/init";
export default {
  data() {
    return {
      polls: []
    };
  },
  created() {
    db
      .collection("polls")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let poll = doc.data();
          poll.id = doc.id;
          this.polls.push(poll);
        });
      });
  }
};
</script>

<style>
.row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
</style>
