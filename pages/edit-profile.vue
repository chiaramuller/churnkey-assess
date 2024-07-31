<template>
    <div>
      <h2>Edit Profile</h2>
      <form @submit.prevent="updateProfile">
        <label for="password">New Password:</label>
        <input type="password" v-model="newPassword" required /><br />
        <button type="submit">Update Profile</button>
      </form>

      <h2>Subscription</h2>
      <button @click="triggerCancelFlow">Cancel Subscription</button>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newPassword: '',
        message: ''
     , };
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
      },
      async triggerCancelFlow() {
      // Ensure the Churnkey script is loaded
      if (!window.churnkey) {
        const script = document.createElement('script');
        script.src = 'https://assets.churnkey.co/js/app.js?appId=test_4yhYBA2C5kTMLYLX2Hn4j64xSKIExR1k'; // Replace YOUR_APP_ID with actual app ID
        script.async = true;
        document.head.appendChild(script);

        // Wait for the script to load
        await new Promise((resolve) => script.onload = resolve);
      }

      // Generate the HMAC hash
      try {
        const response = await this.$axios.post('/api/generate-hash', {
          customerId: 'cus_QVBhnykr03RYfs'
        });
        const authHash = response.data.userHash;

        // Trigger the Churnkey cancel flow
        window.churnkey.init('show', {
          customerId: 'cus_QVBhnykr03RYfs',
          authHash: 'HMAC_HASH',
          appID: 'vupg9mh6t', 
          mode: 'test',
          provider: 'stripe',
          preview: true,
          record: false,
          report: false
        });
      } catch (error) {
        this.message = 'Error triggering the cancel flow.';
      }
    }
  }
};
  </script>
  