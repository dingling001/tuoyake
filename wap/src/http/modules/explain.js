import axios from "../api"; // 导入 api


/**
 * 讲解预约日历
 */
export const GuideCalendar = () => axios(
  STATIC_GUIDE_URL + "/api/guide/calendar", {
    p: PLAT,
  },
  "GET",
  true
);
// 预约配置
export const GuideDetail = () => axios(
  STATIC_GUIDE_URL + "/api/guide/detail", {
    p: PLAT,
  },
  "GET",
  true
);
// 预约
export const PostGuideOrder = (exhibition_ids,gd_tp_id,go_username,go_cardtype_id,go_card_num,contact_phone,people_num,language_id,guide_num) => axios(
  STATIC_GUIDE_URL + "/api/guideorder", {
    p: PLAT,
    api_token:localStorage.app_token,
    yy_type_id:1,
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
// 订单支付
export const GuideOrderPay = ( gorder_id, payment_id, mini_id = '') =>
  axios(
    STATIC_GUIDE_URL + "/api/guideorder/pay", {
      p: PLAT,
      api_token:localStorage.app_token,
      gorder_id,
      payment_id,
      mini_id
    },
    "POST",
    true
  );
// 获取订单状态
export const GuideOrderStatus = ( gorder_id) =>
  axios(
    STATIC_GUIDE_URL + "/api/my/guideorder/order_status", {
      p: PLAT,
      api_token:localStorage.app_token,
      gorder_id
    },
    "GET",
    true
  );
// 取消订单
export const GuideOrderCancel = (gorder_id) =>
  axios(
    STATIC_GUIDE_URL + "/api/guideorder/cancel", {
      p: PLAT,
      api_token:localStorage.app_token,
      gorder_id
    },
    "GET",
    true
  );
// 讲解预约记录
export const GuideOrder = (limit, offset, order_status = '') =>
  axios(
    STATIC_GUIDE_URL + "/api/my/guideorder", {
      p: PLAT,
      api_token: localStorage.app_token,
      order_status,
      offset,
      limit
    },
    "GET",
    true
  );
// 预约详情
export const GuideOrderDetail = (gorder_id) =>
  axios(
    STATIC_GUIDE_URL + "/api/my/guideorder/detail", {
      p: PLAT,
      api_token: localStorage.app_token,
      gorder_id,
    },
    "GET",
    true
  );

// 退款
export const GuideorderRefund = (gorder_id) =>
  axios(
    STATIC_GUIDE_URL + "/api/guideorder/refund", {
      p: PLAT,
      api_token: localStorage.app_token,
      gorder_id,
    },
    "POST",
    true
  );
