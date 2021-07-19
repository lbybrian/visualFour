<template>
  <div style="" class="example">
    <el-row :gutter="20">
      <el-col :span="12" style=" height: 90%; ">
        <DynamicItem ref="item1" @setComponent="openSetComponentDialog" :currentStep="currentStep"
          :lastStatus="lastStatus"></DynamicItem>
      </el-col>
      <el-col :span="12" style=" height: 90%; ">
        <DynamicItem ref="item2" @setComponent="openSetComponentDialog" :currentStep="currentStep"
          :lastStatus="lastStatus"></DynamicItem>
      </el-col>
    </el-row>
    <DialogItem :config="setComponentDialog" @confirmDialog="dealConfirmDialog" ref="testDialog">
      <template>
        <FormInfo ref="configForm" :dataObj="setComponentDialog.formData" @change="change"></FormInfo>
      </template>
    </DialogItem>
  </div>
</template>

<script>
  import DynamicItem from "@/common/dynamicItem";
  import DialogItem from "@/common/dialogItem";
  import FormInfo from "@/common/formInfo";
  export default {
    components: {
      DynamicItem,
      DialogItem,
      FormInfo
    },
    mounted() {

    },
    props: {
      DataInfo: Array,
      currentStep: Number,
      lastStatus: {
        type: Number,
        default: 2
      }
    },
    data() {
      return {
        radioOne: "",
        dataInfo: {

        },
        setComponentDialog: {
          title: "配置可视化组件实例",
          current: null,
          withFooter: true,
          data: {
            itemTitle: "#未定义标题",
            interface: "",
            params: "",
            component: "",
            options: [{
              label: "XXXXXX",
              value: "AAAAAA"
            }]
          },
          visible: false,
          formData: {
            labelWidth: "120px",
            data: [{
              name: "图表的标题",
              value: "",
              key: "title",
              type: "text",
              items: [{
                placeholder: "请输入标题",
              }],
            }, {
              name: "可视化组件",
              value: "",
              type: "text",
              key: "comName",
              items: [{
                placeholder: "",
              }],
            }, {
              name: "数据接口",
              value: "",
              type: "text",
              key: "interface",
              items: [{
                placeholder: "",
              }],
            }, {
              name: "参数信息",
              value: "",
              type: "textarea",
              key: "param",
              items: [{
                placeholder: "",
              }],
            }]
          },
          width: "600px",
        },
        exampleData: {}
      };
    },
    methods: {
      openSetComponentDialog(item) {
        this.setComponentDialog.current = item;
        this.updateCurrentItem();
        this.updateComOptions();
        this.updateInterfaceOptions();
        this.$refs.testDialog.show();
        this.$nextTick(() => {
          this.$refs.configForm.$forceUpdate();
        })

      },
      updateCurrentItem() {
        var current = this.setComponentDialog.current;
        var tData = this.setComponentDialog.formData.data;
        for (var i = 0; i < tData.length; i++) {
          if (tData[i].key) {
            tData[i].value = current.dataInfo[tData[i].key] || "";
          }
        }
      },
      updateComOptions() {
        var tData = this.setComponentDialog.formData.data;
        tData[1].type = "select";
        tData[1].items[0].options = [];
        var tArr = ComArray;
        tData[1].items[0].options = tArr.map(item => {
          return {
            label: item.label,
            value: item.name
          }
        })
      },
      //弹窗确定的时候 的点击
      dealConfirmDialog() {
        var tData = this.$refs.configForm.getFormValue();
        console.log( tData ,9999)
        if (!tData) {
          this.$message.error('参数信息格式不正确')
        }
        var item = this.setComponentDialog.current;
        item.switchComponent(tData);
      },
      //更新 组件的数据
      updateView(showData) {
        showData.forEach((item, index) => {
          if (item.comName) {
            let i = ''
            i = 'item' + String(index + 1)
            this.$refs[i].switchComponent(item)
          }
        })
      },
      exampleReturnData() {
        return [this.$refs.item1.returnData(), this.$refs.item2.returnData()]
      },
      updateInterfaceOptions() {
        var tData = this.setComponentDialog.formData.data;
        tData[2].type = "select";
        tData[2].items[0].options = [{
          label: "测试接口A",
          value: "/test/a"
        }, {
          label: "测试接口B",
          value: "/test/b"
        }, {
          label: "测试接口C",
          value: "/test/c"
        }];
      },
      updateCurrent() {

      },
      change(item) {
        this.exampleData = item
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
    height: 124%
  }

  .example .el-row {
    height: 80%;
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
