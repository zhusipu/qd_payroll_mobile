<template>
  <div class="container">
    <router-view />
  </div>
</template>
<script>
import wx from 'weixin-js-sdk'
import alimask from 'alimask'
import {getWxConfig} from 'api/index'
export default {
  created () {
  },
  mounted () {
    this._initWx()
    this._initalimask()
  },
  methods: {
    _initWx () {
      getWxConfig(window.location.origin + window.location.pathname).then((res) => {
        wx.config({
          beta: true,
          debug: false,
          appId: res.data.data.appId,
          timestamp: res.data.data.timestamp,
          nonceStr: res.data.data.nonceStr + '',
          signature: res.data.data.signature,
          jsApiList: ['hideOptionMenu']
        })
        wx.error((res) => {
          console.log(res)
        })
        wx.hideOptionMenu()
      })
    },
    _initalimask () {
      var imgbase64 = alimask(this.$store.getters.name + ' ' + this.$store.getters.empno, { color: '#cccccc', width: 150, font: '12px Arial', alpha: 0.5 })
      window.document.body.background = imgbase64
    }
  }
}
</script>
<style scoped>
  .container{
    height: 100%;
  }
</style>

