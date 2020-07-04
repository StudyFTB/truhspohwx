<template>
<div id="pay">
    <!-- 标题栏 -->
    <Header title="结算支付"></Header>
    <!-- 字体内容 -->
    <div class="container pt-3">
        <div class="border-bottom text-white mb-3">
            <div class="pt-2 pb-2">
                <i class="iconfont icondizhi"></i>
                杨颖滨大楼3楼某某科301病房1号床位加长加长加长加长加长加长
            </div>
            <div class="pb-2">
                <i class="iconfont iconweibiaoti-"></i>
                18826679452
            </div>
        </div>
        <div>
            <div class="card">
                <div class="card-header">
                    <span>2019-10-14（早餐）</span>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <span>腊味瘦肉煲仔饭</span>
                        <span>&times;1</span>
                        <span class="text-danger">￥10</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span>配送费</span>
                        <span></span>
                        <span class="text-danger">￥1</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span>餐盒费</span>
                        <span></span>
                        <span class="text-danger">￥1</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span></span>
                        <span></span>
                        <span>合计：<strong class="text-danger">￥12</strong></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="input-wrap">
            <div>
                <label>联系人</label>
                <input type="text" value="" maxlength="5" placeholder="最多不超过5个字" />
            </div>
            <div>
                <label>备注</label>
                <input type="text" value="" maxlength="15" placeholder="最多不超过15个字" />
            </div>
        </div>
        <footer>
            <div class="payInfo">
                合计：
                <strong class="text-danger">￥12</strong>
            </div>
            <div class="confirmPay" @click="toNext">
                确认支付
            </div>
        </footer>
    </div>
</div>
</template>

<script>
import Header from '../../components/Header';

export default {
    components:{
        Header:Header
    },
    methods:{
        toNext(){
            this.$router.push("/bedinfo");
        }
    }
}
</script>

<style lang="scss" scoped>
#pay{
    position: fixed;
    top: 0;
    left: 0;
    right:0;
    bottom:0;
    background-image: linear-gradient(#007bff,#fff);
}
footer {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	display: flex;
	justify-content: space-between;
	border-top: 1px solid #ccc;
	background-color: #FFFFFF;
}
.payInfo {
	padding: 2.5% 3%;
	width: 70%;
	font-size: 1.2rem;
}
.confirmPay {
	width: 30%;
	background-color: #4c87bf;
	color: white;
	font-size: 1.2rem;
	text-align: center;
	padding: 2.5% 0;
	font-weight: bold;
}
.input-wrap{
    margin-top: 20px;
    &>div{
        margin-bottom: 10px;
        &>label{
            width: 70px;
            text-align: right;
            line-height: 32px;
            margin: 0;
        }
        input{
            padding: 2px 15px;
            width: calc(100% - 70px);
        }
    }
    &>div:nth-child(1)>label{
        letter-spacing:7px;
    }
    &>div:nth-child(2)>label{
        letter-spacing:17px;
    }
}

</style>