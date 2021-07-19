<template>
  <div class="outBox">
    <el-row style="width:100%; background: #fff; display: inline-block;">
      <el-col :style="activeName =='reg' && codeType ?'height: 500px;':'height:432px'">
        <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
          <el-tab-pane label="登录" name="login" style=" overflow: auto; padding: 0px 15px;padding-top: 30px;color: #fff;">
            <PasswordLogin @changeTab="changeTab"></PasswordLogin>
          </el-tab-pane>
          <el-tab-pane label="注册" name="reg" style=" padding: 0px 15px; overflow: auto; padding-top: 30px;color: #fff;">
            <Register :config="loginRegConfig" @codeTypeEvent="codeTypeEvent"></Register>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PasswordLogin from '../common/passwordLogin'
import Register from '../common/register'
export default {
  name: 'LoginRegister',
  components: {
    PasswordLogin,
    Register,
  },
  data() {
    return {
      loginUser: '',
      loginPassword: '',
      regChecked: true,
      activeName: 'login',
      loginRegConfig: {
        agreeName: '用户协议A',
      },
      codeType:true
    }
  },
  props: {
    config: Object,
  },
  // beforeMount() {
  //   this.loginUser = ''
  //   this.loginPassword = ''
  //   this.agreeName = this.config.agreeName || this.agreeName
  // },
  methods: {
    handleClick() {},
    changeTab(name) {
      this.activeName = name || 'reg'
    },
    codeTypeEvent(value){
      this.codeType = value
    },
    refreshImg() {
      //获取验证码图片
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

