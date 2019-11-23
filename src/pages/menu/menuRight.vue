<template>
	<article>
		<ul>
			<li>
				<ul class="foodSitu">
					<!-- 菜品列表 -->
					<li v-for="li in 10" :key="li" @click="toMenuDetail">
						<a href="javasript:void(0)" class="d-flex flex-column justify-content-center">
							<img src="../../assets/img/st.jpg" alt="无法显示" />
						</a>
						<div class="shop_mid">
							<div class="d-flex justify-content-between">
								<div class="tit"><a href="javasript:void(0)">菜品名称{{li}}</a></div>
								<div class="price">
									￥10
								</div>
							</div>
							<div class="small text-secondary">
								口味备注说明
							</div>
							<div class="small">
								<van-tag type="warning" class="mr-1">数量100</van-tag>
								<van-tag type="primary">库存50</van-tag>
							</div>
						</div>
						<div class="list-cart bg-white" @click.stop="">
							<i class="iconfont iconjianhao jiajian d-none"></i>
							<input readonly="" class="text_box d-none" value="1">
							<i class="iconfont iconjiahao jiajian" @click.stop="flyBall($event)"></i>
						</div>
					</li>
				</ul>
			</li>
		</ul>
		<!-- 飞入小球 -->
		<i id="ball" class="iconfont iconjiahao jiajian"></i>
	</article>
</template>

<script>
	import { Tag } from 'vant';
	
	export default{
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
					$ball.style.top =(this.getClientHeight()-40)+'px'; //购物车的位置
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

<style scoped="scoped">
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
	}
	
	.foodSitu li{
		width: 100%;
		border-bottom: 1px solid #CCCCCC;
		padding:5px 0;
		display: flex;
		justify-content: flex-start;
		position: relative;
	}
	
	.foodSitu>li>a{
		width:25%;
	}
	
	.foodSitu>li>a>img{
		max-width: 100%;
		max-height: 63px;
	}
	
	.shop_mid{
		margin-left: 1%;
		overflow: hidden;
		width: 74%;
	}
	
	.tit a{
		color: #333;
		font-size: 1rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.tit a:hover{
		color: #909090;
		text-decoration: none;
	}
	
	.price{
		color: #cb2527;
		font-size: 1rem;
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
		font-size: 22px!important;
		color: #4c87bf;
		line-height: 22px!important;
	}
	
	.text_box{
		border: 0;
		width: 1.5rem;
		height: 1.5rem;
		line-height: 1.5rem;
		text-align: center;
		/* display: none; */
	}

	#ball {
		display: none;
		position: fixed;
		transition: left 1s linear, top 1s ease-in;
		z-index: 99;
	}
</style>
