<template>
	<view>
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
			<swiper-item v-for="(item,index) of items" :key="index">
				<image :src="item"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [
					'https://aecpm.alicdn.com/simba/img/TB14ab1KpXXXXclXFXXSutbFXXX.jpg_q50.jpg',
					'https://gw.alicdn.com/imgextra/i4/51/O1CN01b3vt451CFOmkyQ9Ua_!!51-0-lubanu.jpg',
					'https://gw.alicdn.com/imgextra/i1/73/O1CN01unyEaP1CPTUzLDyd1_!!73-0-lubanu.jpg',
					'https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg',
					'https://gw.alicdn.com/imgextra/i1/49/O1CN01LQZOOY1CETzl3Z8bR_!!49-0-lubanu.jpg'
				],
				props: ["items"]
			};
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scope>
	.swiper{

	}
</style>
