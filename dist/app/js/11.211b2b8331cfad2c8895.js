webpackJsonp([11],{WY8H:function(t,s){},n3qO:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a={name:"reward_d_app",data:function(){return{addinfo:{},item:{},showadd:!1,noorder:e("UYBQ")}},created:function(){this.goods_id=this.$route.query.goods_id,this._ScoreMyReceived()},methods:{_ScoreMyReceived:function(){var t=this;this.$api.ScoreReceivedDetail(this.goods_id).then(function(s){1==s.code&&(t.item=s.data)})},que_fadeback:function(){this.$router.push({path:"/myFeedback"})}}},i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"rbox"},[e("div",{staticClass:"rbox"},[e("div",{staticClass:"aitem"},[e("div",{staticClass:"left"},[e("div",{staticClass:"address"},[t._v(t._s(t.item.address))]),t._v(" "),e("div",{staticClass:"namebx"},[e("span",[t._v(t._s(t.item.name))]),t._v(" "),e("span",[t._v(t._s(t.item.mobile))])]),t._v(" "),1==t.addinfo.is_default?e("span",{staticClass:"default_a"},[t._v("默认")]):t._e()])]),t._v(" "),e("div",{staticClass:"ritem"},[e("div",{staticClass:"rname"},[t._v("奖品信息")]),t._v(" "),e("div",{staticClass:"rinfo"},[e("van-image",{attrs:{width:"60px",height:"60px",fit:"cover",src:t.item.image}}),t._v(" "),e("div",{staticClass:"rcontent"},[e("div",{staticClass:"rgname"},[t._v(t._s(t.item.goods_name))]),t._v(" "),e("div",{staticClass:"rdes"},[t._v("X1")])])],1)]),t._v(" "),e("div",{staticClass:"aitem"},[e("div",{staticClass:"left"},[e("div",{staticClass:"address"},[t._v("领取时间")]),t._v(" "),e("div",[t._v(t._s(t.item.create_time))])])]),t._v(" "),e("div",{staticClass:"btn",on:{click:t.que_fadeback}},[t._v("问题反馈")])])])},staticRenderFns:[]};var d=e("VU/8")(a,i,!1,function(t){e("WY8H")},"data-v-f83a9f9e",null);s.default=d.exports}});