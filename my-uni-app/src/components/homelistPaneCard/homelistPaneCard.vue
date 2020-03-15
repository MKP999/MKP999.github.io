<template>
	<view class="list-card" v-if="item">
		<image :src="item.img" mode="widthFix"></image>
		<text class="goods-title">{{item.name}}</text>
		<view class="price">
			<text class="new-price">¥{{item.newprice}}</text>
			<text class="old-price">¥{{item.oldprice}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["item"],
		data() {
			return {}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.list-card {
		margin: 40upx 0;
		display: flex;
		flex: 1;
		flex-direction: column;
		box-shadow: 0rpx 8rpx 25rpx rgba(0, 0, 0, 0.2);
		background-color: #FFFFFF;
		padding:20upx 10upx;
		box-sizing: border-box;
		margin: 0 8upx;
		border-radius: 16upx;

		image {
			width: 180upx;
			height: 200upx;

		}

		.goods-title {
			font-size: 28upx;
			font-weight: 500;
			word-break: break-all;
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			margin: 10upx 0;
		}

		.price {
			font-size: 28upx;
			color: red;
			margin: 15upx 5upx;

			.old-price {
				font-size: 18upx;
				color: #999999;
				text-decoration: line-through;
				float: right;
				padding-top: 5upx;
			}
		}
	}
</style>
