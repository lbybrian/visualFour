<template>
  <div style="" class="example">
    <h3 class="titleArea">{{dataObj.title}}</h3>
    <el-row :gutter="20" class="chartLine">
      <el-col v-if="dataObj && dataObj.item1" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item1.comName" :title="dataObj.item1.title" :dataObj="dataObj.item1.dataObj"
          ref="item1"></DynamicItem>
      </el-col>
      <el-col v-if="dataObj && dataObj.item2" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item2.comName" :title="dataObj.item2.title" :dataObj="dataObj.item2.dataObj"
          ref="item2"></DynamicItem>
      </el-col>
      <el-col v-if="dataObj && dataObj.item3" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item3.comName" :title="dataObj.item3.title" :dataObj="dataObj.item3.dataObj"
          ref="item3"></DynamicItem>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="chartLine">
      <el-col v-if="dataObj && dataObj.item4" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item4.comName" :title="dataObj.item4.title" :dataObj="dataObj.item4.dataObj"
          ref="item4"></DynamicItem>
      </el-col>
      <el-col v-if="dataObj && dataObj.item5" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item5.comName" :title="dataObj.item5.title" :dataObj="dataObj.item5.dataObj"
          ref="item5"></DynamicItem>
      </el-col>
      <el-col v-if="dataObj && dataObj.item6" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item6.comName" :title="dataObj.item6.title" :dataObj="dataObj.item6.dataObj"
          ref="item6"></DynamicItem>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="chartLine">
      <el-col v-if="dataObj && dataObj.item7" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item7.comName" :title="dataObj.item7.title" :dataObj="dataObj.item7.dataObj"
          ref="item7"></DynamicItem>
      </el-col>
      <el-col v-if="dataObj && dataObj.item8" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item8.comName" :title="dataObj.item8.title" :dataObj="dataObj.item8.dataObj"
          ref="item8"></DynamicItem>
      </el-col>
      <el-col v-if="dataObj && dataObj.item9" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item9.comName" :title="dataObj.item9.title" :dataObj="dataObj.item9.dataObj"
          ref="item9"></DynamicItem>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="chartLine">
      <el-col v-if="dataObj && dataObj.item10" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item10.comName" :title="dataObj.item10.title" :dataObj="dataObj.item10.dataObj"
          ref="item10"></DynamicItem>
      </el-col>
      <el-col v-if="dataObj && dataObj.item11" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item11.comName" :title="dataObj.item11.title" :dataObj="dataObj.item11.dataObj"
          ref="item11"></DynamicItem>
      </el-col>
      <el-col v-if="dataObj && dataObj.item12" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item12.comName" :title="dataObj.item12.title" :dataObj="dataObj.item12.dataObj"
          ref="item12"></DynamicItem>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="chartLine">
      <el-col v-if="dataObj && dataObj.item13" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item13.comName" :title="dataObj.item13.title" :dataObj="dataObj.item13.dataObj"
          ref="item13"></DynamicItem>
      </el-col>
      <el-col v-if="dataObj && dataObj.item14" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item14.comName" :title="dataObj.item14.title" :dataObj="dataObj.item14.dataObj"
          ref="item14"></DynamicItem>
      </el-col>
      <el-col v-if="dataObj && dataObj.item15" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item15.comName" :title="dataObj.item15.title" :dataObj="dataObj.item15.dataObj"
          ref="item15"></DynamicItem>
      </el-col>
    </el-row>
     <el-row :gutter="20" class="chartLine">
      <el-col v-if="dataObj && dataObj.item16" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item16.comName" :title="dataObj.item16.title" :dataObj="dataObj.item16.dataObj"
          ref="item16"></DynamicItem>
      </el-col>
      <el-col v-if="dataObj && dataObj.item17" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item17.comName" :title="dataObj.item17.title" :dataObj="dataObj.item17.dataObj"
          ref="item17"></DynamicItem>
      </el-col>
      <el-col v-if="dataObj && dataObj.item18" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item18.comName" :title="dataObj.item18.title" :dataObj="dataObj.item18.dataObj"
          ref="item18"></DynamicItem>
      </el-col>
    </el-row>
     <el-row :gutter="20" class="chartLine">
      <el-col v-if="dataObj && dataObj.item19" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item19.comName" :title="dataObj.item19.title" :dataObj="dataObj.item19.dataObj"
          ref="item19"></DynamicItem>
      </el-col>
      <el-col v-if="dataObj && dataObj.item20" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item20.comName" :title="dataObj.item20.title" :dataObj="dataObj.item20.dataObj"
          ref="item20"></DynamicItem>
      </el-col>
      <el-col v-if="dataObj && dataObj.item21" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item21.comName" :title="dataObj.item21.title" :dataObj="dataObj.item21.dataObj"
          ref="item21"></DynamicItem>
      </el-col>
    </el-row>
     <el-row :gutter="20" class="chartLine">
      <el-col v-if="dataObj && dataObj.item22" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item22.comName" :title="dataObj.item22.title" :dataObj="dataObj.item22.dataObj"
          ref="item22"></DynamicItem>
      </el-col>
      <el-col v-if="dataObj && dataObj.item23" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item23.comName" :title="dataObj.item23.title" :dataObj="dataObj.item23.dataObj"
          ref="item23"></DynamicItem>
      </el-col>
      <el-col v-if="dataObj && dataObj.item24" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item24.comName" :title="dataObj.item24.title" :dataObj="dataObj.item24.dataObj"
          ref="item24"></DynamicItem>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="chartLine">
      <el-col v-if="dataObj && dataObj.item25" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item25.comName" :title="dataObj.item25.title" :dataObj="dataObj.item25.dataObj"
          ref="item25"></DynamicItem>
      </el-col>
       <el-col v-if="dataObj && dataObj.item26" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item26.comName" :title="dataObj.item26.title" :dataObj="dataObj.item26.dataObj"
          ref="item26"></DynamicItem>
      </el-col>
       <el-col v-if="dataObj && dataObj.item27" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item27.comName" :title="dataObj.item27.title" :dataObj="dataObj.item27.dataObj"
          ref="item27"></DynamicItem>
      </el-col>
    </el-row>
     <el-row :gutter="20" class="chartLine">
      <el-col v-if="dataObj && dataObj.item28" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item28.comName" :title="dataObj.item28.title" :dataObj="dataObj.item28.dataObj"
          ref="item28"></DynamicItem>
      </el-col>
       <el-col v-if="dataObj && dataObj.item29" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item29.comName" :title="dataObj.item29.title" :dataObj="dataObj.item29.dataObj"
          ref="item29"></DynamicItem>
      </el-col>
       <el-col v-if="dataObj && dataObj.item30" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item30.comName" :title="dataObj.item30.title" :dataObj="dataObj.item30.dataObj"
          ref="item30"></DynamicItem>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="chartLine">
      <el-col v-if="dataObj && dataObj.item31" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item31.comName" :title="dataObj.item31.title" :dataObj="dataObj.item31.dataObj"
          ref="item31"></DynamicItem>
      </el-col>
       <el-col v-if="dataObj && dataObj.item32" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item32.comName" :title="dataObj.item32.title" :dataObj="dataObj.item32.dataObj"
          ref="item32"></DynamicItem>
      </el-col>
       <el-col v-if="dataObj && dataObj.item33" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item33.comName" :title="dataObj.item33.title" :dataObj="dataObj.item33.dataObj"
          ref="item33"></DynamicItem>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="chartLine">
      <el-col v-if="dataObj && dataObj.item34" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item34.comName" :title="dataObj.item34.title" :dataObj="dataObj.item34.dataObj"
          ref="item34"></DynamicItem>
      </el-col>
       <el-col v-if="dataObj && dataObj.item35" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item35.comName" :title="dataObj.item35.title" :dataObj="dataObj.item35.dataObj"
          ref="item35"></DynamicItem>
      </el-col>
       <el-col v-if="dataObj && dataObj.item36" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item36.comName" :title="dataObj.item36.title" :dataObj="dataObj.item36.dataObj"
          ref="item36"></DynamicItem>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="chartLine">
      <el-col v-if="dataObj && dataObj.item37" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item37.comName" :title="dataObj.item37.title" :dataObj="dataObj.item37.dataObj"
          ref="item37"></DynamicItem>
      </el-col>
       <el-col v-if="dataObj && dataObj.item38" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item38.comName" :title="dataObj.item38.title" :dataObj="dataObj.item38.dataObj"
          ref="item38"></DynamicItem>
      </el-col>
       <el-col v-if="dataObj && dataObj.item39" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item39.comName" :title="dataObj.item39.title" :dataObj="dataObj.item39.dataObj"
          ref="item39"></DynamicItem>
      </el-col>
    </el-row>
      <el-row :gutter="20" class="chartLine">
      <el-col v-if="dataObj && dataObj.item40" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item40.comName" :title="dataObj.item40.title" :dataObj="dataObj.item40.dataObj"
          ref="item40"></DynamicItem>
      </el-col>
       <el-col v-if="dataObj && dataObj.item41" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item41.comName" :title="dataObj.item41.title" :dataObj="dataObj.item41.dataObj"
          ref="item41"></DynamicItem>
      </el-col>
       <!-- <el-col v-if="dataObj && dataObj.item42" :span="8" style=" height: 500px; ">
        <DynamicItem :comName="dataObj.item42.comName" :title="dataObj.item42.title" :dataObj="dataObj.item42.dataObj"
          ref="item42"></DynamicItem>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
  import DynamicItem from "@/common/dynamicItem";
  export default {
    components: {
      DynamicItem
    },
    mounted() {
      this.updateAppData();
    },
    data() {
      return {
        dataObj: {
          title: "",
          item1: {
            "comName": "dataTable",
            "title": "测试标题XXXXA001",
          },
          item2: {
            "comName": "dataTable",
            "title": "测试标题XXXXA002",
          },
          item3: {
            "comName": "dataTable",
            "title": "测试标题XXXXA003",
          },
          item4: {
            "comName": "dataTable",
            "title": "测试标题XXXXA004",
          },
          item5: {
            "comName": "dataTable",
            "title": "测试标题XXXXA005",
          },
          item6: {
            "comName": "dataTable",
            "title": "测试标题XXXXA006",
          },
          item7: {
            "comName": "dataTable",
            "title": "测试标题XXXXA007",
          },
          item8: {
            "comName": "dataTable",
            "title": "测试标题XXXXA008",
          },
          item9: {
            "comName": "dataTable",
            "title": "测试标题XXXXA009",
          },
          item10: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0010",
          },
          item11: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0011",
          },
          item12: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0012",
          },
          item13: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0013",
          },
          item14: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0014",
          },
          item15: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0015",
          },
          item16: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0016",
          },
          item17: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0017",
          },
          item18: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0018",
          },
           item19: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0019",
          },
          item20: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0020",
          },
          item21: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0021",
          },
           item22: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0022",
          },
          item23: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0023",
          },
          item24: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0024",
          },
          item25: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0025",
          },
          item26: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0026",
          },
          item27: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0027",
          },
           item28: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0028",
          },
          item29: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0029",
          },
          item30: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0030",
          },
           item31: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0031",
          },
          item32: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0032",
          },
          item33: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0033",
          },
           item34: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0034",
          },
          item35: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0035",
          },
           item36: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0036",
          },
           item37: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0037",
          },
          item38: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0038",
          },
           item39: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0039",
          },
          item40: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0040",
          },
          item41: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0041",
          },
           item42: {
            "comName": "dataTable",
            "title": "测试标题XXXXA0042",
          }
        }
      };
    },
    methods: {
      updateAppData: function () {
        var _self = this;
        adapter.getAppData({
          _id: "xxxx"
        }, function (d) {
          _self.dataObj.title = d.data.title;
          d = d.data.list;
          for (var i = 0; i < d.length; i++) {
            var rValue = d[i].ref;
            if (_self.$refs[rValue]) {

              _self.dataObj[rValue] = d[i];
              _self.$refs[rValue].switchComponent(d[i]);
            }

          }
        })
      }
    },
  };

</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  .example {
    padding: 20px 0px;
    height: auto;
  }

  .example .el-row {
    height: auto;
  }

  .titleArea {
    padding-bottom: 10px;
    font-weight: 900;
  }

  .chartLine {
    margin-bottom: 10px;
  }

  .introduce {
    position: relative;
    float: left;
    max-width: 1200px;
    margin-bottom: 20px;
    padding-right: 20px;
    width: 100%;
  }

  .introduce>h2 {
    font-weight: 700;
    margin-bottom: 5px;
  }

  /deep/ .CodeMirror {
    border-top: solid 1px #ddd;
    border-left: solid 1px #ddd;
    box-shadow: 1px 1px 1px #ddd;
    height: 500px !important;
  }

  /deep/ .exampleItem,
  .howToImport .CodeMirror {
    height: auto !important;
  }

  .exampleItem {}

  /deep/ .containerArea {
    margin-bottom: 10px;
  }

  /deep/ .el-form-item {
    margin-bottom: 5px;
  }

  /deep/ .el-collapse-item__header {
    font-weight: 700;
  }

</style>
