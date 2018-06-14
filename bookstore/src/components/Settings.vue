<template>
  <div class="settings">
    <h4>Hi, {{user}}</h4>
    <p>User ID: {{userId}}</p>
    <form v-if="isLoaded" @submit.prevent='updateSettings'>
      <div class="input-field">
        <label for="username" v-bind:class="{active: isActive}">User Name</label>
        <input type="text" name="username" v-model='username '>
      </div>
      <div class="input-field">
        <label for="city" v-bind:class="{active: isActive}">City</label>
        <input type="text" name="city" v-model='city '>
      </div>
      <div class="input-field">
        <label for="state" v-bind:class="{active: isActive}">State</label>
        <input type="text" name="state" v-model='state '>
      </div>
      <button class="waves-effect waves-teal btn">UPDATE</button>
    </form>

    <form v-if="isLoaded" @submit.prevent='changePassword'>
      <div class="input-field">
        <label for="password">Password</label>
        <input type="password" name="password" v-model='password'>
      </div>
      <div class="input-field">
        <label for="newPassword">New Password</label>
        <input type="password" name="newPassword" v-model='newPassword'>
      </div>
      <p v-if="feedback" class="red-text center">{{feedback}}</p>
      <button class="waves-effect waves-teal btn">CHANGE PASSWORD</button>
    </form>
    <button class="waves-effect waves-teal btn red logout" @logout="logout">LOG OUT</button>
    <transition name="fade">
      <div v-if="isModalVisible" class="modal-backdrop">
        <div class="modal row">
          <div class="title">
            <h5 class="center col l10 offset-l1 teal-text">{{this.tip}}</h5>
            <button class="btn-flat waves-effect waves-light col l1" @click="close">
              <i class="material-icons">close</i>
            </button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "settings",
  props: ["user", "userId"],
  data() {
    return {
      username: null,
      city: null,
      state: null,
      isLoaded: false,
      isActive: false,
      docId: null,
      isModalVisible: false,
      tip: null,
      password: null,
      newPassword: null,
      feedback: null
    };
  },
  methods: {
    loadSettings() {
      let ref = db.collection("users").where("id", "==", this.$route.params.id);
      ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          this.username = doc.data().name;
          this.city = doc.data().city;
          this.state = doc.data().name;
          this.docId = doc.id;
        });
        this.isLoaded = true;
        this.isActive = true;
      });
    },
    updateSettings() {
      db
        .collection("users")
        .doc(this.docId)
        .update({
          name: this.username,
          city: this.city,
          state: this.state
        })
        .then(
          setTimeout(() => {
            this.isModalVisible = true;
            this.tip = "Your profile has been updated.";
          }, 1000)
        );
    },
    changePassword() {
      if (this.password && this.newPassword) {
        var user = firebase.auth().currentUser;
        firebase
          .auth()
          .signInWithEmailAndPassword(user.email, this.password)
          .then(() => {
            if (this.password != this.newPassword) {
              user
                .updatePassword(this.newPassword)
                .then(() => {
                  this.isModalVisible = true;
                  this.tip = "Password Updated";
                })
                .catch(err => {
                  this.feedback = err.message;
                });
            }
          })
          .catch(err => {
            this.feedback = "Password incorrect!";
          });
      } else if (!this.newPassword) {
        this.feedback = "Please enter the new Password!";
      } else if (this.newPassword === this.password) {
        this.feedback = "New Password can't be the same";
      }
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go(0);
          this.$router.push({ name: "Index" });
        });
    },
    close() {
      setTimeout(() => {
        this.isModalVisible = false;
        this.$router.push({ name: "Index" });
      }, 1000);
    }
  },
  created() {
    this.loadSettings();
  }
};
</script>

<style>
.settings {
  max-width: 500px;
  margin: 0 auto;
}
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
.title {
  margin: 20px;
}
.title button {
  position: relative;
  top: -20px;
  margin: 0;
}
.logout {
  margin: 100px auto;
  width: 500px;
}
</style>
