<template>
	<div id="menu" @scroll="toscroll">
		<!-- 头部标题 -->
		<Header title="菜单"></Header>
		<!-- 信息 -->
		<div class="bg-primary text-white pl-2 pr-2">
			<div class="small">
				配送地址：杨颖滨大楼3楼某某科301病房1号床位<span></span>
			</div>
			<div class="small">
				2019-10-12（午餐）&nbsp;第一食堂三楼中餐厅
			</div>
			<div class="text-center">病人/家属普通餐</div>
		</div>
		<!-- 菜类菜品 -->
		<div class="sticky clearfix">
			<!-- 左侧栏 -->
			<van-sidebar v-model="activeKey" class="menu-left" :class="{'overflow-auto':overflowAuto}">
				<van-sidebar-item title="标签名称" :info="li" v-for="li in 10" :key="li" />
			</van-sidebar>
			<!-- 右侧栏 -->
			<menuRight class="menu-right" :class="{'overflow-auto':overflowAuto}"></menuRight>
		</div>
		<!-- 购物车 -->
		<shopCar></shopCar>
	</div>
</template>

<script>
	import Header from '../../components/Header.vue';
	import menuRight from './menuRight.vue';
	import shopCar from './shopCar.vue';
	import { Sidebar, SidebarItem, } from 'vant';
	
	export default{
		components:{
			Header:Header,
			[Sidebar.name]:Sidebar,
			[SidebarItem.name]:SidebarItem,
			menuRight:menuRight,
			shopCar:shopCar
		},
		data(){
			return{
				activeKey: 0, //侧边栏
				overflowAuto:false //是否获取滚动条
			}
		},
		methods:{
			toscroll(){
				let $menuScrollTop = document.getElementById("menu").scrollTop;//menu滚动条到顶部高度
				if($menuScrollTop>=62){
					this.overflowAuto=true;
				}else{
					this.overflowAuto=false;
				}
			}
		}
	}
</script>

<style scoped="scoped">
	#menu{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100%;
		overflow: auto;
	}
	.sticky{
		position: sticky;
		height: calc(100% - 46px);
		padding-bottom: 46px;
		overflow: hidden;
	}
	body div.menu-left{
		display: inline-block;
		width: 25%;
		margin: 0;
		height: 100%;
		overflow: hidden;
	}
	.menu-right{
		float: right;
		width: calc(75% - 5px);
		height: 100%;
		padding:0 .25rem;
		overflow: hidden;
	}
	.overflow-auto{
		overflow: auto !important;
	}
</style>
