<template>
  <div>
    <div>
      <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" style="font-size: 16px !important;border: 0;margin-top: 25px; " v-model="loginUser" size="small">
      </el-input>
    </div>
    <div>
      <el-input prefix-icon="el-icon-lock" style="font-size: 16px !important;border: 0;margin-top: 25px;  " placeholder="请输入登录密码" v-model="loginPassword" size="small">
      </el-input>
    </div>
    <el-button style="width: 100%; margin-top: 30px;" size="small" type="primary" @click="loginHandle">立即登录</el-button>
    <label style="color:#606266;font-size: 14px;display: block;width: 100%; margin-top: 20px; text-align: center;">
      还没有账户<el-link style="margin-top: -3px; margin-left: 3px;" type="primary" @click="changeTab()">立即注册</el-link>
    </label>
  </div>
</template>

<script>
export default {
  name: 'passwordLogin',
  components: {},
  data() {
    return {
      loginUser: '',
      loginPassword: '',
    }
  },
  props: {

  },
  beforeMount() {
    this.loginUser = ''
    this.loginPassword = ''
  },
  methods: {
    handleClick() {},
    changeTab(name) {
      this.$emit('changeTab')
    },
    //登录
    loginHandle() {
      let obj = {
        phone: this.loginUser,
        code: this.loginPassword,
      }
      this.$store.dispatch('user/Login', obj).then((res) => {
        this.registerDialog = false
        this.alert_util(this, '登录成功！', 'success')
        this.$router.push({
          name: 'Home',
        })
      })
    },
  },

}
</script>

<style scope>
.outBox {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 26px 0 rgba(65, 141, 247, 0.31);
}
.outBox .el-tabs__header {
  padding: 0;
  position: relative;
  width: 160px;
  margin: 0 auto;
  margin-top: 50px;
}
.outBox .el-tabs__nav-wrap::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
  background-color: #e4e7ed;
  z-index: 1;
}
.outBox input.el-input__inner {
  border-left: 0px;
  border-top: 0px;
  border-right: 0px;
  border-radius: 0;
  font-size: 16px !important;
}
.outBox input.el-input__inner:focus {
  border-color: #293b8e;
}
.outBox .el-select .el-input.is-focus .el-input__inner {
  border-color: #293b8e !important;
}
.outBox .el-button:active {
  border-color: #293b8e !important;
}
.outBox .el-input--suffix .el-input__inner {
  font-size: 14px !important;
}
.outBox .el-button--primary {
  color: #fff;
  font-size: 18px;
  line-height: 24px;
  background-color: #293b8e;
  border-color: #293b8e;
}
.outBox .el-button--primary:hover {
  background-color: #2f44a4;
  border-color: #2f44a4;
}
.outBox .el-button--primary:focus {
  background-color: #2f44a4;
  border-color: #2f44a4;
}
.outBox .el-tabs__item {
  color: #999999;
  font-size: 18px;
}
.outBox .el-tabs__item:hover {
  color: #333333;
  cursor: pointer;
}
.outBox .el-tabs__item.is-active {
  color: #333333;
}
.outBox .el-tabs__active-bar {
  background-color: #293b8e;
}
.outBox .el-link.el-link--primary {
  color: #353535;
}
.outBox .el-link.el-link--primary:hover {
  color: #293b8e;
}
.outBox .el-link.el-link--default:after,
.el-link.el-link--primary.is-underline:hover:after,
.el-link.el-link--primary:after {
  border-color: #293b8e;
}
.outBox .el-checkbox__input.is-checked .el-checkbox__label {
  color: #293b8e;
}
.outBox .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #293b8e;
  border-color: #293b8e;
}
</style>

