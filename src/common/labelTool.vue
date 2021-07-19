<template>
  <div class="contentArea" style="padding: 10px; background-color: #f2f2f2; height: 100%;">
    <el-tabs v-model="dataInfo.activeName" @tab-click="handleClick" style="width: 100%; height: 100%;">
      <el-tab-pane label="实体标注" name="entity" style="width: 100%; height: 100%;">
        <div ref="entityContentArea" class="contentItem" style="padding: 10px; background-color: #fff;"></div>
      </el-tab-pane>
      <el-tab-pane label="事件标注" name="event" style="width: 100%; height: 100%;">
        <div ref="eventContentArea" class="contentItem" style="padding: 10px; background-color: #fff;"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        dataInfo: {
          activeName: "entity",
          content: "被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元",
          entities: [{
            text: "周春桥",
            label: "person",
            offset: 3
          }],
          events: [{
            test: "曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元",
            label: "审判事件",
            offset: 3
          }]
        }

      };
    },
    props: {
      config: Object
    },
    beforeMount() {

    },
    mounted() {
      this.updateContentArea();
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      updateContentArea(flag) {
        var elem = this.$refs.entityContentArea;
        elem.innerHTML = this.dataInfo.content;
      },
      handleClick() {}
    }
  };

</script>

<style scope>
  * {
    box-sizing: border-box;
  }

  .contentItem {
    height: 100%;
    min-height: 400px;
    width: 100%;
  }

  /deep/ .el-tabs__content {
    height: calc(100% - 60px) !important;
  }

  /deep/ .el-tab-pane {
    height: 100% !important;
  }

</style>
