<!-- 侧边栏 -->
<template>
  <div class='sidebar'>
    <div class="sidebarBox" v-if="sidebarFlag">
      <div class="closeBtn" @click="closeSidebar()"><img src="../assets/image/关闭.png" alt=""></div>
      <div class="sideTitle">
        <div>
          <img src="../assets/image/左.png" alt="">
          {{dataInfo.title}}
          <img src="../assets/image/右.png" alt="">
        </div>
      </div>
      <div class="tabBtn">
        <ul class="tabUl">
          <li v-for="(item,index) in tabList" :key="index">
            <div @click="clickTab(item)"
              :style="item.status ? {backgroundImage:'url('+item.backgroundUrl+')'} :{backgroundImage:'url('+item.backgroundUrlPre+')'}">
              {{item.tabName}}</div>
          </li>
        </ul>
        <template v-if="tabList[0].status">
          <div class="tableDiv">
            <el-table class="tableTransparent" :data="dataInfo.ChineseFundedProjects" border
              style="border: 0.5px solid #00FFFF;">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="militaryRegion" label="项目名称"></el-table-column>
              <el-table-column prop="resident" label="参与中国企业名称"></el-table-column>
            </el-table>
          </div>
        </template>
        <template v-if="tabList[1].status">
          <div class="tableDiv">
            <ul class="timeList timeList_3">
              <li class="timeItem" v-for="(item,index) in dataInfo.itemArray_3" :key="index">
                <p>
                  <span class="timeSpan">{{index+1}}</span>
                  <span style="margin-left:5px;color:#fff">{{item.country}}</span>
                  <span class="searchBtn" style="float:right;margin-top:-5px" v-if="!item.flag"
                    @click="openEvent(item)">
                    <img src="../assets/image/zhankai.png" alt="" class="searchIcn">
                    展开
                  </span>
                  <span class="searchBtn" style="float:right;margin-top:-5px" v-if="item.flag"
                    @click="closeEvent(item)">
                    <img src="../assets/image/shouqi.png" alt="" class="searchIcn">
                    收起
                  </span>
                </p>
                <div v-if=" item.openStatus">
                  <p v-for="(items,index) in item.data" :key="index" class="searchp">{{items.title}}</p>
                </div>
              </li>
            </ul>
          </div>
        </template>
        <template v-if="tabList[2].status">
          <div style="display:inline-flex;width: 90%;margin:0 5%;">
            <input type="text" placeholder="请输入相关国家" class="searchInput">
            <span class="searchSpan"><img src="../assets/image/搜索.png" alt="" class="searchIcn">搜索</span>
          </div>
          <div class="tableDiv">
            <p style="font-size:14px;margin-left:10px;">{{dataInfo.titleEcharts}}</p>
            <PieChart :dataObj="dataInfo.dataObjOne" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import DataTable from "../common/dataTable";
  import PieChart from "../common/chart/pieChart";

  export default {
    name: "sidebar",
    components: {
      DataTable,
      PieChart,
    },
    data() {
      return {
        bottomBarId: "",
        title: "",
        titleValue: "",
        status: 2,
          tabList: [{
            id: 1,
            tabName: '中资项目',
            status: true,
            backgroundUrlPre: require("../assets/image/军事力量未选中.png"),
            backgroundUrl: require("../assets/image/军事力量bg.png")
          },
          {
            id: 2,
            tabName: '影响因素',
            status: false,
            backgroundUrlPre: require("../assets/image/军事力量未选中.png"),
            backgroundUrl: require("../assets/image/军事力量bg.png")
          },
          {
            id: 3,
            tabName: '舆情指数',
            status: false,
            backgroundUrlPre: require("../assets/image/军事力量未选中.png"),
            backgroundUrl: require("../assets/image/军事力量bg.png")
          }
         ],
        dataInfo: {
          title: "",
          titleEcharts: "",
          tableData: [{
            militaryRegion: '',
            resident: '',
          }, ],
          ChineseFundedProjects: [
          ],
          influenceFactor: [],
          PublicOpinionIndex: [],
          dataObjOne: {
           
          },
          itemArray_3: [
          ],

        },
        bottomBarId: "",
        status: 2,
        sidebarFlag: true,
      }
    },
    props: {

    },
    computed: {},
    watch: {},
    mounted() {
      this.titleValue = this.title;
      var data = this.dataInfo;
      this.$nextTick(function () {
        var tData = this.dataObj || this.dataInfo;
        console.log(tData, 33333)
        this.updateData(tData);
      });
    },
    methods: {
      updateData(data) {
        this.dataInfo = data
      },
      closeSidebar() {
        this.sidebarFlag = false;
      },
      clickTab(i) {
        this.tabList.forEach(item => {
          item.status = false
        })
        i.status = true
      },
      openEvent(i) {
        this.dataInfo.itemArray_3.forEach(item => {
          item.openStatus = false
        })
        this.$set(i, 'openStatus', true)
        this.$set(i, 'flag', true)

      },
      closeEvent(i) {
        this.$set(i, 'openStatus', false)
        this.$set(i, 'flag', false)
      },

    },
    props: {
      dataObj: Object,
    },
    created() {

    }
  }

</script>
<style scoped>
  .sidebarBox {
    /* width: 25%; */
    height: 80%;
    background-image: url("../assets/image/列表背景.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #00FFFF;
    font-size: 14px;
    cursor: pointer;
  }

  .timeList {
    position: relative;
    height: 80%;
    overflow-y: scroll;
    overflow-x: hidden;
    clear: both;
  }

  .timeList::-webkit-scrollbar {
    display: none;
  }

  .timeItem {
    width: 98%;
    padding: 10px 20px;
    margin: 10px 5px;
    border: 1px solid #017298;
    background: rgba(0, 164, 202, 0.3);
    box-sizing: border-box;
  }

  .closeBtn {
    float: right;
    margin: 15px;
  }

  .sideTitle {
    float: left;
    margin: 6px 80px 10px;
    width: 60%;
    text-align: center;
    white-space: nowrap;

  }

  .sideTitle img {
    width: 20px;
  }

  .sideTitle div {
    text-align: center;
    color: #ec9c45;
    font-weight: 800;
    font-size: 30px;
    background-image: -webkit-linear-gradient(top, #e4c072, #ec9c45);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .tableTransparent {}

  .tableTransparent /deep/ .el-table,
  .el-table__expanded-cell {
    background-color: transparent;
  }

  .tableTransparent /deep/ .el-table tr {
    background-color: transparent !important;
  }

  .tableTransparent>>>.el-table th {
    background-color: transparent !important;
  }

  .tableTransparent>>>.el-table tr:hover {
    background: transparent !important;
  }

  .tabUl {
    clear: both;
    display: flex;
    justify-content: space-between;
    margin: 0 60px;
  }

  .tabUl li {
    flex-grow: 2;
    text-align: center;
    width: 30px;
    margin: 10px;
    height: 30px;
    line-height: 30px;
    padding: 10px 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .tabUl li div {
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .tabBtn {
    /* width: 90%; */
    margin: 0 auto;
  }

  .searchInput {
    border: 1px solid #0299cd;
    background-color: rgba(0, 164, 202, 0.2);
    border-radius: 2px;
    font-size: 14px;
    padding-left: 10px;
    margin: 10px 11px;
    width: 74%;
    height: 30px;
    float: left;
    color: #00c0c8;
    white-space: nowrap;
  }
.searchInput::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #ccc;
}

.searchInput:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #ccc;
}

.searchInput::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #ccc;
}

.searchInput:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #ccc;
}
  .searchBtn {
    border: 1px solid #017298;
    background-color: rgba(0, 164, 202, 0.2);
    border-radius: 2px;
    margin: 10px 0;
    padding: 0 10px;
    /* width: 12%; */
    line-height: 30px;
    display: inline-block;
  }

  .searchSpan {
    border: 1px solid #017298;
    background-color: rgba(0, 164, 202, 0.2);
    border-radius: 2px;
    margin: 10px 0;
    padding: 0 10px;
    /* width:12%; */
    height: 30px;
    line-height: 30px;
    display: inline-block;
    white-space: nowrap;
  }

  .searchIcn {
    width: 10px;
    height: 10px;
    color: #00dce7;
    font-size: 14px;
    padding: 0 5px;
  }

  /deep/ .tableTransparent.el-table,
  /deep/ .el-table__expanded-cell {
    background-color: transparent !important;
    color: #00FFFF;
  }

  /deep/ .tableTransparent.el-table tr {
    background-color: transparent !important;
    color: #00FFFF;
  }

  /deep/ .tableTransparent.el-table th {
    background-color: transparent !important;
    border: 1px solid #00FFFF !important;
    color: #00FFFF;
  }

  /deep/ .tableTransparent.el-table tr:hover {
    background: transparent !important;
    color: #00FFFF;
  }

  /deep/ .tableTransparent.el-table,
  /deep/ .el-table__header-wrapper {
    background: transparent !important;
    color: #00FFFF;
  }

  .tableDiv {
    padding-bottom: 50px;
  }
 /deep/ .el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: rgba(187, 187, 216, 0.2) !important;
}
/deep/ .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid #00FFFF;
}
/deep/ .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #00FFFF;
}
/deep/ .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #00FFFF !important;
}
/deep/ .el-table--border th, .el-table__fixed-right-patch {
    border-bottom: 1px solid #00FFFF;
}
.el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
  border-color: #00FFFF; 
}
.el-table--border::after, .el-table--group::after, .el-table::before{
  background-color: #00FFFF;
}
/deep/ .el-input__inner::placeholder {
        color: #017298;
        text-align:center;
}
</style>
