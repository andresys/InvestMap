import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import Login from './views/Login.vue'
import Registration from './views/Registration.vue'
import LostPassword from './views/LostPassword.vue'
import Profile from './views/Profile.vue'
import News from './views/News.vue'
import About from './views/About.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/registration', name: 'Registration', component: Registration },
  { path: '/lostpassword', name: 'LostPassword', component: LostPassword },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/news', name: 'News', component: News },
  { path: '/about', name: 'About', component: About },
  { path: '*', redirect: '/' },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // if(['Profile'].include(to.name)) {
  //   store.dispatch('accountModule/LOGIN')
  //     .finally(response => {
  //       let currentUser = store.getters['accountModule/ACCOUNT']
  //       let profile = currentUser && !!profile

  //       if(!!currentUser) {
  //         if(['Login', 'Registration', 'LostPassword'].include(to.name))
  //           next({ name: 'Home', hash: to.hash })
  //         else
  //           next()
  //       }
  //     })
  // } else if()
  // store.dispatch('accountModule/LOGIN')
  //   .finally(response => {
  //     let currentUser = store.getters['accountModule/ACCOUNT']
  //     let profile = currentUser && !!profile

  //     if(!!currentUser) {
  //       if(['Login', 'Registration', 'LostPassword'].include(to.name))
  //         next({ name: 'Home', hash: to.hash })
  //       else
  //         next()
  //     } else {
  //       if(['Profile'].includes(to.name))
  //         next({ name: 'Login', hash: to.hash })
  //       else
  //         next()
  //     }
  //   })
  // .catch(error => {
    // if (!error.message.includes('Could not find stored JWT')) {
    //   console.log('Authentication error', error)
    // }
    // (to.meta.requiresAuth) ? next('/inicio-sesion') : next()
  // })
  next()
})

export default router
