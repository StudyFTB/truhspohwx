import service from '@/utils/request';

/**
 * 查询扫码的床位信息
 * @param {
 * qrstr
 * } params 
 */
export const getBedInfo = params => {
    return service.request({
        method: 'get',
        url: '/bed/selectBed',
        params
    })
}
/**
 * 用户绑定床位信息
 * @param {
 * openid
 * qrstr
 * bedid
 * remark
 * } data 
 */
export const addPsnQrBed = data => {
    return service.request({
        method: 'post',
        url: '/bed/addPsnQrBed',
        data
    })
}
/**
 * 查询微信用户绑定的床位信息列表
 * @param {
 * openid
 * qrstr
 * } params 
*/
export const selectPsnQrBedList = params => {
    return service.request({
        method: 'get',
        url: '/bed/selectPsnQrBedList',
        params
    })
}
/**
 * 更新微信用户绑定的床位信息
 * @param {
 * openid
 * qrstr
 * remark
 * } data 
 */
export const uPdatePsnBed = data => {
    return service.request({
        method: 'post',
        url: '/bed/uPdatePsnBed',
        data
    })
}
/**
 * 删除绑定的床位信息
 * @param {
 * openid
 * qrstr
 * } data 
 */
export const delPsnBed = data => {
    return service.request({
        method: 'post',
        url: '/bed/delPsnBed',
        data
    })
}