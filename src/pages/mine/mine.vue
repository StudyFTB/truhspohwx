<template>
<div id="mine">
    <Header title="我的"></Header>
    <!-- 主体内容 -->
    <div class="head_bg">
        <div class="">
            <img :src="userInfo.headimgurl" >
        </div>
    </div>
    <div class="function pb-2 pt-2">
        <div class="mb-2" @click="toOrder()">
            <div class="bg-primary"></div>
            <div>我的订单</div>
        </div>
        <div class="border-bottom" @click="toMyInfo()">
            <div class="bg-danger"></div>
            <div>我的资料</div>
        </div>
        <div class="border-bottom">
            <div class="bg-warning"></div>
            <div>我的积分</div>
            <div class="jifen ml-3">{{userInfo.integral}}</div>
        </div>
        <div class="mb-2" @click="toEditBed()">
            <div class="bg-info"></div>
            <div>我的床位</div>
        </div>
        <div @click="onUnbind">
            <div class="bg-danger d-flex justify-content-center align-items-center">
                <i class="iconfont iconjiechubangding text-white" style="font-size:1.3rem;"></i>
            </div>
            <div>解除绑定</div>
        </div>
        <div class="mb-2 position-relative">
            <div class="bg-success d-flex justify-content-center align-items-center">
                <i class="iconfont iconlaba text-white" style="font-size:1.3rem;"></i>
            </div>
            <div>提醒功能</div>
            <div class="tipSwitch" @click="toggleSwitch()">
                <i class="iconfont iconkaiguan-kai openSwitch" v-show="userInfo.ispush == 1"></i>
                <i class="iconfont iconkaiguan-guan closeSwitch" v-show="userInfo.ispush == 0"></i>
            </div>
        </div>
    </div>
    <div style="height:55px;"></div>
    <!-- 底部导航 -->
    <NavBar></NavBar>
</div>
</template>

<script>
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { selectWxPsnInfo, delWxUser, uPdateWxUser } from "@/api/user";
export default {
    name: 'Mine',
    components:{
        Header:Header,
        NavBar:NavBar
    },
    data(){
        return{
            userInfo:"" // 用户信息
        }
    },
    created(){
        this.httpSelectWxPsnInfo();
    },
    methods:{
        // 获取用户信息的接口
        httpSelectWxPsnInfo(){
            selectWxPsnInfo({
                openid: this.$store.state.app.openid
            }).then(res => {
                this.userInfo = res.data.data;
            }).catch();
        },
        // 修改用户信息的接口
        httpuPdateWxUser(){
            uPdateWxUser({
                openid: this.$store.state.app.openid,
                personname: this.userInfo.personname,
                phoneno: this.userInfo.phoneno,
                ispush: this.userInfo.ispush == 1 ? 0 : 1
            }).then(res => {
                if(this.userInfo.ispush == 1){
                    this.userInfo.ispush = 0;
                }else if(this.userInfo.ispush == 0){
                    this.userInfo.ispush = 1;
                }
            }).catch();
        },
        // 解除绑定的接口
        httpDelWxUser(){
            delWxUser({
                openid: this.$store.state.app.openid
            }).then(res => {
                this.$_tip("解除绑定成功");
                // 退出到公众号
                WeixinJSBridge.call('closeWindow');
            }).catch();
        },
        toOrder:function(){ //点击我的订单去记录
            this.$router.push("/order");
        },
        toMyInfo:function(){
            this.$router.push("/myInfo");
        },
        toEditBed:function(){ //点击我的床位去编辑床位
            this.$router.push({path:`/editBed`});
        },
        // 点击解除绑定触发
        onUnbind(){
            this.$_confirm({
                message: "是否要解除绑定？",
                onConfirm: () => this.httpDelWxUser()
            });
        },
        toggleSwitch:function () {
            let message;
            if(this.userInfo.ispush == 1){
                message = "是否要【关闭】消息推送提醒功能？";
            }else if(this.userInfo.ispush == 0){
                message = "是否要【打开】消息推送提醒功能？";
            }
            this.$_confirm({
                message,
                onConfirm: () => this.httpuPdateWxUser()
            });
        }
    }
}
</script>

<style scoped>
#mine{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.head_bg{
	background-color: #4c87bf;
	height: 30%;
	width: 100%;
	z-index: -1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
}
.head_bg div>img{
	height: 70px;
	width: 70px;
	border-radius:50%;
}

.function{
	background: #f5f5f5;
}

.function>div{
	display: flex;
	justify-content: flex-start;
	background: #FFFFFF;
	padding:.25rem .5rem;
}

.function>div>div:first-child{
	width: 35px;
	height: 35px;
	border-radius:5px;
	background: #CCCCCC;
}

.function>div>div:nth-child(2){
	padding-left:.5rem;
	line-height:35px;
	color: #666;
}

.myInfo{
	line-height:35px;
	color: #666;
}

.jifen{
	line-height:35px;
	color: #666;
}

.tipSwitch{
	position: absolute;
	right: 20px;
}

.openSwitch{
	color: #28a745;
	font-size: 1.4rem;
	line-height: 35px;
}

.closeSwitch{
	color: #666;
	font-size: 1.4rem;
	line-height: 35px;
}
</style>