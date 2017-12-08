import Cookies from 'js-cookie'
import store from '@/store'
const TokenKey = 'mobile-token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function checkResponse (res) {
  if (res.code === 403) {
    store.dispatch('FedLogOut').then(() => {
      location.href = res.data
      // location.reload()// 为了重新实例化vue-router对象 避免bug
    })
  }
}
