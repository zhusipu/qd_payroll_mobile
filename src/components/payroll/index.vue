<template>
  <div>
    <loading></loading>
  </div>
</template>
<script>
import {getList} from 'api/payroll'
import {ERR_OK} from 'api/config'
export default {
  created () {
  },
  data () {
    return {
      loading: true,
      isFirstLogin: null
    }
  },
  methods: {
    _getList () {
      getList().then((res) => {
        if (res.data.code === ERR_OK) {
          if (res.data.data.isFirstLogin === 1) {
            this.isFirstLogin = 1
            this.loading = false
          }
        }
      })
    }
  }
}
</script>
<style scoped>
</style>

