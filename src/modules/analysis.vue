<template>
  <div  class="analysis">
    <div>
     <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>可视化</el-breadcrumb-item>
      <el-breadcrumb-item>数据分析</el-breadcrumb-item>
    </el-breadcrumb>
     <el-steps :space="250" :active="stepInfo.current" finish-status="success" align-center>
      <slot v-for="(item, i) in stepInfo.data">
        <el-step :key="i"  :description="item.description"></el-step>
      </slot>
     </el-steps>
     <div class="opStepArea">
      <el-button @click="switchStep(-1)" v-if="stepInfo.current !== 0" class="anaButtonOne"><i class="el-icon-arrow-left" ></i>上一步</el-button>
      <el-button type="primary" @click="switchStep(1)" v-if="stepInfo.current !== (stepInfo.data.length -1)" >下一步<i
          class="el-icon-arrow-right"></i></el-button>
      <el-button type="success" @click="confirmAnalysis" v-if="stepInfo.current === (stepInfo.data.length -1)"> 确定
      </el-button>
    </div>
    <div class="stepContentArea">
      <div class="stepContent" v-if="stepInfo.current === 0">
        选择可视化模板
        <LayoutTemplate @listenToChildEvent="getListen" ref="layout" :la="radioValue"></LayoutTemplate>
      </div>
      <div class="stepContent" v-if="stepInfo.current === 1">
        配置可视化模板
        <Example ref="example" v-if="radioValue==='1'" :currentStep="dy" ></Example>
        <ThreeLayout ref="example"  v-if="radioValue==='2'" :currentStep="dy"></ThreeLayout>
        <FourLayout ref="example"  v-if="radioValue==='3'" :currentStep="dy"></FourLayout>
        <ThreeTwo ref="example"  v-if="radioValue==='4'" :currentStep="dy"></ThreeTwo>
      </div>
      <div class="stepContent" v-if="stepInfo.current === 2">
        <Example ref="example" v-if="radioValue==='1'" :currentStep="dy" ></Example>
        <ThreeLayout ref="example"  v-if="radioValue==='2'" :currentStep="dy"></ThreeLayout>
        <FourLayout ref="example"  v-if="radioValue==='3'" :currentStep="dy"></FourLayout>
        <ThreeTwo ref="example"  v-if="radioValue==='4'" :currentStep="dy"></ThreeTwo>
      </div>
    </div>
    <DialogItem
         :config="setComponentDialog"
          ref="testDialog"
         class="DialogItem"
         @confirmDialog="dealConfirmDialog"
       >
      <template>
        <FormInfo
           ref="configForm"
          :dataObj="setComponentDialog.formData"
        ></FormInfo>
      </template>
    </DialogItem>
    </div>
  </div>
</template>

<script>
import LayoutTemplate from "../common/layoutTemplate";
import Example from "../app/example";
import ThreeLayout from "../app/threeLayout";
import FourLayout from "../app/fourLayout";
import ThreeTwo from "../app/threeTwo";
import DialogItem from "@/common/dialogItem";
import FormInfo from "@/common/formInfo";
  export default {
    components: {
       LayoutTemplate,
       Example,
       ThreeLayout,
       FourLayout,
       ThreeTwo,
       DialogItem,
       FormInfo
    },
    mounted() {},
    data() {
      return {
        components: [],
        stepInfo: {
          data: [{
            title: "步骤 1",
            description: "选择可视化模板"
          }, {
            title: "步骤 2",
            description: "配置可视化模板"
          }, {
            title: "步骤 3",
            description: "设置数据接口和参数"
          }],
          current: 0
        },
        radioValue:"",
        dy:'',
        showData: [],
        dataInfo:{},
        lastShow : false,
        setComponentDialog: {
        title: "基本信息",
        current: null,
        withFooter: true,
        data: {
          title: "",
          url: "",
        },
        visible: false,
        formData: {
          labelWidth: "120px",
          data: [
            {
              name: "标题",
              value: "",
              key: "title",
              type: "text",
              items: [
                {
                  placeholder: "请输入标题",
                },
              ],
             },
             {
              name: "url",
              value: "",
              type: "text",
              key: "url",
              items: [
                {
                  placeholder: "请输入url",
                },
              ],
            },
          
          ],
        },
        width: "600px",
      },
      exampleData : {}

      };
    },
    methods: {
      switchStep(n) {
        if (!this.radioValue && this.stepInfo.current === 0 ) {
            this.$message({
              message: '忘了选择模板哦',
              type: 'warning'
            });
            return;
        }
        if (this.stepInfo.current === 1 && n === 1) {
          this.showData = this.$refs.example.exampleReturnData();
          if (this.showData[0].component === "") {
            this.$message({
              message: '忘了配置可视化模板哦',
              type: 'warning'
            });
            return;
          }
        }
        var t = this.stepInfo.current + n;
        this.dy = t;
        if (t > -1 & t < this.stepInfo.data.length) {
          this.stepInfo.current = t;
        }
        if (t === 2) {
          this.$refs.example.dealConfirmDialog();
          this.showData = this.$refs.example.exampleReturnData();
          //console.log ( this.$refs.example.exampleReturnData(),55555 )
        }
      },
      //点击确定的时候的
      confirmAnalysis() {
        var _self = this
        _self.$refs.testDialog.show()
        _self.updateCurrentItem()
      
      },
      getListen(radio){
        this.radioValue = radio;
      },
      dealConfirmDialog() {
        var tData = this.$refs.configForm.getFormValue();
        var _self = this
        var  dataB = this.showData
        tData['data'] = dataB
        //console.log(tData,1111)
        _self.tAdapter.addEntityData({
          data:tData
         }, function (d) {
         // console.log(d.data.ops[0],2222222222)
           let id = d.data.ops[0]._id
           // console.log(id,9999999)
          _self.$router.push({
           path: '/tool/lastAnalysis',
           query: {
             radioValue : _self.radioValue,
             id : id
           }
         })
       })   
    },
    updateCurrentItem() {
        var tData = this.setComponentDialog.formData.data;
        this.exampleData ={
          title : "",
          url:localStorage.getItem('url'),
        }
        for (var i = 0; i < tData.length; i++) {
          if (tData[i].key) {
            if (tData[i].type === 'select'){
              for (var j = 0; j < tData[i].items.length; j++) {
               tData[i].items[j].value = this.exampleData[tData[i].key] || "";
            }
            }else {
               tData[i].value = this.exampleData[tData[i].key] || "";
            }
          }
        }
      },
      updateInterfaceOptions() {
        var tData = this.setComponentDialog.formData.data;
        tData[2].type = "select";
        tData[2].items[0].options = [{
          label: "get",
          value: "1"
        }, {
          label: "post",
          value: "2"
        },
        {
          label: "put",
          value: "3"
        }, {
          label: "delete",
          value: "4"
        }];
      }
    },
    mounted() {
    }

  };

</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  .el-breadcrumb {
    margin-bottom: 10px;
  }

  .el-steps {
    padding: 10px 80px;
  }

  .stepContentArea {
    display: inline-block;
    position: relative;
    width: 900px;
    /* float: left; */
    min-height: 500px;
    max-height: calc(100% - 300px);
  }

  .opStepArea {
    width: 240px;
    float: right;
    position: relative;
    display: inline-block;
    margin-top: -80px;
  }

  .opStepArea .el-button {
    display: block;
    margin-left: 0px;
    margin-top: 20px;
    width: 90px;
  }
  .analysis {
    padding:20px;
  }
 /deep/ .el-step__head {
    position: relative;
    width: 100%;
    margin-bottom: 10px !important;
}
.anaButtonOne{
  float: left;
  margin-right: 10px;
}
.stepContent{
  height: 560px;
  width: 1280px;
}
</style>
