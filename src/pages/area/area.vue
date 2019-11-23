<template>
	<div>
		<!-- 头部标题 -->
		<Header title="选择商家"></Header>
		<!-- 主体部分 -->
		<div class="main pt-2">
			<p><i>配送地址：<span class="text-danger">杨颖滨大楼3楼某某科301病房1号床位</span></i></p>
			<p><i>订餐类型：<span class="text-danger">{{orderType}}</span></i></p>
			<ul class="ulBox">
				<strong class="d-block mb-2">
					可选商家
				</strong>
				<li class="d-flex justify-content-between" @click="toNext">
					<div class="d-flex flex-column justify-content-center">
						<img src="../../assets/img/st.jpg" class="d-block border round" style="height: 50px;width: 50px;">
					</div>
					<div class="areaName">
						<div class="font-weight-bold">
							第一食堂三楼职工食堂
						</div>
						<div class="d-flex justify-content-between small">
							<div style="height: 18px;line-height: 18px;color: #ff9900;">
								<van-icon name="star" />
								<van-icon name="star" />
								<van-icon name="star" />
								<van-icon name="star" />
								<van-icon name="star" />
							</div>
							<van-tag plain type="danger">食堂配送</van-tag>
						</div>
						<div class="small text-secondary">这是场所的备注一二三四五六七八九十个十百千万gdsf</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Header from '../../components/Header.vue';
	import { Icon } from 'vant';
	import { Tag } from 'vant';
	
	export default{
		components:{
			Header:Header,
			[Icon.name]:Icon,
			[Tag.name]:Tag
		},
		data(){
			return{
				orderType:'病人治疗餐',
			}
		},
		methods:{
			toNext(){ //去下一级
				this.$router.push("/date");
			}
		}
	}
</script>

<style scoped="scoped">
	.main{
		padding: 0 1rem;
	}
	.ulBox{
		list-style: none;
		margin:0;
		padding: 0;
	}
	.ulBox>li{
		width: 100%;
		border-bottom: 1px solid #ccc;
	}
	.areaName{
		width: calc(100% - 50px);
		display:inline-block;
		padding:.25rem;
	}
</style>
