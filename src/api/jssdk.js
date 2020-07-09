import service from '@/utils/request';

/**
 * 获取微信js-sdk验签签名
 * @param {
 * url
 * } params 
 */
export const getSignature  = params => {
    return service.request({
        method: 'get',
        url: '/truhspowx/getWXJsSignature',
        params
    })
}