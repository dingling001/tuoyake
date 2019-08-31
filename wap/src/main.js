// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";

import "lib-flexible";

import "@/style/reset.scss";
import "./theme.js";

import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import VueI18n from "vue-i18n";
import VueWechatTitle from "vue-wechat-title";
import moment from 'moment';
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import VideoPlayer from 'vue-video-player'
import myTouch from '@/bin/myTouch'

myTouch(Vue)
Vue.use(VideoPlayer);
//导入 http 文件夹下的 index.js
import api from "./http";
import "swiper/dist/css/swiper.css";
import BaiduMap from "vue-baidu-map";
import { toThumbsimg } from "./bin/toThumbsimg";
import VueQrcode from "@xkeshi/vue-qrcode";

Vue.component(VueQrcode.name, VueQrcode);
Vue.prototype.$moment = moment;
Vue.prototype.$toThumbsimg = toThumbsimg;
Vue.prototype.$web = STATIC_WEB_URL;
Vue.prototype.$active = STATIC_ACTIVE_URL;
Vue.prototype.$vol = STATIC_VOLUNTEER_URL;
Vue.prototype.$moive = STATIC_CINEMA_URL;
Vue.use(api);
Vue.use(MintUI);
Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: "PhuixLOuLnCTqNWNtyyqupPIhOw7HCZl"
});
Vue.use(VueWechatTitle);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: localStorage.locale || "zh", // 语言标识
  messages: {
    zh: require("./lang/zh"),
    en: require("./lang/en"),
    han: require("./lang/han"),
    ri: require("./lang/ri")
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  i18n,
  components: {
    App
  }
});

