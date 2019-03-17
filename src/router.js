import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },{
      path: '/home',
      name: '首页',
      component: () => import('@/views/home/index.vue')
    },{
      path: '/myAccount',
      name: '我的账户',
      component: () => import('@/views/myAccount/index.vue')
    },{
      path: '/notice',
      name: '平台公告',
      component: () => import('@/views/notice/index.vue')
    }, {
      path: '/share',
      name: '分享有礼',
      component: () => import('@/views/share/index.vue')
    }, {
      path: '/weChatTest',
      name: '微信号测试',
      component: () => import('@/views/weChatTest/index.vue')
    }
  ]
})
