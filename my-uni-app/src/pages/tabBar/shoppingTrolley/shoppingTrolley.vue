<template>
	<view class="shopping-trolley">
		<!-- 登录 -->
		<view class="login" v-if="inlogin"><singlePane v-for="(item, index) in goods" :key="item.id" :item="item"></singlePane></view>

		<!-- 未登录 -->
		<view class="unlogin" v-else>
			<view class="remind-login">
				<text class="remind">登录后可同步账户中购物车的商品</text>
				<uni-tag text="登录" type="error" :circle="true" size="30" @tap="handTap"></uni-tag>
			</view>
			<view class="trolley-img">
				<image src="/static/trolley.png" mode=""></image>
				<text class="remind">登录后可同步账户中购物车的商品</text>
			</view>
		</view>
	</view>
</template>

<script>
import uniTag from '@/components/uni-tag/uni-tag.vue';
import singlePane from '@/components/singlePane/singlePane.vue';
export default {
	components: {
		uniTag,
		singlePane
	},
	data() {
		return {
			inlogin: false,
			goods: [
				{
					id: 1,
					img: 'https://img.alicdn.com/imgextra/i3/1714128138/O1CN01Ym0Iju29zFgzxwOXZ_!!1714128138.jpg_430x430q90.jpg',
					firm: '小米旗舰店',
					name: ' 小米笔记本电脑Air12.5吋2019款八代酷睿M3处理器',
					comment: '3442',
					newprice: '3299.00',
					oldprice: '3599.00',
					inlogin: true
				},
				{
					id: 2,
					img: 'https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/104842/18/13866/195504/5e5f41a1E61685d67/22588d45f6f4570d.jpg.dpg',
					firm: '华为旗舰店',
					name: ' 华为nova5pro绮境森林 8+128G',
					comment: '3442',
					newprice: '4499.00',
					oldprice: '4999.00',
					inlogin: true
				}
			]
		};
	},
	methods: {
		handTap() {
			console.log('登录成功');
			uni.switchTab({
				url: '/pages/tabBar/me/me'
			});
			this.inlogin = true;
		}
	}
};
</script>

<style lang="less" scoped>
.shopping-trolley {
	.unlogin {
		.remind-login {
			display: flex;
			padding: 30upx;
			background: #ffffff;
			border-radius: 0 0 20upx 20upx;
			justify-content: center;
			height: 30px;

			.remind {
				margin-right: 10upx;
			}

			.uni-tag {
				vertical-align: top;
			}
		}

		.trolley-img {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 60vh;

			image {
				width: 200upx;
				height: 200upx;
				margin-bottom: 20upx;
			}

			text {
			}
		}
	}
}
</style>
