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

const menuDetailKey = 'patient_wxdc_menuDetail';
const setMenuDetail = value => {
    return sessionStorage.setItem(menuDetailKey,JSON.stringify(value))
}
const getMenuDetail = () => {
    return JSON.parse(sessionStorage.getItem(menuDetailKey));
}

const choseInfoKey = 'patient_wxdc_choseInfo';
const setChoseInfo = value => {
    return sessionStorage.setItem(choseInfoKey,JSON.stringify(value))
}
const getChoseInfo = () => {
    return JSON.parse(sessionStorage.getItem(choseInfoKey));
}

const state = {
    refreshArea: getRefreshArea() || 'no', // 是否刷新食堂信息
    areaData: JSON.parse(getAreaData()) || "", // 选择的商家的信息
    refreshDate: getRefreshDate() || 'no', // 是否刷新日期餐别信息
    refreshMenu: getRefreshMenu() || 'no', // 是否刷新菜单信息
    menuDetail: getMenuDetail() || "", // 选择的菜品详情的信息
    choseInfo: getChoseInfo() || {} // 选择的床位、商家、餐别、购物车菜品
}

const mutations = {
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
    },
    SET_MENUDETAIL: (state,value) => {
        setMenuDetail(value);
        state.menuDetail = value;
    },
    SET_CHOSEINFO: (state,value) => {
        setChoseInfo(value);
        state.choseInfo = value;
    }
}

const actions = {
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