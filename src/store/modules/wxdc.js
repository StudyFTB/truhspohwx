const qrstrKey = 'patient_wxdc_qrstr';
const setQrstr = value => {
    return sessionStorage.setItem(qrstrKey,value)
}
const getQrstr = () => {
    return sessionStorage.getItem(qrstrKey);
}

const refreshAreaKey = 'patient_wxdc_refreshArea';
const setRefreshArea = value => {
    return sessionStorage.setItem(refreshAreaKey,value)
}
const getRefreshArea = () => {
    return sessionStorage.getItem(refreshAreaKey);
}

const refreshDateKey = 'patient_wxdc_refreshDate';
const setRefreshDate = value => {
    return sessionStorage.setItem(refreshDateKey,value)
}
const getRefreshDate = () => {
    return sessionStorage.getItem(refreshDateKey);
}

const areaDataKey = 'patient_wxdc_areaData';
const setAreaData = value => {
    return sessionStorage.setItem(areaDataKey,value)
}
const getAreaData = () => {
    return sessionStorage.getItem(areaDataKey);
}

const refreshMenuKey = 'patient_wxdc_refreshMenu';
const setRefreshMenu = value => {
    return sessionStorage.setItem(refreshMenuKey,value)
}
const getRefreshMenu = () => {
    return sessionStorage.getItem(refreshMenuKey);
}

const state = {
    qrstr: getQrstr() || '', // 选中床位的床位号
    refreshArea: getRefreshArea() || 'no', // 是否刷新食堂信息
    areaData: JSON.parse(getAreaData()) || "", // 选择的商家的信息
    refreshDate: getRefreshDate() || 'no', // 是否刷新日期餐别信息
    refreshMenu: getRefreshMenu() || 'no' // 是否刷新菜单信息
}

const mutations = {
    SET_QRSTR: (state,value) => {
        state.qrstr = value;
    },
    SET_REFRESHAREA: (state,value) => {
        state.refreshArea = value;
    },
    SET_REFRESHDATE: (state,value) => {
        state.refreshDate = value;
    },
    SET_AREADATA: (state,value) => {
        state.areaData = value;
    },
    SET_REFRESHMENU: (state,value) => {
        state.refreshMenu = value;
    }
}

const actions = {
    // 设置选择床位的qrstr
    SetQrstr({commit},value){
        setQrstr(value);
        commit('SET_QRSTR',value);
    },
    // 设置refreshArea
    SetRefreshArea({commit},value){
        setRefreshArea(value);
        commit('SET_REFRESHAREA',value);
    },
    // 设置refreshDate
    SetRefreshDate({commit},value){
        setRefreshDate(value);
        commit('SET_REFRESHDATE',value);
    },
    // 设置areaData
    SetAreaData({commit},value){
        setAreaData(JSON.stringify(value));
        commit('SET_AREADATA',value)
    },
    // 设置refreshMenu
    SetRefreshMenu({commit},value){
        setRefreshMenu(value);
        commit('SET_REFRESHMENU',value);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}