<template>
<div id="mine">
    <Header title="我的"></Header>
    <!-- 主体内容 -->
    <div class="head_bg">
        <div class="">
            <img src="../../assets/img/st.jpg" >
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
            <div class="jifen ml-3">10</div>
        </div>
        <div class="mb-2" @click="toEditBed()">
            <div class="bg-info"></div>
            <div>我的床位</div>
        </div>
        <div class="mb-2 position-relative">
            <div class="bg-success d-flex justify-content-center align-items-center">
                <i class="iconfont iconlaba text-white" style="font-size:1.3rem;"></i>
            </div>
            <div>提醒功能</div>
            <div class="tipSwitch">
                <i class="iconfont iconkaiguan-kai openSwitch" :class="{'d-none':!tipSwitch}"
                    @click="toggleSwitch()"></i>
                <i class="iconfont iconkaiguan-guan closeSwitch" :class="{'d-none':tipSwitch}"
                    @click="toggleSwitch()"></i>
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

export default {
    components:{
        Header:Header,
        NavBar:NavBar
    },
    data(){
        return{
            tipSwitch:true, //后台推送功能开关
        }
    },
    methods:{
        toOrder:function(){ //点击我的订单去记录
            this.$router.push("/order");
        },
        toMyInfo:function(){
            this.$router.push("/myInfo");
        },
        toEditBed:function(){ //点击我的床位去编辑床位
            const before='mine'
            this.$router.push({path:`/editBed/${before}`});
        },
        toggleSwitch:function () {
            this.tipSwitch=!this.tipSwitch;
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
	background: #CCCCCC;
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