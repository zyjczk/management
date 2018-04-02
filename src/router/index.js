import Vue from 'vue'
import Router from 'vue-router'
import Index from '@page/index'
import Login from '@page/login/login.vue'
import AcctivityList from '@page/acctivityList/acctivityList.vue'
import Mananger from '@page/mananger/mananger.vue'
import Role from '@page/role/role.vue'
import UserList from '@page/userList/userList.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      meta: {
        requireAuth: false
      },
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      meta: {
        requireAuth: true,
        breadName: ''
      },
      component: Index
    },
    {
      path: '/userList',
      name: 'userList',
      meta: {
        requireAuth: true,
        breadName: '用户列表'
      },
      component: UserList
    },
    {
      path: '/acctivityList',
      name: 'acctivityList',
      meta: {
        requireAuth: true,
        breadName: '活动列表'
      },
      component: AcctivityList
    },
    {
      path: '/acctivityDetail/:id',
      name: 'acctivityDetail',
      meta: {
        requireAuth: true,
        breadName: '活动详情'
      },
      component: AcctivityList
    },
    {
      path: '/mananger',
      name: 'mananger',
      meta: {
        requireAuth: true,
        breadName: '管理员管理'
      },
      component: Mananger
    },
    {
      path: '/role',
      name: 'role',
      meta: {
        requireAuth: true,
        breadName: '角色管理'
      },
      component: Role
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    const userRole = JSON.parse(sessionStorage.getItem('role'))
    if (!userRole) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router
