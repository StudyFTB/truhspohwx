<template>
<div id="shopCar" >
	<!-- 结算栏 -->
	<div class="downFooter d-flex justify-content-start" @click="show = !show">
		<div class="ml-3 iconShopCar" :class="{'bg-primary':footInfo.num>0}">
			<i class="iconfont icongouwuche"></i>
			<span>{{footInfo.num}}</span>
		</div>
		<div class=" needPayInfo">
			本餐共需支付<strong class="text-danger">10</strong>元
		</div>
		<div class="toPayBtn " :class="{'bg-primary':footInfo.num>0}" @click.stop="toPay">
			去结算
		</div>
	</div>
	<!-- 遮罩层 -->
	<van-overlay :show="show" @click="show = false">
		<div class="shopGoods" @click.stop="">
				<div class="boxTop mb-1">
					<div style="font-size:.8rem;" @click="show = false">关闭</div>
					<div style="font-size:.8rem;color:#0099cc;">清空购物车</div>
				</div>
				<ul>
					<li class="mt-2 mb-2">
						<div class="goodsName">
							菜品名称
						</div>
						<div class="goodsPrice text-danger">
							￥10
						</div>
						<div class="goodsNum">
							<i class="iconfont iconjianhao2 jiajian"></i>
							<input readonly="" class="text_box" value="1">
							<i class="iconfont iconjiahao jiajian"></i>
						</div>
					</li>
					<li class="pt-1 pb-1">
						<div class="goodsName">
							菜品名称
						</div>
						<div class="goodsPrice text-danger">
							￥10
						</div>
						<div class="goodsNum">
							<i class="iconfont iconjianhao2 jiajian"></i>
							<input readonly="" class="text_box" value="1">
							<i class="iconfont iconjiahao jiajian"></i>
						</div>
					</li>
				</ul>
			</div>
	</van-overlay>
</div>
</template>

<script>
	import { Overlay } from 'vant';
	
	export default{
		components:{
			[Overlay.name]:Overlay
		},
		data(){
			return{
				footInfo:{num:1,needPayPrice:10}, //底部信息
				show:false
			}
		},
		methods:{
			toPay(){
				this.$router.push("/pay");
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url("//at.alicdn.com/t/font_1473431_nyx699vr128.css");
	.downFooter{
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #333;
		z-index: 999;
		height:40px;
	}
	
	.iconShopCar{
		border: 1px solid #333;
		width:50px;
		height:50px;
		border-radius:50%;
		background-color: #333;
		margin-left: 3%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		position: absolute;
		bottom: 0;
	}
	
	.iconShopCar i{
		font-size: 1.7rem;
	}
	
	.iconShopCar span{
		position: absolute;
		top: 12px;
		right: 12px;
		box-sizing: border-box;
		min-width: 16px;
		padding: 0 3px;
		color: #fff;
		font-weight: 500;
		font-size: 12px;
		font-family: PingFang SC,Helvetica Neue,Arial,sans-serif;
		line-height: 14px;
		text-align: center;
		background-color: #ee0a24;
		/* border: 1px solid #fff; */
		border-radius: 16px;
		-webkit-transform: translate(50%,-50%);
		transform: translate(50%,-50%);
		-webkit-transform-origin: 100%;
		transform-origin: 100%;
	}
	
	.needPayInfo{
		line-height:40px;
		font-size:1.1rem;
		text-align: center;
		color: #FFFFFF;
		width: 75%;
		padding-left:calc(50px + 1rem);
	}
	
	.toPayBtn{
		color: #FFFFFF;
		line-height: 40px;
		width: 25%;
		text-align: center;
		background: #6c757d;
	}
	/* 遮罩层 */
	.shopGoods{
		position: fixed;
		bottom: 40px;
		width:100%;
		max-height:75%;
		background-color:#FFFFFF;
		border-top:5px solid #ffd480;
		padding:0 2%;
		padding-bottom: 10px;
		z-index: 998;
	}

	.shopGoods .boxTop{
		display: flex;
		justify-content: space-between;
		color: #999999;
		line-height:32px;
	}

	.shopGoods ul{
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.shopGoods ul li{
		display: flex;
		justify-content: space-between;
	}

	.goodsName{
		width:60%;
		white-space:nowrap;
		overflow: hidden;
	}

	.goodsPrice{
		width:15%;
	}

	.goodsNum{
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.shopGoods .decrease,.shopGoods .text_box{
		display: block;
	}
	.list-cart{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: absolute;
		bottom: 5px;
		right: 0;
	}
	
	.jiajian{
		font-size: 25px!important;
		color: $primary-color;
		line-height: 25px!important;
	}
	
	.text_box{
		border: 0;
		width: 1.5rem;
		height: 1.5rem;
		line-height: 1.5rem;
		text-align: center;
		/* display: none; */
	}
</style>
