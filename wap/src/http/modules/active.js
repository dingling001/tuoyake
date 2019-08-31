import axios from "../api"; // 导入 api
/**
 * 教育活动首页列表
 */
const activeList = () =>
	axios(
		STATIC_ACTIVE_URL + "/api/web_active_list", {
			p: PLAT,
			api_token: localStorage.app_token
		},
		"GET",
		true
	);
/**
 * 活动预约分类
 */
const activeType = () =>
	axios(
		STATIC_ACTIVE_URL + "/api/active_cate_list", {
			p: PLAT
		},
		"GET",
		true
	);
/**
 * 活动预约列表
 */
const activeApplyList = (cate_id = "", cost = "", page = "") =>
	axios(
		STATIC_ACTIVE_URL + "/api/active_list", {
			p: PLAT,
			api_token: localStorage.app_token,
			cate_id,
			cost,
			page,
			limit: 8
		},
		"GET",
		true
	);

/**
 * 活动详情
 */
const activeDetail = (active_id = "") =>
	axios(
		STATIC_ACTIVE_URL + "/api/active_detail", {
			p: PLAT,
			api_token: localStorage.app_token,
			active_id
		},
		"GET",
		true
	);

/**
 * 获取场次时间表
 */

const timeList = (active_id = "") =>
	axios(
		STATIC_ACTIVE_URL + "/api/time_list", {
			p: PLAT,
			api_token: localStorage.app_token,
			active_id
		},
		"GET",
		true
	);

/**
 * 发送短信验证码
 */
const sendSms = (phone = "", code = "") =>
	axios(
		STATIC_PW_URL + "/api/send_sms", {
			p: PLAT,
			phone,
			device_uuid: localStorage.device_uuid,
			code
		},
		"POST",
		true
	);

/**
 * 图片验证码验证
 */
const checkSms = (code = "") =>
	axios(
		STATIC_PW_URL + "/api/cpt/check", {
			p: PLAT,
			device_uuid: localStorage.device_uuid,
			code
		},
		"GET",
		true
	);
/**
 * 订单记录
 */
const orderRecord = (order_status = "", page = "") =>
	axios(
		STATIC_ACTIVE_URL + "/api/order_log", {
			p: PLAT,
			api_token: localStorage.app_token,
			order_status,
			page,
			limit: 5
		},
		"GET",
		true
	);
/**
 * 我的订单详情
 */
const recordDeatil = (torder_id = "") =>
	axios(
		STATIC_ACTIVE_URL + "/api/confirm_active_order", {
			p: PLAT,
			api_token: localStorage.app_token,
			torder_id
		},
		"GET",
		true
	);

/**
 * 预约活动
 */
const applyActive = () =>
	axios(
		STATIC_ACTIVE_URL + "/api/active_order", {
			p: PLAT,
			api_token: localStorage.app_token,
			active_id: localStorage.active_id,
			active_time_id: localStorage.active_time_id,
			contact_phone: localStorage.contact_phone,
			toi_username: JSON.parse(localStorage.visitorNameList),
			toi_cardtype_id: JSON.parse(localStorage.visitorIdTypeList),
			toi_card_num: JSON.parse(localStorage.visitorIdNumberList),
			children_username: localStorage.children_username ?
				JSON.parse(localStorage.children_username) :
				[],
			children_cardtype_id: localStorage.children_cardtype_id ?
				JSON.parse(localStorage.children_cardtype_id) :
				[],
			children_card_num: localStorage.children_card_num ?
				JSON.parse(localStorage.children_card_num) :
				[]
		},
		"POST",
		true
	);
/**
 * 添加编辑常用联系人
 */
const contacts = (
		top_id = "",
		name = "",
		is_children = "",
		card_type_id = "",
		card_num = ""
	) =>
	axios(
		STATIC_ACTIVE_URL + "/api/top_contacts", {
			p: PLAT,
			api_token: localStorage.app_token,
			top_id,
			name,
			is_children,
			card_type_id,
			card_num
		},
		"POST",
		true
	);

/**
 * 常用联系人列表
 */
const contactsList = () =>
	axios(
		STATIC_ACTIVE_URL + "/api/top_contacts_list", {
			p: PLAT,
			api_token: localStorage.app_token
		},
		"GET",
		true
	);

/**
 * 取消活动预约
 */
const cancelOrder = (torder_id = "") =>
	axios(
		STATIC_ACTIVE_URL + "/api/cancel_active_order", {
			p: PLAT,
			api_token: localStorage.app_token,
			torder_id
		},
		"GET",
		true
	);

/**
 * 退票
 */
const refundTickets = (torder_id = "") =>
	axios(
		STATIC_ACTIVE_URL + "/api/active/refund", {
			p: PLAT,
			api_token: localStorage.app_token,
			torder_id
		},
		"POST",
		true
	);

/**
 * 订单支付
 */
const payOrder = (torder_id = "",payment_id = "") =>
	axios(
		STATIC_ACTIVE_URL + "/api/active/pay", {
			p: PLAT,
			api_token: localStorage.app_token,
			torder_id,
			payment_id,
			mini_id: ""
		},
		"POST",
		true
	);

/**
 * 删除常用联系人
 */
const delVisitor = (top_id = "") =>
	axios(
		STATIC_ACTIVE_URL + "/api/top_contacts_del", {
			p: PLAT,
			api_token: localStorage.app_token,
			top_id
		},
		"GET",
		true
	);
/**
 * 常用联系人人数判断
 */
const judgeNum = () =>
	axios(
		STATIC_ACTIVE_URL + "/api/top_contacts_count", {
			p: PLAT,
			api_token: localStorage.app_token,
		},
		"GET",
		true
	);

/**
 * 获取登录手机号码
 */
const getPhone = () =>
	axios(
		STATIC_ACTIVE_URL + "/api/get_phone", {
			p: PLAT,
			api_token: localStorage.app_token,
		},
		"GET",
		true
	);

/**
 * 选择时间文案提示
 */
const wxTimeMsg = (active_id = '', active_time_id = '') =>
	axios(
		STATIC_ACTIVE_URL + "/api/active_order_time_msg", {
			p: PLAT,
			api_token: localStorage.api_token,
			active_id,
			active_time_id
		},
		"GET",
		true
	);
/**
 * 获取订单状态-用于轮询
 */
const getOrderStatus = (torder_id = '') =>
	axios(
		STATIC_ACTIVE_URL + "/api/active/getstatus", {
			p: PLAT,
			api_token: localStorage.app_token,
			torder_id
		},
		"GET",
		true
	);
export default {
	activeList,
	activeType,
	activeApplyList,
	activeDetail,
	timeList,
	sendSms,
	checkSms,
	orderRecord,
	recordDeatil,
	contacts,
	contactsList,
	applyActive,
	cancelOrder,
	payOrder,
	delVisitor,
	wxTimeMsg,
	refundTickets,
	judgeNum,
	getPhone,
	getOrderStatus
};