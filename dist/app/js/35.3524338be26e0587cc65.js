webpackJsonp([35],{"+kNv":function(e,t){},ja1F:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={name:"agreement",data:function(){return{user_agreement:""}},created:function(){this._CommonGetConfig()},methods:{_CommonGetConfig:function(){var e=this;this.$api.CommonGetConfig().then(function(t){e.user_agreement=t.data.user_agreement})}}},s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[this.user_agreement?this._e():t("div",{staticClass:"list van-row--flex van-cell--center van-row--justify-center"},[t("van-loading",{attrs:{type:"spinner"}})],1),this._v(" "),t("div",{staticClass:"user_agreement",domProps:{innerHTML:this._s(this.user_agreement)}})])},staticRenderFns:[]};var a=n("VU/8")(r,s,!1,function(e){n("+kNv")},"data-v-43c14234",null);t.default=a.exports}});