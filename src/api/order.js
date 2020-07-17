import service from '@/utils/request';

/**
 * 查询未支付订单列表(下单超过10分钟未支付的默认无效不返回)
 * @param {
 * openid
 * } params 
 */
export const getUnPayOrderList = params => {
    return service.request({
        url: '/wxdc/selectUnPayOrderList',
        params
    })
}
/**
 * 查询待配送订单列表
 * @param {
 * openid
 * } params 
 */
export const getUnTakeOrderList = params => {
    return service.request({
        url: '/wxdc/selectUnTakeOrderList',
        params
    })
}
/**
 * 查询已完成订单列表
 * @param {
 * openid
 * } params 
 */
export const getFinishOrderList = params => {
    return service.request({
        url: '/wxdc/selectFinishOrderList',
        params
    })
}
/**
 * 查询订单详情
 * @param {
 * openid
 * orderno
 * } params 
 */
export const getOrderDetail = params => {
    return service.request({
        url: '/wxdc/selectOrderDetail',
        params
    })
}
/**
 * 查询已完成订单详情
 * @param {
 * openid
 * orderno
 * } params 
 */
export const getFinishOrderDetail = params => {
    return service.request({
        url: '/wxdc/selectFinishOrderDetail',
        params
    })
}