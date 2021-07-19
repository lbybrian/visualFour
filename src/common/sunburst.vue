<template>
  <div>
	  <div class="chartArea" ref="chartItem"></div>
  </div>
</template>

<script>
// 引入基本模板
var echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/sunburst");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "",
  props:{
			dataObj: Object,
		},
  data () {
    return {
      itemStyle: {
        type: "sunburst",
      },
      titleStyle: {
        text: "",
      },
      tooltip: {},
      dataInfo: {
        itemStyle: {
          type: "sunburst",
        },
        title: "",
        data: [
          {
            name: 'A',
            value: 10,
            itemStyle: {
              color: '#255'
            },
            // 父级的value是children里value的总和
            children: [{
              value: 3,
              name: 'Ab',
              itemStyle: {
                color: '#965'
              },
            }, {
              value: 5,
              name: 'Aa',
              itemStyle: {
                color: '#755'
              }
            }, {
              value: 2,
              name: 'Ac',
              itemStyle: {
                color: '#235'
              }
            }]
          }, {
            name: 'B',
            itemStyle: {
              color: 'blue'
            },
            children: [{
              name: 'Ba',
              value: 4
            }, {
              name: 'Bb',
              value: 2
            }]
          }, {
            name: 'C',
            value: 8,
            itemStyle: {
              color: 'violet'
            },
            children: [{
              name: 'Ca',
              value: 4,
              itemStyle: {
                color: '#568'
              },
            }, {
              name: 'Cb',
              value: 2,
              itemStyle: {
                color: '#755'
              },
            }, {
              name: 'Cf',
              value: 2,
              itemStyle: {
                color: '#154'
              },
            }]
          }
        ],
      },
      option: {
        // color:['#1890ff','#facc14','#2fc25b','#13c2c2','#f04864','#8543e0'],
        title: { text: "旭日图" },
        tooltip: {},
        series: [],
      },
    }
  },
  mounted () {
			this.$nextTick(function() {
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
      var arr = [
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
      this.dataInfo.itemStyle.type = "sunburst"; //item的type固定，不可外部修改
      //生成全新的chart option
      this.updateOption();
      //按新的option更新图表
      this.initChart();
    },
    updateOption() {
      var obj = this.dataInfo;
      this.option.title = obj.titleStyle;
      this.option.title.text = obj.title;
      var item = { ...obj.itemStyle };
      item.data = obj.data;
      this.option.series = [item];
      this.option.tooltip = obj.tooltip;
      this.option.color = obj.color;
var data = this.option.series[0].data;
    var colors = ['#1890ff','#facc14','#2fc25b','#13c2c2','#f04864','#8543e0'];
    var bgColor = '#2E2733';

    var itemStyle = {
      star5: {
        color: colors[0]
      },
      star4: {
        color: colors[1]
      },
      star3: {
        color: colors[2]
      },
      star2: {
        color: colors[3]
      }
    };

if(data.length>0){
  for (let j = 0; j < data.length; ++j) {
          let level1 = data[j].children;
          for (let i = 0; i < level1.length; ++i) {
            let block = level1[i].children;
            let bookScore = [];
            let bookScoreId;
             if(level1[i].children&&block.length>0){
               for (let star = 0; star < block.length; ++star) {
                 let style = (function(name) {
                   switch (name) {
                     case '4.8':
                       bookScoreId = 0;
                       return itemStyle.star5;
                     case '4':
                       bookScoreId = 1;
                       return itemStyle.star4;
                     case '3':
                       bookScoreId = 2;
                       return itemStyle.star3;
                     case '4.3':
                       bookScoreId = 3;
                       return itemStyle.star2;
                   }
                 })(block[star].name);

                 block[star].label = {
                   color: style.color,
                   downplay: {
                     opacity: 0.5
                   }
                 };

                 if (block[star].children) {
                   style = {
                     opacity: 1,
                     color: style.color
                   };
                   block[star].children.forEach(function(book) {
                     book.value = 1;
                     book.itemStyle = style;

                     book.label = {
                       color: style.color
                     };

                     let value = 1;
                     if (bookScoreId === 0 || bookScoreId === 3) {
                       value = 5;
                     }

                     if (bookScore[bookScoreId]) {
                       bookScore[bookScoreId].value += value;
                     } else {
                       bookScore[bookScoreId] = {
                         color: colors[bookScoreId],
                         value: value
                       };
                     }
                   });
                 }
               }
             }

            level1[i].itemStyle = {
              color: data[j].itemStyle.color
            };
          }
        }
}

      console.log(this.option)
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
  min-height: 400px;
}
</style>
