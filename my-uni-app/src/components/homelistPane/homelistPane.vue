<template>
	<view class="home-list-pane">
		<text class="title">新品热卖榜</text>
		<text class="more">查看更多<uni-icons type="arrowright" size="30upx"></uni-icons></text>
		<view class="list-cards">
			<homelistPaneCard v-for="(item,index) in listPane" :key="index" :item="item"></homelistPaneCard>
		</view>
	</view>
</template>

<script>
	import homelistPaneCard from '@/components/homelistPaneCard/homelistPaneCard.vue'
	export default {
		components: {
			homelistPaneCard
		},
		data() {
			return {
				listPane: [{
						img: "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/104842/18/13866/195504/5e5f41a1E61685d67/22588d45f6f4570d.jpg.dpg",
						name: "华为nova5pro绮境森林 8+128G",
						newprice: "2178",
						oldprice: "3999"
					},
					{
						img: "https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/106191/16/14253/351403/5e62228dE78fe57b8/3a4096e0497f2472.jpg!q80.dpg.webp",
						name: "OPPO Find X2 超感官旗舰 3K分辨率 120Hz超感屏 多焦段影像系统 骁龙865 65w闪充 8GB+128GB碧波 双模5G手机",
						newprice: "5499",
						oldprice: "6999"
					},
					{
						img: "https://img.alicdn.com/imgextra/i1/TB1FfmwfubviK0jSZFNJY9ApXXa_065329.jpg_430x430q90.jpg",
						name: " 【省500享24期免息】vivo NEX 3高通骁龙855Plus处理器游戏屏幕指纹手机旗舰vivonex3vivonex nex3限量版",
						newprice: "4498",
						oldprice: "5549"
					}
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scope>
	.home-list-pane {
		margin: 40upx 10upx 0;
		padding: 20upx;
		background-color: #e5e5e5;
		border-radius: 20upx;

		.title {
			font-weight: 600;
			font-size: 30upx;
		}

		.more {
			float: right;
			font-size: 24upx;
		}

		.list-cards {
			display: flex;

		}
	}
</style>
