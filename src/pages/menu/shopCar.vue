<template>
<div id="shopCar" >
	<!-- 结算栏 -->
	<div class="downFooter d-flex justify-content-start" @click="onDownClick">
		<div class="ml-3 iconShopCar" :class="{'bg-primary':shopCarData.totalNum>0}">
			<i class="iconfont icongouwuche"></i>
			<span v-show="shopCarData.totalNum > 0">{{shopCarData.totalNum}}</span>
		</div>
		<div class="needPayInfo">
			<strong v-if="shopCarData.totalMoney>0">￥{{shopCarData.totalMoney}}</strong>
			<strong v-else>未选购商品</strong>
			<span>另需配送费：￥{{$store.state.wxdc.areaData.takefee}}</span>
		</div>
		<div class="toPayBtn " :class="{'bg-primary':shopCarData.totalNum>0}" @click.stop="onPayClick">
			去结算
		</div>
	</div>
	<!-- 遮罩层 -->
	<van-overlay :show="show" @click="show = false">
		<div class="shopGoods" @click.stop="">
			<div class="boxTop mb-1">
				<div style="font-size:.8rem;" @click="show = false">关闭</div>
				<div style="font-size:.8rem;color:#0099cc;" @click="onCleanAll">清空购物车</div>
			</div>
			<ul>
				<li v-for="item in shopCarData.foodList" :key="item.id" class="mt-2 mb-2">
					<div class="goodsName">
						{{item.menuname}}
					</div>
					<div class="goodsPrice text-danger">
						￥{{item.price}}
					</div>
					<div class="goodsNum">
						<i class="iconfont iconjianhao2 jiajian" @click="onReduceClick(item)"></i>
						<input readonly="" class="text_box" v-model="item.choseNum">
						<i class="iconfont iconjiahao jiajian" @click="onAddClick(item)"></i>
					</div>
				</li>
			</ul>
			<div>
				<span>包装费：</span>
				<span>￥{{shopCarData.totalPackfee}}</span>
			</div>
			<div>
				<span>其他费用：</span>
				<span>￥{{shopCarData.totalOtherfee}}</span>
			</div>
		</div>
	</van-overlay>
</div>
</template>

<script>
import { Overlay } from 'vant';
export default {
	props:{
		allFoodList:{
			type: Array,
			default: () => []
		},
		shopCarData: {
			type: Object,
			default: () => {}
		}
	},
	components:{
		[Overlay.name]:Overlay
	},
	data(){
		return{
			show:false // 控制遮罩层
		}
	},
	methods:{
		// 点击下面那一栏触发
		onDownClick(){
			this.show = !this.show;
			if(!this.show) return false;
		},
		// 点击加号按钮触发
		onAddClick(food){
			food.choseNum++;
			this.setAllFoodList(food,food.choseNum);
		},
		// 点击减号按钮触发
		onReduceClick(food){
			food.choseNum--;
			this.setAllFoodList(food,food.choseNum);
		},
		// 点击清空购物车触发
		onCleanAll(){
			this.$_confirm({
				message: '确定要清除购物车吗？',
				onConfirm: () => {
					for(let item of this.shopCarData.foodList){
						this.setAllFoodList(item,0);
					}
				}
			});
		},
		// 改变allFoodList数量
		setAllFoodList(food,num){
			for(let item of this.allFoodList){
				for(let i of item.foods){
					if(food.menuid == i.menuid){
						i.choseNum = num;
					}
				}
			}
		},
		// 点击结算按钮触发
		onPayClick(){
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
		color: #FFFFFF;
		width: 75%;
		padding-left:90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		&>strong{
			font-size: .9rem;
			line-height: 21px;
		}
		&>span{
			font-size: .6rem;
			line-height: 18px;
		}
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
		&>div:nth-child(3),&>div:nth-child(4){
			&>span:nth-child(1){
				width: 80px;
				text-align: right;
				display: inline-block;
			}
			&>span:nth-child(2){
				color:$danger-color;
			}
		}
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
