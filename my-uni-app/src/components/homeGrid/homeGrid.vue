<template>
	<view>
		<uni-grid :column="5" :show-border="false" :square="false">
			<uni-grid-item v-for="(item,index) in menus" :key='item.id'>
				<view class="img-box">
					<image :src="item.img" class="img" mode="aspectFill"></image>
					<text class="text">{{item.content}}</text>
				</view>

			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"

	export default {
		components: {
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				menus: [{
						img: "https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/20983/16/10753/6124/5c8a16aaE5d6b15d7/01e0e818a7505267.png",
						content: "悠悠超市",
						id: 1
					},
					{
						img: "https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/39401/17/2391/5859/5cc06fcfE2ad40668/28cda0a571b4a576.png",
						content: "数码电器",
						id: 2
					},
					{
						img: "https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/17169/3/4127/4611/5c2f35cfEd87b0dd5/65c0cdc1362635fc.png",
						content: "悠悠服饰",
						id: 3
					},
					{
						img: "https://m.360buyimg.com/mobilecms/s120x120_jfs/t17725/156/1767366877/17404/f45d418b/5ad87bf0N66c5db7c.png",
						content: "悠悠生鲜",
						id: 4
					},
					{
						img: "https://m.360buyimg.com/mobilecms/s120x120_jfs/t16990/157/2001547525/17770/a7b93378/5ae01befN2494769f.png",
						content: "悠悠送货",
						id: 5
					},
					{
						img: "https://m.360buyimg.com/mobilecms/s120x120_jfs/t18454/342/2607665324/6406/273daced/5b03b74eN3541598d.png",
						content: "充值缴费",
						id: 6
					},
					{
						img: "https://m.360buyimg.com/mobilecms/s120x120_jfs/t22228/270/207441984/11564/88140ab7/5b03fae3N67f78fe3.png",
						content: "悠悠拼团",
						id: 7
					},
					{
						img: "https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/7068/29/8987/5605/5c120da2Ecae1cc3a/016033c7ef3e0c6c.png",
						content: "领券优惠",
						id: 8
					},
					{
						img: "https://m.360buyimg.com/mobilecms/s120x120_jfs/t16828/63/2653634926/5662/d18f6fa1/5b03b779N5c0b196f.png",
						content: "赚钱渠道",
						id: 9
					},
					{
						img: "https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/22262/9/1470/4527/5c120cd0E5d3c6c66/4792ec307a853e9f.png",
						content: "会员专享",
						id: 10
					}
				]
			};
		}
	}
</script>

<style>
	.uni-grid-item {

		margin-top: 10upx;
	}

	.img-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.img {
		width: 100upx;
		height: 100upx;
	}

	.text {
		/* text-align: center; */
	}
</style>
