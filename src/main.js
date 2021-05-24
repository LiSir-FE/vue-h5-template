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
import { $cdn } from '@/config'
import answerList from '@/utils/json'
import vueWechatTitle from 'vue-wechat-title'
import { GetParam } from './utils/getParam.js'
Vue.prototype.$cdn = $cdn
Vue.prototype.answerList = answerList
Vue.use(vueWechatTitle)
// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'

// filters
import './filters'
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.path === '/error') {
    next()
    return
  }
  const token = store.getters.getToken
  const appid = 'wx1fb04de739afd114' // wx1fb04de739afd114实际公众号appid，这里的appid对应的微信应用一定是绑定当前h5项目所在线上域名，也就是需要在微信开放平台绑定js安全域名
  const redirect_uri = encodeURIComponent(
    $cdn + to.fullPath
  )
  if (!token) {
    const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
    // 以snsapi_base为scope发起的网页授权，是用来获取进入页面的用户的openid的，并且是静默授权并自动跳转到回调页的.（静默的另一种：对于已关注公众号的用户，如果用户从公众号的会话或者自定义菜单进入本公众号的网页授权页，即使是scope为snsapi_userinfo，也是静默授权，用户无感知。）以snsapi_userinfo为scope发起的网页授权，是用来获取用户的基本信息的。但这种授权需要用户手动同意，并且由于用户同意过，所以无须关注，就可在授权后获取该用户的基本信息。
    let code = GetParam(window.location.href.split('#')[0], 'code')
    if (!code) {
      window.location.href = url
    } else {
      code = GetParam(window.location.href, 'code')
      // 这里则是根据授权登录后回调到当前h5地址，从当前地址导航栏拿取code,根据实际开发的应用场景，比如向我们项目则是调用一个有后台提供的获取微信个人信息的接口，这个接口是后台根据拿取到的code去请求微信官方文档获取个人信息的接口，下面是我根据我实际业务场景编写的，主要是根据code获取个人信息保存。授权登录走到这一步基本就做完了
      loginService.getWXByCode({ code: code }).then(res => {
        if (res.data.success) {
          store.commit('setToken', res.data.datas.unionid ? res.data.datas.unionid : '');
          store.commit('setInfo', JSON.stringify(res.data.datas))
          if(to.query.code){ // 带code的页面一定是home/index,所以这里只考虑path 和query, params不考虑,后期如果修改了rediruct_uri,需要注意
            let query = to.query;
            delete query.code;
            delete query.state;
            next({
              path: '/home',
              // path: to.path,
              query
            });
          }else{
            next({path: '/home'});
          }
        } else {
          window.location.href = url // 如果请求失败继续走重定 向去获取code这一步
        }
      }).catch(err => {
        console.log('eeeeeeeeeeeeeeeeeeeeee================ ', err)
      })
      // next();
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
