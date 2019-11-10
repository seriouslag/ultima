import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface UltimaState {
  role: string|null;
  user: any|null;
}

export default new Vuex.Store({
  state: {
    role: null,
    user: null,
  },
  getters: {
    role: (state: UltimaState) => state.role,
    user: (state: UltimaState) => state.user,
  },
  mutations: {
    setRole: (state: UltimaState, role: any|null) => state.role = role,
    setUser: (state: UltimaState, user: any|null) => state.user = user,
  },
  actions: {
    setRole: ({ commit }: any, role: string|null) => commit('setRole', role),
    setUser: ({ commit }: any, user: any|null) => commit('setUser', user),
  },
});
