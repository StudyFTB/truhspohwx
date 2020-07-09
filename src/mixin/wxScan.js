// 扫一扫控件

import wx from 'weixin-js-sdk';
import { getSignature } from '@/api/jssdk';
export default {
    methods: {
        // 点击添加床位按钮触发
        async onScan(){
            let jssdkConfig = await this.httpGetSignature();
            await this.setWxConfig(jssdkConfig);
        },
        // 获取微信jssdk签名的接口
        httpGetSignature(){
            return new Promise((resolve,reject) => {
                getSignature({
                    url: location.href.split('#')[0]
                }).then(res => {
                    resolve(res.data.data);
                }).catch();
            })
        },
        // 设置微信配置
        setWxConfig(jssdkConfig){
            wx.config({  //通过config接口注入权限验证配置
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: jssdkConfig.appId, // 必填，公众号的唯一标识
                timestamp: jssdkConfig.timestamp, // 必填，生成签名的时间戳
                nonceStr:  jssdkConfig.nonceStr, // 必填，生成签名的随机串
                signature:  jssdkConfig.signature,// 必填，签名
                jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
            });
            // config信息验证失败会执行error函数
            wx.error(function(res){
                this.$_tip('调用微信控件失败');
                console.log(res.errMsg);
            });
            // config信息验证后会执行ready方法
            let _this = this
            wx.ready(function(){
                _this.callWxScan();
            });
        },
        // 调用扫一扫控件
        callWxScan(){
            let _this = this
            wx.scanQRCode({ //调起微信扫一扫接口
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    // 重新设置qrstr
                    let reg = /\&state=(.*)\#wechat_redirect/g;
                    let qrstr = reg.exec(res.resultStr)[1];
                    _this.$store.dispatch('app/SetQrstr',qrstr);
                    _this.$router.push('/bedconfirm');
                }
            });
        }
    }
}