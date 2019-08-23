export default [
  {
    path: "/film",
    name: "",
    redirect: '/film/film_index',
    meta: {
      cur: 6,
      title: "影院影讯"
    },
    component: resolve => require(["../../pages/film/film_index"], resolve)
  },
  {
    path: "/film/film_index",
    name: "film_index",
    meta: {
      cur: 6,
      title: "影院影讯"
    },
    component: resolve => require(["../../pages/film/film_index"], resolve)
  },
  {
    path: "/film/film_date",
    name: "film_date",
    meta: {
      cur: 6,
      title: "选择影片场次"
    },
    component: resolve => require(["../../pages/film/film_date"], resolve)
  },
  {
    path: "/film/film_num",
    name: "film_num",
    meta: {
      cur: 6,
      title: "选择影片类型及数量"
    },
    component: resolve => require(["../../pages/film/film_num"], resolve)
  },

  {
    path: "/film/film_seat",
    name: "film_seat",
    meta: {
      cur: 6,
      title: "选择座位"
    },
    component: resolve => require(["../../pages/film/film_seat"], resolve)
  },
  {
    path: "/film/film_confirm",
    name: "film_confirm",
    meta: {
      cur: 6,
      title: "确认信息"
    },
    component: resolve => require(["../../pages/film/film_confirm"], resolve)
  },
  {
    path: "/film/film_pay",
    name: "film_pay",
    meta: {
      cur: 6,
      title: "支付"
    },
    component: resolve => require(["../../pages/film/film_pay"], resolve)
  },
  {
    path: "/film/film_success",
    name: "film_success",
    meta: {
      cur: 6,
      title: "预约成功"
    },
    component: resolve => require(["../../pages/film/film_success"], resolve)
  },
  {
    path: "/film/film_order",
    name: "film_order",
    meta: {
      cur: 6,
      title: "订单详情"
    },
    component: resolve => require(["../../pages/film/film_order"], resolve)
  },
  {
    path: "/film/film_lang",
    name: "film_lang",
    meta: {
      cur: 5,
      title: "影院影讯"
    },
    component: resolve => require(["../../pages/film/film_lang"], resolve)
  },
  {
    path: "/film/film_lang_detail",
    name: "film_lang_detail",
    meta: {
      cur: 5,
      title: "影片详情"
    },
    component: resolve => require(["../../pages/film/film_lang_detail"], resolve)
  }
];
