import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    mods: [
      'screepsmod-mongo',
      'screepsmod-auth',
      'screepsmod-admin-utils',
      'screepsmod-map-tool'
    ],
    stats: {}
  },
  mutations: {
    SET_MODS (state, mods) {
      state.mods = mods
    },
    SET_STATS (state, stats) {
      state.stats = stats
    }
  },
  actions: {
    async fetchStats ({ commit }) {
      const { data } = await axios.get('/stats')
      commit('SET_STATS', data)
    },
    async fetchMods ({ commit }) {
      const { data } = await axios.get('/api/mods')
      commit('SET_MODS', data)
    }
  },
  modules: {
  }
})

export default store

store.dispatch('fetchMods')

setInterval(() => store.dispatch('fetchStats'), 5000)
setTimeout(() => store.dispatch('fetchStats'), 100)
