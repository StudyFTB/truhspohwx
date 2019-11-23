<template>
<div id="editBed">
    <Header title="编辑床位" :hiddenHome="hiddenHome"></Header>
    <!-- 主体内容 -->
    <ul class="bedUl">
        <li class="card p-2 mb-2 d-flex flex-row justify-content-between" v-for="(bedli,index) in bedlis" :key="index">
            <div>
                <div>床位：{{bedli.bedname}}</div>
                <div>时间：{{bedli.time}}</div>
                <div>备注：{{bedli.remark}}</div>
            </div>
            <div class="bedBtn p-1">
                <button type="button" class="btn btn-success btn-sm"
                    data-toggle="modal" data-target="#myModal" @click="toEdit(bedli)">管理</button>
            </div>
        </li>
    </ul>
    <div class="p-3 mt-3">
        <button type="button" class="btn btn-primary btn-block btn-sm">添加其他床位</button>
    </div>
    <!-- 遮罩层 -->
    <van-overlay :show="show" @click="show = false" class="overLay">
        <div class="wrap" @click.stop="">
            <div class="d-flex justify-content-end pb-2">
                <van-icon name="cross" @click="show = false" />
            </div>
            <div class="mb-3">床位：{{modalInfo.bedname}}</div>
            <div class="mb-3">时间：{{modalInfo.time}}</div>
            <div class="mb-3">
                备注：<input type="text" maxlength="5" v-model="modalInfo.remark" placeholder="最多输入五个字"/>
            </div>
            <div class="d-flex justify-content-around p-3">
                <button type="button" class="btn btn-danger btn-sm">删除床位</button>
                <button type="button" class="btn btn-success btn-sm">保存修改</button>
            </div>
        </div>
    </van-overlay>
</div>
</template>

<script>
import Header from '../../components/Header';
import { Overlay,Icon } from 'vant';

export default {
    components:{
        Header:Header,
        [Overlay.name]:Overlay,
        [Icon.name]:Icon
    },
    data(){
        return{
            hiddenHome:false, //头部标题是否显示
            show: false, //遮罩层
            bedlis:[
				{bedname:'骨创伤科2号病房5号床位',remark:'只有五个字',time:'2019-10-22 15:41'},
				{bedname:'输血科302房2号床',remark:'',time:'2019-10-22 15:41'}
			],
			modalInfo:''  //遮罩层的信息
        }
    },
    mounted(){
        if(this.$route.params.before=='login')
            this.hiddenHome=true;
        else
            this.hiddenHome=false;
    },
    methods:{
        toEdit:function(bedli){
            this.show=!this.show;
            this.modalInfo=bedli;
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

.overLay{
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrap{
    background: white;
    padding: 1rem;
    border-radius: 5px;
}
</style>