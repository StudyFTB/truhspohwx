<template>
	<div id="NavBar">
		<van-tabbar v-model="active" route>
			<van-tabbar-item name="type" icon="wap-home" to="/bedinfo">首页</van-tabbar-item>
			<van-tabbar-item name="order" icon="label" to="/order">订单</van-tabbar-item>
			<van-tabbar-item name="mine" icon="manager" to="/mine">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
	components:{
		[Tabbar.name]:Tabbar,
		[TabbarItem.name]:TabbarItem
	},
	data(){
		return{
			active:'type'
		}
	}
}
</script>

<style>
	
</style>