<template>
<div id="myInfo">
    <Header title="我的资料"></Header>
    <!-- 主要页面 -->
    <div class="container pt-2">
        <div class="card p-2 mt-3">
            <div>手机号码：{{info.phone}}</div>
            <div>联系人：{{info.name}}</div>
        </div>
        <div class="mt-3">
            <button type="button" class="btn btn-success btn-block btn-sm" @click="togglePopup()">编辑个人资料</button>
        </div>
    </div>
    <!-- 遮罩层 -->
    <van-overlay :show="show" @click="show = false" class="overLay">
        <div class="bg-white rounded p-2 m-1" @click.stop="">
            <h4 class="text-center p-2 border-bottom">编辑资料</h4>
            <div class="input-group mb-3 mt-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">手机号码</span>
                </div>
                <input type="text" class="form-control" maxlength="14" placeholder="输入您的手机号码" v-model="info.phone">
            </div>
            <div class="input-group mb-3 mt-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">联&nbsp;&nbsp;系&nbsp;&nbsp;人</span>
                </div>
                <input type="text" class="form-control" maxlength="5" placeholder="输入联系人姓名" v-model="info.name">
            </div>
            <div class="d-flex justify-content-around border-top pt-2">
                <button type="button" class="btn btn-warning btn-sm" @click="togglePopup()">取消</button>
                <button type="button" class="btn btn-danger btn-sm" @click="editInfo(info)">修改</button>
            </div>
        </div>
    </van-overlay>
</div>
</template>

<script>
import Header from '../../components/Header';
import { Overlay } from 'vant';

export default {
    components:{
        Header:Header,
        [Overlay.name]:Overlay
    },
    data(){
        return{
            info:{
				'phone':1882667952,
				'name':'张三'
            },
            show:false
        }
    },
    methods:{
        togglePopup:function(){ //切换弹出框
            this.show=!this.show;
        },
        editInfo:function(info){ //修改信息
            var phonereg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if(!(phonereg.test(info.phone))){ 
                alert("手机号码有误，请重填");  
                return false; 
            }else{
                this.togglePopup();
            }
        }
    }
}
</script>

<style scoped>
.overLay{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>