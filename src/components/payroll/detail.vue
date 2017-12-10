<template>
  <div class="detail">
    <p>
      薪资详情
    </p>
    <mu-text-field v-for="item in data" :key="item.id" :label="item.name" v-model="item.val" disabled/><br/>
  </div>
</template>
<script>
import {getInfo} from 'api/payroll'
import {ERR_OK} from 'api/config'
export default {
  created () {
    this.id = this.$route.params.id
    this._getInfo()
  },
  data () {
    return {
      data: [],
      id: null
    }
  },
  methods: {
    _getInfo () {
      getInfo(this.id).then((res) => {
        if (res.data.code === ERR_OK) {
          this.data = res.data.data
        }
      })
    }
  }
}
</script>
<style scoped>
.detail {
  padding: 20px;
}
</style>

