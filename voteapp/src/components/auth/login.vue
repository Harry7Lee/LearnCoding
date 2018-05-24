<template>
    <div class="login container">
        <form>
            <h2 class="teal-text">LOGIN / SIGNUP</h2>
            <div class="field">
                <label for="email">Email:</label>
                <input type="email" name="email" v-model="email">
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password">
            </div>
            <div v-if="signUp" class="field">
                <label for="userName">UserName:</label>
                <input type="text" name="userName" v-model="userName">
            </div>
            <p class="red-text">{{feedback}}</p>
            <button v-if="!signUp" class="btn btn-large teal" @click.prevent="login">Login / SignUp</button>
            <button v-if="signUp" class="btn btn-large teal" @click.prevent="signup">SignUp</button>
        </form>
    </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
      signUp: false,
      userName: null
    };
  },
  methods: {
    login() {
      let ref = db.collection("users").doc(this.email);
      if (this.email && this.password) {
        ref.get().then(doc => {
          if (doc.exists) {
            firebase
              .auth()
              .signInWithEmailAndPassword(this.email, this.password)
              .then(this.$router.push({ name: "index" }));
          } else {
            this.signUp = true;
            this.feedback = "Email not detected, input username and sign up!";
          }
        });
      }
    },
    signup() {
      let ref = db.collection("users").doc(this.email);
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(cred => {
          ref.set({
            user_id: cred.user.uid,
            userName: this.userName
          });
        })
        .then(this.$router.push({ name: "index" }));
    }
  }
};
</script>

<style>
.login {
  max-width: 500px;
  margin: 100px auto;
}
.login .btn {
  margin-top: 20px;
}

.login .field {
  margin-top: 20px;
}
</style>
