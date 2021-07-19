<template>
  <div>
    <div>
      <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" style="font-size: 16px !important;border: 0;margin-top: 25px; " v-model="loginUser" size="small">
      </el-input>
    </div>
    <div>
      <el-input prefix-icon="el-icon-lock" style="font-size: 16px !important;border: 0;margin-top: 25px; " placeholder="请输入密码" v-model="loginPassword" size="small">
      </el-input>
    </div>
    <div>
      <el-input prefix-icon="el-icon-lock" style="font-size: 16px !important;border: 0;margin-top: 25px; " placeholder="请输入密码" v-model="loginPassword" size="small">
      </el-input>
    </div>
    <div v-if="codeType">
      <el-input style="font-size: 16px !important;border: 0;margin-top: 25px; float: left; width: calc( 100% - 100px );" placeholder="验证码" v-model="loginPassword" size="small">
      </el-input>
      <img style="width:100px;height:40px;margin-top:17px" src="../assets/image/loginba.png" alt="" srcset="" @click="refreshImg">
    </div>
    <div>
      <el-button style="width: 100%; margin-top: 30px; font-size: 18px;" size="small" type="primary">立即注册</el-button>
      <label style="width: 100%; margin-top: 20px; display: inline-block;">
        <el-checkbox v-model="regChecked" size="small">我已阅读并同意《{{agreeName}}》</el-checkbox>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  components: {},
  data() {
    return {
      loginUser: '',
      loginPassword: '',
      regChecked: true,
      agreeName: '投融资联盟服务协议',
      codeType: false, //验证码显示隐藏
    }
  },
  props: {
    config: Object,
  },
  beforeMount() {
    this.loginUser = ''
    this.loginPassword = ''
    this.agreeName = this.config.agreeName || this.agreeName
  },
  mounted() {
    this.$emit('codeTypeEvent', this.codeType) //往父级传codeType来判断父级height的大小
  },
  methods: {
    handleClick() {},
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
