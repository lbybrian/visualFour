<!-- 侧边栏 -->
<template>
<div class="hotEvents">

  <div class="sidebarLeft" @click="getShow"></div>
  <div class="sidebarOne" v-if="hotStatus">
    <div class="sidebarBox" v-if="sidebarFlag">
      <div class="closeBtn" @click="closeSidebar()">
        <img src="../assets/image/关闭.png" alt="" />
      </div>
      <div class="sideTitle">
        <div>
          <img src="../assets/image/左.png" alt="" />
          {{ dataInfo.title }}
          <img src="../assets/image/右.png" alt="" />
        </div>
      </div>
      <ul class="timeList timeList_3" v-if="status == 3">
        <li
          class="timeItem"
          v-for="(item, index) in dataInfo.itemArray_3"
          :key="index"
        >
          <p>
            <span class="timeSpanOne">{{ index + 1 }}</span>
            <span style="margin-left: 5px; color: #fff">{{
              item.country
            }}</span>
            <span
              class="searchBtn"
              style="float: right; margin-top: -5px"
              v-if="item.openStatus"
              @click="openEvent(item, this)"
            >
              <img src="../assets/image/zhankai.png" alt="" class="searchIcn" />
              更多
            </span>
            <span
              class="searchBtn"
              style="float: right; margin-top: -5px"
              v-if="item.openStatus == false"
              @click="closeEvent(item, this)"
            >
              <img src="../assets/image/shouqi.png" alt="" class="searchIcn" />
              收起
            </span>
          </p>
          <div v-if="item.flag">
            <p v-for="(items, index) in item.data" :key="index" class="searchp">
              {{ items.title }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "sidebar",
  components: {},
  data() {
    return {
      dataInfo: {
        title: "",
        itemArray_3: [
              {
                id: "1",
                country: "缅甸军方政变",
                openStatus: true,
                flag: false,
                data: [
                  {
                    title: " 2020年11月8日缅甸大选，民盟胜出继续执政。",
                  },
                  {
                    title:
                      " 2020年12月10日，缅甸选举委员会在拒绝了缅军要求「复核投票」的请求，斥责其为「非法。",
                  },
                  {
                    title:
                      " 2020年12月23日缅甸军方自行发布了“大选舞弊”的调查报告。",
                  },
                  {
                    title:
                      " 2020年1月14日，缅甸人民院议长迪昆妙拒绝了军方有关举行大选舞弊特别会议的请求。",
                  },
                  {
                    title: " 2021年1月26日，缅甸军方举办发布会质疑选举舞弊。",
                  },
                ],
              },
              {
                id: "2",
                country: "日本决定核废水排放入海",
                openStatus: true,
                flag: false,
                data: [
                   {
                    title:
                      " 2020年1月14日，缅甸人民院议长迪昆妙拒绝了军方有关举行大选舞弊特别会议的请求。",
                  },
                  {
                    title: " 2021年1月26日，缅甸军方举办发布会质疑选举舞弊。",
                  }
                ],
              },
              {
                id: "3",
                country: "国外新冠疫苗安全性争议",
                openStatus: true,
              },
              {
                id: "4",
                country: "美航母群入南海",
                openStatus: true,
              },
              {
                id: "5",
                country: "乌克兰东部大规模交火",
                openStatus: true,
              },
              {
                id: "6",
                country: "新疆棉花事件",
                openStatus: true,
              },
              {
                id: "7",
                country: "日本决定核废水排放入海",
                openStatus: true,
              },
              {
                id: "8",
                country: "美国欲重返伊核协议",
                openStatus: true,
              },
              {
                id: "9",
                country: "国外疫情恶化",
                openStatus: true,
              },
              {
                id: "10",
                country: "英国“脱欧”后续影响",
                openStatus: true,
              },
            ]
      },
      status: 3,
      sidebarFlag: true,
      hotStatus: false
    };
  },
  computed: {},
  watch: {},
  mounted() {
    var data = this.dataInfo;
    this.$nextTick(function () {
      var tData = this.dataObj || this.dataInfo;
      this.updateData(tData);
    });
  },
  methods: {
    updateData(data) {
      this.dataInfo = data;
    },
    closeSidebar() {
      this.sidebarFlag = false;
    },
    openEvent(item) {
      var openData = this.dataInfo.itemArray_3;
      for (let i = 0; i < openData.length; i++) {
        if (item.id == openData[i].id) {
          openData[i].openStatus = false;
          openData[i].flag = true;
        }
      }
    },
    closeEvent(item) {
      var openData = this.dataInfo.itemArray_3;
      for (let i = 0; i < openData.length; i++) {
        if (item.id == openData[i].id) {
          openData[i].openStatus = true;
          openData[i].flag = false;
        }
      }
    },
    getShow() {
      this.hotStatus = !this.hotStatus;
    }
  },
  props: {
    dataObj: Object,
  },
  created() {},
};
</script>
<style scoped>
.hotEvents{
  display: flex;
  width: 100%;
  position: absolute;
  z-index: 999;
}
.sidebarOne{
   width: 25%;
}
.sidebarBox {
  width: 100%;
  height: 100%;
  background-image: url("../assets/image/列表背景.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #00ffff;
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

button {
  background: rgba(0, 164, 202, 0.3);
  border-style: none;
  color: #00ffff;
  border-radius: 2px;
  font-size: 12px;
  margin-right: 10px;
  position: absolute;
  right: 0;
  display: inline-block;
  width: 50px;
  margin-top: 4px;
}

.iconRed {
  color: red;
  font-size: 16px;
  font-weight: 800;
}

ul li:first-child .timeSpan {
  padding: 1px 4px;
  border-radius: 2px;
  background-image: url(../assets/image/bg1.png);
  color: #fff;
}

ul li:nth-child(2) .timeSpan {
  padding: 1px 4px;
  background-image: url(../assets/image/bg2.png);
  color: #fff;
  border-radius: 2px;
}

ul li:nth-child(3) .timeSpan {
  padding: 1px 4px;
  background-image: url(../assets/image/bg3.png);
  color: #fff;
  border-radius: 2px;
}

.timeSpan {
  padding: 1px 4px;
  background-image: url(../assets/image/bg4.png);
  border-radius: 2px;
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
  font-size: 26px;
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
  width: 74%;
  height: 30px;
  /* float: left; */
  color: #00c0c8;
  white-space: nowrap;
}

.searchSpan {
  border: 1px solid #017298;
  background-color: rgba(0, 164, 202, 0.2);
  border-radius: 2px;
  margin: 10px 0;
  padding: 0 10px;
  /* width: 12%; */
  height: 30px;
  line-height: 30px;
  display: inline-block;
  white-space: nowrap;
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

.searchSpan .searchIcn {
  width: 10px;
  height: 10px;
  color: #00dce7;
  font-size: 14px;
  padding: 0 5px;
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

.searchp {
  margin-top: 5px;
  width: 98%;
  padding: 10px 20px;
  margin: 10px 5px;
  border: 1px solid #017298;
  background: rgba(0, 164, 202, 0.3);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.sidebarLeft{
  border: 1px solid red;
  width: 75%;
  height: 500px !important;
}
</style>
