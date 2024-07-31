<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <label for="username">Username:</label>
      <input type="text" v-model="username" required /><br />
      <label for="password">Password:</label>
      <input type="password" v-model="password" required /><br />
      <button type="submit">Register</button>
    </form>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await this.$axios.post('/register', {
          username: this.username,
          password: this.password
        });
        this.message = response.data.message;
        if (response.data.message === 'Registration successful!') {
          this.$router.push('/login');
        }
      } catch (error) {
        console.error("Error during registration:", error);
        // Safely access the error message
        this.message = error.response && error.response.data ? error.response.data.message : 'An error occurred during registration.';
      }
    }
  }
};
</script>
