import fetch from 'assets/js/util/fetch'

export function getList () {
  return fetch({
    url: '/payroll/getList',
    method: 'get'
  })
}
