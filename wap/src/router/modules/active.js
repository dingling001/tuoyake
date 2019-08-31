const home = resolve => require(['../../pages/active/home.vue'], resolve);//教育活动首页
const activeDetail = resolve => require(['../../pages/active/activeDetail.vue'], resolve);//教育活动详情
const addVisitor = resolve => require(['../../pages/active/addVisitor.vue'], resolve);//添加参观者
const newAdd = resolve => require(['../../pages/active/newAdd.vue'], resolve);//新增
const confirmInfo = resolve => require(['../../pages/active/confirmInfo.vue'], resolve);//确认信息
const appResult = resolve => require(['../../pages/active/appResult.vue'], resolve);//报名结果
const orderRecord = resolve => require(['../../pages/active/orderRecord.vue'], resolve);//订单记录
const appOrderDetail = resolve => require(['../../pages/active/appOrderDetail.vue'], resolve);//订单详情
export default [{
		path: '/active',
		name:"active",
		redirect: '/active/activeList',
	},
	{
		path: '/active/activeList',
		name:"activeHome",
		component: home,
		meta:{
			title:'教育活动',
			footer:false
		}
	},
	{
		path: '/active/activedetail',
		name:"activeDetail",
		component: activeDetail,
		meta:{
			title:'教育活动',
			footer:false
		}
	},
	{
		path: '/active/addVisitor',
		name:"addVisitor",
		component: addVisitor,
		meta:{
			title:'教育活动',
			footer:false
		}
	},
	{
		path: '/active/newadd',
		name:"newAdd",
		component: newAdd,
		meta:{
			title:'教育活动',
			footer:false
		}
	},
	{
		path: '/active/confirminfo',
		name:"confirmInfo",
		component: confirmInfo,
		meta:{
			title:'教育活动',
			footer:false
		}
	},
	{
		path: '/active/appresult',
		name:"appResult",
		component: appResult,
		meta:{
			title:'教育活动',
			footer:false
		}
	},
	{
		path: '/active/orderrecord',
		name:"orderRecord",
		component: orderRecord,
		meta:{
			title:'教育活动',
			footer:false,
			keepAlive:true
		}
	},
	{
		path: '/active/apporderdetail',
		name:"appOrderDetail",
		component: appOrderDetail,
		meta:{
			title:'教育活动',
			footer:false
		}
	}
]