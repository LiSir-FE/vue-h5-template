import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app
  },
  state: {
    isShow: false,
    answerNums: '11111'
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.token = token
    }
  },
  getters: {
    getToken(state) {
      if (!state.token) {
        state.token = localStorage.getItem('token')
      }
      return state.token
    }
  }
})

export default store
