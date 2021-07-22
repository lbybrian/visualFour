<template>
  <div style="" class="example">
    <div class="headerCont">
      <div class="topCon">
        <ul class="nav">
          <li 
          v-for="(item,index) in navList" 
          :key="index"
          :class="{active:current == index}"
          @click="addClass(index,$event),changeCurmb(item,'1')"
          >{{item.name}}<span>/</span></li>
        </ul>
        <div class="weather">
          <img src="../assets/image/duoyun.png" />
          <span style="margin-left: 20px;">多云</span>
          <span style="margin-left: 20px;">20℃</span>
          <span style="margin-left: 40px;">2021-04-18 13:00:00</span>
        </div>
      </div>
      <div class="crumbs">
        <img src="../assets/image/dingwei.png" />
          <el-breadcrumb separator-class="el-icon-arrow-right">
          <slot  v-for="(d,n) in breadListIm">
            <el-breadcrumb-item v-if="!!d.path">
              <span @click="tobreadCrumb(d,n)">{{
              d.name || d
            }}</span></el-breadcrumb-item>
            <el-breadcrumb-item v-else>{{ d.name || d }}</el-breadcrumb-item>
          </slot>
        </el-breadcrumb>
      </div>
    </div>
    <slot v-for="(item, index) in config">
      <div v-if="item.ref === 'item1' && item.isDisplay" :index="index" :key="index" :class="'chartItem ' + item.ref">
        <DynamicItem :comName="dataObj[item.ref].comName" :title="dataObj[item.ref].title"
          :dataObj="dataObj[item.ref].dataObj" :ref="item.ref"></DynamicItem>
      </div>
      <div v-if="item.ref !== 'item1' && item.isDisplay" :index="index" :key="index" :class="'chartItem ' + item.ref">
        <DynamicItem :comName="dataObj[item.ref].comName" :title="dataObj[item.ref].title"
          :dataObj="dataObj[item.ref].dataObj" :ref="item.ref"></DynamicItem>
      </div>
    </slot>

    <sidebar></sidebar>
    <FooterTab :footerData="rdfooterData"></FooterTab>

  </div>
</template>

<script>
  import DynamicItem from "@/common/dynamicItem";
  import Sidebar from "./sidebar"
  import FooterTab from "./footerTab";
  export default {
    components: {
      DynamicItem,
      Sidebar,
      FooterTab
    },
    created() {
      this.updateConfig();
    },
    mounted() {
      // this.updateAppData();
      this.$nextTick(() => {
        this.updateComponentItems();
      });
    },
    data() {
      return {
        dataObj: {
          item1: {
            ref: "item1",
            comName: "dataTable",
            title: "数据表格dataTable",
            dataObj: {
              withSelection: true,
              header: [{
                  prop: "date",
                  sortable: true,
                  label: "日期",
                  width: "120",
                },
                {
                  prop: "valueA",
                  label: "列名A",
                  align: "center",
                },
                {
                  prop: "valueB",
                  label: "列名B",
                  align: "center",
                },
              ],
              data: [{
                  date: "2020-02-21",
                  valueA: "值A001",
                  valueB: "值B001",
                },
                {
                  date: "2020-02-22",
                  valueA: "值A002",
                  valueB: "值B002",
                },
              ],
              page: {
                size: 20,
                count: 3,
                layout: "prev, pager, next, sizes",
                total: 200,
              },
            },
          },
          item2: {},
          item3: {},
          item4: {},
          item5: {},
          item6: {},
          item7: {},
          item8: {},
          item9: {},
        },
        state: 2,
        config: [{
            ref: "item1",
            class: "className1",
            state: [1, 2, 3],
            isDisplay: true,
          },
          {
            ref: "item2",
            class: "className2",
            state: 1,
          },
          {
            ref: "item3",
            class: "className2",
            state: 1,
          },
          {
            ref: "item4",
            class: "className2",
            state: 1,
          },
          {
            ref: "item5",
            class: "className2",
            state: 3,
          },
          {
            ref: "item6",
            class: "className2",
            state: 3,
          },
          {
            ref: "item7",
            class: "className2",
            state: 3,
          },
          {
            ref: "item8",
            class: "className2",
            state: 3,
          },
          {
            ref: "item9",
            class: "className2",
            state: 3,
          },
        ],
      mdfooterData:[
        { name:'国家风险评估',type:'fx'},
        { name:'国家力量数据',type:'ll'},
        { name:'热点事件追踪',type:'sj'},
        { name:'重要人物画像',type:'rw'},
        { name:'一带一路态势',type:'ydyl'},
      ],
      current: '0',
      navList:[
        {name:'政治',value:'0'},
        {name:'军事',value:'1'},
        {name:'安全',value:'2'},
        {name:'外交',value:'3'},
        {name:'经济',value:'4'},
        {name:'科技',value:'5'},
      ],
      breadListIm:[
        {name:'全球政治',},
        {name:'东南亚',},
        {name:'缅甸',}
      ],
    rdfooterData: [{
        name: '五大热点区域',
        type: 'qy'
      },
      {
        name: '十大热点国家',
        type: 'gj'
      },
      {
        name: '十大热点事件',
        type: 'sj'
      },
    ],
    mdfooterData: [{
        name: '国家风险评估',
        type: 'fx'
      },
      {
        name: '国家力量数据',
        type: 'll'
      },
      {
        name: '热点事件追踪',
        type: 'sj'
      },
      {
        name: '重要人物画像',
        type: 'rw'
      },
      {
        name: '一带一路态势',
        type: 'ydyl'
      },
      ]
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
        this.current = index;
        //获取点击对象
        var el = event.currentTarget;
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
        console.log(index)
        if(index>1){
          this.breadListIm.splice(index,this.breadListIm.length)
        }
      }
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
  height: 120px;
  background: url('../assets/image/topbg.png') no-repeat;
  background-size: 100% 100%;
}

.topCon{
  width: 74%;
  float: right;
}

.topCon .nav{
  width: 70%;
}

.topCon .nav li{
  float:left;
  height: 72px;
  line-height: 72px;
  font-size: 30px;
  width: 160px;
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
  float: right;
  width: 30%;
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

.componentArea {
  width: 100%;
  height: 100%;
}

</style>
