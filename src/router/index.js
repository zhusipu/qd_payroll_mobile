import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Signin from '@/components/signin/index'
import Redirect from '@/components/redirect/index'
import Layout from '@/components/layout/layout'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export const constantRouterMap = []
export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'payroll',
    hidden: true
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  },
  {
    path: '/redirect',
    name: 'redirect',
    component: Redirect
  },
  {
    path: '/payroll',
    component: Layout,
    name: 'payroll',
    redirect: 'payroll/index',
    children: [
      {
        path: 'index',
        component: _import('payroll/index'),
        name: 'payroll',
        meta: {
          title: '薪资列表',
          icon: 'credit-card-alt',
          noCache: false
        }
      },
      {
        path: 'detail/:id',
        component: _import('payroll/detail'),
        name: 'detail',
        meta: {
          title: '薪资详情',
          icon: 'credit-card-alt',
          noCache: false
        }
      }
    ]
  }
]

export default new Router({
  routes: asyncRouterMap
})

store.dispatch('GenerateRoutes').then(() => { // 生成可访问的路由表
})
