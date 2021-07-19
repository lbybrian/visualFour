<!-- 盒须图 -->
<template>
    <div>
        <div ref="chartItem" id="mainBoxPlot" :style="{width: '400px', height: '500px'}"></div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import echarts from 'echarts'
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
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
},
//方法集合
methods: {
    initCharts(option){
        if (this.myChart) {
            echarts.dispose(this.myChart);
        }
        this.setOption(option)
    },
    setOption(params){
        var chartDom = document.getElementById('mainBoxPlot');
        this.myChart = echarts.init(chartDom);
        this.myChart.setOption(params);
    },
    updateData(dataInfo) {
        //按新的option更新图表
        this.initCharts(dataInfo);
    },
   
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
   
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.$nextTick(function () {
        var tData = this.dataObj ;
        this.updateData(tData);
    });
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {
}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style>
#mainBoxPlot{
    clear: both;
}
</style>