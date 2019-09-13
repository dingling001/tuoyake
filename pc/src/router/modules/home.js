export default [
  {
    path: "/adetail",
    name: "adetail",
    meta: {
      cur: 1
    },
    component: resolve => require(["../../pages/home/adetail"], resolve)
  },
  {
    path: "/search",
    name: "search",
    meta: {
      cur: 0
    },
    component: resolve => require(["../../pages/home/search"], resolve)
  },
  {
    path: "/list",
    name: "list",
    meta: {
      cur: 1
    },
    component: resolve => require(["../../pages/home/list"], resolve)
  },
  // 机构组织
  {
    path: "/org",
    name: "org",
    meta: {
      cur: 2
    },
    component: resolve => require(["../../pages/home/org"], resolve)
  },
  // 参观服务
  {
    path: "/guide",
    name: "guide",
    meta: {
      cur: 2
    },
    component: resolve => require(["../../pages/home/guide"], resolve)
  },
  //参观服务详情页
  {
    path: "/vDetail",
    name: "vDetail",
    meta: {
      cur: 2
    },
    component: resolve => require(["../../pages/home/vDetail"], resolve)
  },
  {
    path: "/exb",
    name: "exb",
    meta: {
      cur: 3
    },
    component: resolve => require(["../../pages/home/exb"], resolve)
  },
  {
    path: "/oexbL",
    name: "oexbL",
    meta: {
      cur: 3
    },
    component: resolve => require(["../../pages/home/oexbL"], resolve)
  },
  // 最新展览列表
  {
    path: "/exbL",
    name: "exbL",
    meta: {
      cur: 3
    },
    component: resolve => require(["../../pages/home/exbL"], resolve)
  },
  // 常设展览列表
  {
    path: "/cexbL",
    name: "cexbL",
    meta: {
      cur: 3
    },
    component: resolve => require(["../../pages/home/cexbL"], resolve)
  },
  // 展览回顾列表
  {
    path: "/vexbL",
    name: "vexbL",
    meta: {
      cur: 3
    },
    component: resolve => require(["../../pages/home/vexbL"], resolve)
  },
  {
    path: "/eDetail",
    name: "eDetail",
    meta: {
      cur: 3
    },
    component: resolve => require(["../../pages/home/eDetail"], resolve)
  },
  // 馆藏精粹
  {
    path: "/collection",
    name: "collection",
    meta: {
      cur: 4
    },
    component: resolve => require(["../../pages/home/collection"], resolve)
  },
  // 展品详情
  {
    path: "/cDetail",
    name: "cDetail",
    meta: {
      cur: 4
    },
    component: resolve => require(["../../pages/home/cDetail"], resolve)
  },
  {
    path: "/wen",
    name: "wen",
    meta: {
      footer: false,
      cur:6,
    },
    component: resolve => require(["../../components/wen"], resolve)
  },
   {
    path: "/activeW",
    name: "activeW",
    meta: {
      footer: false,
      cur:5
    },
    component: resolve => require(["../../pages/home/activeW"], resolve)
  },
  {
    path: "/jian",
    name: "jian",
    component: resolve => require(["../../pages/home/jianshe"], resolve),
    meta: {
      footer: false,
    },
  },
  {
    path: "/team",
    name: "team",
    component: resolve => require(["../../pages/home/team"], resolve),
    meta: {
      footer: false,
      cur:0,
    },
  },
  {
    path: "/jiangjie",
    name: "jiangjie",
    component: resolve => require(["../../pages/home/jiangjie"], resolve),
    meta: {
      footer: false,
      cur:0,
    },
  },
  {
    path: "/class",
    name: "class",
    meta: {
      cur: 7
    },
    component: resolve => require(["../../pages/home/class"], resolve)
  },
  {
    path: "/detail",
    name: "detail",
    meta: {
      cur: 7
    },
    component: resolve => require(["../../pages/home/detail"], resolve)
  },
  {
    path: "/feedback",
    name: "feedback",
    component: resolve => require(["../../pages/home/feedback"], resolve)
  },
  // 海洋百科列表页
  {
    path: "/baiL",
    name: "baiL",
    meta: {
      cur: 7
    },
    component: resolve => require(["../../pages/home/baiL"], resolve)
  },
   // 海洋百科列表页
   {
    path: "/baiD",
    name: "baiD",
    meta: {
      cur: 7
    },
    component: resolve => require(["../../pages/home/baiD"], resolve)
  },
  {
    path: "/weekL",
    name: "weekL",
    meta: {
      cur: 7
    },
    component: resolve => require(["../../pages/home/weekL"], resolve)
  },

  {
    path: "/question",
    name: "question",
    meta: {
      cur: 7
    },
    component: resolve => require(["../../pages/home/question"], resolve)
  }
];
