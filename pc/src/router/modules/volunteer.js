const volhome = resolve => require(['../../pages/volunteer/home.vue'], resolve);//注册志愿者
const volRecruitList = resolve => require(['../../pages/volunteer/volRecruitList.vue'], resolve);//志愿者招募列表
const volRecruitDetail = resolve => require(['../../pages/volunteer/volRecruitDetail.vue'], resolve);//志愿者招募详情
const volOrderDetail = resolve => require(['../../pages/volunteer/volOrderDetail.vue'], resolve);//志愿者报名记录详情
const applicationResult = resolve => require(['../../pages/volunteer/applicationResult.vue'], resolve);//志愿者申请状态
const pcRecruitStop = resolve => require(['../../pages/volunteer/pcRecruitStop.vue'], resolve);//志愿者注册关闭
const pcvolLoading = resolve => require(['../../pages/volunteer/pcvolLoading.vue'], resolve);//志愿者loading
export default [{
		path: '/volunteer',
		redirect: '/volunteer/home',
	},
	{
		path: '/volunteer/home',
		component: volhome,
	},
	{
		path: '/volunteer/volrecruitlist',
		component: volRecruitList,
	},
	{
		path: '/volunteer/volrecruitdetail',
		component: volRecruitDetail,
	},
	{
		path: '/volunteer/volorderdetail',
		component: volOrderDetail,
	},
	{
		path: '/volunteer/applicationresult',
		component: applicationResult,
	},
	{
		path: '/volunteer/pcrecruitstop',
		component: pcRecruitStop,
	},
	{
		path: '/volunteer/pcvolloading',
		component: pcvolLoading,
	}
]