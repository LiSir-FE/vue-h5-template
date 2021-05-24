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
    answerNums: '1',
    userInfo: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.token = token
    },
    setInfo(state, userInfo) {
      state.userInfo = userInfo
      localStorage.userInfo = userInfo
    }
  },
  getters: {
    getToken(state) {
      if (!state.token) {
        state.token = localStorage.getItem('token')
      }
      return state.token
    },
    getUserInfo(state) {
      if(!state.userInfo) {
        state.userInfo = localStorage.getItem('userInfo')
      }
      return state.userInfo
    }
  }
})

export default store
