<template>
	<view class="top-segmented-control">
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#FA3912"></uni-segmented-control>
		<view class="content">
			<view v-show="current === index" v-for="(it,index) in items">
				{{it}}
			</view>
			
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				items: ['精选', '图书', '童书','衣服','推荐'],
				current: 0
			}
		},
		methods: {
			onClickItem(e) {
				console.log(e)
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		}
	}
</script>

<style>
	.top-segmented-control{
		margin: 15upx 10upx;
	}
	.segmented-control__text{
	color: #666666;
	}
</style>
