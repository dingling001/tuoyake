export default [
    {
        path: '/my',
        component: resolve => require(["../../pages/my/my"], resolve),
        meta: {
            title: "我的",
            r: 1
        },
    }
]