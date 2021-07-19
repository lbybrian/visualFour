<template>
  <!-- 模型训练可视化 -->
  <div class="stepsClass">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/tool' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>可视化</el-breadcrumb-item>
      <el-breadcrumb-item>模型训练</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button class="but del" type="warning" @click="lastUpdateView">这个按钮只是为了把数据添加到数据库</el-button>
    <!-- 步骤条 -->
    <div class="aaa">
      <el-steps :space="250" :active="active" align-center finish-status="success">
        <el-step title="步骤 1" description="选择训练数据"></el-step>
        <el-step title="步骤 2" description="选择标签数据接口"></el-step>
        <el-step title="步骤 3" description="标注文档生成训练数据"></el-step>
        <el-button class="but" :disabled="lastStep" @click="Last">
          <i class="el-icon-caret-left"></i>
          上一步</el-button>
        <el-button class="but" v-if="!butShow" type="primary" @click="next">
          下一步
          <i class="el-icon-caret-right"></i>
        </el-button>
        <el-button class="but" v-if="butShow" type="success" @click="submit">
          提<span class="butSpan">交
            <i class="el-icon-check"></i>
          </span>
        </el-button>
      </el-steps>
    </div>
    <div class="choiceClass">
      <!-- 选择训练数据 -->
      <div v-if="this.active === 0">
        <div>
          <el-select v-model="value" @change="switchTrain()" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="choiceListClass">
          <el-radio class="choiceList" v-for="(item,index) in fileList" :key="index" v-model="trainDataRadio" border
            :label="index" @change="radioClick(item)"> {{item.name}}</el-radio>
        </div>
      </div>
      <!-- 选择标签数据 -->
      <div v-if="this.active === 1">
        <div>
          <el-select v-model="values" @change="labelClock()" placeholder="请选择">
            <el-option v-for="item in labelList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="labelBox">
          <div class="labelBoxDiv">
            <el-tree :data="TreeDatalist" :props="TreeDatalist" :default-expand-all="true"></el-tree>
          </div>
          <div class="labelBoxDiv">
            <el-tree :data="TreeDatalist" :props="TreeDatalist" :default-expand-all="true"></el-tree>
          </div>
          <div class="labelBoxDiv">
            <el-tree :data="TreeDatalist" :props="TreeDatalist" :default-expand-all="true"></el-tree>
          </div>
        </div>
      </div>
      <!-- 标注文档生成训练数据 -->
      <div class="modelText" v-if="this.active >= 2">
        <h3 style="padding: 15px 20px 10px 20px;">
          <span style="font-weight: 1000; text-align:center; display: block;">{{current.title}}</span>
          <span style="float: right;">
            <!-- <el-button size="mini" round>导出实体数据</el-button> -->
            <!-- <el-button size="mini" round>导出事件数据</el-button> -->
            <el-button @click="exportJson" size="mini" type="primary">导出json数据</el-button>
            <!-- <el-button type="danger" size="mini" round>清空实体标签</el-button> -->
            <!-- <el-button type="danger" size="mini" round>清空事件标签</el-button> -->
            <!-- <u style="font-size:12px; color:#ccc;">选择对应文字添加标签</u> -->
          </span>
        </h3>
        <div v-if="this.active >= 2" style="height: calc( 100% - 50px ); width: 100%;">
          <EntityLabelTool :dataObj="current.data"></EntityLabelTool>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// 模拟本页面所有数据
import treedata from "@/assets/json/treedata.json";
// 引用文档批注组件
import EntityLabelTool from "@/common/entityLabelTool";
export default {
  components: {
    EntityLabelTool,
  },
  mounted () {
    // 调用默认选择第一个
    this.switchTrain(0)
  },
  data () {
    return {
      // 防止重复提交
      setTimeoutSum: true,
      // 第一步radio是否选中
      trainDataRadio: null,
      // 下一步/提交按钮是否展示
      butShow: false,
      // 上一步是否显示
      lastStep: true,
      // 当前步骤条下标
      active: 0,
      // 步骤一下拉列表
      options: [],
      // 步骤二下拉列表
      labelList: [],
      // 步骤一下拉默选
      value: '',
      // 步骤二下拉默选
      values: '',
      // 训练数据列表
      fileList: [],
      // 标签数据列表
      TreeDatalist: [],
      // 文章内容、标题
      current: {
        title: "2020年美国第1次军事演习报道",
        data: {
          content: "#测试",
        },
      },
      aaa: [55, 66]
    }
  },
  created () {
    this.getdata()
    // 所有模拟数据
    console.log(treedata)
    // 步骤一下拉列表赋值
    this.value = treedata.oneSelect[0].value
    this.options = treedata.oneSelect
    // 步骤二下拉列表赋值
    this.values = treedata.twoSelect[0].value
    this.labelList = treedata.twoSelect
    // 步骤二 数据赋值
    this.TreeDatalist = treedata.twoSelectData
    console.log(this.aa(...this.aaa))
    localStorage.removeItem('exportJson');
  },
  methods: {
    aa (y, x) {
      return y + x
    },
    // 存放数据倒数据库按钮
    lastUpdateView () {
      // dataB是向后台传的数据
      var _self = this
      let dataB = treedata
      _self.tAdapter.addEntityData({
        data: dataB
      }, function (d) {
        console.log(d)
      })
    },
    // 获取所有数据
    getdata () {
      var _self = this
      _self.tAdapter.getEntityData({
      }, function (d) {
        console.log(d)
      })
    },
    // 下一步按钮
    next () {
      this.getdata()
      if (this.active === 0 && this.trainDataRadio === null) {
        this.$message({
          message: '请选择文件',
        });
        return
      }
      this.active += 1
      if (this.active === 2) {
        this.butShow = true
      }
      if (this.active < 2 && this.active >= 0) {
        this.lastStep = false
      }
    },
    // 上一步按钮
    Last () {
      if (this.active >= 1) {
        this.active -= 1
        if (this.active > 1) {
          this.butShow = true
        } else {
          this.butShow = !this.butShow
        }
      }
      if (this.active === 0) {
        this.butShow = !this.butShow
        this.lastStep = !this.lastStep
      }
    },
    // 提交
    submit () {
      // sum=秒(修改整体生效)
      let sum = 10
      if (this.setTimeoutSum) {
        this.$message({
          message: '恭喜您，提交成功',
          type: 'success'
        });
        this.setTimeoutSum = false
        setTimeout(() => {
          this.setTimeoutSum = true
        }, sum + '000');
      } else {
        this.$message({
          message: sum + '秒内请勿重复提交'
        });
      }
    },
    // 步骤1选择文件列表切换
    switchTrain () {
      this.fileList = []
      this.trainDataRadio = null
      if (this.value === '选项1') {
        this.forData("海军", 100, 's9007')
      }
      if (this.value === '选项2') {
        this.forData("陆军", 200, 'n95')
      }
      if (this.value === '选项3') {
        this.forData("空军", 80, 'ak47')
      }
    },
    // 生成数据 名称 数量 编号
    forData (name, sum, num) {
      let data = []
      for (let i = 0; i < sum; i++) {
        data.push(
          {
            name: name + '训练数据' + num + i,
            checked: false
          },
        )
      }
      this.fileList = data
    },
    // 步骤一选择文件
    radioClick (item) {
      // this.current.title = item.name
      // console.log('您选择的文档是：', item.name)
    },
    // 步骤2选择标签
    labelClock () {
      if (this.values === '选项1') {
        this.TreeDatalist = treedata.twoSelectData
      }
      if (this.values === '选项2') {
        this.TreeDatalist = treedata.twoSelectDatas
      }
    },
    // 导出事件数据
    exportEventData () {
      var eventItems = this.$refs.labelToolItem.produceEventItems();
      var tData = this.$refs.labelToolItem.transferEventData(eventItems);
      var fileName = this.current.title + ".json"
    },
    // 导出数据
    exportJson () {
      // console.log('导出')
      // console.log(localStorage.getItem('exportJson'))
      let data = localStorage.getItem('exportJson')
      if (data !== null) {
        this.download(data)
      } else {
        this.$message({
          message: '请先标注'
        });
      }
    },
    // 下载标注json
    download (data) {
      if (!data) {
        return
      }
      let blob = new Blob([data])
      let fileName = data.name
      if ('download' in document.createElement('a')) { // 不是IE浏览器
        let url = window.URL.createObjectURL(blob)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        //设置下载文件的名字
        link.download = this.current.title
        link.click()
        document.body.removeChild(link) // 下载完成移除元素
        window.URL.revokeObjectURL(url) // 释放掉blob对象
      } else { // IE 10+
        window.navigator.msSaveBlob(blob, fileName)
      }
    }
  },
};

</script>

<style scoped>
* {
  box-sizing: border-box;
}
.stepsClass {
  width: 100%;
}
.choiceClass {
  width: 100%;
  height: 600px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.choiceList {
  width: 200px;
  margin-bottom: 5px;
  margin-left: 0px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.choiceListClass {
  margin-top: 10px;
  height: 500px;
  overflow-y: scroll;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 10px;
}
.el-radio.is-bordered + .el-radio.is-bordered {
  margin-left: 0px;
}
.labelBox {
  width: 100%;
  height: 400px;
  display: flex;
}
.labelBoxDiv {
  flex: 1;
  margin: 10px 10px 0 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 15px;
  overflow-y: scroll;
}
.but {
  margin: 20px;
}
.butSpan {
  padding-left: 14px;
}
::v-deep .el-date-editor .el-range-separator {
  width: 30px !important;
}

.documentArea,
.documentList {
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
}
.modelText {
  height: 100%;
  width: 100%;
}
.aaa {
  padding: 20px;
  margin-left: 60px;
}
.del {
  position: fixed;
  right: 50px;
  top: 50px;
  opacity: 0.5;
}
</style>
