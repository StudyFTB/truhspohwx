import service from '@/utils/request';

/**
 * 微信公众号用户授权登录
 * @param {
 * qrstr 床头二维码识别编号串
 * code 微信用户授权后获取的登录临时凭证code
 * } data 
 */
export const login = params => {
    return service.request({
        method: 'get',
        url: '/user/wxUserLogin',
        params
    });
}
/**
 * 微信用户绑定
 * @param {
 * openid
 * personname
 * phoneno
 * ispush
 * } params 
 */
export const addWxUser = data => {
    return service.request({
        method: 'post',
        url: '/user/addWxUser',
        data
    });
}
/**
 * 微信用户解除绑定
 * @param {
 * openid
 * } params 
 */
export const delWxUser = params => {
    return service.request({
        method: 'get',
        url: '/user/delWxUser',
        params
    });
}
/**
 * 查询绑定的微信用户信息
 * @param {
 * openid
 * } params 
 */
export const selectWxPsnInfo = params => {
    return service.request({
        method: 'get',
        url: '/user/selectWxPsnInfo',
        params
    });
}
/**
 * 微信用户绑定信息更新
 * @param {
 * openid
 * personname
 * phoneno
 * ispush
 * } data 
 */
export const uPdateWxUser = data => {
    return service.request({
        method: 'post',
        url: '/user/uPdateWxUser',
        data
    });
}