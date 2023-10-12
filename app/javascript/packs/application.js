// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

// import Rails from "@rails/ujs"

// Rails.start()
import Vue from 'vue'
import vuetify from '../plugins/vuetify'
import geolocation from '../plugins/geolocation'
import store from '../store'
import router from '../router'
import App from '../app.vue'

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
  }).$mount()
  document.body.appendChild(app.$el)

  //console.log(app)
})
