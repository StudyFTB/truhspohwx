<template>
<div id="menu">
	<!-- 头部标题 -->
	<Header :title="`2019-10-12（午餐）`"></Header>
	<!-- 信息 -->
	<div class="top-wrap" :style="{display:isShow ? `flex` : `none`}">
		<div>
			<img src="../../assets/img/st.jpg" />
		</div>
		<div>
			<span>第一食堂三楼中餐厅</span>
			<div class="d-flex text-secondary">
				<!-- <van-tag plain type="danger">食堂配送</van-tag> -->
				当前餐别截止时间：12:00
			</div>
		</div>
	</div>
	<!-- 菜类菜品 -->
	<div class="main-wrap" :style="{height:`${mainWrapH}px`}">
		<!-- 左侧栏 -->
		<van-sidebar v-model="activeKey">
			<van-sidebar-item title="标签名称" :info="li" v-for="li in 15" :key="li" />
		</van-sidebar>
		<!-- 右侧栏 -->
		<div class="menu-right" @scroll="onScrollEvent()" ref="scrollRight">
			<menuRight></menuRight>
		</div>
	</div>
	<!-- 购物车 -->
	<shopCar></shopCar>
</div>
</template>

<script>
import Header from '../../components/Header.vue';
import menuRight from './menuRight.vue';
import shopCar from './shopCar.vue';
import { Sidebar, SidebarItem, Tag } from 'vant';
export default {
	components:{
		Header:Header,
		[Sidebar.name]:Sidebar,
		[SidebarItem.name]:SidebarItem,
		[Tag.name]:Tag,
		menuRight:menuRight,
		shopCar:shopCar
	},
	data(){
		return{
			activeKey: 0, //侧边栏
			mainWrapH: 505, // 主要内容的高度
			isShow: true, // 是否显示商家
			showTopH: 46+75+40, // 显示商家顶部区域的高度
			hiddenTopH: 46+40, // 隐藏商家顶部区域的高度
		}
	},
	created(){
		this.showTop();
	},
	methods:{
		// 显示商家区域
		showTop(){
			this.isShow = true;
			let h = document.documentElement.clientHeight || document.body.clientHeight; // 屏幕高度
			this.mainWrapH =h - this.showTopH;
		},
		// 隐藏商家区域
		hiddenTop(){
			this.isShow = false;
			let h = document.documentElement.clientHeight || document.body.clientHeight; // 屏幕高度
			this.mainWrapH =h - this.hiddenTopH;
		},
		// 滚动条变化触发
		onScrollEvent(){
			let scrollTop = this.$refs.scrollRight.scrollTop;
			if(scrollTop>75){
				this.hiddenTop();
			}else {
				this.showTop();
			}
		}
	}
}
</script>

<style lang="scss" scoped>
#menu{
	.top-wrap{
		height: 75px;
		box-sizing: border-box;
		display: flex;
		padding: 4px 10px;
		&>div:nth-child(1){
			display: flex;
			justify-content: center;
			flex-direction: column;
			img{
				width: 75px;
				max-height: 100%;
			}
		}
		&>div:nth-child(2){
			flex: 1;
			padding: 4px 10px;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			&>span{
				font-weight: bolder;
				color: $primary-color;
				margin-bottom: 10px;
			}
		}
	}
	.main-wrap{
		border-top: 3px solid #f5f5f5;
		display: flex;
		.menu-right{
			flex: 1;
			margin: 0 8px;
			height: 100%;
			overflow: auto;
		}
	}
}
</style>
