webpackJsonp([5],{GVfn:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a={name:"myOrder",data:function(){return{offset:0,type:0,active:0,list:[],isDownLoading:!1,isUpLoading:!1,finished:!1,page:0,img1:s("P3ge"),ordershow:!1}},created:function(){this._CollectionIndex()},methods:{_CollectionIndex:function(){var t=this,i=this.page+1;this.$api.OrderIndex(i,this.type).then(function(i){t.ordershow=!0,1==i.code&&(t.list.length?(t.isUpLoading&&(t.list=t.list.concat(i.data.data),t.$nextTick(function(){t.isUpLoading=!1}),i.data.data.length<10&&(t.finished=!0)),t.isDownLoading&&(t.isDownLoading=!1,t.list=i.data.data,t.finished&&(t.finished=!1))):t.list=i.data.data)}),this.$com.showtoast("加载中…","","",1e3,"",!1,!0)},onRefresh:function(){var t=this;setTimeout(function(){console.log(t.type),t.$com.showtoast("刷新成功"),t.isDownLoading=!1,t.page=0,t._CollectionIndex()},500)},onLoad:function(){this.page++,this.isUpLoading=!0,this._CollectionIndex()},changetype:function(){this.page=0,this.type=this.active,this.ordershow=!1,this.list=[],this._CollectionIndex()},godetail:function(t){this.$router.push({path:"/download"})}}},e={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"colbox"},[s("van-tabs",{attrs:{"title-inactive-color":"#666","title-active-color":"#333",sticky:"","offset-top":110,color:"#2C6BEA","line-width":"30px"},on:{click:t.changetype},model:{value:t.active,callback:function(i){t.active=i},expression:"active"}},[s("van-tab",{attrs:{title:"全部"}}),t._v(" "),s("van-tab",{attrs:{title:"未付款"}}),t._v(" "),s("van-tab",{attrs:{title:"未使用"}}),t._v(" "),s("van-tab",{attrs:{title:"已使用"}}),t._v(" "),s("van-tab",{attrs:{title:"取消/退款"}}),t._v(" "),t.ordershow&&t.list.length?s("van-pull-refresh",{attrs:{offset:t.offset},on:{refresh:t.onRefresh},model:{value:t.isDownLoading,callback:function(i){t.isDownLoading=i},expression:"isDownLoading"}},[s("van-list",{staticClass:"clist",attrs:{finished:t.finished,"finished-text":"到底了"},on:{load:t.onLoad},model:{value:t.isUpLoading,callback:function(i){t.isUpLoading=i},expression:"isUpLoading"}},t._l(t.list,function(i,a){return s("div",{key:a,staticClass:"citem",on:{click:function(s){return t.godetail(i.id)}}},[s("div",{staticClass:"barnamebox"},[s("span",{staticClass:"braname"},[t._v(t._s(i.bar_name))]),s("span",{staticClass:"status"},[t._v(t._s(i.status_text))])]),t._v(" "),s("div",{staticClass:"barinfo"},[s("div",{staticClass:"cimg"},[s("img",{attrs:{src:i.image,alt:""}})]),t._v(" "),s("div",{staticClass:"cinfo"},[s("div",[t._v(t._s(i.goods_name))]),t._v(" "),s("div",[t._v("下单时间："+t._s(i.create_time))]),t._v(" "),s("div",{staticClass:"order_num"},[t._v("X"+t._s(i.number))])])]),t._v(" "),s("div",{staticClass:"cright"},[s("div",[t._v("总金额："),s("span",[t._v("￥39.8")])]),t._v(" "),s("div",{staticClass:"btns"},[s("van-button",{attrs:{type:"default",plain:""}},[t._v("详情")])],1)])])}),0)],1):t._e(),t._v(" "),t.ordershow&&0==t.list.length?s("div",{staticClass:"clist"},[s("NoData",{attrs:{img:t.img1,text:""}})],1):t._e()],1)],1)},staticRenderFns:[]};var n=s("VU/8")(a,e,!1,function(t){s("lsfn")},"data-v-9e99b1de",null);i.default=n.exports},P3ge:function(t,i,s){t.exports=s.p+"app/img/noorder.4f0745b.png"},lsfn:function(t,i){}});