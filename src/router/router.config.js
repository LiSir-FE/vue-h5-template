/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/codeHome',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/codeHome',
        name: 'Codehome',
        component: () => import('@/views/codeHome/index'),
        meta: { title: 'code', keepAlive: false }
      },
      {
        path: '/layouts',
        name: 'Layouts',
        component: () => import('@/views/layouts/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/rankingList',
        name: 'RankingList',
        component: () => import('@/views/rankingList/index'),
        meta: { title: '排行榜', keepAlive: false }
      },
      {
        path: '/answer',
        name: 'Answer',
        component: () => import('@/views/answer/index'),
        meta: { title: '答题', keepAlive: false }
      },
      {
        path: '/wxLogin',
        name: 'WxLogin',
        component: () => import('@/views/wxlogin/index'),
        meta: { title: '微信登录', keepAlive: false }
      }
    ]
  }
]
