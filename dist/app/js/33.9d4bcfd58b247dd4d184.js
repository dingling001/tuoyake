webpackJsonp([33],{"gRZ+":function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"score_box"},[i("div",{staticClass:"score_top"},[i("div",{staticClass:"iconbox"},[i("div",{staticClass:"iconfont iconfanhui",on:{click:t.backmy}})]),t._v(" "),i("div",{staticClass:"score_item"},[i("div",{staticClass:"item"},[i("div",{staticClass:"scroe"},[t._v(t._s(t.total))]),t._v(" "),i("div",{staticClass:"mys"},[t._v("获奖次数")])])])]),t._v(" "),i("div",{staticClass:"achieve_slider"}),t._v(" "),i("div",{staticClass:"mlink"},[i("van-cell",{attrs:{"is-link":"",border:!1,to:"myReward"}},[i("template",{slot:"title"},[i("span",{staticClass:"iconfont iconmedal-fill"}),t._v(" "),i("span",{staticClass:"custom-title"},[t._v("奖励领取")])])],2),t._v(" "),i("van-cell",{attrs:{"is-link":"",border:!1,to:"myAddress"}},[i("template",{slot:"title"},[i("span",{staticClass:"iconfont icondizhiguanli"}),t._v(" "),i("span",{staticClass:"custom-title"},[t._v("地址设置")])])],2),t._v(" "),i("van-cell",{attrs:{"is-link":"",border:!1,to:"myRules?is_sign=1"}},[i("template",{slot:"title"},[i("span",{staticClass:"iconfont icondictionary-fill"}),t._v(" "),i("span",{staticClass:"custom-title"},[t._v("规则说明")])])],2)],1)])},staticRenderFns:[]};var n=i("VU/8")({name:"myAchieve",data:function(){return{total:0,win:0}},created:function(){this._SignIndex()},methods:{_SignIndex:function(){var t=this;this.$api.SignIndex().then(function(s){1==s.code&&(t.total=s.data.total,t.win=s.data.win)})},backmy:function(){this.$router.go(-1)}}},a,!1,function(t){i("or5t")},"data-v-338826e0",null);s.default=n.exports},or5t:function(t,s){}});