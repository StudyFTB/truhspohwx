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
/**
 * 查询订餐菜类列表信息
 * @param {
 * ctid
 * repastid
 * date
 * } params 
 */
export const gettMenuTypeList = params => {
    return service.request({
        method: 'get',
        url: '/wxdc/selectMenuTypeList',
        params
    })
}
/**
 * 查询订餐菜谱列表信息
 * @param {
 * ctid
 * repastid
 * typeid
 * date
 * } params 
 */
export const getMenuOnlineList = params => {
    return service.request({
        method: 'get',
        url: '/wxdc/selectMenuOnlineList',
        params
    })
}