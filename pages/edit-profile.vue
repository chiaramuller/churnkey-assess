<template>
  <div>
    <h2>Edit Profile</h2>
    <form @submit.prevent="updateProfile">
      <label for="password">New Password:</label>
      <input type="password" v-model="newPassword" required /><br />
      <button type="submit">Update Profile</button>
    </form>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPassword: '',
      message: ''
    };
  },
  methods: {
    async updateProfile() {
      try {
        const { data } = await this.$axios.post('/updateProfile', {
          username: this.$store.state.user.username,
          newPassword: this.newPassword
        });
        this.message = data.message;
        if (data.message === 'Profile updated successfully!') {
          this.$router.push('/');
        }
      } catch (error) {
        this.message = error.response.data.message;
      }
    }
  }
};
</script>
