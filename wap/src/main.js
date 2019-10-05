// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";
import 'lib-flexible'
import "@/style/reset.scss";
import VueWechatTitle from "vue-wechat-title";
import moment from 'moment';
// Vue.use(VideoPlayer);
//导入 http 文件夹下的 index.js
import api from "./http";
// import "swiper/dist/css/swiper.min.css";
import VueQrcode from "@xkeshi/vue-qrcode";
import Vant from 'vant';
import 'vant/lib/index.css';
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' //这个样式必须引入
// import "./theme.js";
// import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
// import VideoPlayer from 'vue-video-player'
/*引入移动端手势库*/
import directives from './directives/touch'
import Com from "./bin/common";

directives(Vue);
Vue.component(VueQrcode.name, VueQrcode);
Vue.prototype.$moment = moment;
Vue.prototype.$com = Com;

Vue.use(Vant);
Vue.use(api);

Vue.use(VueWechatTitle);

Vue.config.productionTip = false;
// 简单配置
NProgress.configure({
    easing: 'ease',  // 动画方式
    speed: 500,  // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
})
router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
});

router.afterEach(() => {
    NProgress.done()
});

// simple history management
/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    // store,
    components: {
        App
    }
});
