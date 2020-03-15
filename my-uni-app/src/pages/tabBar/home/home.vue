<template>
	<view>
		<!-- 搜索框 -->
		<homeSearch></homeSearch>
		<!-- 轮播图 -->
		<!-- <swiper :items=swiperList></swiper> -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
			<swiper-item v-for="(item,index) of swiperList" :key="index">
				<image :src="item" style="height: 100%;width: 100%;"></image>
			</swiper-item>
		</swiper>
		<!-- 宫格 -->
		<homeGrid></homeGrid>
		<!-- <topSegmentedControl></topSegmentedControl> -->
		
		<!-- 热榜 -->
		<view class="shops-list">
			<homelistPane></homelistPane>
			<singlePane v-for="(item) in goods" :key="item.id" :item="item" ></singlePane>
		</view>
		
		<!-- 智能列表 -->
		<smartList></smartList>
		<uni-load-more :status="status" />
	</view>
</template>

<script>
	// import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import homeSearch from '@/components/homeSearch/homeSearch.vue'
	import topSegmentedControl from '@/components/topSegmentedControl/topSegmentedControl.vue'
	import swiper from '@/components/swiper/swiper.vue'
	import homeGrid from '@/components/homeGrid/homeGrid.vue'
	import homelistPane from '@/components/homelistPane/homelistPane.vue'
	import singlePane from '@/components/singlePane/singlePane.vue'
	import smartList from '@/components/smartList/smartList.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'

	export default {
		components: {
			// uniSearchBar
			homeSearch,
			topSegmentedControl,
			swiper,
			homeGrid,
			homelistPane,
			singlePane,
			smartList,
			uniLoadMore
		},
		data() {
			return {
				status: 'loading',
				goods: [{
					id: 1,
					img: "https://img.alicdn.com/imgextra/i3/1714128138/O1CN01Ym0Iju29zFgzxwOXZ_!!1714128138.jpg_430x430q90.jpg",
					name: " 小米笔记本电脑Air12.5吋2019款八代酷睿M3处理器",
					comment: "3442",
					newprice: "3299.00",
					oldprice: "3599.00",
					inlogin: false
				}],
				swiperList: [
					'https://aecpm.alicdn.com/simba/img/TB14ab1KpXXXXclXFXXSutbFXXX.jpg_q50.jpg',
					'https://gw.alicdn.com/imgextra/i4/51/O1CN01b3vt451CFOmkyQ9Ua_!!51-0-lubanu.jpg',
					'https://gw.alicdn.com/imgextra/i1/73/O1CN01unyEaP1CPTUzLDyd1_!!73-0-lubanu.jpg',
					'https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg',
					'https://gw.alicdn.com/imgextra/i1/49/O1CN01LQZOOY1CETzl3Z8bR_!!49-0-lubanu.jpg'
				],
			};
		},
		created() {
			console.log('xxxx')
			uni.reLaunch({
				url: '/pages/tabBar/home/home'
			});

		}
	}
</script>

<style>
	.shops-list {
		background-color: #feedfe;
	}

	.swiper {
		margin-bottom: 20upx;
		box-shadow: 0rpx 8rpx 25rpx rgba(0, 0, 0, 0.2);
	}
</style>
