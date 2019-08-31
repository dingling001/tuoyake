export default [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      footer: false,
      nav:false
    },
    component: resolve => require(["@/pages/user/login.vue"], resolve)
  },
  {
    path: "/center",
    name: "center",
    meta: {
      title: "个人中心",
      footer: false,
      needLogin: true
    },
    component: resolve => require(["@/pages/user/center.vue"], resolve)
  },
  {
    path: "/msg",
    name: "msg",
    meta: {
      title: "消息",
      footer: false,
      needLogin: true
    },
    component: resolve => require(["@/pages/user/msg.vue"], resolve)
  },
  {
    path: "/order",
    name: "order",
    meta: {
      title: "",
      footer: false,
      nav: false,
      needLogin: true
    },
    component: resolve => require(["@/pages/user/order.vue"], resolve)
  },
  {
    path: "/fav",
    name: "fav",
    meta: {
      title: "我的收藏",
      footer: false,
      needLogin: true
    },
    component: resolve => require(["@/pages/user/fav.vue"], resolve)
  },
  {
    path: "/travel",
    name: "travel",
    meta: {
      title: "行程单",
      footer: false,
      needLogin: true
    },
    component: resolve => require(["@/pages/user/travel.vue"], resolve)
  },
  {
    path: "/wxLogin",
    name: "wxLogin",
    meta: {
      title: "",
      nav: false,
      footer: false
    },
    component: resolve => require(["@/pages/user/wxLogin.vue"], resolve)
  }
];
