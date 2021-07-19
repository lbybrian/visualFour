<template>
	<div>
		<div id="containerId" ref="container"></div>
	</div>
</template>

<script>
	import { Chart } from '@antv/g2';
// 引入世界地图数据
require("../../static/map/world_new.js");
	export default {
		name: "",
		props: {
			dataObj: Object,
		},
		data() {
			return {
			dataInfo: {
            data: [],
            container: 'containerId',
              autoFit: true,
              height: 500,
              padding: [0, 30, 60, 30],
              //主题样式
              theme:{ "styleSheet": { "brandColor": "#FF4500", "paletteQualitative10": ["#FF4500", "#1AAF8B", "#406C85", "#F6BD16", "#B40F0F", "#2FB8FC", "#4435FF", "#FF5CA2", "#BBE800", "#FE8A26"], "paletteQualitative20": ["#FF4500", "#1AAF8B", "#406C85", "#F6BD16", "#B40F0F", "#2FB8FC", "#4435FF", "#FF5CA2", "#BBE800", "#FE8A26", "#946DFF", "#6C3E00", "#6193FF", "#FF988E", "#36BCCB", "#004988", "#FFCF9D", "#CCDC8A", "#8D00A1", "#1CC25E"] }
              },
            //标注图片配置
            annotationImage:{
              start: ['min', 'max'],
              end: ['max', 'min'],
              src: '/../../static/images/NeUTMwKtPcPxIFNTWZOZ.png',
            },
            color:'#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2'
				}
			}
		},

		mounted() {
			this.$nextTick(function() {
				var tData = this.dataObj || this.dataInfo;
        // console.log(1111111111,tData)
				this.updateData(tData);
			})
		},

		methods: {
			updateData(newObj) {
        // this._updateData() 
          if(this.Chart) {
            this.Chart.destroy();
          }
          this.Chart=new Chart(newObj)
          console.log(  this.Chart)
          this.Chart.data(newObj.data);
          this.Chart.scale({//度量
            tmp: { nice: true }
          });
          this.Chart.tooltip({
            showTitle: false
          });
          this.Chart.axis(false);//是否展示坐标轴
          this.Chart.legend({//图例
            offset: 10
          });
          this.Chart.heatmap()
            .position('g*l')
            .color('tmp', newObj.color);
          this.Chart.annotation().image(newObj.annotationImage);
          // chart.theme(newObj.styleSheet);
          this.Chart.render();

          this.Chart.off("click");
          this.Chart.on("click", function (e) {
            console.log(e)
          });

          // this.moveoverEvent()
      },
			// _updateData(newObj) {
			// 	this.dataInfo.data=[];
			// 	for(var k in newObj) {
			// 		this.$set(this.dataInfo, k, newObj[k])
			// 		for(var i in newObj.data){
			// 			this.dataInfo.data.push(newObj[i])
			// 		}
			// 	}
			// },
      moveoverEvent(){},
		},
		created() {},
	};
</script>

<style scoped>

</style>
