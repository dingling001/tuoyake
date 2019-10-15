import Home from '../../pages/home/home'
export default [
    {
        path: "/",
        redirect: '/competition'
    },
    {
        path: "/home",
        component:Home,
        meta: {
            title: "首页",
            showF:true,

        },
        children: [
            {
                path: "/",
                redirect: '/competition'
            },
            {
                path: '/competition',
                name: 'competition',
                meta: {
                    title: "电竞馆",
                    index: 0,
                    showF:true,
                    showH:false
                },
                component: resolve => require(["../../pages/home/competition"], resolve)
            },
            {
                path: '/club',
                name: 'club',
                meta: {
                    title: "电竞俱乐部",
                    index: 1,
                    showF:true,
                    showH:false
                },
                component: resolve => require(["../../pages/home/club"], resolve)
            },
            {
                path: '/school',
                name: 'school',
                meta: {
                    title: "学院",
                    index: 2,
                    showF:true,
                    showH:false
                },
                component: resolve => require(["../../pages/home/school"], resolve)
            }
        ]
    }
]
