webpackJsonp([32],{Bgbc:function(i,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={name:"takeReward",data:function(){return{item:{},noorder:e("UYBQ"),goods_id:"",addinfo:{},score_receive_explain:"",showadd:!1,loadingtext:"",loading:!1}},created:function(){this.goods_id=this.$route.query.goods_id,this._ScoreMyReceived(),this._CommonGetConfig(),this._addressSingle()},components:{},methods:{_addressSingle:function(){var i=this;this.$api.addressSingle().then(function(t){i.showadd=!0,1==t.code&&(i.addinfo=t.data)})},goaddress:function(){this.$router.push({path:"/myAddress",query:{choose:1}})},addardess:function(){this.$router.push({path:"/myAddress",query:{choose:1}})},_ScoreMyReceived:function(){var i=this;this.$api.ScoreDetail(this.goods_id).then(function(t){1==t.code&&(i.item=t.data)})},_CommonGetConfig:function(){var i=this;this.$api.CommonGetConfig().then(function(t){i.score_receive_explain=t.data.score_receive_explain})},_SignReceive:function(){var i=this;this.loading=!0,this.loadingtext="领取中...",this.$api.ScoreReceive(this.item.id,this.addinfo.id).then(function(t){i.loading=!1,1==t.code?(i.$com.showtoast("领取成功，等待工作人员处理..."),setTimeout(function(){this.$router.go(-1)},1500)):i.$com.showtoast(t.msg)})}}},a={render:function(){var i=this,t=i.$createElement,e=i._self._c||t;return e("div",{staticClass:"rbox"},[i.showadd&&0!=i.addinfo.id?e("div",{staticClass:"aitem",on:{click:i.goaddress}},[e("div",{staticClass:"left"},[e("div",{staticClass:"address"},[i._v(i._s(i.addinfo.province)+i._s(i.addinfo.city)+i._s(i.addinfo.district)+i._s(i.addinfo.address))]),i._v(" "),e("div",[i._v(i._s(i.addinfo.name)+" "+i._s(i.addinfo.mobile))]),i._v(" "),1==i.addinfo.is_default?e("span",{staticClass:"default_a"},[i._v("默认")]):i._e()]),i._v(" "),e("div",{staticClass:"iconfont iconjiantou"})]):i._e(),i._v(" "),i.showadd&&0==i.addinfo.id?e("div",{staticClass:"aitem noadd",on:{click:i.addardess}},[e("i",{staticClass:"iconfont iconplus-circle"}),e("span",[i._v("添加地址")])]):i._e(),i._v(" "),Object.keys(i.item).length?e("div",{staticClass:"ritem"},[e("div",{staticClass:"rname"},[i._v("奖品信息")]),i._v(" "),e("div",{staticClass:"rinfo"},[e("van-image",{attrs:{fit:"contain",width:"1.6rem",height:"1.6rem",src:i.item.image}}),i._v(" "),e("div",{staticClass:"rcontent"},[e("div",{staticClass:"rgname"},[i._v(i._s(i.item.goods_name))]),i._v(" "),e("div",{staticClass:"rdes"},[i._v("X1")]),i._v(" "),e("div",{},[i._v(i._s(i.item.content))])])],1)]):i._e(),i._v(" "),e("div",{staticClass:"aitem"},[e("div",{staticClass:"left"},[e("div",{staticClass:"address"},[i._v("领取说明")]),i._v(" "),e("div",{domProps:{innerHTML:i._s(i.score_receive_explain)}})])]),i._v(" "),e("van-button",{staticClass:"btn",attrs:{disabled:0==Object.keys(i.item).length,loading:i.loading,type:"info","loading-text":i.loadingtext},on:{click:i._SignReceive}},[i._v("确认领取\n    ")])],1)},staticRenderFns:[]};var d=e("VU/8")(s,a,!1,function(i){e("Q2Gg")},"data-v-4339e8be",null);t.default=d.exports},Q2Gg:function(i,t){}});