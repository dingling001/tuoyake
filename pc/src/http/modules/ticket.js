import axios from "../api";

//----------------------------------------------------------------
//个人票务
//----------------------------------------------------------------
export const Calendar = () =>
  axios(
    STATIC_PW_URL + "/api/ticket/calendar", {
      p: "w",
    },
    "GET",
    true
  );

/**
 * 票务须知
 */
export const getTicksNotice = () =>
  axios(
    STATIC_PW_URL + "/api/ticket/text_tip", {
      p: "w"
    },
    "GET",
    true
  );

// 获取门票信息
export const getAllTicks = (td_tp_id) =>
  axios(
    STATIC_PW_URL + "/api/ticket/detail", {
      p: "w",
      td_tp_id,
    },
    "GET",
    true
  );
// 提交预定门票的个人信息和门票种类
export const postBookInfo = (api_token, td_tp_id, pt_id, toi_username, toi_cardtype_id, toi_card_num, td_tp_ids = [], toi_child_count = []) =>
  axios(
    STATIC_PW_URL + '/api/ticketorder', {
      p: 'w',
      api_token,
      td_tp_id,
      pt_id,
      toi_username,
      toi_cardtype_id,
      toi_card_num,
      td_tp_ids,
      toi_child_count
    },
    'POST',
    true
  );

// 获取预定详情，订单详情
export const getBookInfo = (api_token, torder_id) => {
  return axios(
    STATIC_PW_URL + '/api/my/ticketorder/detail', {
      p: 'w',
      api_token,
      torder_id
    },
    'GET',
    true
  );
};

// 获取订单状态

export const getTickBookStatus = (api_token, torder_id) => {
  return axios(STATIC_PW_URL + '/api/my/ticketorder/order_status', {
    p: 'w',
    api_token,
    torder_id,
  }, 'GET', true)
};

// 获取散客的订单记录
export const getMyOrderRcord = (api_token, order_status, page = 1, limit = 20) => {
  return axios(
    STATIC_PW_URL + '/api/my/ticketorder', {
      p: 'w',
      api_token,
      order_status,
      page,
      limit
    }, 'GET', true)
};

// 获取散客的订单详情
export const getMyOrderDetial = (api_token, torder_id) => {
  return axios(
    STATIC_PW_URL + '/api/my/ticketorder/detail', {
      p: 'w',
      api_token,
      torder_id,
    }, 'GET', true);
};

// 订单支付
export const postMyOrderPay = (api_token, torder_id, payment_id) => {
  return axios(
    STATIC_PW_URL + '/api/ticketorder/pay', {
      p: 'w',
      api_token,
      torder_id,
      payment_id,
    }, 'POST', true);
};

// 取消订单
export const postCancelMyOrder = (api_token, torder_id) => {
  return axios(STATIC_PW_URL + '/api/ticketorder/cancel', {
    p: 'w',
    api_token,
    torder_id,
  }, 'GET', true);
};

// 退票
export const postRefundTicket = (api_token, titem_ids) => {
  return axios(STATIC_PW_URL + '/api/ticketorder/refund', {
    p: 'w',
    api_token,
    titem_ids,
  }, 'POST', true);
}


// ------------------------------------------------------------------
// 团体票务
// ------------------------------------------------------------------
// 
// 团体类型列表
export const PW_PC_teamTypeList = () => axios(
  STATIC_PW_URL + "/api/teamusers/teamtype", {
    p: "w",
  },
  "GET",
  true
);

// 团体注册须知
export const PW_PC_teamRegisterTextTip = () => axios(
  STATIC_PW_URL + "/api/teamusers/text_tip", {
    p: "w",
  },
  "GET",
  true
);

// 团体信息
export const PW_PC_teamInfo = (api_token) => axios(
  STATIC_PW_URL + "/api/teamusers/apply_info", {
    p: "w",
    api_token
  },
  "GET",
  true
);

//团体日历
export const Calendar_team = (api_token) =>
  axios(
    STATIC_PW_URL + "/api/teamticket/calendar", {
      p: "w",
      api_token
    },
    "GET",
    true
  );

//团体须知
export const PW_PC_teamTextTip = () =>
  axios(
    STATIC_PW_URL + "/api/teamticket/text_tip", {
      p: "w",
    },
    "GET",
    true
  );


//团体门票详情
export const PW_PC_teamTicketD = (api_token, td_tp_id) =>
  axios(
    STATIC_PW_URL + "/api/teamticket/detail", {
      p: "w",
      api_token,
      td_tp_id
    },
    "GET",
    true
  );

//团体预约记录
export const PW_PC_teamTicketOrderList = (api_token, limit, page, order_status) =>
  axios(
    STATIC_PW_URL + "/api/my/teamticketorder", {
      p: "w",
      api_token,
      limit,
      page,
      order_status
    },
    "GET",
    true
  );

//团体预约详情
export const PW_PC_teamTicketOrderD = (api_token, torder_id) =>
  axios(
    STATIC_PW_URL + "/api/my/teamticketorder/detail", {
      p: "w",
      api_token,
      torder_id
    },
    "GET",
    true
  );

//团体预约名单列表
export const PW_PC_teamTicketOrderDL = (api_token, torder_id) =>
  axios(
    STATIC_PW_URL + "/api/my/teamticketorder/detail_list", {
      p: "w",
      api_token,
      torder_id
    },
    "GET",
    true
  );

//团体预约订单状态
export const PW_PC_teamTicketOrderStatus = (api_token, torder_id) =>
  axios(
    STATIC_PW_URL + "/api/my/teamticketorder/order_status", {
      p: "w",
      api_token,
      torder_id
    },
    "GET",
    true
  );

//团体预约订单取消
export const PW_PC_teamTicketOrderCancel = (api_token, torder_id) =>
  axios(
    STATIC_PW_URL + "/api/teamticketorder/cancel", {
      p: "w",
      api_token,
      torder_id
    },
    "POST",
    true
  );

//团体退票
export const PW_PC_teamTicketOrderRefund = (api_token, torder_id) =>
  axios(
    STATIC_PW_URL + "/api/teamticketorder/refund", {
      p: "w",
      api_token,
      torder_id
    },
    "POST",
    true
  );
