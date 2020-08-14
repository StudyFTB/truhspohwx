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
/**
 * 单笔支付交易订单查询
 * @param {
 * orderno
 * } data 
 */
export const qryOrdPayState = params => {
    return service.request({
        method: 'get',
        url: '/dcpay/qryOrdPayState',
        params
    })
}