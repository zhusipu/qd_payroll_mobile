import { loginByUsername, logout, getUserInfo, GetTwoTokenInfo } from 'api/user'
import { getToken, setToken, removeToken, getTwoToken, setTwoToken } from 'assets/js/util/auth'

import {ERR_OK} from 'api/config.js'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    twotoken: getTwoToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    issetpassword: 0
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_TWOTOKEN: (state, token) => {
      state.twotoken = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ISSETPASSWORD: (state, roles) => {
      state.issetpassword = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password, userInfo.remember).then(response => {
          const data = response.data
          if (data.code === ERR_OK) {
            commit('SET_TOKEN', data.data)
            setToken(response.data.data)
            resolve(response)
          } else {
            reject(new Error(data.msg))
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          const data = response.data
          commit('SET_NAME', data.data.EMP_NAME)
          commit('SET_ISSETPASSWORD', data.data.extra.isSetPassword)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetTwoTokenInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        GetTwoTokenInfo().then(response => {
          const data = response.data
          commit('SET_TWOTOKEN', data.data)
          setTwoToken(response.data.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRole ({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
