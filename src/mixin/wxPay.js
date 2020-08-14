import { qryOrdPayState } from '@/api/pay';
export default {
    methods: {
        // 查询支付订单状态的接口
        httpQryOrdPayState(orderno){
            return new Promise((resolve,reject) => {
                qryOrdPayState({
                    orderno
                }).then(res => {
                    resolve(res);
                }).catch(e => {
                    reject(e);
                });
            });
        },
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
            let _this = this;
            function onBridgeReady(){
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', data,
                    function(res){
                        if(res.err_msg == "get_brand_wcpay_request:ok" ){ // 支付成功回调
                            // 使用以上方式判断前端返回,微信团队郑重提示：
                            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                            _this.httpQryOrdPayState(params.orderno).then(res => {
                                if(res.data.data.ordPayState === 1){
                                    successCallBack();
                                }else{
                                    failCallBack();
                                }
                            }).catch();
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