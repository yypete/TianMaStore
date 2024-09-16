<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?good_id='+item.goods_id">
					<image :src="item.image_src" class="swiper-img"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view v-for="(item,index) in navList" :key="index" @click="navHandler(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
		<view class="floor-list">
			<view v-for="(item,index) in floorList" :key="index">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floor-img-box">
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix">
						</image>
					</navigator>
					<view class="right-img-box">
						<navigator v-for="(item2,index2) in item.product_list" :key="index2" v-show="index2 !== 0" :url="item2.url">
							<image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		onLoad() {
			this.getWiperList();
			this.getNavList();
			this.getFloorList()
		},
		methods: {
			async getWiperList() {
				try {
					const {
						data: res
					} = await uni.$http.get('/api/public/v1/home/swiperdata');
					if (res.meta.status !== 200) {
						return uni.$showMsg()
					}
					this.swiperList = res.message;
					uni.$showMsg("数据请求成功")
				} catch (error) {
					uni.$showMsg("请求失败")
				}
			},
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get("/api/public/v1/home/catitems")
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.navList = res.message;
				uni.$showMsg("数据请求成功2")
			},
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get("/api/public/v1/home/floordata")
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split("?")[1];
					});
				});
				this.floorList = res.message;
			},
			navHandler(item) {
				if (item.name == "分类") {
					uni.switchTab({
						url: "/pages/cate/cate"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 350rpx;

		.swiper-item {
			width: 100%;
			height: 100%;

			.swiper-img {
				width: 100%;
				height: 100%;
			}
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15rpx 0;

		.nav-img {
			width: 100px;
			height: 120rpx;
		}
	}

	.floor-title {
		width: 1400rpx;
		height: 80rpx;
	}

	.floor-img-box {
		width: 100%;
		display: flex;
		padding-left: 10rpx;

		.right-img-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
</style>