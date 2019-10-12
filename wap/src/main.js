// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";
import 'lib-flexible'
// import './assets/js/window'
import "@/style/reset.scss";
import VueWechatTitle from "vue-wechat-title";
import moment from 'moment';
// Vue.use(VideoPlayer);
//导入 http 文件夹下的 index.js
import api from "./http";
// import VueQrcode from "@xkeshi/vue-qrcode";

import 'nprogress/nprogress.css' //这个样式必须引入
// import "./theme.js";
// import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
// import VideoPlayer from 'vue-video-player'
/*引入移动端手势库*/
import directives from './directives/touch'
import Com from "./bin/common";
import Vant from 'vant'
import 'vant/lib/index.css';
import 'animate.css'

directives(Vue);
// Vue.component(VueQrcode.name, VueQrcode);
Vue.prototype.$moment = moment;
Vue.prototype.$com = Com;
Vue.use(api);
Vue.use(VueWechatTitle);
Vue.use(Vant)
Vue.config.productionTip = false;
// 简单配置

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
