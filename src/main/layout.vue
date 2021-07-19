<template>
  <div class="mainPage">
    <div class="headerArea">
      <MyHeader>
        <template v-slot:menu>
          <MenuItem :menuInfo="{ mode: 'horizontal'}" style="display: inline-block; vertical-align: middle;" />
        </template>
        <template v-slot:login>
          <LoginItem :state="isLogined" @loginEvent="dealLoginEvent"
            style="display: inline-block; vertical-align: middle;" />
        </template>
      </MyHeader>
    </div>
    <div class="contentArea">
      <div class="mainArea">
        <div class="contentItem">
          <transition>
            <router-view></router-view>
          </transition>
        </div>
      </div>
      <div class="leftMenuArea">
        <div class="menuItem">
          <MenuItem mode="vertical" :menuInfo="menuInfo" />
        </div>
      </div>
    </div>
    <div class="footerArea">
      <MyFooter />
    </div>

    <DialogItem :config="dialogConfig" ref="testDialog">
      <template>测试</template>
    </DialogItem>
  </div>
</template>

<script>
  import MyHeader from "@/common/header";
  import MyFooter from "@/common/footer";
  import MenuItem from "@/common/menuItem";
  import LoginItem from "@/common/loginItem";
  import DialogItem from "@/common/dialogItem";
  export default {
    components: {
      MyHeader,
      MyFooter,
      MenuItem,
      LoginItem,
      DialogItem,
    },
    name: "",
    data() {
      return {
        isLogined: false,
        dialogConfig: {
          title: "哈哈哈",
          withFooter: false,
          width: "30%",
        },
        menuInfo: {
          defaultActive: "1-1",

          data: [{
              icon: "",
              label: "#菜单项1",
              children: [{
                  icon: "",
                  label: "菜单项1-1",
                  path: "/test1",
                },
                {
                  icon: "",
                  label: "菜单项1-2",
                  path: "/test2",
                },
              ],
            },
            {
              icon: "",
              label: "菜单项2",
              children: [{
                  icon: "",
                  label: "菜单项2-1",
                  path: "/test3",
                },
                {
                  icon: "",
                  label: "菜单项2-2",
                  path: "/test4",
                },
              ],
            },
            {
              icon: "",
              label: "菜单项3",
              path: "/test5",
            },
            {
              icon: "",
              label: "菜单项4",
              children: [{
                  icon: "",
                  label: "菜单项4-1",
                  path: "/test6",
                },
                {
                  icon: "",
                  label: "菜单项4-2",
                  path: "/test7",
                },
              ],
            },
          ],
        },
      };
    },
    created() {},
    methods: {
      dealLoginEvent(param) {
        this.$refs.testDialog.show();
        console.log(param);
      },
    },
  };

</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  .mainPage {
    position: relative;
    height: 100%;
    background-color: #f7f7f7;
  }

  .headerArea {
    position: relative;
    float: left;
    width: 100%;
    height: 80px;
    line-height: 80px;
  }

  .contentArea {
    position: relative;
    float: left;
    width: 100%;
    height: auto;
    min-height: calc(100% - 160px);
    margin: auto;
    background-color: #fff;
  }

  .mainArea {
    width: 100%;
    position: relative;
    height: 100%;
    padding-left: 200px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .leftMenuArea {
    width: 200px;
    height: 100%;
    left: 0px;
    top: 0px;
    overflow-y: auto;
    overflow-x: hidden;
    position: absolute;
  }

  .contentItem,
  menuitem {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .footerArea {
    position: relative;
    float: left;
    width: 100%;
    height: 80px;
    line-height: 80px;
  }

</style>
