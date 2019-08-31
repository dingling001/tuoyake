export default [
  {
    path: "/intro",
    name: "intro",
    component: resolve => require(["@/pages/home/intro.vue"], resolve),
    meta: {
      title: "走进海博"
    }
  },
  {
    path: "/search",
    name: "search",
    component: resolve => require(["@/pages/home/search.vue"], resolve),
    meta: {
      title: "搜索",
      footer: false,
      nav: false,
      keepAlive: false
    }
  },
  {
    path: "/adetail",
    name: "adetail",
    component: resolve => require(["@/pages/home/adetail.vue"], resolve),
    meta: {
      title: "资讯详情",
      keepAlive: false
    }
  },
  {
    path: "/introL",
    name: "introL",
    component: resolve => require(["@/pages/home/introL.vue"], resolve),
    meta: {
      title: "走进海博"
    }
  },
  {
    path: "/about",
    name: "about",
    component: resolve => require(["@/pages/home/about.vue"], resolve),
    meta: {
      title: "走进海博"
    }
  },
  {
    path: "/org",
    name: "org",
    component: resolve => require(["@/pages/home/org.vue"], resolve),
    meta: {
      title: "机构设置"
    }
  },
  {
    path: "/teamLeader",
    name: "teamLeader",
    component: resolve => require(["@/pages/home/team.vue"], resolve),
    meta: {
      title: "机构设置"
    }
  },
  {
    path: "/job",
    name: "job",
    component: resolve => require(["@/pages/home/job.vue"], resolve),
    meta: {
      title: "机构设置"
    }
  },
  {
    path: "/guide",
    name: "guide",
    component: resolve => require(["@/pages/home/guide.vue"], resolve),
    meta: {
      title: "参观服务"
    }
  },
  {
    path: "/traff",
    name: "traff",
    component: resolve => require(["@/pages/home/traff.vue"], resolve),
    meta: {
      title: "参观服务"
    }
  },
  {
    path: "/can",
    name: "can",
    component: resolve => require(["@/pages/home/can.vue"], resolve),
    meta: {
      title: "参观服务"
    }
  },
  {
    path: "/around",
    name: "around",
    component: resolve => require(["@/pages/home/around.vue"], resolve),
    meta: {
      title: "参观服务"
    }
  },
  {
    path: "/map",
    name: "map",
    component: resolve => require(["@/pages/home/map.vue"], resolve),
    meta: {
      title: "参观服务",
      nav: false,
      footer: false
    }
  },
  {
    path: "/video",
    name: "video",
    component: resolve => require(["@/pages/home/video.vue"], resolve),
    meta: {
      title: "国家海洋博物馆",
      nav: false,
      footer: false
    }
  },
  {
    path: "/exbL",
    name: "exbL",
    component: resolve => require(["@/pages/home/exbL.vue"], resolve),
    meta: {
      title: "展览"
    }
  },
  {
    path: "/cexbL",
    name: "cexbL",
    component: resolve => require(["@/pages/home/cexbL.vue"], resolve),
    meta: {
      title: "展览"
    }
  },
  {
    path: "/oexbL",
    name: "oexbL",
    component: resolve => require(["@/pages/home/oexbL.vue"], resolve),
    meta: {
      title: "展览"
    }
  },
  {
    path: "/vexbL",
    name: "vexbL",
    component: resolve => require(["@/pages/home/vexbL.vue"], resolve),
    meta: {
      title: "展览"
    }
  },
  {
    path: "/eDetail",
    name: "eDetail",
    component: resolve => require(["@/pages/home/eDetail.vue"], resolve),
    meta: {
      title: "展览"
    }
  },
  {
    path: "/collection",
    name: "collection",
    component: resolve => require(["@/pages/home/collection.vue"], resolve),
    meta: {
      title: "馆藏精粹",
      keepAlive: false
    }
  },
  {
    path: "/cDetail",
    name: "cDetail",
    component: resolve => require(["@/pages/home/cDetail.vue"], resolve),
    meta: {
      title: "展品详情",
      keepAlive: false
    }
  },
  {
    path: "/class",
    name: "class",
    component: resolve => require(["@/pages/home/class.vue"], resolve),
    meta: {
      title: "海博大讲堂",
      keepAlive: false
    }
  },
  {
    path: "/baiL",
    name: "bai",
    component: resolve => require(["@/pages/home/bai.vue"], resolve),
    meta: {
      title: "海博大讲堂",
      keepAlive: false
    }
  },
  {
    path: "/baiD",
    name: "baiD",
    component: resolve => require(["@/pages/home/baiD.vue"], resolve),
    meta: {
      title: "海洋百科",
      keepAlive: false
    }
  },
  {
    path: "/answer",
    name: "answer",
    component: resolve => require(["@/pages/home/answer.vue"], resolve),
    meta: {
      title: "海博大讲堂",
      keepAlive: false,
      footer: false
    }
  },
  {
    path: "/question",
    name: "question",
    component: resolve => require(["@/pages/home/question.vue"], resolve),
    meta: {
      title: "互动问答",
      keepAlive: false,
      footer: false
    }
  },
  {
    path: "/baiK",
    name: "baiK",
    component: resolve => require(["@/pages/home/baiK.vue"], resolve),
    meta: {
      title: "海洋百科详情",
      keepAlive: false,
      footer: false
    }
  },
  {
    path: "/detail",
    name: "detail",
    component: resolve => require(["@/pages/home/detail.vue"], resolve),
    meta: {
      title: "每周一图详情",
      keepAlive: false,
      footer: true
    }
  },
  {
    path: "/weekL",
    name: "weekL",
    component: resolve => require(["@/pages/home/weekL.vue"], resolve),
    meta: {
      title: "每周一图",
      nav: true,
      keepAlive: false,
      footer: true
    }
  },
  {
    path: "/wen",
    name: "wen",
    component: resolve => require(["@/pages/home/wen.vue"], resolve),
    meta: {
      title: "海博文创",
      keepAlive: false,
      footer:false
    }
  }, 
  {
    path: "/yingyuan",
    name: "yingyuan",
    component: resolve => require(["@/pages/home/yingyuan.vue"], resolve),
    meta: {
      title: "影院影讯",
      keepAlive: false,
      footer:false
    }
  },
  {
    path: "/huiyuan",
    name: "huiyuan",
    component: resolve => require(["@/pages/home/huiyuan.vue"], resolve),
    meta: {
      title: "会员",
      keepAlive: false,
      footer:false
    }
  },
  {
    path: "/jian",
    name: "jian",
    component: resolve => require(["@/pages/home/jian.vue"], resolve),
    meta: {
      title: "即将上线",
      keepAlive: false
    }
  },{
    path: "/advice",
    name: "advice",
    component: resolve => require(["@/pages/home/advice.vue"], resolve),
    meta: {
      title: "意见反馈",
      keepAlive: false,
      footer: false
    }
  } ,{
    path: "/jiangjie",
    name: "jiangjie",
    component: resolve => require(["@/pages/home/jiangjie.vue"], resolve),
    meta: {
      title: "讲解预约",
      keepAlive: false,
      footer:false
    }
  },
];
