webpackJsonp([38],{hY8P:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var s={name:"reg",data:function(){return{mobile:"",captcha:"",show:!1,time:6e4,showbtn:!0,redirect:"",atuostart:!0}},created:function(){localStorage.user_twap&&this.$router.replace("/"),this.redirect=this.$route.query.redirect},methods:{endtime:function(){this.showbtn=!0},_SmsSend:function(){var t=this;""==this.mobile?this.$com.showtoast("请输入手机号"):this.$api.SmsSend(this.mobile,"login").then(function(o){t.showbtn=!1,console.log(o),1==o.code&&(t.$com.showtoast(o.msg),t.captcha=o.data)})},backlogin:function(){this.$router.go(-1)},gonext:function(){var t=this;""==this.mobile?this.$com.showtoast("请输入手机号"):""==this.captcha?this.$com.showtoast("请输入验证码"):this.$api.MobileLogin(this.mobile,this.captcha).then(function(o){if(1==o.code){localStorage.user_twap=o.data.userinfo.token,t.$com.showtoast("登录成功");var e=decodeURIComponent(t.$route.query.redirect||"/");t.redirect?t.$router.push(e):t.$router.replace("/")}else t.$com.showtoast(o.msg||"稍后再试")})}}},a={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"login_box"},[e("div",{staticClass:"login_head",on:{click:function(o){return t.$router.go(-1)}}},[e("div",{staticClass:"iconfont iconfanhui"})]),t._v(" "),e("div",{staticClass:"login_title"},[t._v("验证码登录")]),t._v(" "),e("div",{staticClass:"loginform"},[e("van-field",{attrs:{placeholder:"手机号",type:"number",clearable:""},model:{value:t.mobile,callback:function(o){t.mobile=o},expression:"mobile"}}),t._v(" "),e("van-field",{attrs:{placeholder:"短信验证码",type:"text",center:"",clearable:""},model:{value:t.captcha,callback:function(o){t.captcha=o},expression:"captcha"}},[t.showbtn?e("van-button",{staticClass:"code",attrs:{slot:"button",type:"default",size:"small"},on:{click:t._SmsSend},slot:"button"},[t._v("\n                获取验证码\n            ")]):e("span",{attrs:{slot:"button"},slot:"button"},[e("span",[t._v("重新获取")]),t._v(" "),e("van-count-down",{ref:"countDown",attrs:{time:t.time,format:"ss","auto-start":t.atuostart},on:{finish:t.endtime}}),t._v(" "),e("span",[t._v("S")])],1)],1),t._v(" "),e("div",{staticClass:"login_btn",on:{click:t.gonext}},[t._v("登录")]),t._v(" "),e("div",{staticClass:"login_pass",on:{click:t.backlogin}},[t._v("密码登录")])],1)])},staticRenderFns:[]};var n=e("VU/8")(s,a,!1,function(t){e("xY7z")},"data-v-22554616",null);o.default=n.exports},xY7z:function(t,o){}});