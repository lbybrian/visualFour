<template>
  <div class="chartArea" ref="chartItem"></div>
</template>

<script>
// 引入基本模板
window.echarts = require("echarts/lib/echarts");
// 引入散点图组件
require("echarts/lib/chart/effectScatter");
require("echarts/lib/chart/scatter");

// 引入世界地图数据
// require("./world_new01.js");
require("../../../static/map/world_new.js");

export default {
  name: "",
  data() {
    return {
      itemStyle: {
        type: "effectScatter",
        coordinateSystem: "geo",
        zlevel: 2,
        rippleEffect: {
          period: 4,
          brushType: "stroke",
          scale: 4,
        },
        itemStyle: {
          normal: {
            color: "#ff0",
          },
        },
        label: {
          normal: {
            show: true,
            position: "right",
            offset: [5, 0],
            formatter: "{b}",
          },
          emphasis: { show: true },
        },
        symbol: "circle",
      },
      titleStyle: {
        text: "",
      },
      tooltip: {
        trigger: "item",
        backgroundColor: "#1540a1",
        borderColor: "#FFFFCC",
        showDelay: 0,
        hideDelay: 0,
        // enterable: true,
        transitionDuration: 0,
        formatter: function (a, b, c) {
          return a.name + "( " + a.data.time + " )";
        },
      },
      geoStyle: {
        map: "world",
        label: {
          show: false,
          emphasis: {
            show: true,
          },
        },
        roam: true, //是否允许缩放
        center: [135.52, 21.89],
        zoom: 6,
        itemStyle: {
          normal: {
            color: ["rgb(217, 234, 246)"], //地图背景色
            borderColor: "#5bc1c9", //省市边界线
          },
          emphasis: {
            color: "rgba(37, 43, 61, .5)", //悬浮背景
          },
        },
      },
      dataInfo: {
        itemStyle: {
          type: "effectScatter",
        },
        title: "",
        data: [],
      },
      option: {
        backgroundColor: "rgb(166, 194, 222)",
        geo: {
          map: "world",
          label: {
            show: true,
            emphasis: {
              show: true,
            },
          },
          roam: true, //是否允许缩放
          center: [135.52, 21.89],
          zoom: 6,
          itemStyle: {
            normal: {
              color: ["rgb(217, 234, 246)"], //地图背景色
              borderColor: "#5bc1c9", //省市边界线
            },
            emphasis: {
              color: "rgba(37, 43, 61, .5)", //悬浮背景
            },
          },
        },
        series: [
          {
            name: "航空母舰YYYYY",
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            // color: "#fff",
            rippleEffect: {
              period: 4,
              brushType: "stroke",
              scale: 4,
            },
            itemStyle: {
              normal: {
                color: "#ff0",
              },
            },
            label: {
              normal: {
                show: true,
                position: "right",
                offset: [5, 0],
                formatter: "{b}",
              },
              emphasis: { show: true },
            },
            symbol: "circle",
            data: [],
          },
        ],
      },
    };
  },
  mounted() {
    this.$nextTick(function () {
      var tData = this.dataObj || this.dataInfo;
      this.updateData(tData);
      this.initChart();
    });
  },
  methods: {
    updateData(data) {
      //恢复默认
      this.dataInfo = {
        itemStyle: { ...this.itemStyle },
        titleStyle: { ...this.titleStyle },
        geoStyle: { ...this.geoStyle },
        tooltip: { ...this.tooltip },
      };
      var arr = ["itemStyle", "titleStyle", "geoStyle", "tooltip"];
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
      if (
        !this.dataInfo.itemStyle.type ||
        ["effectScatter", "scatter"].indexOf(this.dataInfo.itemStyle.type) ===
          -1
      ) {
        this.dataInfo.itemStyle.type = "effectScatter"; //item的type不为effectScatter或scatter时，强制修改为effectScatter
      }

      //生成全新的chart option
      this.updateOption();
      //按新的option更新图表
      this.initChart();
    },
    updateOption() {
      var data = this.dataInfo;
      this.option.title = data.titleStyle;
      this.option.title.text = data.title;

      //根据name 数组和itemStyle初始化series;
      this.option.series = [{ ...data.itemStyle }];
      this.option.geo = { ...data.geoStyle };
      this.option.tooltip = { ...data.tooltip };
      // this.option.tooltip._parent = this;
      //更新series元素里的data
      data.data = data.data || [];
      this.option.series[0].data = data.data;
      this.option.series[0].name = data.name;
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
        if (
          e.componentType === "effectScatter" ||
          e.componentType === "scatter"
        ) {
          _self.$emit("node-click", e.data);
        } else if (e.componentType === "geo") {
          _self.$emit("geo-click", e.name);
        }
      });

      this.chart.off("mouseover");
      this.chart.on("mouseover", function (e) {
        if (
          e.componentType === "effectScatter" ||
          e.componentType === "scatter"
        ) {
          _self.$emit("node-mouseover", e.data);
        } else if (e.componentType === "geo") {
          _self.$emit("geo-mouseover", e.name);
        }
      });

      this.chart.off("mouseout");
      this.chart.on("mouseout", function (e) {
        if (
          e.componentType === "effectScatter" ||
          e.componentType === "scatter"
        ) {
          _self.$emit("node-mouseout", e.data);
        } else if (e.componentType === "geo") {
          _self.$emit("geo-mouseout", e.name);
        }
      });
    },
  },
  props: {
    dataObj: Object,
  },
};
</script>

<style scoped>
.chartArea {
  height: 100%;
  min-height: 200px;
}
</style>
