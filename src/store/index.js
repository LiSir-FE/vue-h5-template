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
    answerNums: '',
    token: '',
    shareNum: '',
    userInfo: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.token = token
    },
    setInfo(state, userInfo) {
      state.userInfo = userInfo
      localStorage.userInfo = userInfo
    },
    setShareNum(state, shareNum) {
      state.shareNum = shareNum
      localStorage.shareNum = shareNum
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
    },
    getShareNum(state) {
      if (!state.shareNum) {
        state.shareNum = localStorage.getItem('shareNum')
      }
      return state.shareNum
    }
  }
})

export default store
