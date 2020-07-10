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

/**
 * 查询订餐餐别列表信息
 * @param {
 * openid
 * qrstr
 * ctid
 * advday
 * dates
 * } data 
 */
export const getRepastAllDates = data => {
    return service.request({
        method: 'post',
        url: '/wxdc/selectRepastAllDates',
        data
    })
}