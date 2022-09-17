export const state = () => ({
  user: null,
  users: [],
});

export const mutations = {
  UPDATE_USER(state, name) {
    if (name) {
      const payload = {
        id: Math.floor(Math.random() * 1000),
        name: name,
      }
      if (state.users.length) {
        const isExist = state.users.find((user) => user.name === name);
        if (isExist) {
          state.user = isExist;
          this.$router.push('/stock-prices');
        } else {
          state.users.push(payload)
          state.user = payload;
          this.$router.push('/stock-prices');
        }
      } else {
        state.users.push(payload)
        state.user = payload;
        this.$router.push('/stock-prices');
      }
    } else {
      state.user = null;
      this.$router.push('/');
    }
  }
};

export const actions = {
  checkIfUserExist({ commit }, name) {
    commit("UPDATE_USER", name);
  },
  logout({ commit }) {
    commit("UPDATE_USER", null);
  }
};
