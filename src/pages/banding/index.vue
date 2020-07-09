<template>
<div class="container-wrap">
    <header>
        请输入您的信息进行绑定：
    </header>
    <van-form @submit="onSubmit">
        <van-field name="name" v-model="myform.name" label="姓名" placeholder="请输入姓名" required
            maxlength="6" size="large" label-width="55px"
            :rules="rules.name" />
        <van-field name="phone" v-model="myform.phone" label="手机号" placeholder="请输入手机号" 
            required :formatter="formatter" maxlength="11" size="large" label-width="55px"
            :rules="rules.phone" />
        <div style="margin: 20px;">
            <van-button round block type="info" native-type="submit">
                确定绑定
            </van-button>
        </div>
    </van-form>
</div>
</template>

<script>
import { Field,Form,Button  } from 'vant';
import { phone, special } from '@/utils/validate';
import { addWxUser } from '@/api/user';
export default {
    name: "Banding",
    components:{
        [Field.name]:Field,
        [Form.name]:Form,
        [Button.name]:Button
    },
    data(){
        const checkName = (value, rule) => {
            return !special(value);
        }
        const checkPhone = (value, rule) => {
            return phone(value);
        }
        return {
            myform:{
                name:"",
                phone:""
            },
            rules:{
                name:[
                    { required:true, message: '姓名不能为空' },
                    { validator:checkName, message: '姓名不能含有特殊字符' }
                ],
                phone:[
                    { required:true, message: '手机号不能为空' },
                    { validator:checkPhone, message: '手机号码格式错误' }
                ]
            }
        }
    },
    methods: {
        formatter(value) {
            // 过滤输入的数字
            return value.replace(/[^\d]/g, '');
        },
        // 绑定用户的接口
        httpAddWxUser(personname,phoneno){
            addWxUser({
                openid: this.$store.state.app.openid,
                personname,
                phoneno,
                ispush: 1
            }).then(res => {
                this.$_tip("微信绑定成功");
                this.myform = {
                    name:"",
                    phone:""
                }
                if(this.$store.state.app.qrstr === 'TRUHWXGZH')
                    this.$router.replace('/bedinfo');
                else
                    this.$router.replace('/bedconfirm');
            }).catch();
        },
        // 提交表单
        onSubmit({ name, phone }){
            this.httpAddWxUser(name,phone);
        }
    },
}
</script>

<style lang="scss" scoped>
.container-wrap{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f9f9f9;
    header{
        margin: 30px 0 6px 0;
        color: $secondary-color;
    }
}
</style>