export default [{
  path: "/pw",
  name: "pw",
  redirect: "/pw/person/index",
  meta: {
    title: "票务预约",
    needLogin: true
  },
  component: resolve => require(["@/pages/pw/index.vue"], resolve),
  children: [{
      path: "/pw/person/index",
      name: "pw_wx_choose_date",
      component: resolve => require(["@/pages/pw/choose_date.vue"], resolve),
      meta: {
        title: "选择参观日期",
        nav: true,
        footer: false,
        needLogin: false
      }
    },
    {
      path: "/pw/person/fillinfo",
      name: "pw_wx_fillinfo",
      component: resolve => require(["@/pages/pw/fillinfo.vue"], resolve),
      meta: {
        title: "添加参观者",
        nav: true,
        footer: false,
        needLogin: true
      }
    },
    {
      path: "/pw/person/contact",
      name: "pw_wx_contact",
      component: resolve => require(["@/pages/pw/contact.vue"], resolve),
      meta: {
        title: "常用联系人",
        nav: true,
        footer: false,
        needLogin: true
      }
    },
    {
      path: "/pw/person/info",
      name: "pw_wx_info",
      component: resolve => require(["@/pages/pw/info.vue"], resolve),
      meta: {
        title: "填写信息",
        nav: true,
        footer: false,
        needLogin: true
      }
    },
    {
      path: "/pw/person/order_pay",
      name: "pw_wx_order_pay",
      component: resolve => require(["@/pages/pw/order_pay.vue"], resolve),
      meta: {
        title: "支付订单",
        nav: true,
        footer: false,
        needLogin: true
      }
    },
    {
      path: "/pw/person/order_list",
      name: "pw_wx_order_list",
      component: resolve => require(["@/pages/pw/order_list.vue"], resolve),
      meta: {
        title: "订单列表",
        nav: true,
        footer: false,
        needLogin: true
      }
    },
    {
      path: "/pw/person/order_detail",
      name: "pw_wx_order_detail",
      component: resolve => require(["@/pages/pw/order_detail.vue"], resolve),
      meta: {
        title: "订单详情",
        nav: true,
        footer: false,
        needLogin: true
      }
    },
    {
      path: "/pw/person/success",
      name: "pw_wx_success",
      component: resolve => require(["@/pages/pw/success.vue"], resolve),
      meta: {
        title: "票务预约",
        nav: true,
        footer: false,
        needLogin: true
      }
    }
  ]
}];
