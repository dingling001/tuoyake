export default [
    {
        path: '/my',
        name:'my',
        component: resolve => require(["../../pages/my/my"], resolve),
        meta: {
            title: "我的",
            showF:true,
            showH:false
        },
    }
]