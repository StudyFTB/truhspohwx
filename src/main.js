import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js';
// 导航守卫
import "@/router/navGuard";
// vuex
import store from '@/store';

//全局实例方法
import global from "@/utils/global";
Vue.use(global);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
