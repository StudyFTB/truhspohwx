<template>
	<div>
		<!-- 头部标题 -->
		<Header title="用餐类型"></Header>
		<!-- 主体 -->
		<div class="main">
			<div class="mb-3 p-2 border rounded bg-white">
				<i>配送地址：<span class="text-danger">杨颖滨大楼3楼某某科301病房1号床位</span></i>
			</div>
			<div class="card p-1 mb-3 w-100 bg-white" style="background: rgba(255,255,255,0);">
				<p>1、普通病人和陪护家属选择普通餐。</p>
				<p>2、住院营养治疗的病人选择治疗餐。</p>
			</div>
			<div class="typeBox" @click="toArea">
				病人/家属普通餐
			</div>
			<div class="typeBox" @click="toArea">
				病人治疗餐
			</div>
		</div>
		<!-- 底部导航 -->
		<NavBar></NavBar>
	</div>
</template>

<script>
	import Header from '../../components/Header.vue';
	import NavBar from '../../components/NavBar.vue';
	
	export default{
		components:{
			Header:Header,
			NavBar:NavBar
		},
		methods:{
			toArea(){
				this.$router.push('/area');
			}
		}
	}
</script>

<style scoped>
	.main{
		margin-bottom: 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		padding: 0 1rem;
		background-image: linear-gradient(#e66465, #9198e5);
		z-index: -1;
	}
	.typeBox{
		border:1px solid #007bff;
		color: #007bff;
		text-align: center;
		font-weight: bold;
		padding: 1rem;
		border-radius: 5px;
		background: #ffffff;
		margin-top: 1rem;
		width: 100%;
	}
</style>
