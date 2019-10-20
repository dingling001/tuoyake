export default [
    {
        path: '/my',
        name: 'my',
        component: resolve => require(["../../pages/my/my"], resolve),
        meta: {
            title: "我的",
            showF: true,
            showH: false
        },
    },
    {
        path: '/myset',
        name: 'myset',
        component: resolve => require(["../../pages/my/myset"], resolve),
        meta: {
            title: "个人设置",
            showF: false,
            showH: true,
            needLogin: true
        },
    },
    {
        path: '/myCoupon',
        name: 'myCoupon',
        component: resolve => require(["../../pages/my/myCoupon"], resolve),
        meta: {
            title: "我的优惠券",
            showF: false,
            showH: true,
            needLogin: true
        },
    },
    {
        path: '/myCoupondetail',
        name: 'myCoupondetail',
        component: resolve => require(["../../pages/my/myCoupondetail"], resolve),
        meta: {
            title: "优惠券详情",
            showF: false,
            showH: true,
            needLogin: true
        },
    },
    {
        path: '/myApplication',
        name: 'myApplication',
        component: resolve => require(["../../pages/my/myApplication"], resolve),
        meta: {
            title: "我的报名",
            showF: false,
            showH: true,
            needLogin: true
        },
    },
    {
        path: '/mySocial',
        name: 'mySocial',
        component: resolve => require(["../../pages/my/mySocial"], resolve),
        meta: {
            title: "社交账号",
            showF: false,
            showH: true,
            needLogin: true
        },
    },
    {
        path: '/myCollect',
        name: 'myCollect',
        component: resolve => require(["../../pages/my/myCollect"], resolve),
        meta: {
            title: "我的收藏",
            showF: false,
            showH: true,
            needLogin: true,
            keepAlive:true
        },
    },
    {
        path: '/myOrder',
        name: 'myOrder',
        component: resolve => require(["../../pages/my/myOrder"], resolve),
        meta: {
            title: "我的订单",
            showF: false,
            showH: true,
            needLogin: true
        },
    },
    {
        path: '/myPoints',
        name: 'myPoints',
        component: resolve => require(["../../pages/my/myPoints"], resolve),
        meta: {
            title: "我的积分",
            showF: false,
            showH: false,
            needLogin: true
        },
    },
    {
        path: '/myFeedback',
        name: 'myFeedback',
        component: resolve => require(["../../pages/my/myFeedback"], resolve),
        meta: {
            title: "意见反馈",
            showF: false,
            showH: true,
            needLogin: true
        },
    },
    {
        path: '/myVersion',
        name: 'myVersion',
        component: resolve => require(["../../pages/my/myVersion"], resolve),
        meta: {
            title: "版本信息",
            showF: false,
            showH: true,
            needLogin: true
        },
    },
    {
        path: '/myPlatform',
        name: 'myPlatform',
        component: resolve => require(["../../pages/my/myPlatform"], resolve),
        meta: {
            title: "关于平台",
            showF: false,
            showH: true,
            needLogin: false
        },
    },
    {
        path: '/download',
        name: 'download',
        component: resolve => require(["../../components/download"], resolve),
        meta: {
            title: "APP下载",
            showF: false,
            showH: true,
            needLogin: false,
            iconfont:'iconguanbi-copy'
        },
    },
]