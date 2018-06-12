TODO:
User Story: I can view all books posted by every user.

User Story: I can add a new book.

User Story: I can update my settings to store my full name, city, and state and change password.

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
        <h4>Available Books users own for trading</h4>
        <div v-if="isLoaded" class="col s12 m6 l3">
          <div v-for="(book, index) in bookList" :key=" index " class="card">
            <div class="card-image">
              <img :src="book.imageUrl">
              <span class="card-title"></span>
              <a class="btn-floating halfway-fab waves-effect waves-light red ">
                <i class="material-icons ">swap_horiz
                </i>
              </a>
            </div>
            <div class="card-content ">
              <p class="bookTtile">{{book.title | bookTitle}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
import axios from "axios";
export default {
  name: "index",
  data() {
    return {
      bookList: [],
      isLoaded: false
    };
  },
  methods: {
    loadBooks() {
      db
        .collection("books")
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
    addBook() {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=Harry+Potter+and+the+Prisoner+of+Azkaban&filter=paid-ebooks&key=AIzaSyC9X44ps3Lkjs76HRpROBd96wdjM5YM0-w"
        )
        .then(res => {
          res.data.items.forEach(book => {
            db.collection("books").add({
              title: book.volumeInfo.title,
              owner: "HarryLee",
              imageUrl: book.volumeInfo.imageLinks.thumbnail,
              author: book.volumeInfo.authors
            });
          });
        });
    }
  },
  filters: {
    bookTitle: function(value) {
      return value.slice(0, 58);
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
</style>
