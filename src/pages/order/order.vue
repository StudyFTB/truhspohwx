<template>
<div id="order">
	<!-- 头部地址 -->
	<Header title="订单"></Header>
	<!-- 标签页 -->
	<van-tabs v-model="active" animated color="#4c87bf" title-active-color="#4c87bf" @change="activeChange">
		<van-tab title="待支付">
			<div class="wait-pay-tip">未支付订单10分钟后自动取消订单</div>
			<orderList v-for="item in unPayOrders" :key="item.id" :orderInfo="item" :orderType="0" />
		</van-tab>
		<van-tab title="待配送">
			<orderList v-for="item in waitTakeOrders" :key="item.id" :orderInfo="item" :orderType="1" />
		</van-tab>
		<van-tab title="已完成">
			<orderList v-for="item in finshOrders" :key="item.id" :orderInfo="item" :orderType="2" />
		</van-tab>
	</van-tabs>
	<!-- 提高底部 -->
	<div style="height:55px;"></div>
	<!-- 底部导航 -->
	<NavBar></NavBar>
</div>
</template>

<script>
import Header from '../../components/Header.vue';
import NavBar from '../../components/NavBar.vue';
import orderList from './orderLists.vue';
import { Tab, Tabs } from 'vant';
import { getUnPayOrderList, getUnTakeOrderList, getFinishOrderList } from '@/api/order';
export default {
	name: 'Order',
	components:{
		Header:Header,
		NavBar:NavBar,
		orderList:orderList,
		[Tab.name]:Tab,
		[Tabs.name]:Tabs
	},
	data(){
		return{
			active:0,
			unPayOrders: [], // 未支付的订单列表
			waitTakeOrders: [], // 待配送的订单列表
			finshOrders: [] // 已完成的订单列表
		}
	},
	activated(){
		// 如果有地址参数，则为地址参数
		this.active = this.$route.query.type ? parseInt(this.$route.query.type) : 0;
		this.activeChange();
	},
	methods: {
		// 获取未支付的接口
		httpGetUnPayOrderList(){
			getUnPayOrderList({
				openid: this.$store.state.app.openid
			}).then(res => {
				this.unPayOrders = res.data.data;
			}).catch();
		},
		// 获取待配送的接口
		httpGetUnTakeOrderList(){
			getUnTakeOrderList({
				openid: this.$store.state.app.openid
			}).then(res => {
				this.waitTakeOrders = res.data.data;
			}).catch();
		},
		// 获取已完成的接口
		httpGetFinishOrderList(){
			getFinishOrderList({
				openid: this.$store.state.app.openid
			}).then(res => {
				this.finshOrders = res.data.data;
			}).catch();
		},
		// 根据active调用响应的接口
		activeChange(){
			if(this.active == 0) this.httpGetUnPayOrderList();
			else if(this.active == 1) this.httpGetUnTakeOrderList();
			else if(this.active == 2) this.httpGetFinishOrderList();
		}
	}
}
</script>

<style lang="scss" scoped>
#order{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	overflow: auto;
	background-color: #f5f5f5;
	/deep/ .van-tabs--line .van-tabs__wrap{
		position: fixed;
		top: 46px;
		width: 100%;
		z-index: 999;
	}
	/deep/ .van-tabs__content {
		margin-top: 45px;
	}
	.wait-pay-tip{
		text-align: center;
		color: $info-color;
		margin-top: 10px;
		font-size: .8rem;
	}
}
</style>
