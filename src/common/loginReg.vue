<template>
  <div class="outBox">
    <el-row style="height: 432px;width:100%; background: #fff; display: inline-block;">
      <el-col style="height: 432px;">
        <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
          <el-tab-pane
            label="登录"
            name="login"
            style=" overflow: auto; padding: 0px 15px;padding-top: 30px;color: #fff;"
          >
          <div>
            <el-select v-model="checkValuelogin" placeholder="请选择" style="border: 0;margin-top: 25px;float: left; width:100px;" size="small" >
              <el-option v-for="item in projectList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input placeholder="请输入手机号" style="font-size: 16px !important;border: 0;margin-top: 25px; float: right; width: calc( 100% - 100px );" v-model="loginUser" size="small">
            </el-input>
          </div>
          <div>
            <el-input
              style="margin-top: 25px; float: left; width: calc( 100% - 100px );"
              placeholder="验证码"
              v-model="loginPassword"
              size="small"
            >
            </el-input>
            <el-button
              style="color:#293B8E;width: 100px;font-size: 14px;float: left;margin-top: 24px;border-left: 0px;border-top: 0px;border-right: 0px;border-radius: 0;"
              size="small"
            >发送验证码</el-button>
          </div>
          <el-button style="width: 100%; margin-top: 30px;" size="small" type="primary" @click="loginHandle">立即登录</el-button>
          <label style="color:#606266;font-size: 14px;display: block;width: 100%; margin-top: 20px; text-align: center;">
            还没有账户<el-link style="margin-top: -3px; margin-left: 3px;" type="primary" @click="changeTab()">立即注册</el-link>
          </label>
          </el-tab-pane>
          <el-tab-pane
            label="注册"
            name="reg"
            style=" padding: 0px 15px; overflow: auto; padding-top: 30px;color: #fff;"
          >
            <el-select  v-model="checkValuereg" placeholder="请选择" style="border: 0;margin-top: 25px;float: left; width:100px;" size="small" >
              <el-option v-for="item in projectList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input placeholder="请输入手机号" style="border: 0;margin-top: 25px; float: right; width: calc( 100% - 100px );" v-model="loginUser" size="small"></el-input>
            <div>
              <el-input
                style="margin-top: 25px; float: left; width: calc( 100% - 100px );"
                placeholder="验证码"
                v-model="loginPassword"
                size="small"
              ></el-input>
              <el-button
                style="color:#293B8E;width: 100px;font-size: 14px;float: left;margin-top: 24px;border-left: 0px;border-top: 0px;border-right: 0px;border-radius: 0;"
                size="small"
              >发送验证码</el-button>
            </div>
            <el-button style="width: 100%; margin-top: 30px; font-size: 18px;" size="small" type="primary">立即注册</el-button>
            <label style="width: 100%; margin-top: 20px; display: inline-block;">
              <el-checkbox v-model="regChecked" size="small">我已阅读并同意《{{agreeName}}》</el-checkbox>
            </label>

          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "LoginRegister",
  components: {},
  data() {
    return {
      loginUser: "",
      loginPassword: "",
      regChecked: true,
      activeName: "login",
      agreeName: "投融资联盟服务协议",
      projectList: [
        {
          value: '0086',
          label: '0086',
        },
        {
          value: '0081',
          label: '0081',
        }
      ],
      checkValuelogin: "0086",
      checkValuereg: "0086",
    };
  },
  props: {
    config: Object
  },
  beforeMount() {
    this.loginUser = "";
    this.loginPassword = "";
    this.agreeName = this.config.agreeName || this.agreeName;
  },
  methods: {
    handleClick() {},
    changeTab(name) {
      this.activeName = name || "reg"
    },
    //登录
    loginHandle() {
      let obj = {
        phone: this.loginUser ,
        code: this.loginPassword,
      }
      this.$store.dispatch('user/Login', obj).then(res => {
        this.registerDialog = false
        this.alert_util(this,'登录成功！','success')
        this.$router.push({
          name: 'Home'
        })
      })
    },

  }
};
</script>

<style scope>

.outBox {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 26px 0 rgba(65,141,247,0.31);
}
.outBox .el-tabs__header {
  padding: 0;
  position: relative;
  width: 160px;
  margin: 0 auto;
  margin-top: 50px;
}
.outBox .el-tabs__nav-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
  background-color: #E4E7ED;
  z-index: 1;
}
.outBox input.el-input__inner {
  border-left:0px;
  border-top:0px;
  border-right:0px;
  border-radius: 0;
  font-size: 16px !important;
}
.outBox input.el-input__inner:focus {
  border-color: #293B8E;
}
.outBox .el-select .el-input.is-focus .el-input__inner {
  border-color: #293B8E!important;
}
.outBox .el-button:active {
  border-color: #293B8E!important;
}
.outBox .el-input--suffix .el-input__inner {
  font-size: 14px !important;
}
.outBox .el-button--primary {
  color: #fff;
  font-size: 18px;
  line-height: 24px;
  background-color: #293B8E;
  border-color: #293B8E;
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
  color: #999999 ;
  font-size: 18px;
}
.outBox .el-tabs__item:hover {
    color: #333333 ;
    cursor: pointer;
}
.outBox .el-tabs__item.is-active {
    color: #333333 ;
}
.outBox .el-tabs__active-bar {
  background-color: #293B8E;

}
.outBox .el-link.el-link--primary {
    color: #353535;
}
.outBox .el-link.el-link--primary:hover {
    color: #293B8E;
}
.outBox .el-link.el-link--default:after,.el-link.el-link--primary.is-underline:hover:after,.el-link.el-link--primary:after {
  border-color: #293B8E
}
.outBox .el-checkbox__input.is-checked .el-checkbox__label {
  color: #293B8E;
}
.outBox .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #293B8E;
    border-color: #293B8E;
}

</style>

