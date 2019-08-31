export default [{
  path: '/film',
  name: 'film',
  redirect: '/film/film_index',
  meta: {
    title: '影院资讯',
    needLogin: true
  },
  component: resolve => require(['@/pages/film/index.vue'], resolve),
  children: [
    {
      path: '/film/film_index',
      name: 'film_index',
      component: resolve => require(['@/pages/film/film_index.vue'], resolve),
      meta: {
        title: '影院资讯',
        nav: true,
        footer: false,
        needLogin: true
      }
    },
    {
      path: '/film/film_start',
      name: 'film_start',
      component: resolve => require(['@/pages/film/film_start.vue'], resolve),
      meta: {
        title: '',
        nav: true,
        footer: false,
        needLogin: true
      }
    },
    {
      path: '/film/film_movie',
      name: 'film_movie',
      component: resolve => require(['@/pages/film/film_movie.vue'], resolve),
      meta: {
        title: '影院介绍',
        nav: true,
        footer: false,
        needLogin: true
      }
    },
    {
      path: '/film/film_qmovie',
      name: 'film_qmovie',
      component: resolve => require(['@/pages/film/film_qmovie.vue'], resolve),
      meta: {
        title: '影院介绍',
        nav: true,
        footer: false,
        needLogin: true
      }
    },
    {
      path: '/film/film_item',
      name: 'film_item',
      component: resolve => require(['@/pages/film/film_item.vue'], resolve),
      meta: {
        title: '',
        nav: true,
        footer: false,
        needLogin: true
      }
    },
    {
      path: '/film/film_num',
      name: 'film_num',
      component: resolve => require(['@/pages/film/film_num.vue'], resolve),
      meta: {
        title: '在线选座',
        nav: true,
        footer: false,
        needLogin: true
      }
    }, {
      path: '/film/film_qnum',
      name: 'film_qnum',
      component: resolve => require(['@/pages/film/film_qnum.vue'], resolve),
      meta: {
        title: '选择影票',
        nav: true,
        footer: false,
        needLogin: true
      }
    },
    {
      path: '/film/film_seat',
      name: 'film_seat',
      component: resolve => require(['@/pages/film/film_seat.vue'], resolve),
      meta: {
        title: '在线选座',
        nav: true,
        footer: false,
        needLogin: true
      }
    },
    {
      path: '/film/film_confirm',
      name: 'film_confirm',
      component: resolve => require(['@/pages/film/film_confirm.vue'], resolve),
      meta: {
        title: '确认信息',
        nav: true,
        footer: false,
        needLogin: true
      }
    },
    {
      path: '/film/film_pay',
      name: 'film_pay',
      component: resolve => require(['@/pages/film/film_pay.vue'], resolve),
      meta: {
        title: '支付订单',
        nav: true,
        footer: false,
        needLogin: true
      }
    },
    {
      path: '/film/film_success',
      name: 'film_success',
      component: resolve => require(['@/pages/film/film_success.vue'], resolve),
      meta: {
        title: '预约结果',
        nav: true,
        footer: false,
        needLogin: true,
      }
    },
    {
      path: '/film/film_detail',
      name: 'film_detail',
      component: resolve => require(['@/pages/film/film_detail.vue'], resolve),
      meta: {
        title: '订单详情',
        nav: true,
        footer: false,
        needLogin: true,
      }
    },
    {
      path: 'film_scene',
      name: 'film_scene',
      component: resolve => require(['@/pages/film/film_scene.vue'], resolve),
      meta: {
        title: '现场预约',
        nav: true,
        footer: false,
        needLogin: true
      }
    },
    {
      path: 'film_scene_start',
      name: 'film_scene_start',
      component: resolve => require(['@/pages/film/film_scene_start.vue'], resolve),
      meta: {
        title: '现场预约',
        nav: true,
        footer: false,
        needLogin: true
      }
    },
    {
      path: '/umovie',
      name: 'umovie',
      component: resolve => require(['@/pages/film/umovie.vue'], resolve),
      meta: {
        title: '电影票',
        nav: true,
        footer: false,
        needLogin: true
      }
    },
    {
      path: '/film_lang',
      name: 'film_lang',
      component: resolve => require(['@/pages/film/film_lang.vue'], resolve),
      meta: {
        title: '影院资讯',
        nav: true,
        footer: true,
      }
    },
    {
      path: '/film_lang_detail',
      name: 'film_lang_detail',
      component: resolve => require(['@/pages/film/film_lang_detail.vue'], resolve),
      meta: {
        title: '影院详情',
        nav: true,
        footer: true,
      }
    }
  ]
}
]
