import Vue from "vue";
import Router from "vue-router";
import RouterCommon from "./common"; // 引入通用模块
import RouterModule from "./modules"; // 引入业务逻辑模块
import check from ".././bin/common";
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
router.beforeEach(function(to, from, next) {
  window.scroll(0, 0);
  if (to.meta.needLogin) {
    // 哪些需要验证
    if (!localStorage.getItem("app_token")) {
      // token存在条件
      //判断是否在微信
      if (check.checkWx()) {
        window.location.href =
          STATIC_PW_URL +
          "/wx_oauth?hd_r=" +
          STATIC_WEB_URL +
          "/wxLogin?redirect=" +
          to.fullPath;
      } else {
        next({
          path: "/login", // 验证失败要跳转的页面
          query: {
            redirect: to.fullPath // 要传的参数(当前页面地址)
          }
        });
      }

    } else {
      const u = navigator.userAgent.toLowerCase()
      if (u.indexOf("like mac os x") < 0 || u.match(/MicroMessenger/i) != 'micromessenger' || u.match(/WebP/i) == "webp") {
        next();
        return;
      }
      if (to.path !== global.location.pathname) {
        location.assign(to.fullPath)
      }
      next();
    }
  } else {
    const u = navigator.userAgent.toLowerCase()
    if (u.indexOf("like mac os x") < 0 || u.match(/MicroMessenger/i) != 'micromessenger' || u.match(/WebP/i) == "webp") { next(); return; }
    if (to.path !== global.location.pathname) {
      location.assign(to.fullPath)
    }
    next();
  }
});

export default router;
