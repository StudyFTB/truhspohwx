import { setOpenid, getOpenid, setIsFirst, getIsFirst, setQrstr, getQrstr } from '@/utils/app';
import { login } from '@/api/user';

const state = {
    isFirst: getIsFirst() || "zero", // 是否为第一次登录
    openid: getOpenid() || "", // openid
    qrstr: getQrstr() || "", // 床位信息
}

const mutations = {
    SET_IS_FIRST: (state,value) => {
        state.isFirst = value;
    },
    SET_OPENID: (state,value) => {
        state.openid = value;
    },
    SET_QRSTR: (state,value) => {
        state.qrstr = value;
    }
}

const actions = {
    setIsFirst: ({ commit }) => {
        setIsFirst("one");
        commit("SET_IS_FIRST","one");
    },
    // 登录接口
    Login: ({ commit }, params) => {
        return new Promise((resolve,reject) => {
            login(params).then(res => {
                setOpenid(res.data.data.openid);
                commit("SET_OPENID",res.data.data.openid);
                setQrstr(params.qrstr);
                commit("SET_QRSTR",params.qrstr);
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