TODO:
// add pagination --- done
// fix the chart --- done
// user can only edit /delete the poll created by themself --- done
// add image upload feature -- done
// share this poll

<template>
  <div class="index">
    <div class="container">
      <div class="intro">
        <blockquote>
          <h3>Vote Everything
          </h3>
          <h5>Vote Everything You can vote for anything you want or even better signup and create a new poll!
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
        <div class="card" v-for="(poll, index) in goPage(currentPage)" :key="index">
          <div class="card-image">
            <router-link :to="{name: 'pollDetail', params:{poll_slug:poll.slug}}">
              <img :src="poll.downloadURL">
            </router-link>
            <div v-if="poll.user_id === loggedUser" @click="deletePoll(poll.id)">
              <i class="material-icons delete right">delete</i>
            </div>
            <span class="card-title">{{poll.title}}</span>
            <router-link :to="{name: 'editPoll', params:{poll_slug: poll.slug}}">
              <a v-if="poll.user_id === loggedUser" class="btn-floating halfway-fab waves-effect waves-light red">
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
    <!-- add pagination -->
    <div v-if="pageNum > 1" id="pagination" class="container pagination center">
      <ul class="paginationul">
        <li v-bind:class="{disabled: currentPage == 1, waveEffect:currentPage!= 1}">
          <a href="javascript:void(0)" @click="switchPage(currentPage-1)">
            <i class="material-icons">chevron_left</i>
          </a>
        </li>
        <li v-for="(page, index) in pageNum" :key="index" v-bind:class="{active: currentPage == page}" class="waves-effect">
          <a href="javascript:void(0)" @click="switchPage(page)">{{page}}</a>
        </li>
        <li v-bind:class="{disabled: currentPage == pageNum, waveEffect:currentPage!= pageNum}">
          <a href="javascript:void(0)" @click="switchPage(currentPage+1)">
            <i class="material-icons">chevron_right</i>
          </a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import db from "@/firebase/init";
import { bus } from "../main.js";
import firebase from "firebase";

export default {
  data() {
    return {
      polls: [],
      loading: true,
      pageSize: 9,
      pageNum: 1,
      currentPage: 1,
      downloadURL: null
    };
  },
  created() {
    bus.$on("searchPoll", data => {
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
          this.downloadURL = doc.data().downloadURL;
        });
      });
  },
  computed: {
    loggedUser() {
      let user = firebase.auth().currentUser;
      if (user) {
        return user.uid;
      } else {
        return null;
      }
    }
  },
  methods: {
    deletePoll(id) {
      db
        .collection("polls")
        .doc(id)
        .get()
        .then(doc => {
          firebase
            .storage()
            .ref()
            .child(doc.data().fileName)
            .delete();
        })
        .then(() => {
          if (firebase.auth().currentUser) {
            db
              .collection("polls")
              .doc(id)
              .delete()
              .then(doc => {
                this.polls = this.polls.filter(filterPoll => {
                  return filterPoll.id != id;
                });
              });
          }
        });
    },
    switchPage(num) {
      if (num <= this.pageNum && num >= 1) {
        this.currentPage = num;
      }
    },
    goPage(num) {
      this.pageNum = Math.ceil(this.polls.length / this.pageSize);
      this.currentPage = num;
      let start = (this.currentPage - 1) * this.pageSize;
      let end = start + this.pageSize + 1;
      return this.polls.slice(start, end);
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
#pagination {
  margin-bottom: 60px;
}
</style>
