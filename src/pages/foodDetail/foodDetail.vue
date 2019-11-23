<template>
    <div id="menuDetail">
        <!-- 标题栏 -->
        <Header title="菜品详情"></Header>
        <!-- 主体内容 -->
        <div class="container mt-1">
			<img class="w-100" :src="foodImgurl" :alt="foodImgurl" />
			<div class="mt-4 mb-2">
				<div class="h5 bolder">{{foodName}}</div>
					<div>单价：<span class="text-danger">￥{{price}}</span></div>
				<div class="kw text-secondary" style="font-size:0.8rem;">
					<span>口味：</span>
					<span >{{taste}}</span>
				</div>
				<div style="font-size:0.8rem;" class="text-secondary">餐盒费：<span class="text-danger">￥{{packCharges}}</span></div>
			</div>
			<fieldset>
				<legend class="h6">商品详情</legend>
				<div style="font-size:0.8rem;">
					{{foodDesc}}
				</div>
			</fieldset>
		</div>
    </div>
</template>

<script>
import Header from '../../components/Header';

export default {
    components:{
        Header:Header
    },
    data(){
        return{
            foodName:"冬菇滑鸡煲仔饭",
            price:"15",
            packCharges:"1",
            foodDesc:"说明详情",
            foodImgurl:"http://test1.zstru.com/images/rmyycs/1565749516656冬菇滑鸡煲仔饭.jpg",
            taste:"美味"
        }
    }
}
</script>

<style scoped>
.kw img{
    width:20px;
}

fieldset {
    padding: .35em .625em .75em;
    margin: 0 2px;
    border: 1px solid #999999;
}

legend {
    padding: .5em;
    border: 0;
    width: auto;
    margin-bottom: 0px;
}

</style>