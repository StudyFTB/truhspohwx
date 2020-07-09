import service from '@/utils/request';

/**
 * 查询食堂场所列表信息
 * @param {
 * openid
 * qrstr
 * } params 
 */
export const getAreaList = params => {
    return service.request({
        method: 'get',
        url: '/wxdc/selectCanteenInfoList',
        params
    })
}