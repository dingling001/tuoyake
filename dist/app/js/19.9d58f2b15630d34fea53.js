webpackJsonp([19],{SJNE:function(s,t){},yQFV:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={name:"reg",data:function(){return{mobile:"",captcha:"",repassword:"",newpassword:""}},created:function(){this.mobile=this.$route.query.mobile,this.captcha=this.$route.query.captcha},methods:{gologin:function(){this.$router.push({path:"/login",query:{}})},gonext:function(){var s=this;""==this.newpassword?this.$com.showtoast("请输入密码"):this.newpassword.length>12||this.newpassword.length<6?this.$com.showtoast("密码长度为6 - 12个字符"):""==this.repassword?this.$com.showtoast("请输入重复密码"):this.repassword.length>12||this.repassword.length<6?this.$com.showtoast("密码长度为6 - 12个字符"):this.newpassword!==this.repassword?this.$com.showtoast("密码与重复密码不一致"):this.$api.UserResetPwd(this.mobile,this.newpassword,this.repassword,this.captcha).then(function(t){1==t.code?(s.$com.showtoast("修改成功"),localStorage.removeItem("user_twap"),s.$router.replace("/login")):s.$com.showtoast(t.msg||"稍后再试")})}}},a={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"login_box"},[e("div",{staticClass:"login_head",on:{click:function(t){return s.$router.go(-1)}}},[e("div",{staticClass:"iconfont iconfanhui"})]),s._v(" "),e("div",{staticClass:"login_title"},[s._v("重置密码")]),s._v(" "),e("form",{staticClass:"loginform"},[e("van-field",{attrs:{label:"新密码",placeholder:"新密码",maxlength:"12",type:"password",clearable:"",autocomplete:""},model:{value:s.newpassword,callback:function(t){s.newpassword=t},expression:"newpassword"}}),s._v(" "),e("van-field",{attrs:{label:"确认新密码",placeholder:"确认新密码",maxlength:"12",type:"password",clearable:"",autocomplete:""},model:{value:s.repassword,callback:function(t){s.repassword=t},expression:"repassword"}}),s._v(" "),e("div",{staticClass:"login_btn",on:{click:s.gologin}},[s._v("前往登录")])],1)])},staticRenderFns:[]};var i=e("VU/8")(o,a,!1,function(s){e("SJNE")},"data-v-9289b53a",null);t.default=i.exports}});