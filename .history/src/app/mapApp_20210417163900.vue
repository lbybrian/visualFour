<template>
  <div style="" class="example">
    <div class="headerCont">
      <div class="topCon">
        <ul class="nav">
          <li 
          v-for="(item,index) in navList" 
          :key="index"
          :class="{active:navCurrent == index}"
          @click="addClass(index,$event),changeCurmb(item,'1'),navChangeStatus(item)"
          >{{item.name}}</li>
        </ul>
        <div class="weather">
          <img src="../assets/image/duoyun.png" />
          <span style="margin-left: 6px;">多云</span>
          <span style="margin-left: 6px;">20℃</span>
          <span style="margin-left: 12px;">2021-04-18 13:00:00</span>
        </div>
      </div>
      <div class="crumbs">
        <img src="../assets/image/dingwei.png" />
          <el-breadcrumb separator-class="el-icon-arrow-right">
          <slot  v-for="(d,n) in breadListIm" >
            <el-breadcrumb-item v-if="!!d.path" :to="{ path: d.path }">
              <span class="b_span" @click="tobreadCrumb(d,n)">{{ d.name || d }}</span>
              </el-breadcrumb-item>
            <el-breadcrumb-item v-else><span class="b_span" @click="tobreadCrumb(d,n)">{{ d.name || d }}</span></el-breadcrumb-item>
          </slot>
        </el-breadcrumb>
      </div>
    </div>
    <slot v-for="(item, index) in config">
      <div v-if="item.ref === 'item1' && item.isDisplay && dataObj[item.ref]" :state="item.ref" :index="index" :key="index" :class="'chartItem ' + item.ref">
        <DynamicItem :comName="dataObj[item.ref].comName" :title="dataObj[item.ref].title"
          :dataObj="dataObj[item.ref].dataObj" :ref="item.ref"></DynamicItem>
      </div>
      <div v-if="item.ref !== 'item1' && item.isDisplay  && dataObj[item.ref]" :state="item.ref" :index="index" :key="index" :class="'chartItem ' + item.ref">
        <DynamicItem :comName="dataObj[item.ref].comName" :title="dataObj[item.ref].title"
          :dataObj="dataObj[item.ref].dataObj" :ref="item.ref"></DynamicItem>
      </div>
    </slot>
    <div class="bottombar">
      <div class="bottomBox" :style="bottomShow != 1 ? {backgroundImage:'url('+background_5+')'} :{backgroundImage:'url('+background_3+')'}">
          <ul class="bottomUl" :style="bottomShow != 1 ? {marginLeft: '18%',width: '64%'} :{marginLeft: '31%',width: '38%'}">
              <li class="buttomItem" v-for="(item,index) in buttonList" :key="index" @click="selectBar(item),changeCurmb(item,'2')" :style="bottomShow != 2 ? {width:'26%'} :{width:'33%'}">
                  <div class="buttonDiv" :style="!item.status ? {backgroundImage:'url('+item.backgroundUrlPre+')'} :{backgroundImage:'url('+item.backgroundUrl+')'}">
                      <p>
                        <img :src="!item.status ? item.iconSrcPre :item.iconSrc" alt="...">
                        <span :style="!item.status ? {color:'#00F6FF'}:{color:'#fff'}">{{item.name}}</span>
                      </p>
                  </div>
              </li>
          </ul>
      </div>
    </div>

    <div class="tankuang" v-if="sunCharts">图5旭日图弹框</div>

  </div>
</template>

<script>
  import DynamicItem from "@/common/dynamicItem";
  export default {
    components: {
      DynamicItem,
    },
    created() {
      this.updateConfig();
    },
    mounted() {
      // this.updateAppData();
      this.$nextTick(() => {
        this.updateComponentItems();
      });
      //底部控制显示
      if (this.bottomShow == 1) {
         this.buttonList = this.buttonList_3 ;
      }else if(this.bottomShow == 2) {
         this.buttonList = this.buttonList_5 ;
      }

    },
    data() {
      return {
        navCurrent: '0',
        bottomShow:'2',
        sunCharts: false,
        dataObj: {
           item1: { // 地图
            ref: "item1",
            comName: "",
            title: " ",
            dataObj: {
              
            },
          },
          item2_1: { // 侧边栏
            ref: "item2_1",
            comName: "",
            title: " ",
            dataObj: {
              
            },
          },
          item2_2: {
            ref: "item2_2",
            title: " ",
            dataObj: {
              
            },
          },
          item2_3: {
            ref: "item2_3",
            comName: "",
            title: " ",
            dataObj: {
              
            },
          },
          item3: {
            ref: "item3",
            comName: "",
            title: " ",
            dataObj: {
              
            },
          },
          item4: {
            ref: "item4",
            comName: "",
            title: " ",
            dataObj: {
              
            },
          },
          item7_1: {
            ref: "item7_1",
            comName: "",
            title: " ",
            dataObj: {
              
            },
          },
          item7_2: {
            ref: "item7_2",
            comName: "",
            title: " ",
            dataObj: {
              
            },
          },
          item7: {},
          item8_2: {
            ref: "item8_1",
            comName: "",
            title: " ",
            dataObj: {
              
            },
          },
          item8_2: {
            ref: "item8_2",
            comName: "",
            title: " ",
            dataObj: {
              
            },
          },
          item9: {
            ref: "item9",
            comName: "",
            title: " ",
            dataObj: {
              
            },
          },
          item10: {
            ref: "item10",
            comName: "",
            title: " ",
            dataObj: {
              
            },
          },
          item11: {
            ref: "item11",
            comName: "",
            title: " ",
            dataObj: {
              
            },
          },
          item12: {
            ref: "item12",
            comName: "",
            title: " ",
            dataObj: {
              
            },
          },
          item13: {
            ref: "item13",
            comName: "",
            title: " ",
            dataObj: {
              
            },
          },
        },
        state: "1",
        config: [{
            ref: "item1",
            state: ["1", "2_1", "2_2", "2_3", "3", "4", "5", "7_1", "7_2", "8_1", "8_2", "9", "10", "11", "12", "13"],
          },{
            ref: "item2_1",
            state:"2_1"
          },
          {
            ref: "item2_2",
            state:"2_2"
          },
           {
            ref: "item2_3",
            state:"2_3",
          },
          {
            ref: "item3",
            state: "3",
          },
          {
            ref: "item4",
            state: "4",
          },
          {
            ref: "item7_1",
            state: ["7_1", "7_2"],
          },
          {
            ref: "item7_2",
            state: ["7_1", "7_2"],
          },
          {
            ref: "item8_1",
            state:["8_1", "8_2"],
          },
          {
            ref: "item8_2",
            state: ["8_1", "8_2"],
          },
          {
            ref: "item9",
            state: "9",
          },
          {
            ref: "item10_1",
            state: "zz",
          },
          {
            ref: "item10_2",
            state: "zz",
          },
          {
            ref: "item11",
            state: "11",
          },
          {
            ref: "item12",
            state: "12",
          },
          {
            ref: "item13",
            state: "13",
          },
        ],
      navList:[
        {name:'政治',type:'zz'},
        {name:'军事',type:'js'},
        {name:'安全',type:'aq'},
        {name:'外交',type:'wj'},
        {name:'经济',type:'jj'},
        {name:'科技',type:'kj'},
      ],
      breadListIm:[
        {name:'全球政治'}
      ],
    //底部数据啊
    buttonList: [],
    buttonList_5:[
      {
          name:"国家风险评估",
          id:1,
          iconSrcPre:require("../assets/image/icon-国家风险评估-未选中.png"),
          iconSrc:require("../assets/image/icon-国家风险评估-选中.png"),
          backgroundUrlPre:require("../assets/image/button左-未选中.png"),
          backgroundUrl:require("../assets/image/button左-选中.png"),
          status:false,
          type:'fxpg'
      },
      {
          name:"国家力量数据",
          id:2,
          iconSrcPre:require("../assets/image/icon-国家力量-未选中.png"),
          iconSrc:require("../assets/image/icon-国家力量-选中.png"),
          backgroundUrlPre:require("../assets/image/button中间-未选中.png"),
          backgroundUrl:require("../assets/image/button中间-选中.png"),
          status:false,
          type:'llsj'
      },
      {
          name:"热点事件追踪",
          id:3,
          iconSrcPre:require("../assets/image/icon-热点事件-未选中.png"),
          iconSrc:require("../assets/image/icon-热点事件-选中.png"),
          backgroundUrlPre:require("../assets/image/button中间-未选中.png"),
          backgroundUrl:require("../assets/image/button中间-选中.png"),
          status:false,
          type:'sjzz'
      },
      {
          name:"重要人物画像",
          id:4,
          iconSrcPre:require("../assets/image/icon-重要人物-未选中.png"),
          iconSrc:require("../assets/image/icon-重要人物-选中.png"),
          backgroundUrlPre:require("../assets/image/button中间-未选中.png"),
          backgroundUrl:require("../assets/image/button中间-选中.png"),
          status:false,
          type:'rwhx'
      },
      {
          name:"一带一路态势",
          id:5,
          iconSrcPre:require("../assets/image/icon-一带一路-未选中.png"),
          iconSrc:require("../assets/image/icon-一带一路-选中.png"),
          backgroundUrlPre:require("../assets/image/button右-未选中.png"),
          backgroundUrl:require("../assets/image/button右-选中.png"),
          status:false,
          type:'ydyl'
      },
    ],
    buttonList_3: [
      {
        name: "五大热点区域",
        id: 6,
        iconSrcPre: require("../assets/image/icon-五大热点区域-未选中.png"),
        iconSrc: require("../assets/image/icon-五大热点区域-选中.png"),
        backgroundUrlPre: require("../assets/image/button左-未选中.png"),
        backgroundUrl: require("../assets/image/button左-选中.png"),
        status:false,
        type:'hotqy'
      },
      {
        name: "十大热点国家",
        id: 7,
        iconSrcPre: require("../assets/image/icon-十大热点国家-未选中.png"),
        iconSrc: require("../assets/image/icon-十大热点国家-选中.png"),
        backgroundUrlPre: require("../assets/image/button中间-未选中.png"),
        backgroundUrl: require("../assets/image/button中间-选中.png"),
        status:false,
        type:'hotgj'
      },
      {
        name: "十大热点事件",
        id: 8,
        iconSrcPre: require("../assets/image/icon-十大热点事件-未选中.png"),
        iconSrc: require("../assets/image/icon-十大热点事件-选中.png"),
        backgroundUrlPre: require("../assets/image/button右-未选中.png"),
        backgroundUrl: require("../assets/image/button右-选中.png"),
        status:false,
        type:'hotsj'
      },
    ],
    status:4,
    background_3:require("../assets/image/btbg.png"),
    background_5:require("../assets/image/bg线条.png"),
  };
   
  },
  methods: {
    updateConfig() {
      for (var i = 0; i < this.config.length; i++) {
        var item = this.config[i];
        if (
          item.state === this.state ||
          (item.state.indexOf && item.state.indexOf(this.state) !== -1)
        ) {
          item.isDisplay = true;
        } else {
          item.isDisplay = false;
        }
      }
    },
    switchState: function (state) {
      this.state = state || 1;
      this.updateConfig();
    },
    updateComponentItems() {
      for (var k in this.dataObj) {
        if (this.dataObj[k].comName) {
          var rValue = this.dataObj[k].ref;
          if (this.$refs[rValue]) {
            this.$refs[rValue][0].switchComponent(this.dataObj[k]);
          }
        }
      }
    },
    updateAppData: function () {
      var _self = this;
      adapter.getAppData({
          _id: "xxxx",
        },
        function (d) {
          _self.dataObj.title = d.data.title;
          d = d.data.list;
          for (var i = 0; i < d.length; i++) {
            var rValue = d[i].ref;
            if (_self.$refs[rValue]) {
              _self.dataObj[rValue] = d[i];
              _self.$refs[rValue].switchComponent(d[i]);
            }
          }
        }
      );
    },
    //接收导航标题
    itemChildren(v) {
      // console.log(v,9999999)
    },
    addClass(index,event){
      this.navCurrent = index;
      //获取点击对象
      var el = event.navCurrentTarget;
    },
    //底部方法
    selectBar(item){
      this.buttonList.forEach((i) =>{
        i.status = false
      })
      this.$set(item,'status',true)
      console.log(item.type)
      if(item.type == 'hotqy'){
        this.switchState('2_1')
      }else if(item.type == 'hotgj'){
        this.switchState('2_2')
      }else if(item.type == 'hotsj'){
        this.switchState('2_3')
      }else if(item.type == 'llsj'){
        this.switchState('10')
      }else if(item.type == 'sjzz'){
        this.switchState('7_1')
      }else if(item.type == 'rwhx'){
        this.switchState('8_1')
      }else if(item.type == 'ydyl'){
        this.switchState('11')
      }
      if(item.type == 'fxpg'){
        this.sunCharts = true;//旭日图
      }else{
        this.sunCharts = false;
      }
    },
    //nav点击
    navChangeStatus(val){
      console.log(val.name)
    },
  //动态改变面包屑数据
    changeCurmb(val,type){
      // nav为第一级
      let json = [],flag=false;
      if(type == '1'){
        json = { name : "全球"+val.name}
      }else{
        json = { name : val.name}
      }
      if(type == '1'){
        if(this.breadListIm.length > 0){
          this.breadListIm.splice(0,1,json)
        }else{
          this.breadListIm.push(json)
        }
      }
      if(type == '2'){
        if(this.breadListIm.length > 1){
          this.breadListIm.splice(1,1,json)
        }else{
          this.breadListIm.push(json)
        }
      }
      if(type == '3'){
        if(this.breadListIm.length > 2){
          this.breadListIm.splice(2,1,json)
        }else{
          this.breadListIm.push(json)
        }
      }
    },
    //点击面包屑改变数据
    tobreadCrumb(val,index){
      console.log(index,val)
      if(index>1){
        this.breadListIm.splice(index,this.breadListIm.length)
      }
    },

  },
};
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  .example {
    height: 100%;
    padding: 0 !important;
  }

  .componentArea {
    width: 100%;
    height: 100%;
  }

.headerCont{
  width: 100%;
  height: 130px;
  background: url('../assets/image/topbg.png') no-repeat;
  background-size: 100% 100%;
}

.topCon{
  display: flex;
  width: 100%;
  padding-left: 26%;
}

.topCon .nav{
  width: 70%;
  height: 72px;
}

.topCon .nav li{
  float:left;
  height: 72px;
  line-height: 72px;
  font-size: 30px;
  width: 120px;
  text-align: center;
  color:#00d8ff;
  cursor: pointer;
}

.topCon .nav li:hover{
  font-weight: bold;
  color:#83e3ff;
}

.topCon .nav li.active{
  font-weight: bold;
  color:#83e3ff;
  background: url('../assets/image/navbg.png') no-repeat center bottom;
}

.weather{
  display: flex;
  font-size: 20px;
  color:rgb(192,235,255);
  align-items: center;
  height: 72px;
}

.weather img{
  height: 26px;
}

.crumbs{
  height: 46px;
  position: absolute;
  top: 73px;
  left: 26%;
  font-size: 16px;
  padding-top: 10px;
  display: flex;
  align-items: center;
}

.crumbs img{
  display: inline-block;
  height: 20px;
  margin-right:14px;
}

.crumbs .b_span{
  cursor: pointer;
  color:#00d8ff;
}

.crumbs .b_span:hover{
  color:#83e3ff;
}

.componentArea {
  position: relative;
  width: 100%;
  height: 100%;
}
.bottomBox {
  position: fixed;
  bottom: 10px;
  width: 98%;
  height: 60px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.bottomUl{
    margin-top: -10px;
    display: flex;
    justify-content: space-between;
}
.buttomItem{
    margin-left: 3px;
    font-size: 22px;
    cursor: pointer;
}
.buttonDiv{
    background-size: 100% 100%;
    background-repeat: no-repeat;
    box-sizing: border-box;
    padding: 10px 10px 20px;
}
.buttonDiv p{
    margin-left:5%;
}
.buttonDiv img {
  width: 20px;
}

.tankuang{
  width: 60%;
  height: 65%;
  position: absolute;
  left: 18%;
  z-index: 555;
}
</style>
