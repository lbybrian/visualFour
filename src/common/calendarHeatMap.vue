<template>
	<div>
		<div id="containerOne" ref="container"></div>
	</div>
</template>

<script>
  import { Heatmap, G2 } from '@antv/g2plot';
	export default {
		name: "",
		props: {
			dataObj: Object,
		},
		data() {
			return {
				dataInfo: {
            data:[],
            height: 400,
            autoFit: false,
            xField: 'week',
            yField: 'day',
            colorField: 'commits',
            color: '#BAE7FF-#1890FF-#0050B3',
            reflect: 'y',
            shape: 'boundary-polygon',
            meta: {
              day: {
                type: 'cat',
                values: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
              },
              week: {
                type: 'cat',
              },
              commits: {
                sync: true,
              },
              date: {
                type: 'cat',
              },
            },
            yAxis: {
              grid: null,
            },
            tooltip: {
              title: 'date',
              showMarkers: false,
            },
            interactions: [{ type: 'element-active' }],
            xAxis: {
              position: 'top',
              tickLine: null,
              line: null,
              label: {
                offset: 12,
                style: {
                  fontSize: 12,
                  fill: '#666',
                  textBaseline: 'top',
                },
                formatter: (val) => {
                  if (val === '2') {
                    return 'MAY';
                  } else if (val === '6') {
                    return 'JUN';
                  } else if (val === '10') {
                    return 'JUL';
                  } else if (val === '15') {
                    return 'AUG';
                  } else if (val === '19') {
                    return 'SEP';
                  } else if (val === '24') {
                    return 'OCT';
                  }
                  return '';
                },
              },
            },
          }
			}
		},
		mounted() {
			this.$nextTick(function() {
				var tData = this.dataObj || this.dataInfo;
        // console.log(1111111111,tData)
        this.showLines();
				this.updateData(tData);
			})



		},

		methods: {
			updateData(newObj) {
        // this._updateData()
          if(this.Heatmap) {
            this.Heatmap.destroy();
          }
          this.Heatmap = new Heatmap(document.getElementById('containerOne'), newObj);
          this.Heatmap.render();
          this.Heatmap.off("plot:click");
          this.Heatmap.on("plot:click",(e)=>{
            console.log(3333333333,e)
          });
          this.Heatmap.off("tooltip:hide");
          // this.Heatmap.on("tooltip:show",(e)=>{
          this.Heatmap.on("tooltip:change",(e)=>{
            console.log(444444444,e)
          });
      },
      showLines(){
        G2.registerShape('polygon', 'boundary-polygon', {
          draw(cfg, container) {
            const group = container.addGroup();
            const attrs = {
              stroke: '#fff',
              lineWidth: 1,
              fill: cfg.color,
              paht: [],
            };
            const points = cfg.points;
            const path = [
              ['M', points[0].x, points[0].y],
              ['L', points[1].x, points[1].y],
              ['L', points[2].x, points[2].y],
              ['L', points[3].x, points[3].y],
              ['Z'],
            ];
            // @ts-ignore
            attrs.path = this.parsePath(path);
            group.addShape('path', {
              attrs,
            });

            if (cfg.data.lastWeek) {
              const linePath = [
                ['M', points[2].x, points[2].y],
                ['L', points[3].x, points[3].y],
              ];
              // 最后一周的多边形添加右侧边框
              group.addShape('path', {
                attrs: {
                  path: this.parsePath(linePath),
                  lineWidth: 4,
                  stroke: '#404040',
                },
              });
              if (cfg.data.lastDay) {
                group.addShape('path', {
                  attrs: {
                    path: this.parsePath([
                      ['M', points[1].x, points[1].y],
                      ['L', points[2].x, points[2].y],
                    ]),
                    lineWidth: 4,
                    stroke: '#404040',
                  },
                });
              }
            }
            return group;
          },
        });

      }
			// _updateData(newObj) {
			// 	this.dataInfo.data=[];
			// 	for(var k in newObj) {
			// 		this.$set(this.dataInfo, k, newObj[k])
			// 		for(var i in newObj.data){
			// 			this.dataInfo.data.push(newObj[i])
			// 		}
			// 	}
			// },
		},
	};
</script>

<style scoped>

</style>
