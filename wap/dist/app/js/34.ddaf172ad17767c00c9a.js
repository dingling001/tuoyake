webpackJsonp([34],{ASW6:function(s,t){},Fr7f:function(s,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={render:function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("div",{staticClass:"tcbox"},[i("div",{staticClass:"swiperbox"},[i("img",{attrs:{src:s.goodinfo.image,alt:""}}),s._v(" "),i("van-sticky",{attrs:{offset:0}},[i("div",{staticClass:"navbox"},[i("span",{staticClass:"iconfont iconfanhui",on:{click:s.backlist}}),s._v(" "),i("div",{staticClass:"comnanme van-ellipsis"},[s._v(s._s(s.goodinfo.name))]),s._v(" "),i("div",{staticClass:"nright"},[i("span",{class:["iconfont",0==s.goodinfo.is_collection?"iconstar":"iconstar-fill"],on:{click:s.clllection}}),s._v(" "),i("span",{staticClass:"iconfont iconfenxiang"})])])])],1),s._v(" "),i("div",{staticClass:"comitem"},[i("div",{staticClass:"comnanme"},[s._v(s._s(s.goodinfo.name))]),s._v(" "),i("div",{staticClass:"comaddress"},[i("div",{staticClass:"adressitem"},[i("div",{staticClass:"address"},[s._v(s._s(s.goodinfo.bar_name))]),s._v(" "),i("div",{staticClass:"starbox"},[s._l(Number(s.goodinfo.star),function(s){return i("div",{staticClass:"iconfont iconstar-fill star"})}),s._v(" "),s._l(5-Number(s.goodinfo.star),function(t){return Number(s.goodinfo.star)<5?i("div",{staticClass:"iconfont iconstar-fill"}):s._e()})],2)])]),s._v(" "),i("div",{staticClass:"hr"}),s._v(" "),i("div",{staticClass:"taocaninfo"},[i("div",{staticClass:"tancantitle"},[s._v("套餐内容")]),s._v(" "),i("div",{staticClass:"taocannum"},[i("div",{staticClass:"taocandes"},[s._v(s._s(s.goodinfo.content))]),s._v(" "),i("div",{staticClass:"numbox"},[i("span",{class:["iconfont iconminus-circle",s.num<=0?"disicon":""],on:{click:s.nminus}}),s._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:s.num,expression:"num"}],attrs:{type:"number"},domProps:{value:s.num},on:{input:function(t){t.target.composing||(s.num=t.target.value)}}}),s._v(" "),i("span",{staticClass:"iconfont iconplus-circle",on:{click:s.plus}})])]),s._v(" "),i("div",{staticClass:"price"},[i("span",[s._v("单价")]),s._v(s._s(s.goodinfo.price)+"元")])]),s._v(" "),i("div",{staticClass:"hr"}),s._v(" "),s.goodinfo.rules.length?i("div",{staticClass:"taocaninfo"},[i("div",{staticClass:"tancantitle"},[s._v("使用规则")]),s._v(" "),i("ul",{staticClass:"rules"},s._l(s.goodinfo.rules,function(t,o){return i("li",{key:o},[i("span",{staticClass:"ruletitle"},[s._v(s._s(t.name))]),i("span",[s._v(s._s(t.value))])])}),0)]):s._e(),s._v(" "),i("div",{staticClass:"taocan_btn",on:{click:s.goapp}},[s._v("￥"+s._s(s.goodinfo.price*s.num)+" 立即抢购")])])])},staticRenderFns:[]};var n=i("C7Lr")({name:"taocan",data:function(){return{goodinfo:{star:0,rules:[],is_collection:0},cid:"",goods_id:"",num:0,is_share:0}},created:function(){this.$route.query.goods_id?(this.cid=this.$route.query.cid,this.goods_id=this.$route.query.goods_id,this._GetGoodsInfo()):this.$router.replace("/"),this.is_share=this.$route.query.is_share},methods:{_GetGoodsInfo:function(){var s=this;this.$api.GetGoodsInfo(this.goods_id).then(function(t){1==t.code&&(s.goodinfo=t.data)})},backlist:function(){1==this.is_share?this.$router.push({path:"/competitiondetail",query:{id:this.cid}}):this.$router.go(-1)},clllection:function(){var s=this;this.$api.SetCollection(4,this.goods_id).then(function(t){1==t.code&&(1==t.data.is_collection?(s.$com.showtoast("收藏成功"),s.goodinfo.is_collection=1):(s.$com.showtoast("取消收藏"),s.goodinfo.is_collection=0))})},plus:function(){this.num+=1},nminus:function(){this.num>0&&(this.num-=1)},goapp:function(){this.$router.push("/download")}}},o,!1,function(s){i("ASW6")},"data-v-0e1ccb8d",null);t.default=n.exports}});