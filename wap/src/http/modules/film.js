import axios from "../api"; // 导入 api
// 获取影院列表
export const CinemaList = () =>
  axios(
    STATIC_CINEMA_URL + "/api/cinema/cinema_list",
    {
      p: PLAT,
    },
    "GET",
    true
  );
/**
 * 影院日历
 */
export const CinemaCalendar = (cinema_id) => axios(
  STATIC_CINEMA_URL + "/api/cinema/date_info", {
    p: PLAT,
    cinema_id
  },
  "GET",
  true
);
// 影院简介
export const CinemaInfo = (cinema_id) =>
  axios(
    STATIC_CINEMA_URL + "/api/cinema/cinema_info",
    {
      p: PLAT,
      cinema_id
    },
    "GET",
    true
  );
// 根据日历获取电影院信息
export const CinemaDateMovie = ( date,cinema_id,check_type) => axios(
  STATIC_CINEMA_URL + "/api/cinema/date_movie", {
    p: PLAT,
    api_token: localStorage.app_token,
    date,
    cinema_id,
    check_type
  },
  "GET",
  true
);

// 根据日历获取球幕电影院信息
export const QmDateMovie = (api_token, date,cinema_id,check_type) => axios(
  STATIC_CINEMA_URL + "/api/cinema/qm_date_movie", {
    p: PLAT,
    api_token: localStorage.app_token,
    date,
    cinema_id,
    check_type
  },
  "GET",
  true
);
// 添加行程
export const AddTrip = (api_token, movie_id,) =>
  axios(
    STATIC_CINEMA_URL + "/api/user_order/add_trip",
    {
      p: PLAT,
      api_token: localStorage.app_token,
      movie_id
    },
    "POST",
    true
  );
// 获取当前电影的场次数据
export const MovieLayout = (cinema_id, movie_id, td_id) =>
  axios(
    STATIC_CINEMA_URL + "/api/cinema/movie_layout",
    {
      p: PLAT,
      cinema_id,
      api_token: localStorage.app_token,
      movie_id,
      td_id
    },
    "GET",
    true
  );
// 获取座位信息
export const SeatInfo = (film_date_layout_id,check_type) =>
  axios(
    STATIC_CINEMA_URL + "/api/order/seat_info",
    {
      p: PLAT,
      film_date_layout_id,
      api_token:localStorage.app_token,
      check_type
    },
    "GET",
    true
  );
// 创建订单
export const CreateFilmOrder = (film_date_layout_id, ticket_class_string, seat, seat_num, phone) =>
  axios(
    STATIC_CINEMA_URL + "/api/order/create_order",
    {
      p: PLAT,
      film_date_layout_id,
      api_token: localStorage.app_token,
      ticket_class_string,
      seat,
      seat_num,
      phone
    },
    "POST",
    true
  );
// 电影订单列表
export const FilmOrderList = (api_token, status = 0, take, skip) =>
  axios(STATIC_CINEMA_URL + "/api/user_order/order_list", {
      p: PLAT,
      api_token: localStorage.app_token,
      status,
      skip,
      take
    },
    "GET",
    true
  );
// 订单详情
export const FilmOrderInfo = (api_token, order_id) =>
  axios(STATIC_CINEMA_URL + "/api/user_order/order_info", {
      p: PLAT,
      api_token: localStorage.app_token,
      order_id
    },
    "GET",
    true
  );
// 订单支付
export const FilmPayOrder = (order_id, payment_id) =>
  axios(STATIC_CINEMA_URL + "/api/order/pay_order", {
      p: PLAT,
      api_token: localStorage.app_token,
      payment_id,
      order_id,
    },
    "POST",
    true
  );
// 订单状态查询
export const FilmOrderStatus = (order_id) =>
  axios(STATIC_CINEMA_URL + "/api/order/order_status", {
      p: PLAT,
      api_token: localStorage.app_token,
      order_id,
    },
    "GET",
    true
  );
// 退款
export const FilmCancelOrder = (api_token, order_id) =>
  axios(STATIC_CINEMA_URL + "/api/user_order/cancel_order", {
      p: PLAT,
      api_token: localStorage.app_token,
      order_id,
    },
    "POST",
    true
  );
export const LanguageCinemaInfo = (language = 1) =>
  axios(STATIC_CINEMA_URL + "/api/cinema/language_cinema_info", {
      p: PLAT,
      language,
    },
    "GET",
    true
  );
export const LanguageMovieList = (language = 1, skip = 0, take = 5) =>
  axios(STATIC_CINEMA_URL + "/api/cinema/language_movie_list", {
      p: PLAT,
      language,
      skip: skip,
      take: take,
    },
    "GET",
    true
  );
