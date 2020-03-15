<template>
	<view>
		<view class="uni-form-item uni-column">
			<!-- <view class="title">键盘右下角按钮显示为搜索</view> -->
			<view class="home-search">
				<uni-icons type="search" size="24" />
				<input class="uni-input" confirm-type="search" placeholder="寻找宝贝" />
			</view>

		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.home-search {
		display: flex;
		border-radius: 80upx;
		background: #dfdfdf;
		padding: 0 20upx;
	}

	.uni-form-item {
		padding: 0 0 5upx;
	}

	.uni-icons {
		display: inline-block;
	}

	.uni-input {
		padding: 0;
		background: #dfdfdf;
		position: relative;
		top: 20upx;
		left: 10upx;
	}
</style>
