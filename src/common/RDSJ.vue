<!-- 侧边栏 -->
<template>
  <div class='sidebar1111' style="z-index: 777;position: absolute;">

    <div class="sidebarBoxOne" v-if="sidebarFlag">

      <div class="timeLine-box" style="height:70vh; overflow:auto" v-show="rdsjStatus">
        <el-timeline>
          <el-timeline-item v-for="(item,index) in timeLineData" :key="index" :timestamp="item.time"
            :class="index % 2 != 0 ? 'odd-item' : ''" placement="top" type='primary'>
            <el-card style="background: rgba(187, 187, 216, 0.2);border: none;color: #c0ebff;">
              <!-- <h4>{{item.title}}</h4> -->
              <p>{{item.con}}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>

    </div>
    <!-- <img src="../assets/image/one_3.png" alt="" class="imgRdsj" @click="showLeft"> -->
    <div class="imgRdsj" @click="showLeft"></div>
    <img @click="$emit('clickImage')" style="width:50%;height: 100%; float: left;" src="../assets/image/free.png" />
    <div class="sidebarBox" v-if="sidebarFlag" style="    color: #606266;">
      <div class="closeBtn" @click="closeSidebar()"><img src="../assets/image/关闭.png" alt=""></div>
      <div class="sideTitle">
        <div>
          <img src="../assets/image/左.png" alt="">
          缅甸政变各方表态
          <img src="../assets/image/右.png" alt="">
        </div>
      </div>

      <div style="width:100%;">
        <input type="text" name="" id="" placeholder="请输入相关国家" class="searchInput">
        <span class="searchSpan"><img src="../assets/image/搜索.png" alt="" class="searchIcn">搜索</span>
      </div>
      <ul class="timeList timeList_3" >
        <li class="timeItem" v-for="(item,index) in dataInfo.itemArray_3" :key="index">
          <p>
            <span class="timeSpanOne">{{index+1}}</span>
            <span style="margin-left:5px;color:#fff">{{item.country}}</span>
            <span class="searchBtn" style="float:right;margin-top:-5px" v-if="item.openStatus"
              @click="openEvent(item,this)">
              <img src="../assets/image/zhankai.png" alt="" class="searchIcn">
              展开
            </span>
            <span class="searchBtn" style="float:right;margin-top:-5px" v-if="item.openStatus == false"
              @click="closeEvent(item,this)">
              <img src="../assets/image/shouqi.png" alt="" class="searchIcn">
              收起
            </span>
          </p>
          <div v-if=" item.flag">
            <p v-for="(items,index) in item.data" :key="index" class="searchp">{{items.title}}</p>
          </div>
        </li>
      </ul>

    </div>

  </div>
 
</template>

<script>
  import bus from "./eventBus";
  export default {
    name: "sidebar",
    components: {},
    data() {
      return {
        tableData: [{
            id: '1',
            name: '美国',
            title: '美国正式认定缅甸军方“政变”',
            desc: "据法新社华盛顿消息，当地时间2月2日，美国正式认定缅甸军方发动了“政变”，并暂停给予缅甸政府的援助拨款。美国有线电视新闻网（CNN）称，在缅甸政局突变发生14个小时内，美国政府就缅甸事态发了三份声明。第一份：要求缅甸军方“纠正行为”，释放所有被扣押者。第二份：谴责缅甸军方行为是“对民主化和法治的直接攻击。第三份：无论民主在哪里受到攻击，美国都将站出来捍卫民主。",
            showSign: false,
          },
          {
            id: '2',
            name: 'G7',
            title: '七国集团定性缅甸“政变” 敦促军方放人',

            desc: "路透社2月3日消息，七国集团周三谴责缅甸军方接管国家权力，并表示对昂山素季等被拘领导人的境况深表关切。七国集团发表声明称：“我们，加拿大、法国、德国、意大利、日本、英国和美国的七国集团外长以及欧盟高级代表在一份声明中表态，我们一致谴责缅甸政变。”声明指出：“我们对拘留政治领导人和民间社会活动家，包括缅甸总统温敏和国务资政昂山素季，以及针对媒体的行为深表关切。”",
            showSign: false,

          },
          {
            id: '3',
            name: '欧盟',
            title: '欧盟高官指责中俄阻挠对缅进行制裁',

            desc: '据路透社11日报道，欧盟外交与安全政策高级代表博雷利当天宣称，俄罗斯和中国正在阻碍国际社会对缅甸“军事政变”所作出的一致反应，并称如果缅甸恢复民主，欧盟可能会对这个国家提供更多的经济刺激。博雷利此番言论被一些西方媒体形容为“对中俄的点名批评”。在美国和欧盟对缅甸军方实施制裁措施后，西方国家就一直炒作“中国和俄罗斯不支持制裁”。中国和俄罗斯外交部本月早些时候均已就有关言论进行驳斥。中方认为，国际社会应在坚持不干涉内政这一国际关系基本准则前提下，为缅国内政治和解营造良好环境，而不是越俎代庖、任意施压。俄罗斯表示，“一贯反对个别国家绕开联合国安理会实施单方面制裁的做法。”',
            showSign: false,

          },
          {
            id: '4',
            name: '俄罗斯',
            title: '俄罗斯加强对缅甸政变军方军售',

            desc: '分析人士表示，俄罗斯在增加对缅甸军方的军售，并坚定地支持缅甸政变领导人敏昂莱将军。而这一同盟关系将进一步推动俄罗斯通过未来武器销售强化在东南亚的外交政策野心。同时，至少10个缅甸少数民族反叛组织的领导人宣布支持缅甸的反政变运动。简氏集团在曼谷的安全分析员安东尼·戴维斯表示，莫斯科希望在促进与东盟这个区域经济组织关系的同时，“很显然”希望通过武器交易加强同缅甸军方的关系，主要是向空军，其次是向陆军军售。',
            showSign: false,

          }
        ],
        timeLineData: [

          {
            title: '缅甸大选，民盟胜出继续执政。',
            time: '2020年11月8日',
            con: '缅甸大选，民盟胜出继续执政。'
          },
          {
            title: '缅甸选举委员会在拒绝了缅军要求「复核投票」的请求，斥责其为「非法」',
            time: '2020年12月10日',
            con: '缅甸选举委员会在拒绝了缅军要求「复核投票」的请求，斥责其为「非法」'
          },
          {
            title: '缅甸军方自行发布了“大选舞弊”的调查报告。',
            time: '2020年12月23日',
            con: '缅甸军方自行发布了“大选舞弊”的调查报告。'
          },
          {
            title: '缅甸人民院议长迪昆妙拒绝了军方有关举行大选舞弊特别会议的请求。',
            time: '2020年1月14日',
            con: '缅甸人民院议长迪昆妙拒绝了军方有关举行大选舞弊特别会议的请求。'
          },
          {
            title: '。',
            time: '2021年1月26日',
            con: '缅甸军方举办发布会质疑选举舞弊。'
          }
        ],
        dataInfo: {
          "itemArray_3": [{
                        "id": "1",
                        "country": "美国",
                        "openStatus": true,
                        "flag": false,
                        "data": [{
                            "title": " 据法新社华盛顿消息，当地时间2月2日，美国正式认定缅甸军方发动了“政变”，并暂停给予缅甸政府的援助拨款。美国有线电视新闻网（CNN）称，在缅甸政局突变发生14个小时内，美国政府就缅甸事态发了三份声明。第一份：要求缅甸军方“纠正行为”，释放所有被扣押者。第二份：谴责缅甸军方行为是“对民主化和法治的直接攻击。第三份：无论民主在哪里受到攻击，美国都将站出来捍卫民主。"
                          }
                        ]
                    },
                    {
                        "id": "2",
                        "country": "G7",
                        "openStatus": true,
                        "flag": false,
                        "data": [{
                            "title": " 路透社2月3日消息，七国集团周三谴责缅甸军方接管国家权力，并表示对昂山素季等被拘领导人的境况深表关切。七国集团发表声明称：“我们，加拿大、法国、德国、意大利、日本、英国和美国的七国集团外长以及欧盟高级代表在一份声明中表态，我们一致谴责缅甸政变。”声明指出：“我们对拘留政治领导人和民间社会活动家，包括缅甸总统温敏和国务资政昂山素季，以及针对媒体的行为深表关切。”"
                          }
                        ]
                    },
                    {
                        "id": "3",
                        "country": "欧盟",
                        "openStatus": true,
                        "flag": false,
                        "data": [{
                            "title": " 据路透社11日报道，欧盟外交与安全政策高级代表博雷利当天宣称，俄罗斯和中国正在阻碍国际社会对缅甸“军事政变”所作出的一致反应，并称如果缅甸恢复民主，欧盟可能会对这个国家提供更多的经济刺激。博雷利此番言论被一些西方媒体形容为“对中俄的点名批评”。在美国和欧盟对缅甸军方实施制裁措施后，西方国家就一直炒作“中国和俄罗斯不支持制裁”。中国和俄罗斯外交部本月早些时候均已就有关言论进行驳斥。中方认为，国际社会应在坚持不干涉内政这一国际关系基本准则前提下，为缅国内政治和解营造良好环境，而不是越俎代庖、任意施压。俄罗斯表示，“一贯反对个别国家绕开联合国安理会实施单方面制裁的做法。"
                          }
                        ]
                    },
                    {
                        "id": "4",
                        "country": "俄罗斯",
                        "openStatus": true,
                        "flag": false,
                        "data": [{
                            "title": " 分析人士表示，俄罗斯在增加对缅甸军方的军售，并坚定地支持缅甸政变领导人敏昂莱将军。而这一同盟关系将进一步推动俄罗斯通过未来武器销售强化在东南亚的外交政策野心。同时，至少10个缅甸少数民族反叛组织的领导人宣布支持缅甸的反政变运动。简氏集团在曼谷的安全分析员安东尼·戴维斯表示，莫斯科希望在促进与东盟这个区域经济组织关系的同时，“很显然”希望通过武器交易加强同缅甸军方的关系，主要是向空军，其次是向陆军军售。"
                          }
                        ]
                    }
                ]
        },
        bottomBarId: "",
        status: 2,
        sidebarFlag: true,
        rdsjStatus: false
      }
    },
    computed: {},
    watch: {},
    mounted() {},
    methods: {
      showDetail(id) {
        this.tableData.forEach(a => {
          if (a.id === id) {
            a.showSign = !a.showSign
          }
        })
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
      showLeft() {
         this.rdsjStatus = !this.rdsjStatus;
      }

    },
    props: {},
    created() {

    }
  }

</script>
<style scoped>
  .sidebar1111 {
    width: 100%;
    /* background-image: url(../assets/image/bg.png); */
    /* float: left; */
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;
  }
  .sidebarBoxOne{
     float: left;
    width: 25%;
    height: 100%;
    background-image: url("../assets/image/列表背景.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #00FFFF;
    font-size: 14px;

    cursor: pointer;
  }
  .sidebarBox {
    float: right;
    width: 25%;
    height: 100%;
    background-image: url("../assets/image/列表背景.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #00FFFF;
    font-size: 14px;

    cursor: pointer;
  }
.timeItem {
    width: 98%;
    padding: 10px 20px;
    margin: 10px 5px;
    border: 1px solid #017298;
    background: rgba(0, 164, 202, 0.3);
    box-sizing: border-box;
  }

  .tableList {
    background-image: url("../assets/image/列表背景.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border: 1px solid #017298;
    color: #ccc !important;
    position: relative;
    height: 80%;
    overflow-y: scroll;
    overflow-x: hidden;
    clear: both;

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
     color: #00dce7;
  }
  .searchSpan .searchIcn {
    width: 10px;
    height: 10px;
    color: #00dce7;
    font-size: 14px;
    padding: 0 5px;
  }
  .tableList::-webkit-scrollbar {
    display: none;
  }

  .tableTitle {
    width: 98%;
    padding: 10px 20px;
    margin: 10px 5px;
    border: 1px solid #017298;
    background: rgba(0, 164, 202, 0.3);
    box-sizing: border-box;
    color: #000;
  }

  button {
    background: rgba(0, 164, 202, 0.3);
    border-style: none;
    color: #00FFFF;
    border-radius: 2px;
    font-size: 12px;
    margin-right: 10px;
    /* position: absolute; */
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
    width: 72%;
    height: 30px;
    /* float: left; */
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
     color: #00dce7;

  }

  .searchIcn {
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
    color: #00e0ea;
  }
  .timeSpanOne{
    color: #00e0ea;
  }
  .imgRdsj {
    position: absolute;
    top: 100px;
    left: 602px;
    width: 107px;
    height: 56px;
    border: 2px solid red;
    border-radius: 20px;
   
  }

</style>
