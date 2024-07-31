<template>
  <div>
    <h2>Unlimited movies, TV shows, and more</h2>
    <h3>Watch anywhere. Cancel anytime.</h3>
    <p v-if="username">Welcome, {{ username }}!</p>
    <div v-if="!username">
      <nuxt-link to="/login">Login</nuxt-link>
      <nuxt-link to="/register">Register</nuxt-link>
    </div>
    <nuxt-link v-if="username" to="/edit-profile">Edit Profile</nuxt-link>
    <button v-if="username" @click="logout">Logout</button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      username: null
    };
  },
  async mounted() {
    try {
      const { data } = await this.$axios.get('/profile');
      this.username = data.username;
    } catch (error) {
      this.$router.push('/login');
    }
  },
  methods: {
    async logout() {
      await this.$axios.post('/logout');
      this.username = null;
      this.$router.push('/login');
    }
  }
};
</script>