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

        <div v-if="loading" class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>

        <router-link :to="{name: 'addPoll'}">
          <a id="floatAdd" class="btn-floating btn-large waves-effect waves-light red right">
            <i class="material-icons">add</i>
          </a>
        </router-link>
      </div>
      <div class="row">
        <div class="card" v-for="(poll, index) in polls" :key="index">
          <div class="card-image">
            <img src="@/assets/sample-1.jpg">
            <span class="card-title">{{poll.title}}</span>
            <router-link :to="{name: 'editPoll', params:{poll_slug: poll.slug}}">
              <a class="btn-floating halfway-fab waves-effect waves-light red" @click="editPoll">
                <i class="material-icons">edit</i>
              </a>
            </router-link>
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
      polls: [],
      loading: true
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
          this.loading = false;
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
.card-content li {
  display: inline-block;
}

.preloader-wrapper {
  position: relative;
  left: 45%;
}
</style>
