<template>
    <div class="Navbar">
        <Signin v-if="isModalVisible" @close="closeModal"></Signin>
        <nav>
            <div class="nav-wrapper blue">
                <a href="/" class="brand-logo">
                    <i class="material-icons">
                        book
                    </i>BookStore</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li v-if="!user">
                        <a @click.prevent='showModal'>Sign In / Up</a>
                    </li>
                    <router-link :to="{name: 'Settings', params:{id: userId}}">
                        <li v-if="user">
                            <a>{{user}}</a>
                        </li>
                    </router-link>
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
      isModalVisible: false
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
};
</script>

<style>
</style>
