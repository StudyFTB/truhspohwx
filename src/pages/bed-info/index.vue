<template>
<div style="margin-bottom:50px;">
	<!-- 滚动公告 -->
	<van-notice-bar left-icon="volume-o" color="#1989fa" background="#ecf9ff" @click="show = true"
		v-if="hadNotice">
		本系统将于2019年11月18日进行维护更新,如有不便之处,请您原谅,谢谢合作!
	</van-notice-bar>
	<!-- 遮罩层 -->
	<van-overlay :show="show" @click="show = false" class="wrapper">
		<div class="block" @click.stop>
			<div class="overlayHead">公告</div>
			<div class="pt-2 pb-2">
				本系统将于2019年11月18日进行维护更新,如有不便之处,请您原谅,谢谢合作!
			</div>
			<div class="p-2 text-center border-top">
				<button type="button" class="btn btn-success" @click="show = false">我知道了</button>
			</div>
		</div>
	</van-overlay>
	<!-- 主要内容 -->
	<login-first v-if="$store.state.app.isFirst == `zero`"></login-first>
	<login-again v-else></login-again>
	<!-- 底部导航 -->
	<NavBar></NavBar>
</div>
</template>

<script>
import { NoticeBar, Overlay } from 'vant';
import LoginFirst from './loginFirst.vue';
import LoginAgain from "./loginAgain.vue"
import NavBar from '@c/NavBar.vue';
export default {
	name: "BedInfo",
	components: {
		[NoticeBar.name]: NoticeBar,
		[Overlay.name]: Overlay,
		LoginFirst,
		LoginAgain,
		NavBar
	},
	data() {
		return {
			hadNotice: false, // 是否有公告
			show: false //是否显示遮罩层
		}
	}
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
