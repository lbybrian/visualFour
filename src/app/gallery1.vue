<template>
  <div class="example" style="background:#003F51">
    <div v-for="(item,index) in dataObj.data" :key="index">
      <el-col :span="8" style=" height: 500px;background:#003F51" v-show="item.comName">
        <DynamicItem :comName="item.comName" :title="item.title" :dataObj="item.dataObj"
                     :ref="'item'+ (index+1)"></DynamicItem>
      </el-col>
    </div>

  </div>
</template>

<script>
import Sidebar from "@/common/sidebar";
import Bottombar from "@/common/bottombar";
import DynamicItem from "@/common/dynamicItem";

export default {
  components: {
    DynamicItem,
    Sidebar,
    Bottombar
  },
  created() {
    this.dataObj.data = [];
    for (var i = 0; i < 26; i++) {
      var temp = {
        "comName": "",
        "title": "初始化名称" + i
      }
      this.dataObj.data.push(temp);
    }
  },
  mounted() {
    this.updateAppData();
    this.$forceUpdate()
    console.log(this.dataNumber, 88888)
  },
  data() {
    return {
      dataObj: {
        type: "",
        data: [{
          "comName": "dataTable",
          "title": "测试标题XXXXA002"
        }]
      },
      dataNumber: [],
      dataStatus:'jj'
    };
  },
  methods: {
    updateAppData: function () {
      var _self = this;
      adapter.getAppDataGallery1({
        _id: "xxxx"
      }, function (d) {
        let data = d
        d = d.data.list;
        d = d.filter(item => { return item.type == _self.dataStatus})
        _self.dataObj.title = data.data.title;
        for (var i = 0; i < d.length; i++) {
          _self.dataObj.type = d[i].type;
          // if (d[i].type === 1) {
            var rValue = d[i].ref;
            _self.dataObj.data[rValue.slice(4) - 1].comName = d[i].comName
            if (_self.$refs[rValue]) {
              _self.dataObj[rValue] = d[i];
              _self.$refs[rValue][0].switchComponent(d[i]);
            }
            if (_self.dataObj.type !== undefined) {
              _self.dataNumber.push(_self.dataObj.type)
            }
          // }
        }
      })
    }
  }
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

.introduce > h2 {
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

.exampleItem {
}

/deep/ .containerArea {
  margin-bottom: 10px;
}

/deep/ .el-form-item {
  margin-bottom: 5px;
}

/deep/ .el-collapse-item__header {
  font-weight: 700;
}

.componentArea .titleArea span {
  color: #fff;
}
</style>
