webpackJsonp([3],{D5Nr:function(t,i,s){"use strict";var e=s("mvHQ"),a=s.n(e),n=(s("v2ns"),s("F3EI")),o=s("Fd2+"),c={name:"homeTop",data:function(){var t=this;return{title:"",city:"",ind:0,keyword:"电竞馆名称/地址",swiperOption:{pagination:".swiper-pagination",observers:!0,observeParents:!0,spaceBetween:10,loop:!1,autoplay:3e3,onClick:function(i){var s=i.realIndex,e=t.swiperlist[s];switch(parseInt(e.type)){case 0:break;case 1:0==e.object_id?t.$router.push({path:"/competition"}):t.$router.push({path:"/competitiondetail/"+e.object_id});break;case 2:0==e.object_id||t.$router.push({path:"/gamedetail",query:{match_id:e.object_id}});break;case 3:0==e.object_id?t.$router.push({path:"/club"}):t.$router.push({path:"/clubdetail",query:{club_id:e.object_id}});break;case 4:0==e.object_id?t.$router.push({path:"/school"}):t.$router.push({path:"/schooldetail",query:{college_id:e.object_id}});break;default:location.replace("/")}}},swiperlist:[],offsettop:0,flag:!1,adimginfo:{},keywords:["电竞馆名称/地址","俱乐部名称/地址","酒店名称/地址"],isAndroid:!1,isiOS:!1}},provide:function(){return{app:this}},props:{wapcity:{type:String,default:""},showhome:{type:Boolean,default:!0},showtop:{type:Boolean,default:!0}},watch:{$route:function(t){-1!==t.fullPath.indexOf("/competition")?(this.ind=0,this.keyword="电竞馆名称/地址"):-1!==t.fullPath.indexOf("/club")?(this.ind=1,this.keyword="俱乐部名称/地址"):(this.ind=2,this.keyword="酒店名称/地址"),this.showtop?(this.offsettop=this.$refs.index_top.offsetHeight,localStorage.offsettop=this.offsettop):localStorage.gindex_top=this.$refs.gindex_top.offsetHeight}},created:function(){this.title="托亚克 | "+this.city},mounted:function(){var t=this;this.ind=this.$route.meta.index||0,this.keyword=this.keywords[this.ind],this.showtop?(this.offsettop=this.$refs.index_top.offsetHeight,localStorage.offsettop=this.offsettop):localStorage.gindex_top=this.$refs.gindex_top.offsetHeight,sessionStorage.wapcity?(this.city=sessionStorage.wapcity,t.$emit("pos",JSON.parse(sessionStorage.pos)),t.$emit("city",t.city),t.$emit("cityinfo",t.city,JSON.parse(sessionStorage.pos)),this.showhome?t._GetSlideList():this._GetAdv()):this.initMap(),this.initApp()},components:{swiper:n.swiper,swiperSlide:n.swiperSlide},methods:{tabhome:function(t,i){this.ind=t,this.$router.push(i)},_GetSlideList:function(){var t=this;this.$api.GetSlideList(this.city).then(function(i){1==i.code&&(t.flag=!0,t.swiperlist=i.data)})},_GetAdv:function(){var t=this;this.$api.GetAdv(2).then(function(i){1==i.code&&(t.adimginfo=i.data)})},goad:function(){var t=this.adimginfo;parseInt(this.adimginfo.type);t.url&&window.open(t.url)},initMap:function(){var t=this;new AMap.Map("map",{zoom:0}).plugin(["AMap.Autocomplete","AMap.Geolocation"],function(){new AMap.Geolocation({timeout:6e3}).getCurrentPosition(function(i,s){if("complete"==i&&1==s.status){localStorage.loccity=s.addressComponent.city||s.addressComponent.province,t.city=sessionStorage.wapcity||s.addressComponent.city||s.addressComponent.province||"北京";var e=[s.position.lat,s.position.lng];sessionStorage.pos=a()(e),sessionStorage.wapcity=s.addressComponent.city||s.addressComponent.province,t.$emit("city",t.city),t.$emit("pos",[s.position.lat,s.position.lng]),t.$emit("cityinfo",t.city,e),t.showhome?t._GetSlideList():t._GetAdv()}else t.$com.showtoast("获取位置失败"),o.a.alert({title:"",message:"为了正常使用，\n 请开启GPRS定位功能"}).then(function(){t.city="北京",t.$emit("pos",["39.73","116.33"]),sessionStorage.pos=a()(["39.73","116.33"]),t.$emit("city",t.city),t.$emit("cityinfo",t.city,["39.73","116.33"]),t.showhome?t._GetSlideList():t._GetAdv()})})})},go_city:function(){this.$router.push({path:"/changecity"})},initApp:function(){var t=navigator.userAgent,i=t.indexOf("Android")>-1||t.indexOf("Adr")>-1,s=!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);i?this.isAndroid=!0:s&&(this.isiOS=!0)},goApp:function(){this.isAndroid?location.href="https://a.app.qq.com/o/simple.jsp?pkgname=com.yt.tyk":this.isiOS&&(location.href="https://apps.apple.com/cn/app/%E6%89%98%E4%BA%9A%E5%85%8B/id1486551960")}},computed:{swiper:function(){return this.$refs.mySwiper.swiper}}},l={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",[s("div",{attrs:{id:"map"}}),t._v(" "),s("van-sticky",[t.showtop?s("div",{ref:"index_top",staticClass:"index_top"},[s("div",{staticClass:"htop"},[s("div",{staticClass:"htopleft"},[s("span",{class:{activespan:0==t.ind},on:{click:function(i){return t.tabhome(0,"/competition")}}},[t._v("电竞馆"),0==t.ind?s("span",{staticClass:"border_b"}):t._e()]),t._v(" "),s("span",{class:{activespan:1==t.ind},on:{click:function(i){return t.tabhome(1,"/club")}}},[t._v("俱乐部"),1==t.ind?s("span",{staticClass:"border_b "}):t._e()]),t._v(" "),s("span",{class:{activespan:2==t.ind},on:{click:function(i){return t.tabhome(2,"/school")}}},[t._v("酒店"),2==t.ind?s("span",{staticClass:"border_b border_b1 "}):t._e()])]),t._v(" "),s("div",{staticClass:"index_address",on:{click:t.go_city}},[s("van-icon",{attrs:{name:"location"}}),t._v(" "),s("span",[t._v(t._s(t.city||"定位中..."))])],1)]),t._v(" "),s("router-link",{staticClass:"searchbox",attrs:{to:"/search?type="+t.ind,tag:"div"}},[s("div",{staticClass:"searchinput"},[s("span",{staticClass:"iconfont iconsousuo1"}),s("span",[t._v(t._s(t.keyword))])])])],1):s("div",{ref:"gindex_top",staticClass:"htop"},[s("router-link",{staticClass:"searchinput",attrs:{tag:"div",to:"/search?type=0"}},[s("span",{staticClass:"iconfont iconsousuo1"}),s("span",[t._v(t._s(t.keyword))])]),t._v(" "),s("div",{staticClass:"index_address",on:{click:t.go_city}},[s("span",{staticClass:"iconfont icondingweiweizhi"}),t._v(" "+t._s(t.city)+"\n            ")])],1)]),t._v(" "),s("div",{staticClass:"downloadbox",on:{click:t.goApp}},[t._m(0),t._v(" "),t._m(1),t._v(" "),s("van-button",{staticClass:"to-app-btn",attrs:{round:"",color:"#F2313B"}},[t._v("去APP")])],1),t._v(" "),t.showhome?s("div",{staticClass:"swiperbox"},[t.flag?t._e():s("van-loading",{attrs:{type:"spinner"}}),t._v(" "),s("div",{staticClass:"sbg "}),t._v(" "),t.flag&&t.swiperlist.length?s("swiper",{ref:"mySwiper",attrs:{options:t.swiperOption}},[t._l(t.swiperlist,function(t,i){return s("swiper-slide",{key:i},[s("van-image",{attrs:{width:"92vw",height:"160px",fit:"cover",src:t.image_m}})],1)}),t._v(" "),t.swiperlist.length>1?s("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"}):t._e()],2):t._e(),t._v(" "),t.flag&&0==t.swiperlist.length?s("NoData",{staticClass:"nodata",attrs:{top:0,text:"商家还没有传图"}}):t._e()],1):s("div",{staticClass:"swiperbox",on:{click:t.goad}},[t.adimginfo.image?t._e():s("van-loading",{attrs:{type:"spinner"}}),t._v(" "),s("div",{staticClass:"sbg"}),t._v(" "),s("div",{staticClass:"adimg"},[s("img",{attrs:{src:t.adimginfo.image,alt:""}})])],1)],1)},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"logobox"},[i("img",{attrs:{src:s("dLd/"),alt:""}})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"logocontent"},[i("div",{staticClass:"logo-tit"},[this._v("各种超值套餐和游戏奖励活动")]),this._v(" "),i("div",{staticClass:"logo-desc"},[this._v("尽在托亚克APP")])])}]};var r=s("VU/8")(c,l,!1,function(t){s("cZ11")},"data-v-2d70c19a",null);i.a=r.exports},P1kO:function(t,i){},cZ11:function(t,i){},mvHQ:function(t,i,s){t.exports={default:s("qkKv"),__esModule:!0}},qkKv:function(t,i,s){var e=s("FeBl"),a=e.JSON||(e.JSON={stringify:JSON.stringify});t.exports=function(t){return a.stringify.apply(a,arguments)}},ySWp:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e={name:"competition",data:function(){return{isDownLoading:!1,isUpLoading:!1,finished:!1,offsettop:parseInt(localStorage.gindex_top)||0,page:0,keyword:"",city:localStorage.wapcity||"北京",lat:0,lng:0,recommend:0,label:"",district:"",circle:"",netlist:[],offset:0,labellist:[{value:"",text:"全部服务"}],districtlist:[{id:"",childlist:[],name:" 全部地区",pid:"",spacer:""}],citypid:"",lindex:0,rindex:0,totop:!1,flag:!1,selectName:"全部地区"}},components:{homeTop:s("D5Nr").a},watch:{$route:function(t){}},inject:["app"],created:function(){},mounted:function(){this._GetLabelList()},methods:{getcityinfo:function(t,i){this.city=t,this.lat=i[0],this.lng=i[1],this._GetBarList(),this._GetAreaPidByName()},_GetAreaPidByName:function(){var t=this;this.$api.GetAreaPidByName(this.city).then(function(i){t.citypid=i.data,t._GetAreaListTree()})},_GetBarList:function(){var t=this,i=this.page+1;this.$api.GetBarList(i,this.keyword,this.city,this.lat,this.lng,this.recommend,this.label,0==this.lindex?"":this.district,this.circle).then(function(i){t.flag=!0,1==i.code&&(t.netlist.length?(t.isUpLoading&&(t.netlist=t.netlist.concat(i.data.data),t.$nextTick(function(){t.isUpLoading=!1}),i.data.data.length<10&&(t.finished=!0)),t.isDownLoading&&(t.isDownLoading=!1,t.netlist=i.data.data,t.finished&&(t.finished=!1))):t.netlist=i.data.data)})},_GetLabelList:function(){var t=this;this.$api.GetLabelList().then(function(i){if(1==i.code){var s=i.data;for(var e in s)t.labellist.push({value:s[e],text:s[e]});t.label=t.labellist[0].value}})},recommendlist:function(){this.page=0,1==this.recommend?this.recommend=0:this.recommend=1,this.flag=!1,this.netlist=[],this._GetBarList()},onRefresh:function(){var t=this;setTimeout(function(){t.$com.showtoast("刷新成功"),t.isDownLoading=!1,t.page=0,t._GetBarList()},500)},onLoad:function(){this.page++,this.isUpLoading=!0,this._GetBarList()},_GetAreaListTree:function(){var t=this;this.$api.GetAreaListTree(this.citypid).then(function(i){t.districtlist=t.districtlist.concat(i.data),t.districtlist.map(function(t,i){i>0&&t.childlist.unshift({childlist:[],id:"",name:"全部街道",pid:"",spacer:""})}),t.district=t.districtlist[0].name})},selcetcity:function(t){this.lindex=t,0==t?(this.$refs.item.toggle(),this.district=this.districtlist[t].name,this.selectName="全部地区",this.page=0,this.netlist=[],this._GetBarList()):this.district=this.districtlist[t].name},selcetarea:function(t,i){this.rindex=t,this.$refs.item.toggle(),this.circle=0==t?"":i,this.selectName=0==t?this.district:this.circle,this.page=0,this.netlist=[],this._GetBarList()},openlabel:function(){window.scrollTo(0,0)},changelabel:function(){this.page=0,this.netlist=[],this._GetBarList()},opendistrict:function(){},godetail:function(t){this.$router.push({path:"/competitiondetail",query:{id:t}})}}},a={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"index"},[s("homeTop",{ref:"htop",attrs:{showhome:!1,showtop:!1},on:{cityinfo:t.getcityinfo}}),t._v(" "),s("div",{staticClass:"cbox"},[t.flag?t._e():s("div",{staticClass:"van-row--flex van-cell--center van-row--justify-center"},[s("van-loading",{attrs:{type:"spinner"}})],1),t._v(" "),s("van-sticky",{attrs:{"offset-top":t.offsettop}},[s("div",{staticClass:"cselect"},[s("div",{class:["cselectitem",1==t.recommend?"cselectitemactive":""],on:{click:t.recommendlist}},[s("span",[t._v("推荐电竞馆")])]),t._v(" "),s("van-dropdown-menu",{class:[""==t.label?"":"labelbox","全部地区"==t.selectName?"":"cccc"],attrs:{"active-color":"#f2313b"}},[s("van-dropdown-item",{attrs:{options:t.labellist,disabled:!t.flag&&0==t.labellist.length},on:{open:t.openlabel,change:t.changelabel},model:{value:t.label,callback:function(i){t.label=i},expression:"label"}}),t._v(" "),s("van-dropdown-item",{ref:"item",attrs:{title:t.selectName,disabled:!t.flag&&1==t.districtlist.length},on:{open:t.opendistrict}},[s("div",{staticClass:"citybox"},[s("div",{staticClass:"citems dleft"},t._l(t.districtlist,function(i,e){return s("div",{key:e,class:{activecity:e==t.lindex},on:{click:function(i){return t.selcetcity(e)}}},[t._v("\n                                    "+t._s(i.name)+"\n                                ")])}),0),t._v(" "),s("div",{staticClass:"citems dright"},t._l(t.districtlist[t.lindex].childlist,function(i,e){return s("div",{key:e,class:{activecity:t.rindex==e},on:{click:function(s){return t.selcetarea(e,i.name)}}},[t._v("\n                                    "+t._s(i.name)+"\n                                ")])}),0)])])],1)],1)]),t._v(" "),t.flag?t._e():s("div",{staticClass:"van-row--flex van-cell--center van-row--justify-center"},[s("van-loading",{attrs:{type:"spinner"}})],1),t._v(" "),t.flag&&t.netlist.length?s("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isDownLoading,callback:function(i){t.isDownLoading=i},expression:"isDownLoading"}},[s("van-list",{staticClass:"clist",attrs:{finished:t.finished,offset:t.offset,"finished-text":"到底了"},on:{load:t.onLoad},model:{value:t.isUpLoading,callback:function(i){t.isUpLoading=i},expression:"isUpLoading"}},t._l(t.netlist,function(i,e){return s("div",{key:e,staticClass:"citem",on:{click:function(s){return t.godetail(i.id)}}},[s("div",{staticClass:"cimg"},[s("img",{attrs:{src:i.image,alt:""}}),t._v(" "),1==i.recommend?s("span",[t._v("推荐")]):t._e()]),t._v(" "),s("div",{staticClass:"cright"},[s("div",{staticClass:"name single-line-text"},[t._v(t._s(i.name))]),t._v(" "),s("div",{staticClass:"cname"},[s("div",{staticClass:"namebox"},[s("div",{staticClass:"startbox"},t._l(parseInt(i.star),function(t){return s("span",{staticClass:"iconfont iconstar-fill"})}),0)]),t._v(" "),s("div",{staticClass:"juli"},[t._v(t._s(i.distance))])]),t._v(" "),s("div",{staticClass:"ctype"},t._l(i.label_ids,function(e){return s("span",{staticClass:"single-line-text",style:{maxWidth:1/i.label_ids.length*100+"%"}},[t._v(t._s(e))])}),0),t._v(" "),s("div",{staticClass:"caddress "},[s("van-icon",{attrs:{name:"location-o"}}),t._v(" "),s("span",{staticClass:"single-line-text"},[t._v(t._s(i.address))])],1)])])}),0)],1):t._e(),t._v(" "),t.flag&&0==t.netlist.length?s("div",{staticClass:"clist"},[s("NoData",{staticClass:"nodata",attrs:{top:0,text:"暂无匹配的商家"}})],1):t._e()],1)],1)},staticRenderFns:[]};var n=s("VU/8")(e,a,!1,function(t){s("P1kO")},"data-v-0a1e3c7a",null);i.default=n.exports}});