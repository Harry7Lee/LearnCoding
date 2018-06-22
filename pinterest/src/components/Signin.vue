<template>
  <transition name="fade">
    <div class="modal-backdrop">
      <div class="modal row">
        <div class="title">
          <h4 class="center col l10 offset-l1 teal-text">SIGN IN / SIGN UP</h4>
          <button class="btn-flat waves-effect waves-light col l1" @click="close">
            <i class="material-icons">close</i>
          </button>
        </div>
        <form class="col l12">
          <div class="input-field ">
            <label for="email">Email</label>
            <input type="text" name="email" v-model="email">
          </div>
          <div class="input-field">
            <label for="password">Password</label>
            <input type="password" name="password" v-model="password">
          </div>
          <div v-if="isSignUp" class="input-field">
            <label for="password">Retype Password</label>
            <input type="password" name="password" v-model="rePassword">
          </div>
        </form>
        <p v-if='feedback' class="red-text">{{feedback}}</p>
        <button v-if="!isSignUp" class="waves-effect waves-teal btn-large" @click="signIn">SIGN IN</button>
        <button v-if="isSignUp" class="waves-effect waves-teal btn-large" @click="signUp">SIGN UP</button>
      </div>
    </div>
  </transition>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "modal",
  data() {
    return {
      email: null,
      password: null,
      rePassword: null,
      showModal: false,
      feedback: null,
      isSignUp: false
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.close();
          this.$router.push({ name: "Index" });
        })
        .catch(err => {
          this.isSignUp = true;
          this.feedback =
            "Username not fount. Confirm your password and sign up.";
        });
    },
    signUp() {
      if (this.password === this.rePassword) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            db
              .collection("users")
              .add({
                name: "",
                city: "",
                state: "",
                id: cred.user.uid
              })
              .then(() => {
                this.close();
                this.$router.push({ name: "Index" });
              });
          })
          .catch(err => {
            this.feedback = err.message;
          });
      } else {
        this.feedback = "Please make sure two parsswords are the same!";
      }
    }
  }
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.modal {
  width: 500px;
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.title h4 {
  margin-top: 20px;
}
</style>
