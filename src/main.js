// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.css'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'assets/css/reset.css'
import store from './store'
import './permission'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import alimask from 'alimask'
// var VConsole = require('vconsole')
// var vConsole = new VConsole()
// console.log(vConsole)
Vue.component('icon', Icon)
Vue.config.productionTip = false
Vue.use(MuseUI)
var canvas = alimask('123', { color: '#f6dcd7' })
console.log(canvas)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
