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
        
        const { data } = await this.$axios.post('/server/api/register', {
          username: this.username,
          password: this.password
        });

        this.message = data.message;
        if (data.message === 'Registration successful!') {
          console.log("in if");

          this.$router.push('/login');
        }
        else{
          console.log("in else");
        }
      }
      
      catch (error) {
        console.error("Registration error:", error);
        this.message = error.response.data.message;
      }
    }
  }
};
</script>

