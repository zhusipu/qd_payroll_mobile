import fetch from 'assets/js/util/fetch'

export function getList (limit) {
  return fetch({
    url: '/payroll/getList',
    method: 'get',
    params: {limit}
  })
}

export function setPassword (cardNo, password) {
  return fetch({
    url: '/payroll/setPassword',
    method: 'post',
    params: { cardNo, password }
  })
}
export function getInfo (id) {
  return fetch({
    url: '/payroll/getInfo',
    method: 'get',
    params: {id}
  })
}
