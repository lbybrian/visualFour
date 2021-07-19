<template>
	<div>
		<div id="container" ref="container"></div>
	</div>
</template>

<script>
	import { WordCloud } from '@antv/g2plot';

	export default {
		name: "",
		props: {
			dataObj: Object,
		},
		data() {
			return {
				dataInfo: {
					data: [],
					changeSign: false,
					imageMask: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ',
					wordField: 'name',
					weightField: 'value',
					colorField: 'name',
					interactions: [{
						type: 'element-active'
					}],
					state: {
						active: { // 这里可以设置 active 时的样式
							style: {
								lineWidth: 3,
							},

						}
					},
					wordStyle: {
						fontFamily: 'Verdana',
						fontSize: [8, 32],
					},
				}
			}
		},

		mounted() {
			this.$nextTick(function() {
				var tData = this.dataObj || this.dataInfo;
				this.updateData(tData);
			});
		},

		methods: {
			updateData(newObj) {
				this._updateData()
				var elem = this.$refs.container;
				if(this.wordCloud) {
					this.wordCloud.destroy();
				}
				this.wordCloud = new WordCloud(elem, newObj);
				//					if(dat.changeSign){
				this.wordCloud.render();
        this.moveoverEvent()
        // this.clickEvent()
			},
			_updateData(newObj) {
						this.dataInfo.data=[]
				for(var k in newObj) {
					this.$set(this.dataInfo, k, newObj[k]);
					for(var i in newObj.data){
						this.dataInfo.data.push(newObj[i])
					}
				}
			},

      moveoverEvent(){
        this.wordCloud.off("mouseover");
        this.wordCloud.on("mouseover", function (e) {
         // console.log(e.data.data.value)
        });
      },
      // clickEvent(){
      //   // this.wordCloud.off("click");
      //   this.wordCloud.on("click", function (e) {
      //     console.log(e.data)
      //   });
      // }


		},
		created() {},
	};
</script>

<style scoped>
	.containerArea {
		width: 100%;
		height: 100%;
	}

	/deep/ .el-pagination {
		padding-left: 0px;
	}
</style>
