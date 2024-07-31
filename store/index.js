export const state = () => ({
  loggedIn: false,
  user: null, 
  isAuthenticated: false
});

export const mutations = {
  setLoginState(state, { loggedIn, user }) {
    state.loggedIn = loggedIn;
    state.user = user;
  },
  setUser(state, user) {
    console.log('Setting user:', user);
    state.user = user;
  }, 
  authenticate(state, status) {
    state.isAuthenticated = status;
  }
};

export const actions = {
  async login({ commit }, { username, password }) {
    try {
      const response = await this.$axios.post('/login', { username, password });
      if (response.status === 200) {
        commit('setLoginState', { loggedIn: true, user: response.data.user });
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  },
  async logout({ commit }) {
    try {
      await this.$axios.post('/logout');
      commit('setLoginState', { loggedIn: false, user: null });
    } catch (error) {
      console.error('Logout failed', error);
    }
  },
  async checkAuth({ commit }) {
    try {
      const data = await this.$axios.$get('/api/check-auth'); // Adjust API endpoint as necessary
      console.log('Auth check data:', data);
      commit('setUser', data.user);
    } catch (error) {
      console.error('Authentication check failed', error);
    }
  },
  async mounted() {
    await this.$store.dispatch('checkAuth').catch((error) => {
      console.error("Error during authentication check:", error);
    });
  }
};

export const getters = {
  isLoggedIn(state) {
    return state.loggedIn;
  },
  getUser(state) {
    return state.user;
  }
};

