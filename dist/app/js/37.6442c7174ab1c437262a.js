webpackJsonp([37],{Fetw:function(t,i){},KlDs:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a={name:"clubdetail",data:function(){return{club_id:"",club_detail:{},offsettop:0,is_app:0}},created:function(){this.$route.query.club_id?(this.club_id=this.$route.query.club_id,this._ClubDetail()):this.$router.replace("/"),this.is_app=this.$route.query.is_app},methods:{_ClubDetail:function(){var t=this;this.$api.ClubDetail(this.club_id).then(function(i){1==i.code&&(t.club_detail=i.data)})},backlist:function(){1==this.is_app?this.$router.push("/club"):this.$router.go(-1)}}},e={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"clubbox"},[s("div",{staticClass:"title",on:{click:t.backlist}},[s("span",{staticClass:"iconfont iconfanhui"})]),t._v(" "),s("div",{staticClass:"clubimg"},[s("img",{attrs:{src:t.club_detail.image,alt:""}})]),t._v(" "),s("div",{staticClass:"clubitem"},[s("div",{staticClass:"clubname"},[t._v(t._s(t.club_detail.name))]),t._v(" "),s("div",{staticClass:"clubboss"},[s("span",[t._v(t._s(t.club_detail.contact))]),s("span",[t._v(t._s(t.club_detail.contact_number))])]),t._v(" "),s("div",{staticClass:"clubboss nopadding"},[t._v(t._s(t.club_detail.address))]),t._v(" "),s("div",{staticClass:"clubcontent",domProps:{innerHTML:t._s(t.club_detail.content)}})])])},staticRenderFns:[]};var c=s("VU/8")(a,e,!1,function(t){s("Fetw")},"data-v-2b002d0a",null);i.default=c.exports}});