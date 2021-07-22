<template>
	<div v-if="dataInfo.list.length>0" class="timeline" :style="{width:dataInfo.boxWidth}">
		<div class="button leftButton" v-if="!dataInfo.showSign">
			<el-button size="mini" :disabled="dataInfo.leftButton" circle @click="moveLeft">头部<i class="el-icon-back"></i></el-button>
		</div>

		<!-- 详情 -->
		<div v-if="dataInfo.showSign&&dataInfo.detailList">
			<el-button @click="goback(false)">返回</el-button>
			<p>来源：{{dataInfo.detailList.name}}</p>
			<p>标题：{{dataInfo.detailList.title}}</p>
			<p>相似度：{{dataInfo.detailList.value}}</p>
			<p>时间：{{dataInfo.detailList.time}}</p>
			<p>其他：
			<p v-for="(it,i) in dataInfo.detailList.others" :key="i">{{it}}</p>
		</div>

		<div class="middle" :style="{width:dataInfo.middleWidth}" v-if="!dataInfo.showSign">

			<ul id="divUl" ref="divUl" :style="{width:dataInfo.divUlWidth,marginLeft:dataInfo.divUlMarginLeft}">
				<li v-for="(item, i) in dataInfo.list" :key="i">
					<div class="upBox" v-if="i%2===0" @click="showDetail(i)">
						<el-tooltip class="item" effect="light" :content="item.title" placement="top-start">
							<span>{{item.title}}</span>
							<div v-for="(it,i) in item.others" :key="i">
								<div v-if="item.others.length>0&&typeof it==='object'">
									<p class="text" v-if="it.name">{{it.name}}</p>
									<p style="text-align: center;" v-if="it.value">{{it.value}}</p>
									<p style="text-align: center;" v-if="it.ces">{{it.ces}}</p>
								</div>
								<p v-if="item.others.length>0&&typeof it==='string'" style="text-align: center;word-break: break-all;">{{it}}</p>
							</div>
						</el-tooltip>
					</div>
					<div class="upBox" style="border: none;margin-bottom: 22px;" v-if="i%2!==0"></div>
					<div class="year">
						<p>
							<span class="Dline"></span>
							<span class="Slineup" v-if="i%2===0"></span>
							<span class="Slinedown" v-if="i%2!==0"></span>
							<span class="tap"></span>
							<span class="Dline"></span>
						</p>
						<p class="center">{{item.time}}</p>
					</div>

					<div class="downBox" v-if="i%2!==0" @click="showDetail(i)">
						<el-tooltip class="item" effect="light" :content="item.title" placement="top-start">
							<span>{{item.title}}</span>
							<div v-for="(it,i) in item.others" :key="i">
								<div v-if="item.others.length>0&&typeof it==='object'">
									<p class="text" v-if="it.name">{{it.name}}</p>
									<p style="text-align: center;" v-if="it.value">{{it.value}}</p>
									<p style="text-align: center;" v-if="it.ces">{{it.ces}}</p>
								</div>
								<p v-if="item.others.length>0&&typeof it==='string'" style="text-align: center;word-break: break-all;">{{it}}</p>
							</div>
						</el-tooltip>
					</div>
					<div class="downBox" style="border: none;" v-if="i%2===0"></div>
				</li>
			</ul>

		</div>

		<div class="button rightButton" v-if="!dataInfo.showSign">
			<el-button size="mini" :disabled="dataInfo.rightButton" circle @click="moveRight">尾部<i class="el-icon-right"></i></el-button>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
export default {
	props: {
		dataObj: Object,
	},
	data () {
		return {
			dataInfo: {
				showSign: false,
				leftButton: false,
				rightButton: false,
				list: [{
					time: '2012/12/12',
					title: '《Palantir技术探秘》《Palantir技术探秘》《Palantir技术探秘》',
					others: ['测试数据11', { ces: '测试数据22', value: '95%', name: '环球网' }],
				},
				{
					time: '2013/12/12',
					title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
					others: ['测试数据11'],
				},
				{
					time: '2014/12/12',
					title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
					others: ['测试数据11', { value: '43%', name: '环球网2', ces: '测试数据22' }],
				},
				{
					time: '2015/12/12',
					title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
					others: [{ name: '环球网2', value: '54%' }],
				},
				{
					time: '2016/12/12',
					title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
					others: ['测试数据22', { name: '环球网2', value: '24%' }],
				},
				{
					time: '2017/12/12',
					title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
					others: [{ name: '环球网2', value: '67%' }],
				},
				{
					time: '2012/12/12',
					title: '《Palantir技术探秘》《Palantir技术探秘》《Palantir技术探秘》',
					others: [{ ces: '测试数据22', value: '95%', name: '环球网' }],
				},
				{
					time: '2013/12/12',
					title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
					others: [{ value: '21%', name: '环球网2', ces: '测试数据22' }],
				},
				{
					time: '2014/12/12',
					title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
					others: ['测试数据11'],
				},
				{
					time: '2015/12/12',
					title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
					others: [{ name: '环球网2', value: '54%' }],
				},
				{
					time: '2016/12/12',
					title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
					others: ['测试数据22', { name: '环球网2', value: '24%' }],
				},
				{
					time: '2017/12/12',
					title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
					others: [{ name: '环球网2', value: '67%' }],
				},
				{
					time: '2012/12/12',
					title: '《Palantir技术探秘》《Palantir技术探秘》《Palantir技术探秘》',
					others: ['测试数据11'],
				},
				{
					time: '2013/12/12',
					title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
					others: [{ value: '21%', name: '环球网2', ces: '测试数据22' }],
				},
				{
					time: '2014/12/12',
					title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
					others: ['测试数据11', { value: '43%', name: '环球网2', ces: '测试数据22' }],
				},
				{
					time: '2015/12/12',
					title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
					others: [{ name: '环球网2', value: '54%' }],
				},
				{
					time: '2016/12/12',
					title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
					others: ['测试数据22'],
				},
				{
					time: '2017/12/12',
					title: '《Palantir技术探秘2》《Palantir技术探秘2》《Palantir技术探秘2》',
					others: [{ name: '环球网2', value: '67%' }],
				}
				],
				width: 0,
				// colors: ['red','yellow','greey'],
				middleWidth: 360,
				boxWidth: 490,
				N: 3,
				divUlWidth: '0px',
				divUlMarginLeft: '0px'
			}
		}
	},
	mounted () {
		this.$nextTick(function () {
			var tData = this.dataInfo || this.dataObj;
			this.updateData(tData);
		});
	},
	methods: {
		updateData (obj) {
			this.dataInfo = {} = obj;
			this.dataInfo.list = obj.list;
			this.dataInfo.width = obj.list.length * 130
			this.dataInfo.divUlWidth = obj.width + 'px'
			this.dataInfo.divUlMarginLeft = '0px'
		},
		moveLeft () {
			if (this.dataInfo.list.length > this.dataInfo.N) {
				let left = parseInt($('#divUl').css('margin-left'))
				if (left <= -130 * (this.dataInfo.list.length - this.dataInfo.N)) {
					left = -130 * (this.dataInfo.list.length - this.dataInfo.N)
					this.dataInfo.leftButton = true
					this.dataInfo.rightButton = false
				} else {
					left = left - 130
					this.dataInfo.leftButton = false
					this.dataInfo.rightButton = false
				}
				this.dataInfo.divUlMarginLeft = left + 'px'
				// $('#divUl').css('margin-left', left + 'px')
			} else {
				this.dataInfo.leftButton = true
			}
		},
		moveRight () {
			if (this.dataInfo.list.length > this.dataInfo.N) {
				let left = parseInt(this.dataInfo.divUlMarginLeft)
				if (left === 0) {
					left = 0
					this.dataInfo.rightButton = true
					this.dataInfo.leftButton = false
				} else {
					left = left + 130
					this.dataInfo.leftButton = false
					this.dataInfo.rightButton = false
				}
				this.dataInfo.divUlMarginLeft = left + 'px'
			} else {
				this.dataInfo.rightButton = true
			}
		},
		showDetail (i) {
			if (this.dataInfo.detailList) {
				this.dataInfo.showSign = true;
				this.dataInfo.detailList = [];
				this.dataInfo.detailList = this.dataInfo.list[i];
				console.log(i, this.dataInfo.list[i], this.dataInfo.detailList);
			}
			else {
				this.$emit('click', i)
				alert('点击事件！')
			}
		},
		goback (bol) {
			this.dataInfo.showSign = bol;
			this.$emit('goback', bol)
		}
	}
}

</script>
<style>
/* element.style #divUl{
    width: 780px;
    margin-left: 0px;
} */
</style>
<style scoped>
.timeline {
	position: relative;
	width: 100%;
	height: 200px;
	overflow: hidden;
	font-size: 12px;
	/*padding-top: 20px;*/
}

.center {
	text-align: center;
	position: absolute;
	z-index: 99;
	left: 35px;
}

.button {
	position: absolute;
	top: 0;
	width: 50px;
	height: 28px;
	margin-top: 80px;
}

.leftButton {
	left: 0;
}

.rightButton {
	right: 0;
}

.middle {
	float: left;
	margin-left: 50px;
	/* width: calc(100% - 100px); */
	width: 652px;
	overflow: hidden;
}

ul {
	height: auto;
	margin-left: 0;
}

ul li {
	width: 130px;
	float: left;
	font-size: 12px;
	color: #60626f;
}

.upBox,
.downBox {
	width: 120px;
	height: 40px;
	padding: 5px;
	overflow: hidden;
	text-align: left;
	border: 1px solid #eceae5;
	border-radius: 4px;
	min-height: 58px;
	/* max-height: 220px; */
	/* margin: -2px 0; */
}

.text {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-weight: 900;
	cursor: pointer;
	text-align: center;
}

.text span {
	font-weight: normal;
}

.year {
	height: 20px;
	margin: 20px 0;
	position: relative;
}

.tap {
	display: inline-block;
	width: 12px;
	height: 12px;
	background-color: deepskyblue;
	/*margin-top: 25px;*/
	border-radius: 50%;
}

.Dline {
	width: 55px;
	display: inline-block;
	height: 1px;
	margin-bottom: 5px;
	background: #eceae5;
	/* position: absolute;
    top:-54px;
    left:30px; */
}
.Slineup {
	height: 27px;
	border-right: deepskyblue 2px solid;
	position: absolute;
	left: 63px;
	top: -20px;
}
.Slinedown {
	height: 27px;
	border-right: deepskyblue 2px solid;
	position: absolute;
	left: 63px;
	top: 14px;
	z-index: 98;
}
</style>
