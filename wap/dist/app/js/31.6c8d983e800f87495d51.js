webpackJsonp([31],{"7wZR":function(t,a){},yQFV:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"login_box"},[e("div",{staticClass:"login_head",on:{click:function(a){return t.$router.go(-1)}}},[e("div",{staticClass:"iconfont iconfanhui"})]),t._v(" "),e("div",{staticClass:"login_title"},[t._v("重置密码")]),t._v(" "),e("form",{staticClass:"loginform"},[e("van-field",{attrs:{placeholder:"新密码（6~12位）",type:"password",clearable:"",autocomplete:""},model:{value:t.account,callback:function(a){t.account=a},expression:"account"}}),t._v(" "),e("van-field",{attrs:{placeholder:"请再次输入新密码",type:"password",clearable:"",autocomplete:""},model:{value:t.password,callback:function(a){t.password=a},expression:"password"}}),t._v(" "),e("div",{staticClass:"login_btn",on:{click:t.gologin}},[t._v("前往登录")])],1)])},staticRenderFns:[]};var n=e("VU/8")({name:"reg",data:function(){return{account:"",password:""}},created:function(){},methods:{gologin:function(){this.$router.push({path:"/login",query:{}})}}},o,!1,function(t){e("7wZR")},"data-v-339b3206",null);a.default=n.exports}});