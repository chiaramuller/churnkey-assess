export const state = () => ({
    loggedIn: false,
    user: null
  });
  
  export const mutations = {
    setLoginState(state, { loggedIn, user }) {
      state.loggedIn = loggedIn;
      state.user = user;
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
        const response = await this.$axios.get('/check-auth');
        if (response.status === 200) {
          commit('setLoginState', { loggedIn: true, user: response.data.user });
        }
      } catch (error) {
        commit('setLoginState', { loggedIn: false, user: null });
      }
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

  