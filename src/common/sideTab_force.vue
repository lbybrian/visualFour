<!-- 侧边栏 -->
<template>
  <div class='sidebar'>
    <div class="sidebarBox" v-if="sidebarFlag">
      <div class="closeBtn" @click="closeSidebar()"><img src="../assets/image/关闭.png" alt=""></div>
      <div class="sideTitle">
        <div>
          <img src="../assets/image/左.png" alt="">
          缅甸军事力量数据
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
            <el-table class="tableTransparent" :data="dataInfo.landForceData" border
              style="border: 0.5px solid #00FFFF;" highlight-current-row>
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="militaryRegion" label="军区名称"></el-table-column>
              <el-table-column prop="resident" label="驻地"></el-table-column>
            </el-table>
          </div>
        </template>
        <template v-if="tabList[1].status">
          <div class="tableDiv">
            <el-table class="tableTransparent" :data="dataInfo.navy" border style="border: 0.5px solid #00FFFF;">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="militaryRegion" label="军区名称"></el-table-column>
              <el-table-column prop="resident" label="驻地"></el-table-column>
            </el-table>
          </div>
        </template>
        <template v-if="tabList[2].status">
          <div class="tableDiv">
            <el-table class="tableTransparent" :data="dataInfo.airForce" border style="border: 0.5px solid #00FFFF;">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="militaryRegion" label="军区名称"></el-table-column>
              <el-table-column prop="resident" label="驻地"></el-table-column>
            </el-table>
          </div>
        </template>
        <!-- <DataTable :dataObj="dataInfo.dataObj" @button-click="dealButtonClick"></DataTable> -->
      </div>
    </div>
  </div>
</template>

<script>
  import DataTable from "../common/dataTable";

  export default {
    name: "sidebar",
    components: {
      DataTable,
    },
    data() {
      return {
        bottomBarId: "",
        status: 2,
        tabList: [{
            id: 1,
            tabName: '陆军',
            status: true,
            backgroundUrlPre: require("../assets/image/军事力量未选中.png"),
            backgroundUrl: require("../assets/image/军事力量bg.png")
          },
          {
            id: 2,
            tabName: '海军',
            status: false,
            backgroundUrlPre: require("../assets/image/军事力量未选中.png"),
            backgroundUrl: require("../assets/image/军事力量bg.png")
          },
          {
            id: 3,
            tabName: '空军',
            status: false,
            backgroundUrlPre: require("../assets/image/军事力量未选中.png"),
            backgroundUrl: require("../assets/image/军事力量bg.png")
          }
        ],
        dataInfo: {
          tableData: [{
            militaryRegion: '',
            resident: '',
          }, ],
          landForceData: [{
              id: 1,
              militaryRegion: '中央军区',
              resident: '曼德勒',
            },
            {
              id: 2,
              militaryRegion: '西北军区',
              resident: '望濑',
            },
            {
              id: 3,
              militaryRegion: '北部军区',
              resident: '密支那',
            }
          ],
          navy: [{
              id: 1,
              militaryRegion: '海军总部',
              resident: '内比都',
            },
            {
              id: 2,
              militaryRegion: '战略海军司令部',
              resident: '内比都',
            },
            {
              id: 3,
              militaryRegion: '海军训练司令部',
              resident: '赛可依',
            },
          ],
          airForce: [{
              id: 1,
              militaryRegion: '空军司令部',
              resident: '内比都',
            },
            {
              id: 2,
              militaryRegion: '飞机生产和维修基地司令部',
              resident: '敏加拉洞',
            },
            {
              id: 3,
              militaryRegion: '地面训练基地',
              resident: '密铁拉',
            },
          ]

        },
        bottomBarId: "",
        status: 2,
        sidebarFlag: true,
      }
    },
    computed: {},
    watch: {},
    mounted() {
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
      }

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
    height: 450px;
    background-image: url("../assets/image/列表背景.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #00FFFF;
    font-size: 14px;
    cursor: pointer;
    position: absolute;
    right: 0;
    z-index: 1;
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

  .searchInput {
    border: 1px solid #0299cd;
    background-color: rgba(0, 164, 202, 0.2);
    border-radius: 2px;
    font-size: 14px;
    padding-left: 10px;
    margin: 10px 11px;
    width: 77%;
    height: 30px;
    float: left;
    color: #00c0c8;
  }

  .searchSpan {
    border: 1px solid #017298;
    background-color: rgba(0, 164, 202, 0.2);
    border-radius: 2px;
    margin: 10px 0;
    padding: 0 10px;
    width: 12%;
    height: 30px;
    line-height: 30px;
    display: inline-block;

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
    width: 90%;
    margin: 0 auto;
  }

  .tableDiv {
    padding-bottom: 50px;
  }

  /deep/ .tableTransparent.el-table.el-table--border th,
  .el-table__fixed-right-patch {
    border-bottom: 1px solid #00FFFF !important;
  }

  /deep/ .tableTransparent.el-table.el-table--border td,
  .el-table--border th,
  .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid #00FFFF !important;
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
