import axios from "../api"; // 导入 api

// GET请求
export const getBanner = (if_wrap = "") =>
  axios(
    STATIC_WEB_URL + "/api/web/get_lun",
    {
      p: "w",
      if_wrap
    },
    "GET",
    true
  );

export const getAd = (skip = 0, take = 10, cate_id = 2, if_recommend = 1) =>
  axios(
    STATIC_WEB_URL + "/api/web/news",
    {
      p: "w",
      if_recommend,
      skip,
      take,
      cate_id
    },
    "GET",
    true
  );

export const getVipI = () =>
  axios(
    STATIC_WEB_URL + "/api/member/get_info",
    {
      p: "t",
      api_token: localStorage.api_token ? localStorage.api_token : ""
    },
    "GET",
    true
  );
export const getVip = () =>
  axios(
    STATIC_WEB_URL + "/api/member/judge",
    {
      p: "t",
      api_token: localStorage.api_token ? localStorage.api_token : ""
    },
    "GET",
    true
  );
export const getReason = () =>
  axios(
    STATIC_WEB_URL + "/api/member/reason",
    {
      p: "t",
      api_token: localStorage.api_token ? localStorage.api_token : ""
    },
    "GET",
    true
  );

export const getInfo = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/web/get_visit",
    {
      p: "w",
      language
    },
    "GET",
    true
  );

export const getInfoVip = () =>
  axios(
    STATIC_WEB_URL + "/api/member/knowledge",
    {
      p: "w"
    },
    "GET",
    true
  );
export const getEx = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/exhibition_list",
    {
      p: "w",
      language
    },
    "GET",
    true
  );
export const getExAll = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/exhibition_list_all",
    {
      p: "w",
      language
    },
    "GET",
    true
  );

export const getEBanner = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/exhibition_list_recommend",
    {
      p: "w",
      type: 2,
      language
    },
    "GET",
    true
  );
export const getEl = (
  language = localStorage.l || 1,
  skip = 0,
  take = 3,
  exhibition_id = "",
  is_recommend = "",
  cate_id = "",
  keyword = "",
  is_getcounts = "",
  is_page = 1,
  api_token = localStorage.api_token ? localStorage.api_token : ""
) =>
  axios(
    STATIC_WEB_URL + "/api/exhibit_list",
    {
      p: "w",
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
export const getElist = (
  exhibition_id = "",
  is_recommend = 1,
  cate_id = "",
  keyword = "",
  is_getcounts = "",
  is_page = 1,
  api_token = localStorage.api_token ? localStorage.api_token : "",
  language = localStorage.l || 1,
  skip = 0,
  take = 100,
) =>
  axios(
    STATIC_WEB_URL + "/api/exhibit_list",
    {
      p: "w",
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
export const doZan = article_id =>
  axios(
    STATIC_WEB_URL + "/api/web/like",
    {
      article_id,
      p: "w",
      api_token: localStorage.api_token ? localStorage.api_token : ""
    },
    "POST",
    true
  );

export const visit_exhibit = (exhibit_id = "") =>
  axios(
    STATIC_WEB_URL + "/api/visit_exhibit",
    {
      p: "w",
      exhibit_id,
      api_token: localStorage.api_token ? localStorage.api_token : ""
    },
    "GET",
    true
  );
export const getContent = (
  eu_id = "",
  exhibition_id = "",
  language = localStorage.l || 1,
  skip = 0,
  take = 3
) =>
  axios(
    STATIC_WEB_URL + "/api/exhibit_list",
    {
      p: "w",
      eu_id,
      language,
      skip,
      take,
      exhibition_id
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
      p: "t",
      api_token: localStorage.api_token ? localStorage.api_token : ""
    },
    "POST",
    true
  );
export const getHost = () =>
  axios(
    STATIC_WEB_URL + "/api/hot_tags",
    {
      p: "w"
    },
    "GET",
    true
  );
export const getSearch = (keyword, type = "", skip = 0, take = 10) =>
  axios(STATIC_WEB_URL + "/api/search", {
    p: "w",
    keyword: keyword,
    type: type,
    skip,
    take
  }, "GET",
    true);
export const getIntro = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/web/goto",
    {
      p: "w",
      language
    },
    "GET",
    true
  );

export const getDetail = (article_id = 1) =>
  axios(
    STATIC_WEB_URL + "/api/web/news_detail",
    {
      p: "w",
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
      p: "w",
      language
    },
    "GET",
    true
  );
export const getOrg = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/web/mechaset",
    {
      p: "w",
      language
    },
    "GET",
    true
  );
export const getVisit = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/web/visit",
    {
      p: "w",
      language
    },
    "GET",
    true
  );
export const getOnline = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/exhibitionOnline_list",
    {
      p: "w",
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
      p: "w",
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
      p: "w",
      skip: 0,
      take: 5,
      language
    },
    "GET",
    true
  );
// 获取馆藏精粹的接口
export const getCate = (language = localStorage.l ? localStorage.l : 1) =>
  axios(
    STATIC_WEB_URL + "/api/exhibit_cate_list",
    {
      p: "w",
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
  api_token = localStorage.api_token ? localStorage.api_token : ""
) =>
  axios(
    STATIC_WEB_URL + "/api/exhibit_info",
    {
      p: "w",
      exhibit_id,
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
      p: "w",
      exhibit_id,
      type,
      language: localStorage.l ? localStorage.l : 1,
      api_token: localStorage.api_token ? localStorage.api_token : ""
    },
    "GET",
    true
  );
export const getCates = (exhibit_id = 1, take, skip) =>
  axios(
    STATIC_WEB_URL + "/api/exhibit_cate_tj",
    {
      p: "w",
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
      p: "w",
      exhibit_id,
      api_token: localStorage.api_token ? localStorage.api_token : "",
      language: localStorage.l ? localStorage.l : 1
    },
    "GET",
    true
  );

export const cancelTravel = (exhibit_id = 1) =>
  axios(
    STATIC_WEB_URL + "/api/del_exhibit_from_travel",
    {
      p: "w",
      exhibit_id,
      api_token: localStorage.api_token ? localStorage.api_token : "",
      language: localStorage.l ? localStorage.l : 1
    },
    "GET",
    true
  );
export const getWeek = (skip = 0, take = 10) =>
  axios(
    STATIC_WEB_URL + "/api/web/every_week",
    {
      p: "w",
      skip,
      take
    },
    "GET",
    true
  );
export const getWeekD = (article_id = 1) =>
  axios(
    STATIC_WEB_URL + "/api/web/week_detail",
    {
      article_id,
      p: "t",
      api_token: localStorage.api_token ? localStorage.api_token : ""
    },
    "GET",
    true
  );
export const getHall = () =>
  axios(
    STATIC_WEB_URL + "/api/web/hall",
    {
      p: "w",
      api_token:localStorage.api_token
    },
    "GET",
    true
  );
export const getIndex = () =>
  axios(
    STATIC_WEB_URL + "/api/web/get_index",
    {
      p: "w",
      take:6,
      language: localStorage.l ? localStorage.l : 1
    },
    "GET",
    true
  );
export const getEquity = () =>
  axios(
    STATIC_WEB_URL + "/api/member/equity",
    {
      p: "w"
    },
    "GET",
    true
  );
export const getRegion = () =>
  axios(
    STATIC_WEB_URL + "/api/allregion",
    {
      p: "w"
    },
    "GET",
    true
  );
