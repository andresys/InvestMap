import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/Login.vue'
import Registration from './views/Registration.vue'
import LostPassword from './views/LostPassword.vue'
import News from './views/News.vue'
import About from './views/About.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/registration', name: 'Registration', component: Registration },
  { path: '/lostpassword', name: 'LostPassword', component: LostPassword },
  { path: '/news', name: 'News', component: News },
  { path: '/about', name: 'About', component: About },
  { path: '*', redirect: '/' },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.name == 'Home')
//     next({ name: 'IVRMenu' })
//   else
//     next()
// })

export default router
