<template>
  <div class="detail" ref="wrapper">
    <div class="content">
      <mu-row gutter>
        <mu-col width="100"><p>薪资详情</p></mu-col>
        <mu-col width="100">
          <template v-for="item in data">
            <p :key="item.id" class="title">{{item.name}}</p>
            <div :key="item.id" class="value">{{item.val === '' ? '空' : item.val}}</div>
          </template>
        </mu-col>
      </mu-row>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
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
      id: null,
      scroll: null
    }
  },
  mounted () {
    // this._initWrapper()
  },
  methods: {
    _getInfo () {
      getInfo(this.id).then((res) => {
        if (res.data.code === ERR_OK) {
          this.data = res.data.data
        }
      })
    },
    _initWrapper () {
      this.$refs.wrapper = new BScroll(this.$refs.wrapper, {scrollY: true, bounce: true, bounceTime: 1000})
    }
  },
  watch: {
    data (newVal) {
      // var e = this
      this.$nextTick(() => {
        // e.$refs.wrapper.refresh()
      })
    }
  }
}
</script>
<style scoped>
.detail {
  padding: 20px;
  z-index: 31;
  -webkit-overflow-scrolling: touch;
}
.content{
  padding-bottom: 20px;
}
.title{
  font-size: 16px;
  color: #676565
}
.value{
  font-size: 15px;
  padding-bottom:10px;
  border-bottom: 1px solid #ccc;
}
</style>

