<template>
<div id="orderDetail">
	<Header title="订单详情"></Header>
	<!-- 头部 -->
	<div class="orderState p-2">
		<div>
			<span>2019-10-26</span>
			<span>午餐</span>
		</div>
		<div class="psState" @click="showOrderState()">
			<div>
				<span>订单状态：</span>
				<span>待配送</span>
			</div>
			<div>&gt;</div>
		</div>
	</div>
	<!-- 弹出框信息 -->
	<div class="mask" :class="{'d-none':!isShowPs}" @click="showOrderState()">
		<div class="pr-3 pt-2 pb-2 bg-white rounded w-100 m-4" style="padding-left: calc(1rem + 8px);">
			<div class="timeLine mt-2 mb-2">
				<div class="d-flex justify-content-between pb-3">
					<span>
						<i class="iconfont iconyuandian text-primary"></i>
						订单提交成功
					</span>
					<span>10-28 10:27</span>
				</div>
				<div class="d-flex justify-content-between pt-3 pb-3">
					<span>
						<i class="iconfont iconyuandian text-primary"></i>
						订单已出单
					</span>
					<span>10-28 10:27</span>
				</div>
				<div class="d-flex justify-content-between pt-3 pb-3">
					<span>
						<i class="iconfont iconyuandian text-primary"></i>
						配送员开始配送
					</span>
					<span>10-28 10:27</span>
				</div>
				<div class="d-flex justify-content-between pt-3">
					<span>
						<i class="iconfont iconyuandian text-primary"></i>
						订单已送达
					</span>
					<span>10-28 10:27</span>
				</div>
			</div>
			<div class="small text-secondary text-center">感谢您对快订餐的支持，期待再次光临</div>
			<div class="maskIcon" @click.stop="showOrderState()">
				<i class="iconfont iconjiaochacross80" style="font-size: 1.5rem;"></i>
			</div>
		</div>
	</div>
	<!-- 菜品信息 -->
	<div class="foodInfo mr-2 ml-2">
		<h6 class="pt-2 pb-2 font-weight-bold border-bottom d-flex justify-content-start align-items-center">
			<img src="../../assets/img/st.jpg" style="max-height: 1.1rem;padding-right:.25rem;" >
			第一饭堂三楼中餐厅
		</h6>
		<div class="food">
			<span>土豆鸡块饭</span>
			<span>&times;1</span>
			<span>￥16</span>
		</div>
		<div class="food">
			<span>土豆回锅肉饭</span>
			<span>&times;1</span>
			<span>￥17</span>
		</div>
		<div class="pt-1 pb-1 d-flex justify-content-between">
			<div>
				<span class="badge badge-secondary">包装费</span>
				<span>餐盒</span>
			</div>
			<div>￥2</div>
		</div>
		<div class="pt-1 pb-1 d-flex justify-content-between">
			<div>
				<span class="badge badge-primary">配送费</span>
				<span>配送费</span>
			</div>
			<div>￥2</div>
		</div>
		<div class="mt-1 pt-2 pb-2 border-top text-right">
			实付&nbsp;￥37
		</div>
	</div>
	<!-- 配送信息 -->
	<div class="mt-2 bg-white pl-2 pr-2 mr-2 ml-2">
		<div class="font-weight-bold pt-2 pb-1 border-bottom">配送信息</div>
		<div class="d-flex justify-content-between pt-1 pb-1 border-bottom">
			<span>配送状态</span>
			<span>已送达</span>
		</div>
		<div class="d-flex justify-content-between align-items-center pt-1 pb-1 border-bottom">
			<span class="">收货地址</span>
			<div class="d-flex flex-column justify-content-start">
				<span class="text-nowrap text-right">输血科3号病房2号床</span>
				<div class="text-right">
					<span>张三|</span><span>18826679452</span>
				</div>
			</div>
		</div>
		<div class="d-flex justify-content-between pt-1 pb-2">
			<span>配送人员</span>
			<span>李四</span>
		</div>
	</div>
	<!-- 订单信息 -->
	<div class="mt-2 bg-white pl-2 pr-2 mr-2 ml-2">
		<div class="font-weight-bold pt-2 pb-1 border-bottom">订单信息</div>
		<div class="d-flex justify-content-between pt-1 pb-1 border-bottom">
			<span>订单号</span>
			<span>1545451545451545451</span>
		</div>
		<div class="d-flex justify-content-between align-items-center pt-1 pb-1 border-bottom">
			<span>支付方式</span>
			<span>在线支付</span>
		</div>
		<div class="d-flex justify-content-between pt-1 pb-2">
			<span>下单时间</span>
			<span>2019-10-27 11:42</span>
		</div>
	</div>
</div>
</template>

<script>
import Header from '../../components/Header';

export default {
	components:{
		Header:Header
	},
	data(){
		return{
			isShowPs:false, //是否显示配送状态
		}
	},
	mounted:function(){
		this.bodyHidden();
	},
	methods:{
		showOrderState:function(){  //显示配送状态
			this.isShowPs=!this.isShowPs;
			this.bodyHidden();
		},
		bodyHidden:function(){ //有弹出框的时候不能滚动
			if(this.isShowPs==true)
				document.getElementsByTagName("body")[0].style.overflow="hidden";
			else
				document.getElementsByTagName("body")[0].style.overflow="visible";
		}
	}
}
</script>

<style scoped>
#orderDetail{
	background: #f5f5f5;
	padding-bottom: .5rem;
}

.orderState{
	width: 100%;
	background: #4c87bf;
	color: white;
}

.psState{
	font-size: 1.2rem;
	display: flex;
	justify-content: space-between;
	padding: .25rem 0;
	border-bottom: 1px solid #FFFFFF;
}

.mask{
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: rgba(0,0,0,.7);
	z-index: 1040;
	display: flex;
	justify-content: center;
	align-items: center;
}

.timeLine{
	border-left: 1px solid #007bff!important;
}

.timeLine>div>span:first-child{
	position: relative;
	left: -8px;
	background: #FFFFFF;
}

.maskIcon{
	text-align: center;
	position: relative;
}

.foodInfo{
	margin:.5rem 0;
	padding:0 .5rem;
	background: #fff;
}

.food{
	padding:.25rem 0;
	display: flex;
	justify-content: flex-start;
}

.food span{
	display: inline-block;
}

.food>span:first-child{
	width: 75%;
	white-space: nowrap;
	overflow: hidden;
}

.food>span:nth-child(2){
	width: 10%;
	text-align: center;
}

.food>span:nth-child(3){
	width: 15%;
	text-align: right;
}
</style>
