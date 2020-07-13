<template>
<div>
	<!-- 头部标题 -->
	<Header :title="`${$store.state.wxdc.areaData.ctname}`"></Header>
	<!-- 主体部分 -->
	<div class="pl-3 pr-3 mb-3 pt-2">
		<!-- 选择 -->
		<div>
			<div class="time">
				<div v-for="(item,index) in needDates" :key="item.id" class="dateBox" :class="{dateAct:dateAct==index}" @click="choDate(index)">
					<div class="dateMonth">{{item.YearMonth}}</div>
					<div class="dateDate">{{item.date}}</div>
					<div class="dateWeek">{{item.week}}</div>
				</div>
			</div>
			<table class="table table-sm border" 
				v-if="needDates.length !== 0 && needDates[dateAct].repasts.length !== 0">
				<thead>
					<tr>
						<th>餐别</th>
						<th>截止时间</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in needDates[dateAct].repasts" :key="item.id">
						<td>{{item.repastname}}</td>
						<td>{{item.endtime}}</td>
						<td>
							<button type="button" class="btn btn-warning btn-sm" @click="toMenu(item)">
								订{{item.repastname}}
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<!-- 空状态 -->
			<van-empty v-else image="search" description="暂无可订餐别" />
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
import { Empty } from 'vant';
import { getRepastAllDates } from '@/api/wxdc';
export default {
	name: 'Date',
	components:{
		Header: Header,
		[Empty.name]: Empty
	},
	data(){
		return{
			apiDates:[], // 接口用的日期数组
			needDates:[],
			dateAct:0, //点击的日期
		}
	},
	created(){
		if(this.$store.state.wxdc.refreshDate === 'yes')  return false;
		this.apiDates = [];
		this.needDates = [];
		this.computedDates();
		this.httpGetRepastAllDates();
	},
	activated() {
		if(this.$store.state.wxdc.refreshDate !== 'yes') return false;
		this.apiDates = [];
		this.needDates = [];
		this.computedDates();
		this.httpGetRepastAllDates();
	},
	methods:{
		// 请求餐别的接口
		httpGetRepastAllDates(){
			getRepastAllDates({
				openid: this.$store.state.app.openid,
				qrstr: this.$store.state.wxdc.qrstr,
				ctid: this.$store.state.wxdc.areaData.ctid,
				advday: this.$store.state.wxdc.areaData.advday,
				dates: this.apiDates
			}).then(res => {
				this.formatDates(res.data.data);
				this.$store.dispatch('wxdc/SetRefreshDate','no');
			}).catch();
		},
		// 计算出日期的数组
		computedDates(){
			let advday = this.$store.state.wxdc.areaData.advday; // 今天可订几天后的
			let dcdaycount = this.$store.state.wxdc.areaData.dcdaycount; // 可订天数
			this.apiDates = [];
			for(let i=advday; i<(advday+dcdaycount);i++){
				this.apiDates.push(this.$_setDate(i));
			}
		},
		// 格式化数据，方便渲染
		formatDates(data){
			this.needDates = [];
			for(let item of data){
				let YearMonth = item.dcDate.slice(0,7);
				let date = item.dcDate.slice(8);
				let week = '';
				switch(new Date(item.dcDate).getDay()){
					case 0: week = '星期日'; break;
					case 1: week = '星期一'; break;
					case 2: week = '星期二'; break;
					case 3: week = '星期三'; break;
					case 4: week = '星期四'; break;
					case 5: week = '星期五'; break;
					case 6: week = '星期六'; break;
				}
				this.needDates.push({
					YearMonth,date,week,
					dcDate: item.dcDate,
					repasts: item.repasts
				});
			}
		},
		// 点击日期触发
		choDate(index){
			this.dateAct=index;
		},
		// 点击订餐餐别触发
		toMenu(repast){
			this.$store.dispatch('wxdc/SetRefreshMenu','yes')
			this.$router.push({
				path: "/menu",
				query:{
					repastid: repast.repastid,
					repastname: repast.repastname,
					date: this.needDates[this.dateAct].dcDate
				}
			});
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
