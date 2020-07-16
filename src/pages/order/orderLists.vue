<template>
<div id="orderLists">
    <div @click="$router.push('/orderDetail')">
        <div class="top-wrap">
            <img :src="defaultImgSrc" alt="无法显示" />
            <div>
                <div>第一食堂三楼中餐厅</div>
                <div>2019-10-14（早餐）</div>
            </div>
            <div>待支付</div>
        </div>
        <div class="bottom-wrap">
            <div>腊味排骨煲仔饭等共1件商品</div>
            <div>￥20.00</div>
        </div>
    </div>
</div>
</template>

<script>
import { Button } from 'vant';

export default {
    components:{
        [Button.name]:Button
    },
    data() {
        return {
            defaultImgSrc: require('@/assets/img/defaultsj.jpg')
        }
    }
}
</script>

<style lang="scss" scoped>
#orderLists{
    margin: 15px 15px 0 15px;
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
            height: 50px;
            &>div:nth-child(1){
                font-weight: bolder;
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
            color: #ff9900;
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