export default [
    {
        path: "/",
        redirect: '/home/competition'
    },
    {
        path: "/home",
        component: resolve => require(["../../pages/home/home"], resolve),
        meta: {
            title: "首页",
        },
        children: [
            {
                path: "/",
                redirect: '/home/competition'
            },
            {
                path: '/home/competition',
                name: 'competition',
                meta: {
                    title: "电竞馆",
                    index: 0,
                    keepAlive:true
                },
                component: resolve => require(["../../pages/home/competition"], resolve)

            },
            {
                path: '/home/club',
                name: 'club',
                meta: {
                    title: "电竞俱乐部",
                    index: 1,
                    keepAlive:true
                },
                component: resolve => require(["../../pages/home/club"], resolve)
            },
            {
                path: '/home/school',
                name: 'school',
                meta: {
                    title: "学院",
                    index: 2,
                    keepAlive:true
                },
                component: resolve => require(["../../pages/home/school"], resolve)
            }
        ]
    }
]
