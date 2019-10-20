
export default [
    {
        path: "/",
        redirect: '/competition',
        meta: {}
    },
    {
        path: "/home",
        component: resolve => require(["../../pages/home/home"], resolve),
        meta: {
            title: "首页",
            showF: true,

        },
        children: [
            {
                path: '/competition',
                name: 'competition',
                meta: {
                    title: "电竞馆",
                    index: 0,
                    showF: true,
                    showH: false
                },
                component: resolve => require(["../../pages/home/competition"], resolve)
            },
            {
                path: '/club',
                name: 'club',
                meta: {
                    title: "电竞俱乐部",
                    index: 1,
                    showF: true,
                    showH: false
                },
                component: resolve => require(["../../pages/home/club"], resolve)
            },
            {
                path: '/school',
                name: 'school',
                meta: {
                    title: "学院",
                    index: 2,
                    showF: true,
                    showH: false
                },
                component: resolve => require(["../../pages/home/school"], resolve)
            },
        ]
    },
    {
        path: '/competitiondetail',
        name: 'competitiondetail',
        meta: {
            title: "电竞馆详情",
            index: 1,
            showF: false,
            showH: false
        },
        component: resolve => require(["../../pages/home/competitiondetail"], resolve)
    },
    {
        path: '/clubdetail',
        name: 'clubdetail',
        meta: {
            title: "俱乐部详情",
            index: 1,
            showF: false,
            showH: false
        },
        component: resolve => require(["../../pages/home/clubdetail"], resolve)
    },
    {
        path: '/schooldetail',
        name: 'schooldetail',
        meta: {
            title: "学院详情",
            index: 1,
            showF: false,
            showH: false
        },
        component: resolve => require(["../../pages/home/schooldetail"], resolve)
    },
    {
        path: '/taocan',
        name: 'taocan',
        meta: {
            title: "套餐详情",
            index: 1,
            showF: false,
            showH: false
        },
        component: resolve => require(["../../pages/home/taocan"], resolve)
    },
    {
        path: '/gamedetail',
        name: 'gamedetail',
        meta: {
            title: "赛事详情",
            index: 1,
            showF: false,
            showH: false
        },
        component: resolve => require(["../../pages/home/gamedetail"], resolve)
    },
    {
        path: '/videolist',
        name: 'videolist',
        meta: {
            title: "全部视频",
            index: 1,
            showF: false,
            showH: true
        },
        component: resolve => require(["../../pages/home/videolist"], resolve)
    },
    {
        path: '/videodetail',
        name: 'videodetail',
        meta: {
            title: "视频详情",
            index: 1,
            showF: false,
            showH: false
        },
        component: resolve => require(["../../pages/home/videodetail"], resolve)
    },

]
