import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import signup from '@/components/signup'
import login from '@/components/login'
import todo from '@/components/todo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup

    },
    {
      path: '/todo',
      name: 'todo',
      component: todo,
      props: true
    }
  ]
})
