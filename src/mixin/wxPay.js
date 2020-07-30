export default {
    methods: {
        // 调用微信支付
        onWxPay(params,successCallBack,failCallBack){
            let data = {
                appId: params.appId,
                timeStamp: params.timeStamp,
                nonceStr: params.nonceStr,
                package: params.packageStr,
                signType: params.signType,
                paySign: params.paySign
            }
            function onBridgeReady(){
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', data,
                    function(res){
                        if(res.err_msg == "get_brand_wcpay_request:ok" ){ // 支付成功回调
                            // 使用以上方式判断前端返回,微信团队郑重提示：
                            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                            successCallBack();
                        }else{ // 支付失败回调
                            failCallBack();
                        }
                    }
                ); 
            }
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            }else{
                onBridgeReady();
            }
        }
    }
}