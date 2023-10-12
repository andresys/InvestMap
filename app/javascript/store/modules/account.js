import axios from 'axios'

const http = axios.create({
  headers: {
    'Content-Type': 'application/json',
  }
})

http.interceptors.request.use(function (config) {
  config.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  // config.headers['Authorization'] = localStorage.getItem('user-token') || ''
  return config
}, function (error) {
  return Promise.reject(error.response)
})

export default {
  namespaced: true,

  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
    error: null,
  },
  
  getters: {
    error: (state) => state.error,
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  },
  
  mutations: {
    SUCCESS(state, token) {
      state.error = null
      state.token = token
    },
    CLEAR(state) {
      state.error = null
      state.token = ''
    },
    ERROR(state, err) {
      state.error = err.response && err.response.data ? err.response.data : err
    },
  },
  
  actions: {
    LOGIN({ commit }, item) {
      return new Promise((resolve, reject) => {
        http.post('/api/v1/account/login.json', item)
          .then(res => {
            const token = res.headers.authorization || ''
            localStorage.setItem('user-token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('SUCCESS', token)
            resolve(res)
          })
          .catch(err => {
            commit('ERROR', err)
            localStorage.removeItem('user-token')
            delete axios.defaults.headers.common['Authorization']
            reject(err)
          })
      })
    },
  
    LOGOUT({ commit }) {
      return new Promise((resolve, reject) => {
        http.delete('/api/v1/account/logout.json')
          .then(res => {
            commit('CLEAR')
            localStorage.removeItem('user-token')
            delete axios.defaults.headers.common['Authorization']
            resolve(res)
          })
          .catch(err => {
            commit('ERROR', err)
            reject(err)
          })
      })
    },

    REGISTER({ commit }, item) {
      return new Promise((resolve, reject) => {
        http.post('/api/v1/account/registration.json', item)
          .then(res => {
            const token = res.headers.authorization || ''
            localStorage.setItem('user-token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('SUCCESS', token)
            resolve(res)
          })
          .catch(err => {
            commit('ERROR', err);
            reject(err)
          })
      })
    },
  },
}