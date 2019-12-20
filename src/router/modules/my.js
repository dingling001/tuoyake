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
            showH: false,
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
            keepAlive: true
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
            iconfont: 'iconguanbi-copy'
        },
    },
    {
        path: '/myRules',
        name: 'myRules',
        component: resolve => require(["../../pages/my/myRules"], resolve),
        meta: {
            title: "规则说明",
            showF: false,
            showH: true,
            needLogin: true,
        },
    },
    {
        path: '/myReward',
        name: 'myReward',
        component: resolve => require(["../../pages/my/myReward"], resolve),
        meta: {
            title: "奖励领取",
            showF: false,
            showH: true,
            needLogin: true,
            showright: true,
            rlink: '/myGift',
            right_text: '我的领取'
        }
    },
    {
        path: '/myReward_app',
        name: 'myReward_app',
        component: resolve => require(["../../pages/my/myReward_app"], resolve),
        meta: {
            title: "奖励领取",
            showF: false,
            showH: true,
            needLogin: true,
            showright: true,
            rlink: '/myGift_app',
            right_text: '我的领取'
        }
    },
    {
        path: '/takeReward',
        name: 'takeReward',
        component: resolve => require(["../../pages/my/takeReward"], resolve),
        meta: {
            title: "奖品详情",
            showF: false,
            showH: true,
            needLogin: true,
            showright: true,
            // rlink:'/myGift',
            // right_text:'我的领取'
        }
    },
    {
        path: '/takeReward_app',
        name: 'takeReward_app',
        component: resolve => require(["../../pages/my/takeReward_app"], resolve),
        meta: {
            title: "奖品详情",
            showF: false,
            showH: true,
            needLogin: true,
            showright: true,
            // rlink:'/myGift',
            // right_text:'我的领取'
        }
    },
    {
        path: '/myGift',
        name: 'myGift',
        component: resolve => require(["../../pages/my/myGift"], resolve),
        meta: {
            title: "我的领取",
            showF: false,
            showH: true,
            needLogin: true,
        },
    },
    {
        path: '/myGift_app',
        name: 'myGift_app',
        component: resolve => require(["../../pages/my/myGift_app"], resolve),
        meta: {
            title: "我的领取",
            showF: false,
            showH: true,
            needLogin: true,
        },
    },
    {
        path: '/reward_d_app',
        name: 'reward_d_app',
        component: resolve => require(["../../pages/my/reward_d_app"], resolve),
        meta: {
            title: "领取详情",
            showF: false,
            showH: true,
            needLogin: true,
        },
    },
    {
        path: '/reward_d',
        name: 'reward_d',
        component: resolve => require(["../../pages/my/reward_d"], resolve),
        meta: {
            title: "领取详情",
            showF: false,
            showH: true,
            needLogin: true,
        },
    },
    {
        path: '/myAddress',
        name: 'myAddress',
        component: resolve => require(["../../pages/my/myAddress"], resolve),
        meta: {
            title: "地址管理",
            showF: false,
            showH: true,
            needLogin: true,
        },
    },
    {
        path: '/editAddress',
        name: 'editAddress',
        component: resolve => require(["../../pages/my/editAddress"], resolve),
        meta: {
            title: "添加地址",
            showF: false,
            showH: false,
            needLogin: true,
        },
    },
    {
        path: '/myAchieve',
        name: 'myAchieve',
        component: resolve => require(["../../pages/my/myAchieve"], resolve),
        meta: {
            title: "获奖成就",
            showF: false,
            showH: false,
            needLogin: true,
        },
    },
]