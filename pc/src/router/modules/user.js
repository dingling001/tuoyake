export default [
  // 个人中心
  {
    path: "/user",
    name: "user",
    redirect: '/center',
    component: () => import('../../pages/user/index.vue'),
    children: [{
        path: '/center',
        name: "center",
        component: resolve => require(["../../pages/user/center"], resolve)
      }, // 活动报名
      {
        path: "/uactive",
        name: "uactive",
        component: resolve => require(["../../pages/user/uactive"], resolve)
      },
      {
        path: "/setting",
        name: "setting",
        component: resolve => require(["../../pages/user/setting"], resolve)
      },
      {
        path: "/uv",
        name: "uv",
        component: resolve => require(["../../pages/user/voluteer"], resolve)
      },
      {
        path: "/msg",
        name: "msg",
        component: resolve => require(["../../pages/user/msg"], resolve)
      },
      {
        path: "/favor",
        name: "favor",
        component: resolve => require(["../../pages/user/favor"], resolve)
      },
      // 电影票

      {
        path: "/umovie",
        name: "umovie",
        meta: {
          title: "电影票"
        },
        component: resolve => require(["../../pages/user/umovie"], resolve)
      },
      // 讲解预约
      {
        path: "/ureport",
        name: "ureport",
        meta: {
          title: "讲解预约"
        },
        component: resolve => require(["../../pages/user/ureport"], resolve)
      },
      // 会员
      {
        path: "/vip",
        name: "vip",
        meta: {
          title: "我的会员"
        },
        component: resolve => require(["../../pages/user/vip"], resolve)
      },
      // 个人票务
      {
        path: "/person",
        name: "person",
        meta: {
          title: "个人票务预约信息"
        },
        component: resolve => require(["../../pages/user/uticket"], resolve)
      },
      // 团体票务
      {
        path: '/team',
        name: 'uteam',
        redirect: '/team/info',
        component: resolve => require(["../../pages/user/uticketTeam"], resolve),
        meta: {
          title: "团体票务预约信息",
        },
        children: [{
            path: 'info',
            name: 'teambaseinfo',
            meta: {
              keepAlive: true,
            },
            component: () => import('../../pages/pw/team/center/baseinfo.vue'),
          },
          {
            path: 'record',
            name: 'teamrecord',
            meta: {
              keepAlive: false,
            },
            component: () => import('../../pages/pw/team/center/record.vue'),
          }
        ],
      },
      // 我的志愿者
      {
        path: "/uvol",
        name: "uvolunteer",
        component: resolve => require(["../../pages/user/uvolunteer"], resolve)
      }
    ]
  },
  // 会员
  {
    path: "/uvip",
    name: "uvip",
    meta: {
      title: "注册会员"
    },
    component: resolve => require(["../../pages/user/uvip"], resolve)
  },
  {
    path: "/rvip",
    name: "rvip",
    meta: {
      title: "注册会员"
    },
    component: resolve => require(["../../pages/user/rvip"], resolve)
  },
  {
    path: "/vipC",
    name: "vipC",
    meta: {
      title: "注册会员"
    },
    component: resolve => require(["../../pages/user/vipC"], resolve)
  },
  // 会员修改个人信息
  {
    path: "/vipR",
    name: "vipR",
    meta: {
      title: "我的会员"
    },
    component: resolve => require(["../../pages/user/vipR"], resolve)
  },
];
