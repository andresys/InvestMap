export default {
    state: {
      auth: false,
      banner: true,
    },
    mutations: {
      HIDE_BANNER(state, payload) {
        state.banner = payload
      }
    },
    actions: {
      HIDE_BANNER({commit}, payload) {
        commit('HIDE_BANNER')
      }
    },
    getters: {
      getBanner: (state) => state.banner,
    }
  }