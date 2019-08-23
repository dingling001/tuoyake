import Vue from "vue";
import Router from "vue-router";
import RouterCommon from "./common"; // 引入通用模块
import RouterModule from "./modules"; // 引入业务逻辑模块

Vue.use(Router);
var routes = [...RouterCommon, ...RouterModule];
const router = new Router({
  mode: "history",
  routes: routes
});

const cancelLastReq = next => {
  let axiosPromiseArr = window.__axiosPromiseArr || [];
  if (!!axiosPromiseArr && axiosPromiseArr.length) {
    let len = axiosPromiseArr.length;
    while (len--) {
      axiosPromiseArr[len].cancel("cancel");
      axiosPromiseArr.splice(len, 1);
    }
  }
  next();
};
router.beforeEach((to, from, next) => {
  window.scroll(0, 0);
  if (to.meta.building) {
    next('/wen');
    return false;
  }
  cancelLastReq(next);
});

export default router;
