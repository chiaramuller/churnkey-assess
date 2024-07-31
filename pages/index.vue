<template>
  <div class="container">
    <h1>Unlimited movies, TV shows, and more</h1>
    <p>Watch anywhere. Cancel anytime</p>
    <div v-if="!isLoggedIn">
      <nuxt-link to="/register">Register</nuxt-link>
      <nuxt-link to="/login">Login</nuxt-link>
    </div>
    <div v-else>
      <p>Welcome back, {{user.username}}!</p>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script lang="ts">
export default { 
  computed: {
    isLoggedIn(){
      return this.$store.getters.isLoggedIn;
    },
    user() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    async logout() {  
      await this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  },
  async mounted() {  
    await this.$store.dispatch('checkAuth');
  }
}

</script>

<style>
</style>
