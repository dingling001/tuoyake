webpackJsonp([24],{gCE2:function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e={render:function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"login_box"},[n("div",{staticClass:"login_head",on:{click:function(a){return t.$router.go(-1)}}},[n("div",{staticClass:"iconfont iconfanhui"})]),t._v(" "),n("div",{staticClass:"login_title"},[t._v("设置密码")]),t._v(" "),n("form",{staticClass:"loginform"},[n("van-field",{attrs:{placeholder:"登录密码（6~12位）",type:"password",clearable:""},model:{value:t.account,callback:function(a){t.account=a},expression:"account"}}),t._v(" "),n("van-field",{attrs:{placeholder:"请再次输入登录密码",type:"password",clearable:""},model:{value:t.password,callback:function(a){t.password=a},expression:"password"}}),t._v(" "),n("div",{staticClass:"login_btn",on:{click:t.gologin}},[t._v("前往登录")])],1)])},staticRenderFns:[]};var o=n("VU/8")({name:"reg",data:function(){return{account:"",password:""}},created:function(){},methods:{gologin:function(){this.$router.push({path:"/login",query:{}})}}},e,!1,function(t){n("huJd")},"data-v-0478f2a2",null);a.default=o.exports},huJd:function(t,a){}});