import Home from '../../pages/home/home'
import Competition from '@/pages/home/competition'

export default [
    {
        path: "/",
        redirect: '/competition',
        meta: {}
    },
    {
        path: "/home",
        component: Home,
        meta: {
            title: "首页",
            showF: true,

        },
        children: [
            {
                path: "/",
                redirect: '/competition',
                meta: {}
            },
            {
                path: '/competition',
                name: 'competition',
                meta: {
                    title: "电竞馆",
                    index: 0,
                    showF: true,
                    showH: false
                },
                component: Competition
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
            }
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
    }
]
