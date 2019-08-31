import axios from "../api"; // 导入 api

export const getBanner = (if_wrap = "") =>
  axios(
    STATIC_WEB_URL + "/api/web/get_lun",
    {
      p: PLAT,
      if_wrap
    },
    "GET",
    true
  );
export const getRegion = () =>
  axios(
    STATIC_WEB_URL + "/api/allregion",
    {
      p: "t"
    },
    "GET",
    true
  );
export const getAd = (skip = 0, take = 10, cate_id = 2, if_recommend = 1) =>
  axios(
    STATIC_WEB_URL + "/api/web/news",
    {
      p: PLAT,
      if_recommend,
      skip,
      take,
      cate_id
    },
    "GET",
    true
  );

export const getInfo = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/web/get_visit",
    {
      p: PLAT,
      language
    },
    "GET",
    true
  );
export const getEx = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/exhibition_list",
    {
      p: PLAT,
      language
    },
    "GET",
    true
  );
export const getEl = (
  language = localStorage.l ? localStorage.l : 1,
  skip = 0,
  take = 3,
  exhibition_id = "",
  is_recommend = "",
  cate_id = "",
  keyword = "",
  is_getcounts = "",
  is_page = 1,
  api_token = localStorage.app_token ? localStorage.app_token : ""
) =>
  axios(
    STATIC_WEB_URL + "/api/exhibit_list",
    {
      p: PLAT,
      language,
      skip,
      take,
      exhibition_id,
      is_recommend,
      cate_id,
      keyword,
      is_getcounts,
      is_page,
      api_token
    },
    "GET",
    true
  );
export const getElist = (
  exhibition_id = "",
  is_recommend = 1,
  cate_id = "",
  keyword = "",
  is_getcounts = "",
  is_page = 1,
  api_token = localStorage.app_token ? localStorage.app_token : "",
  language = localStorage.l ? localStorage.l : 1,
  skip = 0,
  take = 100,
) =>
  axios(
    STATIC_WEB_URL + "/api/exhibit_list",
    {
      p: PLAT,
      language,
      skip,
      take,
      exhibition_id,
      is_recommend,
      cate_id,
      keyword,
      is_getcounts,
      api_token,
      is_page
    },
    "GET",
    true
  );
export const getContent = (
  eu_id = "",
  exhibition_id = "",
  language = localStorage.l ? localStorage.l : 1,
  skip = 0,
  take = 3
) =>
  axios(
    STATIC_WEB_URL + "/api/exhibit_list",
    {
      p: PLAT,
      eu_id,
      language,
      skip,
      take,
      exhibition_id
    },
    "GET",
    true
  );
export const getHot = () =>
  axios(
    STATIC_WEB_URL + "/api/hot_tags",
    {
      p: "w"
    },
    "GET",
    true
  );
export const getSearch = (keyword, skip = 0, take = 20, type = "") =>
  axios(STATIC_WEB_URL + "/api/search", {
    p: PLAT,
    keyword: keyword,
    type: type,
    skip,
    take
  });
export const getIntro = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/web/goto",
    {
      p: PLAT,
      language
    },
    "GET",
    true
  );

export const getDetail = (article_id = 1) =>
  axios(
    STATIC_WEB_URL + "/api/web/news_detail",
    {
      p: PLAT,
      article_id
    },
    "GET",
    true
  );
// 获取餐厅详情
export const getRe = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/web/restaurant",
    {
      p: PLAT,
      language
    },
    "GET",
    true
  );
export const getOrg = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/web/mechaset",
    {
      p: PLAT,
      language
    },
    "GET",
    true
  );
export const getVisit = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/web/visit",
    {
      p: PLAT,
      language
    },
    "GET",
    true
  );
export const getOnline = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/exhibitionOnline_list",
    {
      p: PLAT,
      language
    },
    "GET",
    true
  );
export const getEInfo = (
  exhibition_id = 1,
  language = localStorage.l ? localStorage.l : 1
) =>
  axios(
    STATIC_WEB_URL + "/api/exhibition_info",
    {
      p: PLAT,
      exhibition_id,
      language
    },
    "GET",
    true
  );
export const getCBanner = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/exhibit_lb",
    {
      p: PLAT,
      skip: 0,
      take: 5,
      language
    },
    "GET",
    true
  );
export const getIndex = function() {
  return axios(
    STATIC_WEB_URL + "/api/web/get_index",
    {
      p: "t",
      language: localStorage.l ? localStorage.l : 1,
      take:4,
    },
    "GET",
    true
  );
}
  
// 获取馆藏精粹的接口
export const getCate = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/exhibit_cate_list",
    {
      p: PLAT,
      skip: 0,
      take: 100,
      language
    },
    "GET",
    true
  );
export const geteInfo = (
  exhibit_id = 1,
  language = localStorage.l ? localStorage.l : 1,
  api_token = localStorage.app_token ? localStorage.app_token : ""
) =>
  axios(
    STATIC_WEB_URL + "/api/exhibit_info",
    {
      p: PLAT,
      exhibit_id,
      api_token,
      language
    },
    "GET",
    true
  );
export const getExAll = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/exhibition_list_all",
    {
      p: PLAT,
      language
    },
    "GET",
    true
  );

export const getC = (
  language = localStorage.l ? localStorage.l : 1,
  api_token = localStorage.app_token ? localStorage.app_token : ""
) =>
  axios(
    STATIC_WEB_URL + "/api/get_exhibits_from_travel",
    {
      p: PLAT,

      api_token,
      language
    },
    "GET",
    true
  );
export const doLike = (exhibit_id = 1, type = 1) =>
  axios(
    STATIC_WEB_URL + "/api/do_like",
    {
      p: PLAT,
      exhibit_id,
      type,
      language: localStorage.l ? localStorage.l : 1,
      api_token: localStorage.app_token ? localStorage.app_token : ""
    },
    "GET",
    true
  );
export const getCates = (exhibit_id = 1, take, skip) =>
  axios(
    STATIC_WEB_URL + "/api/exhibit_cate_tj",
    {
      p: PLAT,
      exhibit_id,
      take,
      skip,
      language: localStorage.l ? localStorage.l : 1,
      is_getcounts:1
    },
    "GET",
    true
  );
export const addTravel = (exhibit_id = 1) =>
  axios(
    STATIC_WEB_URL + "/api/add_exhibit_to_travel",
    {
      p: PLAT,
      exhibit_id,
      api_token: localStorage.app_token ? localStorage.app_token : "",
      language: localStorage.l ? localStorage.l : 1
    },
    "GET",
    true
  );

export const cancelTravel = (exhibit_id = 1) =>
  axios(
    STATIC_WEB_URL + "/api/del_exhibit_from_travel",
    {
      p: PLAT,
      exhibit_id,
      api_token: localStorage.app_token ? localStorage.app_token : "",
      language: localStorage.l ? localStorage.l : 1
    },
    "GET",
    true
  );
export const getWeek = (skip = 0, take = 10) =>
  axios(
    STATIC_WEB_URL + "/api/web/every_week",
    {
      p: PLAT,
      skip,
      take
    },
    "GET",
    true
  );
export const getHall = () =>
  axios(
    STATIC_WEB_URL + "/api/web/hall",
    {
      p: "w",
      api_token: localStorage.app_token ? localStorage.app_token : ""
    },
    "GET",
    true
  );
export const getEBanner = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/exhibition_list_recommend",
    {
      p: PLAT,
      type: 2,
      language
    },
    "GET",
    true
  );
export const getVipInfo = () =>
  axios(
    STATIC_WEB_URL + "/api/member/knowledge",
    {
      p: "t"
    },
    "GET",
    true
  );

export const registerRemeber = (
  username = "",
  sex = 1,
  portrait = "",
  nation = "",
  edu = 1,
  id_card = "",
  province = "",
  city = "",
  town = "",
  address = ""
) =>
  axios(
    STATIC_WEB_URL + "/api/member/register",
    {
      username,
      sex,
      portrait,
      nation,
      edu,
      id_card,
      province,
      city,
      town,
      address,
      p: PLAT,
      api_token: localStorage.app_token ? localStorage.app_token : ""
    },
    "POST",
    true
  );
export const getVip = () =>
  axios(
    STATIC_WEB_URL + "/api/member/judge",
    {
      p: PLAT,
      api_token: localStorage.app_token ? localStorage.app_token : ""
    },
    "GET",
    true
  );
export const getReason = () =>
  axios(
    STATIC_WEB_URL + "/api/member/reason",
    {
      p: PLAT,
      api_token: localStorage.app_token ? localStorage.app_token : ""
    },
    "GET",
    true
  );
export const getMInfo = () =>
  axios(
    STATIC_WEB_URL + "/api/member/get_member_info",
    {
      p: PLAT,
      api_token: localStorage.app_token ? localStorage.app_token : ""
    },
    "GET",
    true
  );
export const getVipI = () =>
  axios(
    STATIC_WEB_URL + "/api/member/get_info",
    {
      p: PLAT,
      api_token: localStorage.app_token ? localStorage.app_token : ""
    },
    "GET",
    true
  );
export const getEquity = () =>
  axios(
    STATIC_WEB_URL + "/api/member/equity",
    {
      p: PLAT,
      api_token: localStorage.app_token ? localStorage.app_token : ""
    },
    "GET",
    true
  );
export const getStatus = () =>
  axios(
    STATIC_WEB_URL + "/api/travel_exhibit_status",
    {
      p: PLAT,
      api_token: localStorage.app_token ? localStorage.app_token : ""
    },
    "GET",
    true
  );
export const getWeekD = (article_id = 1) =>
  axios(
    STATIC_WEB_URL + "/api/web/week_detail",
    {
      article_id,
      p: PLAT,
      api_token: localStorage.app_token ? localStorage.app_token : ""
    },
    "GET",
    true
  );
export const doZan = article_id =>
  axios(
    STATIC_WEB_URL + "/api/web/like",
    {
      article_id,
      p: PLAT,
      api_token: localStorage.app_token ? localStorage.app_token : ""
    },
    "POST",
    true
  );
export const visit_exhibit = (exhibit_id = "") =>
  axios(
    STATIC_WEB_URL + "/api/visit_exhibit",
    {
      p: PLAT,
      exhibit_id,
      api_token: localStorage.app_token ? localStorage.app_token : ""
    },
    "GET",
    true
  );
