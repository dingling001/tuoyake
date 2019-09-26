// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";

import "lib-flexible";

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
// import "./theme.js";
// import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
// import VideoPlayer from 'vue-video-player'

Vue.component(VueQrcode.name, VueQrcode);
Vue.prototype.$moment = moment;
Vue.prototype.$web = STATIC_WEB_URL;

Vue.use(Vant);
Vue.use(api);

Vue.use(VueWechatTitle);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    components: {
        App
    }
});

