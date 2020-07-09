<template>
<div id="order">
	<!-- 头部地址 -->
	<Header title="订单"></Header>
	<!-- 标签页 -->
	<van-tabs v-model="active" animated color="#4c87bf" title-active-color="#4c87bf">
		<van-tab title="待支付">
			<orderList v-for="i in 10" :key="i"></orderList>
		</van-tab>
		<van-tab title="已支付">内容 2</van-tab>
		<van-tab title="待配送">内容 3</van-tab>
		<van-tab title="已完成">内容 4</van-tab>
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

export default{
	components:{
		Header:Header,
		NavBar:NavBar,
		orderList:orderList,
		[Tab.name]:Tab,
		[Tabs.name]:Tabs
	},
	data(){
		return{
			active:0
		}
	}
}
</script>

<style lang="scss" scoped>
// #order{
// 	background-color: #f5f5f5;
// }
</style>
