<template>
<div id="myInfo">
    <Header title="我的资料"></Header>
    <!-- 主要页面 -->
    <div class="container pt-2">
        <div class="card p-2 mt-3">
            <div>
                <span style="width:85px;text-align:right;display:inline-block;">手机号码：</span>{{info.phone}}
            </div>
            <div>
                <span style="width:85px;text-align:right;display:inline-block;">联系人：</span>{{info.name}}
            </div>
        </div>
        <div class="mt-3">
            <button type="button" class="btn btn-success btn-block" @click="togglePopup()">编辑个人资料</button>
        </div>
    </div>
    <!-- 遮罩层 -->
    <van-overlay :show="show" @click="show = false" class="overLay">
        <div class="bg-white rounded p-2 m-1" @click.stop="">
            <h4 class="text-center p-2 border-bottom">编辑资料</h4>
            <div class="input-group mb-3 mt-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" style="width:90px">手机号码</span>
                </div>
                <input type="text" class="form-control" maxlength="11" placeholder="输入您的手机号码" v-model="form.phone">
            </div>
            <div class="input-group mb-3 mt-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" style="width:90px">联&nbsp;&nbsp;系&nbsp;&nbsp;人</span>
                </div>
                <input type="text" class="form-control" maxlength="6" placeholder="输入联系人姓名" v-model="form.name">
            </div>
            <div class="d-flex justify-content-around border-top pt-2">
                <button type="button" class="btn btn-warning" @click="togglePopup()">取消</button>
                <button type="button" class="btn btn-danger" @click="editInfo()">修改</button>
            </div>
        </div>
    </van-overlay>
</div>
</template>

<script>
import Header from '../../components/Header';
import { Overlay } from 'vant';
import { selectWxPsnInfo, uPdateWxUser } from "@/api/user";
import { phone, special } from '@/utils/validate';
export default {
    name: 'MyInfo',
    components:{
        Header:Header,
        [Overlay.name]:Overlay
    },
    data(){
        return{
            info:{ // 用户信息
                name: "",
                phone: ""
            },
            form:{
                name: "",
                phone: ""
            },
            show:false
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
                this.info.name = res.data.data.personname,
                this.info.phone = res.data.data.phoneno
            }).catch();
        },
        // 修改用户信息的接口
        httpuPdateWxUser(){
            uPdateWxUser({
                openid: this.$store.state.app.openid,
                personname: this.form.name,
                phoneno: this.form.phone,
                ispush: -1
            }).then(res => {
                this.$_tip('修改个人资料成功');
                this.show = false;
                this.info = Object.assign({},this.form);
            }).catch();
        },
        togglePopup:function(){ //切换弹出框
            this.show=!this.show;
            if(this.show){
                this.form = Object.assign({},this.info);
            }else{
                this.form = {name: "",phone: ""};
            }
        },
        editInfo:function(){ //修改信息
            if(!phone(this.form.phone)){ 
                this.$_tip("手机号码格式错误",'fail');  
                return false; 
            }
            if(special(this.form.name)){ 
                this.$_tip("姓名不能含有特殊字符",'fail');  
                return false; 
            }
            if(!this.form.name){ 
                this.$_tip("姓名不能为空",'fail');  
                return false; 
            }
            this.httpuPdateWxUser();
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