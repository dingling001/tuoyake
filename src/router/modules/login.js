export default [
    {
        path: '/login',
        component: resolve => require(["../../pages/login/login"], resolve),
        meta: {
            title: "密码登录",
            showF: false,
            showH: false
        }
    },
    {
        path: '/logincode',
        component: resolve => require(["../../pages/login/logincode"], resolve),
        meta: {
            title: "验证码登录",
            showF: false,
            showH: false
        }
    },
    {
        path: '/reg',
        component: resolve => require(["../../pages/login/reg"], resolve),
        meta: {
            title: "注册",
            showF: false,
            showH: false,
            needLogin:false
        }
    },
    {
        path: '/regnext',
        component: resolve => require(["../../pages/login/regnext"], resolve),
        meta: {
            title: "设置密码",
            showF: false,
            showH: false,
            needLogin:false
        }
    },
    {
        path: '/forgotpass',
        component: resolve => require(["../../pages/login/forgotpass"], resolve),
        meta: {
            title: "验证手机",
            showF: false,
            showH: false,
            needLogin:false
        }
    },
    {
        path: '/resetpass',
        component: resolve => require(["../../pages/login/resetpass"], resolve),
        meta: {
            title: "重置密码",
            showF: false,
            showH: false,
            needLogin:false
        }
    },
    {
        path: '/changepass',
        component: resolve => require(["../../pages/login/changepass"], resolve),
        meta: {
            title: "设置/修改密码",
            showF: false,
            showH: true,
            needLogin:true
        }
    },
    {
        path: '/changephone',
        component: resolve => require(["../../pages/login/changephone"], resolve),
        meta: {
            title: "修改手机号",
            showF: false,
            showH: true,
            needLogin:true
        }
    },
]