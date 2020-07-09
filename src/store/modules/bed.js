const bedListKey = 'patient_bedList';
const setBedList = value => {
    return sessionStorage.setItem(bedListKey,value)
}
const getBedList = () => {
    return sessionStorage.getItem(bedListKey);
}

const isRefreshBedListKey = 'patient_isRefreshBedList';
const setIsRefreshBedList = value => {
    return sessionStorage.setItem(isRefreshBedListKey,value)
}
const getIsRefreshBedList = () => {
    return sessionStorage.getItem(isRefreshBedListKey);
}

import { selectPsnQrBedList } from '@/api/bed';
import store from '../index';

const state = {
    isRefreshBedList: getIsRefreshBedList() || "no", // yes no 是否刷新床位信息
    bedList: JSON.parse(getBedList()) || [], // 床位列表
}

const mutations = {
    SET_IS_REFRESH_BEDLIST: (state,value) => {
        state.isRefreshBedList = value;
    },
    SET_BEDLIST: (state,value) => {
        state.bedList = value;
    }
}

const actions = {
    // 设置是否刷新床位信息
    SetReFresh({ commit },value){
        setIsRefreshBedList(value);
        commit('SET_IS_REFRESH_BEDLIST',value);
    },
    // 更新床位信息
    UpdateBedList({ commit },value){
        setBedList(JSON.stringify(value));
        commit('SET_BEDLIST',value);
    },
    // 获取床位信息列表的接口
    GetBedList({ commit }){
        return new Promise((resolve,reject) => {
            selectPsnQrBedList({
                openid: store.state.app.openid,
                qrstr: store.state.app.qrstr
            }).then(res => {
                resolve(res);
                setBedList(JSON.stringify(res.data.data));
                commit('SET_BEDLIST',res.data.data);

                setIsRefreshBedList('no');
                commit('SET_IS_REFRESH_BEDLIST','no');
            }).catch(e => {
                reject(e);
                setBedList(JSON.stringify([]));
                commit('SET_BEDLIST',[]);
            });
        });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}