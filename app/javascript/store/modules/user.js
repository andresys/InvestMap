// Utilities
import { make } from 'vuex-pathify'

const state = {
  token: null,
  user_id: null,
}

const mutations = make.mutations(state)

const actions = {
  fetch: ({ commit }) => {
    const local = localStorage.getItem('user') || '{}'
    const user = JSON.parse(local)

    for (const key in user) {
      commit(key, Object.assign(user[key]))
    }
  },
  update: ({ state }) => {
    localStorage.setItem('user', JSON.stringify(state))
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
