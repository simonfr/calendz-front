import Vue from 'vue'
import Vuex from 'vuex'
import swal from 'sweetalert2'
import router from '../routes/router'
import UserService from '../services/user.service'

Vue.use(Vuex)

export default new Vuex.Store({
  // ==================================
  // == State
  // ==================================
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    status: {}
  },

  // ==================================
  // == Mutations
  // ==================================
  mutations: {
    LOGIN_REQUEST: (state) => {
      state.user = null
      state.status = { isLoggingIn: true }
    },

    LOGIN_SUCCESS: (state, user) => {
      state.user = user
      state.status = {}
    },

    LOGIN_FAILURE: (state, reason) => {
      state.user = null
      state.status = { reason }
    },

    LOGOUT: (state) => {
      state.user = null
      state.status = {}
    },

    VERIFY_REQUEST: (state) => {
      state.status = { isVerifying: true }
    },

    VERIFY_SUCCESS: (state) => {
      state.status = {}
    },

    VERIFY_FAILURE: (state, reason) => {
      state.status = { reason }
    },

    REFRESH_REQUEST: (state) => {
      state.status = { isRefreshing: true }
    },

    REFRESH_SUCCESS: (state) => {
      state.status = {}
    },

    REFRESH_FAILURE: (state, reason) => {
      state.user = null
      state.status = { reason }
    }
  },

  // ==================================
  // == Actions
  // ==================================
  actions: {
    login: ({ commit }, { email, password, rememberMe }) => {
      commit('LOGIN_REQUEST')
      UserService.login(email, password, rememberMe)
        .then(
          res => {
            localStorage.setItem('user', JSON.stringify(res.user))
            commit('LOGIN_SUCCESS', res.user)
            Vue.prototype.$notify({ type: 'success', message: 'Vous êtes désormais connecté.' })
            router.push('/dashboard')
          },
          err => {
            commit('LOGIN_FAILURE', err.data.message)
            swal.fire({
              type: 'question',
              title: `Mot de passe oublié ?`,
              text: `Pas de panique, indiquez votre adresse mail et nous vous enverrons un lien afin de réinitialiser votre mot de passe.`,
              buttonsStyling: false,
              focusConfirm: true,
              confirmButtonText: 'Réinitialiser',
              confirmButtonClass: 'btn btn-success btn-fill',
              showCancelButton: true,
              cancelButtonText: 'Annuler',
              cancelButtonClass: 'btn btn-secondary btn-fill'
            }).then((result) => {
              if (result.value) this.$router.push('/password-reset')
            })
          })
    },

    // logs the user out
    logout: ({ commit }) => {
      localStorage.removeItem('user')
      commit('LOGOUT')
    },

    // checks if user's accessToken is still valid
    verify: ({ dispatch, commit }) => {
      commit('VERIFY_REQUEST')
      UserService.verify()
        .then(
          res => commit('VERIFY_SUCCESS'),
          err => {
            commit('VERIFY_FAILURE')
            if (err.status === 401) dispatch('refresh')
          })
    },

    // tries to refresh user accessToken
    refresh: ({ dispatch, commit }) => {
      commit('REFRESH_REQUEST')
      UserService.refresh()
        .then(
          res => commit('REFRESH_SUCCESS'),
          err => {
            commit('REFRESH_FAILURE', err.data.message)
            dispatch('logout')
            Vue.prototype.$notify({ type: 'danger', message: `${err.data.message}.` })
            router.push('/login')
          })
    }
  },

  // ==================================
  // == Getters
  // ==================================
  getters: {
    isLoggedIn: state => {
      return !!state.user
    }
  },

  // TODO: _must_ be false in production
  strict: true
})
