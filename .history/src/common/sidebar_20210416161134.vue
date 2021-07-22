<!-- 侧边栏 -->
<template>
<div class='sidebar'>
    <div class="sidebarBox">
        <div class="closeBtn"><img src="../assets/image/关闭.png" alt=""></div>
        <div class="sideTitle">   
            <div>
                <img src="../assets/image/左.png" alt="">
                 {{}}
                 <img src="../assets/image/右.png" alt="">
             </div>
        </div>
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
            <li class="timeItem" v-for="(item,index) in itemArray_3" :key="index">
                <p>
                    <span class="timeSpan">{{index+1}}</span>
                    <span style="margin-left:5px;">{{item.country}}</span>
                </p>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import bus from "./eventBus";
export default {
    name:"sidebar",
    components: {},
   data() {
      return {
       itemArray_5:[
        {
            startTime:"2017-10-01 12:00",
            endTime:"2017-10-01 12:00",
            status:0,
        },
        {
            startTime:"2017-10-01 12:00",
            endTime:"2017-10-01 12:00",
            status:0,
        },
        {
            startTime:"2017-10-01 12:00",
            endTime:"2017-10-01 12:00",
            status:0,
        },
        {
            startTime:"2017-10-01 12:00",
            endTime:"2017-10-01 12:00",
            status:0,
        },
        {
            startTime:"2017-10-01 12:00",
            endTime:"2017-10-01 12:00",
            status:0,
        },
        {
            startTime:"2017-10-01 12:00",
            endTime:"2017-10-01 12:00",
            status:0,
        },
        {
            startTime:"2017-10-01 12:00",
            endTime:"2017-10-01 12:00",
            status:0,
        },
        {
            startTime:"2017-10-01 12:00",
            endTime:"2017-10-01 12:00",
            status:0,
        },
      ],
       itemArray_3:[
        {
            id:"1",
            country:"缅甸",
            status:0,
        },
        {
            id:"2",
            country:"美国",
            status:0,
        },
        {
            id:"3",
            country:"印度",
            status:0,
        },
        {
            id:"4",
            country:"埃塞俄比亚",
            status:0,
        },
        {
            id:"5",
            country:"伊朗",
            status:0,
        },
        {
            id:"6",
            country:"巴基斯坦",
            status:0,
        },
        {
            id:"7",
            country:"埃塞俄比亚",
            status:0,
        },
        {
            id:"8",
            country:"巴基斯坦",
            status:0,
        },
         {
            id:"9",
            country:"伊朗",
            status:0,
        },
        {
            id:"10",
            country:"印度",
            status:0,
        },
      ],
      bottomBarId: "",
      status: 2
};
},
computed: {},
watch: {},

methods: {

},

created() {

},
mounted() {
  bus.$on('bottomBarId',data=>{
    this.bottomBarId = data
     console.log(this.bottomBarId,888888888888,data)
 })
},

}
</script>
<style scoped>
.sidebarBox{
    width:22%;
    height:75%;
    background-color: #003F51;
    opacity: 0.9;
    position:fixed;
    right:0;
    top:10%;
    color:#00FFFF;
    font-size: 14px;
    z-index: 999;
    
}
.timeList{  
    position: relative;
    margin:20% 0;
    height:80%;
    overflow-y: scroll;
    overflow-x: hidden ;
    clear: both;
}
.timeList::-webkit-scrollbar {
    display:none
}
.timeItem{
    width:100%;
    padding:10px 20px;
    margin:10px 0 10px 1px;
    border: 1px solid #017298;
    background-color: #005065;
    box-sizing: border-box;
}
button{
    background-color: #006A7B;
    opacity: 0.9;
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
.iconRed{
    color: red;
    font-size: 16px;
    font-weight: 800;
}
ul li:first-child .timeSpan{
   padding:1px 4px;
   background: red;
   border-radius: 2px;
}
ul li:nth-child(2) .timeSpan{
   padding:1px 4px;
   background: red;
   border-radius: 2px;
}
ul li:nth-child(3) .timeSpan{
   padding:1px 4px;
   background: red;
   border-radius: 2px;
}
.closeBtn{
    float: right;
    margin:15px;
}
.sideTitle{
    float: left;
    margin: 6px 80px 10px;
    width: 60%;
    text-align: center;
}
.sideTitle img{
    width:20px;
}
.sideTitle div{
    width: 150px;
    padding: 0px 15px;
    text-align: center;
    color:#E7B05E;
    font-weight: 800;
}
</style>