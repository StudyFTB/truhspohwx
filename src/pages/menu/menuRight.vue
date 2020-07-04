<template>
	<article>
		<ul>
			<li>
				<ul class="foodSitu">
					<!-- 菜品列表 -->
					<li v-for="li in 15" :key="li" @click="toMenuDetail">
						<a href="javasript:void(0)" class="d-flex flex-column justify-content-center">
							<img src="../../assets/img/st.jpg" alt="无法显示" />
						</a>
						<div class="shop_mid">
							<div>
								菜品名称{{li}}
							</div>
							<div class="small text-secondary">
								口味备注说明
							</div>
							<div class="price">
								￥10
							</div>
						</div>
						<div class="list-cart bg-white" @click.stop="">
							<i class="iconfont iconjianhao2 jiajian"></i>
							<input readonly="" class="text_box" value="1">
							<i class="iconfont iconjiahao jiajian" @click.stop="flyBall($event)"></i>
						</div>
					</li>
				</ul>
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
	data(){
		return{
			
		}
	},
	methods:{
		toMenuDetail(){ //跳转到菜品详情
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
			max-width: 100%;
			max-height: 63px;
		}
	}
}
.shop_mid{
	margin-left: 1%;
	overflow: hidden;
	width: 74%;
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
