<!-- 平行坐标系 -->
<template>
<div class='parallel'>
    <div>
        <div ref="container" id="mainParallel" :style="{width: '460px', height: '450px'}"></div>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import * as echarts from 'echarts';

export default {
    props:{
        dataObj: Object,
        },
//import引入的组件需要注入到对象中才能使用
components: {
    echarts
},
data() {
//这里存放数据
return {
    myChart:null,
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
    dataObj: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
},
//方法集合
methods: {
     initCharts(option){
         if (this.myChart) {
                echarts.dispose(this.myChart);
            }
            var chartDom = document.getElementById('mainParallel');
            this.myChart = echarts.init(chartDom);
            this.setOption(option)
        },
        setOption(params){
           this.myChart.setOption(params);
        },
        updateData(option) {
            //按新的option更新图表
            this.initCharts(option);
        },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.$nextTick(function () {
            var tData = this.dataObj || this.dataInfo;;
            this.updateData(tData);
        });
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {
     if (!this.myChart) {
      return
    }
    this.myChart.dispose()
    this.myChart = null
}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
#mainParallel{
    clear: both;
}
</style>