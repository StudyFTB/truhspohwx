<template>
<div id="menu">
	<!-- 头部标题 -->
	<Header
		:title="`${$store.state.wxdc.choseInfo.dateRepast.date}
			（${$store.state.wxdc.choseInfo.dateRepast.repast.repastname}）`"/>
	<!-- 信息 -->
	<div class="top-wrap" :style="{display:isShow ? `flex` : `none`}">
		<div>
			<img :src="$_getSmallImg($store.state.wxdc.choseInfo.area.ctimgurl) || defaultImgSrc" />
		</div>
		<div>
			<span>{{$store.state.wxdc.choseInfo.area.ctname}}</span>
			<div class="ps-wrap">
				<div style="height: 18px;line-height: 18px;color: #ff9900;">
					<van-icon name="star" />
					<van-icon name="star" />
					<van-icon name="star" />
					<van-icon name="star" />
					<van-icon name="star" />
				</div>
				<van-tag plain type="danger">配送</van-tag>
			</div>
			<marquee class="text-secondary small">
			<!-- <div class="text-secondary small"> -->
				<span>{{$store.state.wxdc.choseInfo.area.ctdesc}}</span>
			<!-- </div> -->
			</marquee>
		</div>
	</div>
	<!-- 菜类菜品 -->
	<div class="main-wrap" :style="{height:`${mainWrapH}px`}" v-if="foodTypes.length !== 0">
		<!-- 左侧栏 -->
		<van-sidebar v-model="activeKey" @change="onSidebarChange">
			<template v-for="item in foodTypes">
				<van-sidebar-item :key="item.id" :title="item.menutype" :badge="item.badge" 
					:class="{'hidden-badge': item.badge == 0}" />
			</template>
		</van-sidebar>
		<!-- 右侧栏 -->
		<div class="menu-right" @scroll="onScrollEvent()" ref="scrollRight">
			<menuRight :allFoodList="allFoodList" :activeKey="activeKey"></menuRight>
		</div>
	</div>
	<!-- 空状态 -->
	<van-empty v-else image="search" description="当前餐别未发菜谱" />
	<!-- 购物车 -->
	<shopCar :allFoodList="allFoodList" :shopCarData="shopCarData"></shopCar>
</div>
</template>

<script>
import Header from '../../components/Header.vue';
import menuRight from './menuRight.vue';
import shopCar from './shopCar.vue';
import { Sidebar, SidebarItem, Tag, Icon, Empty } from 'vant';
import { gettMenuTypeList, getMenuOnlineList } from '@/api/wxdc';
export default {
	name: 'Menu',
	components:{
		Header:Header,
		[Sidebar.name]:Sidebar,
		[SidebarItem.name]:SidebarItem,
		[Tag.name]:Tag,
		[Icon.name]:Icon,
		[Empty.name]: Empty,
		menuRight:menuRight,
		shopCar:shopCar
	},
	data(){
		return{
			defaultImgSrc: require('@/assets/img/defaultsj.jpg'), // 默认商家图片
			activeKey: 0, //侧边栏索引
			foodTypes: [], // 菜类列表
			allFoodList: [], // 所有菜品列表
			shopCarData: { // 购物车数据
				totalPackfee: 0, // 总共的包装费
				totalOtherfee: 0, // 总共的其他费用
				totalNum: 0, // 总共菜的数量
				totalMoney: 0, // 总共的钱
				foodList: [] // 购物车菜品列表
			},

			mainWrapH: 505, // 主要内容的高度
			isShow: true, // 是否显示商家
			showTopH: 46+75+40, // 显示商家顶部区域的高度
			hiddenTopH: 46+40, // 隐藏商家顶部区域的高度
		}
	},
	created(){
		if(this.$store.state.wxdc.refreshMenu === 'yes') return false;
		this.resetData();
	},
	activated(){
		if(this.$store.state.wxdc.refreshMenu !== 'yes') return false;
		this.resetData();
	},
	watch:{
		allFoodList:{
			deep: true,
			immediate: true,
			handler: function (val, oldVal) {
				for(let [key,item] of val.entries()){
					let typeBadge = 0; // 左侧菜类的微标数量
					for(let food of item){
						if(food.choseNum > 0) typeBadge++;
					}
					this.foodTypes[key].badge = typeBadge;
				}
				// 计算购物车数据
				this.computedData();
			}
		}
	},
	methods:{
		// 获取菜类的接口
		httpgettMenuTypeList(){
			return new Promise((resolve,reject) => {
				gettMenuTypeList({
					ctid: this.$store.state.wxdc.choseInfo.area.ctid,
					repastid: this.$store.state.wxdc.choseInfo.dateRepast.repast.repastid,
					date: this.$store.state.wxdc.choseInfo.dateRepast.date
				}).then(res => {
					// 加一个badge小红点
					for(let item of res.data.data){
						item.badge = 0;
					}
					this.foodTypes = res.data.data;
					resolve(res.data.data);
				}).catch();
			})
		},
		// 获取菜品的接口
		httpGetMenuOnlineList(typeid){
			getMenuOnlineList({
				ctid: this.$store.state.wxdc.choseInfo.area.ctid,
				repastid: this.$store.state.wxdc.choseInfo.dateRepast.repast.repastid,
				typeid,
				date: this.$store.state.wxdc.choseInfo.dateRepast.date
			}).then(res => {
				// 将请求的数据加一个choseNum
				let foods = [];
				for(let [key,value] of res.data.data.entries()){
					let obj = {};
					obj = Object.assign({},value);
					obj['choseNum'] = 0;
					// 缩略图
					obj.ssimageurl = this.$_getSmallImg(obj.imageurl);
					foods.push(obj);
				}
				// 将封装后的数据加入allFoodList
				this.$set(this.allFoodList,this.activeKey,foods);
			}).catch();
		},
		// 点击侧边导航栏时触发
		onSidebarChange(index){
			// 如果该索引已有内容，则不再请求
			if(this.allFoodList[index].length > 0) return false;
			if(this.foodTypes.length == 0) return false;
			this.httpGetMenuOnlineList(this.foodTypes[index].typeid);
		},
		// 重置数据
		async resetData(){
			this.$store.dispatch('wxdc/SetRefreshMenu','no');
			this.showTop();
			this.activeKey = 0;
			this.foodTypes = [];
			let foodTypes = await this.httpgettMenuTypeList();
			if(foodTypes.length === 0) return false;
			// 初始化allFoodList
			this.allFoodList = [];
			for(let i=0;i<foodTypes.length;i++){
				this.allFoodList[i] = [];
			}
			await this.httpGetMenuOnlineList(foodTypes[0].typeid);
		},
		// 计算购物车数据
		computedData(){
			this.shopCarData= { // 购物车数据
				totalPackfee: 0, // 总共的包装费
				totalOtherfee: 0, // 总共的其他费用
				totalNum: 0, // 总共菜的数量
				totalMoney: 0, // 总共的钱
				foodList: [] // 购物车菜品列表
			}
			for(let item of this.allFoodList){
				for(let food of item){
					if(food.choseNum>0){
						this.shopCarData.totalPackfee += (parseFloat(food.packfee)*food.choseNum);
						this.shopCarData.totalOtherfee += (parseFloat(food.otherfee)*food.choseNum);
						this.shopCarData.totalNum += food.choseNum;
						this.shopCarData.totalMoney += 
							((parseFloat(food.otherfee)+parseFloat(food.packfee)+parseFloat(food.price))*food.choseNum);
						this.shopCarData.foodList.push(food);
					}
				}
			}
			// 固定小数位数
			this.shopCarData.totalPackfee = this.shopCarData.totalPackfee.toFixed(2);
			this.shopCarData.totalOtherfee = this.shopCarData.totalOtherfee.toFixed(2);
			this.shopCarData.totalMoney = this.shopCarData.totalMoney.toFixed(2);
		},

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
				height: 67px;
			}
		}
		&>div:nth-child(2){
			flex: 1;
			padding-left: 15px;
			height: 67px;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			&>span{
				font-weight: bolder;
				color: $primary-color;
			}
			.ps-wrap{
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: .8rem;
			}
		}
	}
	.main-wrap{
		border-top: 3px solid #f5f5f5;
		display: flex;
		/deep/ .van-sidebar-item__text{
			display: block;
		}
		/deep/ .van-sidebar{
			background-color: #fafafa;
		}
		.hidden-badge{
			/deep/ .van-info{
				display: none;
			}
		}
		.menu-right{
			flex: 1;
			margin: 0 8px;
			height: 100%;
			overflow: auto;
		}
	}
}
</style>
