// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from './store/'
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
/*引入移动端手势库*/
import directives from './directives/touch'

directives(Vue);
Vue.component(VueQrcode.name, VueQrcode);
Vue.prototype.$moment = moment;
Vue.prototype.$web = STATIC_WEB_URL;

Vue.use(Vant);
Vue.use(api);

Vue.use(VueWechatTitle);

Vue.config.productionTip = false;
// simple history management
const history = window.sessionStorage;
let historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);
router.beforeEach(function (to, from, next) {
    const toIndex = history.getItem(to.path);
    const fromIndex = history.getItem(from.path);

    if (toIndex) {
        if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
            store.commit('UPDATE_DIRECTION', {direction: 'forward'})
        } else {
            store.commit('UPDATE_DIRECTION', {direction: 'reverse'})
        }
    } else {
        ++historyCount;
        history.setItem('count', historyCount);
        to.path !== '/home/competition' && history.setItem(to.path, historyCount);
        store.commit('UPDATE_DIRECTION', {direction: 'forward'})
    }
    if (/\/http/.test(to.path)) {
        let url = to.path.split('http')[1];
        window.location.href = `http${url}`
    } else {
        next()
    }
});

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    components: {
        App
    }
});
