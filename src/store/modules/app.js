import { setOpenid, getOpenid, setIsFirst, getIsFirst } from '@/utils/app';
import { login } from '@/api/user';

const state = {
    isFirst: getIsFirst() || "zero", // 是否为第一次登录
    openid: getOpenid() || "" // openid
}

const mutations = {
    SET_IS_FIRST: (state,value) => {
        state.isFirst = value;
    },
    SET_OPENID: (state,value) => {
        state.openid = value;
    }
}

const actions = {
    setIsFirst: ({ commit }) => {
        setIsFirst("one");
        commit("SET_IS_FIRST","one");
    },
    Login: ({ commit }, params) => {
        return new Promise((resolve,reject) => {
            login(params).then(res => {
                setOpenid(res.data.data.openid);
                commit("SET_OPENID",res.data.data.openid);
                resolve(res);
            }).catch(e => {
                reject(e);
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