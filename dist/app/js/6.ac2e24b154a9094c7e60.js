webpackJsonp([6],{"+/g+":function(t,i,e){"use strict";var n=e("7+uW");i.a=new n.a},YpiT:function(t,i){},cESP:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e("+/g+"),s={name:"competition",data:function(){return{isDownLoading:!1,isUpLoading:!1,finished:!1,offsettop:0,page:0,keyword:"",city:localStorage.wapcity||"",lat:0,lng:0,recommend:0,label:"",district:"",circle:"",netlist:[],offset:0,labellist:[{value:"",text:"全部服务"}],districtlist:[{id:"",childlist:[],name:" 全部地区",pid:"",spacer:""}],citypid:"",lindex:0,rindex:0,totop:!1,showoverlay:!1,flag:!1}},inject:["app"],created:function(){var t=this;this.offsettop=parseInt(localStorage.offsettop),n.a.$on("home",function(i,e){t.offsettop=i}),n.a.$on("citypid",function(i,e){t.citypid=i}),n.a.$on("lat",function(i,e){t.lat=i}),n.a.$on("lng",function(i,e){t.lng=i}),n.a.$on("city",function(i,e){t.city=i})},mounted:function(){this.initMap(),this._GetLabelList()},watch:{lat:function(t){this.lat=t},lng:function(t){this.lng=t},city:function(t){this.city=t},citypid:function(t){},$route:{handler:function(t,i){},immediate:!0}},methods:{_GetBarList:function(){var t=this,i=this.page+1;this.$com.showtoast("加载中…","","",1e3,"",!1,!0),this.$api.GetBarList(i,this.keyword,localStorage.wapcity,this.lat,this.lng,this.recommend,this.label,0==this.lindex?"":this.district,this.circle).then(function(i){t.flag=!0,1==i.code&&(t.netlist.length?(t.isUpLoading&&(t.netlist=t.netlist.concat(i.data.data),t.$nextTick(function(){t.isUpLoading=!1}),i.data.data.length<10&&(t.finished=!0)),t.isDownLoading&&(t.isDownLoading=!1,t.netlist=i.data.data,t.finished&&(t.finished=!1))):t.netlist=i.data.data)})},_GetLabelList:function(){var t=this;this.$api.GetLabelList().then(function(i){if(1==i.code){var e=i.data;for(var n in e)t.labellist.push({value:e[n],text:e[n]});t.label=t.labellist[0].value}})},recommendlist:function(){this.page=0,1==this.recommend?this.recommend=0:this.recommend=1,this.netlist=[],this._GetBarList()},onRefresh:function(){var t=this;setTimeout(function(){t.$com.showtoast("刷新成功"),t.isDownLoading=!1,t.page=0,t._GetBarList()},500)},onLoad:function(){this.page++,this.isUpLoading=!0,this._GetBarList()},_GetAreaListTree:function(){var t=this;this.$api.GetAreaListTree(this.citypid).then(function(i){t.districtlist=t.districtlist.concat(i.data),t.district=t.districtlist[0].name})},selcetcity:function(t){this.lindex=t,0==t&&(this.$refs.item.toggle(),this.district=this.districtlist[t].name,this.page=0,this.netlist=[],this._GetBarList())},selcetarea:function(t,i,e){this.rindex=t,this.$refs.item.toggle(),this.circle=i,this.page=0,this.netlist=[],this._GetBarList()},openlabel:function(){this.showoverlay=!0},changelabel:function(){this.page=0,this.netlist=[],this._GetBarList()},gotop:function(){var t=document.querySelectorAll(".cselect")[0].offsetTop,i=document.documentElement.scrollTop||document.body.scrollTop;console.log(i);var e=t/10;if(t>i)!function n(){i<t?(i+=e,document.body.scrollTop=i,document.documentElement.scrollTop=i,setTimeout(n,10)):(document.body.scrollTop=t,document.documentElement.scrollTop=t);console.log("smoothDown")}();else{var n=i-t;console.log(n),e=n/50,function n(){i>t?(i-=e,document.body.scrollTop=i,document.documentElement.scrollTop=i,setTimeout(n,10)):(document.body.scrollTop=t,document.documentElement.scrollTop=t);console.log("smoothUp")}()}},opendistrict:function(){this._GetAreaListTree()},godetail:function(t){this.$router.push({path:"/competitiondetail",query:{id:t}})},initMap:function(){var t=this,i=new AMap.Map("map",{zoom:0});i.plugin(["AMap.Autocomplete","AMap.Geolocation"],function(){var e=new AMap.Geolocation({timeout:6e3});i.addControl(e),e.getCurrentPosition(function(i,e){"complete"==i&&1==e.status?(t.city=localStorage.wapcity||e.addressComponent.province,t.lat=e.position.lat,t.lng=e.position.lng):t.city="北京",t._GetAreaPidByName()})})},_GetAreaPidByName:function(){var t=this;this.$api.GetAreaPidByName(this.city).then(function(i){console.log(i),t.citypid=i.data,t._GetAreaListTree(),t._GetBarList()})}}},o={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"cbox"},[e("div",{attrs:{id:"map"}}),t._v(" "),e("van-sticky",{staticClass:"sticky ",attrs:{"offset-top":t.offsettop}},[e("div",{staticClass:"cselect"},[e("div",{class:["cselectitem",1==t.recommend?"cselectitemactive":""],on:{click:t.recommendlist}},[e("span",[t._v("推荐电竞馆")])]),t._v(" "),e("van-dropdown-menu",{attrs:{"active-color":"#f2313b"}},[e("van-dropdown-item",{attrs:{options:t.labellist},on:{open:function(i){t.showoverlay=!0},close:function(i){t.showoverlay=!1},change:t.changelabel},model:{value:t.label,callback:function(i){t.label=i},expression:"label"}}),t._v(" "),e("van-dropdown-item",{ref:"item",attrs:{title:t.district},on:{open:function(i){t.showoverlay=!0},close:function(i){t.showoverlay=!1}}},[e("div",{staticClass:"citybox"},[e("div",{staticClass:"citems dleft"},t._l(t.districtlist,function(i,n){return e("div",{key:n,class:{activecity:n==t.lindex},on:{click:function(i){return t.selcetcity(n)}}},[t._v("\n                                "+t._s(i.name)+"\n                            ")])}),0),t._v(" "),e("div",{staticClass:"citems dright"},t._l(t.districtlist[t.lindex].childlist,function(i,n){return e("div",{key:n,class:{activecity:t.rindex==n},on:{click:function(e){return t.selcetarea(n,i.name)}}},[t._v("\n                                "+t._s(i.name)+"\n                            ")])}),0)])])],1)],1)]),t._v(" "),t.flag&&t.netlist.length?e("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isDownLoading,callback:function(i){t.isDownLoading=i},expression:"isDownLoading"}},[e("van-list",{staticClass:"clist",attrs:{finished:t.finished,offset:t.offset,"finished-text":"到底了"},on:{load:t.onLoad},model:{value:t.isUpLoading,callback:function(i){t.isUpLoading=i},expression:"isUpLoading"}},t._l(t.netlist,function(i,n){return e("div",{key:n,staticClass:"citem",on:{click:function(e){return t.godetail(i.id)}}},[e("div",{staticClass:"cimg"},[e("img",{attrs:{src:i.image,alt:""}}),t._v(" "),1==i.recommend?e("span",[t._v("推荐")]):t._e()]),t._v(" "),e("div",{staticClass:"cright"},[e("div",{staticClass:"name single-line-text"},[t._v(t._s(i.name))]),t._v(" "),e("div",{staticClass:"cname"},[e("div",{staticClass:"namebox"},[e("div",{staticClass:"startbox"},t._l(parseInt(i.star),function(t){return e("span",{staticClass:"iconfont iconstar-fill"})}),0)]),t._v(" "),e("div",{staticClass:"juli"},[t._v(t._s(i.distance))])]),t._v(" "),e("div",{staticClass:"ctype"},t._l(i.label_ids,function(i){return e("span",[t._v(t._s(i))])}),0),t._v(" "),e("div",{staticClass:"caddress "},[e("span",{staticClass:"iconfont icondingweiweizhi"}),t._v(" "),e("span",{staticClass:"single-line-text"},[t._v(t._s(i.address))])])])])}),0)],1):t._e(),t._v(" "),t.flag&&0==t.netlist.length?e("NoData",{staticClass:"nodata",attrs:{top:150}},[t._v("暂无数据")]):t._e(),t._v(" "),e("van-overlay",{attrs:{show:t.showoverlay,"z-index":5},on:{click:function(i){t.showoverlay=!1}}})],1)},staticRenderFns:[]};var a=e("VU/8")(s,o,!1,function(t){e("YpiT")},"data-v-1032ac33",null);i.default=a.exports}});