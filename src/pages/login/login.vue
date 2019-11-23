<template>
	<div>
		<!-- 滚动公告 -->
		<van-notice-bar left-icon="volume-o" color="#1989fa" background="#ecf9ff" @click="show = true">
			本系统将于2019年11月18日进行维护更新,如有不便之处,请您原谅,谢谢合作!
		</van-notice-bar>
		<!-- 遮罩层 -->
		<van-overlay :show="show" @click="show = false" class="wrapper">
			<div class="block" @click.stop>
				<div class="overlayHead">公告</div>
				<div>
					本系统将于2019年11月18日进行维护更新,如有不便之处,请您原谅,谢谢合作!
				</div>
				<div class="p-1 text-center border-top">
					<button type="button" class="btn btn-success btn-sm" @click="show = fasle">我知道了</button>
				</div>
			</div>
		</van-overlay>
		<!-- 主要内容 -->
		<component :is="main"></component>
	</div>
</template>

<script>
	import { NoticeBar, Overlay } from 'vant';
	import loginFirst from './loginFirst.vue';
	import  loginAgain from "./loginAgain.vue"

	export default {
		components: {
			[NoticeBar.name]: NoticeBar,
			[Overlay.name]: Overlay,
			loginFirst:loginFirst
		},
		data() {
			return {
				show: false, //是否显示遮罩层
				isFirst:false ,//是否是第一次登录
				main:loginFirst
			}
		},
		mounted() {
			if(!this.isFirst)
				this.main=loginAgain;
		},
		methods: {}
	}
</script>

<style scoped>

	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.block {
		width: 75%;
		background: #fff;
		padding: .5rem;
		border-radius: .5rem;
	}

	.overlayHead {
		text-align: center;
		font-size: 1.2rem;
		font-weight: bolder;
		padding-bottom: .5rem;
		margin-bottom: .5rem;
		border-bottom: 1px solid #66a3ff;
		color: #0066ff;
	}
</style>
