webpackJsonp([2],{"9pDt":function(t,A){t.exports="data:image/jpeg;base64,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"},XJOZ:function(t,A,o){"use strict";Object.defineProperty(A,"__esModule",{value:!0});var i={name:"my",data:function(){return{adinfo:{},user_twap:"",user_info:{},active:-1,icon:{active:"https://img.yzcdn.cn/vant/user-active.png",inactive:"https://img.yzcdn.cn/vant/user-inactive.png"},onum:0,cnum:0}},created:function(){this._GetAdv(),localStorage.user_twap&&(this.user_twap=localStorage.user_twap,this._GetUserInfo(),this._OrderGetOrderNum(),this._GetCouponList())},methods:{goset:function(){this.$router.push({path:"/myset"})},goPoints:function(){this.$router.push({path:"/myPoints"})},_GetUserInfo:function(){var t=this;this.$api.GetUserInfo().then(function(A){1==A.code&&(t.user_info=A.data)})},_OrderGetOrderNum:function(){var t=this;this.$api.OrderGetOrderNum().then(function(A){1==A.code&&(t.onum=A.data)})},_GetCouponList:function(){var t=this;this.$api.GetCouponList(1,0).then(function(A){1==A.code&&(t.cnum=A.data.total)})},_GetAdv:function(){var t=this;this.$api.GetAdv(1).then(function(A){1==A.code&&A.data&&(t.adinfo=A.data)})},gologin:function(){this.$router.push({path:"/login"})},openad:function(){window.open(this.adinfo.url)}}},a={render:function(){var t=this,A=t.$createElement,i=t._self._c||A;return i("div",{staticClass:"mbox"},[t.user_twap?i("div",{staticClass:"mhead"},[i("div",{staticClass:"mimg",on:{click:t.goset}},[t.user_info.avatar?i("van-image",{attrs:{src:t.user_info.avatar,alt:"",width:"61px",height:"61px",fit:"cover"}}):t._e()],1),t._v(" "),i("div",{staticClass:"namebox"},[i("div",{staticClass:"nickname"},[i("span",{staticClass:"name"},[t._v(t._s(t.user_info.nickname))]),t._v(" "),i("div",{staticClass:"iconfont iconshezhi1",on:{click:t.goset}})]),t._v(" "),i("div",{staticClass:"mscroe",on:{click:t.goPoints}},[i("span",{staticClass:"iconfont iconjifen"}),i("span",{staticClass:"num"},[t._v(t._s(t.user_info.score))])])])]):i("div",{staticClass:"mhead"},[i("div",{staticClass:"mimg nologin",on:{click:t.gologin}},[t._v("登录/注册")]),t._v(" "),i("div",{staticClass:"namebox"},[i("div",{staticClass:"nickname"},[i("span"),t._v(" "),i("div",{staticClass:"iconfont iconshezhi1",on:{click:t.goset}})])])]),t._v(" "),i("div",{staticClass:"mbody"},[i("van-tabbar",{attrs:{route:"",fixed:!1,border:!1}},[i("van-tabbar-item",{attrs:{to:"/myCollect"}},[i("span",[t._v("我的收藏")]),t._v(" "),i("img",{attrs:{slot:"icon",src:o("zd+h"),alt:""},slot:"icon"})]),t._v(" "),i("van-tabbar-item",{attrs:{to:"/myOrder",info:t.onum>0?t.onum:""}},[i("span",[t._v("我的订单")]),t._v(" "),i("img",{attrs:{slot:"icon",src:o("peVZ"),alt:""},slot:"icon"})]),t._v(" "),i("van-tabbar-item",{attrs:{to:"/myPoints"}},[i("span",[t._v("我的积分")]),t._v(" "),i("img",{attrs:{slot:"icon",src:o("9pDt"),alt:""},slot:"icon"})])],1),t._v(" "),t.adinfo.image?i("div",{staticClass:"mad",on:{click:t.openad}},[i("img",{attrs:{src:t.adinfo.image,alt:""}})]):t._e(),t._v(" "),i("div",{staticClass:"mlink"},[i("van-cell",{attrs:{"is-link":"",border:!1,to:"myFeedback"}},[i("template",{slot:"title"},[i("span",{staticClass:"iconfont iconfeedback-center"}),t._v(" "),i("span",{staticClass:"custom-title"},[t._v("意见反馈")])])],2),t._v(" "),i("van-cell",{attrs:{"is-link":"",border:!1,to:"myPlatform"}},[i("template",{slot:"title"},[i("span",{staticClass:"iconfont iconguanyuwomen"}),t._v(" "),i("span",{staticClass:"custom-title"},[t._v("关于我们")])])],2)],1)],1)])},staticRenderFns:[]};var n=o("VU/8")(i,a,!1,function(t){o("rtW5")},"data-v-0f516c49",null);A.default=n.exports},peVZ:function(t,A){t.exports="data:image/jpeg;base64,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"},rtW5:function(t,A){},"zd+h":function(t,A){t.exports="data:image/jpeg;base64,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"}});