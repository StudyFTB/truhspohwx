import service from '@/utils/request';

/**
 * 用户提交订餐订单并发起支付
 * @param {
 * openid
 * qrstr
 * date
 * ctid
 * repastid
 * taketype
 * contsphone
 * contsname
 * reqMenus[
 *  {menuid,quantity}
 * ]
 * } data 
 */
export const addPayOrder = data => {
    return service.request({
        method: 'post',
        url: '/dcpay/addPayOrder',
        data
    })
}
/**
 * 用户提交已存在订餐订单发起支付
 * @param {
 * openid
 * qrstr
 * orderno
 * } data 
 */
export const addPayIsOrder = data => {
    return service.request({
        method: 'post',
        url: '/dcpay/addPayIsOrder',
        data
    })
}