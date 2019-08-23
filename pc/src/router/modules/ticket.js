/**
 * 个人预约
 * @type {Array}
 */
const personTickRouter = [{
    path: "/pw/person/index",
    name: "personindex",
    meta: {
      // cur: 1,
      title: "个人预约"
    },
    component: resolve => require(["../../pages/pw/person/index"], resolve)
  },
  {
    path: "/pw/person/fillinfo",
    name: "personfillinfo",
    meta: {
      // cur: 1,
      title: "填写预约信息"
    },
    component: resolve => require(["../../pages/pw/person/addPerson"], resolve)
  },
  {
    path: "/pw/person/confirm_order",
    name: "confirm_order",
    meta: {
      // cur: 1,
      title: "确认订单信息"
    },
    // component: resolve => require(["../../pages/pw/person/confirm_order"], resolve)
    component: () => import('../../pages/pw/person/confirmOrder')
  },
  {
    path: '/pw/person/pay',
    name: 'order_pay',
    meta: {
      title: '支付'
    },
    component: () => import('../../pages/pw/person/pay.vue')
  },
  {
    path: '/pw/person/success',
    name: 'orderSuccess',
    meta: {
      title: '预定成功'
    },
    component: () => import('../../pages/pw/person/success.vue')
  },
  {
    path: '/pw/person/order_detail',
    name: 'orderDetail',
    meta: {
      title: '订单详情'
    },
    component: () => import('../../pages/pw/person/orderDetial.vue')
  },
  // 退票公用订单详情的组件
  {
    path: '/pw/person/refund',
    name: 'refund',
    meta: {
      title: '退票'
    },
    component: () => import('../../pages/pw/person/orderDetial.vue'),
  }
]


/**
 * 团体预约
 * @type {Array}
 */
const teamTickRouter = [{
    path: '/pw/team',
    redirect: '/pw/team/index',
  },
  {
    path: '/pw/team/register', //已结
    name: 'team_register',
    component: () => import('../../pages/pw/team/register.vue'),
    meta: {
      tag: '团队注册', //
    }
  },
  {
    path: '/pw/team/register_result', //已结
    name: 'team_register_result',
    component: () => import('../../pages/pw/team/registerResult.vue'),
    meta: {
      tag: '团队注册', //团体注册结果
    }
  },
  {
    path: '/pw/team/index',
    name: 'team_index',
    meta: {
      title: "团队预约", //团体预约日历
    },
    component: resolve => require(["../../pages/pw/team/index"], resolve)
  },
  {
    path: '/pw/team/fillinfo',
    name: 'team_fillinfo',
    component: () => import('../../pages/pw/team/fillInfo.vue'),
    meta: {
      tag: '团队信息填写', //填写预约信息
    }
  },
  {
    path: '/pw/team/review',
    name: 'team_review',
    component: () => import('../../pages/pw/team/review.vue'),
    meta: {
      tag: '团体审核', //确认预约信息
    }
  },
  {
    //提交成功
    path: '/pw/team/success',
    name: 'team_success',
    component: () => import('../../pages/pw/team/success.vue'),
  },
  {
    //审核结果
    path: '/pw/team/order_detail',
    name: 'team_order_detail',
    component: () => import('../../pages/pw/team/orderDetail.vue'),
  },
  {
    //订单支付
    path: '/pw/team/order_pay',
    name: 'team_order_pay',
    component: () => import('../../pages/pw/team/orderPay.vue'),
  },
];


// 测试
const test = [{
  path: '/test',
  component: () => import('../../pages/pw/person/orderDetial.vue'),
}];



export default [
  ...personTickRouter,
  ...teamTickRouter,
  ...test,
];
