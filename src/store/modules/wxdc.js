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

const state = {
    qrstr: getQrstr() || '', // 选中床位的床位号
    refreshArea: getRefreshArea() || 'no' // 是否刷新食堂信息
}

const mutations = {
    SET_QRSTR: (state,value) => {
        state.qrstr = value;
    },
    SET_REFRESHAREA: (state,value) => {
        state.refreshArea = value;
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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}