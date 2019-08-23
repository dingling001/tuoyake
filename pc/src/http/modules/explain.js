import axios from "../api"; // 导入 api

// 预约日历
export const GetCalendar = () => axios(
  STATIC_GUIDE_URL + "/api/guide/calendar",
  {
    p: "w",
  },
  "GET",
  true
);
// 预约简介
export const GuideDetail = () => axios(
  STATIC_GUIDE_URL + "/api/guide/detail",
  {
    p: "w",
  },
  "GET",
  true
);
// 预约讲解
export const Guideorder = (api_token, yy_type_id, go_teamname = '',exhibition_ids, gd_tp_id, go_username, go_cardtype_id, go_card_num, contact_phone, people_num, language_id, guide_num) => axios(
  STATIC_GUIDE_URL + "/api/guideorder",
  {
    p: "w",
    api_token,
    yy_type_id,
    go_teamname,
    exhibition_ids,
    gd_tp_id,
    go_username,
    go_cardtype_id,
    go_card_num,
    contact_phone,
    people_num,
    language_id,
    guide_num
  },
  "POST",
  true
);
// 验证图片码
export const ExplainCheckImg = (code, device_uuid) =>
  axios(
    STATIC_PW_URL + "/api/cpt/check", {
      p: 'w',
      device_uuid,
      code
    },
    "GET",
    true
  );
// 订单详情
export const TicketOrderDetail = (api_token, gorder_id) =>
  axios(
    STATIC_GUIDE_URL + "/api/my/guideorder/detail", {
      p: 'w',
      api_token,
      gorder_id
    },
    "GET",
    true
  );
// 我的预约列表
export const MyGuideOrder = (api_token, offset = 0, limit = 10, is_page = 1, order_status) =>
  axios(
    STATIC_GUIDE_URL + "/api/my/guideorder", {
      p: 'w',
      api_token,
      offset,
      limit,
      is_page,
      order_status
    },
    "GET",
    true
  );
// 取消订单
export const GuideOrderCancel = (api_token, gorder_id) =>
  axios(
    STATIC_GUIDE_URL + "/api/guideorder/cancel", {
      p: 'w',
      api_token,
      gorder_id
    },
    "GET",
    true
  );
// 获取订单状态
export const GuideOrderStatus = (api_token, gorder_id) =>
  axios(
    STATIC_GUIDE_URL + "/api/my/guideorder/order_status", {
      p: 'w',
      api_token,
      gorder_id
    },
    "GET",
    true
  );
// 支付
export const GuideOrderPay = (api_token, gorder_id, payment_id, mini_id = '') =>
  axios(
    STATIC_GUIDE_URL + "/api/guideorder/pay", {
      p: 'w',
      api_token,
      gorder_id,
      payment_id,
      mini_id
    },
    "POST",
    true
  );
// 退款
export const GuideorderRefund = (api_token, gorder_id) =>
  axios(
    STATIC_GUIDE_URL + "/api/guideorder/refund", {
      p: 'w',
      api_token,
      gorder_id,
    },
    "POST",
    true
  );

