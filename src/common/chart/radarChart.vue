<template>
  <div class="chartArea" ref="chartItem"></div>
</template>

<script>
// 引入基本模板
var echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/radar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "",
  data() {
    return {
      itemStyle: {
        type: "radar",
      },
      titleStyle: {
        text: "",
      },
      tooltip: {},
      legendStyle: {},
      radarStyle: {
        name: {
          textStyle: {
            color: '#959595',
          }
        },
        indicator: [
          { name: "速度评分", max: 100, },
          { name: "力量评分", max: 100 },
          { name: "耐力评分", max: 100 },
          { name: "灵敏度评分", max: 100 },
          { name: "柔韧度评分", max: 100 },
        ],
        axisLine:{
          show: true,
          lineStyle:{
            color:'#cecece'
          }
        }
      },
      dataInfo: {
        itemStyle: {
          type: "radar",
        },
        title: "",
        radarStyle: {},
        data: [
          {
            name: "张三",
            value: [55, 80, 68, 87, 90],
          },
          {
            name: "李四",
            value: [25, 84, 96, 80, 70],
          },
        ],
      },
      option: {
        title: { text: "在Vue中使用echarts" },
        // backgroundColor: '#161627',
        tooltip: {},
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
        radarStyle: { ...this.radarStyle },
        itemStyle: { ...this.itemStyle },
        titleStyle: { ...this.titleStyle },
        legendStyle: { ...this.legendStyle },
        tooltip: { ...this.tooltip },
        data: [],
      };
      var arr = ["radarStyle", "itemStyle", "titleStyle", "tooltip", "legendStyle"];
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
      this.dataInfo.itemStyle.type = "radar"; //item的type固定，不可外部修改
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
      this.option.radar = data.radarStyle;
      this.option.legend = data.legendStyle;
      this.option.legend.data = [];
      this.option.color = data.color;
      var tData = data.data || []
      for (var i = 0; i < tData.length; i++) {
        var item = { ...data.itemStyle };
        item.data = [tData[i].value];
        item.name = tData[i].name;
        for(var k in tData[i].style) {
          item[k] = tData[i].style[k];
        }
        this.option.legend.data.push(tData[i].name);
        this.option.series.push(item);
      }
      this.option.tooltip = data.tooltip;
    },
    updateView(elem, option) {
      if (this.chart) {
        echarts.dispose(this.chart);
      }
      this.chart = echarts.init(elem);
      // 绘制图表
      console.log(JSON.stringify(option))
      this.chart.setOption(option);
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
            seriesName: e.seriesName,
          });
        }
      });

      this.chart.off("mouseover");
      this.chart.on("mouseover", function (e) {
        if (e.componentType === "series") {
          _self.$emit("mouseover", {
            name: e.name,
            value: e.data,
            seriesName: e.seriesName,
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
