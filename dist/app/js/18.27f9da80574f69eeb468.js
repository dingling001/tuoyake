webpackJsonp([18],{LhhE:function(d,e){},YOAI:function(d,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={render:function(){var d=this,e=d.$createElement,t=d._self._c||e;return t("div",{staticClass:"myadd"},[t("van-address-list",{attrs:{list:d.list,"add-button-text":"+ 新建收货地址"},on:{add:d.onAdd,edit:d.onEdit},model:{value:d.chosenAddressId,callback:function(e){d.chosenAddressId=e},expression:"chosenAddressId"}},[0==d.list.length?t("div",{staticClass:"nodata",attrs:{slot:"default"},slot:"default"},[d._v("\n            暂无地址\n        ")]):d._e()])],1)},staticRenderFns:[]};var n=t("VU/8")({name:"myAddress",data:function(){return{chosenAddressId:"1",list:[]}},created:function(){this._AddressIndex()},methods:{_AddressIndex:function(){var d=this;this.$api.AddressIndex().then(function(e){if(1==e.code){var t=e.data;for(var s in t)d.list.push({id:t[s].id,name:t[s].name,tel:t[s].mobile,address:t[s].address})}})},onAdd:function(){this.$router.push({path:"/editAddress",query:{add:0}})},onEdit:function(){}}},s,!1,function(d){t("LhhE")},"data-v-b392ce0e",null);e.default=n.exports}});