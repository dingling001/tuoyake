webpackJsonp([41],{eOx9:function(t,i){},iv6e:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n={name:"club",props:{wapcity:{type:String,default:"北京"},pos:{type:Array,default:["39.73","116.33"]}},data:function(){return{clist:[{name:"全部俱乐部",id:""}],cshow:!1,clublist:[],ind:0,page:0,keyword:"",city:"",category_id:"",isUpLoading:!1,isDownLoading:!1,finished:!1,offset:0,finishedtext:"到底了"}},created:function(){this.city=this.wapcity,this.position=this.pos,this._Category(),this._ClubIndex()},methods:{_Category:function(){var t=this;this.$api.Category().then(function(i){1==i.code&&(t.clist=t.clist.concat(i.data))})},_ClubIndex:function(){var t=this,i=this.page+1;this.$api.ClubIndex(i,this.category_id,this.city,this.keyword).then(function(i){t.cshow=!0,1==i.code&&(t.clublist.length?(t.isUpLoading&&(t.clublist=t.clublist.concat(i.data.data),t.$nextTick(function(){t.isUpLoading=!1}),i.data.data.length<10&&(t.finished=!0,t.finishedtext="到底了")),t.isDownLoading&&(t.isDownLoading=!1,t.clublist=i.data.data,t.finished&&(t.finished=!1))):(t.clublist=i.data.data,t.finishedtext="到底了"))})},onRefresh:function(){var t=this;setTimeout(function(){t.$com.showtoast("刷新成功"),t.isDownLoading=!1,t.clublist=[],t.page=0,t._ClubIndex()},500)},onLoad:function(){this.page++,this.isUpLoading=!0,this._ClubIndex()},activeList:function(t,i){this.page=0,this.ind=t,this.cshow=!1,this.category_id=i,this.clublist=[],this._ClubIndex()},godetail:function(t){this.$router.push({path:"/clubdetail",query:{club_id:t}})}}},a={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"jbox"},[s("div",{staticClass:"jnav"},t._l(t.clist,function(i,n){return s("span",{key:i.id,class:{activespan:t.ind==n},on:{click:function(s){return t.activeList(n,i.id)}}},[t._v(t._s(i.name))])}),0),t._v(" "),t.cshow?t._e():s("div",{staticClass:"van-row--flex van-cell--center van-row--justify-center"},[s("van-loading",{attrs:{type:"spinner"}})],1),t._v(" "),t.cshow&&t.clublist.length?s("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isDownLoading,callback:function(i){t.isDownLoading=i},expression:"isDownLoading"}},[s("van-list",{staticClass:"jlist",attrs:{finished:t.finished,offset:t.offset,"finished-text":t.finishedtext},on:{load:t.onLoad},model:{value:t.isUpLoading,callback:function(i){t.isUpLoading=i},expression:"isUpLoading"}},t._l(t.clublist,function(i,n){return s("div",{key:i.id,staticClass:"jitem van-row--flex",on:{click:function(s){return t.godetail(i.id)}}},[s("div",{staticClass:"jimg"},[s("van-image",{attrs:{width:"19.733vw",height:"19.733vw",fit:"cover",src:i.image}})],1),t._v(" "),s("div",{staticClass:"jright"},[s("div",{staticClass:"jname van-ellipsis"},[t._v(t._s(i.name))]),t._v(" "),s("div",{staticClass:"jinfo"},[s("span",{staticClass:"name"},[t._v(t._s(i.contact))]),s("span",{staticClass:"tel"},[t._v(t._s(i.contact_number))])]),t._v(" "),s("div",{staticClass:"jaddress van-ellipsis"},[t._v(t._s(i.address))])])])}),0)],1):t._e(),t._v(" "),t.cshow&&0==t.clublist.length?s("NoData",{attrs:{top:140}}):t._e()],1)},staticRenderFns:[]};var e=s("VU/8")(n,a,!1,function(t){s("eOx9")},"data-v-3443db47",null);i.default=e.exports}});