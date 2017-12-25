<template>
  <div>
    拉取用户信息中...
  </div>
</template>
<script>
import {getUserId} from 'api/user'
export default {
  created () {
    this._getUserId()
  },
  methods: {
    _getUserId () {
      getUserId().then((res) => {
        console.log(process.env)
      })
    }
  }
}
</script>
<style scoped>
</style>

