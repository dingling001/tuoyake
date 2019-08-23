import axios from "../api"; // 导入 api
/**
 * 教育活动首页列表
 */
const activeList = () =>
	axios(
		STATIC_ACTIVE_URL + "/api/web_active_list", {
			p: 'w',
			api_token: localStorage.api_token
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
			p: 'w'
		},
		"GET",
		true
	);
/**
 * 活动预约列表
 */
const activeApplyList = (cate_id = '', cost = '', page = '',active_cate = '') =>
	axios(
		STATIC_ACTIVE_URL + "/api/active_list", {
			p: 'w',
			api_token: localStorage.api_token,
			cate_id,
			cost,
			page,
			active_cate,
			limit: 8
		},
		"GET",
		true
	);

/**
 * 活动详情
 */
const activeDetail = (active_id = '') =>
	axios(
		STATIC_ACTIVE_URL + "/api/active_detail", {
			p: 'w',
			api_token: localStorage.api_token,
			active_id,
		},
		"GET",
		true
	);

/**
 * 获取场次时间表
 */

const timeList = (active_id = '') =>
	axios(
		STATIC_ACTIVE_URL + "/api/time_list", {
			p: 'w',
			api_token: localStorage.api_token,
			active_id,
		},
		"GET",
		true
	);

/**
 * 发送短信验证码
 */
const sendSms = (phone = '', code = '') =>
	axios(
		STATIC_PW_URL + "/api/send_sms", {
			p: 'w',
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
const checkSms = (code = '') =>
	axios(
		STATIC_PW_URL + "/api/cpt/check", {
			p: 'w',
			device_uuid: localStorage.device_uuid,
			code
		},
		"GET",
		true
	);
/**
 * 订单记录
 */
const orderRecord = (order_status = '', page = '') =>
	axios(
		STATIC_ACTIVE_URL + "/api/order_log", {
			p: 'w',
			api_token: localStorage.api_token,
			order_status,
			page,
			limit: 4
		},
		"GET",
		true
	);
/**
 * 我的订单详情
 */
const recordDeatil = (torder_id = '') =>
	axios(
		STATIC_ACTIVE_URL + "/api/confirm_active_order", {
			p: 'w',
			api_token: localStorage.api_token,
			torder_id
		},
		"GET",
		true
	);

/**
 * 预约活动
 */
const applyActive = (contact_phone = '') =>
	axios(
		STATIC_ACTIVE_URL + "/api/active_order", {
			p: 'w',
			api_token: localStorage.api_token,
			active_id: localStorage.active_id,
			active_time_id: localStorage.active_time_id,
			contact_phone,
			toi_username: JSON.parse(localStorage.toi_username),
			toi_cardtype_id: JSON.parse(localStorage.toi_cardtype_id),
			toi_card_num: JSON.parse(localStorage.toi_card_num),
			children_username: localStorage.children_username ? JSON.parse(localStorage.children_username) : [],
			children_cardtype_id: localStorage.children_cardtype_id ? JSON.parse(localStorage.children_cardtype_id) : [],
			children_card_num: localStorage.children_card_num ? JSON.parse(localStorage.children_card_num) : []
		},
		"POST",
		true
	);
/**
 * 验证码登录、自动注册
 */
const getToken = (phone = '',smscode = '') =>
	axios(
		STATIC_PW_URL + "/api/users/auto_token", {
			p: 'w',
			phone,
			smscode,
			bind_uid:''
		},
		"POST",
		true
	);
/**
 * 订单支付
 */
const payOrder = (torder_id = '',payment_id = '') =>
	axios(
		STATIC_ACTIVE_URL + "/api/active/pay", {
			p: 'w',
			api_token: localStorage.api_token,
			torder_id,
			payment_id,
			mini_id:''
		},
		"POST",
		true
	);
	
/**
 * 退票
 */
const refundTickets = (torder_id = '') =>
	axios(
		STATIC_ACTIVE_URL + "/api/active/refund", {
			p: 'w',
			api_token: localStorage.api_token,
			torder_id,
		},
		"POST",
		true
	);
	
/**
 * 取消报名
 */
const cancelApplyOrder = (torder_id = '') =>
	axios(
		STATIC_ACTIVE_URL + "/api/cancel_active_order", {
			p: 'w',
			api_token: localStorage.api_token,
			torder_id,
		},
		"GET",
		true
	);
	
/**
   * 选择时间文案提示
   */
const timeMsg = (active_id = '',active_time_id = '') =>
	axios(
		STATIC_ACTIVE_URL + "/api/active_order_time_msg", {
			p: 'w',
			api_token: localStorage.api_token,
			active_id,
			active_time_id
		},
		"GET",
		true
	);
	
/**
 * 订单状态-用于扫码轮询
 */
const orderStatus = (torder_id = '') =>
	axios(
		STATIC_ACTIVE_URL + "/api/active/getstatus", {
			p: 'w',
			api_token: localStorage.api_token,
			torder_id,
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
			p: 'w',
			api_token: localStorage.api_token,
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
	applyActive,
	getToken,
	payOrder,
	refundTickets,
	cancelApplyOrder,
	timeMsg,
	orderStatus,
	getPhone
};