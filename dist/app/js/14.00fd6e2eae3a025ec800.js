webpackJsonp([14],{"1jMN":function(t,a){},HxBs:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n={name:"myVersion",data:function(){return{platinfo:{}}},created:function(){this._Platform()},methods:{_Platform:function(){var t=this;this.$api.Platform().then(function(a){1==a.code&&(t.platinfo=a.data)})}}},i={render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"pbox"},[a("div",{staticClass:"plogo"},[a("img",{attrs:{src:this.platinfo.logo,alt:""}})])])},staticRenderFns:[]};var o=e("VU/8")(n,i,!1,function(t){e("1jMN")},"data-v-bbeae044",null);a.default=o.exports}});