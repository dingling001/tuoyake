import axios from "../api"; // 导入 api
// 获取影院列表
export const CinemaList = () =>
  axios(
    STATIC_CINEMA_URL + "/api/cinema/cinema_list",
    {
      p: "w",
    },
    "GET",
    true
  );
// 影院简介
export const CinemaInfo = (cinema_id) =>
  axios(
    STATIC_CINEMA_URL + "/api/cinema/cinema_info",
    {
      p: "w",
      cinema_id
    },
    "GET",
    true
  );
export const CinemaCalendar = () => axios(
  STATIC_CINEMA_URL + "/api/cinema/date_info", {
    p: 'w',
  },
  "GET",
  true
);
// 正在热映
export const MovieList = (api_token, skip, take,) =>
  axios(
    STATIC_CINEMA_URL + "/api/cinema/movie_list",
    {
      p: "w",
      api_token,
      skip,
      take
    },
    "GET",
    true
  );
// 即将上映
export const JjsyMovieList = (skip, take) =>
  axios(
    STATIC_CINEMA_URL + "/api/cinema/jjsy_movie_list",
    {
      p: "w",
      skip,
      take
    },
    "GET",
    true
  );
// 添加行程
export const AddTrip = (api_token, movie_id,) =>
  axios(
    STATIC_CINEMA_URL + "/api/user_order/add_trip",
    {
      p: "w",
      api_token,
      movie_id
    },
    "POST",
    true
  );
// 取消行程
export const DelTrip = (api_token, movie_id,) =>
  axios(
    STATIC_CINEMA_URL + "/api/user_order/del_trip",
    {
      p: "w",
      api_token,
      movie_id
    },
    "GET",
    true
  );

// 影片详情
export const MovieInfo = (movie_id, cinema_id) =>
  axios(
    STATIC_CINEMA_URL + "/api/cinema/movie_info",
    {
      p: "w",
      movie_id,
      cinema_id
    },
    "GET",
    true
  );
// 获取即将上映详情
export const JjsyMovieInfo = (movie_id) =>
  axios(
    STATIC_CINEMA_URL + "/api/cinema/jjsy_movie_info",
    {
      p: "w",
      movie_id
    },
    "GET",
    true
  );
// 获取座位信息
export const SeatInfo = (film_date_layout_id) =>
  axios(
    STATIC_CINEMA_URL + "/api/order/seat_info",
    {
      p: "w",
      film_date_layout_id,
      api_token:localStorage.getItem('api_token')
    },
    "GET",
    true
  );
// 获取用户手机号
export const GetFilmPhone = (api_token) =>
  axios(STATIC_PW_URL + "/api/users/info", {
      p: "w",
      api_token
    },
    "GET",
    true
  );
// 购票
export const CreateFilmOrder = (film_date_layout_id, api_token, ticket_class_string, seat, seat_num) =>
  axios(
    STATIC_CINEMA_URL + "/api/order/create_order",
    {
      p: "w",
      film_date_layout_id,
      api_token,
      ticket_class_string,
      seat,
      seat_num
    },
    "POST",
    true
  );
// 订单详情
export const FilmOrderInfo = (api_token, order_id) =>
  axios(STATIC_CINEMA_URL + "/api/user_order/order_info", {
      p: "w",
      api_token,
      order_id
    },
    "GET",
    true
  );
// 电影订单列表
export const FilmOrderList = (api_token, status = 0, skip, take) =>
  axios(STATIC_CINEMA_URL + "/api/user_order/order_list", {
      p: "w",
      api_token,
      status,
      skip,
      take
    },
    "GET",
    true
  );
// 订单状态查询
export const FilmOrderStatus = (api_token, order_id) =>
  axios(STATIC_CINEMA_URL + "/api/order/order_status", {
      p: "w",
      api_token,
      order_id,
    },
    "GET",
    true
  );
// 订单支付
export const FilmPayOrder = (api_token, payment_id, order_id) =>
  axios(STATIC_CINEMA_URL + "/api/order/pay_order", {
      p: "w",
      api_token,
      payment_id,
      order_id,
    },
    "POST",
    true
  );
// 我的行程单
export const FilmMyTrip = (api_token) =>
  axios(STATIC_CINEMA_URL + "/api/user_order/my_trip", {
      p: "w",
      api_token,
    },
    "GET",
    true
  );
// 退款
export const FilmCancelOrder = (api_token, order_id) =>
  axios(STATIC_CINEMA_URL + "/api/user_order/cancel_order", {
      p: "w",
      api_token,
      order_id,
    },
    "POST",
    true
  );
export const LanguageCinemaInfo = (language = 1) =>
  axios(STATIC_CINEMA_URL + "/api/cinema/language_cinema_info", {
      p: 'w',
      language,
    },
    "GET",
    true
  );
export const LanguageMovieList = (language = 1, skip = 0, take = 5) =>
  axios(STATIC_CINEMA_URL + "/api/cinema/language_movie_list", {
      p: 'w',
      language,
      skip: skip,
      take: take,
    },
    "GET",
    true
  );

