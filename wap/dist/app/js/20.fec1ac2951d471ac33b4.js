webpackJsonp([20],{jzCo:function(s,t){},xog9:function(s,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});a("v2ns");var i=a("F3EI"),n={name:"competitiondetail",data:function(){return{id:"",comdata:{goods:[],info:{album_images:[],star:0,is_collection:0},match:[]},swiperOption:{pagination:".swiper-pagination",observers:!0,observeParents:!0,spaceBetween:10,loop:!0,autoplay:3e3},show:!1,index:0,is_share:0}},components:{swiper:i.swiper,swiperSlide:i.swiperSlide},created:function(){this.$route.query.id?(this.id=this.$route.query.id,this._GetBarInfo()):this.$router.replace("/"),this.is_share=this.$route.query.is_share},methods:{_GetBarInfo:function(){var s=this;this.$api.GetBarInfo(this.id).then(function(t){1==t.code&&(s.comdata=t.data)})},gotaocandetail:function(s){this.$router.push({path:"/taocan",query:{goods_id:s,cid:this.id}})},gossdetail:function(s){this.$router.push({path:"/gamedetail",query:{match_id:s,cid:this.id}})},backlist:function(){1==this.is_share?this.$router.push("/competition"):this.$router.go(-1)},onChange:function(s){this.index=s},clllection:function(){var s=this;this.$api.SetCollection(1,this.comdata.info.id).then(function(t){1==t.code&&(1==t.data.is_collection?(s.$com.showtoast("收藏成功"),s.comdata.info.is_collection=1):(s.$com.showtoast("取消收藏"),s.comdata.info.is_collection=0))})}}},o={render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"combox"},[a("div",{staticClass:"swiperbox"},[a("img",{attrs:{src:s.comdata.info.album_images[0],alt:""}}),s._v(" "),a("van-sticky",{attrs:{offset:0}},[a("div",{staticClass:"navbox"},[a("span",{staticClass:"iconfont iconfanhui",on:{click:s.backlist}}),s._v(" "),a("div",{staticClass:"comnanme van-ellipsis"},[s._v(s._s(s.comdata.info.name))]),s._v(" "),a("div",{staticClass:"nright"},[a("span",{class:["iconfont",0==s.comdata.info.is_collection?"iconstar":"iconstar-fill"],on:{click:s.clllection}}),s._v(" "),a("span",{staticClass:"iconfont iconfenxiang"})])])]),s._v(" "),s.comdata.info.album_images.length>0?a("div",{staticClass:"album",on:{click:function(t){s.show=!0}}},[a("span",{staticClass:"iconfont iconimage"}),s._v(" "),a("span",[s._v(s._s(s.comdata.info.album_images.length))])]):s._e(),s._v(" "),s.comdata.info.album_images.length?a("van-image-preview",{attrs:{images:s.comdata.info.album_images},on:{change:s.onChange},scopedSlots:s._u([{key:"index",fn:function(){return[s.comdata.info.album_images.length?a("div",{staticClass:"preview",on:{click:function(t){s.show=!1}}},[a("span",{staticClass:"iconfont iconfanhui"}),a("span",[s._v("相册（"+s._s(s.comdata.info.album_images.length)+"）")]),a("span",[s._v(s._s(s.index+1)+"/"+s._s(s.comdata.info.album_images.length))])]):s._e()]},proxy:!0}],null,!1,3561033764),model:{value:s.show,callback:function(t){s.show=t},expression:"show"}}):s._e()],1),s._v(" "),a("div",{staticClass:"comitem"},[a("div",{staticClass:"comnanme"},[s._v(s._s(s.comdata.info.name))]),s._v(" "),a("div",{staticClass:"starbox"},[s._l(Number(s.comdata.info.star),function(s){return a("div",{staticClass:"iconfont iconstar-fill star"})}),s._v(" "),s._l(5-Number(s.comdata.info.star),function(t){return Number(s.comdata.info.star)<5?a("div",{staticClass:"iconfont iconstar-fill"}):s._e()})],2),s._v(" "),a("div",{staticClass:"comaddress"},[a("div",{staticClass:"adressitem"},[a("span",{staticClass:"iconfont icondingweiweizhi"}),s._v(" "),a("div",{staticClass:"address"},[s._v(s._s(s.comdata.info.address)+"\n                    "),a("div",{staticClass:"juli"},[s._v("距您"+s._s(s.comdata.info.distance))])])]),s._v(" "),a("a",{staticClass:"phonecall",attrs:{href:"tel:"+s.comdata.info.contact_number}},[a("span",{staticClass:"iconfont iconphone-fill"})])]),s._v(" "),a("div",{staticClass:"hr"}),s._v(" "),s.comdata.goods.length?a("div",{staticClass:"comlist"},[s._m(0),s._v(" "),s._l(s.comdata.goods,function(t,i){return a("div",{key:t.id,staticClass:"jitem van-row--flex",on:{click:function(a){return s.gotaocandetail(t.id)}}},[a("div",{staticClass:"jimg"},[a("img",{attrs:{src:t.image,alt:""}})]),s._v(" "),a("div",{staticClass:"jright"},[a("div",{staticClass:"jname van-ellipsis"},[s._v(s._s(t.name))]),s._v(" "),a("div",{staticClass:"jaddress van-ellipsis"},[s._v(s._s(t.content))]),s._v(" "),a("div",{staticClass:"price"},[s._v("￥"+s._s(t.price))])]),s._v(" "),a("div",{staticClass:"jbtn"},[s._v("抢购")])])})],2):s._e(),s._v(" "),a("div",{staticClass:"hr"}),s._v(" "),s.comdata.match.length?a("div",{staticClass:"comlist"},[a("div",{staticClass:"taocan"},[s._m(1),s._v(" "),s.comdata.match.length>1?a("div",{staticClass:"all"},[s._v("全部 "),a("span",{staticClass:"iconfont iconjiantou"})]):s._e()]),s._v(" "),s._l(s.comdata.match,function(t,i){return a("div",{key:t.id,staticClass:"jitem van-row--flex",on:{click:function(a){return s.gossdetail(t.id)}}},[a("div",{staticClass:"jimg"},[a("img",{attrs:{src:t.image,alt:""}}),s._v(" "),1==t.recommend?a("span",[s._v("精选")]):s._e()]),s._v(" "),a("div",{staticClass:"jright"},[a("div",{staticClass:"jname van-ellipsis"},[s._v(s._s(t.league_name))]),s._v(" "),a("div",{staticClass:"jaddress van-ellipsis"},[a("span",{staticClass:"iconfont icontime-circle"}),s._v("\n                        "+s._s(t.start_time)+" ~ "+s._s(t.end_time)+"\n                    ")]),s._v(" "),a("div",{staticClass:"synopsis van-ellipsis"},[s._v(s._s(t.synopsis))])]),s._v(" "),a("div",{staticClass:"jbtn s_jbtn"},[s._v("报名")])])})],2):s._e()])])},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"taocan"},[t("div",{staticClass:"spanbox"},[t("span",{staticClass:"span"},[this._v("惠")]),this._v(" "),t("span",[this._v("套餐")])])])},function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"spanbox"},[t("span",{staticClass:"span"},[this._v("赛")]),t("span",[this._v("赛事")])])}]};var c=a("VU/8")(n,o,!1,function(s){a("jzCo")},"data-v-754cf9a1",null);t.default=c.exports}});