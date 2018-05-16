<template>
  <div class="addPoll">
    <blockquote>
      <h2>Add Poll</h2>
    </blockquote>
    <form @submit.prevent="addPoll">
      <div class="input-field col s6">
        <i class="material-icons prefix">title</i>
        <input placeholder="Title" id="pollTitle" type="text" v-model="pollTitle">
      </div>
      <div class="input-field col s6" v-for="(option, index) in options" :key="index">
        <i class="material-icons prefix">radio_button_checked</i>
        <input id="pollOption" type="text" v-model="options[index]">
        <i class="material-icons delBtn right" @click="delOpt(option)">clear</i>
      </div>

      <div class="input-field col s6">
        <i class="material-icons prefix">radio_button_checked</i>
        <input placeholder="Option" id="pollOption" type="text" v-model="another" @keydown.tab.prevent="addOpt">
      </div>
      <i class="material-icons addBtn right" @click="addOpt">add</i>

      <div class="file-field input-field">
        <div class="btn">
          <span>Image</span>
          <input type="file">
        </div>
        <div class="file-path-wrapper">
          <input placeholder="Upload Cover image" class="file-path validate" type="text">
        </div>
      </div>

      <p v-if="feedback" class="feedback">{{feedback}}</p>
      <button id="subBtn" class="btn waves-effect waves-light" type="submit" name="action">Submit
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "addPoll",
  data() {
    return {
      pollTitle: null,
      pollOption: null,
      another: null,
      options: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    addPoll() {
      if (this.pollTitle && (this.another || this.options[0])) {
        this.feedback = null;
        this.options.push(this.another);
        this.slug = slugify(this.pollTitle, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db
          .collection("polls")
          .add({
            title: this.pollTitle,
            slug: this.slug,
            options: this.options
          })
          .then(() => {
            this.$router.push({ name: "index" });
          })
          .catch(err => {
            conosle.log(err);
          });
      } else {
        this.feedback = "Please enter both Title and Option";
      }
    },
    addOpt() {
      if (this.another && this.options.indexOf(this.another) == -1) {
        this.options.push(this.another);
        this.another = null;
        this.feedback = null;
      } else if (this.options.indexOf(this.another) != -1) {
        this.feedback = "Option exists";
      } else {
        this.feedback = "Please Enter Option";
      }
    },
    delOpt(opt) {
      this.options = this.options.filter(option => {
        return option != opt;
      });
    }
  }
};
</script>

<style>
.addPoll {
  max-width: 500px;
  margin: 20px auto;
}

.addPoll blockquote {
  margin-bottom: 30px;
}

#subBtn {
  position: relative;
  left: 380px;
}
.feedback {
  color: red;
}

.addBtn {
  position: relative;
  top: -65px;
  cursor: pointer;
}

.delBtn {
  position: relative;
  top: -45px;
  cursor: pointer;
}
.input-field {
  height: 63px;
}
</style>
