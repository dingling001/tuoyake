webpackJsonp([40],{gZJv:function(t,e){},"pj+Y":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={name:"schooldetail",data:function(){return{college_id:"",club_detail:{},offsettop:0}},created:function(){this.$route.query.college_id?(this.college_id=this.$route.query.college_id,this._ClubDetail()):this.$router.replace("/")},methods:{_ClubDetail:function(){var t=this;this.$api.CollegeDetail(this.college_id).then(function(e){console.log(e),1==e.code&&(t.club_detail=e.data)})},backlist:function(){this.$router.push("/school")}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"clubbox"},[i("div",{staticClass:"title",on:{click:t.backlist}},[i("span",{staticClass:"iconfont iconfanhui"})]),t._v(" "),i("div",{staticClass:"clubimg"},[i("img",{attrs:{src:t.club_detail.image,alt:""}})]),t._v(" "),i("div",{staticClass:"clubitem"},[i("div",{staticClass:"clubname"},[t._v(t._s(t.club_detail.name))]),t._v(" "),i("div",{staticClass:"clubboss"},[i("span",[t._v(t._s(t.club_detail.contact))]),i("span",[t._v(t._s(t.club_detail.contact_number))])]),t._v(" "),i("div",{staticClass:"clubboss nopadding"},[t._v(t._s(t.club_detail.address))]),t._v(" "),i("div",{staticClass:"clubcontent"},[t._v(t._s(t.club_detail.content))])])])},staticRenderFns:[]};var a=i("VU/8")(s,l,!1,function(t){i("gZJv")},"data-v-0a6cb292",null);e.default=a.exports}});