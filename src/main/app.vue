<template>
  <div class="mainPage">
    <div class="headerArea">
      <MyHeader>
        <template v-slot:logo>
          <span>{{title}}</span>
        </template>
      </MyHeader>
    </div>
    <div class="contentArea">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
    <div class="footerArea">
      由中科天玑可视化工具生成
    </div>
  </div>
</template>

<script>
  import MyHeader from "@/common/header";
  import MyFooter from "@/common/footer";

  export default {
    components: {
      MyHeader,
      MyFooter,
    },
    name: "",
    data() {
      return {
        title: "可视化分析报告"

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
    background-color: #f7f7f7;
  }

  .headerArea {
    position: relative;
    float: left;
    width: 100%;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
  }

  .contentArea {
    position: relative;
    float: left;
    width: 100%;
    height: auto;
    margin: auto;
    background-color: #fff;
  }

  .footerArea {
    position: relative;
    float: left;
    font-size: 12px;
    color: #999;
    padding-left: 10px;
    width: 100%;
    height: 30px;
    line-height: 30px;
  }

</style>
