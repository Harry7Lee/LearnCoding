TODO:
User Story: I can add a new book.

User Story: I can propose a trade and wait for the other user to accept the trade.

<template>
  <div class="index">
    <div class="container bookList">
      <div class="brand center">
        <h1 class="blue-text">
          <i class="medium material-icons">
            book
          </i>BookStore Trading Club</h1>
      </div>

      <div class="bookList">
        <h4>Available Books users own for trading ({{bookList.length}})</h4>
        <!-- preloader -->
        <div v-if="!isLoaded" class="progress white">
          <div class="indeterminate blue"></div>
        </div>
        <!-- feedback -->
        <p class='red-text' v-if='feedback'>{{feedback}}</p>
        <!-- booklist -->
        <div v-if="isLoaded" class="col s12 m6 l3">
          <div v-for="(book, index) in landPage(currentPage)" :key=" index " class="card">
            <div class="card-image">
              <img :src="book.imageUrl">
              <span class="card-title"></span>
              <a v-if="book.owner != userId" class="btn-floating halfway-fab waves-effect waves-light red " @click='tradeBook(userId, book.owner,book.bookId, book.imageUrl, book.title)'>
                <i class="material-icons ">swap_horiz
                </i>
              </a>
              <a v-if="book.owner === userId" class="bookAlreadyOwned btn-floating halfway-fab green">
              </a>
            </div>
            <div class="card-content ">
              <p class="bookTtile">{{book.title | bookTitle}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- pagination -->
    <div class="row" v-if='pageNum > 1'>
      <ul class="pagination col l6 m6 s12 offset-l5 offset-m4">
        <li v-bind:class="{disabled: currentPage===1}" class="waves-effect">
          <a href="javascript:void(0)" @click="switchPage(currentPage-1)">
            <i class="material-icons">chevron_left</i>
          </a>
        </li>
        <li v-for="(page,index) in pageNum" :key='index' v-bind:class="{active:page === currentPage}">
          <a href="javascript:void(0)" @click="switchPage(page)">{{page}}</a>
        </li>
        <li v-bind:class="{disabled: currentPage===pageNum}" class="waves-effect">
          <a href="javascript:void(0)">
            <i class="material-icons" @click="switchPage(currentPage+1)">chevron_right</i>
          </a>
        </li>
      </ul>
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
      bookList: [],
      isLoaded: false,
      showModal: false,
      pageNum: 1,
      currentPage: 1,
      trades: [],
      feedback: null
    };
  },
  methods: {
    loadBooks() {
      db
        .collection("books")
        .orderBy("title")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.bookList.push(doc.data());
          });
        })
        .then(() => {
          this.isLoaded = true;
        });
    },
    tradeBook(sender, bookOwner, bookId, imageUrl, title) {
      var trade = {
        sender: sender,
        bookOwner: bookOwner,
        bookId: bookId,
        imageUrl: imageUrl,
        title: title
      };
      this.feedback = null;
      let ref = db.collection("trades").where("sender", "==", sender);
      ref.get().then(snapshot => {
        var found = snapshot.docs.find(trade => {
          return trade.data().bookId === bookId;
        });
        if (found) {
          this.feedback = "Already sent trade!";
        } else {
          db
            .collection("trades")
            .add(trade)
            .then(this.trades.push(trade));
        }
      });
    },
    landPage(num) {
      this.pageNum = Math.ceil(this.bookList.length / 20);
      this.currentPage = num;
      let start = (this.currentPage - 1) * 20;
      let end = start + 20;
      var slicedbookList = this.bookList.slice(start, end);
      return slicedbookList;
    },
    switchPage(num) {
      if (num >= 1 && num <= this.pageNum) {
        this.currentPage = num;
      }
    }
  },
  filters: {
    bookTitle: function(value) {
      return value.slice(0, 50);
    }
  },
  created() {
    this.loadBooks();
  }
};
</script>


<style>
img {
  width: 200px;
  height: 300px;
}
.card {
  float: left;
  margin: 20px;
}
.bookTtile {
  width: 200px;
  height: 30px;
}
.preloader {
  z-index: 2;
}
.bookAlreadyOwned {
  position: relative;
  top: -5px;
  left: 240px;
  width: 15px;
  height: 15px;
}
</style>
