webpackJsonp([37],{"Ey/e":function(t,s){},qhnI:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"rbox"},[t.show&&t.sglist.length?a("div",{staticClass:"rlist"},t._l(t.sglist,function(s,e){return a("div",{key:s.id,staticClass:"ritem",on:{click:function(a){return t.gotakereward(s.id,s.status)}}},[a("div",{staticClass:"rname"},[t._v("累计获奖 "+t._s(s.times)+" 次可领取：")]),t._v(" "),a("div",{staticClass:"rinfo"},[a("van-image",{attrs:{fit:"contain",width:"1.6rem",height:"1.6rem",src:s.image}}),t._v(" "),a("div",{staticClass:"rcontent"},[a("div",{staticClass:"rgname"},[t._v(t._s(s.goods_name))]),t._v(" "),a("div",{staticClass:"rdes"},[t._v("X1")]),t._v(" "),a("div",[t._v(t._s(s.content))])]),t._v(" "),a("van-button",{attrs:{type:"default",disabled:1!=s.status}},[1==s.status?a("span",[t._v("去领取")]):2==s.status?a("span",[t._v("已领取")]):0==s.status?a("span",{staticClass:"status"},[t._v("未达成")]):t._e()])],1)])}),0):t._e(),t._v(" "),t.show&&0==t.sglist.length?a("div",{staticClass:"rlist"},[a("NoData",{attrs:{text:"暂无奖品"}})],1):t._e()])},staticRenderFns:[]};var i=a("VU/8")({name:"myReward",data:function(){return{show:!1,sglist:[]}},created:function(){this._ScoreGoods()},methods:{_ScoreGoods:function(){var t=this;this.$api.SignGoods().then(function(s){t.show=!0,1==s.code&&(t.sglist=s.data)})},gotakereward:function(t,s){1==s&&this.$router.push({path:"/takeReward_app",query:{goods_id:t}})}}},e,!1,function(t){a("Ey/e")},"data-v-2dcaf4c4",null);s.default=i.exports}});