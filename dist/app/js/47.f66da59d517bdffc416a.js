webpackJsonp([47],{"2MHE":function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var s={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"login_box"},[e("div",{staticClass:"login_head",on:{click:function(o){return t.$router.go(-1)}}},[e("div",{staticClass:"iconfont iconfanhui"})]),t._v(" "),e("div",{staticClass:"login_title"},[t._v("验证手机")]),t._v(" "),e("form",{staticClass:"loginform"},[e("van-field",{attrs:{placeholder:"手机号",type:"number",maxlength:"11",clearable:""},on:{input:t.accountinput},nativeOn:{touchstart:function(o){o.stopPropagation(),t.showkeybord=!0}},model:{value:t.mobile,callback:function(o){t.mobile=o},expression:"mobile"}}),t._v(" "),e("van-field",{attrs:{placeholder:"短信验证码",type:"text",maxlength:"6",center:"",clearable:""},model:{value:t.captcha,callback:function(o){t.captcha=o},expression:"captcha"}},[t.showbtn?e("div",{staticClass:"code",attrs:{slot:"button",type:"default",size:"small"},on:{click:t._SmsSend},slot:"button"},[t._v("获取验证码")]):e("span",{attrs:{slot:"button"},slot:"button"},[e("span",[t._v("重新获取")]),t._v(" "),e("van-count-down",{ref:"countDown",attrs:{time:t.time,format:"ss","auto-start":t.atuostart},on:{finish:t.endtime}}),t._v(" "),e("span",[t._v("S")])],1)]),t._v(" "),e("div",{staticClass:"login_btn",on:{click:t.gonext}},[t._v("继续")])],1),t._v(" "),e("van-number-keyboard",{attrs:{show:t.showkeybord,maxlength:11},on:{blur:function(o){t.showkeybord=!1}},model:{value:t.mobile,callback:function(o){t.mobile=o},expression:"mobile"}})],1)},staticRenderFns:[]};var n=e("VU/8")({name:"reg",data:function(){return{mobile:"",captcha:"",show:!1,time:6e4,showbtn:!0,redirect:"",atuostart:!0,showkeybord:!1,showkeybordcode:!1}},created:function(){},methods:{endtime:function(){this.showbtn=!0},_SmsSend:function(){var t=this;this.$com.checkPhone(this.mobile)?this.$api.SmsSend(this.mobile,"resetpwd").then(function(o){t.showbtn=!1,1==o.code?(t.$com.showtoast(o.msg),t.captcha=o.data):t.$com.showtoast(o.msg)}):this.$com.showtoast("请输入正确的手机号")},gonext:function(){var t=this;this.$com.checkPhone(this.mobile)?""==this.captcha?this.$com.showtoast("请输入验证码"):this.$api.SmsCheck(this.mobile,"resetpwd",this.captcha,1).then(function(o){1==o.code?t.$router.push({path:"/resetpass",query:{mobile:t.mobile,captcha:t.captcha}}):t.$com.showtoast(o.msg)}):this.$com.showtoast("请输入正确的新手机号")},accountinput:function(){this.mobile=this.mobile.replace(/[^\d]/g,"")}}},s,!1,function(t){e("ZXno")},"data-v-067d7e9d",null);o.default=n.exports},ZXno:function(t,o){}});