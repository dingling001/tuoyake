webpackJsonp([31],{"3ssC":function(t,i){},cESP:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e={name:"competition",props:{wapcity:{type:String,default:"北京"},pos:{type:Array,default:["39.73","116.33"]}},data:function(){return{isDownLoading:!1,isUpLoading:!1,finished:!1,offsettop:0,page:0,keyword:"",city:"北京",lat:0,lng:0,recommend:0,label:"",district:"",circle:"",netlist:[],offset:0,labellist:[{value:"",text:"全部服务"}],districtlist:[{id:"",childlist:[],name:" 全部地区",pid:"",spacer:""}],citypid:"",lindex:0,rindex:0,totop:!1,showoverlay:!1,flag:!1,position:[]}},inject:["app"],created:function(){this.offsettop=parseInt(localStorage.offsettop),this.city=this.wapcity,this.position=this.pos},mounted:function(){this._GetBarList(),this._GetLabelList(),this._GetAreaPidByName()},methods:{_GetBarList:function(){var t=this,i=this.page+1;this.$com.showtoast("加载中…","","",1e3,"",!1,!0),this.$api.GetBarList(i,this.keyword,this.city,this.position[0],this.position[1],this.recommend,this.label,0==this.lindex?"":this.district,this.circle).then(function(i){t.flag=!0,1==i.code&&(t.netlist.length?(t.isUpLoading&&(t.netlist=t.netlist.concat(i.data.data),t.$nextTick(function(){t.isUpLoading=!1}),i.data.data.length<10&&(t.finished=!0)),t.isDownLoading&&(t.isDownLoading=!1,t.netlist=i.data.data,t.finished&&(t.finished=!1))):t.netlist=i.data.data)})},onRefresh:function(){var t=this;setTimeout(function(){t.$com.showtoast("刷新成功"),t.isDownLoading=!1,t.page=0,t._GetBarList()},500)},onLoad:function(){this.page++,this.isUpLoading=!0,this._GetBarList()},godetail:function(t){this.$router.push({path:"/competitiondetail",query:{id:t}})},_GetLabelList:function(){var t=this;this.$api.GetLabelList().then(function(i){if(1==i.code){var s=i.data;for(var e in s)t.labellist.push({value:s[e],text:s[e]});t.label=t.labellist[0].value}})},_GetAreaPidByName:function(){var t=this;this.$api.GetAreaPidByName(this.city).then(function(i){1==i.code&&i.data&&(t.citypid=i.data,t._GetAreaListTree(),t._GetBarList())})},_GetAreaListTree:function(){var t=this;this.$api.GetAreaListTree(this.citypid).then(function(i){t.districtlist=t.districtlist.concat(i.data),t.district=t.districtlist[0].name})},recommendlist:function(){this.page=0,1==this.recommend?this.recommend=0:this.recommend=1,this.netlist=[],this._GetBarList()},selcetcity:function(t){this.lindex=t,console.log(t),0==t&&(this.$refs.item.toggle(),this.district=this.districtlist[t].name,this.page=0,this.circle="",this.netlist=[],this._GetBarList())},selcetarea:function(t,i,s){this.rindex=t,this.$refs.item.toggle(),this.circle=i,this.page=0,this.netlist=[],this._GetBarList()},openlabel:function(){this.showoverlay=!0},changelabel:function(){this.page=0,this.netlist=[],this._GetBarList()},opendistrict:function(){this._GetAreaListTree()}}},a={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"cbox"},[s("van-sticky",{staticClass:"sticky ",attrs:{"offset-top":t.offsettop}},[s("div",{staticClass:"cselect"},[s("div",{class:["cselectitem",1==t.recommend?"cselectitemactive":""],on:{click:t.recommendlist}},[s("span",[t._v("推荐电竞馆")])]),t._v(" "),s("van-dropdown-menu",{attrs:{"active-color":"#f2313b"}},[s("van-dropdown-item",{attrs:{options:t.labellist},on:{open:function(i){t.showoverlay=!0},close:function(i){t.showoverlay=!1},change:t.changelabel},model:{value:t.label,callback:function(i){t.label=i},expression:"label"}}),t._v(" "),t.districtlist.length>1?s("van-dropdown-item",{ref:"item",attrs:{title:t.district},on:{open:function(i){t.showoverlay=!0},close:function(i){t.showoverlay=!1}}},[s("div",{staticClass:"citybox"},[s("div",{staticClass:"citems dleft"},t._l(t.districtlist,function(i,e){return s("div",{key:e,class:{activecity:e==t.lindex},on:{click:function(i){return t.selcetcity(e)}}},[t._v(t._s(i.name)+"\n                            ")])}),0),t._v(" "),s("div",{staticClass:"citems dright"},t._l(t.districtlist[t.lindex].childlist,function(i,e){return s("div",{key:e,class:{activecity:t.rindex==e},on:{click:function(s){return t.selcetarea(e,i.name)}}},[t._v("\n                                "+t._s(t.districtlist[t.lindex].childlist[t.rindex].name)+"\n                            ")])}),0)])]):t._e()],1)],1)]),t._v(" "),t.flag&&t.netlist.length?s("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isDownLoading,callback:function(i){t.isDownLoading=i},expression:"isDownLoading"}},[s("van-list",{staticClass:"clist",attrs:{finished:t.finished,offset:t.offset,"finished-text":"到底了"},on:{load:t.onLoad},model:{value:t.isUpLoading,callback:function(i){t.isUpLoading=i},expression:"isUpLoading"}},t._l(t.netlist,function(i,e){return s("div",{key:e,staticClass:"citem",on:{click:function(s){return t.godetail(i.id)}}},[s("div",{staticClass:"cimg"},[s("img",{attrs:{src:i.image,alt:""}}),t._v(" "),1==i.recommend?s("span",[t._v("推荐")]):t._e()]),t._v(" "),s("div",{staticClass:"cright"},[s("div",{staticClass:"name single-line-text"},[t._v(t._s(i.name))]),t._v(" "),s("div",{staticClass:"cname"},[s("div",{staticClass:"namebox"},[s("div",{staticClass:"startbox"},t._l(parseInt(i.star),function(t){return s("span",{staticClass:"iconfont iconstar-fill"})}),0)]),t._v(" "),s("div",{staticClass:"juli"},[t._v(t._s(i.distance))])]),t._v(" "),s("div",{staticClass:"ctype"},t._l(i.label_ids,function(e){return s("span",{staticClass:"single-line-text",style:{maxWidth:1/i.label_ids.length*100+"%"}},[t._v(t._s(e))])}),0),t._v(" "),s("div",{staticClass:"caddress "},[s("van-icon",{attrs:{name:"location-o"}}),t._v(" "),s("span",{staticClass:"single-line-text"},[t._v(t._s(i.address))])],1)])])}),0)],1):t._e(),t._v(" "),t.flag&&0==t.netlist.length?s("div",{staticClass:"clist"},[s("NoData",{staticClass:"nodata",attrs:{top:0,text:"暂无匹配的商家"}})],1):t._e(),t._v(" "),s("van-overlay",{attrs:{show:t.showoverlay,"z-index":5},on:{click:function(i){t.showoverlay=!1}}})],1)},staticRenderFns:[]};var n=s("VU/8")(e,a,!1,function(t){s("3ssC")},"data-v-4444e730",null);i.default=n.exports}});