<template>
<div id="pay">
    <!-- 标题栏 -->
    <Header title="结算支付"></Header>
    <!-- 字体内容 -->
    <div class="container pt-3">
        <div class="border-bottom text-white mb-3">
            <div class="pt-2 pb-2">
                <i class="iconfont icondizhi"></i>
                {{choseInfo.bed.hspname}} {{choseInfo.bed.qrBedName}}
            </div>
        </div>
        <div class="input-wrap">
            <van-field
                readonly
                clickable
                label="配送方式"
                :value="takeWay"
                placeholder="选择配送方式"
                @click="showPicker = true"
                size="large" label-align="right" label-width="80"
            />
            <van-field v-model="input.name" label="联系人" size="large" label-align="right" label-width="80"
                maxlength="6" placeholder="最多6位" required colon @blur="checkName" ref="inputName"
                :error="rules.name!==''" :error-message="rules.name" />
            <van-field v-model="input.phone" label="手机号" size="large" label-align="right" label-width="80"
                maxlength="11" placeholder="最多11位数字" required colon type="digit" @blur="checkPhone"
                :error="rules.phone!==''" :error-message="rules.phone" />
        </div>
        <div>
            <div class="card">
                <div class="card-header">
                    <span>{{choseInfo.dateRepast.date}}（{{choseInfo.dateRepast.repast.repastname}}）</span>
                </div>
                <div class="card-body">
                    <div class="food-list-wrap" v-for="item in choseInfo.shopCarData.foodList" :key="item.id">
                        <span>{{item.menuname}}</span>
                        <span>&times;{{item.choseNum}}</span>
                        <span class="text-danger">￥{{(parseFloat(item.price)*item.choseNum).toFixed(2)}}</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span>配送费</span>
                        <span></span>
                        <span class="text-danger">￥{{choseInfo.area.takefee}}</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span>包装费</span>
                        <span></span>
                        <span class="text-danger">￥{{choseInfo.shopCarData.totalPackfee}}</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span>其他费用</span>
                        <span></span>
                        <span class="text-danger">￥{{choseInfo.shopCarData.totalOtherfee}}</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span></span>
                        <span></span>
                        <span>合计：<strong class="text-danger">
                            ￥{{(parseFloat(choseInfo.shopCarData.totalMoney)+parseFloat(choseInfo.area.takefee)).toFixed(2)}}
                            </strong>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <div class="payInfo">
                合计：
                <strong class="text-danger">
                    ￥{{(parseFloat(choseInfo.shopCarData.totalMoney)+parseFloat(choseInfo.area.takefee)).toFixed(2)}}
                </strong>
            </div>
            <div class="confirmPay" @click="toNext">
                确认支付
            </div>
        </footer>
    </div>
    <!-- 弹出层 -->
    <van-popup v-model="showPicker" round position="bottom">
        <van-picker
            show-toolbar
            :columns="takeWays"
            @cancel="showPicker = false"
            @confirm="onConfirm"
        />
    </van-popup>
</div>
</template>

<script>
import Header from '../../components/Header';
import { Field, Popup, Picker } from 'vant';
import { phone, special } from "@/utils/validate";
import { selectWxPsnInfo } from "@/api/user";
import { addPayOrder } from "@/api/pay";
export default {
    name: 'Pay',
    components:{
        Header:Header,
        [Field.name]:Field,
        [Popup.name]:Popup,
        [Picker.name]:Picker,
    },
    data(){
        return {
            choseInfo: this.$store.state.wxdc.choseInfo,
            input: {
                name: '',
                phone: ''
            },
            rules: {
                name:'',
                phone: ''
            },
            takeWay: '', // 选中的配送方式
            showPicker: false, // 弹出选中框
            takeWays: [] // 配送方式
        }
    },
    activated(){
        this.setTakeWay();
        this.httpSelectWxPsnInfo();
    },
    methods:{
        // 请求用户信息的接口
        httpSelectWxPsnInfo(){
            selectWxPsnInfo({
                openid: this.$store.state.app.openid
            }).then(res => {
                this.input.name = res.data.data.personname;
                this.input.phone = res.data.data.phoneno;
            }).catch();
        },
        // 提交订单发起支付的接口
        httpAddPayOrder(){
            let taketype = 0; // 配送方式，0自取，1配送，2堂食
            if(this.takeWay==="到店自取") taketype=0;
            else if(this.takeWay==="商家配送") taketype=1;
            else if(this.takeWay==="堂食") taketype=2;
            // 菜品的id和数量集合
            let reqMenus = [];
            for(let item of this.choseInfo.shopCarData.foodList){
                reqMenus.push({ menuid:item.menuid, quantity:item.choseNum });
            }
            addPayOrder({
                openid: this.$store.state.app.openid,
                qrstr: this.choseInfo.bed.qrstr,
                date: this.choseInfo.dateRepast.date,
                ctid: this.choseInfo.area.ctid,
                repastid: this.choseInfo.dateRepast.repast.repastid,
                taketype,
                contsphone: this.input.phone,
                contsname: this.input.name,
                reqMenus
            }).then(res => {
                console.log(res);
            }).catch();
        },
        // 设置配送方式
        setTakeWay(){
            this.takeWays = [];
            if(this.choseInfo.area.isps) this.takeWays.push('商家配送');
            if(this.choseInfo.area.iszq) this.takeWays.push('到店自取');
            if(this.choseInfo.area.ists) this.takeWays.push('堂食');
            this.takeWay = this.takeWays[0];
        },
        // 配送方式弹出框点击确认触发
        onConfirm(value) {
            this.takeWay = value;
            this.showPicker = false;
        },
        // 验证联系人
        checkName(){
            let value = this.input.name;
            if(!value){
                this.rules.name = '联系人不能为空';
            }else if(special(value)){
                this.rules.name = '联系人不能含有特殊字符';
            }else{
                this.rules.name = '';
            }
        },
        // 验证手机号
        checkPhone(){
            let value = this.input.phone;
            if(!value){
                this.rules.phone = '手机号不能为空';
            }else if(!phone(value)){
                this.rules.phone = '手机号格式不对';
            }else{
                this.rules.phone = '';
            }
        },
        toNext(){
            this.checkName();
            this.checkPhone();
            if(this.rules.name==''&&this.rules.phone==''){
                this.httpAddPayOrder();
                // this.$router.replace("/order");
            }
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
    .input-wrap{
        margin: 20px 0;
    }
    .food-list-wrap{
        display: flex;
        justify-content: space-between;
        &>span{
            display: inline-block;
        }
        &>span:nth-child(1){
            flex: 1;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        &>span:nth-child(2){
            width: 50px;
            text-align: center;
        }
        &>span:nth-child(3){
            text-align: right;
            width: 70px;
        }
    }
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

</style>