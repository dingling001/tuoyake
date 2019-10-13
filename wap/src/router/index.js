import Vue from "vue";
import Router from "vue-router";
import RouterCommon from "./common"; // 引入通用模块
import RouterModule from "./modules"; // 引入业务逻辑模块
import NProgress from "nprogress";

Vue.use(Router);
var routes = [...RouterCommon, ...RouterModule];
const router = new Router({
    // mode: "history",
    routes: routes
});
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
NProgress.configure({
    easing: 'ease',  // 动画方式
    speed: 200,  // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 100, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach(function (to, from, next) {
    NProgress.start()
    window.scroll(0, 0);
    const u = navigator.userAgent.toLowerCase()
    if (to.meta.needLogin) {
        // 哪些需要验证
        if (!localStorage.getItem("user_twap")) {
            // token存在条件
            next({
                path: "/login", // 验证失败要跳转的页面
                query: {
                    redirect: to.fullPath // 要传的参数(当前页面地址)
                }
            });

        } else {
            console.log(global.location.pathname)
            // if (to.path !== global.location.pathname) {
            //     location.assign(to.fullPath)
            //     this.$router.push(to.fullPath)
            // }
            next();
        }
    } else {
        if (u.indexOf("like mac os x") < 0 || u.match(/MicroMessenger/i) != 'micromessenger' || u.match(/WebP/i) == "webp") {
            next();
            return;
        }
        // if (to.path !== global.location.pathname) {
        //   location.assign(to.fullPath)
        // }
        next();
    }
});
router.afterEach(() => {
    NProgress.done()
});


export default router;
