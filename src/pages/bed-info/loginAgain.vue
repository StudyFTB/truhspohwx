<template>
	<div id="loginAgain" class="pr-3 pl-3">
		<div class="headTip">请选择订餐床位</div>
		<ul class="bedUl" v-if="bedlis.length !== 0">
			<li class="card p-2 mb-2 d-flex flex-row justify-content-between" 
				v-for="(bedli) in bedlis" :key="bedli.id">
				<span class="newMark" v-if="bedli.isnowqr==1"></span>
				<div>
					<div>床位：{{bedli.qrBedName}}</div>
					<div>医院：{{bedli.hspname}}</div>
					<div>时间：{{bedli.createtime}}</div>
					<div>备注：{{bedli.remark}}</div>
				</div>
				<div class="bedBtn p-1">
					<van-button type="danger" size="small" @click="onDCClick(bedli.qrstr)">订餐</van-button>
				</div>
			</li>
		</ul>
		<van-empty image="search" description="未找到任何床位，请先绑定床位" v-if="bedlis.length == 0" />
		<div class="mt-5">
			<van-button type="primary" block class="mb-3" @click="onScan">添加床位</van-button>
			<van-button type="info" block to="/editBed">床位编辑</van-button>
		</div>
	</div>
</template>

<script>
import { Button, Empty } from 'vant';
import wxScan from '@/mixin/wxScan';
export default {
	components:{
		[Button.name]: Button,
		[Empty.name]: Empty
	},
	mixins: [wxScan],
	data(){
		return{
			bedlis:[], //床号列表
		}
	},
	created(){
		this.httpGetBedList();
	},
	activated(){
		// 刷新标志位yes
		if(this.$store.state.bed.isRefreshBedList == "yes"){
			this.httpGetBedList();
		}else{
			this.bedlis = this.$store.state.bed.bedList;
		}
	},
	methods: {
		// 获取床位的接口
		httpGetBedList(){
			this.$store.dispatch('bed/GetBedList').then(res => {
				this.bedlis = res.data.data;
			});
		},
		// 点击订餐按钮触发
		onDCClick(qrstr){
			this.$store.dispatch('wxdc/SetQrstr',qrstr);
			this.$store.dispatch('wxdc/SetRefreshArea','yes');
			this.$router.push('/area');
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
