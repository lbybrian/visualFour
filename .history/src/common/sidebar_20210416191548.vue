<!-- 侧边栏 -->
<template>
  <div class="sidebar">
    <div class="sidebarBox">
      <div class="closeBtn"><img src="../assets/image/关闭.png" alt="" /></div>
      <div class="sideTitle">
        <div>
          <img src="../assets/image/左.png" alt="" />
          {{}}
          <img src="../assets/image/右.png" alt="" />
        </div>
<<<<<<< HEAD
      </div>
      <ul class="timeList" v-if="status == 4">
        <li class="timeItem" v-for="(item, index) in itemArray" :key="index">
          <p>
            <span>开始时间：{{ item.startTime }} <span>状态：</span></span>
            <button>+更多</button>
          </p>
          <p>
            <span>结束时间：{{ item.endTime }}</span>
            <span>
              <span v-if="item.status == 0">
                <i class="iconRed">・</i>运行失败</span
              >
              <span v-if="item.status == 1">运行成功</span>
            </span>
            <button>编辑</button>
          </p>
        </li>
      </ul>
      <ul class="timeList timeList_3" v-if="status == 2">
        <li class="timeItem" v-for="(item, index) in itemArray_3" :key="index">
          <p>
            <span class="timeSpan">{{ index + 1 }}</span>
            <span style="margin-left: 5px">{{ item.country }}</span>
          </p>
        </li>
      </ul>
=======
        <ul class="timeList" v-if="status == 4 ">
            <li class="timeItem" v-for="(item,index) in itemArray" :key="index">
                <p>
                    <span>开始时间：{{item.startTime}} 
                    <span>状态：</span></span> 
                    <button>+更多</button></p>
                <p>
                    <span>结束时间：{{item.endTime}}</span>
                    <span>
                        <span v-if="item.status == 0"> <i class="iconRed">・</i>运行失败</span>
                        <span v-if="item.status == 1">运行成功</span>
                    </span>
                    <button>编辑</button>
                </p>
                
            </li>
        </ul>
        <ul class="timeList timeList_3" v-if="status == 2 ">
            <div>
                <input type="text" placeholder="请输入相关国家" class="searchInput">
                <span class="searchSpan"><img src="../assets/image/搜索.png" alt="" class="searchIcn">搜索</span>
            </div>
            <li class="timeItem" v-for="(item,index) in itemArray_3" :key="index">
                <p>
                    <span class="timeSpan">{{index+1}}</span>
                    <span style="margin-left:5px;">{{item.country}}</span>
                </p>
            </li>
        </ul>
>>>>>>> 0ae6cd00a6485dd9233917d33750681c82c01c03
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
      itemArray_5: [
        {
          startTime: "2017-10-01 12:00",
          endTime: "2017-10-01 12:00",
          status: 0,
        },
        {
          startTime: "2017-10-01 12:00",
          endTime: "2017-10-01 12:00",
          status: 0,
        },
        {
          startTime: "2017-10-01 12:00",
          endTime: "2017-10-01 12:00",
          status: 0,
        },
        {
          startTime: "2017-10-01 12:00",
          endTime: "2017-10-01 12:00",
          status: 0,
        },
        {
          startTime: "2017-10-01 12:00",
          endTime: "2017-10-01 12:00",
          status: 0,
        },
        {
          startTime: "2017-10-01 12:00",
          endTime: "2017-10-01 12:00",
          status: 0,
        },
        {
          startTime: "2017-10-01 12:00",
          endTime: "2017-10-01 12:00",
          status: 0,
        },
        {
          startTime: "2017-10-01 12:00",
          endTime: "2017-10-01 12:00",
          status: 0,
        },
      ],
      itemArray_3: [
        {
          id: "1",
          country: "缅甸",
          status: 0,
        },
        {
          id: "2",
          country: "美国",
          status: 0,
        },
        {
          id: "3",
          country: "印度",
          status: 0,
        },
        {
          id: "4",
          country: "埃塞俄比亚",
          status: 0,
        },
        {
          id: "5",
          country: "伊朗",
          status: 0,
        },
        {
          id: "6",
          country: "巴基斯坦",
          status: 0,
        },
        {
          id: "7",
          country: "埃塞俄比亚",
          status: 0,
        },
        {
          id: "8",
          country: "巴基斯坦",
          status: 0,
        },
        {
          id: "9",
          country: "伊朗",
          status: 0,
        },
        {
          id: "10",
          country: "印度",
          status: 0,
        },
      ],
      bottomBarId: "",
      status: 2,
    };
  },
  computed: {},
  props: {
      dataObj: Object
  },
  watch: {},

  methods: {},

  created() {},
  mounted() {
    bus.$on("bottomBarId", (data) => {
      this.bottomBarId = data;
      console.log(this.bottomBarId, 888888888888, data);
    });
  },
};
</script>
<style scoped>
.sidebarBox {
    width: 100%;
    height: 100%;
    background-image:url("../assets/image/列表背景.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0.9;
    position:fixed;
    right:0;
    top:10%;
    color:#00FFFF;
    font-size: 14px;
    z-index: 999;
    
}
.timeList {
  position: relative;
  margin: 20% 0;
  height: 80%;
  overflow-y: scroll;
  overflow-x: hidden;
  clear: both;
}
.timeList::-webkit-scrollbar {
  display: none;
}
.timeItem{
    width:98%;
    padding:10px 20px;
    margin:10px 5px;
    border: 1px solid #017298;
    background: rgba(0,164,202,0.3);
    box-sizing: border-box;
}
button{
    background: rgba(0,164,202,0.3);
    border-style: none;
    color: #00FFFF;
    border-radius: 2px;
    font-size: 12px;
    margin-right: 10px;
    position: absolute;
    right: 0;
    display: inline-block;
    width: 50px;
    margin-top:4px;
}
.iconRed {
  color: red;
  font-size: 16px;
  font-weight: 800;
}
ul li:first-child .timeSpan{
   padding:1px 4px;
   border-radius: 2px;
   background-image: url(../assets/image/bg1.png);
   color: #fff;
  
}
ul li:nth-child(2) .timeSpan{
   padding:1px 4px;
   background-image: url(../assets/image/bg2.png);
   color: #fff;
   border-radius: 2px;
}
ul li:nth-child(3) .timeSpan{
   padding:1px 4px;
   background-image: url(../assets/image/bg3.png);
   color: #fff;
   border-radius: 2px;
}
.timeSpan{
   padding:1px 4px;
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
}
.sideTitle img {
  width: 20px;
}
.sideTitle div {
  width: 150px;
  padding: 0px 15px;
  text-align: center;
  color: #e7b05e;
  font-weight: 800;
}
.searchInput{
    border:1px solild #017298;
    background-color: #00a4ca;
    border-radius: 2px;
    opacity: 0.2;
    font-size: 14px;
    padding-left: 10px;
    margin: 10px 5px;
    width:77%;
    height:30px;
    float: left;
}
.searchSpan{
    border: 1px solid #017298;
    background-color: #00a4ca;
    border-radius: 2px;
    margin:10px 0;
    padding: 0 10px;
    width:10%;
    height:30px;
    line-height: 30px;
    display: inline-block;

}
.searchIcn{
    width:10px;
    height:10px;
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
</style>