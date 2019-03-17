import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    role: null,
    user: null,
  },
  getters: {
    role: (state) => state.role,
    user: (state) => state.user,
  },
  mutations: {
    setRole: (state, role) => state.role = role,
    setUser: (state, user) => state.user = user,
  },
  actions: {
    setRole: ({ commit }, role) => commit('setRole', role),
    setUser: ({ commit }, user) => commit('setUser', user),
  },
});
