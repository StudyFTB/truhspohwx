import Vue from "vue";
import Vuex from "vuex";
import app from './modules/app';
import bed from './modules/bed';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,bed
  }
});