const isFirstKey = "isFirst";

const state = {
    isFirst: sessionStorage.getItem(isFirstKey) || "zero" // 是否为第一次登录
}

const mutations = {
    SET_IS_FIRST: (state,value) => {
        state.isFirst = value;
    }
}

const actions = {
    setIsFirst: ({ commit }) => {
        sessionStorage.setItem(isFirstKey,"one");
        commit("SET_IS_FIRST","one");
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}