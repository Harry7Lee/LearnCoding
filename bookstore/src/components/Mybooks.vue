<template>
    <div class="myBooks container">

        <h5>My Books</h5>
        <div class="search">
            <form @submit.prevent='search'>
                <div class="input-field searchBar">
                    <i class="material-icons prefix">search</i>
                    <label for="book">Search Book</label>
                    <input type="text" name='book' v-model="book">
                    <button class="btn btn-teal right searchBtn">Search</button>
                </div>
            </form>
        </div>
        <div class="bookList">
            <div v-if="isLoaded" class="col s12 m6 l3">
                <div v-for="(book, index) in landPage(currentPage)" :key=" index " class="card">
                    <div class="card-image">
                        <img :src="book.imageUrl">
                        <span class="card-title"></span>
                        <a class="btn-floating halfway-fab waves-effect waves-light red " @click="addBook(book.title,book.owner,book.imageUrl,book.author)">
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
                <li v-show="currentPage!=1">
                    <a href="javascript:void(0)" @click="switchPage(currentPage-1)">
                        <i class="material-icons">chevron_left</i>
                    </a>
                </li>
                <li v-for="(page,index) in pageNum" :key='index' v-bind:class="{active:page === currentPage}">
                    <a href="javascript:void(0)" @click="switchPage(page)">{{page}}</a>
                </li>
                <li v-show="currentPage!=pageNum" class="waves-effect">
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
      currentPage: 1
    };
  },
  filters: {
    bookTitle: function(value) {
      return value.slice(0, 50);
    }
  },
  methods: {
    addBook(title, owner, imageUrl, author) {
      db.collection("books").add({
        title: title,
        owner: owner,
        imageUrl: imageUrl,
        author: author
      });
    },
    search() {
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
              author: book.volumeInfo.authors
            });
          });
        })
        .then((this.isLoaded = true));
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
      if (this.currentPage >= 1 && this.currentPage <= this.pageNum) {
        this.currentPage = num;
      }
    }
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
</style>
