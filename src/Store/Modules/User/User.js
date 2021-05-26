import Vue from 'vue'
import { router } from '../../../main.js'

const { errorHandler } = require('../../Utils/ErrorHandler')

const state = {
  profile: {},
  isAuth: false,
  users: [],
  customers: []
}
const getters = {
  getUsersList (state) {
    return state.users
  },
  getCustomerList (state) {
    return state.customers
  },
  getProfile (state) {
    return state.profile
  },
  getIsAuth (state) {
    return state.isAuth
  }
}
const mutations = {
  pushUser (state, user) {
    state.users.push(user)
  },
  editProfile (state, profile) {
    state.profile = profile
  },
  setUsersList (state, list) {
    state.users = list
  },
  setAuth (state, bool) {
    state.isAuth = bool
  },
  setProfile (state, profile) {
    state.profile = profile
  },
  setCustomerList (state, list) {
    state.customers = list
  },
  pushCustomer (state, customer) {
    state.customers.push(customer)
  },
  pullCustomer (state, c_id) {
    for (var i = 0; i < state.customers.length; i++) {
      if (state.customers[i]._id === c_id) {
        state.customers.splice(i, 1)
      }
    }
  },
  SetAuthCookie (state, loginResult) {
    Vue.cookie.set('Etta_Power_Token', loginResult, { expires: '1Y' })
  }
}
const actions = {
  signin ({ commit, getters }, info) {
    commit('setLoading', true)
    return new Promise((resolve, reject) => {
      Vue.http.post('users/login', info).then(
        res => {
          commit('setLoading', false)
          if (res.status === 200) {
            commit('setAuth', true)
            commit('SetAuthCookie', res.body.x_auth)
            resolve(getters.getIsAuth)
          }
        },
        e => {
          commit('setAuth', false)
          commit('setLoading', false)
          resolve(getters.getIsAuth)
        }
      )
    })
  },
  signout (context) {
    context.commit('setLoading', true)
    Vue.http
      .delete('users/logout', {
        headers: { x_auth: Vue.cookie.get('Etta_Power_Token') }
      })
      .then(
        res => {
          context.commit('setLoading', false)
          Vue.cookie.delete('Etta_Power_Token')
          router.push({ name: 'login' })
        },
        err => {
          context.commit('setLoading', false)
          errorHandler(err)
        }
      )
  },
  addUser (context, obj) {
    context.commit('setLoading', true)
    Vue.http
      .post(
        'users/',
        {
          userName: obj.userName,
          fullname: obj.fullname,
          email: obj.email,
          password: obj.password,
          status: 1
        },
        { headers: { x_auth: Vue.cookie.get('Etta_Power_Token') } }
      )
      .then(
        res => {
          context.commit('setLoading', false)
          context.commit('pushUser', {
            userName: res.body.userName,
            fullname: res.body.fullname,
            email: res.body.email,
            existDate: res.body.existDate
          })
        },
        err => {
          context.commit('setLoading', false)
          if (err.status == 401) {
            router.push({ name: 'err401' })
          } else {
            errorHandler(err)
          }
        }
      )
  },
  getUserList (context) {
    context.commit('setLoading', true)
    Vue.http
      .get('users/', {
        headers: { x_auth: Vue.cookie.get('Etta_Power_Token') }
      })
      .then(
        res => {
          context.commit('setLoading', false)
          context.commit('setUsersList', res.body)
        },
        err => {
          context.commit('setLoading', false)
          errorHandler(err)
        }
      )
  },
  editProfile (context, obj) {
    context.commit('setLoading', true)
    return new Promise((resolve, reject) => {
      Vue.http
        .put(
          'users/profile',
          {
            userName: obj.userName,
            fullname: obj.fullname,
            email: obj.email
          },
          { headers: { x_auth: Vue.cookie.get('Etta_Power_Token') } }
        )
        .then(
          res => {
            context.commit('setLoading', false)
            context.commit('setProfile', res.body)
            resolve(getters.getProfile)
          },
          err => {
            context.commit('setLoading', false)
            errorHandler(err)
          }
        )
    })
  },
  getProfile ({ commit, getters }) {
    commit('setLoading', true)
    return new Promise((resolve, reject) => {
      Vue.http
        .get('users/profile', {
          headers: { x_auth: Vue.cookie.get('Etta_Power_Token') }
        })
        .then(
          res => {
            commit('setLoading', false)
            commit('setProfile', res.body)
            resolve(getters.getProfile)
          },
          err => {
            commit('setLoading', false)
            errorHandler(err)
          }
        )
    })
  },
  changePassword (context, password) {
    context.commit('setLoading', true)
    Vue.http
      .put(
        'users/password',
        {
          password: password
        },
        { headers: { x_auth: Vue.cookie.get('Etta_Power_Token') } }
      )
      .then(
        res => {
          context.commit('setLoading', false)
          router.push({ name: 'login' })
        },
        err => {
          context.commit('setLoading', false)
          errorHandler(err)
        }
      )
  },
  getCustomerList (context) {
    context.commit('setLoading', true)
    Vue.http
      .get('users/customers', {
        headers: { x_auth: Vue.cookie.get('Etta_Power_Token') }
      })
      .then(
        res => {
          context.commit('setLoading', false)
          context.commit('setCustomerList', res.body)
        },
        err => {
          context.commit('setLoading', false)
          errorHandler(err)
        }
      )
  },
  addCustomer (context, customer) {
    context.commit('setLoading', true)
    Vue.http
      .post('users/customers', customer, {
        headers: { x_auth: Vue.cookie.get('Etta_Power_Token') }
      })
      .then(
        res => {
          context.commit('setLoading', false)
          context.commit('pushCustomer', res.body)
        },
        err => {
          context.commit('setLoading', false)
          errorHandler(err)
        }
      )
  },
  rmvCustomer (context, array) {
    context.commit('setLoading', true)
    array.forEach(element => {
      Vue.http
        .put(
          'users/customers',
          { _id: element._id },
          { headers: { x_auth: Vue.cookie.get('Etta_Power_Token') } }
        )
        .then(
          res => {
            context.commit('setLoading', false)
            context.commit('pullCustomer', element._id)
          },
          err => {
            context.commit('setLoading', false)
            errorHandler(err)
          }
        )
    })
  },
  deActive ({ dispatch, commit }, a) {
    commit('setLoading', true)
    Vue.http
      .put('users', a, {
        headers: { x_auth: Vue.cookie.get('Etta_Power_Token') }
      })
      .then(
        res => {
          commit('setLoading', false)
          dispatch('getUserList')
        },
        err => {
          commit('setLoading', false)
          if (err.status == 401) {
            router.push({ name: 'err401' })
          } else {
            errorHandler(err)
          }
        }
      )
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
