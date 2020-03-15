<template>
	<view class="single-pane">
		<template v-if="inlogin && item.inlogin">
			<text>
				<b>{{ item.firm }}</b>
			</text>
		</template>

		<template v-else>
			<text class="title">五星笔记本</text>
			<text class="more">
				查看更多
				<uni-icons type="arrowright" size="30upx"></uni-icons>
			</text>
		</template>

		<view class="single-card">
			<view class="img"><image :src="item.img" mode="aspectFit"></image></view>

			<view class="good-detail">
				<text class="goods-title">{{ item.name }}</text>
				<template v-if="!item.inlogin">
					<text class="goods-comment">
						累计评论
						<span>{{ item.comment }}</span>
					</text>
				</template>

				<view class="price">
					<text class="new-price">¥{{ item.newprice }}</text>
					<template v-if="inlogin && item.inlogin">
						<uni-number-box :min="0" :max="99"></uni-number-box>
					</template>

					<template v-else>
						<text class="old-price">¥{{ item.oldprice }}</text>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
export default {
	components: {
		uniNumberBox
	},
	props: ['item'],
	data() {
		return {
			inlogin: true
		};
	}
};
</script>

<style lang="less" scope>
.single-pane {
	margin: 20upx 10upx ;
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

	.single-card {
		display: flex;
		flex-direction: row;
		background-color: #ffffff;
		border-radius: 16upx;
		box-shadow: 0rpx 8rpx 25rpx rgba(0, 0, 0, 0.2);
		padding: 10upx;
		.img {
			width: 120px;
			height: 110px;
			margin-right: 20upx;
			image{
				width: 100%;
				height: 100%;
			}
		}

		.good-detail {
			display: flex;
			flex-direction: column;
			flex: 1;
			.goods-title {
				font-size: 32upx;
				font-weight: 500;
				word-break: break-all;
				text-overflow: ellipsis;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				margin: 10upx 0;
			}

			.goods-comment {
				color: red;
				font-weight: 500;
				font-size: 24upx;

				span {
					color: #666666;
				}
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

				.uni-numbox {
					float: right;

					#editing-view-port {
						color: #999999;
					}
				}
			}
		}
	}
}
</style>
