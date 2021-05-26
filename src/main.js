// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { loginService } from '@/service/loginService'
// 设置 js中可以访问 $cdn
import defaultSettings, { $cdn } from '@/config'
import answerList from '@/utils/json'
import vueWechatTitle from 'vue-wechat-title'
import { GetParam } from './utils/getParam.js'
import animate from 'animate.css'
Vue.prototype.$cdn = $cdn
Vue.prototype.answerList = answerList
Vue.use(vueWechatTitle)
Vue.use(animate)
// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'

// filters
import './filters'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
