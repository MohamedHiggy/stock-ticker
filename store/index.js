export const state = () => ({
  user: null,
});

export const mutations = {
  UPDATE_USER(state, name) {
    if (name) {
      const payload = {
        id: Math.floor(Math.random() * 1000),
        name: name,
      }
      state.user = payload;
      localStorage.setItem('user', JSON.stringify(payload));
      this.$router.push('/stock-prices');
    } else {
      state.user = null;
      localStorage.removeItem('user');
      this.$router.push('/');
    }
  },
  SET_USER(state, user) {
    state.user = user;
  }
};

export const actions = {
  checkIfUserExist({ commit }, name) {
    commit("UPDATE_USER", name);
  },
  setUser({ commit }, user) {
    commit("SET_USER", user);
  },
  logout({ commit }) {
    commit("UPDATE_USER", null);
  }
};
