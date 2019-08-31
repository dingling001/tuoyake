export default [
  {
    path: "/vip",
    name: "vip",
    component: resolve => require(["../../pages/vip/vip.vue"], resolve),
    meta: {
      title: "会员申请",
      needLogin: true,
      footer: false
    }
  },
  {
    path: "/vipW",
    name: "vipW",
    component: resolve => require(["../../pages/vip/vipW.vue"], resolve),
    meta: {
      title: "填写申请信息",
      needLogin: true,
      footer: false
    }
  },
  {
    path: "/vipC",
    name: "vipC",
    component: resolve => require(["../../pages/vip/vipC.vue"], resolve),
    meta: {
      title: "线下认证",
      needLogin: true,
      footer: false
    }
  },
  {
    path: "/vipS",
    name: "vipS",
    component: resolve => require(["../../pages/vip/vipS.vue"], resolve),
    meta: {
      title: "我的会员",
      needLogin: true,
      footer: false
    }
  },
  {
    path: "/vipR",
    name: "vipR",
    component: resolve => require(["../../pages/vip/vipR.vue"], resolve),
    meta: {
      title: "修改资料",
      needLogin: true,
      footer: false
    }
  }
];
