webpackJsonp([31],{hY8P:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var a={name:"reg",data:function(){return{mobile:"",captcha:"",show:!1,time:6e4,showbtn:!0,redirect:"",atuostart:!0,showkeybord:!1}},created:function(){localStorage.user_twap&&this.$router.replace("/"),this.redirect=this.$route.query.redirect},methods:{endtime:function(){this.showbtn=!0},_SmsSend:function(){var t=this;this.$com.checkPhone(this.mobile)?this.$api.SmsSend(this.mobile,"login").then(function(o){t.showbtn=!1,1==o.code?(t.$com.showtoast(o.msg),t.captcha=o.data):t.$com.showtoast(o.msg)}):this.$com.showtoast("请输入正确的手机号")},gonext:function(){var t=this;this.$com.checkPhone(this.mobile)?""==this.captcha?this.$com.showtoast("请输入验证码"):this.$api.MobileLogin(this.mobile,this.captcha).then(function(o){if(1==o.code){localStorage.user_twap=o.data.userinfo.token,t.$com.showtoast("登录成功");var e=decodeURIComponent(t.$route.query.redirect||"/");t.redirect?t.$router.push(e):t.$router.replace("/")}else t.$com.showtoast(o.msg||"稍后再试")}):this.$com.showtoast("请输入正确的手机号")},mobileinput:function(){this.mobile=this.mobile.replace(/[^\d]/g,"")},goagree:function(){this.$router.push({path:"/agreement"})},goprvide:function(){this.$router.push({path:"/privacy"})},backlogin:function(){this.$router.go(-1)}}},n={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"login_box"},[e("div",{staticClass:"login_head",on:{click:function(o){return t.$router.go(-1)}}},[e("div",{staticClass:"iconfont iconfanhui"})]),t._v(" "),e("div",{staticClass:"login_title"},[t._v("验证码登录")]),t._v(" "),e("div",{staticClass:"loginform"},[e("van-field",{attrs:{placeholder:"手机号",maxlength:"11",readonly:"",clickable:"",clearable:"",type:"text",clearable:""},on:{input:t.mobileinput},nativeOn:{touchstart:function(o){o.stopPropagation(),t.showkeybord=!0}},model:{value:t.mobile,callback:function(o){t.mobile=o},expression:"mobile"}}),t._v(" "),e("van-field",{attrs:{placeholder:"短信验证码",type:"text",maxlength:"6",center:"",clearable:""},model:{value:t.captcha,callback:function(o){t.captcha=o},expression:"captcha"}},[t.showbtn?e("van-button",{staticClass:"code",attrs:{slot:"button",type:"default",size:"small"},on:{click:t._SmsSend},slot:"button"},[t._v("\n                获取验证码\n            ")]):e("span",{attrs:{slot:"button"},slot:"button"},[e("span",[t._v("重新获取")]),t._v(" "),e("van-count-down",{ref:"countDown",attrs:{time:t.time,format:"ss","auto-start":t.atuostart},on:{finish:t.endtime}}),t._v(" "),e("span",[t._v("S")])],1)],1),t._v(" "),e("div",{staticClass:"login_btn",on:{click:t.gonext}},[t._v("登录")]),t._v(" "),e("div",{staticClass:"reg_agree"},[t._v("登录即同意"),e("span",{on:{click:t.goagree}},[t._v("《用户协议》")]),t._v("和"),e("span",{on:{click:t.goprvide}},[t._v("《隐私政策》")])]),t._v(" "),e("div",{staticClass:"login_pass",on:{click:t.backlogin}},[t._v("密码登录")]),t._v(" "),e("van-number-keyboard",{attrs:{show:t.showkeybord,maxlength:11},on:{blur:function(o){t.showkeybord=!1}},model:{value:t.mobile,callback:function(o){t.mobile=o},expression:"mobile"}})],1)])},staticRenderFns:[]};var i=e("VU/8")(a,n,!1,function(t){e("k8HN")},"data-v-46053c61",null);o.default=i.exports},k8HN:function(t,o){}});