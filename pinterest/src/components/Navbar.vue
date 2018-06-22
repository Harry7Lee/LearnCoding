<template>
    <div class="Navbar">
        <Signin v-if="isModalVisible" @close="closeModal"></Signin>
        <nav>
            <div class="nav-wrapper blue">
                <a href="/" class="brand-logo">
                    <i class="material-icons">
                        image
                    </i>Pinterest</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li v-if="!user">
                        <a @click.prevent='showModal'>Sign In / Up</a>
                    </li>
                    <div v-if="user" class="loggedInNav">
                        <li>
                            {{user}}
                        </li>
                        <li>
                            <router-link :to="{name: 'Mybooks', params:{id: userId}}">
                                My Images
                            </router-link>
                        </li>
                        <li>
                            <a @click="logout">Log Out
                            </a>
                        </li>
                    </div>
                </ul>
            </div>
        </nav>

    </div>
</template>

<script>
import Signin from "@/components/Signin";
import firebase from "firebase";
export default {
  components: {
    Signin
  },
  props: ["userId", "user"],
  data() {
    return {
      isModalVisible: false,
      isMenuVisible: false
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    showMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go(0);
          this.$router.push({ name: "Index" });
        });
    }
  }
};
</script>

<style>
</style>
