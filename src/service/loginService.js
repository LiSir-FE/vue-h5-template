import axios from 'axios'
import { tl } from '../mixin/tool'
axios.defaults.baseURL = 'http://wj.ngrok.wjlock.cn' // https://mini.wetuc.com
export const loginService = {
  api: {},
  /* 获取wx登录*/
  getWXbaseCode: function(params) {
    return axios.get('/tokens/wxbaseinfo' + tl.getParam(params))
  },
  getWXByCode: function(params) {
    return axios.get('/tokens/wxLoginByCode' + tl.getParam(params))
  },
  /* 微信配置 */
  getConfig: function(params) {
    return axios.get('/wxconfig' + tl.getParam(params))
  }
}
