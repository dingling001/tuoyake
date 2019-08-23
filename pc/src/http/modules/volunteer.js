import axios from "../api"; // 导入 api
	
/**
 * 岗位列表
 */
const jobList = () =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/get_job", {
			p: 'w'
		},
		"GET",
		true
	);
	
/**
 * 活动详情
 */
const volActDetail = (active_id = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/active_detail", {
			p: 'w',
			api_token:localStorage.api_token,
			active_id
		},
		"GET",
		true
	);
	
/**
 * 政治面貌
 */
const politicsStatus = () =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/get_politician", {
			p: 'w'
		},
		"GET",
		true
	);
	
/**
 * 学历
 */
const educationList = () =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/get_education", {
			p: 'w'
		},
		"GET",
		true
	);
	
/**
 * 民族
 */
const nationList = () =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/get_nation", {
			p: 'w'
		},
		"GET",
		true
	);
	
/**
 * 志愿者注册
 */
const registerVol = (dataObj = {}) =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/vol_reg", dataObj,
		"POST",
		true
	);
	
/**
 * 志愿者活动首页列表
 */
const volList = (page = '',active_start_date = '',active_end_date = '',recruit_job_id = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/active_list", {
			p: 'w',
			api_token: localStorage.api_token,
			page,
			limit:5,
			active_start_date,
			active_end_date,
			recruit_job_id,
		},
		"GET",
		true
	);

/**
 * 活动报名
 */
const volApplyActive = (active_id = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/active_order", {
			p: 'w',
			api_token:localStorage.api_token,
			active_id,
		},
		"POST",
		true
	);
	
/**
 * 我的志愿者信息
 */
const pcVolInfo = () =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/get_vol_info", {
			p: 'w',
			api_token:localStorage.api_token,
		},
		"GET",
		true
	);
	
/**
 * 活动报名记录
 */
const pcVolRecord = (page = '',active_start_date = '',active_end_date = '',toi_status = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/active_order_log", {
			p: 'w',
			api_token:localStorage.api_token,
			page,
			limit:5,
			active_start_date,
			active_end_date,
			toi_status
		},
		"GET",
		true
	);
	
/**
 * 讲解报名记录
 */
const pcExplainRecord = (page = '',toi_status = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/explain_order_log", {
			p: 'w',
			api_token:localStorage.api_token,
			page,
			limit:5,
			toi_status
		},
		"GET",
		true
	);
	
/**
 * 取消报名
 */
const cancelJoinVolPc = (order_id = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/active_order_cancel", {
			p: 'w',
			api_token:localStorage.api_token,
			order_id
		},
		"GET",
		true
	);
	
/**
 * 报名记录详情
 */
const joinRecordDetail = (order_id = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/active_order_detail", {
			p: 'w',
			api_token:localStorage.api_token,
			order_id
		},
		"GET",
		true
	);
	
/**
 * 考核培训参加列表
 */
const assessRecord = (page = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/train_list", {
			p: 'w',
			api_token:localStorage.api_token,
			page,
			limit:5
		},
		"GET",
		true
	);
	
/**
 * 证明申请列表
 */
const testifyApply = (vid = '',page = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/vol_apply_list", {
			p: 'w',
			api_token:localStorage.api_token,
			vid,
			page,
			limit:5
		},
		"GET",
		true
	);
	
/**
 * 证明申请下载
 */
const testifyLoad = (vid = '',aid = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/vol_apply_download", {
			p: 'w',
			api_token:localStorage.api_token,
			vid,
			aid
		},
		"GET",
		true
	);
/**
 * 申请证明
 */
const assessTestify = (vid = '',start_date = '',end_date = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/vol_apply", {
			p: 'w',
			api_token:localStorage.api_token,
			vid,
			start_date,
			end_date
		},
		"GET",
		true
	);
	
/**
 * 修改手机号码
 */
const changePhone = (vid = '',phone = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/edit_phone", {
			p: 'w',
			api_token:localStorage.api_token,
			vid,
			phone
		},
		"POST",
		true
	);
	
/**
 * 修改服务时间
 */
const changeServeTime = (vid = '',worktime_type = '',worktime = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/edit_worktime", {
			p: 'w',
			api_token:localStorage.api_token,
			vid,
			worktime_type,
			worktime
		},
		"POST",
		true
	);
/**
 * 修改服务岗位
 */
const changeServeType = (vid = '',vol_work = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/edit_work", {
			p: 'w',
			api_token:localStorage.api_token,
			vid,
			vol_work
		},
		"POST",
		true
	);
	
/**
 * 用户详情
 */
const pcuserInfo = () =>
	axios(
		STATIC_PW_URL + "/api/users/info", {
			p: 'w',
			api_token:localStorage.api_token
		},
		"GET",
		true
	);
/**
 * 招募状态
 */
const recruitStatus = () =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/vol_reg_status", {
			p: 'w'
		},
		"GET",
		true
	);
export default {
	volList,
	jobList,
	volActDetail,
	politicsStatus,
	educationList,
	nationList,
	registerVol,
	volApplyActive,
	pcVolInfo,
	pcVolRecord,
	cancelJoinVolPc,
	joinRecordDetail,
	assessRecord,
	testifyApply,
	testifyLoad,
	assessTestify,
	changePhone,
	changeServeTime,
	changeServeType,
	pcuserInfo,
	recruitStatus,
	pcExplainRecord
};