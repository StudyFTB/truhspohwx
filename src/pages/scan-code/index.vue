<template>
<div class="all-wrap" v-show="isShow">
    <div v-if="isError == true">
        <van-icon name="close" size="60" color="#dc3545" />
        <div>获取用户信息失败<br/>请稍后重新进入</div>
    </div>
    <div v-else-if="isgz == false">
        <van-icon name="warning-o" size="60" color="#ffc107" />
        <div>还未关注公众号<br/>将跳转到关注公众号页面</div>
    </div>
    <div v-else-if="isbd == false">
        <van-icon name="warning-o" size="60" color="#ffc107" />
        <div>还未绑定用户信息<br/>将跳转绑定用户信息页面</div>
    </div>
    <div v-else>
        <van-icon name="passed" size="60" color="#28a745" />
        <div>即将进入订餐</div>
    </div>
</div>
</template>

<script>
import { Icon } from 'vant';
export default {
    name: "ScanCode",
    components: {
        [Icon.name]:Icon
    },
    data() {
        return {
            isShow:false, // 是否显示页面
            isError: false,
            isbd:false,
            isgz:false
        }
    },
    created(){
        let { wxCode, wxState } = this.getUrlParams();
		this.$store.dispatch("app/Login",{
			qrstr: wxState,
			code: wxCode
		}).then(res => {
            this.isgz = res.data.data.isgz;
            this.isbd = res.data.data.isbd;
            // 接口请求完成才显示页面
            this.isShow = true;
            if(!this.isgz){
                location.replace("https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU5Nzk3MDU0Mw==&scene=124#wechat_redirect");
            }else if(!this.isbd){
                // 未绑定用户信息，跳转到绑定用户信息页面
                this.$router.replace({name:"Banding"});
            }else{
                if(wxState == 'TRUHWXGZH'){
                    // 由公众号进入，直接进入床位信息页面
                    this.$router.replace({name:"BedInfo"});
                }else {
                    // 由二维码进入，直接进入床位绑定确认页面
                    this.$router.replace({name:"BedConfirm"});
                }
            }
		}).catch(e => {
            this.isError = true;
        });
	},
	methods: {
		// 获取url的参数code和state
		getUrlParams(){
			let reg = /\?code=(.*)\&state=(.*)/g;
			let execRes = reg.exec(location.search);
			let wxCode = execRes[1];
			let wxState = execRes[2];
			return { wxCode, wxState };
		}
	}
}
</script>

<style lang="scss" scoped>
.all-wrap{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;
    &>div{
        text-align: center;
        font-size: 1.5rem;
        font-weight: bolder;
    }
}
</style>