// 扫一扫控件

import wx from 'weixin-js-sdk';
export default {
    methods: {
        scanCode(){ //扫码
            //获取签名
            this.$http.post(sessionStorage.host+'/weixinDC/user/getQRCode',{
                url:URL
            },{emulateJSON:true}).then(function(res){
                wx.config({  //通过config接口注入权限验证配置
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId:res.body.data.appId, // 必填，公众号的唯一标识
                    timestamp:res.body.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.body.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.body.data.signature,// 必填，签名
                    jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
                });
            },function(e){
                alert("错误："+e.status);
            });
            // config信息验证失败会执行error函数
            wx.error(function(res){
                alert("出错了：" + res.errMsg);
            });
            // config信息验证后会执行ready方法
            wx.ready(function(){
                wx.scanQRCode({ //调起微信扫一扫接口
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        // alert("扫码结果："+res.resultStr);
                        bindingCode=res.resultStr;
                    }
                });
            });
        }
    }
}