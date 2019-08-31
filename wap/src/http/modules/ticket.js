import axios from "../api"; // 导入 api

// let api_token = "885db1ee4c9352226d23ba9bca14bb31";
// let api_token = "634868ce720e28f68ce95542f67a7972";
// var STATIC_PW_URL = "https://hbpw.smartechnology.com.cn";
// 
// 
let PW_URL = STATIC_PW_URL;
let ACTIVE_URL = STATIC_ACTIVE_URL;

/**
 * 票务日历
 */
export const PW_WX_Calendar = () =>
  axios(
    PW_URL + "/api/ticket/calendar", {
      p: PLAT
    },
    "GET",
    true
  );

/**
 * 票务须知
 */
export const PW_WX_Notice = () =>
  axios(
    PW_URL + "/api/ticket/text_tip", {
      p: PLAT
    },
    "GET",
    true
  );

/**
 * 票务用户详情
 */
export const PW_WX_UserInfo = () =>
  axios(
    PW_URL + "/api/users/info", {
      p: PLAT,
      api_token: localStorage.app_token
    },
    "GET",
    true
  );

/**
 * @门票详情
 * @param    {[type]}   td_tp_id [日期时段id]
 */
export const PW_WX_TicketDetail = (td_tp_id) =>
  axios(
    PW_URL + "/api/ticket/detail", {
      p: PLAT,
      td_tp_id: td_tp_id,
      api_token: localStorage.app_token
    },
    "GET",
    true
  );


/**
 * 添加常用联系人人数判断(票务共用)
 */
export const PW_WX_ContactsCount = () =>
  axios(
    ACTIVE_URL + "/api/top_contacts_count", {
      p: PLAT,
      api_token: localStorage.app_token
    },
    "GET",
    true
  );


/**
 * 添加编辑常用联系人(票务共用)
 */
export const PW_WX_AddContacts = (
    name,
    card_type_id,
    card_type,
    card_num,
    is_children,
    top_id = ""
  ) =>
  axios(
    ACTIVE_URL + "/api/top_contacts", {
      p: PLAT,
      api_token: localStorage.app_token,
      name,
      card_type_id, //证件类型id 1身份证
      card_type, //证件类型  身份证
      card_num, //证件号码
      is_children, //1成人 2儿童
      top_id //常用联系人id （编辑的时候传）
    },
    "POST",
    true
  );

/**
 * 常用联系人列表(票务共用)
 */
export const PW_WX_ContactsList = () =>
  axios(
    ACTIVE_URL + "/api/top_contacts_list", {
      p: PLAT,
      api_token: localStorage.app_token
    },
    "GET",
    true
  );

/**
 * 删除常用联系人(票务共用)
 */
export const PW_WX_ContactsDelete = top_id =>
  axios(
    ACTIVE_URL + "/api/top_contacts_del", {
      p: PLAT,
      api_token: localStorage.app_token,
      top_id: top_id
    },
    "GET",
    true
  );

/**
 * 散客门票预约
 */
export const PW_WX_TicketOrder = (
    toi_username,
    toi_cardtype_id,
    toi_card_num,
    pt_id,
    td_tp_id,
    td_tp_ids,
    car_no,
    toi_child_count = []
  ) =>
  axios(
    PW_URL + "/api/ticketorder", {
      p: PLAT,
      api_token: localStorage.app_token,
      pt_id, //门票类型id    array
      td_tp_id, //基础门票id
      toi_username, // 姓名    array
      toi_cardtype_id, //证件类型id    1身份证   array
      toi_card_num, //证件号码  array
      td_tp_ids, //每一组用英文逗号分隔多个门票  array  可选
      car_no, //车牌号  可选
      toi_child_count //随行儿童    array  可选
    },
    "POST",
    true
  );

/**
 * 散客预约记录
 */
export const PW_WX_TicketOrderList = (limit, page) =>
  axios(
    PW_URL + "/api/my/ticketorder", {
      p: PLAT,
      api_token: localStorage.app_token,
      page,
      limit
    },
    "GET",
    true
  );

/**
 * 散客预约详情
 */
export const PW_WX_TicketOrderDetail = torder_id =>
  axios(
    PW_URL + "/api/my/ticketorder/detail", {
      p: PLAT,
      api_token: localStorage.app_token,
      torder_id
    },
    "GET",
    true
  );
/**
 * 取消订单
 */
export const PW_WX_TicketOrderCancel = torder_id =>
  axios(
    PW_URL + "/api/ticketorder/cancel", {
      p: PLAT,
      api_token: localStorage.app_token,
      torder_id
    },
    "GET",
    true
  );
/**
 * 退票
 */
export const PW_WX_TicketOrderRefund = titem_ids =>
  axios(
    PW_URL + "/api/ticketorder/refund", {
      p: PLAT,
      api_token: localStorage.app_token,
      titem_ids
    },
    "POST",
    true
  );
/**
 * 订单支付
 */
export const PW_WX_TicketOrderPay = (torder_id, payment_id) =>
  axios(
    PW_URL + "/api/ticketorder/pay", {
      p: PLAT,
      api_token: localStorage.app_token,
      torder_id, //订单id
      payment_id, //支付类型，1：微信，2：微信小程序
    },
    "POST",
    true
  );

/**
 * 订单状态
 */
export const PW_WX_TicketOrderStatus = (torder_id) =>
  axios(
    PW_URL + '/api/my/ticketorder/order_status', {
      p: PLAT,
      api_token: localStorage.app_token,
      torder_id
    })
