<template>
	<div id="loginFirst" class="p-3">
		<div class="card p-2">
			<p>请您务必在操作前仔细阅读并了解以下的订餐须知：</p>
			<p>此操作用于微信绑定床号，请扫描床头的订餐二维码；如需解绑，请前往公众号的个人中心解除绑定。</p>
			<p>如您有绑定多个床位，请在下单前务必确认订餐床位，订单确认后平台无法更换送餐床位。</p>
			<p>所有餐别外卖只限于本院内部范围，敬请见谅。</p>
			<p>所有订餐时间均为提前30分钟，用户在下单前务必看好预订餐品日期，请在提交前仔细核对订单内容（床号、电话），订单确认后无法取消订单或者更换订单内容。</p>
		</div>
		<div>
			<button class="btn btn-block mt-3" :class="readTime==0 ? 'btn-success' : 'btn-secondary'"
				:disabled="readTime!==0" @click="onRead">
				阅读并同意<span :class="{'d-none':readTime==0}">({{readTime}})</span>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			readTime:3
		}
	},
	mounted(){
		this.timer();
	},
	methods:{
		timer(){ //计时器运行的函数
			var _this=this;
			var atimer=setInterval(function(){
				_this.readTime=_this.readTime-1;
				if(_this.readTime<=0)
					clearInterval(atimer);
			},1000);
		},
		// 点击阅读并同意的按钮
		onRead(){
			this.$store.dispatch("app/setIsFirst");
		}
	}
}
</script>

<style>
</style>
