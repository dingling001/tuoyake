webpackJsonp([27],{LfFZ:function(i,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={name:"myCollect",data:function(){return{offset:0,type:1,active:0,list:[],isDownLoading:!1,isUpLoading:!1,finished:!1,page:0,isDownLoading1:!1,isUpLoading1:!1,finished1:!1,page1:0,isDownLoading2:!1,isUpLoading2:!1,finished2:!1,page2:0,isDownLoading3:!1,isUpLoading3:!1,finished3:!1,page3:0}},created:function(){this._CollectionIndex()},methods:{_CollectionIndex:function(){var i=this,t=this.page+1;this.$com.showtoast("加载中…","","",1e3,"",!1,!0),this.$api.CollectionIndex(this.type,t,this.lat,this.lng).then(function(t){1==t.code&&(i.list.length?(i.isUpLoading&&(i.list=i.list.concat(t.data.data),i.$nextTick(function(){i.isUpLoading=!1}),t.data.data.length<10&&(i.finished=!0)),i.isDownLoading&&(i.isDownLoading=!1,i.list=t.data.data,i.finished&&(i.finished=!1))):i.list=t.data.data)})},onRefresh:function(){var i=this;setTimeout(function(){console.log(i.type),i.$com.showtoast("刷新成功"),i.isDownLoading=!1,i.page=0,i._CollectionIndex()},500)},onLoad:function(){this.page++,this.isUpLoading=!0,this._CollectionIndex()},onRefresh1:function(){var i=this;setTimeout(function(){i.$com.showtoast("刷新成功"),i.isDownLoading3=!1,i.page1=0,i._CollectionIndex()},500)},onLoad1:function(){this.page1++,this.isUpLoading1=!0,this._CollectionIndex()},onRefresh3:function(){var i=this;setTimeout(function(){i.$com.showtoast("刷新成功"),i.isDownLoading3=!1,i.page3=0,i._CollectionIndex()},500)},onLoad3:function(){this.page3++,this.isUpLoading3=!0,this._CollectionIndex()},changetype:function(){this.page=0,this.page1=0,this.page2=0,this.page3=0,this.type=this.active+1,this.list=[],this._CollectionIndex()},godetail:function(i){this.$router.push({path:"/competitiondetail",query:{id:i}})},gossdetail:function(i){this.$router.push({path:"/gamedetail",query:{match_id:i}})},govdetail:function(i){this.$router.push({path:"/videodetail",query:{video_id:i}})},gotaocandetail:function(i){this.$router.push({path:"/taocan",query:{goods_id:i,cid:this.id}})}}},n={render:function(){var i=this,t=i.$createElement,s=i._self._c||t;return s("div",{staticClass:"colbox"},[s("van-tabs",{attrs:{"title-inactive-color":"#666","title-active-color":"#333",sticky:"","offset-top":55,color:"#333","line-width":"27px"},on:{click:i.changetype},model:{value:i.active,callback:function(t){i.active=t},expression:"active"}},[s("van-tab",{attrs:{title:"网吧"}}),i._v(" "),s("van-tab",{attrs:{title:"赛事"}}),i._v(" "),s("van-tab",{attrs:{title:"视频"}}),i._v(" "),s("van-tab",{attrs:{title:"套餐"}}),i._v(" "),i.list.length&&0==i.active?s("van-pull-refresh",{attrs:{offset:i.offset},on:{refresh:i.onRefresh},model:{value:i.isDownLoading,callback:function(t){i.isDownLoading=t},expression:"isDownLoading"}},[s("van-list",{staticClass:"clist",attrs:{finished:i.finished,"finished-text":""},on:{load:i.onLoad},model:{value:i.isUpLoading,callback:function(t){i.isUpLoading=t},expression:"isUpLoading"}},i._l(i.list,function(t,a){return s("div",{key:a,staticClass:"citem",on:{click:function(s){return i.godetail(t.id)}}},[s("div",{staticClass:"cimg"},[s("img",{attrs:{src:t.image,alt:""}})]),i._v(" "),s("div",{staticClass:"cright"},[s("div",{staticClass:"cname"},[s("div",{staticClass:"namebox"},[s("div",{staticClass:"name single-line-text"},[i._v(i._s(t.name))]),i._v(" "),s("div",{staticClass:"startbox"},i._l(parseInt(t.star),function(i){return s("span",{staticClass:"iconfont iconstar-fill"})}),0)]),i._v(" "),s("span",{staticClass:"juli"},[i._v(i._s(t.distance))])]),i._v(" "),s("div",{staticClass:"ctype"},i._l(t.label_ids,function(t){return s("span",[i._v(i._s(t))])}),0),i._v(" "),s("div",{staticClass:"caddress"},[s("span",{staticClass:"iconfont icondingweiweizhi"}),i._v(" "),s("span",{staticClass:"single-line-text"},[i._v(i._s(t.address))])])])])}),0)],1):i._e(),i._v(" "),i.list.length&&1==i.active?s("van-pull-refresh",{attrs:{offset:i.offset},on:{refresh:i.onRefresh},model:{value:i.isDownLoading,callback:function(t){i.isDownLoading=t},expression:"isDownLoading"}},[s("van-list",{staticClass:"comlist",attrs:{finished:i.finished,"finished-text":""},on:{load:i.onLoad},model:{value:i.isUpLoading,callback:function(t){i.isUpLoading=t},expression:"isUpLoading"}},i._l(i.list,function(t,a){return s("div",{key:t.id,staticClass:"jitem van-row--flex",on:{click:function(s){return i.gossdetail(t.id)}}},[s("div",{staticClass:"jimg"},[s("img",{attrs:{src:t.image,alt:""}}),i._v(" "),s("span",[i._v("12:30")])]),i._v(" "),s("div",{staticClass:"jright"},[s("div",{staticClass:"jname van-ellipsis"},[i._v(i._s(t.name))]),i._v(" "),s("div",{staticClass:"jaddress van-ellipsis"},[s("span",{staticClass:"iconfont icontime-circle"}),i._v("\n                            "+i._s(t.create_time)+"\n                        ")]),i._v(" "),s("div",{staticClass:"synopsis van-ellipsis"},[i._v(i._s(t.synopsis))])])])}),0)],1):i._e(),i._v(" "),i.list.length&&2==i.active?s("van-pull-refresh",{attrs:{offset:i.offset},on:{refresh:i.onRefresh},model:{value:i.isDownLoading,callback:function(t){i.isDownLoading=t},expression:"isDownLoading"}},[s("van-list",{staticClass:"vlist",attrs:{finished:i.finished,"finished-text":""},on:{load:i.onLoad},model:{value:i.isUpLoading,callback:function(t){i.isUpLoading=t},expression:"isUpLoading"}},i._l(i.list,function(t,a){return s("div",{key:t.id,staticClass:"videoitem",on:{click:function(s){return i.govdetail(t.id)}}},[s("div",{staticClass:"vimg"},[s("img",{attrs:{src:t.poster,alt:""}})]),i._v(" "),s("div",{staticClass:"vname van-ellipsis"},[i._v(i._s(t.name))]),i._v(" "),s("div",{staticClass:"vtime"},[s("span",{staticClass:"iconfont icontime-circle"}),s("span",[i._v(i._s(t.create_time))])])])}),0)],1):i._e(),i._v(" "),i.list.length&&3==i.active?s("van-pull-refresh",{attrs:{offset:i.offset},on:{refresh:i.onRefresh},model:{value:i.isDownLoading,callback:function(t){i.isDownLoading=t},expression:"isDownLoading"}},[s("van-list",{staticClass:"comlist",attrs:{finished:i.finished,"finished-text":""},on:{load:i.onLoad},model:{value:i.isUpLoading,callback:function(t){i.isUpLoading=t},expression:"isUpLoading"}},i._l(i.list,function(t,a){return s("div",{key:t.id,staticClass:"jitem van-row--flex",on:{click:function(s){return i.gotaocandetail(t.id)}}},[s("div",{staticClass:"jimg"},[s("img",{attrs:{src:t.image,alt:""}})]),i._v(" "),s("div",{staticClass:"jright"},[s("div",{staticClass:"jname van-ellipsis"},[i._v(i._s(t.name))]),i._v(" "),s("div",{staticClass:"jaddress van-ellipsis"},[i._v(i._s(t.content))]),i._v(" "),s("div",{staticClass:"price"},[i._v("￥"+i._s(t.price))])]),i._v(" "),s("div",{staticClass:"jbtn"},[i._v("抢购")])])}),0)],1):i._e()],1)],1)},staticRenderFns:[]};var e=s("C7Lr")(a,n,!1,function(i){s("wo4G")},"data-v-4034925e",null);t.default=e.exports},wo4G:function(i,t){}});