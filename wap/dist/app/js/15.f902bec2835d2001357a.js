webpackJsonp([15],{aotz:function(i,t){},hHrA:function(i,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});s("v2ns");var e=s("F3EI"),n={name:"school",data:function(){return{swiperOption:{pagination:".swiper-pagination",slidesPerView:"auto",spaceBetween:24,freeMode:!0,observers:!0,observeParents:!0},navlist:[],ind:-1,clist:[],clublist:[],page:0,keyword:"",city:"",category_id:"",isUpLoading:!1,isDownLoading:!1,finished:!1,offset:-200,finishedtext:"到底了"}},components:{swiper:e.swiper,swiperSlide:e.swiperSlide},created:function(){this.get_CollegeCategory()},watch:{city:{handler:function(i){this.city=i,console.log(i),this._CollegeIndex()},immediate:!0}},methods:{get_CollegeCategory:function(){var i=this;this.$api.CollegeCategory().then(function(t){console.log(t),1==t.code&&(i.navlist=t.data)})},_CollegeIndex:function(){var i=this,t=this.page+1;this.$com.showtoast("加载中…","","",1e3,"",!1,!0),this.$api.CollegeIndex(t,this.category_id,this.keyword,this.city).then(function(t){1==t.code&&(i.clublist.length?(i.isUpLoading&&(i.clublist=i.clublist.concat(t.data.data),i.$nextTick(function(){i.isUpLoading=!1}),t.data.data.length<10&&(i.finished=!0,i.finishedtext="到底了")),i.isDownLoading&&(i.isDownLoading=!1,i.clublist=t.data.data,i.finished&&(i.finished=!1))):(console.log(t),i.clublist=t.data.data,i.finishedtext="没有更多了"))})},onRefresh:function(){var i=this;setTimeout(function(){i.$com.showtoast("刷新成功"),i.isDownLoading=!1,i.page=0,i._CollegeIndex()},500)},onLoad:function(){this.page++,console.log("onload"),this.isUpLoading=!0,this._CollegeIndex()},activeList:function(i,t){this.page=0,this.ind=i,this.category_id=t,this._CollegeIndex()},godetail:function(i){this.$router.push({path:"/schooldetail",query:{college_id:i}})}}},a={render:function(){var i=this,t=i.$createElement,s=i._self._c||t;return s("div",{staticClass:"sbox"},[s("div",{staticClass:"swiperbox"},[s("div",{staticClass:"all",class:{activespan:-1==i.ind},on:{click:function(t){return i.activeList(-1,"")}}},[s("span",[i._v("全部地区")]),s("span",{staticClass:"iconfont iconjiantouarrow486"})]),i._v(" "),s("swiper",{ref:"mySwiper",staticClass:"swiper_r",attrs:{options:i.swiperOption}},i._l(i.navlist,function(t,e){return s("swiper-slide",{key:t.id,nativeOn:{click:function(s){return i.activeList(e,t.id)}}},[s("span",{class:{activespan:i.ind==e}},[i._v(i._s(t.name))])])}),1)],1),i._v(" "),i.clublist.length?s("van-pull-refresh",{staticClass:"jlist",on:{refresh:i.onRefresh},model:{value:i.isDownLoading,callback:function(t){i.isDownLoading=t},expression:"isDownLoading"}},[s("van-list",{staticClass:"jlist",attrs:{finished:i.finished,offset:i.offset,"finished-text":i.finishedtext},on:{load:i.onLoad},model:{value:i.isUpLoading,callback:function(t){i.isUpLoading=t},expression:"isUpLoading"}},i._l(i.clublist,function(t,e){return s("div",{key:t.category_id,staticClass:"jitem van-row--flex",on:{click:function(s){return i.godetail(t.category_id)}}},[s("div",{staticClass:"jimg"},[s("img",{attrs:{src:t.image,alt:""}})]),i._v(" "),s("div",{staticClass:"jright"},[s("div",{staticClass:"jname van-ellipsis"},[i._v(i._s(t.name))]),i._v(" "),s("div",{staticClass:"jinfo"},[s("span",{staticClass:"name"},[i._v(i._s(t.contact))]),s("span",{staticClass:"tel"},[i._v(i._s(t.contact_number))])]),i._v(" "),s("div",{staticClass:"jaddress van-ellipsis"},[i._v(i._s(t.address))])])])}),0)],1):i._e()],1)},staticRenderFns:[]};var o=s("VU/8")(n,a,!1,function(i){s("aotz")},"data-v-bf23effc",null);t.default=o.exports}});