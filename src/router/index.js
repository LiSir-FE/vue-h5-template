import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './router.config.js'
import store from '@/store'
import { $cdn } from '@/config'
import { GetParam } from '@/utils/getParam'
import { loginService } from '@/service/loginService'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    // base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
async function isIos(){
  const u = await navigator.userAgent;
  return u.indexOf("iPhone") > -1 || u.indexOf("Mac OS") > -1;
}
// location.reload()
router.beforeEach((to, from, next) => {
  // if (!window.initUrl) {
  //   window.initUrl = location.href.split('#')[0]
  // }
  if (to.path === '/error') {
    next()
    return
  }
  // const token = ''
  let token = store.getters.getToken
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
          // next()
          if(to.query.code){ // 带code的页面一定是home/index,所以这里只考虑path 和query, params不考虑,后期如果修改了rediruct_uri,需要注意
            let query = to.query;
            delete query.code;
            delete query.state;
            next({
              // path: '/home',
              path: to.path,
              query
            });
          }else{
            next();
          }
        } else {
          window.location.href = url // 如果请求失败继续走重定 向去获取code这一步
        }
      }).catch(err => {
        console.log('eeeeeeeeeeeeeeeeeeeeee================ ', err)
      })
    }
  } else {
    next()
  }
})
export default router
