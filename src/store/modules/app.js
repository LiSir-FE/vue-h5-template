const state = {
  userName: '',
  userInfo: {}
}
const mutations = {
  SET_USER_NAME(state, name, userInfo) {
    state.userName = name
    state.userInfo = userInfo
  }
}
const actions = {
  // 设置name
  setUserName({ commit }, name, userInfo) {
    commit('SET_USER_NAME', name)
    commit('SET_USER_INFO', userInfo)
  }
}
export default {
  state,
  mutations,
  actions
}
