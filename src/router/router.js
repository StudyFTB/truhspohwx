import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export default new VueRouter({
	mode:'hash',
	routes:[
		{
			path:'/',
			redirect:{name:"BedInfo"}
		},
		{
			path:'/bedinfo',
			name:'BedInfo',
			component: resolve => require(['../pages/bed-info'],resolve),
			meta:{title:'床位信息'}
		},
		{
			path:'/type',
			name:'Type',
			component: resolve => require(['../pages/type/type.vue'],resolve),
			meta:{title:'用餐类型'}
		},
		{
			path:'/area',
			name:'Area',
			component: resolve => require(['../pages/area/area.vue'],resolve),
			meta:{title:'选择商家'}
		},
		{
			path:'/date',
			name:'Date',
			component: resolve => require(['../pages/date/date.vue'],resolve),
			meta:{title:'日期餐别'}
		},
		{
			path:'/menu',
			name:'Menu',
			component: resolve => require(['../pages/menu/menu.vue'],resolve),
			meta:{title:'菜单'}
		},
		{
			path:'/foodDetail',
			name:'FoodDetail',
			component: resolve => require(['../pages/foodDetail/foodDetail.vue'],resolve),
			meta:{title:'菜品详情'}
		},
		{
			path:'/pay',
			name:'Pay',
			component: resolve => require(['../pages/pay/pay.vue'],resolve),
			meta:{title:'结算支付'}
		},
		{
			path:'/order',
			name:'Order',
			component: resolve => require(['../pages/order/order.vue'],resolve),
			meta:{title:'订单'}
		},
		{
			path:'/orderDetail',
			name:'OrderDetail',
			component: resolve => require(['../pages/orderDetail/orderDetail.vue'],resolve),
			meta:{title:'订单详情'}
		},
		{
			path:'/mine',
			name:'Mine',
			component: resolve => require(['../pages/mine/mine.vue'],resolve),
			meta:{title:'我的'}
		},
		{
			path:'/myInfo',
			name:'MyInfo',
			component: resolve => require(['../pages/myInfo/myInfo.vue'],resolve),
			meta:{title:'我的资料'}
		},
		{
			path:'/editBed/:before',
			name:'EditBed',
			component: resolve => require(['../pages/editBed/editBed.vue'],resolve),
			meta:{title:'编辑床位'}
		}
	]
})