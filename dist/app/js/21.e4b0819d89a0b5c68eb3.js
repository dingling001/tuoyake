webpackJsonp([21],{"R/X6":function(t,i){},hHrA:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});s("v2ns");var e=s("F3EI"),n={name:"school",props:{wapcity:{type:String,default:"北京"},pos:{type:Array,default:["39.73","116.33"]}},data:function(){return{swiperOption:{pagination:".swiper-pagination",slidesPerView:"auto",spaceBetween:24,freeMode:!0,observers:!0,observeParents:!0},navlist:[{name:"全部学院",id:""}],ind:-1,clist:[],clublist:[],page:0,keyword:"",city:"",category_id:"",isUpLoading:!1,isDownLoading:!1,finished:!1,offset:-200,finishedtext:"到底了",citypid:"",district:"",circle:"",districtlist:[{id:"",childlist:[],name:"全部地区",pid:"",spacer:""}],lindex:0,rindex:-1,schoolshow:!1,offsettop:parseInt(localStorage.offsettop),title:"全部地区"}},components:{swiper:e.swiper,swiperSlide:e.swiperSlide},created:function(){this.city=this.wapcity,this.get_CollegeCategory(),this._CollegeIndex(),this._GetAreaPidByName()},methods:{get_CollegeCategory:function(){var t=this;this.$api.CollegeCategory().then(function(i){console.log(i),1==i.code&&t.navlist.concat(i.data)})},_GetAreaPidByName:function(){var t=this;this.$api.GetAreaPidByName(this.city).then(function(i){t.citypid=i.data,t._GetAreaListTree(),t._CollegeIndex()})},_GetAreaListTree:function(){var t=this;this.$api.GetAreaListTree(this.citypid).then(function(i){t.districtlist=t.districtlist.concat(i.data),t.district=t.districtlist[0].name})},selcetcity:function(t){this.lindex=t,console.log(t),0==t&&(this.$refs.item.toggle(),this.district="",this.page=0,this.circle="",this.title="全部地区",this.clublist=[],this._CollegeIndex()),this.district=this.districtlist[t].name},selcetarea:function(t,i,s){this.rindex=t,this.$refs.item.toggle(),this.circle=i,this.title=this.circle,this.page=0,this.clublist=[],this._CollegeIndex()},_CollegeIndex:function(){var t=this,i=this.page+1;this.$com.showtoast("加载中…","","",1e3,"",!1,!0),this.$api.CollegeIndex(i,this.category_id,this.city,this.district,this.circle,this.keyword).then(function(i){t.schoolshow=!0,1==i.code&&(t.clublist.length?(t.isUpLoading&&(t.clublist=t.clublist.concat(i.data.data),t.$nextTick(function(){t.isUpLoading=!1}),i.data.data.length<10&&(t.finished=!0,t.finishedtext="到底了")),t.isDownLoading&&(t.isDownLoading=!1,t.clublist=i.data.data,t.finished&&(t.finished=!1))):(console.log(i),t.clublist=i.data.data,t.finishedtext="到底了"))})},onRefresh:function(){var t=this;setTimeout(function(){t.$com.showtoast("刷新成功"),t.isDownLoading=!1,t.page=0,t._CollegeIndex()},500)},onLoad:function(){this.page++,this.isUpLoading=!0,this._CollegeIndex()},activeList:function(t,i){this.page=0,this.ind=t,this.schoolshow=!1,this.category_id=i,this._CollegeIndex()},godetail:function(t){this.$router.push({path:"/schooldetail",query:{college_id:t}})}}},a={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"sbox"},[s("van-sticky",{ref:"sticky",staticClass:" swiperbox sticky",attrs:{"offset-top":t.offsettop}},[s("van-dropdown-menu",{attrs:{"active-color":"#f2313b"}},[s("van-dropdown-item",{ref:"item",attrs:{title:t.title,overlay:"",disabled:t.districtlist.length<=1}},[s("div",{staticClass:"citybox"},[s("div",{staticClass:"citems dleft"},t._l(t.districtlist,function(i,e){return s("div",{key:e,class:{activecity:e==t.lindex},on:{click:function(i){return t.selcetcity(e)}}},[t._v(t._s(i.name)+"\n                        ")])}),0),t._v(" "),s("div",{staticClass:"citems dright"},t._l(t.districtlist[t.lindex].childlist,function(i,e){return s("div",{key:e,class:{activecity:t.rindex==e},on:{click:function(s){return t.selcetarea(e,i.name)}}},[t._v("\n                            "+t._s(i.name)+"\n                        ")])}),0)])])],1),t._v(" "),t.navlist.length?s("swiper",{ref:"mySwiper",staticClass:"swiper_r",attrs:{options:t.swiperOption}},t._l(t.navlist,function(i,e){return s("swiper-slide",{key:i.id,nativeOn:{click:function(s){return t.activeList(e,i.id)}}},[s("span",{class:{activespan:t.ind==e}},[t._v(t._s(i.name))])])}),1):t._e()],1),t._v(" "),t.schoolshow&&t.clublist.length?s("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isDownLoading,callback:function(i){t.isDownLoading=i},expression:"isDownLoading"}},[s("van-list",{staticClass:"jlist",attrs:{finished:t.finished,offset:t.offset,"finished-text":t.finishedtext},on:{load:t.onLoad},model:{value:t.isUpLoading,callback:function(i){t.isUpLoading=i},expression:"isUpLoading"}},t._l(t.clublist,function(i,e){return s("div",{key:i.id,staticClass:"jitem van-row--flex",on:{click:function(s){return t.godetail(i.id)}}},[s("div",{staticClass:"jimg"},[s("img",{attrs:{src:i.image,alt:""}})]),t._v(" "),s("div",{staticClass:"jright"},[s("div",{staticClass:"jname van-ellipsis"},[t._v(t._s(i.name))]),t._v(" "),s("div",{staticClass:"jinfo"},[s("span",{staticClass:"name"},[t._v(t._s(i.contact))]),s("span",{staticClass:"tel"},[t._v(t._s(i.contact_number))])]),t._v(" "),s("div",{staticClass:"jaddress van-ellipsis"},[t._v(t._s(i.address))])])])}),0)],1):t._e(),t._v(" "),t.schoolshow&&0==t.clublist.length?s("div",{staticClass:"jlist"},[s("NoData",{staticClass:"nodata",attrs:{top:0,text:"暂无相关学院"}})],1):t._e()],1)},staticRenderFns:[]};var o=s("VU/8")(n,a,!1,function(t){s("R/X6")},"data-v-76c6d545",null);i.default=o.exports}});