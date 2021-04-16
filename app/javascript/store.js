import Vue from 'vue'
import Vuex from 'vuex'
import VuexRailsPlugin from 'vuex-rails-plugin/src/VuexRailsPlugin'

// import generalModule from './store/general'
// import ivrListModule from './store/ivr_list'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    VuexRailsPlugin('api/account'),
  ],
  modules: {
    // generalModule,
    // ivrListModule,
  }
})
