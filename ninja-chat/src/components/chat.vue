<template>
  <div class="chat container">
    <h2 class="center teal-text">NINJA CHATS</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages">
          <li>
            <span class="teal-text">Name</span>
            <span class="grey-text text-darken-3">message</span>
            <span class="teal-text time">time</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <newMessage :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
import newMessage from "@/components/newMessage";
export default {
  name: "chat",
  props: ["name"],
  components: {
    newMessage
  },
  data() {
    return {};
  }
};
</script>

<style>
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}
.chat span {
  font-size: 1.4em;
}
.chat .time {
  font-size: 1.2em;
  display: block;
}
</style>
