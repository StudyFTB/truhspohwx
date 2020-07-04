<template>
	<div id="loginAgain" class="pr-3 pl-3 mb-3">
		<div class="headTip">请选择订餐床位</div>
		<ul class="bedUl">
			<li class="card p-2 mb-2 d-flex flex-row justify-content-between" 
				v-for="(bedli,index) in bedlis" :key="index">
				<span class="newMark" :class="{'d-none':index!=0}"></span>
				<div>
					<div>床位：{{bedli.bedname}}</div>
					<div>时间：{{bedli.time}}</div>
					<div>备注：{{bedli.remark}}</div>
				</div>
				<div class="bedBtn p-1">
					<van-button type="danger" size="small" to="/area">订餐</van-button>
				</div>
			</li>
		</ul>
		<div class="mt-5">
			<van-button type="primary"  block class="mb-3">其他床位</van-button>
			<van-button type="info" block to="/editBed/login">床位编辑</van-button>
		</div>
	</div>
</template>

<script>
	import { Button } from 'vant';
	
	export default{
		components:{
			[Button.name]:Button
		},
		data(){
			return{
				bedlis:[ //床号列表
					{bedname:'骨创伤科2号病房5号床位',remark:'只有五个字',time:'2019-10-22 15:41'},
					{bedname:'输血科302房2号床',remark:'只有五个字',time:'2019-10-22 15:41'}
				],
			}
		}
	}
</script>

<style scoped>
.bedUl{
	margin: 0;
	padding: 0;
	list-style-type: none;
}

.bedBtn{
	display: flex;
	justify-content: center;
	align-items: center;
}

.newMark{
	position: absolute;
	top: 0;
	left: 0;
	width: .5rem;
	height: .5rem;
	background-color: #007bff;
	border-radius: 0 0 100% 0;
}

.headTip{
	color: white;
	background: #007bff;
	text-align: center;
	position: relative;
	top:0;
	left: -15px;
	right: -15px;
	width: calc(100% + 30px);
	margin-bottom:.5rem;
	padding:.5rem 0;
}
</style>
