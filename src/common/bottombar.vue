<!-- 底边栏 -->
<template>
  <div class="bottombar">
    <div class="bottomBox" :style="status != 2 ? {backgroundImage:'url('+background_5+')'} :{backgroundImage:'url('+background_3+')'}">
        <ul class="bottomUl" :style="status != 2 ? {marginLeft: '18%',width: '64%'} :{marginLeft: '31%',width: '38%'}">
            <li class="buttomItem" v-for="(item,index) in buttonList" :key="index" @click="selectBar(item)" :style="status != 2 ? {width:'26%'} :{width:'33%'}">
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
</template>

<script>
import bus from "./eventBus";
export default {
  name: "bottombar",
  components: {},
  data() {
    return {
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
        },
        {
            name:"国家力量数据",
            id:2,
            iconSrcPre:require("../assets/image/icon-国家力量-未选中.png"),
            iconSrc:require("../assets/image/icon-国家力量-选中.png"),
            backgroundUrlPre:require("../assets/image/button中间-未选中.png"),
            backgroundUrl:require("../assets/image/button中间-选中.png"),
            status:false,
        },
        {
            name:"热点事件追踪",
            id:3,
            iconSrcPre:require("../assets/image/icon-热点事件-未选中.png"),
            iconSrc:require("../assets/image/icon-热点事件-选中.png"),
            backgroundUrlPre:require("../assets/image/button中间-未选中.png"),
            backgroundUrl:require("../assets/image/button中间-选中.png"),
            status:false,
        },
        {
            name:"重要人物画像",
            id:4,
            iconSrcPre:require("../assets/image/icon-重要人物-未选中.png"),
            iconSrc:require("../assets/image/icon-重要人物-选中.png"),
            backgroundUrlPre:require("../assets/image/button中间-未选中.png"),
            backgroundUrl:require("../assets/image/button中间-选中.png"),
            status:false,
        },
        {
            name:"一带一路态势",
            id:5,
            iconSrcPre:require("../assets/image/icon-一带一路-未选中.png"),
            iconSrc:require("../assets/image/icon-一带一路-选中.png"),
            backgroundUrlPre:require("../assets/image/button右-未选中.png"),
            backgroundUrl:require("../assets/image/button右-选中.png"),
            status:false,
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
        },
        {
          name: "十大热点国家",
          id: 7,
          iconSrcPre: require("../assets/image/icon-十大热点国家-未选中.png"),
          iconSrc: require("../assets/image/icon-十大热点国家-选中.png"),
          backgroundUrlPre: require("../assets/image/button中间-未选中.png"),
          backgroundUrl: require("../assets/image/button中间-选中.png"),
           status:false,
        },
        {
          name: "十大热点事件",
          id: 8,
            iconSrcPre: require("../assets/image/icon-十大热点事件-未选中.png"),
          iconSrc: require("../assets/image/icon-十大热点事件-选中.png"),
          backgroundUrlPre: require("../assets/image/button右-未选中.png"),
          backgroundUrl: require("../assets/image/button右-选中.png"),
           status:false,
        },
      ],
      status:2,
      background_3:require("../assets/image/btbg.png"),
      background_5:require("../assets/image/bg线条.png"),
    };
  },
  methods: {
      selectBar(item){
        this.buttonList.forEach((i) =>{
            i.status = false
        })
        this.$set(item,'status',true)
        console.log(item.id,111111111111)
        bus.$emit ("bottomBarId" , item)

    }
  },
  created() {
  },
  mounted() {
      if (this.status === 2) {
         this.buttonList = this.buttonList_3 ;
      }else if(this.status === 4) {
         this.buttonList = this.buttonList_5 ;
      }
    
  }
};
</script>
<style  scoped>
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
</style>