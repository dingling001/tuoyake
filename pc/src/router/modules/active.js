const index = resolve => require(['../../pages/active/index.vue'], resolve);//教育活动首页
const activeList = resolve => require(['../../pages/active/activeList.vue'], resolve);//活动列表
const activeDetail = resolve => require(['../../pages/active/activeDetail.vue'], resolve);//活动详情
const fillInfo = resolve => require(['../../pages/active/fillInfo.vue'], resolve);//填写信息
const confirmOrder = resolve => require(['../../pages/active/confirmOrder.vue'], resolve);//订单信息
const orderDetail = resolve => require(['../../pages/active/orderDetail.vue'], resolve);//订单详情
const applyResult = resolve => require(['../../pages/active/applyResult.vue'], resolve);//预约结果
const fullResult = resolve => require(['../../pages/active/fullResult.vue'], resolve);//预约结果-报名已满
export default [{
		path: '/active',
		redirect: '/active/index',
	},
	{
		path: '/active/index',
		component: index,
		meta: {
			cur: 5,
			building:true
	    },
	},
	{
		path: '/active/activelist',
		component: activeList,
		meta: {
	      cur: 5
	    },
	},
	{
		path:'/active/activedetail',
		component:activeDetail,
		meta: {
	      cur: 5
	    },
	},
	{
		path:'/active/fillinfo',
		component:fillInfo,
		meta: {
	      cur: 5
	    },
	},
	{
		path:'/active/confirmorder',
		component:confirmOrder,
		meta: {
	      cur: 5
	    },
	},
	{
		path:'/active/orderdetail',
		component:orderDetail,
	},
	{
		path:'/active/applyresult',
		component:applyResult,
		meta: {
	      cur: 5
	    },
	},
	{
		path:'/active/fullresult',
		component:fullResult,
		meta: {
	      cur: 5
	    },
	}
]