<template>
<div id="editBed">
    <Header title="编辑床位"></Header>
    <!-- 主体内容 -->
    <ul class="bedUl" v-if="bedlis.length !== 0">
        <li class="card p-2 m-2 d-flex flex-row justify-content-between" v-for="(bedli,index) in bedlis" :key="index">
            <div>
                <div>医院名称：{{bedli.hspname}}</div>
                <div>床位名称：{{bedli.qrBedName}}</div>
                <div>床位编号：{{bedli.bedno}}</div>
        		<div>床位类型：{{bedli.bedtype == 0 ? '在编' : '加床'}}</div>
                <div>绑定时间：{{bedli.createtime}}</div>
                <div>备注：{{bedli.remark}}</div>
            </div>
            <div class="bedBtn p-1">
                <van-button type="warning" size="small" @click="onManageClick(bedli)">管理</van-button>
            </div>
        </li>
    </ul>
    <van-empty image="search" description="未找到任何床位，请先绑定床位" v-if="bedlis.length == 0" />
    <div class="p-3 mt-3">
        <van-button type="primary" block @click="onScan">添加床位</van-button>
    </div>
    <!-- 遮罩层 -->
    <van-overlay :show="show" @click="show = false" class="overLay">
        <div class="wrap" @click.stop="">
            <div class="d-flex justify-content-end pb-2">
                <van-icon name="cross" @click="show = false" />
            </div>
            <div class="mb-3">床位：{{modalInfo.qrBedName}}</div>
            <div class="mb-3">医院：{{modalInfo.hspname}}</div>
            <div class="mb-3">时间：{{modalInfo.createtime}}</div>
            <div class="mb-3">
                备注：
                <input type="text" maxlength="5" v-model="modalInfo.remark" placeholder="最多输入五个字"
                    style="border:1px solid #999;padding:2px 5px;"/>
            </div>
            <div class="d-flex justify-content-around p-3">
                <van-button type="danger" size="small" @click="onDelBed">删除床位</van-button>
                <van-button type="primary" size="small" @click="onSetBed">保存修改</van-button>
            </div>
        </div>
    </van-overlay>
</div>
</template>

<script>
import Header from '../../components/Header';
import { Overlay,Icon,Empty, Button } from 'vant';
import { uPdatePsnBed, delPsnBed } from '@/api/bed';
import { special } from '@/utils/validate';
import wxScan from '@/mixin/wxScan';
export default {
    name: 'EditBed',
    components:{
        Header:Header,
        [Overlay.name]:Overlay,
        [Icon.name]:Icon,
        [Empty.name]: Empty,
        [Button.name]: Button
    },
    mixins: [wxScan],
    data(){
        return{
            hiddenHome:false, //头部标题是否显示
            show: false, //遮罩层
            bedlis:[],
			modalInfo:''  //遮罩层的信息
        }
    },
    watch:{
        show(nval){
            if(!nval) this.modalInfo = '';
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
    methods:{
        // 获取床位的接口
		httpGetBedList(){
			this.$store.dispatch('bed/GetBedList').then(res => {
				this.bedlis = res.data.data;
			});
		},
        // 更新床位信息的接口
        httpuPdatePsnBed(){
            uPdatePsnBed({
                openid: this.$store.state.app.openid,
                qrstr: this.modalInfo.qrstr,
                remark: this.modalInfo.remark
            }).then(res => {
                this.$_tip('修改备注成功');
                this.show = false;
                this.httpGetBedList();
            }).catch();
        },
        // 删除床位信息的接口
        httpdelPsnBed(){
            delPsnBed({
                openid: this.$store.state.app.openid,
                qrstr: this.modalInfo.qrstr
            }).then(res => {
                this.$_tip('删除成功');
                this.show = false;
                this.httpGetBedList();
                // 如果删除的qrstr是当前扫码的qrstr
                if(this.modalInfo.qrstr === this.$store.state.app.qrstr){
                    this.$store.dispatch('app/SetQrstr','TRUHWXGZH');
                }
            }).catch();
        },
        // 点击管理按钮触发
        onManageClick:function(bedli){
            this.show=true;
            this.modalInfo=bedli;
        },
        // 点击删除床位触发
        onDelBed(){
            this.$_confirm({
                message: '确定要删除此床位吗？',
                onConfirm: () => this.httpdelPsnBed()
            });
        },
        // 点击保存修改触发
        onSetBed(){
            if(special(this.modalInfo.remark)){
                this.$_tip('备注不能含有特殊字符','fail')
                return false;
            }
            this.httpuPdatePsnBed();
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