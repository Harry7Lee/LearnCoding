<template>
<div class="addPoll">
     <blockquote>
        <h2>Add Poll</h2>
      </blockquote>
        <form @submit.prevent = "addPoll">
         <div class="input-field col s6">
            <i class="material-icons prefix">title</i>
          <input id="pollTitle" type="text" v-model="pollTitle">
          <label for="pollTitle">Title</label>
        </div>
        <div class="file-field input-field">
      
    </div>
         <div class="input-field col s6" v-for="(option, index) in options" :key="index">
          <i class="material-icons prefix">radio_button_checked</i>
          <input id="pollOption" type="text" v-model="pollOption">
          <label for="pollOption">Option</label>
        </div>

        <div class="input-field col s6">
          <i class="material-icons prefix">radio_button_checked</i>
          <input id="pollOption" type="text" v-model="pollOption">
          <label for="pollOption">Option</label>
        </div>

  <div class="file-field input-field">
      <div class="btn">
        <span>File</span>
        <input type="file">
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text">
      </div>
    </div>
      
        <button id="subBtn" class="btn waves-effect waves-light" type="submit" name="action">Submit
        <i class="material-icons right">send</i>
        </button>
        </form>
</div>
</template>

<script>
import db from "@/firebase/init";
export default {
  data() {
    options: [];
  },
  methods: {
    addPoll() {}
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
</style>
