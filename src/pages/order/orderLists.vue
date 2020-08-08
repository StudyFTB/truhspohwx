<template>
<div id="orderLists">
    <div @click="$router.push({path:'/orderDetail',query:{orderType,orderno:orderInfo.orderno}})">
        <div class="top-wrap">
            <img :src="$_getSmallImg(orderInfo.ctimgurl) || defaultImgSrc" alt="无法显示" />
            <div>
                <div>{{orderInfo.ctname}}</div>
                <div>{{orderInfo.consumedate}}（{{orderInfo.repastname}}）</div>
            </div>
            <div>
                <div :style="{color: getTypeColor()}">{{getTypeMsg()}}</div>
                <div v-show="orderType == 0">
                    <template v-if="remainTime.second > 0">
                        剩余 {{remainTime.time}}
                    </template>
                    <template v-else>
                        订单超时未支付
                    </template>
                </div>
            </div>
        </div>
        <div class="bottom-wrap">
            <div>{{orderInfo.menuStr}}等共{{orderInfo.menuCount}}件商品</div>
            <div>￥{{orderInfo.totalPrice}}</div>
        </div>
    </div>
</div>
</template>

<script>
import { Button } from 'vant';

export default {
    props: {
        orderInfo: { // 订单信息
            type: Object,
            default: () => {}
        },
        orderType: { // 订单类型，0：未支付，1：待配送，2：已完成
            type: Number,
            default: 0
        }
    },
    components:{
        [Button.name]:Button
    },
    data() {
        return {
            defaultImgSrc: require('@/assets/img/defaultsj.jpg'), // 默认图片路径
            timer: '', // 计时器
            remainTime: '' // 剩余时间
        }
    },
    created(){
        this.setTimer();
    },
    activated(){
        this.setTimer();
    },
    deactivated(){
        clearInterval(this.timer);
    },
    methods: {
        setTimer(){
            this.remainTime = this.$_remainTime(this.orderInfo.orderdate,10);
            if(this.remainTime.second > 0){
                this.timer = setInterval(() => {
                    this.remainTime = this.$_remainTime(this.orderInfo.orderdate,10);
                    console.log(this.remainTime.second);
                    if(this.remainTime.second < 0 || this.remainTime.second == 0){
                        clearInterval(this.timer);
                    }
                }, 1000);
            }
        },
        // 获取订单说明
        getTypeMsg(){
            switch(this.orderType){
                case 0 :
                    return "未支付";
                    break;
                case 1 :
                    return "待配送";
                    break;
                case 2 :
                    return "已完成";
                    break;
            }
        },
        // 获取订单颜色
        getTypeColor(){
            switch(this.orderType){
                case 0 :
                    return "#ffc107";
                    break;
                case 1 :
                    return "#17a2b8";
                    break;
                case 2 :
                    return "#007bff";
                    break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#orderLists{
    margin: 10px 15px 0 15px;
    padding: 10px 15px;
    border-radius: 10px;
    background-color: #fff;
    .top-wrap{
        display: flex;
        position: relative;
        &>img{
            width: 58px;
            height: 50px;
        }
        &>div:nth-child(2){
            margin-left: 12px;
            width: calc(100% - 125px);
            height: 50px;
            &>div:nth-child(1){
                font-weight: bolder;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            &>:nth-child(2){
                font-size: .8rem;
                color: $secondary-color;
            }
        }
        &>:nth-child(3){
            position: absolute;
            right: 0;
            top: 0;
            div{
                font-size: .9rem;
                text-align: right;
            }
            &>div:nth-child(2){
                font-size: .8rem;
                color: $secondary-color
            }
        }
    }
    .bottom-wrap{
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        font-size: .8rem;
        &>div:nth-child(1){
            color: $secondary-color;
        }
        &>div:nth-child(2){
            font-weight: bold;
        }
    }
}
</style>