export default [{
    path: '/login',
    component: resolve => require(["../../pages/login/login"], resolve),
    meta: {
        title: "登录",
        showF: false,
        showH: false
    },
}]