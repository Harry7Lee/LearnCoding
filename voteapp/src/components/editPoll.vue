<template>
    <div class="addPoll">
        <blockquote>
            <h5>Edit Poll:</h5>
            <h3 class="noMargin"> {{poll.title}}</h3>
        </blockquote>
        <form @submit.prevent="updatePoll">
            <div class="input-field col s6">
                <i class="material-icons prefix">title</i>
                <input placeholder="Title" id="pollTitle" type="text" v-model="poll.title">
            </div>
            <div class="file-field input-field">
            </div>
            <div class="input-field col s6" v-for="(option, index) in poll.options" :key="index">
                <i class="material-icons prefix">radio_button_checked</i>
                <input id="pollOption" type="text" v-model="poll.options[index]">
            </div>

            <div class="input-field col s6">
                <i class="material-icons prefix">radio_button_checked</i>
                <input placeholder="Option" id="pollOption" type="text" v-model="another" @keydown.tab.prevent="addOpt">
            </div>

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
            <button id="subBtn" class="btn waves-effect waves-light" type="submit" name="action">Update
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "editPoll",
  data() {
    return {
      poll: null,
      feedback: null,
      another: null
    };
  },
  methods: {
    updatePoll() {
      if (this.poll.title && (this.another || this.poll.options[0])) {
        this.feedback = null;
        this.poll.options.push(this.another);
        this.slug = slugify(this.poll.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db
          .collection("polls")
          .doc(this.poll.id)
          .update({
            title: this.poll.title,
            slug: this.poll.slug,
            options: this.poll.options
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
      if (this.another && this.poll.options.indexOf(this.another) == -1) {
        this.poll.options.push(this.another);
        this.another = null;
      } else if (this.poll.options.indexOf(this.another) != -1) {
        this.feedback = "Option exists";
      } else {
        this.feedback = "Please Enter Option";
      }
    }
  },
  created() {
    let ref = db
      .collection("polls")
      .where("slug", "==", this.$route.params.poll_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.poll = doc.data();
        this.poll.id = doc.id;
      });
    });
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
.noMargin {
  margin: 0;
}
</style>
