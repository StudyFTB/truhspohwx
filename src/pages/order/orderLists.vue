<template>
    <div id="orderLists" class="pl-3 pr-3 mt-3">
        <div class="card">
            <div class="card-header d-flex justify-content-between small p-2">
                <div>2019-10-14（早餐）</div>
                <div class="text-danger">待支付</div>
            </div>
            <div class="card-body p-2">
                <div>第一食堂三楼中餐厅</div>
                <div class="text-secondary small">腊味排骨煲仔饭等共1件商品</div>
                <div class="text-secondary small">订单号：1556596454874545</div>
                <div class="d-flex justify-content-end mt-2">
                    <van-button plain type="danger" size="small" class="mr-2">完成支付</van-button>
                    <van-button plain type="info" size="small" to="/orderDetail">订单详情</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Button } from 'vant';

export default {
    components:{
        [Button.name]:Button
    }
}
</script>

<style>

</style>