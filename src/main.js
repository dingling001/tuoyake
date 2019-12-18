// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";
// import 'lib-flexible'
// import './assets/js/window'
import "@/style/reset.scss";
import VueWechatTitle from "vue-wechat-title";
import moment from 'moment';
// Vue.use(VideoPlayer);
//导入 http 文件夹下的 index.js
import api from "./http";
// import VueQrcode from "@xkeshi/vue-qrcode";

import 'nprogress/nprogress.css' //这个样式必须引入
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import VideoPlayer from 'vue-video-player'
/*引入移动端手势库*/
import directives from './directives/touch'
import Com from "./bin/common";
import Vant from 'vant'
import 'vant/lib/index.css';
import 'animate.css'
import NoData from '@/components/NoData'
// import AMap from 'vue-amap';
// Vue.use(AMap)
// AMap.initAMapApiLoader({
//     key: '1f082acaf195dfdc0dd3e06cf0f4f25f',
//     plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
//         'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor',
//         'AMap.CircleEditor', 'AMap.Geolocation'],
//     debug:true
// });

directives(Vue);
// Vue.component(VueQrcode.name, VueQrcode);
Vue.prototype.$moment = moment;
Vue.prototype.$com = Com;
Vue.use(api);
Vue.use(VueWechatTitle);
Vue.use(Vant);
Vue.use(VideoPlayer)
Vue.config.productionTip = false;
import vueCity from 'vue-city-select'

Vue.use(vueCity);
//然后就可以在项目中引用了,热门城市 hotCityList 参数可以根据自己的需求传或者不传
// 简单配置
Vue.component('NoData', NoData)
import store from './store'//引入store
// simple history management
/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    components: {
        App
    }
});
window.onresize = setHtmlFontSize;

function setHtmlFontSize() {
    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    const htmlDom = document.getElementsByTagName('html')[0];
    htmlDom.style.fontSize = htmlWidth / 10 + 'px';
};
setHtmlFontSize();