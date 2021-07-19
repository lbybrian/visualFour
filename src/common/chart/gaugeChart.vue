<template>
  <div class="chartArea" ref="chartItem"></div>
</template>

<script>
// 引入基本模板
var echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/gauge");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "",
  data() {
    return {
      // color:['#1890ff','#2fc25b','#facc14','#223273','#8543e0','#13c2c2'],
      itemStyle: {
        type: "gauge"
      },
      titleStyle: {
        text: "",
      },
      tooltip: {},
      dataInfo: {
        itemStyle: {
          type: "gauge",
        },
        title: "",
        data: [
          {
            name: "AK47",
            value: 3000,
          },
        ],
      },
      option: {
        title: { text: "在Vue中使用echarts" },
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
        itemStyle: { ...this.itemStyle },
        titleStyle: { ...this.titleStyle },
        tooltip: { ...this.tooltip },
        data: [],
      };
      var arr = ["itemStyle", "titleStyle", "tooltip"];
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
      this.dataInfo.itemStyle.type = "gauge"; //item的type固定，不可外部修改
      //生成全新的chart option
      this.updateOption();
      //按新的option更新图表
      this.initChart();
    },
    updateOption() {
      var data = this.dataInfo;
      this.option.title = data.titleStyle;
      this.option.title.text = data.title;
      this.option.tooltip = data.tooltip;
      this.option.series = [];
      data.data = data.data || [];
      if (data.series) {
        this.option.series = data.series;
      } else {
        //itemStyle初始化series;
        var item = { ...data.itemStyle };
        item.data = data.data;
        this.option.series.push(item);
      }
    },
    updateView(elem, option) {
      if (this.chart) {
        echarts.dispose(this.chart);
      }
      this.chart = echarts.init(elem);
      // 绘制图表
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
