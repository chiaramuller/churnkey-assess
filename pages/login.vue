<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input type="text" v-model="username" required /><br />
        <label for="password">Password:</label>
        <input type="password" v-model="password" required /><br />
        <button type="submit">Login</button>
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
      async login() {
        try {
          const { data } = await this.$axios.post('/login', {
            username: this.username,
            password: this.password
          });
          this.message = data.message;
          if (data.message === 'Login successful!') {
            this.$router.push('/edit-profile');
          }
        } catch (error) {
          this.message = error.response.data.message;
        }
      }
    }
  };
  </script>
  