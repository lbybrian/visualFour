<template>
  <div class="mainPage">
    <!-- <div class="headerArea">
      <MyHeader>
        <template v-slot:logo>
          <span> <img src="../assets/image/golaxy.png" alt="">
          </span>
        </template>
      </MyHeader>
    </div> -->
    <!-- <div class="cloneHeaderArea"></div> -->
    <div class="contentArea">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
    <!-- <div class="footerArea">
      <MyFooter />
    </div> -->
  </div>
</template>

<script>
  import MyHeader from "@/common/header";
  import MyFooter from "@/common/footer";
  import MenuItem from "@/common/menuItem";

  export default {
    components: {
      MyHeader,
      MyFooter,
      MenuItem
    },
    name: "",
    data() {
      return {
        menuInfo: {
          mode: 'horizontal',
          defaultActive: "1-1",
          data: MenuConfig.admin
        }

      }
    },
    created() {},
    methods: {
      dealLoginEvent(command) {
        this.$refs.testDialog.show();
        // this.$refs.loginItem.changeTab("login");
      }
    }
  };

</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  .mainPage {
    position: relative;
    height: 100%;
    /* background-color: #f7f7f7; */
  }

  .headerArea {
    position: fixed;
    top: 0;
    z-index: 99;
    float: left;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #000;
  }

  .cloneHeaderArea {
    height: 50px;
  }

  .contentArea {
    position: relative;
    float: left;
    width: 100%;
    /* height: calc(100% - 80px); */
    height: 100%;
    margin: auto;
    background-color: #fff;
  }

  .footerArea {
    position: fixed;
    /* float: left; */
    width: 100%;
    height: 30px;
    bottom: 0;
    line-height: 30px;
  }

  /deep/ .el-submenu__title {
    height: 40px !important;
    line-height: 40px !important;
    font-weight: 900 !important;
    font-size: 18px !important;
    /* color: #67C23A !important; */
  }

  /deep/ .el-menu,
  /deep/ .submenu .el-submenu__title:hover {
    background-color: transparent !important;
  }

  /deep/ .el-menu.el-menu--horizontal {
    border-bottom: none !important;
  }

  /deep/ .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
    border-bottom: 0px solid #409eff !important;
    color: #409eff !important;
  }

</style>
