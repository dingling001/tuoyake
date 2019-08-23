import axios from "../api"; // 导入 api

const getCode = (device_uuid, phone, code) =>
  axios(
    STATIC_PW_URL + "/api/send_sms",
    {
      p: "w",
      device_uuid: device_uuid,
      phone: phone,
      code: code
    },
    "POST",
    true
  );
const getLogin = (phone, smscode, bind_uid) =>
  axios(
    STATIC_PW_URL + "/api/users/auto_token",
    {
      p: "w",
      phone: phone,
      smscode: smscode,
      bind_uid: bind_uid
    },
    "POST",
    true
  );
const layout = (api_token = localStorage.api_token) =>
  axios(STATIC_PW_URL + "/api/users/logout", {
    p: "w",
    api_token
  });
const getMsg = (api_token = localStorage.api_token) =>
  axios(STATIC_WEB_URL + "/api/web/get_notice_num", {
    p: "w",
    api_token
  });
const getNotice = (skip = 0, take = 10, api_token = localStorage.api_token) =>
  axios(STATIC_WEB_URL + "/api/web/get_notice", {
    p: "w",
    skip,
    take,
    api_token
  });
const getFavor = (skip = 0, take = 12, api_token = localStorage.api_token) =>
  axios(STATIC_WEB_URL + "/api/my_collection", {
    p: "w",
    api_token,
    language: localStorage.l ? localStorage.l : 1,
    skip,
    take,
    is_getcounts: "",
    is_page: 1
  });
// 获取票务行程单
const getPw = () =>
  axios(STATIC_PW_URL + "/api/my/ticketorder/user_detail", {
    p: "w",
    api_token: localStorage.api_token
  });
// 获取影院行程单
const getMovie = () =>
  axios(
    STATIC_CINEMA_URL + "/api/user_order/my_trip",
    {
      p: "w",
      api_token: localStorage.api_token
    },
    "GET",
    true
  );
// 获取个人行程单
const getC = (
  language = localStorage.l ? localStorage.l : 1,
  api_token = localStorage.api_token ? localStorage.api_token : ""
) =>
  axios(
    STATIC_WEB_URL + "/api/get_exhibits_from_travel",
    {
      p: "w",
      api_token,
      language
    },
    "GET",
    true
  );
const changePhones = (
  smscode,
  phone,
  old_phone,
  api_token = localStorage.api_token
) =>
  axios(
    STATIC_PW_URL + "/api/users/phone",
    {
      smscode,
      phone,
      p: "w",
      api_token,
      old_phone
    },
    "POST",
    true
  );
const getUser = () =>
  axios(
    STATIC_PW_URL + "/api/users/info",
    {
      p: "w",
      api_token: localStorage.api_token ? localStorage.api_token : ""
    },
    "GET",
    true
  );
const checkCode = (device_uuid = "", code = "") =>
  axios(
    STATIC_PW_URL + "/api/cpt/check",
    {
      p: "w",
      device_uuid,
      code
    },
    "GET",
    true
  );
export default {
  changePhones,
  getCode,
  getLogin,
  layout,
  getMsg,
  getPw,
  getC,
  getMovie,
  getNotice,
  getUser,
  getFavor,
  checkCode
};
