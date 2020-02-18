import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mods',
    name: 'Mods',
    component: () => import(/* webpackChunkName: "mods" */ '../views/Mods.vue')
  },
  {
    path: '/change-password',
    name: 'changePassword',
    component: () => import(/* webpackChunkName: "changePassword" */ '../views/ChangePassword.vue')
  },
  {
    path: '/leaderboards',
    name: 'Leaderboards',
    component: () => import(/* webpackChunkName: "leaderboards" */ '../views/Leaderboards.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
