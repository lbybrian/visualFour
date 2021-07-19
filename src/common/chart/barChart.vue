<template>
  <div v-show="status === true" class="chartArea" ref="chartItem"></div>
</template>

<script>
// 引入基本模板
var echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "",
  data() {
    return {
      status: true,
      itemStyle: {
        type: "bar",
      },
      titleStyle: {
        text: "",
      },
      tooltip: {},
      xAxisStyle: {
        axisTick: {
          show: false
        },
        axisLabel:{
          show: true,
          color:'#959595'
        },
        axisLine:{
          show: true,
          lineStyle:{
            color:'#cecece',
          }
        },
         splitLine:{
          show: true,
          lineStyle:{
            color:'#EBEEF5',
            type: 'dashed' ,
          }
        }
      },
      yAxisStyle: {
        axisTick: {
          show: false
        },
        axisLabel:{
          show: true,
          color:'#959595'
        },
        axisLine:{
          show: false
        },
        // splitLine:{
        //   show: true,
        //   lineStyle:{
        //     color:'#EBEEF5',
        //     type: 'dashed' ,
        //   }
        // }
      },
      dataInfo: {
        // itemStyle: {
        //   type: "bar",
        // },
        // title: "",
        // name: "杀伤力",
        // data: [
        //   {
        //     name: "AK47",
        //     value: 3000,
        //   },
        //   {
        //     name: "Mp5冲锋枪",
        //     value: 2500,
        //   },
        //   {
        //     name: "榴弹",
        //     value: 1000,
        //   },
        //   {
        //     name: "AWP狙击枪",
        //     value: 8000,
        //   },
        //   {
        //     name: "加农炮",
        //     value: 28000,
        //   },
        //   {
        //     name: "马克沁机枪",
        //     value: 12000,
        //   },
        // ],
        // mode: "vertical",
      },
      option: {
        // color:['#1890ff','#2fc25b','#facc14','#223273','#8543e0','#13c2c2'],
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [],
      },
    };
  },
  props: {
    dataObj: Object,
  },
  mounted() {
    var data = this.dataInfo;
    this.$nextTick(function () {
      var tData = this.dataObj || this.dataInfo;
      this.updateData(tData);
    });
  },
  methods: {
    updateData(data) {
      //恢复默认
      this.dataInfo = {
        xAxisStyle: { ...this.xAxisStyle },
        yAxisStyle: { ...this.yAxisStyle },
        itemStyle: { ...this.itemStyle },
        titleStyle: { ...this.titleStyle },
        tooltip: { ...this.tooltip },
        data: [],
      };
      var arr = [
        "xAxisStyle",
        "yAxisStyle",
        "itemStyle",
        "titleStyle",
        "tooltip",
      ];
      //按参数更新dataObj
      for (var k in data) {
        if (arr.indexOf(k) !== -1) {
          for (var j in data[k]) {
            this.dataInfo[k][j] = data[k][j];
          }
        } else {
          this.dataInfo[k] = data[k];
        }
      }
      this.dataInfo.itemStyle.type = "bar"; //item的type固定，不可外部修改
      //生成全新的chart option
      this.updateOption();
      //按新的option更新图表
      this.initChart();
    },
    updateOption() {
      var data = this.dataInfo;
      this.option.title = data.titleStyle;
      this.option.title.text = data.title;
      this.option.series = [];
      var name = data.name || "-";
      if (typeof name === "string") {
        name = [name];
      }
      //根据name 数组和itemStyle初始化series;
      for (var i = 0; i < name.length; i++) {
        var item = { ...data.itemStyle };
        item.data = [];
        item.name = name[i];
        this.option.series.push(item);
      }
      if (name.length > 1) {
        this.option.legend = data.legendStyle || {
          show: true,
        };
        this.option.legend.data = name;
      }

      //初始化xAxis和yAxis
      this.option.xAxis = data.xAxisStyle;
      this.option.yAxis = data.yAxisStyle;
      this.option.tooltip = data.tooltip;
      this.option.color = data.color;
      var mode = data.mode || "vertical"; //horizontal or vertical
      var axisData;
      if (mode === "vertical") {
        this.option.xAxis.data = [];
        axisData = this.option.xAxis;
      } else {
        this.option.yAxis.data = [];
        axisData = this.option.yAxis;
      }

      //更新Axis和series元素里的data
      data.data = data.data || [];
      for (var i = 0; i < data.data.length; i++) {
        var item = data.data[i];
        axisData.data.push(item.name);
        if (typeof item.value === "number") {
          item.value = [item.value];
        }
        for (var j = 0; j < this.option.series.length; j++) {
          this.option.series[j].data.push(item.value[j] || 0);
          this.option.series[j].stack=item.stack;
        }
      }
    },
    updateView(elem, option) {
      if (this.chart) {
        echarts.dispose(this.chart);
      }
      this.chart = echarts.init(elem);
      // 绘制图表
      this.chart.setOption(option);
      this.$forceUpdate();
      this.initChartEvent();
    },
    initChart() {
      var elem = this.$refs.chartItem;
      this.updateView(elem, this.option);
    },
    initChartEvent() {
      var _self = this;
      this.chart.off("click");
      this.chart.on("click", function (e) {
        if (e.componentType === "series") {
          _self.$emit("click", {
            name: e.name,
            value: e.data,
            seriesName: e.seriesName
          });
        } 
      });

      this.chart.off("mouseover");
      this.chart.on("mouseover", function (e) {
       if (e.componentType === "series") {
          _self.$emit("mouseover", {
            name: e.name,
            value: e.data,
            seriesName: e.seriesName
          });
        } 
      });
    },
  },
};
</script>

<style scoped>
.chartArea {
  height: 100%;
  min-height: 200px;
}
</style>
