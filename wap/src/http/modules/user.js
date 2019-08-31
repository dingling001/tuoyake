import axios from "../api"; // 导入 api

const getCode = (device_uuid, phone, code) =>
  axios(
    STATIC_PW_URL + "/api/send_sms",
    {
      p: PLAT,
      device_uuid: device_uuid,
      phone: phone,
      code: code
    },
    "POST",
    true
  );
const getLogin = (phone, smscode, bind_uid = "") =>
  axios(
    STATIC_PW_URL + "/api/users/auto_token",
    {
      p: PLAT,
      phone: phone,
      smscode: smscode,
      bind_uid
    },
    "POST",
    true
  );
// 获取票务行程单
const getPw = () =>
  axios(STATIC_PW_URL + "/api/my/ticketorder/user_detail", {
    p: PLAT,
    api_token: localStorage.app_token
  });
// 获取影院行程单
const getMovie = () =>
  axios(
    STATIC_CINEMA_URL + "/api/user_order/my_trip",
    {
      p: PLAT,
      api_token: localStorage.app_token
    },
    "GET",
    true
  );
const layout = (api_token = localStorage.app_token) =>
  axios(STATIC_PW_URL + "/api/users/logout", {
    p: PLAT,
    api_token
  });
const getMsg = (api_token = localStorage.app_token) =>
  axios(STATIC_WEB_URL + "/api/web/get_notice_num", {
    p: PLAT,
    api_token
  });
const getNotice = (skip = 0, take = 10, api_token = localStorage.app_token) =>
  axios(STATIC_WEB_URL + "/api/web/get_notice", {
    p: PLAT,
    skip,
    take,
    api_token
  });
const getFavor = (skip = 0, take = 10, api_token = localStorage.app_token) =>
  axios(STATIC_WEB_URL + "/api/my_collection", {
    p: PLAT,
    api_token,
    language: 1,
    skip,
    take
  });
const getTravel = (api_token = localStorage.app_token) =>
  axios(STATIC_WEB_URL + "/api/get_exhibits_from_travel", {
    p: PLAT,
    api_token
  });
const getUser = (api_token = localStorage.app_token) =>
   axios(STATIC_PW_URL + "/api/users/info", {
    p: PLAT,
    api_token
  });

const checkCode = (device_uuid = "", code = "") =>
  axios(
    STATIC_PW_URL + "/api/cpt/check",
    {
      p: PLAT,
      device_uuid,
      code
    },
    "GET",
    true
  );
const getFeedback = (skip=0,take=10)=>
  axios(
    STATIC_WEB_URL + "/api/feedback/my_feedback",
    {
      p: PLAT,
      api_token: localStorage.app_token,
      language:1,
      skip,
      take
    },
    "GET",
    true
  );
const saveFeeback = (content='',phone='',img='') =>
  axios(
    STATIC_WEB_URL + "/api/feedback/feedback_save",
    {
      p: PLAT,
      api_token: localStorage.app_token,
      language:1,
      img,
      phone,
      content
    },
    "POST",
    true
  );
  
export default {
  getCode,
  getLogin,
  getUser,
  getPw,
  layout,
  getMsg,
  getNotice,
  checkCode,
  getFavor,
  getMovie,
  getTravel,
  getFeedback,
  saveFeeback
};
