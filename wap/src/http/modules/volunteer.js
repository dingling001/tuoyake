import axios from "../api"; // 导入 api

/**
 * 志愿者活动首页列表
 */
const volList = (page = '',recruit_job_id = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/active_list", {
			p: PLAT,
			api_token: localStorage.app_token,
			page,
			limit:8,
			active_start_date:'',
			active_end_date:'',
			recruit_job_id,
		},
		"GET",
		true
	);

/**
 * 岗位列表
 */
const jobList = () =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/get_job", {
			p: PLAT
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
			p: PLAT,
			api_token:localStorage.app_token,
			active_id
		},
		"GET",
		true
	);

/**
 * 我的志愿者信息
 */
const volInfo = () =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/get_vol_info", {
			p: PLAT,
			api_token:localStorage.app_token,
		},
		"GET",
		true
	);


/**
 * 活动报名
 */
const volActive = (active_id = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/active_order", {
			p: PLAT,
			api_token:localStorage.app_token,
			active_id
		},
		"POST",
		true
	);

/**
 * 活动报名记录
 */
const volRecord = (page = '',active_start_date = '',active_end_date = '',toi_status = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/active_order_log", {
			p: PLAT,
			api_token:localStorage.app_token,
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
const volExplainRecord = (page = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/explain_order_log", {
			p: PLAT,
			api_token:localStorage.app_token,
			page,
			limit:5,
			toi_status:0
		},
		"GET",
		true
	);

/**
 * 取消报名
 */
const volCancel = (order_id = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/active_order_cancel", {
			p: PLAT,
			api_token:localStorage.app_token,
			order_id
		},
		"GET",
		true
	);

/**
 * 记录详情
 */
const volDetail = (order_id = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/active_order_detail", {
			p: PLAT,
			api_token:localStorage.app_token,
			order_id
		},
		"GET",
		true
	);

/**
 * 民族
 */
const wxNationList = () =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/get_nation", {
			p: PLAT
		},
		"GET",
		true
	);

/**
 * 政治面貌
 */
const wxPoliticsStatus = () =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/get_politician", {
			p: PLAT
		},
		"GET",
		true
	);

/**
 * 学历
 */
const wxEducationList = () =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/get_education", {
			p: PLAT
		},
		"GET",
		true
	);
	
/**
 * 岗位列表
 */
const wxJobList = () =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/get_job", {
			p: PLAT
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
 * 志愿者招募状态
 */
const wxRecruitStatus = () =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/vol_reg_status", {
			p: PLAT
		},
		"GET",
		true
	);
	
/**
 * 用户详情
 */
const userInfo = () =>
	axios(
		STATIC_PW_URL + "/api/users/info", {
			p: PLAT,
			api_token:localStorage.app_token
		},
		"GET",
		true
	);
	
/**
 * 活动签到
 */
const activeSign = (active_id = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/active_sign", {
			p: PLAT,
			api_token:localStorage.app_token,
			active_id
		},
		"GET",
		true
	);
	
/**
 * 活动签到数据获取
 */
const activeSignData = (active_id = '') =>
	axios(
		STATIC_VOLUNTEER_URL + "/api/active_sign_info", {
			p: PLAT,
			api_token:localStorage.app_token,
			active_id
		},
		"GET",
		true
	);
	
export default {
	volList,
	jobList,
	volActDetail,
	volInfo,
	volActive,
	volRecord,
	volCancel,
	volDetail,
	wxNationList,
	wxPoliticsStatus,
	wxEducationList,
	wxJobList,
	registerVol,
	userInfo,
	activeSign,
	activeSignData,
	wxRecruitStatus,
	volExplainRecord
};
