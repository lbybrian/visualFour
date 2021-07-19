<template>
  <div class="componentArea" @click="$emit('click', dataInfo)">
    <h3 class="titleArea">
      <span class="titleAreaSpan">{{ dataInfo.title }}</span>
      <el-button @click="dealSetBtnClick" class="setBtn" size="mini" icon="el-icon-setting" circle
        v-if="currentStep === 1"></el-button>
    </h3>
    <div class="emptyTips" v-if="dataInfo.comName && currentStep === 1 && lastStatus !== 1">
      参数信息： {{ dataInfo.param }} 数据接口：{{
        dataInfo.interface
      }}
      可视化组件：{{ dataInfo.comName }}
    </div>
    <slot v-if="inited && !!dataInfo.comName && currentStep !== 1">
      <component ref="componentItem" v-if="!dataInfo.keepAlive" :is="dataInfo.comName" :dataObj="dataInfo.dataObj">
      </component>
      <keep-alive v-else>
        <component ref="componentItem" v-if="!dataInfo.keepAlive" :is="dataInfo.comName" :dataObj="dataInfo.dataObj">
        </component>
      </keep-alive>
    </slot>
    <div v-if="!dataInfo.comName" class="emptyTips emptyTipsOne">请配置该可视化组件</div>
  </div>
</template>
<script>
  import bus from "./eventBus";
  var tData = ComArray;
  var componentItems = {};
  for (var i = 0; i < tData.length; i++) {
    var item = tData[i];
    componentItems[item.name] = require(`@/${item.component}.vue`).default;
  }
  export default {
    name: "",
    components: componentItems,
    beforeMount() {
      this.dataInfo.comName = this.comName || this.dataInfo.comName;
      this.dataInfo.data = this.dataObj || this.dataInfo.dataObj;
      // this.dataInfo.dataObj = ((this.dataObj && this.dataObj.param.length) ? eval(this.dataObj.param) : {})
      this.inited = true;
      this.dataInfo.title = this.title || this.dataInfo.title;
      this.dataInfo.type = this.type || this.dataInfo.type;
      console.log(this.dataInfo, 55555555555)
      this.dataInfo.param = this.param || this.dataInfo.param;
      this.dataInfo.interface = this.interface || this.dataInfo.interface;
    },
    data() {
      return {
        inited: false,
        list: tData,
        dataInfo: {
          title: "未定义标题",
          type: "",
          interface: "",
          comName: "",
          param: "",
          keepAlive: false,
          dataObj: {},
        },
        itemData: {},
      };
    },
    watch: {
      dataInfo: {
        handler(nValue, oValue) {},
      },
    },
    methods: {
      switchComponent(data) {
        this.dataInfo = data;
        for (var k in this.dataInfo) {
          this.dataInfo[k] = data[k] || this.dataInfo[k];
        }
        if (
          this.$refs.componentItem &&
          typeof this.$refs.componentItem.updateData === "function"
        ) {
          this.$refs.componentItem.updateData(this.dataInfo.dataObj);
          this.fresh();
        }
        // if (this.dataInfo.param) {
        //     console.log(this.dataInfo.param)
        //     this.dataInfo.data = JSON.parse(this.dataInfo.param)
        //   }
      },
      returnData() {
        return this.dataInfo;
      },
      dealSetBtnClick() {
        this.$emit("setComponent", this);
      },
      fresh() {
        this.inited = false;
        this.$nextTick(() => {
          this.inited = true;
          this.$forceUpdate();
        });
      },
    },
    props: {
      title: String,
      comName: String,
      dataObj: Object,
      currentStep: Number,
      lastShow: Number,
      lastStatus: Number,
    },
    mounted() {},
  };

</script>

<style scoped>
  .componentArea {
    float: left;
    position: relative;
    padding-top: 40px;
    /* padding-left: 10px;
    padding-right: 10px; */
    width: 100%;
    height: 100%;
    /* box-shadow: 1px 1px 1px #ddd; */
    /* border-top: solid 1px #ddd; */
    /* border-left: solid 1px #ddd; */
    /* border-radius: 3px; */
  }

  .titleArea {
    position: absolute;
    line-height: 40px;
    height: 40px;
    width: 100%;
    /* top: -38px; */
    z-index: 1;
  }

  .titleArea .setBtn {
    right: 15px;
    top: 5px;
    position: inherit;
  }

  .emptyTips {
    margin-top: 20px;
    color: #999;
    font-size: 14px;
  }

  .titleAreaSpan {
    color: #fff;
  }

</style>
