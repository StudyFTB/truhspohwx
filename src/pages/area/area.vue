<template>
<div>
	<!-- 头部标题 -->
	<Header title="选择商家"></Header>
	<van-swipe :autoplay="3000">
		<van-swipe-item v-for="(image, index) in images" :key="index">
			<img v-lazy="image" />
		</van-swipe-item>
	</van-swipe>
	<!-- 主体部分 -->
	<div class="main pt-2">
		<ul class="ulBox">
			<strong class="d-block mb-2">
				可选商家
			</strong>
			<li class="d-flex justify-content-between" @click="toNext">
				<div class="d-flex flex-column justify-content-center">
					<img src="../../assets/img/st.jpg" class="d-block border round img-wrap" />
				</div>
				<div class="areaName">
					<div class="font-weight-bold">
						第一食堂三楼职工食堂
					</div>
					<div class="d-flex justify-content-between small">
						<div style="height: 18px;line-height: 18px;color: #ff9900;">
							<van-icon name="star" />
							<van-icon name="star" />
							<van-icon name="star" />
							<van-icon name="star" />
							<van-icon name="star" />
						</div>
						<van-tag plain type="danger">食堂配送</van-tag>
					</div>
					<div class="remark-wrap">
						这是场所的备注一二三四五六七八九十个十百千万gdsf
					</div>
				</div>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
import Header from '../../components/Header.vue';
import { Icon } from 'vant';
import { Tag, Swipe, SwipeItem } from 'vant';

import Vue from 'vue';
import { Lazyload } from 'vant';
Vue.use(Lazyload);

export default {
	components:{
		Header:Header,
		[Icon.name]:Icon,
		[Tag.name]:Tag,
		[Swipe.name]:Swipe,
		[SwipeItem.name]:SwipeItem,
	},
	data(){
		return{
			images: [
				require("@/assets/img/area.png"),
				require("@/assets/img/st.jpg"),
			],
		}
	},
	methods:{
		toNext(){ //去下一级
			this.$router.push("/date");
		}
	}
}
</script>

<style lang="scss" scoped>
/deep/ .van-swipe{
	img{
		width: 100%;
		height: 120px;
	}
}
.main{
	padding: 0 1rem;
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
