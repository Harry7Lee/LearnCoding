<template>
    <div class="settings">
        <h4>Hi, {{user}}</h4>
        <p>User ID: {{userId}}</p>
        <form @submit.prevent='updateSettings'>
            <div class="input-field">
                <label for="username">User Name</label>
                <input type="text" name="username" v-model='username'>
            </div>
            <div class="input-field">
                <label for="city">City</label>
                <input type="text" name="city" v-model='city'>
            </div>
            <div class="input-field">
                <label for="state">State</label>
                <input type="text" name="state" v-model='state'>
            </div>
            <button class="waves-effect waves-teal btn">UPDATE</button>
        </form>
    </div>
</template>

<script>
export default {
  name: "settings",
  props: ["user", "userId"]
};
</script>

<style>
</style>
