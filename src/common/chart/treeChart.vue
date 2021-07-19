<template>
  <div v-show="status === true" class="chartArea" ref="chartItem"></div>
</template>

<script>
// 引入基本模板
var echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/tree");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "",
  data() {
    return {
      status: true,
      itemStyle: {
        type: "tree",
        id: 0,
        name: 'tree1',
        top: 32,
        left: 64,
        bottom: 32,
        right: 160,

        symbolSize: 7,

        edgeShape: 'polyline',
        edgeForkPosition: '63%',
        initialTreeDepth: 3,

        lineStyle: {
          width: 2,
          color:'#cecece'
        },

        label: {
          // backgroundColor: '#fff',
          position: 'left',
          verticalAlign: 'middle',
          align: 'right'
        },

        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        },

        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
      },
      titleStyle: {
        text: "",
      },
      // xAxisStyle: {},
      tooltip: {},
      // yAxisStyle: {},
      dataInfo: {
        itemStyle: {
          type: "tree",
        },
        title: "treeTitle",
        data: [
          {
            "name": "张三",
            "children": [
              {
                "name": "李四",
                "children": [
                  {
                    "name": "converters",
                    "children": [
                      {
                        "name": "Converters",
                        "value": 721
                      },
                      {
                        "name": "DelimitedTextConverter",
                        "value": 4294
                      }
                    ]
                  },
                  {
                    "name": "DataUtil",
                    "value": 3322
                  }
                ]
              },
              {
                "name": "张三",
                "children": [
                  {
                    "name": "DirtySprite",
                    "value": 8833
                  },
                  {
                    "name": "LineSprite",
                    "value": 1732
                  },
                  {
                    "name": "RectSprite",
                    "value": 3623
                  }
                ]
              },
              {
                "name": "{{受众}}",
                "children": [
                  {
                    "name": "FlareVis",
                    "value": 4116
                  }
                ]
              },
              {
                "name": "query",
                "children": [
                  {
                    "name": "AggregateExpression",
                    "value": 1616
                  },
                  {
                    "name": "And",
                    "value": 1027
                  },
                  {
                    "name": "Xor",
                    "value": 1101
                  }
                ]
              },
              {
                "name": "scale",
                "children": [
                  {
                    "name": "IScaleMap",
                    "value": 2105
                  },
                  {
                    "name": "LinearScale",
                    "value": 1316
                  },
                  {
                    "name": "TimeScale",
                    "value": 5833
                  }
                ]
              }]
          }
        ],
        orient: "",
      },
      option: {
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        // xAxis: {
        //   data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        // },
        // yAxis: {},
        series: [
          {
            type: 'tree',
            data: [],
            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '20%',
            orient: 'vertical',

            symbolSize: 7,
            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 13
            },

            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
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
        // xAxisStyle: { ...this.xAxisStyle },
        // yAxisStyle: { ...this.yAxisStyle },
        itemStyle: { ...this.itemStyle },
        titleStyle: { ...this.titleStyle },
        tooltip: { ...this.tooltip },
        data: [],
      };
      var arr = [
        // "xAxisStyle",
        // "yAxisStyle",
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
      this.dataInfo.itemStyle.type = "tree"; //item的type固定，不可外部修改
      //生成全新的chart option
      this.updateOption();
      //按新的option更新图表
      this.initChart();
    },
    updateOption() {
      var data = this.dataInfo;
      this.option.title = data.titleStyle;
      this.option.title.text = data.title;
      // this.option.series = [];
      var item = { ...data.itemStyle };
      item.data = data.data;
      console.log(item)
      this.option.series = [item];
      // var name = data.name || "-";
      // if (typeof name === "string") {
      //   name = [name];
      // }
      //根据name 数组和itemStyle初始化series;
      // for (var i = 0; i < name.length; i++) {
      //   var item = { ...data.itemStyle };
      //   item.data = [];
      //   item.name = name[i];
      //   this.option.series.push(item);
      // }
      // if (name.length > 1) {
      //   this.option.legend = data.legendStyle || {
      //     show: true,
      //   };
      //   this.option.legend.data = name;
      // }

      //初始化xAxis和yAxis
      // this.option.xAxis = data.xAxisStyle;
      // this.option.yAxis = data.yAxisStyle;
      this.option.tooltip = data.tooltip;
      var orient = data.orient || "vertical"; //horizontal or vertical
      var axisData;
      // if (mode === "vertical") {
      //   this.option.xAxis.data = [];
      //   axisData = this.option.xAxis;
      // } else {
      //   this.option.yAxis.data = [];
      //   axisData = this.option.yAxis;
      // }

      //更新Axis和series元素里的data
      data.data = data.data || [];
      // for (var i = 0; i < data.data.length; i++) {
      //   var item = data.data[i];
      //   axisData.data.push(item.name);
      //   if (typeof item.value === "number") {
      //     item.value = [item.value];
      //   }
      //   for (var j = 0; j < this.option.series.length; j++) {
      //     this.option.series[j].data.push(item.value[j] || 0);
      //   }
      // }
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
