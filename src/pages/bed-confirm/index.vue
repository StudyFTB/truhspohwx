<template>
<div class="all-wrap">
    <div>
        <div>床位编号：{{bedInfo.bedno}}</div>
        <div>床位类型：{{bedInfo.bedtype}}</div>
        <div>床位名称：{{bedInfo.qrBedName}}</div>
        <div>医院名称：{{bedInfo.hspname}}</div>
        <van-button type="primary" block style="margin:30px 0" @click="onBanding">
            确定绑定床位
        </van-button>
    </div>
</div>
</template>

<script>
import { getBedInfo, addPsnQrBed } from '@/api/bed';
import { Button } from 'vant';
export default {
    name: 'BedConfirm',
    components:{
        [Button.name]:Button
    },
    data(){
        return {
            bedInfo:""
        }
    },
    activated(){
        this.httpGetBedInfo();
    },
    methods: {
        // 获取扫码的床位信息的接口
        httpGetBedInfo(){
            getBedInfo({
                qrstr: this.$store.state.app.qrstr
            }).then(res => {
                this.bedInfo = res.data.data;
            }).catch();
        },
        httpAddPsnQrBed(){
            addPsnQrBed({
                openid: this.$store.state.app.openid,
                qrstr: this.$store.state.app.qrstr,
                bedid: this.bedInfo.bedid,
                remark:""
            }).then(res => {
                this.$_tip("绑定床位成功");
                this.$router.replace("/bedinfo");
                this.$store.dispatch('bed/SetReFresh','yes');
            }).catch(e => {
                if(e.code == '1010'){
                    this.$router.replace("/bedinfo");
                    this.$store.dispatch('bed/SetReFresh','yes');
                    this.$store.dispatch('bed/SetReFresh','yes');
                }
            });
        },
        // 点击确定绑定触发
        onBanding(){
            this.httpAddPsnQrBed();
        }
    }
}
</script>

<style lang="scss" scoped>
.all-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    &>div{
        width: 80%;
        &>div{
            margin: 10px 0;
        }
    }
}
</style>