webpackJsonp([20],{"8Tp1":function(t,o,a){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n={render:function(){var t=this,o=t.$createElement,a=t._self._c||o;return a("div",{staticClass:"login_box"},[a("div",{staticClass:"login_head",on:{click:function(o){return t.$router.go(-1)}}},[a("div",{staticClass:"iconfont iconfanhui"})]),t._v(" "),a("div",{staticClass:"login_title"},[t._v("账号注册")]),t._v(" "),a("form",{staticClass:"loginform"},[a("van-field",{attrs:{placeholder:"请输入手机号",maxlength:"11",readonly:"",clickable:"",clearable:"",type:"text",clearable:""},on:{input:t.accountinput},nativeOn:{touchstart:function(o){o.stopPropagation(),t.showkeybord=!0}},model:{value:t.account,callback:function(o){t.account=o},expression:"account"}}),t._v(" "),a("van-field",{attrs:{placeholder:"短信验证码",type:"text",maxlength:"6",center:"",clearable:""},model:{value:t.captcha,callback:function(o){t.captcha=o},expression:"captcha"}},[t.showbtn?a("div",{staticClass:"code",attrs:{slot:"button",type:"default",size:"small"},on:{click:t._SmsSend},slot:"button"},[t._v("获取验证码")]):a("span",{attrs:{slot:"button"},slot:"button"},[a("span",[t._v("重新获取")]),t._v(" "),a("van-count-down",{ref:"countDown",attrs:{time:t.time,format:"ss","auto-start":t.atuostart},on:{finish:t.endtime}}),t._v(" "),a("span",[t._v("S")])],1)]),t._v(" "),a("van-number-keyboard",{attrs:{show:t.showkeybord,maxlength:11},on:{blur:function(o){t.showkeybord=!1}},model:{value:t.account,callback:function(o){t.account=o},expression:"account"}}),t._v(" "),a("div",{staticClass:"login_btn",on:{click:t.gonext}},[t._v("下一步")]),t._v(" "),a("div",{staticClass:"reg_agree",on:{click:t.goagree}},[t._v("我已阅读并同意"),a("span",[t._v("《用戶协议》")])])],1)])},staticRenderFns:[]};var c=a("VU/8")({name:"reg",data:function(){return{account:"",captcha:"",show:!1,time:6e4,showbtn:!0,redirect:"",atuostart:!0,codeerrormsg:"",showkeybord:!1}},created:function(){},methods:{_SmsSend:function(){var t=this;this.codeerrormsg="",this.$com.checkPhone(this.account)?this.$api.SmsSend(this.account,"register").then(function(o){t.showbtn=!1,1==o.code?(t.$com.showtoast(o.msg),t.captcha=o.data):(t.codeerrormsg=o.msg,t.$com.showtoast(o.msg))}):this.$com.showtoast("请输入正确的手机号")},endtime:function(){this.showbtn=!0},gonext:function(){this.$com.checkPhone(this.account)?""==this.captcha?this.$com.showtoast("请输入验证码"):this.$router.push({path:"/regnext",query:{account:this.account,captcha:this.captcha}}):this.$com.showtoast("请输入正确的手机号")},accountinput:function(){this.account=this.account.replace(/[^\d]/g,"")},goagree:function(){this.$router.push({path:"/agreement"})}}},n,!1,function(t){a("DP7m")},"data-v-7db6bd36",null);o.default=c.exports},DP7m:function(t,o){}});