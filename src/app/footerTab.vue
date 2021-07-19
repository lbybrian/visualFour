<template>
  <div class="footer">
    <span v-for="(item,index) in dataInfo.data" :key="index">{{item.name}}</span>
  </div>
</template>

<script>
export default {
 data() {
    return {
      dataInfo:{
        isShow:'md',
        data:[
          { name:'五大热点区域', type:'qy'},
          { name:'十大热点国家', type:'gj'},
          { name:'十大热点事件', type:'sj'},
        ],
      }
      
    }
 },
  beforeMount() {
    this.dataInfo.data = this.footerData || this.dataInfo.data;
  },
  props: {
    footerData: Object,
    title: String,
  },
}
</script>

<style>
.footer{
  position: absolute;
  bottom: 20px;
  
}
</style>