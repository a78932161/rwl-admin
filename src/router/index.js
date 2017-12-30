import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/Login'
import home from '@/views/nav/Home'
import statistics from '@/views/nav/Rwl-Statistics'
import data from '@/views/nav/Rwl-Data'
import manage from '@/views/nav/Rwl-Manage'
import order from '@/views/nav/Rwl-Order'
import Oservice from '@/views/order/Order-Service'
import Oobject from '@/views/order/Order-Object'
import Gobject from '@/views/goods/Goods-Object'
import Gservice from '@/views/goods/Goods-Service'
import gsadd from '@/views/goods/Goods-Service-add'
import gsupdata from '@/views/goods/Goods-Service-update'
import goadd from '@/views/goods/Goods-Object-add'
import goupdata from '@/views/goods/Goods-Object-update'
import a404  from '@/views/404'


Vue.use(Router)




export default new Router({
  mode: 'history',
  routes: [

    {
      path:'/',
      name:'',
      redirect:'login'

    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/Login.vue'], resolve),
      meta: { noCheckSession: true }
    },

    {
      path: '/404',
      name: '404',
      component: a404,
    },
    { path: '*', component: a404 },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      children:[
        {
          path: '/statistics',
          name: 'statistics',
          component: statistics
        },
        {
          path: '/data',
          name: 'data',
          component: data
        },
        {
          path: '/manage',
          name: 'manage',
          component: manage
        },
        {
          path: '/order',
          name: 'order',
          component: order

        },
        {
          path: '/oservice',
          name: 'oservice',
          component: Oservice
        },
        {
          path: '/oobject',
          name: 'oobject',
          component: Oobject
        },
        {
          path: '/gservice',
          name: 'gservice',
          component: Gservice
        },
        {
          path: '/gobject',
          name: 'gobject',
          component: Gobject
        },
        {
          path: '/goupdata',
          name: 'goupdata',
          component: goupdata
        },
        {
          path: '/goadd',
          name: 'goadd',
          component: goadd
        },
        {
          path: '/gsupdata',
          name: 'gsupdata',
          component: gsupdata
        },
        {
          path: '/gsadd',
          name: 'gsadd',
          component: gsadd
        },

      ]
    },
  ]
})
