<template>
  <div v-show="status === true" class="chartArea" ref="chartItem"></div>
</template>


<script>
// 引入基本模板
var echarts = require("echarts/lib/echarts");
// 引入漏斗图组件
require("echarts/lib/chart/funnel");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
    name:"",
    data(){
        return {
            status: true,
            itemStyle: {
              type: "funnel",
            },
            titleStyle: {
              text: "",
            },
            dataInfo:{
              itemStyle: {
                type: "funnel",
              },
              title:"",
              name:"漏斗图",
              data:[
                    {
                      value: 60, 
                      name: '访问'
                    },
                    {
                      value: 40, 
                      name: '咨询'
                    },
                    {
                      value: 20,
                      name: '订单'
                    },
                    {
                      value: 80, 
                      name: '点击'
                    },
                    {
                      value: 100, 
                      name: '展现'
                    }
                  ],
              },
            option:{
              title: {},
              tooltip: {},
              series: [
                    {
                    name:'漏斗图',
                    type:'funnel',
                  
                    label: {
                        show: true,
                        position: 'inside'
                    },            
                    emphasis: {
                        label: {
                            fontSize: 50
                        }
                    },
                    data: [
                        {value: 60, name: '访问'},
                        {value: 40, name: '咨询'},
                        {value: 20, name: '订单'},
                        {value: 80, name: '点击'},
                        {value: 100, name: '展现'}
                        ]
                     }
              ],   
            }
          }   
        },
    props:{
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
          this.dataInfo.itemStyle.type = "funnel"; //item的type固定，不可外部修改
          //生成全新的chart option
          this.updateOption();
          //按新的option更新图表
          this.initChart();
        },
        updateOption() {
          var data = this.dataInfo;
          this.option.title = data.titleStyle;
          this.option.title.text = data.title;
          var item = { ...data.itemStyle };
          item.data = data.data;
          this.option.series = [item];
          this.option.tooltip = data.tooltip;
          this.option.color = data.color;
          var sort = data.sort || "ascending"; //ascending or descending
          var axisData;
          data.data = data.data || [];
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
     }

</script>

<style scoped>
.chartArea {
  height: 100%;
  min-height: 500px;
}
</style>