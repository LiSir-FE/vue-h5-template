/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '物流知识登顶之战',
      keepAlive: false
    },
    children: [
      {
        path: '/layouts',
        name: 'Layouts',
        component: () => import('@/views/layouts/index'),
        meta: { title: '物流知识登顶之战', keepAlive: false }
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '物流知识登顶之战', keepAlive: false }
      },
      {
        path: '/rankingList',
        name: 'RankingList',
        component: () => import('@/views/rankingList/index'),
        meta: { title: '物流知识登顶之战', keepAlive: false }
      },
      {
        path: '/answer',
        name: 'Answer',
        component: () => import('@/views/answer/index'),
        meta: { title: '物流知识登顶之战', keepAlive: false }
      },
    ]
  }
]
