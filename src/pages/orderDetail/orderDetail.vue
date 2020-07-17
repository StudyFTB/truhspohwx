<template>
<div id="orderDetail">
	<Header title="订单详情"></Header>
	<!-- 头部 -->
	<div class="orderState p-2">
		<div>
			<span>{{orderDetail.consumedate}}</span>
			<span>（{{orderDetail.repastname}}）</span>
		</div>
		<div class="psState" @click="showOrderState()">
			<div>
				<span>订单状态：</span>
				<span>{{getTypeMsg()}}</span>
			</div>
			<div>&gt;</div>
		</div>
	</div>
	<!-- 待支付 -->
	<div class="wait-pay-wrap mr-2 ml-2" v-if="parseInt($route.query.orderType) == 0">
		<template v-if="remainTime.second>0">
			<div>
				<span>等待支付</span>
				<span>{{remainTime.time}}</span>
			</div>
			<div>
				<div>取消订单</div>
				<div>去支付</div>
			</div>
		</template>
		<template>
			<div class="over-time">
				订单超时未支付
			</div>
		</template>
	</div>
	<!-- 弹出框信息 -->
	<div class="mask" :class="{'d-none':!isShowPs}" @click="showOrderState()">
		<div class="pr-3 pt-2 pb-2 bg-white rounded w-100 m-4" style="padding-left: calc(1rem + 8px);">
			<div class="timeLine mt-2 mb-2">
				<div class="d-flex justify-content-between pb-3">
					<span>
						<i class="iconfont iconyuandian" :class="{'text-primary':orderDetail.orderdate !== null}"></i>
						下单成功
					</span>
					<span>{{orderDetail.orderdate}}</span>
				</div>
				<div class="d-flex justify-content-between pt-3 pb-3">
					<span>
						<i class="iconfont iconyuandian" :class="{'text-primary':orderDetail.printtime !== null}"></i>
						订单出单
					</span>
					<span>{{orderDetail.printtime}}</span>
				</div>
				<div class="d-flex justify-content-between pt-3 pb-3">
					<span>
						<i class="iconfont iconyuandian" :class="{'text-primary':orderDetail.deliverytime !== null}"></i>
						开始配送
					</span>
					<span>{{orderDetail.deliverytime}}</span>
				</div>
				<div class="d-flex justify-content-between pt-3">
					<span>
						<i class="iconfont iconyuandian" :class="{'text-primary':orderDetail.finishtime !== null}"></i>
						订单送达
					</span>
					<span>{{orderDetail.finishtime}}</span>
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
			<img :src="orderDetail.ctimgurl || defaultImgSrc" style="height: 1.1rem;padding-right:.25rem;" >
			{{orderDetail.ctname}}
		</h6>
		<div class="food" v-for="item in orderDetail.orderDetails" :key="item.id">
			<span>{{item.menuname}}</span>
			<span>&times;{{item.quantity}}</span>
			<span>￥{{item.foodPrice}}</span>
		</div>
		<div class="pt-1 pb-1 d-flex justify-content-between">
			<div>
				<span class="badge badge-danger">其他</span>
				<span>其他费用</span>
			</div>
			<div>￥{{orderDetail.totalOther}}</div>
		</div>
		<div class="pt-1 pb-1 d-flex justify-content-between">
			<div>
				<span class="badge badge-secondary">包装费</span>
				<span>包装费</span>
			</div>
			<div>￥{{orderDetail.totalPack}}</div>
		</div>
		<div class="pt-1 pb-1 d-flex justify-content-between">
			<div>
				<span class="badge badge-primary">配送费</span>
				<span>配送费</span>
			</div>
			<div>￥{{orderDetail.deliveryfee}}</div>
		</div>
		<div class="mt-1 pt-2 pb-2 border-top text-right">
			实付&nbsp;￥{{orderDetail.totalPrice}}
		</div>
	</div>
	<!-- 配送信息 -->
	<div class="mt-2 bg-white pl-2 pr-2 mr-2 ml-2">
		<div class="font-weight-bold pt-2 pb-1 border-bottom">配送信息</div>
		<div class="d-flex justify-content-between pt-1 pb-1 border-bottom"
			v-if="parseInt($route.query.orderType) !== 0">
			<span>配送状态</span>
			<span>{{parseInt($route.query.orderType) == 1 ? '配送中' : '已送达'}}</span>
		</div>
		<div class="d-flex justify-content-between align-items-center pt-1 pb-1 border-bottom">
			<span class="">收货地址</span>
			<div class="d-flex flex-column justify-content-start">
				<span class="text-nowrap text-right">{{orderDetail.addrstr}}</span>
				<div class="text-right">
					<span>{{orderDetail.contsphone}}|</span><span>{{orderDetail.contsphone}}</span>
				</div>
			</div>
		</div>
		<div class="d-flex justify-content-between pt-1 pb-2"
			v-if="parseInt($route.query.orderType) !== 0">
			<span>配送人员</span>
			<span>{{orderDetail.waiterName}}</span>
		</div>
	</div>
	<!-- 订单信息 -->
	<div class="mt-2 bg-white pl-2 pr-2 mr-2 ml-2">
		<div class="font-weight-bold pt-2 pb-1 border-bottom">订单信息</div>
		<div class="d-flex justify-content-between pt-1 pb-1 border-bottom">
			<span>订单号</span>
			<span>{{orderDetail.orderno}}</span>
		</div>
		<div class="d-flex justify-content-between align-items-center pt-1 pb-1 border-bottom">
			<span>支付方式</span>
			<span>在线支付</span>
		</div>
		<div class="d-flex justify-content-between pt-1 pb-2">
			<span>下单时间</span>
			<span>{{orderDetail.orderdate}}</span>
		</div>
	</div>
</div>
</template>

<script>
import Header from '../../components/Header';
import { getOrderDetail, getFinishOrderDetail } from '@/api/order';
export default {
	name: 'OrderDetail',
	components:{
		Header:Header
	},
	data(){
		return{
			defaultImgSrc: require('@/assets/img/defaultsj.jpg'), // 默认商家图片
			isShowPs:false, //是否显示配送状态弹出框
			orderDetail: '', // 订单详情
			timer: '', // 计时器
            remainTime: '' // 剩余时间
		}
	},
	activated(){
		this.bodyHidden();
		this.getDetail();
	},
	methods:{
		// 获取未完成订单详情的接口
		httpGetOrderDetail(){
			getOrderDetail({
				openid: this.$store.state.app.openid,
				orderno: this.$route.query.orderno
			}).then(res => {
				this.computedMoney(res.data.data);
				this.setTimer();
			}).catch();
		},
		// 获取已完成订单详情的接口
		httpGetFinishOrderDetail(){
			getFinishOrderDetail({
				openid: this.$store.state.app.openid,
				orderno: this.$route.query.orderno
			}).then(res => {
				this.computedMoney(res.data.data);
				this.setTimer();
			}).catch();
		},
		// 计算价格
		computedMoney(data){
			// 总包装费、总其他费、菜品对应总价、订单总价
			let totalPack = 0,totalOther = 0,totalFood = 0,totalPrice = 0;
			this.orderDetail = {};
			for(let [key,item] of data.orderDetails.entries()){
				totalPack += (parseFloat(item.packfee)*item.quantity);
				totalOther += (parseFloat(item.otherfee)*item.quantity);
				totalFood += (parseFloat(item.price)*item.quantity);
				data.orderDetails[key].foodPrice=(parseFloat(item.price)*item.quantity).toFixed(2);
			}
			totalPrice = totalPack+totalOther+totalFood+parseFloat(data.deliveryfee);
			this.orderDetail = {
				...data,
				totalPack:totalPack.toFixed(2),
				totalOther:totalOther.toFixed(2),
				totalPrice:totalPrice.toFixed(2)
			}
		},
		// 请求订单详情
		getDetail(){
			let orderType = parseInt(this.$route.query.orderType);
			if(orderType !== 2){
				this.httpGetOrderDetail();
			}else{
				this.httpGetFinishOrderDetail();
			}
		},
		// 计时器
		setTimer(){
            this.remainTime = this.$_remainTime(this.orderDetail.orderdate,10);
            if(this.remainTime.second > 0){
                this.timer = setInterval(() => {
                    this.remainTime = this.$_remainTime(this.orderDetail.orderdate,10);
                    console.log(this.remainTime.second);
                    if(this.remainTime.second < 0 || this.remainTime.second == 0){
                        clearInterval(this.timer);
                    }
                }, 1000);
            }
        },
		// 获取订单说明
        getTypeMsg(){
            switch(parseInt(this.$route.query.orderType)){
                case 0 :
                    return "未支付";
                    break;
                case 1 :
                    return "待配送";
                    break;
                case 2 :
                    return "已完成";
                    break;
            }
        },
		showOrderState(){  //显示配送状态
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

<style lang="scss" scoped>
#orderDetail{
	background: #f5f5f5;
	padding-bottom: .5rem;
	.wait-pay-wrap{
		background-color: #fff;
		margin: .5rem 0;
		padding: .5rem;
		&>div:nth-child(1){
			font-size: 1.2rem;
			font-weight: bolder;
			display: flex;
			justify-content: center;
			padding: 5px;
			&>span:nth-child(2){
				margin-left: 10px;
				color: $info-color;
			}
		}
		&>div:nth-child(2){
			display: flex;
			justify-content: space-around;
			&>div:nth-child(1){
				color: $danger-color;
				padding: 5px 8px;
			}
			&>div:nth-child(2){
				color: $primary-color;
				padding: 5px 8px;
			}
		}
		&>div.over-time{
			color: $secondary-color;
		}
	}
}

.orderState{
	width: 100%;
	background: $primary-color;
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
	i{
		color: #6c757d;
	}
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
	flex: 1;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}

.food>span:nth-child(2){
	width: 35px;
	text-align: center;
}

.food>span:nth-child(3){
	width: 70px;
	text-align: right;
}
</style>
