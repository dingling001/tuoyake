webpackJsonp([30],{GVgD:function(t,i){},ySWp:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s={name:"competition",data:function(){return{isDownLoading:!1,isUpLoading:!1,finished:!1,offsettop:0,page:0,keyword:"",city:"天津市",lat:0,lng:0,recommend:0,label:"",district:"",circle:"",netlist:[],offset:0,labellist:[{value:"",text:"全部服务"}],districtlist:[{id:"",childlist:[],name:" 全部地区",pid:"",spacer:""}],citypid:"",lindex:0,rindex:0,totop:!1,adimg:"",street:"大兴"}},inject:["app"],created:function(){},mounted:function(){this.initMap(),this._GetLabelList(),this._GetAdv()},watch:{city:{handler:function(t){var i=this;i.city=t,i.page=0,i._GetAreaPidByName(),i._GetBarList()},immediate:!0}},methods:{initMap:function(){var t=this,i=new AMap.Map("map",{zoom:0});i.plugin(["AMap.Autocomplete","AMap.Geolocation"],function(){var e=new AMap.Geolocation({timeout:6e3});i.addControl(e),e.getCurrentPosition(function(i,e){"complete"==i&&1==e.status&&(console.log(e),t.city=e.addressComponent.province,t.street=e.addressComponent.street,t.lat=e.position.lat,t.lng=e.position.lng,t._GetAreaPidByName(),t._GetBarList())})})},_GetAreaPidByName:function(){var t=this;this.$api.GetAreaPidByName(this.city).then(function(i){t.citypid=i.data,t._GetAreaListTree()})},_GetBarList:function(){var t=this,i=this.page+1;this.$com.showtoast("加载中…","","",1e3,"",!1,!0),this.$api.GetBarList(i,this.keyword,this.city,this.lat,this.lng,this.recommend,this.label,0==this.lindex?"":this.district,this.circle).then(function(i){1==i.code&&(t.netlist.length?(t.isUpLoading&&(t.netlist=t.netlist.concat(i.data.data),t.$nextTick(function(){t.isUpLoading=!1}),i.data.data.length<10&&(t.finished=!0)),t.isDownLoading&&(t.isDownLoading=!1,t.netlist=i.data.data,t.finished&&(t.finished=!1))):t.netlist=i.data.data)})},_GetLabelList:function(){var t=this;this.$api.GetLabelList().then(function(i){if(1==i.code){var e=i.data;for(var s in e)t.labellist.push({value:e[s],text:e[s]});t.label=t.labellist[0].value}})},recommendlist:function(){this.page=0,1==this.recommend?this.recommend=0:this.recommend=1,console.log(this.recommend),this._GetBarList()},onRefresh:function(){var t=this;setTimeout(function(){t.$com.showtoast("刷新成功"),t.isDownLoading=!1,t.page=0,t._GetBarList()},500)},onLoad:function(){this.page++,this.isUpLoading=!0,this._GetBarList()},_GetAreaListTree:function(){var t=this;this.$api.GetAreaListTree(this.citypid).then(function(i){t.districtlist=t.districtlist.concat(i.data),t.district=t.districtlist[0].name})},selcetcity:function(t){this.lindex=t,0==t&&(this.$refs.item.toggle(),this.district=this.districtlist[t].name,this.page=0,this.netlist=[],this._GetBarList())},selcetarea:function(t,i){this.rindex=t,this.$refs.item.toggle(),this.district=i,this.page=0,this.netlist=[],this._GetBarList()},openlabel:function(){window.scrollTo(0,0)},changelabel:function(){this.page=0,this.netlist=[],this._GetBarList()},gotop:function(){var t=document.querySelectorAll(".cselect")[0].offsetTop,i=document.documentElement.scrollTop||document.body.scrollTop;console.log(i);var e=t/10;if(t>i)!function s(){i<t?(i+=e,document.body.scrollTop=i,document.documentElement.scrollTop=i,setTimeout(s,10)):(document.body.scrollTop=t,document.documentElement.scrollTop=t);console.log("smoothDown")}();else{var s=i-t;console.log(s),e=s/50,function s(){i>t?(i-=e,document.body.scrollTop=i,document.documentElement.scrollTop=i,setTimeout(s,10)):(document.body.scrollTop=t,document.documentElement.scrollTop=t);console.log("smoothUp")}()}},opendistrict:function(){this._GetAreaListTree()},godetail:function(t){this.$router.push({path:"/competitiondetail",query:{id:t}})},_GetAdv:function(){var t=this;this.$api.GetAdv(2).then(function(i){console.log(i),t.adimg=i.data.image})}}},n={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"index"},[e("div",{staticClass:"index_top"},[e("van-sticky",{attrs:{"offset-top":0}},[e("div",{staticClass:"htop"},[e("div",{staticClass:"searchinput"},[e("span",{staticClass:"iconfont iconsousuo1"}),e("span",[t._v(t._s(t.street))])]),t._v(" "),e("div",{staticClass:"index_address"},[e("span",{staticClass:"iconfont icondingweiweizhi"}),t._v(" "+t._s(t.city))])])]),t._v(" "),e("div",{staticClass:"swiperbox"},[e("img",{attrs:{src:t.adimg,alt:""}})])],1),t._v(" "),e("div",{staticClass:"cbox"},[e("van-sticky",{attrs:{"offset-top":75}},[e("div",{staticClass:"cselect"},[e("div",{class:["cselectitem",1==t.recommend?"cselectitemactive":""],on:{click:t.recommendlist}},[e("span",[t._v("推荐电竞馆")])]),t._v(" "),e("van-dropdown-menu",{attrs:{"active-color":"#f2313b"}},[e("van-dropdown-item",{attrs:{options:t.labellist},on:{open:t.openlabel,change:t.changelabel},model:{value:t.label,callback:function(i){t.label=i},expression:"label"}}),t._v(" "),e("van-dropdown-item",{ref:"item",attrs:{title:t.district},on:{open:t.opendistrict}},[e("div",{staticClass:"citybox"},[e("div",{staticClass:"citems dleft"},t._l(t.districtlist,function(i,s){return e("div",{key:s,class:{activecity:s==t.lindex},on:{click:function(i){return t.selcetcity(s)}}},[t._v("\n                                    "+t._s(i.name)+"\n                                ")])}),0),t._v(" "),e("div",{staticClass:"citems dright"},t._l(t.districtlist[t.lindex].childlist,function(i,s){return e("div",{key:s,class:{activecity:t.rindex==s},on:{click:function(e){return t.selcetarea(s,i.name)}}},[t._v("\n                                    "+t._s(i.name)+"\n                                ")])}),0)])])],1)],1)]),t._v(" "),t.netlist.length?e("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isDownLoading,callback:function(i){t.isDownLoading=i},expression:"isDownLoading"}},[e("van-list",{staticClass:"clist",attrs:{finished:t.finished,offset:t.offset,"finished-text":"到底了"},on:{load:t.onLoad},model:{value:t.isUpLoading,callback:function(i){t.isUpLoading=i},expression:"isUpLoading"}},t._l(t.netlist,function(i,s){return e("div",{key:s,staticClass:"citem",on:{click:function(e){return t.godetail(i.id)}}},[e("div",{staticClass:"cimg"},[e("img",{attrs:{src:i.image,alt:""}})]),t._v(" "),e("div",{staticClass:"cright"},[e("div",{staticClass:"cname"},[e("div",{staticClass:"namebox"},[e("div",{staticClass:"name single-line-text"},[t._v(t._s(i.name))]),t._v(" "),e("div",{staticClass:"startbox"},t._l(parseInt(i.star),function(t){return e("span",{staticClass:"iconfont iconstar-fill"})}),0)]),t._v(" "),e("span",{staticClass:"juli"},[t._v(t._s(i.distance))])]),t._v(" "),e("div",{staticClass:"ctype"},t._l(i.label_ids,function(i){return e("span",[t._v(t._s(i))])}),0),t._v(" "),e("div",{staticClass:"caddress"},[e("span",{staticClass:"iconfont icondingweiweizhi"}),t._v(" "),e("span",{staticClass:"single-line-text"},[t._v(t._s(i.address))])])])])}),0)],1):e("div",{staticClass:"nodata"},[t._v(" 暂无数据")])],1)])},staticRenderFns:[]};var a=e("VU/8")(s,n,!1,function(t){e("GVgD")},"data-v-33a0cee7",null);i.default=a.exports}});