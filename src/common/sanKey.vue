<template>
	<div>
		<div id="container" ref="container"></div>
	</div>
</template>

<script>
	import { Sankey } from '@antv/g2plot';

	export default {
		name: "",
props: {
		dataObj: Object,
	},
	data() {
		return {
			dataInfo: {
				data: [{
						source: '首次打开',
						target: '首页 UV',
						value: 160
					},
					{
						source: '结果页',
						target: '首页 UV',
						value: 40
					},
					{
						source: '验证页',
						target: '首页 UV',
						value: 10
					},
					{
						source: '我的',
						target: '首页 UV',
						value: 10
					},
					{
						source: '朋友',
						target: '首页 UV',
						value: 8
					},
					{
						source: '其他来源',
						target: '首页 UV',
						value: 27
					},
					{
						source: '首页 UV',
						target: '理财',
						value: 30
					},
					{
						source: '首页 UV',
						target: '扫一扫',
						value: 40
					},
					{
						source: '首页 UV',
						target: '服务',
						value: 35
					},
					{
						source: '首页 UV',
						target: '蚂蚁森林',
						value: 25
					},
					{
						source: '首页 UV',
						target: '跳失',
						value: 10
					},
					{
						source: '首页 UV',
						target: '借呗',
						value: 30
					},
					{
						source: '首页 UV',
						target: '花呗',
						value: 40
					},
					{
						source: '首页 UV',
						target: '其他流向',
						value: 45
					},
				],
				sourceField:'source',
				targetField: 'target',
				weightField: 'value',
				nodeWidthRatio: 0.008,
				nodePaddingRatio: 0.03,

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
			updateData(obj){
				if(this.sankey){
					this.sankey.destroy()
				}
//				let DATA=this.dataInfo.data;
//				let DATA=this.dataObj.data?this.dataObj.data:this.dataInfo.data;
				let elem = this.$refs.container;
				this.sankey = new Sankey(elem,obj);
				this.sankey.render();
        this.moveoverEvent()
			},

      moveoverEvent(){
        this.sankey.off("mouseover");
        this.sankey.on("mouseover", function (e) {
          console.log(e.data.data.name)
        });
      }

		},
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
