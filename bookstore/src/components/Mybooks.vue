<template>
  <div class="myBooks container">
    <h5>My Books and Trades</h5>
    <div class="card-tabs">
      <ul class="tabs tabs-fixed-width">
        <li class="tab active">
          <a href="#bookTab">My Books ({{ownedBooks.length}})</a>
        </li>
        <li class="tab">
          <a href="#tradeTab">Want to Trade ({{myTrades.length}})</a>
        </li>
        <li class="tab">
          <a href="#requestTab">Trade requests ({{tradeReq.length}})</a>
        </li>
      </ul>
    </div>
    <div class="card-content grey lighten-4">
      <div id="bookTab">
        <!-- preloader -->
        <div v-if="loading" class="progress white">
          <div class="indeterminate blue"></div>
        </div>
        <!-- my books -->
        <div class="row ">
          <div v-for="(book, index) in ownedBooks" :key=" index " class="card">
            <div class="card-image">
              <img class="ownedBookImage" :src="book.imageUrl">
            </div>
            <a class="deleteBtn btn-floating halfway-fab waves-effect waves-light red btn-small" @click="deleteBook(book.bookId)">
              <i class="material-icons ">clear
              </i>
            </a>
          </div>
        </div>
      </div>
      <!-- want to trade -->
      <div id="tradeTab">
        <div class="row ">
          <div v-for="(trade, index) in myTrades" :key=" index " class="card">
            <div class="card-image">
              <img class="ownedBookImage" :src="trade.imageUrl">
            </div>
            <a class="deleteBtn btn-floating halfway-fab waves-effect waves-light red btn-small" @click="deleteTrade(trade.bookId)">
              <i class="material-icons ">clear
              </i>
            </a>
          </div>
        </div>
      </div>

      <div id="requestTab">
        <ul class="collection">
          <li v-for="(trade,index) in tradeReq" :key='index' class="collection-item">{{trade.title}}
            <button class="accept btn right btn-small red" @click='deleteTrade(trade.bookId)'>
              <i class="material-icons">clear</i>
            </button>
            <button class="cancel btn right btn-small" @click="acceptTrade(trade.bookId)">
              <i class="material-icons">check</i>
            </button>
          </li>
        </ul>
      </div>

    </div>

    <!-- searchbar -->
    <div id='searchBar' class="search">
      <h5 v-if="ownedBooks.length > 0" class="divider"></h5>
      <h5>Search and Add a new book</h5>
      <form @submit.prevent='search'>
        <div class="input-field searchBar">
          <i class="material-icons prefix">search</i>
          <label for="book">Search Book</label>
          <input type="text" name='book' v-model="book">
          <button class="btn btn-teal right searchBtn">Search</button>
        </div>
        <p v-if="feedback" class="red-text">{{feedback}}</p>
      </form>
    </div>
    <div v-if="searching" class="progress white">
      <div class="indeterminate blue"></div>
    </div>
    <!-- My books -->
    <div class="bookList">
      <div v-if="isLoaded" class="col s12 m6 l3">
        <div v-for="(book, index) in landPage(currentPage)" :key=" index " class="card">
          <div class="card-image">
            <img :src="book.imageUrl">
            <span class="card-title"></span>
            <a class="btn-floating halfway-fab waves-effect waves-light red " @click="addBook(book.title,book.owner,book.imageUrl,book.author,book.volumeId)">
              <i class="material-icons ">add
              </i>
            </a>
          </div>
          <div class="card-content ">
            <p class="bookTtile">{{book.title | bookTitle}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- pagination -->
    <div class="row" v-if='pageNum > 1'>
      <ul class="pagination col l6 m6 s12 offset-l4 offset-m3">
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
import axios from "axios";
import db from "@/firebase/init";
export default {
  props: ["user", "userId"],
  data() {
    return {
      book: null,
      results: [],
      isLoaded: false,
      pageNum: 1,
      currentPage: 1,
      ownedBooks: [],
      myTrades: [],
      tradeReq: [],
      loading: true,
      searching: null,
      bookId: null,
      feedback: null,
      volumeId: null
    };
  },
  filters: {
    bookTitle: function(value) {
      return value.slice(0, 50);
    }
  },
  methods: {
    addBook(title, owner, imageUrl, author, volumeId) {
      var repeat = this.ownedBooks.find(book => {
        return book.volumeId == volumeId;
      });
      if (repeat) {
        this.feedback = "Your already have this book!";
      } else {
        var bookId = null;
        db
          .collection("books")
          .add({
            title: title,
            owner: owner,
            imageUrl: imageUrl,
            author: author,
            volumeId: volumeId
          })
          .then(docRef => {
            bookId = docRef.id;
            db
              .collection("books")
              .doc(docRef.id)
              .update({
                bookId: docRef.id
              })
              .then(docRef => {
                this.ownedBooks.push({
                  title: title,
                  owner: owner,
                  imageUrl: imageUrl,
                  author: author,
                  bookId: bookId,
                  volumeId: volumeId
                });
              });
          });
      }
    },
    deleteBook(id) {
      db
        .collection("books")
        .doc(id)
        .delete()
        .then(
          (this.ownedBooks = this.ownedBooks.filter(book => {
            return book.bookId != id;
          }))
        );
    },
    loadOwnedBooks() {
      db
        .collection("books")
        .where("owner", "==", this.$route.params.id)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.ownedBooks.push(doc.data());
          });
        })
        .then(() => {
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadMyTrades() {
      db
        .collection("trades")
        .where("sender", "==", this.$route.params.id)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.myTrades.push(doc.data());
          });
        })
        .then(() => {
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteTrade(id) {
      let ref = db.collection("trades").where("bookId", "==", id);
      let docId = null;
      ref
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            docId = doc.id;
          });
        })
        .then(() => {
          db
            .collection("trades")
            .doc(docId)
            .delete()
            .then(
              (this.myTrades = this.myTrades.filter(trade => {
                return trade.bookId != id;
              }))
            );
        });
    },
    loadTradeReq() {
      let ref = db
        .collection("trades")
        .where("bookOwner", "==", this.$route.params.id);
      ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          this.tradeReq.push(doc.data());
        });
      });
    },
    acceptTrade(id) {
      // 1. remove the trade
      // 2. update the owner of this book to sender

      let ref = db.collection("trades").where("bookId", "==", id);
      let bookRef = db.collection("books").where("bookId", "==", id);
      let docId = null;
      let bookDocId = "asoidjioajsdio";
      let sender = null;
      ref
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            docId = doc.id;
            sender = doc.data().sender;
          });
        })
        .then(() => {
          bookRef.get().then(snapshot => {
            snapshot.forEach(doc => {
              bookDocId = doc.id;
            });
            db
              .collection("books")
              .doc(bookDocId)
              .update({ owner: sender });
          });
        })
        .then(() => {
          db
            .collection("trades")
            .doc(docId)
            .delete()
            .then(
              (this.tradeReq = this.tradeReq.filter(trade => {
                return trade.bookId != id;
              }))
            );
        });
    },
    search() {
      this.feedback = null;
      this.searching = true;
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            this.book +
            "&maxResults=40&key=AIzaSyC9X44ps3Lkjs76HRpROBd96wdjM5YM0-w"
        )
        .then(res => {
          this.results = [];
          res.data.items.forEach(book => {
            this.results.push({
              title: book.volumeInfo.title,
              owner: this.userId,
              imageUrl: book.volumeInfo.imageLinks.thumbnail,
              author: book.volumeInfo.authors,
              volumeId: book.id
            });
          });
        })
        .then(() => {
          this.isLoaded = true;
          this.searching = false;
        })
        .then(scrool => {
          var searchBar = document.getElementById("searchBar");
          searchBar.scrollIntoView();
        })
        .catch(err => {
          this.feedback = err.message;
        });
    },
    landPage(num) {
      this.pageNum = Math.ceil(this.results.length / 12);
      this.currentPage = num;
      let start = (this.currentPage - 1) * 12;
      let end = start + 12;
      var slicedResults = this.results.slice(start, end);
      return slicedResults;
    },
    switchPage(num) {
      if (num >= 1 && num <= this.pageNum) {
        this.currentPage = num;
      }
    }
  },
  created() {
    this.loadOwnedBooks();
    this.loadMyTrades();
    this.loadTradeReq();
  },
  beforeCreate() {
    $(document).ready(function() {
      $(".tabs").tabs();
    });
  }
};
</script>

<style>
.searchBar {
  margin-top: 30px;
}
.searchBtn {
  position: relative;
  top: -50px;
}
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
.ownedBookImage {
  width: 100px;
  height: 150px;
}
.deleteBtn {
  position: relative;
  top: -10px;
  left: 110px;
}
.card-tabs {
  margin-top: 30px;
}

.accept,
.cancel {
  position: relative;
  top: -2px;
  height: 25px;
  margin-left: 5px;
}

.accept i,
.cancel i {
  position: relative;
  top: -3px;
}
.card-content {
  overflow: hidden;
}
</style>
