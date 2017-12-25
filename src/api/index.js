import fetch from 'assets/js/util/fetch'

export function getWxConfig (url) {
  return fetch({
    url: '/index/getWxConfig',
    method: 'get',
    params: {url}
  })
}
