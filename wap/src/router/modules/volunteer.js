const home = resolve => require(["../../pages/volunteer/home.vue"], resolve); //志愿者首页
const volActiveDetail = resolve =>
	require(["../../pages/volunteer/volActiveDetail.vue"], resolve); //志愿者活动详情
const volcenter = resolve =>
	require(["../../pages/volunteer/volcenter.vue"], resolve); //志愿者中心
const volOrderDetail = resolve =>
	require(["../../pages/volunteer/volOrderDetail.vue"], resolve); //志愿者订单详情
const volRegister = resolve =>
	require(["../../pages/volunteer/volRegister.vue"], resolve); //志愿者注册
const volBaseInfo = resolve =>
	require(["../../pages/volunteer/volBaseInfo.vue"], resolve); //志愿者注册个人基本信息
const contactWay = resolve =>
	require(["../../pages/volunteer/contactWay.vue"], resolve); //志愿者注册联系方式
const speciality = resolve =>
	require(["../../pages/volunteer/speciality.vue"], resolve); //志愿者注册我的特长技能
const experience = resolve =>
	require(["../../pages/volunteer/experience.vue"], resolve); //志愿者注册我的经历
const serveDateType = resolve =>
	require(["../../pages/volunteer/serveDateType.vue"], resolve); //志愿者注册服务时间类别
const serveFrame = resolve =>
	require(["../../pages/volunteer/serveFrame.vue"], resolve); //志愿者注册服务时间时段
const serveJob = resolve =>
	require(["../../pages/volunteer/serveJob.vue"], resolve); //志愿者注册服务岗位
const historyServe = resolve =>
	require(["../../pages/volunteer/historyServe.vue"], resolve); //志愿者注册历史服务
const volResult = resolve =>
	require(["../../pages/volunteer/volResult.vue"], resolve); //志愿者注册成功之后的页面
const volSign = resolve =>
	require(["../../pages/volunteer/volSign.vue"], resolve); //志愿者活动签到
const volNotPass = resolve =>
	require(["../../pages/volunteer/volNotPass.vue"], resolve); //志愿者审核未通过
const wxRecruitStop = resolve =>
	require(["../../pages/volunteer/wxRecruitStop.vue"], resolve); //志愿者招募未开启
const wxvolLoading = resolve =>
	require(["../../pages/volunteer/wxvolLoading.vue"], resolve); //志愿者loading页
const explainDetail = resolve =>
	require(["../../pages/volunteer/explainDetail.vue"], resolve); //讲解记录详情
export default [{
		path: "/volunteer",
		name: "volunteer",
		redirect: "/volunteer/volrecruitlist"
	},
	{
		path: "/volunteer/volrecruitlist",
		name: "volunteerHome",
		component: home,
		meta: {
			title: "活动招募",
			footer: false
		}
	},
	{
		path: "/volunteer/voldetail",
		name: "volActiveDetail",
		component: volActiveDetail,
		meta: {
			title: "招募详情",
			footer: false
		}
	},
	{
		path: "/uvol",
		name: "volcenter",
		component: volcenter,
		meta: {
			title: "志愿者",
			footer: false
		}
	},
	{
		path: "/volunteer/volorderdetail",
		name: "volOrderDetail",
		component: volOrderDetail,
		meta: {
			title: "志愿者",
			footer: false
		}
	},
	{
		path: "/volunteer/home",
		name: "volRegister",
		component: volRegister,
		meta: {
			title: "志愿者注册",
			footer: false
		}
	},
	{
		path: "/volunteer/volbaseinfo",
		name: "volBaseInfo",
		component: volBaseInfo,
		meta: {
			title: "个人基本信息",
			footer: false
		}
	},
	{
		path: "/volunteer/contactway",
		name: "contactWay",
		component: contactWay,
		meta: {
			title: "联系方式",
			footer: false
		}
	},
	{
		path: "/volunteer/speciality",
		name: "speciality",
		component: speciality,
		meta: {
			title: "专长技能",
			footer: false
		}
	},
	{
		path: "/volunteer/experience",
		name: "experience",
		component: experience,
		meta: {
			title: "学习及工作经历",
			footer: false
		}
	},
	{
		path: "/volunteer/servedatetype",
		name: "serveDateType",
		component: serveDateType,
		meta: {
			title: "服务时间",
			footer: false
		}
	},
	{
		path: "/volunteer/serveframe",
		name: "serveFrame",
		component: serveFrame,
		meta: {
			title: "服务时间",
			footer: false
		}
	},
	{
		path: "/volunteer/servejob",
		name: "serveJob",
		component: serveJob,
		meta: {
			title: "服务岗位",
			footer: false
		}
	},
	{
		path: "/volunteer/historyserve",
		name: "historyServe",
		component: historyServe,
		meta: {
			title: "历史服务信息",
			footer: false
		}
	},
	{
		path: "/volunteer/volresult",
		name: "volResult",
		component: volResult,
		meta: {
			title: "审核中",
			footer: false
		}
	},
	{
		path: "/volunteer/volnotpass",
		name: "volNotPass",
		component: volNotPass,
		meta: {
			footer: false
		}
	},
	{
		path: "/volunteer/wxrecruitstop",
		name: "wxRecruitStop",
		component: wxRecruitStop,
		meta: {
			footer: false,
			title: "招募已截止"
		}
	},
	{
		path: "/volunteer/wxvolloading",
		name: "wxvolLoading",
		component: wxvolLoading,
		meta: {
			footer: false
		}
	},
	{
		path: "/sign",
		name: "volSign",
		component: volSign,
		meta: {
			nav: false,
			title: "志愿者签到",
			footer: false
		}
	},
	{
		path: "/volunteer/explaindetail",
		name: "explainDetail",
		component: explainDetail,
		meta: {
			nav: true,
			title: "讲解详情",
			footer: false
		}
	}
];