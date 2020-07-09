<template>
	<div id="Header">
		<!-- <div class="addressBox">
			配送地址：杨颖滨大楼3楼某某科301病房1号床位
		</div> -->
		<van-nav-bar
			:title="title"
			left-text="返回"
			left-arrow
			@click-left="goback"
			@click-right="toHome"
			class="hNavBar"
		>
			<van-icon name="wap-home-o" slot="right" size="1.5rem" />
		</van-nav-bar>
	</div>
</template>

<script>
	import { NavBar } from 'vant';
	import { Icon } from 'vant';
	
	export default {
		props:{
			title:String,
			hiddenHome:Boolean //隐藏home键
		},
		components:{
			[NavBar.name]:NavBar,
			[Icon.name]:Icon
		},
		methods:{
			goback(){ //返回
				this.$router.go(-1);
			},
			toHome(){
				this.$router.push("/bedinfo");
			}
		}
	}
</script>

<style scoped>
	#Header{
		z-index: 1;
		position: sticky;
		top: 0;
		left: 0;
		width: 100%;
	}
	.hNavBar{
		border-bottom: 1px solid #CCCCCC;
	}
</style>
