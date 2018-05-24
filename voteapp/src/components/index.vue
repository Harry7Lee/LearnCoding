// TODO:
// add pagination
// fix the chart
// user can only edit /delete the poll created by themself
// add image upload feature

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
            <router-link :to="{name: 'pollDetail', params:{poll_slug:poll.slug}}">
              <img src="@/assets/sample-1.jpg">
            </router-link>
            <div @click="deletePoll(poll.id)">
              <i class="material-icons delete right">delete</i>
            </div>
            <span class="card-title">{{poll.title}}</span>
            <router-link :to="{name: 'editPoll', params:{poll_slug: poll.slug}}">
              <a class="btn-floating halfway-fab waves-effect waves-light red">
                <i class="material-icons">edit</i>
              </a>
            </router-link>
          </div>
          <div class="card-content">
            <ul>
              <li v-for="(opt, index) in poll.options" :key="index">
                <span class="chip">{{opt.optTitle}}: {{opt.optCount}}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- add pagination -->

</template>

<script>
import db from "@/firebase/init";
import { bus } from "../main.js";

export default {
  data() {
    return {
      polls: [],
      loading: true
    };
  },
  created() {
    bus.$on("searchPoll", data => {
      console.log(data);
      this.polls = this.polls.filter(poll => {
        return poll.title.match(data.toString);
      });
    });
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
  },
  methods: {
    deletePoll(id) {
      db
        .collection("polls")
        .doc(id)
        .delete()
        .then(() => {
          this.polls = this.polls.filter(filterPoll => {
            return filterPoll.id != id;
          });
        });
    }
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
.card-image .delete {
  color: rgb(197, 17, 17);
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
}
</style>
