webpackJsonp([16],{Bgbc:function(i,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e={name:"takeReward",data:function(){return{item:{},noorder:t("UYBQ"),goods_id:"",addinfo:{},winning_receive_explain:"",showadd:!1}},created:function(){this.goods_id=this.$route.query.goods_id,this._ScoreMyReceived(),this._CommonGetConfig(),this._addressSingle()},components:{},methods:{_addressSingle:function(){var i=this;this.$api.addressSingle().then(function(s){i.showadd=!0,1==s.code&&(i.addinfo=s.data)})},goaddress:function(){this.$router.push({path:"/myAddress",query:{choose:1}})},addardess:function(){this.$router.push({path:"/myAddress",query:{choose:1}})},_ScoreMyReceived:function(){var i=this;this.$api.ScoreDetail(this.goods_id).then(function(s){1==s.code&&(i.item=s.data)})},_CommonGetConfig:function(){var i=this;this.$api.CommonGetConfig().then(function(s){i.winning_receive_explain=s.data.winning_receive_explain})},_SignReceive:function(){var i=this;this.$api.ScoreReceive(this.item.id,this.addinfo.id).then(function(s){1==s.code?(i.$com.showtoast("领取成功，等待工作人员处理..."),i.$router.go(-1)):i.$com.showtoast(s.msg)})}}},a={render:function(){var i=this,s=i.$createElement,t=i._self._c||s;return t("div",{staticClass:"rbox"},[i.showadd&&Object.keys(i.addinfo).length?t("div",{staticClass:"aitem",on:{click:i.goaddress}},[t("div",{staticClass:"left"},[t("div",{staticClass:"address"},[i._v(i._s(i.addinfo.province)+i._s(i.addinfo.city)+i._s(i.addinfo.district)+i._s(i.addinfo.address))]),i._v(" "),t("div",[i._v(i._s(i.addinfo.name)+" "+i._s(i.addinfo.mobile))]),i._v(" "),1==i.addinfo.is_default?t("span",{staticClass:"default_a"},[i._v("默认")]):i._e()]),i._v(" "),t("div",{staticClass:"iconfont iconjiantou"})]):i._e(),i._v(" "),i.showadd&&0==Object.keys(i.addinfo).length?t("div",{staticClass:"aitem noadd",on:{click:i.addardess}},[t("i",{staticClass:"iconfont iconplus-circle"}),t("span",[i._v("添加地址")])]):i._e(),i._v(" "),t("div",{staticClass:"ritem"},[t("div",{staticClass:"rname"},[i._v("奖品信息")]),i._v(" "),t("div",{staticClass:"rinfo"},[t("van-image",{attrs:{fit:"contain",width:"1.6rem",height:"1.6rem",src:i.item.image}}),i._v(" "),t("div",{staticClass:"rcontent"},[t("div",{staticClass:"rgname"},[i._v(i._s(i.item.goods_name))]),i._v(" "),t("div",{staticClass:"rdes"},[i._v("X1")]),i._v(" "),t("div",{},[i._v(i._s(i.item.content))])])],1)]),i._v(" "),t("div",{staticClass:"aitem"},[t("div",{staticClass:"left"},[t("div",{staticClass:"address"},[i._v("领取说明")]),i._v(" "),t("div",{domProps:{innerHTML:i._s(i.winning_receive_explain)}})])]),i._v(" "),t("div",{staticClass:"btn",on:{click:i._SignReceive}},[i._v("确认领取")])])},staticRenderFns:[]};var n=t("VU/8")(e,a,!1,function(i){t("ESRP")},"data-v-d3903a44",null);s.default=n.exports},ESRP:function(i,s){}});