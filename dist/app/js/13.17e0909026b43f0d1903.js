webpackJsonp([13],{LV7v:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a={name:"myApplication",data:function(){return{total:0,win:0,isDownLoading:!1,isUpLoading:!1,finished:!1,offset:0,page:0,status:1,singList:[],nav_active:0}},created:function(){this._SignIndex(),this._GetSignList()},methods:{_SignIndex:function(){var t=this;this.$api.SignIndex().then(function(i){1==i.code&&(t.total=i.data.total,t.win=i.data.win)})},changgeNav:function(){this.status=this.nav_active+1,this.page=0,this.singList=[],this._GetSignList()},backmy:function(){this.$router.go(-1)},gomychieve:function(){this.$router.push("/myAchieve")},onRefresh:function(){var t=this;setTimeout(function(){t.$com.showtoast("刷新成功"),t.isDownLoading=!1,t.page=0,t._GetSignList()},500)},onLoad:function(){this.page++,this.isUpLoading=!0,this._GetSignList()},_GetSignList:function(){var t=this;this.$com.showtoast("加载中…","","",1e3,"",!1,!0);var i=this.page+1;this.$api.GetSignList(i,this.status).then(function(i){1==i.code&&(t.singList.length?(t.isUpLoading&&(t.singList=t.singList.concat(i.data.data),t.$nextTick(function(){t.isUpLoading=!1}),i.data.data.length<10&&(t.finished=!0)),t.isDownLoading&&(t.isDownLoading=!1,t.singList=i.data.data,t.finished&&(t.finished=!1))):t.singList=i.data.data)})},gossdetail:function(t){this.$router.push({path:"/gamedetail",query:{match_id:t,cid:this.id}})}}},n={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"score_box"},[s("div",{staticClass:"score_top"},[s("van-sticky",{attrs:{"offset-top":0}},[s("div",{staticClass:"iconbox"},[s("div",{staticClass:"iconfont iconfanhui",on:{click:t.backmy}}),t._v(" "),s("div",{staticClass:"name"},[t._v("我的报名")]),t._v(" "),s("div",{on:{click:t.gomychieve}},[t._v("获奖成就 "),s("span",{staticClass:"iconfont iconcaret-right"})])])]),t._v(" "),s("div",{staticClass:"score_item"},[s("div",{staticClass:"item"},[s("div",{staticClass:"scroe"},[t._v(t._s(t.total))]),t._v(" "),s("div",{staticClass:"mys"},[t._v("获奖次数")])]),t._v(" "),s("div",{staticClass:"item"},[s("div",{staticClass:"scroe"},[t._v(t._s(t.win))]),t._v(" "),s("div",{staticClass:"mys"},[t._v("获奖次数")])])])],1),t._v(" "),s("div",{staticClass:"mlink"},[s("van-tabs",{attrs:{type:"card",color:"#2C6BEA","title-active-color":"#fff","title-inactive-color":"#6285CC",sticky:"","offset-top":44},on:{click:t.changgeNav},model:{value:t.nav_active,callback:function(i){t.nav_active=i},expression:"nav_active"}},[s("van-tab",{attrs:{title:"正在进行"}}),t._v(" "),s("van-tab",{attrs:{title:"获奖赛事"}}),t._v(" "),s("van-tab",{attrs:{title:"已结束"}}),t._v(" "),t.singList.length?s("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isDownLoading,callback:function(i){t.isDownLoading=i},expression:"isDownLoading"}},[s("van-list",{staticClass:"comlist",attrs:{finished:t.finished,offset:t.offset,"finished-text":"到底了"},on:{load:t.onLoad},model:{value:t.isUpLoading,callback:function(i){t.isUpLoading=i},expression:"isUpLoading"}},t._l(t.singList,function(i,a){return s("div",{key:i.id,staticClass:"jitem van-row--flex",on:{click:function(s){return t.gossdetail(i.id)}}},[s("div",{staticClass:"jimg"},[s("img",{attrs:{src:i.image,alt:""}})]),t._v(" "),s("div",{staticClass:"jright"},[s("div",{staticClass:"jname van-ellipsis"},[t._v(t._s(i.league_name))]),t._v(" "),s("div",{staticClass:"jaddress van-ellipsis"},[s("span",{staticClass:"iconfont icontime-circle"}),t._v("\n                                "+t._s(i.start_time)+" ~ "+t._s(i.end_time)+"\n                            ")]),t._v(" "),s("div",{staticClass:"synopsis van-ellipsis"},[t._v(t._s(i.remark))])])])}),0)],1):t._e(),t._v(" "),s("div",{staticClass:"nodata"},[t._v("暂无数据")])],1)],1)])},staticRenderFns:[]};var e=s("VU/8")(a,n,!1,function(t){s("ghCg")},"data-v-d37afcc6",null);i.default=e.exports},ghCg:function(t,i){}});