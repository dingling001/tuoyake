export default [{
  path: '/explain',
  name: 'explain',
  redirect: '/explain/explain_date',
  meta: {
    title: '讲解预约'
  },
  component: resolve => require(['@/pages/explain/index.vue'], resolve),
  children: [
    {
      path: 'explain_date',
      name: 'explain_date',
      component: resolve => require(['@/pages/explain/explain_date.vue'], resolve),
      meta: {
        title: '选择讲解日期',
        nav: true,
        footer: false
      }
    },
    {
      path: 'explain_info',
      name: 'explain_info',
      component: resolve => require(['@/pages/explain/explain_info.vue'], resolve),
      meta: {
        title: '填写信息',
        nav: true,
        footer: false,
        needLogin: true,
      }
    },
    {
      path: 'explain_confirm',
      name: 'explain_confirm',
      component: resolve => require(['@/pages/explain/explain_confirm.vue'], resolve),
      meta: {
        title: '确认信息',
        nav: true,
        footer: false,
        needLogin: true,
      }
    },
    {
      path: 'explain_pay',
      name: 'explain_pay',
      component: resolve => require(['@/pages/explain/explain_pay.vue'], resolve),
      meta: {
        title: '支付订单',
        nav: true,
        footer: false,
        needLogin: true,
      }
    },
    {
      path: 'explain_fillinfo',
      name: 'explain_fillinfo',
      component: resolve => require(['@/pages/explain/explain_fillinfo.vue'], resolve),
      meta: {
        title: '新增联系人',
        nav: true,
        footer: false,
        needLogin: true,
      }
    },
    {
      path: 'explain_contact',
      name: 'explain_contact',
      component: resolve => require(['@/pages/explain/explain_contact.vue'], resolve),
      meta: {
        title: '编辑联系人信息',
        nav: true,
        footer: false,
        needLogin: true,
      }
    },
    {
      path: 'order_list',
      name: 'order_list',
      component: resolve => require(['@/pages/explain/order_list.vue'], resolve),
      meta: {
        title: '订单列表',
        nav: true,
        footer: false,
        needLogin: true,
      }
    },
    {
      path: 'explain_detail',
      name: 'explain_detail',
      component: resolve => require(['@/pages/explain/explain_detail.vue'], resolve),
      meta: {
        title: '订单详情',
        nav: true,
        footer: false,
        needLogin: true,
      }
    },
    {
      path: 'explain_success',
      name: 'explain_success',
      component: resolve => require(['@/pages/explain/explain_success.vue'], resolve),
      meta: {
        title: '支付成功',
        nav: true,
        footer: false,
        needLogin: true,
      }
    }
  ]
}
]
