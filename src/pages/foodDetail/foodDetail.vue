<template>
    <div id="menuDetail">
        <!-- 标题栏 -->
        <Header title="菜品详情"></Header>
        <!-- 主体内容 -->
        <div class="container mt-1">
			<img class="w-100" :src="menuDetail.imageurl || defaultFoodImg" alt="无法显示" />
			<div class="mt-4 mb-2">
				<div class="h5 bolder">{{menuDetail.menuname}}</div>
				<div>单价：<span class="text-danger">￥{{menuDetail.price}}</span></div>
				<div class="kw text-secondary" style="font-size:0.8rem;">
					<span>口味：</span>
					<span >{{menuDetail.taste}}</span>
				</div>
				<div class="text-secondary">
                    餐盒费：<span class="text-danger">￥{{menuDetail.packfee}}</span>
                </div>
				<div class="text-secondary">
                    其他费用：<span class="text-danger">￥{{menuDetail.otherfee}}</span>
                </div>
			</div>
			<fieldset>
				<legend class="h6">商品详情</legend>
				<div>
					{{menuDetail.remark}}
				</div>
			</fieldset>
		</div>
    </div>
</template>

<script>
import Header from '../../components/Header';

export default {
    name: 'menuDetail',
    components:{
        Header:Header
    },
    data(){
        return{
            menuDetail:"",
            defaultFoodImg: require('@/assets/img/defaultfood.jpg'), // 默认菜品图片
        }
    },
    activated(){
        this.menuDetail = this.$store.state.wxdc.menuDetail;
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