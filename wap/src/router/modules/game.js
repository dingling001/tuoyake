export default [
    {
        path: '/gindex',
        component: resolve => require(["../../pages/game/gindex"], resolve),
        meta: {
            title: "电竞馆",
            showF:true,
            showH:false
        },
    }
]