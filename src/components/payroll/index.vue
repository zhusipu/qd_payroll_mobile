<template>
  <div class="content">
    <template v-if="twotoken">
      <p>最近三个月的薪资列表</p>
      <mu-table  :showCheckbox="false" tooltipPosition="center" ref="table">
        <mu-thead>
          <mu-tr tooltipPosition="center">
            <mu-th>ID</mu-th>
            <mu-th>时间</mu-th>
            <mu-th>操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="item in payrollList" :key="item.id" >
            <mu-td>{{item.id}}</mu-td>
            <mu-td>{{item.date}}</mu-td>
            <mu-td ><span @click="showDetail(item.id)">详情</span></mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
    </template>
    <template v-else-if="!twotoken && !issetpassword">
      <div class="setpassword">
        <p>您是初次访问该系统，请设置一个新密码。</p>
        <mu-text-field label="身份证号" :autofocus="true" hintText="请输入您的身份证号" name="cardNo" v-model="form.cardNo" :errorText="form.errorText.cardNo" labelFloat/>
        <mu-text-field label="新密码" hintText="请输入一个新的密码" v-model="form.password" type="password" :errorText="form.errorText.password"  labelFloat/>
        <mu-text-field label="确认密码" hintText="请再次输入新密码" v-model="form.password2" type="password" :errorText="form.errorText.password2" labelFloat/>
        <mu-raised-button label="确认" class="demo-raised-button" @click="_setPassword" primary/>
      </div>
    </template>
    <template v-else>
      <div class="setpassword">
        <p>验证</p>
        <mu-text-field label="密码" hintText="请输入的密码" v-model="twoPassword" type="password" :errorText="twoPasswordErrorText"  labelFloat/>
        <mu-raised-button label="确认" class="demo-raised-button" @click="_twoSignin" primary/>
      </div>
    </template>
  </div>
</template>
<script>
import {getList, setPassword} from 'api/payroll'
import {twoSignin} from 'api/user'
import {ERR_OK} from 'api/config'
import {Toast} from 'mint-ui'
export default {
  created () {
    console.log(this.$store.getters.twotoken)
    this.issetpassword = this.$store.getters.issetpassword
    this.twotoken = this.$store.getters.twotoken
  },
  data () {
    return {
      twotoken: false,
      loading: true,
      issetpassword: null,
      payrollList: [],
      form: {
        cardNo: '',
        password: '',
        password2: '',
        errorText: {
          cardNo: '',
          password: '',
          password2: ''
        }
      },
      twoPassword: '',
      twoPasswordErrorText: ''
    }
  },
  mounted () {
    if (this.issetpassword === 1) {
      this._getList()
    }
  },
  methods: {
    _getList () {
      getList(3).then((res) => {
        if (res.data.code === ERR_OK) {
          this.payrollList = res.data.data.list
        }
      })
    },
    _setPassword () {
      var isCardNoResult = this.isCardNo(this.form.cardNo)
      if (isCardNoResult !== true) {
        this.form.errorText.cardNo = isCardNoResult
        return false
      } else {
        this.form.errorText.cardNo = ''
      }

      if (this.form.password.length < 6 || this.form.password.length > 32) {
        this.form.errorText.password = '密码允许长度为6到32位'
        return false
      } else {
        this.form.errorText.password = ''
      }

      if (this.form.password !== this.form.password2) {
        this.form.errorText.password2 = '两次密码不一致'
        return false
      } else {
        this.form.errorText.password2 = ''
      }

      setPassword(this.form.cardNo, this.form.password).then((res) => {
        if (res.data.code === ERR_OK) {
          Toast({
            message: res.data.msg,
            position: 'top',
            duration: 3000
          })
          this.$store.dispatch('GetUserInfo').then(res => {
            this.issetpassword = this.$store.getters.issetpassword
            this._getList()
          })
        } else {
          Toast({
            message: res.data.msg,
            position: 'top',
            duration: 3000
          })
        }
      })
    },
    isCardNo (sId) {
      if (!/^\d{17}(\d|x)$/i.test(sId)) return '你输入的身份证长度或格式错误'
      return true
    },
    showDetail (id) {
      this.$router.push({
        path: `/payroll/detail/${id}`
      })
    },
    _twoSignin () {
      if (this.twoPassword.length < 6 || this.twoPassword.length > 32) {
        this.twoPasswordErrorText = '密码允许长度为6到32位'
        return false
      } else {
        this.twoPasswordErrorText = ''
      }
      twoSignin(this.twoPassword).then((res) => {
        if (res.data.code === ERR_OK) {
          this.$store.dispatch('GetTwoTokenInfo').then((res) => {
            this.twotoken = this.$store.getters.twotoken
            this._getList()
          })
        } else {
          Toast({
            message: res.data.msg,
            position: 'top',
            duration: 3000
          })
        }
      })
    }
  },
  watch: {
    issetpassword (newval) {
      switch (newval) {
        case 0:
          document.title = '首次登陆验证'
          break
        case 1:
          document.title = '薪资列表'
      }
    }
  }
}
</script>
<style scoped>
.setpassword{
  padding: 20px;
}
.content {
  padding: 10px;
}
</style>

