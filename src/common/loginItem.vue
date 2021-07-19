<template>
  <div class="loginArea">
    <div v-if="isLogined" class="loginedState">
      <el-dropdown style="line-height: 1;" @command="handleCommand">
        <span class="el-dropdown-link">
          <i style="font-size: 18px; vertical-align: middle;" class="el-icon-user-solid"></i>
          {{userName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            :key="d.name || d"
            :command="d.command"
            v-for="d in menuItems"
          >{{d.name || d}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-if="!isLogined" class="noLoginState">
      <el-button @click="handleCommand('login')" type="text" >
        <i style="font-size: 16px; vertical-align: middle; margin-right: 5px;" class="el-icon-user-solid"></i>登录
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  beforeMount() {
    this.isLogined = this.state;
    this.menuItems = this.menuData || this.menuItems;
  },
  data() {
    return {
      userName: "Admin",
      menuItems: [
        {
          name: "退出登录",
          command: "exitLogin",
        },
        {
          name: "重置密码",
          command: "resetPass",
        },
        {
          name: "切换账号",
          command: "switch",
        },
      ],
      isLogined: true,
    };
  },
  methods: {
    swtichMode(flag, data) {
      if (flag === true || flag === false) {
        this.isLogined = flag;
      } else {
        this.isLogined = !this.isLogined;
      }
    },
    handleCommand(command) {
      console.log(command);
      this.$emit("loginEvent", command);
    },
  },
  created() {},
  props: {
    state: Boolean,
    menuData: Array,
  },
};
</script>

<style scoped>
.menuItemsArea {
  width: 100%;
  height: 100%;
}
</style>
