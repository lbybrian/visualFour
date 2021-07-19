<template>
  <div class="indexWeb">
    <div  v-for="item in indexData" :key="item.id" @click="getClick(item)" style="margin-bottom:15px;width: 32.5%;">
     <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <span>{{ item.title }}</span>
      </div>
      <div  class="text item">
        
      </div>
     </el-card>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {
    this.lastUpdateView();
  },
  data() {
    return {
      title : "",
      radioValue : "",
      url : "",
      indexData : [],
      id : ""
    };
  },
  methods: {
    lastUpdateView() {
      var _self = this;
      let dataB = {};
      _self.tAdapter.getEntityData(
        {
          data: dataB,
        },
        function (d) {
          //console.log(d.data,9999999)
          _self.indexData = d.data
        }
      );
    },
    getClick(v) {
      var _self = this
      for (let i = 0; i < _self.indexData.length; i++) {
        const obj = _self.indexData[i];
        if (v.title == obj.title) {
          _self.url = obj.url 
          _self.id = obj._id
          break
        }  
      }
      if ( _self.url == '/app/example'){
        _self.radioValue = 1
      }else if(_self.url == '/app/threeLayout'){
        _self.radioValue = 2
      }else if(_self.url == '/app/fourLayout'){
        _self.radioValue = 3
      }else if(_self.url == '/app/threeTwo'){
        _self.radioValue = 4
      }
     // 此时 传id 展示出来具体的 图表 
     _self.$router.push({
           path: '/tool/lastAnalysis',
           query: {
             radioValue : _self.radioValue,
             url : _self.url,
             id : _self.id
           }
         })
  }
  },
  
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.indexWeb {
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.clearfix {
  text-align: center;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  /* width: 480px; */
  height: 380px;
}
</style>
