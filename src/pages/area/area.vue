<template>
<div class="all-wrap">
	<!-- 头部标题 -->
	<Header title="选择商家"></Header>
	<van-swipe :autoplay="3000" :show-indicators="false">
		<van-swipe-item v-for="(image, index) in images" :key="index">
			<img v-lazy="image" />
		</van-swipe-item>
	</van-swipe>
	<!-- 主体部分 -->
	<div class="main">
		<strong class="d-block">
			可选商家
		</strong>
		<ul class="ulBox" v-if="areaList.length !== 0">
			<li class="d-flex justify-content-between" v-for="item in areaList" :key="item.id" @click="onAreaCLick(item)">
				<div class="d-flex flex-column justify-content-center">
					<img :src="item.ctimgurl || defaultImgSrc" class="d-block border round img-wrap" />
				</div>
				<div class="areaName">
					<div class="font-weight-bold">
						{{item.ctname}}
					</div>
					<div class="d-flex justify-content-between small">
						<div style="height: 18px;line-height: 18px;color: #ff9900;">
							<van-icon name="star" />
							<van-icon name="star" />
							<van-icon name="star" />
							<van-icon name="star" />
							<van-icon name="star" />
						</div>
						<van-tag plain type="danger">商家配送</van-tag>
					</div>
					<div class="remark-wrap">
						{{item.ctdesc}}
					</div>
				</div>
			</li>
		</ul>
		<!-- 空状态 -->
		<van-empty v-else-if="areaList.length === 0" image="search" description="暂无商家" />
	</div>
</div>
</template>

<script>
import Header from '../../components/Header.vue';
import { Icon, Tag, Swipe, SwipeItem, Empty } from 'vant';
import { getAreaList } from '@/api/wxdc';

import Vue from 'vue';
import { Lazyload } from 'vant';
Vue.use(Lazyload);
export default {
	name: 'Area',
	components:{
		Header:Header,
		[Icon.name]:Icon,
		[Tag.name]:Tag,
		[Swipe.name]:Swipe,
		[SwipeItem.name]:SwipeItem,
		[Empty.name]:Empty,
	},
	data(){
		return{
			defaultImgSrc: require('@/assets/img/defaultsj.png'), // 默认商家图片
			images: [
				require("@/assets/img/swipe1.png"),
				require("@/assets/img/swipe2.png"),
				require("@/assets/img/swipe3.png"),
				require("@/assets/img/swipe4.png")
			],
			areaList:[] // 食堂信息列表
		}
	},
	created(){
		if(this.$store.state.wxdc.refreshArea !== 'yes') this.httpGetAreaList();
	},
	activated(){
		if(this.$store.state.wxdc.refreshArea == 'yes'){
			this.httpGetAreaList();
		}
	},
	methods:{
		// 获取食堂的接口
		httpGetAreaList(){
			getAreaList({
				openid: this.$store.state.app.openid,
				qrstr: this.$store.state.wxdc.qrstr
			}).then(res => {
				this.areaList = res.data.data;
				this.$store.dispatch('wxdc/SetRefreshArea','no');
			}).catch();
		},
		// 点击商家触发
		onAreaCLick(item){
			this.$store.dispatch('wxdc/SetRefreshDate','yes')
			this.$router.push({ 
				path: "/date", 
				query: { 
					advday: item.advday, 
					ctid: item.ctid, 
					dcdaycount: item.dcdaycount,
					ctname: item.ctname
				} 
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.all-wrap{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}
/deep/ .van-swipe{
	img{
		width: 100%;
		max-height: 120px;
	}
}
.main{
	padding: 0 1rem;
	height: calc(100% - 166px);
	overflow: auto;
	&>strong{
		position: sticky;
		top: 0;
		background-color: #fff;
		z-index: 999;
		padding: 10px 0;
		border-bottom: 1px solid $border-color;
	}
	.remark-wrap{
		font-size: .8rem;
		color: $secondary-color;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden; 
	}
	.img-wrap{
		width: 50px;
		max-height: 100%;
	}
}
.ulBox{
	list-style: none;
	margin:0;
	padding: 0;
}
.ulBox>li{
	width: 100%;
	border-bottom: 1px solid #f5f5f5;
}
.areaName{
	width: calc(100% - 50px);
	display:inline-block;
	padding:12px;
}
</style>
