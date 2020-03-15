<template>
	<view class="category">
		<view class="category-wrapper" v-if="catrgoryList.length>0">
			<!-- 左边导航 -->
			<scroll-view scroll-y="true" class="left-wrapper" scroll-with-animation="true" :scroll-top="left_scroll">
				<view class="left-content">
					<view class="title-content" :class="select_index === index?'onSelected':''" v-for="(title,index) in catrgoryList"
					 :key="title.id" @tap="choose(index)">{{title.name}}</view>
				</view>
			</scroll-view>
			<!-- 右边内容 -->
			<scroll-view scroll-y="true" class="right-wrapper" scroll-with-animation="true" :scroll-top="right_scroll" @scroll="myscroll">
				<view class="right-content">
					<!-- banner区域 -->
					<view class="banner-wrapper">
						<swiper class="swiper-content" :autoplay="true" :interval="3000" :circular="true">
							<swiper-item class="swiper-item" v-for="imgs in swiperList" :key="imgs.id">
								<image class="swiper-img" :src="imgs.src"></image>
							</swiper-item>
						</swiper>
					</view>
					<!-- 产品区 -->
					<view class="product-wrapper">
						<view class="category-item" :id="'list'+c_index" v-for="(c_item,c_index) in catrgoryList" :key="c_item.id">
							<view class="category-title">{{c_item.name}}</view>
							<view class="category-content">
								<view class="product-item" v-for="(p_item,p_index) in c_item.content" :key="p_item.id">
									<image class="product-img" :src="p_item.thumb"></image>
									<text class="product-title">{{p_item.cname}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windows_height: 0, //屏幕高度
				swiperList: [{
					id: 1,
					src: "https://aecpm.alicdn.com/simba/img/TB14ab1KpXXXXclXFXXSutbFXXX.jpg_q50.jpg"
				}, {
					id: 2,
					src: "https://gw.alicdn.com/imgextra/i4/51/O1CN01b3vt451CFOmkyQ9Ua_!!51-0-lubanu.jpg"
				}, {
					id: 3,
					src: "https://gw.alicdn.com/imgextra/i1/73/O1CN01unyEaP1CPTUzLDyd1_!!73-0-lubanu.jpg"
				}],
				catrgoryList: [{
					id: 1,
					name: "手机",
					content: [{
						id: 1,
						thumb: "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/104842/18/13866/195504/5e5f41a1E61685d67/22588d45f6f4570d.jpg.dpg",
						cname: "华为"
					}, {
						id: 2,
						thumb: "https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/106191/16/14253/351403/5e62228dE78fe57b8/3a4096e0497f2472.jpg!q80.dpg.webp",
						cname: "OPPO"
					}, {
						id: 3,
						thumb: "https://img.alicdn.com/imgextra/i1/TB1FfmwfubviK0jSZFNJY9ApXXa_065329.jpg_430x430q90.jpg",
						cname: "vivo"
					}]
				}, {
					id: 2,
					name: "鞋靴",
					content: [{
						id: 1,
						thumb: "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/104842/18/13866/195504/5e5f41a1E61685d67/22588d45f6f4570d.jpg.dpg",
						cname: "华为"
					}, {
						id: 2,
						thumb: "https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/106191/16/14253/351403/5e62228dE78fe57b8/3a4096e0497f2472.jpg!q80.dpg.webp",
						cname: "OPPO"
					}, {
						id: 3,
						thumb: "https://img.alicdn.com/imgextra/i1/TB1FfmwfubviK0jSZFNJY9ApXXa_065329.jpg_430x430q90.jpg",
						cname: "vivo"
					}]
				}, {
					id: 3,
					name: "电器",
					content: [{
						id: 1,
						thumb: "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/104842/18/13866/195504/5e5f41a1E61685d67/22588d45f6f4570d.jpg.dpg",
						cname: "华为"
					}, {
						id: 2,
						thumb: "https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/106191/16/14253/351403/5e62228dE78fe57b8/3a4096e0497f2472.jpg!q80.dpg.webp",
						cname: "OPPO"
					}, {
						id: 3,
						thumb: "https://img.alicdn.com/imgextra/i1/TB1FfmwfubviK0jSZFNJY9ApXXa_065329.jpg_430x430q90.jpg",
						cname: "vivo"
					}]
				}, {
					id: 4,
					name: "家具",
					content: [{
						id: 1,
						thumb: "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/104842/18/13866/195504/5e5f41a1E61685d67/22588d45f6f4570d.jpg.dpg",
						cname: "华为"
					}, {
						id: 2,
						thumb: "https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/106191/16/14253/351403/5e62228dE78fe57b8/3a4096e0497f2472.jpg!q80.dpg.webp",
						cname: "OPPO"
					}, {
						id: 3,
						thumb: "https://img.alicdn.com/imgextra/i1/TB1FfmwfubviK0jSZFNJY9ApXXa_065329.jpg_430x430q90.jpg",
						cname: "vivo"
					}]
				}, {
					id: 5,
					name: "护肤",
					content: [{
						id: 1,
						thumb: "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/104842/18/13866/195504/5e5f41a1E61685d67/22588d45f6f4570d.jpg.dpg",
						cname: "华为"
					}, {
						id: 2,
						thumb: "https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/106191/16/14253/351403/5e62228dE78fe57b8/3a4096e0497f2472.jpg!q80.dpg.webp",
						cname: "OPPO"
					}, {
						id: 3,
						thumb: "https://img.alicdn.com/imgextra/i1/TB1FfmwfubviK0jSZFNJY9ApXXa_065329.jpg_430x430q90.jpg",
						cname: "vivo"
					}]
				}, {
					id: 6,
					name: "化妆",
					content: [{
						id: 1,
						thumb: "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/104842/18/13866/195504/5e5f41a1E61685d67/22588d45f6f4570d.jpg.dpg",
						cname: "华为"
					}, {
						id: 2,
						thumb: "https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/106191/16/14253/351403/5e62228dE78fe57b8/3a4096e0497f2472.jpg!q80.dpg.webp",
						cname: "OPPO"
					}, {
						id: 3,
						thumb: "https://img.alicdn.com/imgextra/i1/TB1FfmwfubviK0jSZFNJY9ApXXa_065329.jpg_430x430q90.jpg",
						cname: "vivo"
					}]
				}, {
					id: 7,
					name: "出行",
					content: [{
						id: 1,
						thumb: "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/104842/18/13866/195504/5e5f41a1E61685d67/22588d45f6f4570d.jpg.dpg",
						cname: "华为"
					}, {
						id: 2,
						thumb: "https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/106191/16/14253/351403/5e62228dE78fe57b8/3a4096e0497f2472.jpg!q80.dpg.webp",
						cname: "OPPO"
					}, {
						id: 3,
						thumb: "https://img.alicdn.com/imgextra/i1/TB1FfmwfubviK0jSZFNJY9ApXXa_065329.jpg_430x430q90.jpg",
						cname: "vivo"
					}]
				}, {
					id: 8,
					name: "汽车",
					content: [{
						id: 1,
						thumb: "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/104842/18/13866/195504/5e5f41a1E61685d67/22588d45f6f4570d.jpg.dpg",
						cname: "华为"
					}, {
						id: 2,
						thumb: "https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/106191/16/14253/351403/5e62228dE78fe57b8/3a4096e0497f2472.jpg!q80.dpg.webp",
						cname: "OPPO"
					}, {
						id: 3,
						thumb: "https://img.alicdn.com/imgextra/i1/TB1FfmwfubviK0jSZFNJY9ApXXa_065329.jpg_430x430q90.jpg",
						cname: "vivo"
					}]
				}],
				select_index: 0,
				right_height: [], //右侧每个内容的高度集合
				right_scroll: 0, //右侧的滑动值
				left_height: 0, //左侧总高度
				left_scroll: 0, //左侧滑动值
				last: 0,
			}
		},
		onLoad() {
			this.init();
			this.windows_height = uni.getSystemInfoSync().windowHeight;
		},
		methods: {
			init() {
				// uni.request({
				// 	url: 'https://www.easy-mock.com/mock/5d351e87b5e1f213739d6498/shop/categoryList', //仅为示例，并非真实接口地址。
				// 	method: 'GET',
				// 	success: (res) => {
				// 		if (res.data.error === 0) {
				// 			// this.catrgoryList = res.data.data.list;
				// 			// this.swiperList = res.data.data.banner;


				this.$nextTick(() => {
					this.getHeightList();
				})
				// }
				// }
				// });
			},
			getHeightList() {
				let _this = this;
				let selectorQuery = uni.createSelectorQuery();
				selectorQuery.select('.left-content').boundingClientRect(function(rects) {
					_this.left_height = rects.height;
				});
				selectorQuery.selectAll('.category-item').boundingClientRect(function(rects) {
					_this.right_height = rects.map((item) => item.top);
					console.log(_this.right_height)
				}).exec();
			},
			choose(index) {
				if (this.select_index === index) {
					return;
				}
				this.select_index = index;
				// 加入防抖
				if (this.timeout) {
					clearTimeout(this.timeout); //清除计时器				
				}
				this.timeout = setTimeout(() => {
					this.right_scroll = this.right_height[index] - 110;
				}, 300)
			},
			myscroll(e) {
				//引入节流	
				let right_content_height = e.detail.scrollHeight - this.windows_height;
				if (right_content_height == e.detail.scrollTop) {
					return;
				}
				let scroll_top = e.detail.scrollTop + 110; //110是banner图的高度
				//判断当前的scrollTop在哪个区间内;
				let now = +new Date();
				if (now - this.last > 100) {
					this.last = now;
					let active_index = this.right_height.findIndex((value, index, arr) => value <= scroll_top && scroll_top < arr[
						index + 1]);
					this.select_index = active_index;
					if (this.left_height - this.windows_height) {
						//如果有超出部分
						let diff = this.left_height - this.windows_height
						this.left_scroll = Math.round((active_index * diff) / (this.catrgoryList.length - 1))
					}
				}
			}
		}
	}
</script>

<style lang="less">
	.category {

		.category-wrapper {
			width: 100%;
			display: flex;
			flex-direction: row;
			position: absolute;
			top: 0;
			bottom: 0;

			.left-wrapper {
				width: 200rpx;
				flex: 0 0 200rpx;
				background-color: #f6f6f6;

				.left-content {

					.title-content {
						width: 100%;
						height: 100rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 25rpx;
						border-bottom: 1px solid #dedede;
						cursor: pointer;

						&:last-child {
							border-bottom: 0;
						}

						&.onSelected {
							background-color: #fff;
							position: relative;
							color: #feb436;

							&::before {
								content: '';
								position: absolute;
								left: 0;
								top: 0;
								width: 10rpx;
								height: 100%;
								background: linear-gradient(124deg, #feb436 0%, #fb7c22 100%);
							}
						}
					}
				}
			}

			.right-wrapper {
				flex: 1;

				.right-content {
					width: 100%;
					padding: 20rpx 0;
					border-left: 1rpx solid #efefef;
					box-sizing: border-box;

					.banner-wrapper {
						padding: 0 20rpx;

						.swiper-content {
							width: 100%;
							height: 180rpx;
							margin-bottom: 20rpx;

							.swiper-item {
								.swiper-img {
									width: 100%;
									height: 180rpx;
								}
							}
						}
					}

					.product-wrapper {
						.category-item {

							.category-title {
								height: 60rpx;
								font-size: 26rpx;
								line-height: 60rpx;
								font-weight: 500;
								background-color: #f6f6f6;
								padding-left: 20rpx;
								color: #000;
							}

							.category-content {
								display: flex;
								flex-direction: row;
								flex-flow: wrap;
								padding: 20rpx 20rpx 0;


								.product-item {
									width: 33%;
									display: flex;
									flex-direction: column;
									justify-content: center;
									align-items: center;
									margin-bottom: 20rpx;

									.product-img {
										width: 120rpx;
										height: 140rpx;
										margin-bottom: 10rpx;
									}

									.product-title {
										font-size: 23rpx;
									}
								}
							}
						}
					}
				}
			}
		}

	}
</style>
