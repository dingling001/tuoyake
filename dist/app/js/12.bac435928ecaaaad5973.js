webpackJsonp([12],{Gv95:function(t,e){},PnLa:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"rbox"},[t.myshow&&t.mylist.length?i("div",{staticClass:"rlist"},t._l(t.mylist,function(e,s){return i("div",{key:e.id,staticClass:"ritem",on:{click:function(i){return t.goreward_d_app(e.id)}}},[i("div",{staticClass:"rname"},[t._v("领取时间："+t._s(e.create_time))]),t._v(" "),i("div",{staticClass:"rinfo"},[i("van-image",{attrs:{fit:"contain",width:"1.6rem",height:"1.6rem",src:e.image}}),t._v(" "),i("div",{staticClass:"rcontent"},[i("div",{staticClass:"rgname"},[t._v(t._s(e.goods_name))]),t._v(" "),i("div",{staticClass:"rdes"},[t._v("X1")]),t._v(" "),i("div",{},[t._v(t._s(e.content))])]),t._v(" "),i("div",{staticClass:"iconfont iconjiantou"})],1)])}),0):t._e(),t._v(" "),t.myshow&&0==t.mylist.length?i("NoData",{attrs:{text:"暂无领取数据"}}):t._e()],1)},staticRenderFns:[]};var a=i("VU/8")({name:"myGift",data:function(){return{mylist:[],myshow:!1}},created:function(){this._ScoreMyReceived()},methods:{_ScoreMyReceived:function(){var t=this;this.$api.SignMyReceived().then(function(e){t.myshow=!0,1==e.code&&(t.mylist=e.data)})},goreward_d_app:function(t){this.$router.push({path:"/reward_d_app",query:{goods_id:t}})}}},s,!1,function(t){i("Gv95")},"data-v-d6b8f628",null);e.default=a.exports}});