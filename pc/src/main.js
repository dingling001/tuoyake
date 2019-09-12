import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";
import Element from "element-ui";
import VueI18n from "vue-i18n";

import "@/style/reset.scss";
import "element-ui/lib/theme-chalk/index.css";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
import api from "./http";
import store from "./store";
import 'swiper/dist/css/swiper.min.css'
import VueQrcode from "@xkeshi/vue-qrcode";
import '@/style/animate.css';
Vue.component(VueQrcode.name, VueQrcode);
Vue.use(api);
Vue.use(Element);
Vue.use(VueI18n);
import BaiduMap from "vue-baidu-map";
Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: "PhuixLOuLnCTqNWNtyyqupPIhOw7HCZl"
});
const i18n = new VueI18n({
  locale: localStorage.locale || "zh", // 语言标识
  messages: {
    zh: require("./lang/zh"),
    en: require("./lang/en"),
    han: require("./lang/han"),
    ri: require("./lang/ri")
  }
});
new Vue({
  el: "#app",
  router,
  store,
  i18n,
  components: {
    App
  }
});
