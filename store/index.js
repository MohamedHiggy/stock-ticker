export const state = () => ({
  user: null,
});

export const mutations = {
  LOGIN(state, name) {
    const payload = {
      id: Math.floor(Math.random() * 1000),
      name: name,
    }
    state.user = payload;
    localStorage.setItem('user', JSON.stringify(payload));
    this.$router.push('/stock-prices');
  },
  LOGOUT(state){
    state.user = null;
    localStorage.removeItem('user');
    this.$router.push('/');
  },
  SET_USER(state, user) {
    state.user = user;
  }
};

export const actions = {
  login({ commit }, name) {
    commit("LOGIN", name);
  },
  updateUser({ commit }, user) {
    commit("SET_USER", user);
  },
  logout({ commit }) {
    commit("LOGOUT", null);
  }
};
