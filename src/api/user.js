import fetch from 'assets/js/util/fetch'

export function getUserInfo (token) {
  return fetch({
    url: '/user/getInfo',
    method: 'get',
    params: { token }
  })
}

export function twoSignin (cardNo, password) {
  return fetch({
    url: '/user/twoSignin',
    method: 'post',
    params: { cardNo, password }
  })
}

export function GetTwoTokenInfo () {
  return fetch({
    url: '/user/GetTwoTokenInfo',
    method: 'get'
  })
}

export function getUserId () {
  return fetch({
    url: '/User/getUid',
    method: 'get'
  })
}

export function logout () {
  return fetch({
    url: '/user/logout',
    method: 'post'
  })
}

export function loginByUsername (username, password, remember) {
  const data = {
    username,
    password,
    remember
  }
  return fetch({
    url: '/signin/index',
    method: 'post',
    data
  })
}
