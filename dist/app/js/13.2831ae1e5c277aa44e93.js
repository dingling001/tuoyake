webpackJsonp([13],{DCYO:function(t,n){},V9v4:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",[this.privacy_protocol?this._e():n("div",{staticClass:"list van-row--flex van-cell--center van-row--justify-center"},[n("van-loading",{attrs:{type:"spinner"}})],1),this._v(" "),n("div",{staticClass:"user_agreement",domProps:{innerHTML:this._s(this.privacy_protocol)}})])},staticRenderFns:[]};var i=e("VU/8")({name:"privacy",data:function(){return{privacy_protocol:""}},created:function(){this._CommonGetConfig()},methods:{_CommonGetConfig:function(){var t=this;this.$api.CommonGetConfig().then(function(n){t.privacy_protocol=n.data.privacy_protocol})}}},o,!1,function(t){e("DCYO")},"data-v-f14ca6a8",null);n.default=i.exports}});