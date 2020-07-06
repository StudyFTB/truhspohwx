import service from '@/utils/request';

/**
 * 微信公众号用户授权登录
 * @param {
 * qrstr 床头二维码识别编号串
 * code 微信用户授权后获取的登录临时凭证code
 * } data 
 */
export const login = data => {
    return service.request({
        method: 'post',
        url: '/user/wxUserLogin',
        data
    });
}