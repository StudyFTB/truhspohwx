import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// 避免 router.push 相同路由的错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new VueRouter({
	mode:'history',
	base: process.env.NODE_ENV === 'production' ? '/HspoPatientApp/' : '',
	routes:[
		{
			path:'/',
			redirect:{name:"ScanCode"}
		},
		// 登录绑定模块
		{
			path:'/scancode',
			name:'ScanCode',
			component: resolve => require(['../pages/scan-code'],resolve),
			meta:{title:'跳转中'}
		},
		{
			path:'/banding',
			name:'Banding',
			component: resolve => require(['../pages/banding'],resolve),
			meta:{title:'绑定信息'}
		},
		// 床位模块
		{
			path:'/bedinfo',
			name:'BedInfo',
			component: resolve => require(['../pages/bed-info'],resolve),
			meta:{title:'床位信息'}
		},
		{
			path:'/bedconfirm',
			name:'BedConfirm',
			component: resolve => require(['../pages/bed-confirm'],resolve),
			meta:{title:'床位绑定确认'}
		},
		// 订餐模块
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
		// 订单模块
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
		// 我的信息模块
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
			path:'/editBed',
			name:'EditBed',
			component: resolve => require(['../pages/editBed/editBed.vue'],resolve),
			meta:{title:'编辑床位'}
		}
	]
})