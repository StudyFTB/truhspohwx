<template>
<div>
	<!-- 头部标题 -->
	<Header :title="`${lctnName}-${areaName}`"></Header>
	<!-- 主体部分 -->
	<div class="pl-3 pr-3 mb-3 pt-2">
		<!-- 选择 -->
		<div>
			<div class="time">
				<div v-for="(date,index) in dateFormat" :key="index" class="dateBox" :class="{dateAct:dateAct==index}" @click="choDate(index)">
					<div class="dateMonth">{{date.month}}</div>
					<div class="dateDate">{{date.date}}</div>
					<div class="dateWeek">{{date.week}}</div>
				</div>
			</div>
			<table class="table table-sm border">
				<thead>
					<tr>
						<th>餐别</th>
						<th>已订份数</th>
						<th>截止时间</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(mealNum,index) in mealNums" :key="index">
						<td>{{mealNum.meal}}</td>
						<td>{{mealNum.num}}</td>
						<td>{{mealNum.stopTime}}</td>
						<td>
							<button type="button" class="btn btn-warning btn-sm" @click="toMenu">
								订{{mealNum.meal}}
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- 说明 -->
		<div class="tip-wrap">
			<div class="title">温馨提示：</div>
			<p>
				当前订餐范围
				<strong class="text-info">2019-10-10</strong>
				至
				<strong class="text-info">2019-10-11</strong>
			</p>
			<p>
				<span class="dot"></span>
				<span>蓝色日期为您当前选中日期</span>
			</p>
			<p>
				<span class="dot"></span>
				当前选中日期的可订餐别为
				<strong class="text-info">
					早餐
				</strong>
				<strong class="text-info">
					午餐
				</strong>
				<strong class="text-info">
					晚餐
				</strong>
			</p>
		</div>
	</div>
</div>
</template>

<script>
	import Header from '../../components/Header.vue';
	export default{
		components:{
			Header:Header
		},
		data(){
			return{
				lctnName:'第一食堂',
				areaName:'三楼中餐厅',
				dates:[
					{date:"2019-08-07",week:"星期三",num:[
						{meal:"早餐",num:51,stopTime:"18:00"},
						{meal:"午餐",num:41,stopTime:"18:00"},
						{meal:"晚餐",num:45,stopTime:"18:00"}
					]},
					{date:"2019-08-08",week:"星期四",num:[
						{meal:"早餐",num:10,stopTime:"18:00"},
						{meal:"午餐",num:50,stopTime:"18:00"},
						{meal:"晚餐",num:20,stopTime:"18:00"}
					]}
				],
				dateFormat:[], //订餐日期的格式
				dateAct:0, //点击的日期
				mealNums:[]  //订餐的餐别数量
			}
		},
		created() {
			this.mealNums=this.dates[0].num;
			for(let i in this.dates){
				this.dateFormat[i]={
					month:this.dates[i].date.slice(0,7),
					date:this.dates[i].date.slice(8),
					week:this.dates[i].week
				}
			}
		},
		methods:{
			choDate(index){
				this.dateAct=index;
				this.mealNums=this.dates[index].num;
			},
			toMenu(){
				this.$router.push("/menu");
			}
		}
	}
</script>

<style lang="scss" scoped>
.time{
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	margin: 10px 0;
}
.dateBox{
	width:20%;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	border:1px solid #ccc;
}
.dateBox div{
	text-align: center;
	white-space: nowrap;
}
.dateMonth{
	font-size:.9rem;
	color:#999999;
}
.dateDate{
	font-weight: bold;
}
.dateWeek{
	font-size:.9rem;
	background-color:#e6e6e6;
	color:#666666;
}
.dateAct{
	border-color: #33adff;
}
.dateAct .dateDate{
	color: #33adff;
}
.dateAct .dateWeek{
	background-color:#33adff;
	color:#FFFFFF;
}
table th,table td{
	text-align: center;
}
.tip-wrap{
	border: 1px solid #33adff;
	padding:0 10px;
	margin-top: 30px;
	.title{
		font-size: 1.2rem;
		display: inline-block;
		width: auto;
		background-color: #fff;
		position: relative;
		top: -15px;
		font-weight: bolder;
		color: $primary-color;
	}
	.dot{
		height:15px;
		width:15px;
		border-radius: 50%;
		background-color:#33adff;
		display:inline-block;
	}
}
</style>
