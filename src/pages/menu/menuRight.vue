<template>
<article>
	<ul class="foodSitu">
		<!-- 菜品列表 -->
		<li v-for="item in this.allFoodList[this.activeKey]" :key="item.id" @click="toMenuDetail(item)">
			<a href="javasript:void(0)" class="d-flex flex-column justify-content-center">
				<img :src="item.imageurl || defaultFoodImg" alt="无法显示" />
			</a>
			<div class="shop_mid">
				<div>
					{{item.menuname}}
				</div>
				<div class="small text-secondary">
					{{item.taste}}
				</div>
				<div class="price">
					￥{{item.price}}
				</div>
			</div>
			<div class="list-cart bg-white" @click.stop="">
				<template v-if="item.candctotal > 0">
					<i class="iconfont iconjianhao2 jiajian" v-show="item.choseNum > 0"
						@click.stop="onReduceClick(item)"></i>
					<input readonly="" class="text_box" v-model="item.choseNum" v-show="item.choseNum > 0" />
					<i class="iconfont iconjiahao jiajian" @click.stop="onAddClick($event,item)"></i>
				</template>
				<span v-else class="text-secondary">已售完</span>
			</div>
		</li>
	</ul>
	<!-- 飞入小球 -->
	<i id="ball" class="iconfont iconjiahao"></i>
</article>
</template>

<script>
import { Tag } from 'vant';
export default {
	components:{
		[Tag.name]:Tag
	},
	props: {
		allFoodList:{
			type: Array,
			default: () => []
		},
		activeKey:{
			type: Number,
			default: 0
		}
	},
	data(){
		return{
			defaultFoodImg: require('@/assets/img/defaultfood.jpg'), // 默认菜品图片
		}
	},
	methods:{
		// 点击添加按钮
		onAddClick(e,food){
			// 飞入小球
			this.flyBall(e);
			food.choseNum++;
		},
		// 点击减号按钮触发
		onReduceClick(food){
			food.choseNum--;
		},
		toMenuDetail(item){ //跳转到菜品详情
			this.$store.commit('wxdc/SET_MENUDETAIL',item);
			this.$router.push("/foodDetail");
		},

		flyBall:function(e){ //飞入小球
			var $ball = document.getElementById('ball');
			$ball.style.display='block';
			$ball.style.top =e.y-11+'px';
			$ball.style.left =e.x-11+'px';
			$ball.style.transition = 'left 0s, top 0s';
			setTimeout(()=>{
				$ball.style.top =(this.getClientHeight()-0)+'px'; //购物车的位置
				$ball.style.left = '30px';
				$ball.style.transition = 'left 1s linear, top 1s ease-in';
			}, 20);
		},
		getClientHeight(){ //获取窗口高度
			var clientHeight=0;
			if(document.body.clientHeight&&document.documentElement.clientHeight)
			{
				clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
			}
			else
			{
				clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
			}
			return clientHeight;
		}
	}
}
</script>

<style lang="scss" scoped>
ul{
	list-style: none;
	padding:0;
	margin: 0;
}
.foodSitu{
	list-style: none;
	margin:0;
	padding: 0;
	padding-bottom:3px;
	li{
		width: 100%;
		border-bottom: 1px solid #f5f5f5;
		padding:12px 0;
		display: flex;
		justify-content: flex-start;
		position: relative;
	}
	&>li>a{
		width:25%;
		&>img{
			width: 100%;
			height: 67px;
		}
	}
}
.shop_mid{
	margin-left: 1%;
	overflow: hidden;
	width: 74%;
	height: 67px;
	&>div{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	div:nth-child(1){
		width: 100%;
		height: 24px;
		line-height: 24px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		outline: 0!important;
		font-weight: bolder;
	}
	.price{
		color: #ff0000;
		font-weight: bold;
	}
}
.list-cart{
	display: flex;
	justify-content: flex-start;
	align-items: center;
	position: absolute;
	bottom: 12px;
	right: 0;
	.jiajian{
		font-size: 25px!important;
		color: $primary-color;
		line-height: 25px!important;
	}
	.text_box{
		border: 0;
		width: 25px;
		height: 25px;
		line-height: 25px;
		text-align: center;
	}
}
#ball {
	display: none;
	position: fixed;
	transition: left 1s linear, top 1s ease-in;
	z-index: 99;
	font-size: 25px!important;
	color: $primary-color;
	line-height: 25px!important;
}
</style>
