import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    config: {},
    mods: [],
    stats: {}
  },
  mutations: {
    SET_CONFIG (state, config) {
      state.config = config
    },
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
    async getConfig ({ commit }) {
      const { data } = await axios.get('/api/config')
      commit('SET_CONFIG', data)
    },
    async getAvailableMods ({ commit }) {
      const { data: { objects } } = await axios.get('http://registry.npmjs.org/-/v1/search?text=screepsmod')
      commit('SET_MODS', objects.map(o => o.package))
    }
  },
  modules: {
  }
})

export default store

setInterval(() => store.dispatch('fetchStats'), 5000)
setTimeout(() => store.dispatch('fetchStats'), 100)
