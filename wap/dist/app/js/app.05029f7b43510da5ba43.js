webpackJsonp([42],{0:function(e,t){},"20Xt":function(e,t,n){var o={"./home.js":"3Un1","./index.js":"9C8H","./login.js":"dcSK","./my.js":"pMTW"};function i(e){return n(a(e))}function a(e){var t=o[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}i.keys=function(){return Object.keys(o)},i.resolve=a,e.exports=i,i.id="20Xt"},"3Un1":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"GetSlideList",function(){return i}),n.d(t,"GetBarList",function(){return a}),n.d(t,"GetLabelList",function(){return r}),n.d(t,"GetAreaPidByName",function(){return s}),n.d(t,"GetAreaListTree",function(){return c}),n.d(t,"Category",function(){return u}),n.d(t,"ClubIndex",function(){return l}),n.d(t,"ClubDetail",function(){return h}),n.d(t,"CollegeCategory",function(){return d}),n.d(t,"CollegeIndex",function(){return p}),n.d(t,"CollegeDetail",function(){return f}),n.d(t,"GetBarInfo",function(){return m}),n.d(t,"SetCollection",function(){return g}),n.d(t,"GetGoodsInfo",function(){return v}),n.d(t,"GetMatchInfo",function(){return w}),n.d(t,"GetVideoList",function(){return j}),n.d(t,"GetVideoInfo",function(){return b});var o=n("m4jk"),i=function(e){return Object(o.a)("/api/index/getSlideList",{city:e},"POST",!0)},a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments[1],n=arguments[2],i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,s=arguments[6],c=arguments[7],u=arguments[8];return Object(o.a)("/api/index/getBarList",{page:e,keyword:t,city:n,lat:i,lng:a,recommend:r,label:s,district:c,circle:u},"POST",!0)},r=function(){return Object(o.a)("/api/index/getLabelList",{},"POST",!0)},s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"北京市";return Object(o.a)("/api/common/getAreaPidByName",{name:e},"POST",!0)},c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2;return Object(o.a)("/api/common/getAreaListTree",{pid:e},"POST",!0)},u=function(){return Object(o.a)("/api/club/category",{},"POST",!0)},l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments[1],n=arguments[2],i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";return Object(o.a)("/api/club/index",{page:e,category_id:t,city:n,keyword:i},"POST",!0)},h=function(e){return Object(o.a)("/api/club/detail",{club_id:e},"POST",!0)},d=function(){return Object(o.a)("/api/college/category",{},"POST",!0)},p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments[1],n=arguments[2],i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";return Object(o.a)("/api/college/index",{page:e,category_id:t,city:n,keyword:i},"POST",!0)},f=function(e){return Object(o.a)("/api/college/detail",{college_id:e},"POST",!0)},m=function(e){return Object(o.a)("/api/index/getBarInfo",{id:e},"POST",!0)},g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments[1];return Object(o.a)("/api/collection/setCollection",{token:localStorage.user_twap,type:e,object_id:t},"POST",!0)},v=function(e){return Object(o.a)("/api/index/getGoodsInfo",{token:localStorage.user_twap,goods_id:e},"POST",!0)},w=function(e){return Object(o.a)("/api/index/getMatchInfo",{token:localStorage.user_twap,match_id:e},"POST",!0)},j=function(e){return Object(o.a)("/api/index/getVideoList",{token:localStorage.user_twap,match_id:e},"POST",!0)},b=function(e){return Object(o.a)("/api/index/getVideoInfo",{token:localStorage.user_twap,video_id:e},"POST",!0)}},"3Y0J":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=[{path:"/my",name:"my",component:function(e){return n.e(1).then(function(){var t=[n("XJOZ")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"我的",showF:!0,showH:!1}},{path:"/myset",name:"myset",component:function(e){return n.e(23).then(function(){var t=[n("yY4b")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"个人设置",showF:!1,showH:!0,needLogin:!0}},{path:"/myCoupon",name:"myCoupon",component:function(e){return n.e(29).then(function(){var t=[n("w9z1")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"我的优惠券",showF:!1,showH:!0,needLogin:!0}},{path:"/myCoupondetail",name:"myCoupondetail",component:function(e){return n.e(33).then(function(){var t=[n("HEyi")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"优惠券详情",showF:!1,showH:!0,needLogin:!0}},{path:"/myApplication",name:"myApplication",component:function(e){return n.e(11).then(function(){var t=[n("LV7v")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"我的报名",showF:!1,showH:!1,needLogin:!0}},{path:"/mySocial",name:"mySocial",component:function(e){return n.e(10).then(function(){var t=[n("wzPw")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"社交账号",showF:!1,showH:!0,needLogin:!0}},{path:"/myCollect",name:"myCollect",component:function(e){return n.e(13).then(function(){var t=[n("LfFZ")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"我的收藏",showF:!1,showH:!0,needLogin:!0,keepAlive:!0}},{path:"/myOrder",name:"myOrder",component:function(e){return n.e(19).then(function(){var t=[n("GVfn")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"我的订单",showF:!1,showH:!0,needLogin:!0}},{path:"/myPoints",name:"myPoints",component:function(e){return n.e(14).then(function(){var t=[n("3rKW")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"我的积分",showF:!1,showH:!1,needLogin:!0}},{path:"/myFeedback",name:"myFeedback",component:function(e){return n.e(40).then(function(){var t=[n("P6Hp")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"意见反馈",showF:!1,showH:!0,needLogin:!0}},{path:"/myVersion",name:"myVersion",component:function(e){return n.e(22).then(function(){var t=[n("HxBs")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"版本信息",showF:!1,showH:!0,needLogin:!0}},{path:"/myPlatform",name:"myPlatform",component:function(e){return n.e(34).then(function(){var t=[n("tU/f")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"关于平台",showF:!1,showH:!0,needLogin:!1}},{path:"/download",name:"download",component:function(e){return n.e(3).then(function(){var t=[n("DmJg")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"APP下载",showF:!1,showH:!0,needLogin:!1,iconfont:"iconguanbi-copy"}},{path:"/myRules",name:"myRules",component:function(e){return n.e(18).then(function(){var t=[n("cMDM")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"规则说明",showF:!1,showH:!0,needLogin:!0}},{path:"/myReward",name:"myReward",component:function(e){return n.e(27).then(function(){var t=[n("VCHe")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"奖励领取",showF:!1,showH:!0,needLogin:!0,showright:!0,rlink:"/myGift",right_text:"我的领取"}},{path:"/myGift",name:"myGift",component:function(e){return n.e(2).then(function(){var t=[n("IjYw")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"我的领取",showF:!1,showH:!0,needLogin:!0}},{path:"/myAddress",name:"myAddress",component:function(e){return n.e(16).then(function(){var t=[n("YOAI")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"地址管理",showF:!1,showH:!0,needLogin:!0}},{path:"/editAddress",name:"editAddress",component:function(e){return n.e(37).then(function(){var t=[n("rkvD")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"添加地址",showF:!1,showH:!0,needLogin:!0}},{path:"/myAchieve",name:"myAchieve",component:function(e){return n.e(32).then(function(){var t=[n("gRZ+")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"获奖成就",showF:!1,showH:!1,needLogin:!0}}]},"4ml/":function(e,t){},"5LIk":function(e,t){},"8NmS":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("kyiS"),i=[];o.keys().forEach(function(e){"./index.js"!==e&&(i=i.concat(o(e).default))}),t.default=i},"9C8H":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("2cg0"),i=n("20Xt"),a=void 0;i.keys().forEach(function(e){if("./index.js"!==e){var t=i(e);a=o({},a,t.default||t)}}),t.default=a},E8kA:function(e,t){},KtAA:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=[{path:"/gindex",component:function(e){return n.e(30).then(function(){var t=[n("ySWp")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"电竞馆",showF:!0,showH:!1}}]},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n("j1ja");var o=n("7+uW"),i={name:"vheader",data:function(){return{}},props:{title:{type:String,default:""},showright:{type:Boolean,default:!1},iconfont:{type:String,default:"iconfanhui"},right_text:{type:String,default:""},rlink:{type:String,default:"/"}},methods:{goback:function(){this.$router.go(-1)}}},a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"nav"},[n("span",{class:"iconfont "+e.iconfont,on:{click:e.goback}}),e._v(" "),n("span",[e._v(e._s(e.title))]),e._v(" "),e.showright?n("router-link",{staticClass:"navright",attrs:{tag:"span",to:e.rlink}},[e._v(e._s(e.right_text))]):e._e()],1)},staticRenderFns:[]};var r={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"footer"},[n("div",{class:["footer_item",0==e.findex?"footer_itemactive":""],on:{click:function(t){return e.tab(0,"/competition")}}},[n("span",{staticClass:"iconfont iconshouyex"}),n("span",[e._v("首页")])]),e._v(" "),n("div",{class:["footer_item",1==e.findex?"footer_itemactive":""],on:{click:function(t){return e.tab(1,"/gindex")}}},[n("span",{staticClass:"iconfont icondiannao"}),n("span",[e._v("电竞馆")])]),e._v(" "),n("div",{class:["footer_item",2==e.findex?"footer_itemactive":""],on:{click:function(t){return e.tab(2,"/my")}}},[n("span",{staticClass:"iconfont iconwode"}),n("span",[e._v("我的")])])])},staticRenderFns:[]};var s={name:"App",data:function(){return{showH:!1,showF:!0,plat:"",title:"跳转中…",f_index:0,iconfont:"iconfanhui",rlink:"",showright:!1,right_text:""}},created:function(){},components:{top:n("VU/8")(i,a,!1,function(e){n("X/iR")},"data-v-13b5a8f2",null).exports,bottom:n("VU/8")({name:"foot",data:function(){return{findex:0}},props:{gindex:{default:0}},created:function(){this.findex=this.gindex},watch:{$route:function(e){-1!==e.fullPath.indexOf("/gindex")?this.findex=1:-1!==e.fullPath.indexOf("/my")?this.findex=2:this.findex=0}},mounted:function(){},methods:{tab:function(e,t){this.findex=e,this.$router.push(t)}}},r,!1,function(e){n("ui+T")},"data-v-4f5f0c97",null).exports},watch:{$route:{handler:function(e){this.title="托亚克 | "+e.meta.title,this.showF=e.meta.showF,this.showH=e.meta.showH,this.headtext=e.meta.title,this.iconfont=e.meta.iconfont||"iconfanhui",this.showright=e.meta.showright||!1,this.right_text=e.meta.right_text,this.rlink=e.meta.rlink,-1!==e.fullPath.indexOf("/gindex")?this.f_index=1:-1!==e.fullPath.indexOf("/my")?this.f_index=2:this.f_index=0},immediate:!0}},provide:function(){return{app:this}},methods:{}},c={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app"},[e.showH?n("top",{attrs:{title:e.headtext,iconfont:e.iconfont,rlink:e.rlink,showright:e.showright,right_text:e.right_text}}):e._e(),e._v(" "),n("keep-alive",[e.$route.meta.keepAlive?n("router-view",{directives:[{name:"wechat-title",rawName:"v-wechat-title",value:e.title,expression:"title"}],staticClass:"router-view",class:["router-view",e.showH?"nonav":"",0==e.showF&&0==e.showH?"noall":""]}):e._e()],1),e._v(" "),e.$route.meta.keepAlive?e._e():n("router-view",{directives:[{name:"wechat-title",rawName:"v-wechat-title",value:e.title,expression:"title"}],class:["router-view",e.showH?"nonav":"",0==e.showF&&0==e.showH?"noall":""]}),e._v(" "),e.showF?n("bottom",{attrs:{gindex:e.f_index}}):e._e()],1)},staticRenderFns:[]};var u=n("VU/8")(s,c,!1,function(e){n("E8kA")},"data-v-34704d2d",null).exports,l=n("YaEn"),h=(n("sVYa"),n("UJXT"),n("YqKu")),d=n.n(h),p=n("PJh5"),f=n.n(p),m=n("HSQo"),g=n.n(m),v=n("9C8H"),w=function e(t){e.installed||(e.installed=!0,g()(t.prototype,{$api:{get:function(){return v.default}}}))},j=(n("UVIz"),n("g3Gj"),n("5LIk"),n("iqGf")),b=n.n(j),y=n("Fd2+"),k=this,O={checkPhone:function(e){return/^1\d{10}$/gi.test(e)},checkIdcard:function(e){"x"==e.slice(17,18)&&(e=e.replace("x","X"),k.userId=e);var t="",n=!0;if((e=e.toString())&&/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(e))if({11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "}[e.substr(0,2)]){if(18==e.length){e=e.split("");for(var o=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],i=[1,0,"X",9,8,7,6,5,4,3,2],a=0,r=0;r<17;r++)a+=e[r]*o[r];i[a%11]!=e[17]&&(t="校验位错误",n=!1)}}else t="地址编码错误",n=!1;else t="身份证号格式错误",n=!1;var s={status:n,msg:t};return s},checkWx:function(){var e=(t=navigator.userAgent,navigator.appVersion,{trident:t.indexOf("Trident")>-1,presto:t.indexOf("Presto")>-1,webKit:t.indexOf("AppleWebKit")>-1,gecko:t.indexOf("Gecko")>-1&&-1==t.indexOf("KHTML"),mobile:!!t.match(/AppleWebKit.*Mobile.*/),ios:!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:t.indexOf("Android")>-1||t.indexOf("Linux")>-1,iPhone:t.indexOf("iPhone")>-1,iPad:t.indexOf("iPad")>-1,webApp:-1==t.indexOf("Safari")});var t;(navigator.browserLanguage||navigator.language).toLowerCase();if(e.mobile)return"micromessenger"==navigator.userAgent.toLowerCase().match(/MicroMessenger/i)},getCookie:function(e){if(document.cookie.length>0){var t=document.cookie.indexOf(e+"=");if(-1!=t){t=t+e.length+1;var n=document.cookie.indexOf(";",t);return-1==n&&(n=document.cookie.length),document.cookie.substring(t,n)}}return""},analyzeIDCard:function(e){var t=e.toString(),n=t.substring(6,10),o=t.substring(10,12),i=t.substring(12,14),a=new Date,r=a.getMonth()+1,s=a.getDay(),c=a.getFullYear()-n;return(r<o||r==o&&s<i)&&c--,c},showtoast:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"text",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"like-o",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:2e3,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",a=arguments.length>5&&void 0!==arguments[5]&&arguments[5];arguments.length>6&&void 0!==arguments[6]&&arguments[6]?y.a.loading({mask:a,message:e,duration:o}):Object(y.a)({message:e,type:t,icon:n,duration:o,iconPrefix:i})}};n("4ml/"),n("oPmM");function x(){var e=document.documentElement.clientWidth||document.body.clientWidth;document.getElementsByTagName("html")[0].style.fontSize=e/10+"px"}o.a.directive("touch",{bind:function(e,t,n){var o,i,a=t.arg,r=0,s="";function c(e,t,n,o){var i=t-o,a=n-e,r=0;if(Math.abs(a)<2&&Math.abs(i)<2)return r;var s=function(e,t){return 180*Math.atan2(t,e)/Math.PI}(a,i);return s>=-45&&s<45?r="swiperight":s>=45&&s<135?r="swipeup":s>=-135&&s<-45?r="swipedown":(s>=135&&s<=180||s>=-180&&s<-135)&&(r="swipeleft"),r}e.addEventListener("touchstart",function(e){o=e.touches[0].pageX,i=e.touches[0].pageY,r=setTimeout(function(){r=0,"press"===a&&t.value()},500)},!1),e.addEventListener("touchmove",function(e){clearTimeout(r),r=0}),e.addEventListener("touchend",function(e){var n,u;switch(n=e.changedTouches[0].pageX,u=e.changedTouches[0].pageY,s=c(o,i,n,u),clearTimeout(r),s){case 0:break;case"swipeup":"swipeup"===a&&t.value();break;case"swipedown":"swipedown"===a&&t.value();break;case"swipeleft":"swipeleft"===a&&t.value();break;case"swiperight":"swiperight"===a&&t.value()}},!1)}}),o.a.prototype.$moment=f.a,o.a.prototype.$com=O,o.a.use(w),o.a.use(d.a),o.a.use(y.b),o.a.use(b.a),o.a.config.productionTip=!1,new o.a({el:"#app",router:l.a,components:{App:u}}),window.onresize=x,x()},UJXT:function(e,t){},UVIz:function(e,t){},W27U:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=[{path:"/",redirect:"/competition",meta:{}},{path:"/home",component:function(e){return Promise.all([n.e(0),n.e(5)]).then(function(){var t=[n("nU8l")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"首页",showF:!0},children:[{path:"/competition",name:"competition",meta:{title:"电竞馆",index:0,showF:!0,showH:!1},component:function(e){return n.e(4).then(function(){var t=[n("cESP")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/club",name:"club",meta:{title:"电竞俱乐部",index:1,showF:!0,showH:!1},component:function(e){return n.e(38).then(function(){var t=[n("iv6e")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/school",name:"school",meta:{title:"学院",index:2,showF:!0,showH:!1},component:function(e){return Promise.all([n.e(0),n.e(15)]).then(function(){var t=[n("hHrA")];e.apply(null,t)}.bind(this)).catch(n.oe)}}]},{path:"/competitiondetail",name:"competitiondetail",meta:{title:"电竞馆详情",index:1,showF:!1,showH:!1},component:function(e){return Promise.all([n.e(0),n.e(20)]).then(function(){var t=[n("xog9")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/clubdetail",name:"clubdetail",meta:{title:"俱乐部详情",index:1,showF:!1,showH:!1},component:function(e){return n.e(21).then(function(){var t=[n("KlDs")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/schooldetail",name:"schooldetail",meta:{title:"学院详情",index:1,showF:!1,showH:!1},component:function(e){return n.e(39).then(function(){var t=[n("pj+Y")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/taocan",name:"taocan",meta:{title:"套餐详情",index:1,showF:!1,showH:!1},component:function(e){return n.e(7).then(function(){var t=[n("Fr7f")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/gamedetail",name:"gamedetail",meta:{title:"赛事详情",index:1,showF:!1,showH:!1},component:function(e){return n.e(24).then(function(){var t=[n("RsFp")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/videolist",name:"videolist",meta:{title:"全部视频",index:1,showF:!1,showH:!0},component:function(e){return n.e(26).then(function(){var t=[n("byb2")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/videodetail",name:"videodetail",meta:{title:"视频详情",index:1,showF:!1,showH:!1},component:function(e){return n.e(35).then(function(){var t=[n("lVQU")];e.apply(null,t)}.bind(this)).catch(n.oe)}}]},"X/iR":function(e,t){},YaEn:function(e,t,n){"use strict";(function(e){var o=n("Gu7T"),i=n.n(o),a=n("7+uW"),r=n("/ocq"),s=n("sS8m"),c=n("8NmS"),u=n("Y81h"),l=n.n(u);a.a.use(r.a);var h=[].concat(i()(s.a),i()(c.default)),d=new r.a({routes:h}),p=r.a.prototype.push;r.a.prototype.push=function(e){return p.call(this,e).catch(function(e){return e})},l.a.configure({easing:"ease",speed:200,showSpinner:!1,trickleSpeed:100,minimum:.3}),d.beforeEach(function(t,n,o){l.a.start();navigator.userAgent.toLowerCase();t.meta.needLogin?localStorage.getItem("user_twap")?(console.log(e.location.pathname),o()):o({path:"/login",query:{redirect:t.fullPath}}):o()}),d.afterEach(function(){l.a.done()}),t.a=d}).call(t,n("DuR2"))},dcSK:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"SmsSend",function(){return i}),n.d(t,"MobileLogin",function(){return a}),n.d(t,"Login",function(){return r});var o=n("m4jk"),i=function(e,t){return Object(o.a)("/api/sms/send",{mobile:e,event:t},"GET",!0)},a=function(e,t){return Object(o.a)("/api/common/mobilelogin",{mobile:e,captcha:t},"POST",!0)},r=function(e,t){return Object(o.a)("/api/common/login",{account:e,password:t},"POST",!0)}},g3Gj:function(e,t){},kyiS:function(e,t,n){var o={"./game.js":"KtAA","./home.js":"W27U","./index.js":"8NmS","./login.js":"nxN9","./my.js":"3Y0J"};function i(e){return n(a(e))}function a(e){var t=o[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}i.keys=function(){return Object.keys(o)},i.resolve=a,e.exports=i,i.id="kyiS"},m4jk:function(e,t,n){"use strict";var o=n("woOf"),i=n.n(o),a=n("//Fk"),r=n.n(a),s=n("mtWM"),c=n.n(s),u=n("mw3O"),l=n.n(u),h=n("Fd2+"),d=void 0,p=c.a.CancelToken;window.__axiosPromiseArr=[];var f=c.a.create({baseURL:"",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept"},timeout:1e4,responseType:"json"});f.interceptors.response.use(function(e){if(401!=e.data.status)return e.data;Object(h.a)({message:"登录已过期，请重新登录！",position:"center",duration:3e3}),localStorage.removeItem("user_twap"),localStorage.url=window.location.href,window.location.href=window.location.origin+"/login"},function(e){if("timeout of 10000ms exceeded"!=!e){switch(e.response.status){case 400:e.message="请求错误";break;case 401:e.message="未授权，请登录";break;case 403:e.message="拒绝访问";break;case 404:e.message="请求地址出错: "+e.response.config.url;break;case 408:e.message="请求超时";break;case 500:e.message="服务器内部错误";break;case 501:e.message="服务未实现";break;case 502:e.message="网关错误";break;case 503:Object(h.a)({message:"太热情了，请稍后再来吧！",position:"center",duration:3e3}),e.message="服务不可用";break;case 504:e.message="网关超时";break;case 505:e.message="HTTP版本不受支持";break;default:e.message="网络错误"}return e.code=e.response.status,r.a.reject(e)}e.message="网络超时"});t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET",o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],a={url:e,cancelToken:new p(function(e){o||(d=e,window.__axiosPromiseArr.push({cancel:d}))})};return n=n.toUpperCase(),new r.a(function(e,o){"GET"===n?a=i()(a,{method:"get",params:t}):"POST"===n&&(a=i()(a,{method:"post",data:l.a.stringify(t),headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8",Accept:"application/json"}})),f(a).then(function(t){return e(t),!1}).catch(function(e){Object(h.a)({message:e.message,position:"center",duration:3e3}),401===e.code&&(localStorage.removeItem("user_twap"),localStorage.url=window.location.href,window.location.href=window.location.origin+"#/login")})})}},nxN9:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=[{path:"/login",component:function(e){return n.e(25).then(function(){var t=[n("QlWu")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"密码登录",showF:!1,showH:!1}},{path:"/logincode",component:function(e){return n.e(36).then(function(){var t=[n("hY8P")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"验证码登录",showF:!1,showH:!1}},{path:"/reg",component:function(e){return n.e(12).then(function(){var t=[n("8Tp1")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"注册",showF:!1,showH:!1}},{path:"/regnext",component:function(e){return n.e(17).then(function(){var t=[n("gCE2")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"设置密码",showF:!1,showH:!1,needLogin:!0}},{path:"/forgotpass",component:function(e){return n.e(6).then(function(){var t=[n("2MHE")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"验证手机",showF:!1,showH:!1}},{path:"/resetpass",component:function(e){return n.e(31).then(function(){var t=[n("yQFV")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"重置密码",showF:!1,showH:!1,needLogin:!0}},{path:"/changepass",component:function(e){return n.e(8).then(function(){var t=[n("Rhvf")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"设置/修改密码",showF:!1,showH:!0,needLogin:!0}},{path:"/changephone",component:function(e){return n.e(28).then(function(){var t=[n("rcM/")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"修改手机号",showF:!1,showH:!0,needLogin:!0}}]},oPmM:function(e,t){},pMTW:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"GetAdv",function(){return i}),n.d(t,"GetUserInfo",function(){return a}),n.d(t,"Platform",function(){return r}),n.d(t,"SetFeedback",function(){return s}),n.d(t,"GetCouponList",function(){return c}),n.d(t,"GetCouponInfo",function(){return u}),n.d(t,"Profile",function(){return l}),n.d(t,"CollectionIndex",function(){return h}),n.d(t,"ScoreIndex",function(){return d}),n.d(t,"ScoreRule",function(){return p}),n.d(t,"SignRule",function(){return f}),n.d(t,"ScoreGoods",function(){return m}),n.d(t,"ScoreMyReceived",function(){return g}),n.d(t,"AddressIndex",function(){return v}),n.d(t,"SignIndex",function(){return w}),n.d(t,"GetSignList",function(){return j});var o=n("m4jk"),i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return Object(o.a)("/api/index/getAdv",{type:e},"POST",!0)},a=function(){return Object(o.a)("/api/user/getUserInfo",{token:localStorage.getItem("user_twap")},"POST",!0)},r=function(){return Object(o.a)("/api/user/platform",{},"POST",!0)},s=function(e,t){return Object(o.a)("/api/user/setFeedback",{content:e,images:t,token:localStorage.user_twap},"POST",!0)},c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Object(o.a)("/api/coupon/getCouponList",{type:e,page:t,token:localStorage.user_twap},"POST",!0)},u=function(e){return Object(o.a)("/api/coupon/getCouponInfo",{id:e,token:localStorage.user_twap},"POST",!0)},l=function(e,t){return Object(o.a)("/api/user/profile",{token:localStorage.user_twap,avatar:e,nickname:t},"POST",!0)},h=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;return Object(o.a)("/api/collection/index",{token:localStorage.user_twap,type:e,page:t,lat:n,lng:i},"POST",!0)},d=function(){return Object(o.a)("/api/score/index",{token:localStorage.user_twap},"POST",!0)},p=function(){return Object(o.a)("/api/score/rule",{token:localStorage.user_twap},"POST",!0)},f=function(){return Object(o.a)("/api/sign/rule",{token:localStorage.user_twap},"POST",!0)},m=function(){return Object(o.a)("/api/score/goods",{token:localStorage.user_twap},"POST",!0)},g=function(){return Object(o.a)("/api/score/myReceived",{token:localStorage.user_twap},"POST",!0)},v=function(){return Object(o.a)("/api/address/index",{token:localStorage.user_twap},"POST",!0)},w=function(){return Object(o.a)("/api/sign/index",{token:localStorage.user_twap},"POST",!0)},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return Object(o.a)("/api/sign/getSignList",{token:localStorage.user_twap,page:e,status:t},"POST",!0)}},sS8m:function(e,t,n){"use strict";t.a=[{path:"*",name:"404",component:function(e){return n.e(9).then(function(){var t=[n("thLP")];e.apply(null,t)}.bind(this)).catch(n.oe)},meta:{title:"404",footer:!1,nav:!1}}]},"ui+T":function(e,t){},uslO:function(e,t,n){var o={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-SG":"oYA3","./en-SG.js":"oYA3","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./ga":"U5Iz","./ga.js":"U5Iz","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it-ch":"/E8D","./it-ch.js":"/E8D","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ku":"kI9l","./ku.js":"kI9l","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function i(e){return n(a(e))}function a(e){var t=o[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}i.keys=function(){return Object.keys(o)},i.resolve=a,e.exports=i,i.id="uslO"}},["NHnr"]);