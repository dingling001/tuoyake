webpackJsonp([10],{Eofz:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var r=s("Fd2+"),c=s("t8G8"),y=s.n(c),f={props:["position"],data:function(){return{loccity:"",temABC:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],hotaddr:[{city:"北京",N:"39.55",E:"116.24",firststr:"B"},{city:"天津",N:"39.02",E:"117.12",firststr:"T"},{city:"上海",N:"31.14",E:"121.29",firststr:"S"},{city:"重庆",N:"29.35",E:"106.33",firststr:"Z"},{city:"广州",N:"23.08",E:"113.14",firststr:"G"},{city:"深圳",N:"22.33",E:"114.07",firststr:"S"},{city:"杭州",id:700},{city:"青岛",id:800},{city:"武汉",id:800},{city:"成都",id:900},{city:"长沙",id:1},{city:"南京",id:2},{city:"郑州",id:3},{city:"西安",id:5},{city:"苏州",id:6},{city:"太原",id:7},{city:"石家庄",id:8},{city:"福州",id:9},{city:"济南",id:10},{city:"南宁",id:11},{city:"大连",id:12},{city:"沈阳",id:13},{city:"吉林",id:14},{city:"哈尔滨",id:15},{city:"呼和浩特",id:16},{city:"乌鲁木齐",id:17},{city:"银川",id:18},{city:"贵州",id:19},{city:"昆明",id:20},{city:"南昌",id:21}],addr:y.a,show:0,strA:[],screenHeight:0,inputText:"",ind:0,address:"",showseach:!0}},mounted:function(){var t=this;this.loccity=localStorage.loccity,this.screenHeight="100vh",sessionStorage.changecity&&localStorage.loccity&&sessionStorage.wapcity!=localStorage.loccity&&r.a.confirm({title:"",message:"检测到您目前所在城市是<b>"+localStorage.loccity+"</b>\n是否要切换"}).then(function(){sessionStorage.wapcity=localStorage.loccity,t.$router.go(-1)}).catch(function(){})},methods:{slide:function(t){var i=this;for(var s in this.show=1,this.strA=t,y.a)if(t==s){var r=document.querySelector("#"+t).offsetTop-85;this.$refs.topContainer.scrollTop=r}setTimeout(function(){i.show=0},2e3)},choosecity:function(t,i,s){sessionStorage.wapcity=s,sessionStorage.changecity=!0,this.$router.go(-1)},hotcity:function(t){t&&(sessionStorage.wapcity=t,sessionStorage.changecity=!0,this.$router.go(-1))},oninput:function(){this.showseach=this.address},formSubmit:function(){for(var t in y.a)for(var i in y.a[t].item){if(y.a[t].item[i].city.indexOf(this.inputText)>-1)return void(this.address=y.a[t].item[i].city);this.address="抱歉，未找到相关位置，可尝试修改后重试"}},backindex:function(){this.$router.go(-1)}}},N={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"citybox"},[s("div",{staticClass:"main"},[s("div",{staticClass:"searchbox"},[s("i",{staticClass:"iconfont iconfanhui",on:{click:t.backindex}}),t._v(" "),s("form",{staticClass:"view_searchbg"},[s("i",{staticClass:"iconfont iconsousuo1"}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.inputText,expression:"inputText"}],staticClass:"input",attrs:{type:"search",placeholder:"输入城市名称..."},domProps:{value:t.inputText},on:{input:[function(i){i.target.composing||(t.inputText=i.target.value)},t.oninput],keyup:function(i){return!i.type.indexOf("key")&&t._k(i.keyCode,"enter",13,i.key,"Enter")?null:t.formSubmit(i)}}})]),t._v(" "),s("van-button",{attrs:{type:"primary",color:"#2F61D2",size:"small"},on:{click:t.formSubmit}},[t._v("搜索")])],1),t._v(" "),t.showseach?s("div",[s("div",{staticClass:"slide"},t._l(t.temABC,function(i,r){return s("span",{key:r},[s("span",{staticClass:"temABC",on:{click:function(s){return t.slide(i)}}},[t._v(t._s(i))])])}),0),t._v(" "),1==t.show?s("div",[s("div",{staticClass:"yin"},[t._v(t._s(t.strA))])]):t._e(),t._v(" "),s("div",{ref:"topContainer",staticClass:"top",style:"height: "+t.screenHeight},[s("div",{staticClass:"common sort"},[t._v("当前城市")]),t._v(" "),s("div",{staticClass:"city",on:{click:function(i){return t.hotcity(t.loccity)}}},[t._v(t._s(t.loccity||"尚未开启定位"))]),t._v(" "),s("div",{staticClass:"common sort"},[t._v("热门城市")]),t._v(" "),s("div",{staticClass:"hotaddr"},t._l(t.hotaddr,function(i,r){return s("div",{key:r,staticClass:"cityx",on:{click:function(s){return t.hotcity(i.city)}}},[t._v(t._s(i.city))])}),0),t._v(" "),t._l(t.addr,function(i,r){return s("div",{key:r,attrs:{id:i.key}},[s("div",{staticClass:"sort"},[t._v(t._s(i.key))]),t._v(" "),t._l(i.item,function(i,r){return s("div",{key:r},[s("div",{staticClass:"add",on:{click:function(s){return t.choosecity(i.N,i.E,i.city)}}},[t._v(" "+t._s(i.city))])])})],2)})],2)]):t._e(),t._v(" "),t.address&&!t.showseach?s("b",{staticClass:"add",on:{click:function(i){return t.hotcity(t.address)}}},[t._v(t._s(t.address))]):t._e()])])},staticRenderFns:[]};var E=s("VU/8")(f,N,!1,function(t){s("b+TO")},null,null);i.default=E.exports},"b+TO":function(t,i){},t8G8:function(t,i){t.exports={A:{key:"A",item:[{city:"安庆",N:"30.31",E:"117.02",firststr:"A"},{city:"澳门市",N:"21.33",E:"115.07",firststr:"A"},{city:"阿克苏",N:"41.09",E:"80.19",firststr:"A"},{city:"阿勒泰",N:"47.5",E:"88.12",firststr:"A"},{city:"阿图什",N:"39.42",E:"76.08",firststr:"A"},{city:"安顺",N:"26.14",E:"105.55",firststr:"A"},{city:"鞍山",N:"41.07",E:"123",firststr:"A"},{city:"安国",N:"38.24",E:"115.2",firststr:"A"},{city:"安阳",N:"36.06",E:"114.21",firststr:"A"},{city:"安丘",N:"36.25",E:"119.12",firststr:"A"},{city:"阿城",N:"45.32",E:"126.58",firststr:"A"},{city:"安达",N:"46.24",E:"125.18",firststr:"A"},{city:"安陆",N:"31.15",E:"113.41",firststr:"A"},{city:"安康",N:"32.41",E:"109.01",firststr:"A"}]},B:{key:"B",item:[{city:"蚌埠",N:"32.56",E:"117.21",firststr:"B"},{city:"巴中",N:"31.51",E:"106.43",firststr:"B"},{city:"北京市",N:"39.55",E:"116.24",firststr:"B"},{city:"白银",N:"36.33",E:"104.12",firststr:"B"},{city:"白城",N:"45.38",E:"122.5",firststr:"B"},{city:"白山",N:"41.56",E:"126.26",firststr:"B"},{city:"博乐",N:"44.57",E:"82.08",firststr:"B"},{city:"保山",N:"25.08",E:"99.1",firststr:"B"},{city:"北海",N:"21.28",E:"109.07",firststr:"B"},{city:"北流",N:"22.42",E:"110.21",firststr:"B"},{city:"百色",N:"23.54",E:"106.36",firststr:"B"},{city:"毕节",N:"27.18",E:"105.18",firststr:"B"},{city:"北票",N:"41.48",E:"120.47",firststr:"B"},{city:"本溪",N:"41.18",E:"123.46",firststr:"B"},{city:"保定",N:"38.51",E:"115.3",firststr:"B"},{city:"霸州",N:"39.06",E:"116.24",firststr:"B"},{city:"泊头",N:"38.04",E:"116.34",firststr:"B"},{city:"包头",N:"40.39",E:"109.49",firststr:"B"},{city:"滨州",N:"37.22",E:"118.02",firststr:"B"},{city:"北安",N:"48.15",E:"126.31",firststr:"B"},{city:"宝鸡",N:"34.22",E:"107.09",firststr:"B"}]},C:{key:"C",item:[{city:"巢湖",N:"31.36",E:"117.52",firststr:"C"},{city:"滁州",N:"32.18",E:"118.18",firststr:"C"},{city:"成都市",N:"30.4",E:"104.04",firststr:"C"},{city:"崇州",N:"30.39",E:"103.4",firststr:"C"},{city:"长沙",N:"28.12",E:"112.59",firststr:"C"},{city:"常德",N:"29.02",E:"111.51",firststr:"C"},{city:"郴州",N:"25.46",E:"113.02",firststr:"C"},{city:"长乐",N:"25.58",E:"119.31",firststr:"C"},{city:"长春",N:"43.54",E:"125.19",firststr:"C"},{city:"昌吉",N:"44.02",E:"87.18",firststr:"C"},{city:"潮阳",N:"23.16",E:"116.36",firststr:"C"},{city:"潮州",N:"23.4",E:"116.38",firststr:"C"},{city:"澄海",N:"23.28",E:"116.46",firststr:"C"},{city:"从化",N:"23.33",E:"113.33",firststr:"C"},{city:"楚雄",N:"25.01",E:"101.32",firststr:"C"},{city:"常熟",N:"31.39",E:"120.43",firststr:"C"},{city:"常州",N:"31.47",E:"119.58",firststr:"C"},{city:"慈溪",N:"30.11",E:"121.15",firststr:"C"},{city:"赤水",N:"28.34",E:"105.42",firststr:"C"},{city:"朝阳",N:"41.34",E:"120.27",firststr:"C"},{city:"沧州",N:"38.18",E:"116.52",firststr:"C"},{city:"承德",N:"40.59",E:"117.57",firststr:"C"},{city:"赤峰",N:"42.17",E:"118.58",firststr:"C"},{city:"长葛",N:"34.12",E:"113.47",firststr:"C"},{city:"昌邑",N:"39.52",E:"119.24",firststr:"C"},{city:"长治",N:"36.11",E:"113.06",firststr:"C"}]},D:{key:"D",item:[{city:"达川",N:"31.14",E:"107.29",firststr:"D"},{city:"德阳",N:"31.09",E:"104.22",firststr:"D"},{city:"都江堰",N:"31.01",E:"103.37",firststr:"D"},{city:"敦煌",N:"40.08",E:"94.41",firststr:"D"},{city:"大安",N:"45.3",E:"124.18",firststr:"D"},{city:"德惠",N:"44.32",E:"125.42",firststr:"D"},{city:"敦化",N:"43.22",E:"128.13",firststr:"D"},{city:"东莞",N:"23.02",E:"113.45",firststr:"D"},{city:"大理",N:"25.34",E:"100.13",firststr:"D"},{city:"东川",N:"26.06",E:"103.12",firststr:"D"},{city:"丹阳",N:"32",E:"119.32",firststr:"D"},{city:"东台",N:"32.51",E:"120.19",firststr:"D"},{city:"东阳",N:"29.16",E:"120.14",firststr:"D"},{city:"德兴",N:"28.57",E:"117.35",firststr:"D"},{city:"都匀",N:"26.15",E:"107.31",firststr:"D"},{city:"大连",N:"38.55",E:"121.36",firststr:"D"},{city:"丹东",N:"40.08",E:"124.22",firststr:"D"},{city:"大石桥",N:"40.37",E:"122.31",firststr:"D"},{city:"东港",N:"39.53",E:"124.08",firststr:"D"},{city:"定州",N:"38.3",E:"115",firststr:"D"},{city:"东胜",N:"39.48",E:"109.59",firststr:"D"},{city:"登封",N:"34.27",E:"113.02",firststr:"D"},{city:"邓州",N:"32.42",E:"112.05",firststr:"D"},{city:"德令哈",N:"37.22",E:"97.23",firststr:"D"},{city:"德州",N:"37.26",E:"116.17",firststr:"D"},{city:"东营",N:"37.27",E:"118.3",firststr:"D"},{city:"大庆",N:"46.36",E:"125.01",firststr:"D"},{city:"大同",N:"40.06",E:"113.17",firststr:"D"},{city:"当阳",N:"30.5",E:"111.47",firststr:"D"},{city:"丹江口",N:"32.33",E:"108.3",firststr:"D"},{city:"大冶",N:"30.06",E:"114.58",firststr:"D"}]},E:{key:"E",item:[{city:"峨眉山",N:"29.36",E:"103.29",firststr:"E"},{city:"恩平",N:"22.12",E:"112.19",firststr:"E"},{city:"二连浩特",N:"43.38",E:"111.58",firststr:"E"},{city:"额尔古纳",N:"50.13",E:"120.11",firststr:"E"},{city:"恩施",N:"30.16",E:"109.29",firststr:"E"},{city:"鄂州",N:"30.23",E:"114.52",firststr:"E"}]},F:{key:"F",item:[{city:"阜阳",N:"32.54",E:"115.48",firststr:"F"},{city:"涪陵",N:"29.42",E:"107.22",firststr:"F"},{city:"福州",N:"26.05",E:"119.18",firststr:"F"},{city:"福安",N:"27.06",E:"119.39",firststr:"F"},{city:"福清",N:"25.42",E:"119.23",firststr:"F"},{city:"阜康",N:"44.09",E:"87.58",firststr:"F"},{city:"佛山市",N:"23.02",E:"113.06",firststr:"F"},{city:"奉化",N:"29.39",E:"121.24",firststr:"F"},{city:"富阳",N:"30.03",E:"119.57",firststr:"F"},{city:"番禺",N:"22.57",E:"113.22",firststr:"F"},{city:"防城港",N:"21.37",E:"108.2",firststr:"F"},{city:"丰城",N:"28.12",E:"115.48",firststr:"F"},{city:"凤城",N:"40.28",E:"124.02",firststr:"F"},{city:"抚顺",N:"41.51",E:"123.54",firststr:"F"},{city:"阜新",N:"42.01",E:"121.39",firststr:"F"},{city:"丰南",N:"39.34",E:"118.06",firststr:"F"},{city:"丰镇",N:"40.27",E:"113.09",firststr:"F"},{city:"肥城",N:"36.14",E:"116.46",firststr:"F"},{city:"富锦",N:"47.15",E:"132.02",firststr:"F"}]},G:{key:"G",item:[{city:"贵池",N:"30.39",E:"117.28",firststr:"G"},{city:"广汉",N:"30.58",E:"104.15",firststr:"G"},{city:"广元",N:"32.28",E:"105.51",firststr:"G"},{city:"公主岭",N:"43.31",E:"124.49",firststr:"G"},{city:"广州市",N:"23.08",E:"113.14",firststr:"G"},{city:"高明",N:"22.53",E:"112.5",firststr:"G"},{city:"个旧",N:"23.21",E:"103.09",firststr:"G"},{city:"高要",N:"23.02",E:"112.26",firststr:"G"},{city:"高州",N:"21.54",E:"110.5",firststr:"G"},{city:"高邮",N:"32.47",E:"119.27",firststr:"G"},{city:"衢州",N:"28.58",E:"118.52",firststr:"G"},{city:"贵港",N:"23.06",E:"109.36",firststr:"G"},{city:"赣州",N:"28.52",E:"114.56",firststr:"G"},{city:"桂林",N:"25.17",E:"110.17",firststr:"G"},{city:"高安",N:"28.25",E:"115.22",firststr:"G"},{city:"桂平",N:"23.22",E:"110.04",firststr:"G"},{city:"贵阳",N:"26.35",E:"106.42",firststr:"G"},{city:"盖州",N:"40.24",E:"122.21",firststr:"G"},{city:"高碑店",N:"39.2",E:"115.51",firststr:"G"},{city:"蒿城",N:"38.02",E:"114.5",firststr:"G"},{city:"根河",N:"50.48",E:"121.29",firststr:"G"},{city:"巩义",N:"34.46",E:"112.58",firststr:"G"},{city:"格尔木",N:"36.26",E:"94.55",firststr:"G"},{city:"高密",N:"36.22",E:"119.44",firststr:"G"},{city:"高平",N:"35.48",E:"112.55",firststr:"G"},{city:"古交",N:"37.54",E:"112.09",firststr:"G"},{city:"广水",N:"31.37",E:"113.48",firststr:"G"}]},H:{key:"H",item:[{city:"华阴",N:"34.34",E:"110.05",firststr:"H"},{city:"合肥",N:"31.52",E:"117.17",firststr:"H"},{city:"亳州",N:"33.52",E:"115.47",firststr:"H"},{city:"淮北",N:"33.57",E:"116.47",firststr:"H"},{city:"淮南",N:"32.37",E:"116.58",firststr:"H"},{city:"黄山",N:"29.43",E:"118.18",firststr:"H"},{city:"华蓥",N:"30.26",E:"106.44",firststr:"H"},{city:"衡阳",N:"26.53",E:"112.37",firststr:"H"},{city:"洪江",N:"27.07",E:"109.59",firststr:"H"},{city:"怀化",N:"27.33",E:"109.58",firststr:"H"},{city:"哈密",N:"42.5",E:"93.28",firststr:"H"},{city:"和田",N:"37.09",E:"79.55",firststr:"H"},{city:"和龙",N:"42.32",E:"129",firststr:"H"},{city:"桦甸",N:"42.58",E:"126.44",firststr:"H"},{city:"珲春",N:"42.52",E:"130.22",firststr:"H"},{city:"鹤山",N:"22.46",E:"112.57",firststr:"H"},{city:"河源",N:"23.43",E:"114.41",firststr:"H"},{city:"花都",N:"23.23",E:"113.12",firststr:"H"},{city:"化州",N:"21.39",E:"110.37",firststr:"H"},{city:"惠阳",N:"22.48",E:"114.28",firststr:"H"},{city:"惠州",N:"23.05",E:"114.22",firststr:"H"},{city:"杭州市",N:"30.16",E:"120.1",firststr:"H"},{city:"海门",N:"31.53",E:"121.09",firststr:"H"},{city:"淮安",N:"33.3",E:"119.09",firststr:"H"},{city:"淮阴",N:"33.36",E:"119.02",firststr:"H"},{city:"海宁",N:"30.32",E:"120.42",firststr:"H"},{city:"湖州",N:"30.52",E:"120.06",firststr:"H"},{city:"合川市",N:"30.02",E:"106.15",firststr:"H"},{city:"河池",N:"24.42",E:"108.03",firststr:"H"},{city:"合山",N:"23.47",E:"108.52",firststr:"H"},{city:"海口",N:"20.02",E:"110.2",firststr:"H"},{city:"海城",N:"40.51",E:"122.43",firststr:"H"},{city:"葫芦岛",N:"40.45",E:"120.51",firststr:"H"},{city:"邯郸",N:"36.36",E:"114.28",firststr:"H"},{city:"河间",N:"38.26",E:"116.05",firststr:"H"},{city:"衡水",N:"37.44",E:"115.42",firststr:"H"},{city:"黄骅",N:"38.21",E:"117.21",firststr:"H"},{city:"呼和浩特",N:"40.48",E:"111.41",firststr:"H"},{city:"海拉尔",N:"49.12",E:"119.39",firststr:"H"},{city:"霍林郭勒",N:"45.32",E:"119.38",firststr:"H"},{city:"鹤壁",N:"35.54",E:"114.11",firststr:"H"},{city:"辉县",N:"35.27",E:"113.47",firststr:"H"},{city:"菏泽",N:"35.14",E:"115.26",firststr:"H"},{city:"哈尔滨",N:"45.44",E:"126.36",firststr:"H"},{city:"海林",N:"44.35",E:"129.21",firststr:"H"},{city:"海伦",N:"47.28",E:"126.57",firststr:"H"},{city:"鹤岗",N:"47.2",E:"130.16",firststr:"H"},{city:"黑河",N:"50.14",E:"127.29",firststr:"H"},{city:"河津",N:"35.35",E:"110.41",firststr:"H"},{city:"侯马",N:"35.37",E:"111.21",firststr:"H"},{city:"霍州",N:"36.34",E:"111.42",firststr:"H"},{city:"洪湖",N:"29.48",E:"113.27",firststr:"H"},{city:"黄石",N:"30.12",E:"115.06",firststr:"H"},{city:"黄州",N:"30.27",E:"114.52",firststr:"H"},{city:"韩城",N:"35.28",E:"110.27",firststr:"H"},{city:"汉中",N:"33.04",E:"107.01",firststr:"H"}]},J:{key:"J",item:[{city:"界首",N:"33.15",E:"115.21",firststr:"J"},{city:"简阳",N:"30.24",E:"104.32",firststr:"J"},{city:"江油",N:"31.48",E:"104.42",firststr:"J"},{city:"津市",N:"29.38",E:"111.52",firststr:"J"},{city:"吉首",N:"28.18",E:"109.43",firststr:"J"},{city:"建瓯",N:"27.03",E:"118.2",firststr:"J"},{city:"建阳",N:"27.21",E:"118.07",firststr:"J"},{city:"晋江",N:"24.49",E:"118.35",firststr:"J"},{city:"嘉峪关",N:"39.48",E:"98.14",firststr:"J"},{city:"金昌",N:"38.28",E:"102.1",firststr:"J"},{city:"酒泉",N:"39.44",E:"98.31",firststr:"J"},{city:"集安",N:"41.08",E:"126.11",firststr:"J"},{city:"蛟河",N:"43.42",E:"127.21",firststr:"J"},{city:"吉林",N:"43.52",E:"126.33",firststr:"J"},{city:"九台",N:"44.09",E:"125.51",firststr:"J"},{city:"景洪",N:"22.01",E:"100.48",firststr:"J"},{city:"江门",N:"22.35",E:"113.04",firststr:"J"},{city:"揭阳",N:"22.32",E:"116.21",firststr:"J"},{city:"江都",N:"32.26",E:"119.32",firststr:"J"},{city:"姜堰",N:"32.34",E:"120.08",firststr:"J"},{city:"江阴",N:"31.54",E:"120.17",firststr:"J"},{city:"建德",N:"29.29",E:"119.16",firststr:"J"},{city:"靖江",N:"32.02",E:"120.17",firststr:"J"},{city:"江山",N:"28.45",E:"118.37",firststr:"J"},{city:"金坛",N:"31.46",E:"119.33",firststr:"J"},{city:"嘉兴",N:"30.46",E:"120.45",firststr:"J"},{city:"金华",N:"29.07",E:"119.39",firststr:"J"},{city:"江津市",N:"29.18",E:"106.16",firststr:"J"},{city:"吉安",N:"27.07",E:"114.58",firststr:"J"},{city:"景德镇",N:"29.17",E:"117.13",firststr:"J"},{city:"井冈山",N:"26.34",E:"114.1",firststr:"J"},{city:"九江",N:"29.43",E:"115.58",firststr:"J"},{city:"锦州",N:"41.07",E:"121.09",firststr:"J"},{city:"晋州",N:"38.02",E:"115.02",firststr:"J"},{city:"冀州",N:"37.34",E:"115.33",firststr:"J"},{city:"集宁",N:"41.02",E:"113.06",firststr:"J"},{city:"焦作",N:"35.14",E:"113.12",firststr:"J"},{city:"济源",N:"35.04",E:"112.35",firststr:"J"},{city:"济南",N:"36.4",E:"117",firststr:"J"},{city:"胶南",N:"35.53",E:"119.58",firststr:"J"},{city:"胶州",N:"36.17",E:"120",firststr:"J"},{city:"即墨",N:"36.22",E:"120.28",firststr:"J"},{city:"济宁",N:"35.23",E:"116.33",firststr:"J"},{city:"佳木斯",N:"46.47",E:"130.22",firststr:"J"},{city:"鸡西",N:"45.17",E:"130.57",firststr:"J"},{city:"介休",N:"37.02",E:"111.55",firststr:"J"},{city:"晋城",N:"35.3",E:"112.51",firststr:"J"},{city:"荆门",N:"31.02",E:"112.12",firststr:"J"},{city:"荆沙",N:"30.18",E:"112.16",firststr:"J"}]},K:{key:"K",item:[{city:"克拉玛依",N:"45.36",E:"84.51",firststr:"K"},{city:"喀什",N:"39.3",E:"75.59",firststr:"K"},{city:"库尔勒",N:"41.46",E:"86.07",firststr:"K"},{city:"奎屯",N:"44.27",E:"84.56",firststr:"K"},{city:"昆明",N:"25.04",E:"102.42",firststr:"K"},{city:"开远",N:"23.43",E:"103.13",firststr:"K"},{city:"开平",N:"22.22",E:"112.4",firststr:"K"},{city:"昆山",N:"31.23",E:"120.57",firststr:"K"},{city:"凯里",N:"26.35",E:"107.58",firststr:"K"},{city:"开原",N:"42.32",E:"124.02",firststr:"K"},{city:"廓坊",N:"39.31",E:"116.42",firststr:"K"},{city:"开封",N:"34.47",E:"114.21",firststr:"K"}]},L:{key:"L",item:[{city:"六安",N:"31.44",E:"116.28",firststr:"L"},{city:"阆中",N:"31.36",E:"105.58",firststr:"L"},{city:"乐山",N:"29.36",E:"103.44",firststr:"L"},{city:"泸州",N:"28.54",E:"105.24",firststr:"L"},{city:"冷水江",N:"27.42",E:"111.26",firststr:"L"},{city:"冷水滩",N:"26.26",E:"111.35",firststr:"L"},{city:"涟源",N:"27.41",E:"111.41",firststr:"L"},{city:"醴陵",N:"27.4",E:"113.3",firststr:"L"},{city:"龙海",N:"24.26",E:"117.48",firststr:"L"},{city:"临湘",N:"29.29",E:"113.27",firststr:"L"},{city:"龙岩",N:"25.06",E:"117.01",firststr:"L"},{city:"浏阳",N:"28.09",E:"113.37",firststr:"L"},{city:"娄底",N:"27.44",E:"111.59",firststr:"L"},{city:"拉萨",N:"29.39",E:"91.08",firststr:"L"},{city:"兰州",N:"36.04",E:"103.51",firststr:"L"},{city:"临夏",N:"35.37",E:"103.12",firststr:"L"},{city:"辽源",N:"42.54",E:"125.09",firststr:"L"},{city:"临江",N:"41.49",E:"126.53",firststr:"L"},{city:"龙井",N:"42.46",E:"129.26",firststr:"L"},{city:"乐昌",N:"25.09",E:"113.21",firststr:"L"},{city:"雷州",N:"20.54",E:"110.04",firststr:"L"},{city:"廉江",N:"21.37",E:"110.17",firststr:"L"},{city:"连州",N:"24.48",E:"112.23",firststr:"L"},{city:"罗定",N:"22.46",E:"111.33",firststr:"L"},{city:"连去港",N:"34.36",E:"119.1",firststr:"L"},{city:"兰溪",N:"29.12",E:"119.28",firststr:"L"},{city:"溧阳",N:"31.26",E:"119.29",firststr:"L"},{city:"临海",N:"28.51",E:"121.08",firststr:"L"},{city:"丽水",N:"28.27",E:"119.54",firststr:"L"},{city:"龙泉",N:"28.04",E:"119.08",firststr:"L"},{city:"乐清",N:"28.08",E:"120.58",firststr:"L"},{city:"柳州",N:"23.19",E:"109.24",firststr:"L"},{city:"赁祥",N:"22.07",E:"106.44",firststr:"L"},{city:"乐平",N:"28.58",E:"117.08",firststr:"L"},{city:"临川",N:"27.59",E:"116.21",firststr:"L"},{city:"六盘水",N:"26.35",E:"104.5",firststr:"L"},{city:"辽阳",N:"41.16",E:"123.12",firststr:"L"},{city:"凌海",N:"41.1",E:"121.21",firststr:"L"},{city:"凌源",N:"41.14",E:"119.22",firststr:"L"},{city:"鹿泉",N:"38.04",E:"114.19",firststr:"L"},{city:"临河",N:"40.46",E:"107.22",firststr:"L"},{city:"灵宝",N:"34.31",E:"110.52",firststr:"L"},{city:"林州",N:"36.03",E:"113.49",firststr:"L"},{city:"漯河",N:"33.33",E:"114.02",firststr:"L"},{city:"洛阳",N:"34.41",E:"112.27",firststr:"L"},{city:"莱芜",N:"36.12",E:"117.4",firststr:"L"},{city:"莱西",N:"36.52",E:"120.31",firststr:"L"},{city:"莱阳",N:"36.58",E:"120.42",firststr:"L"},{city:"莱州",N:"37.1",E:"119.57",firststr:"L"},{city:"乐陵",N:"37.44",E:"117.12",firststr:"L"},{city:"聊城",N:"36.26",E:"115.57",firststr:"L"},{city:"临清",N:"36.51",E:"115.42",firststr:"L"},{city:"临沂",N:"35.03",E:"118.2",firststr:"L"},{city:"龙口",N:"37.39",E:"120.21",firststr:"L"},{city:"临汾",N:"36.05",E:"111.31",firststr:"L"},{city:"潞城",N:"36.21",E:"113.14",firststr:"L"},{city:"老河口",N:"32.23",E:"111.4",firststr:"L"},{city:"利川",N:"30.18",E:"108.56",firststr:"L"}]},M:{key:"M",item:[{city:"马鞍山",N:"31.43",E:"118.28",firststr:"M"},{city:"明光",N:"32.47",E:"117.58",firststr:"M"},{city:"耒阳",N:"26.24",E:"112.51",firststr:"M"},{city:"绵阳",N:"31.3",E:"104.42",firststr:"M"},{city:"邛崃",N:"30.26",E:"103.28",firststr:"M"},{city:"汨罗",N:"28.49",E:"113.03",firststr:"M"},{city:"梅河口",N:"42.32",E:"125.4",firststr:"M"},{city:"茂名",N:"21.4",E:"110.53",firststr:"M"},{city:"梅州",N:"24.19",E:"116.07",firststr:"M"},{city:"满洲里",N:"49.35",E:"117.23",firststr:"M"},{city:"密山",N:"45.32",E:"131.5",firststr:"M"},{city:"牡丹江",N:"44.35",E:"129.36",firststr:"M"},{city:"麻城",N:"31.1",E:"115.01",firststr:"M"}]},N:{key:"N",item:[{city:"南充",N:"30.49",E:"106.04",firststr:"N"},{city:"内江",N:"29.36",E:"105.02",firststr:"N"},{city:"南安",N:"24.57",E:"118.23",firststr:"N"},{city:"南平",N:"26.38",E:"118.1",firststr:"N"},{city:"宁德",N:"26.39",E:"119.31",firststr:"N"},{city:"南京市",N:"32.03",E:"118.46",firststr:"N"},{city:"南海",N:"23.01",E:"113.09",firststr:"N"},{city:"南通",N:"32.01",E:"120.51",firststr:"N"},{city:"宁波",N:"29.52",E:"121.33",firststr:"N"},{city:"南宁",N:"22.48",E:"108.19",firststr:"N"},{city:"南昌",N:"28.4",E:"115.55",firststr:"N"},{city:"南川市",N:"29.1",E:"107.05",firststr:"N"},{city:"南宫",N:"37.22",E:"115.23",firststr:"N"},{city:"南阳",N:"33",E:"112.32",firststr:"N"},{city:"讷河",N:"48.29",E:"124.51",firststr:"N"},{city:"宁安",N:"44.21",E:"129.28",firststr:"N"}]},P:{key:"P",item:[{city:"浦圻",N:"29.42",E:"113.51",firststr:"P"},{city:"攀枝花",N:"26.34",E:"101.43",firststr:"P"},{city:"彭州",N:"30.59",E:"103.57",firststr:"P"},{city:"莆田",N:"24.26",E:"119.01",firststr:"P"},{city:"平凉",N:"35.32",E:"106.4",firststr:"P"},{city:"普宁",N:"23.18",E:"116.1",firststr:"P"},{city:"邳州",N:"34.19",E:"117.59",firststr:"P"},{city:"平湖",N:"30.42",E:"121.01",firststr:"P"},{city:"萍乡",N:"27.37",E:"113.5",firststr:"P"},{city:"盘锦",N:"41.07",E:"122.03",firststr:"P"},{city:"普兰店",N:"39.23",E:"121.58",firststr:"P"},{city:"平顶山",N:"33.44",E:"113.17",firststr:"P"},{city:"濮阳",N:"35.44",E:"115.01",firststr:"P"},{city:"蓬莱",N:"37.48",E:"120.45",firststr:"P"},{city:"平度",N:"36.47",E:"119.58",firststr:"P"}]},Q:{key:"Q",item:[{city:"潜江",N:"30.26",E:"112.53",firststr:"Q"},{city:"泉州",N:"24.56",E:"118.36",firststr:"Q"},{city:"曲靖",N:"25.3",E:"103.48",firststr:"Q"},{city:"清远",N:"23.42",E:"113.01",firststr:"Q"},{city:"启乐",N:"31.48",E:"121.39",firststr:"Q"},{city:"钦州",N:"21.57",E:"108.37",firststr:"Q"},{city:"清镇",N:"26.33",E:"106.27",firststr:"Q"},{city:"琼海",N:"19.14",E:"110.28",firststr:"Q"},{city:"琼山",N:"19.59",E:"110.21",firststr:"Q"},{city:"秦皇岛",N:"39.55",E:"119.35",firststr:"Q"},{city:"青铜峡",N:"37.56",E:"105.59",firststr:"Q"},{city:"沁阳",N:"35.05",E:"112.57",firststr:"Q"},{city:"青岛",N:"36.03",E:"120.18",firststr:"Q"},{city:"青州",N:"36.42",E:"118.28",firststr:"Q"},{city:"曲阜",N:"35.36",E:"116.58",firststr:"Q"},{city:"齐齐哈尔",N:"47.2",E:"123.57",firststr:"Q"},{city:"七台河",N:"45.48",E:"130.49",firststr:"Q"}]},R:{key:"R",item:[{city:"沅江",N:"28.5",E:"112.22",firststr:"R"},{city:"日喀则",N:"29.16",E:"88.51",firststr:"R"},{city:"瑞丽",N:"24",E:"97.5",firststr:"R"},{city:"如皋",N:"32.23",E:"120.33",firststr:"R"},{city:"瑞安",N:"27.48",E:"120.38",firststr:"R"},{city:"瑞昌",N:"29.4",E:"115.38",firststr:"R"},{city:"瑞金",N:"25.53",E:"116.01",firststr:"R"},{city:"任丘",N:"38.42",E:"116.07",firststr:"R"},{city:"汝州",N:"34.09",E:"112.5",firststr:"R"},{city:"日照",N:"35.23",E:"119.32",firststr:"R"},{city:"荣成",N:"37.1",E:"122.25",firststr:"R"},{city:"乳山",N:"36.54",E:"121.31",firststr:"R"}]},S:{key:"S",item:[{city:"商州",N:"33.52",E:"109.57",firststr:"S"},{city:"石首",N:"29.43",E:"112.24",firststr:"S"},{city:"十堰",N:"32.4",E:"110.47",firststr:"S"},{city:"随州",N:"31.42",E:"113.22",firststr:"S"},{city:"上海市",N:"31.14",E:"121.29",firststr:"S"},{city:"宿州",N:"33.38",E:"116.58",firststr:"S"},{city:"遂宁",N:"30.31",E:"105.33",firststr:"S"},{city:"韶山",N:"27.54",E:"112.29",firststr:"S"},{city:"邵阳",N:"27.14",E:"111.28",firststr:"S"},{city:"三明",N:"26.13",E:"117.36",firststr:"S"},{city:"邵武",N:"27.2",E:"117.29",firststr:"S"},{city:"石狮",N:"24.44",E:"118.38",firststr:"S"},{city:"石河子",N:"44.18",E:"86",firststr:"S"},{city:"舒兰",N:"44.24",E:"126.57",firststr:"S"},{city:"四平",N:"43.1",E:"124.22",firststr:"S"},{city:"松原",N:"45.11",E:"124.49",firststr:"S"},{city:"思茅",N:"22.48",E:"100.58",firststr:"S"},{city:"三水",N:"23.1",E:"112.52",firststr:"S"},{city:"汕头",N:"23.22",E:"116.41",firststr:"S"},{city:"汕尾",N:"22.47",E:"115.21",firststr:"S"},{city:"韶关",N:"24.48",E:"113.37",firststr:"S"},{city:"深圳市",N:"22.33",E:"114.07",firststr:"S"},{city:"宿迁",N:"33.58",E:"118.18",firststr:"S"},{city:"顺德",N:"22.5",E:"113.15",firststr:"S"},{city:"苏州",N:"31.19",E:"120.37",firststr:"S"},{city:"四会",N:"23.21",E:"112.41",firststr:"S"},{city:"上虞",N:"30.01",E:"120.52",firststr:"S"},{city:"绍兴",N:"30",E:"120.34",firststr:"S"},{city:"上饶",N:"25.27",E:"117.58",firststr:"S"},{city:"沈阳",N:"41.48",E:"123.25",firststr:"S"},{city:"三亚",N:"18.14",E:"109.31",firststr:"S"},{city:"石家庄",N:"38.02",E:"114.3",firststr:"S"},{city:"三河",N:"39.58",E:"117.04",firststr:"S"},{city:"沙河",N:"36.51",E:"114.3",firststr:"S"},{city:"深州",N:"38.01",E:"115.32",firststr:"S"},{city:"石嘴山",N:"39.02",E:"106.22",firststr:"S"},{city:"三门峡",N:"34.47",E:"111.12",firststr:"S"},{city:"商丘",N:"34.26",E:"115.38",firststr:"S"},{city:"寿光",N:"36.53",E:"118.44",firststr:"S"},{city:"双城",N:"45.22",E:"126.15",firststr:"S"},{city:"尚志",N:"45.14",E:"127.55",firststr:"S"},{city:"双鸭山",N:"46.38",E:"131.11",firststr:"S"},{city:"绥芬河",N:"44.25",E:"131.11",firststr:"S"},{city:"绥化",N:"46.38",E:"126.59",firststr:"S"},{city:"朔州",N:"39.19",E:"112.26",firststr:"S"}]},T:{key:"T",item:[{city:"铜川",N:"35.06",E:"109.07",firststr:"T"},{city:"天门",N:"30.6",E:"113.1",firststr:"T"},{city:"天长",N:"32.41",E:"118.59",firststr:"T"},{city:"铜陵",N:"30.56",E:"117.48",firststr:"T"},{city:"台北市",N:"25.03",E:"121.3",firststr:"T"},{city:"天津市",N:"39.02",E:"117.12",firststr:"T"},{city:"天水",N:"34.37",E:"105.42",firststr:"T"},{city:"塔城",N:"46.46",E:"82.59",firststr:"T"},{city:"吐鲁番",N:"42.54",E:"89.11",firststr:"T"},{city:"通化",N:"41.43",E:"125.56",firststr:"T"},{city:"图们",N:"42.57",E:"129.51",firststr:"T"},{city:"太仓",N:"31.27",E:"121.06",firststr:"T"},{city:"台山",N:"22.15",E:"112.48",firststr:"T"},{city:"泰兴",N:"32.1",E:"120.01",firststr:"T"},{city:"泰州",N:"32.3",E:"119.54",firststr:"T"},{city:"台州",N:"28.41",E:"121.27",firststr:"T"},{city:"通州",N:"32.05",E:"121.03",firststr:"T"},{city:"桐乡",N:"30.38",E:"120.32",firststr:"T"},{city:"铜仁",N:"27.43",E:"109.12",firststr:"T"},{city:"通什",N:"18.46",E:"109.31",firststr:"T"},{city:"铁法",N:"42.28",E:"123.32",firststr:"T"},{city:"铁岭",N:"42.18",E:"123.51",firststr:"T"},{city:"唐山",N:"39.36",E:"118.11",firststr:"T"},{city:"通辽",N:"43.37",E:"122.16",firststr:"T"},{city:"泰安",N:"36.11",E:"117.08",firststr:"T"},{city:"滕州",N:"35.06",E:"117.09",firststr:"T"},{city:"太原",N:"37.54",E:"112.33",firststr:"T"},{city:"铁力",N:"46.59",E:"128.01",firststr:"T"},{city:"同江",N:"47.39",E:"132.3",firststr:"T"}]},W:{key:"W",item:[{city:"渭南",N:"34.3",E:"109.3",firststr:"W"},{city:"武穴",N:"29.51",E:"115.33",firststr:"W"},{city:"芜湖",N:"31.19",E:"118.22",firststr:"W"},{city:"万县",N:"30.5",E:"108.21",firststr:"W"},{city:"万源",N:"32.03",E:"108.03",firststr:"W"},{city:"武冈",N:"26.43",E:"110.37",firststr:"W"},{city:"武夷山",N:"27.46",E:"118.02",firststr:"W"},{city:"乌鲁木齐",N:"43.45",E:"87.36",firststr:"W"},{city:"武威",N:"37.56",E:"102.39",firststr:"W"},{city:"洮南",N:"45.2",E:"122.47",firststr:"W"},{city:"畹町",N:"24.06",E:"98.04",firststr:"W"},{city:"吴川",N:"21.26",E:"110.47",firststr:"W"},{city:"吴江",N:"31.1",E:"120.39",firststr:"W"},{city:"温岭",N:"28.22",E:"121.21",firststr:"W"},{city:"无锡",N:"31.34",E:"120.18",firststr:"W"},{city:"温州",N:"28.01",E:"120.39",firststr:"W"},{city:"梧州",N:"23.29",E:"111.2",firststr:"W"},{city:"瓦房店",N:"39.37",E:"122",firststr:"W"},{city:"武安",N:"36.42",E:"114.11",firststr:"W"},{city:"乌兰浩特",N:"46.03",E:"122.03",firststr:"W"},{city:"乌海",N:"39.4",E:"106.48",firststr:"W"},{city:"吴忠",N:"37.59",E:"106.11",firststr:"W"},{city:"卫辉",N:"35.24",E:"114.03",firststr:"W"},{city:"舞钢",N:"33.17",E:"113.3",firststr:"W"},{city:"潍坊",N:"36.43",E:"119.06",firststr:"W"},{city:"威海",N:"37.31",E:"122.07",firststr:"W"},{city:"文登",N:"37.12",E:"122.03",firststr:"W"},{city:"五常",N:"44.55",E:"127.11",firststr:"W"},{city:"五大连池",N:"48.38",E:"126.07",firststr:"W"},{city:"武汉市",N:"30.35",E:"114.17",firststr:"W"}]},X:{key:"X",item:[{city:"咸阳",N:"34.2",E:"108.43",firststr:"X"},{city:"兴平",N:"34.18",E:"108.29",firststr:"X"},{city:"襄樊",N:"32.02",E:"112.08",firststr:"X"},{city:"咸宁",N:"29.53",E:"114.17",firststr:"X"},{city:"仙桃",N:"30.22",E:"113.27",firststr:"X"},{city:"孝感",N:"30.56",E:"113.54",firststr:"X"},{city:"宣州",N:"30.57",E:"118.44",firststr:"X"},{city:"西昌",N:"27.54",E:"102.16",firststr:"X"},{city:"湘潭",N:"27.52",E:"112.53",firststr:"X"},{city:"湘乡",N:"27.44",E:"112.31",firststr:"X"},{city:"厦门",N:"24.27",E:"118.06",firststr:"X"},{city:"香港市",N:"21.23",E:"115.12",firststr:"X"},{city:"西峰",N:"35.45",E:"107.4",firststr:"X"},{city:"宣威",N:"26.13",E:"104.06",firststr:"X"},{city:"新会",N:"22.32",E:"113.01",firststr:"X"},{city:"兴宁",N:"24.09",E:"115.43",firststr:"X"},{city:"兴化",N:"32.56",E:"119.5",firststr:"X"},{city:"萧山",N:"30.09",E:"120.16",firststr:"X"},{city:"新沂",N:"34.22",E:"118.2",firststr:"X"},{city:"徐州",N:"34.15",E:"117.11",firststr:"X"},{city:"新余",N:"27.48",E:"114.56",firststr:"X"},{city:"兴义",N:"25.05",E:"104.53",firststr:"X"},{city:"兴城",N:"40.37",E:"120.41",firststr:"X"},{city:"新民",N:"41.59",E:"122.49",firststr:"X"},{city:"邢台",N:"37.04",E:"114.3",firststr:"X"},{city:"辛集",N:"37.54",E:"115.12",firststr:"X"},{city:"新乐",N:"38.2",E:"114.41",firststr:"X"},{city:"锡林浩特",N:"43.57",E:"116.03",firststr:"X"},{city:"西宁",N:"36.38",E:"101.48",firststr:"X"},{city:"项城",N:"33.26",E:"114.54",firststr:"X"},{city:"新密",N:"34.31",E:"113.22",firststr:"X"},{city:"新乡",N:"35.18",E:"113.52",firststr:"X"},{city:"信阳",N:"32.07",E:"114.04",firststr:"X"},{city:"新郑",N:"34.24",E:"113.43",firststr:"X"},{city:"许昌",N:"34.01",E:"113.49",firststr:"X"},{city:"新泰",N:"35.54",E:"117.45",firststr:"X"},{city:"孝义",N:"37.08",E:"111.48",firststr:"X"},{city:"忻州",N:"38.24",E:"112.43",firststr:"X"},{city:"西安市",N:"34.17",E:"108.57",firststr:"X"}]},Y:{key:"Y",item:[{city:"延安",N:"36.35",E:"109.28",firststr:"Y"},{city:"榆林",N:"38.18",E:"109.47",firststr:"Y"},{city:"宜昌",N:"30.42",E:"111.17",firststr:"Y"},{city:"宜城",N:"31.42",E:"112.15",firststr:"Y"},{city:"应城",N:"30.57",E:"113.33",firststr:"Y"},{city:"雅安",N:"29.59",E:"102.59",firststr:"Y"},{city:"宜宾",N:"28.47",E:"104.34",firststr:"Y"},{city:"益阳",N:"28.36",E:"112.2",firststr:"Y"},{city:"永州",N:"26.13",E:"111.37",firststr:"Y"},{city:"永安",N:"25.58",E:"117.23",firststr:"Y"},{city:"岳阳",N:"29.22",E:"113.06",firststr:"Y"},{city:"玉门",N:"39.49",E:"97.35",firststr:"Y"},{city:"伊宁",N:"43.55",E:"81.2",firststr:"Y"},{city:"延吉",N:"42.54",E:"129.3",firststr:"Y"},{city:"愉树",N:"44.49",E:"126.32",firststr:"Y"},{city:"玉溪",N:"24.22",E:"102.32",firststr:"Y"},{city:"阳春",N:"22.1",E:"111.48",firststr:"Y"},{city:"阳江",N:"21.5",E:"111.58",firststr:"Y"},{city:"英德",N:"24.1",E:"113.22",firststr:"Y"},{city:"义乌",N:"29.18",E:"120.04",firststr:"Y"},{city:"云浮",N:"22.57",E:"112.02",firststr:"Y"},{city:"盐在",N:"33.22",E:"120.08",firststr:"Y"},{city:"余杭",N:"30.26",E:"120.18",firststr:"Y"},{city:"扬中",N:"32.14",E:"119.49",firststr:"Y"},{city:"余姚",N:"30.02",E:"121.1",firststr:"Y"},{city:"扬州",N:"32.23",E:"119.26",firststr:"Y"},{city:"永康",N:"29.54",E:"120.01",firststr:"Y"},{city:"宜兴",N:"31.21",E:"119.49",firststr:"Y"},{city:"仪征",N:"32.16",E:"119.1",firststr:"Y"},{city:"永川市",N:"29.23",E:"105.53",firststr:"Y"},{city:"玉林",N:"22.38",E:"110.09",firststr:"Y"},{city:"宜州",N:"24.28",E:"108.4",firststr:"Y"},{city:"宜春",N:"27.47",E:"114.23",firststr:"Y"},{city:"鹰潭",N:"28.14",E:"117.03",firststr:"Y"},{city:"营口",N:"40.39",E:"122.13",firststr:"Y"},{city:"牙克石",N:"49.17",E:"120.4",firststr:"Y"},{city:"银川",N:"38.27",E:"106.16",firststr:"Y"},{city:"荥阳",N:"34.46",E:"113.21",firststr:"Y"},{city:"偃师",N:"34.43",E:"112.47",firststr:"Y"},{city:"义马",N:"34.43",E:"111.55",firststr:"Y"},{city:"禹州",N:"34.09",E:"113.28",firststr:"Y"},{city:"烟台",N:"37.32",E:"121.24",firststr:"Y"},{city:"兖州",N:"35.32",E:"116.49",firststr:"Y"},{city:"禹城",N:"36.56",E:"116.39",firststr:"Y"},{city:"伊春",N:"47.42",E:"128.56",firststr:"Y"},{city:"阳泉",N:"37.51",E:"113.34",firststr:"Y"},{city:"永济",N:"34.52",E:"110.27",firststr:"Y"},{city:"原平",N:"38.43",E:"112.42",firststr:"Y"},{city:"榆次",N:"37.41",E:"112.43",firststr:"Y"},{city:"运城",N:"35.02",E:"110.59",firststr:"Y"}]},Z:{key:"Z",item:[{city:"枣阳",N:"32.07",E:"112.44",firststr:"Z"},{city:"枝城",N:"30.23",E:"111.27",firststr:"Z"},{city:"钟祥",N:"31.1",E:"112.34",firststr:"Z"},{city:"自贡",N:"29.23",E:"104.46",firststr:"Z"},{city:"资阳",N:"30.09",E:"104.38",firststr:"Z"},{city:"漳平",N:"25.17",E:"117.24",firststr:"Z"},{city:"张家界",N:"29.08",E:"110.29",firststr:"Z"},{city:"漳州",N:"24.31",E:"117.39",firststr:"Z"},{city:"株洲",N:"27.51",E:"113.09",firststr:"Z"},{city:"资兴",N:"25.58",E:"113.13",firststr:"Z"},{city:"张掖",N:"38.56",E:"100.26",firststr:"Z"},{city:"昭通",N:"27.2",E:"103.42",firststr:"Z"},{city:"增城",N:"23.18",E:"113.49",firststr:"Z"},{city:"湛江",N:"21.11",E:"110.24",firststr:"Z"},{city:"肇庆",N:"23.03",E:"112.27",firststr:"Z"},{city:"中山",N:"22.31",E:"113.22",firststr:"Z"},{city:"舟山",N:"30.01",E:"122.06",firststr:"Z"},{city:"珠海",N:"22.17",E:"113.34",firststr:"Z"},{city:"诸暨",N:"29.43",E:"120.14",firststr:"Z"},{city:"张家港",N:"31.52",E:"120.32",firststr:"Z"},{city:"重庆市",N:"29.35",E:"106.33",firststr:"Z"},{city:"镇江",N:"32.11",E:"119.27",firststr:"Z"},{city:"樟树",N:"28.03",E:"115.32",firststr:"Z"},{city:"遵义",N:"27.42",E:"106.55",firststr:"Z"},{city:"儋州",N:"19.31",E:"109.34",firststr:"Z"},{city:"庄河",N:"39.41",E:"122.58",firststr:"Z"},{city:"张家口",N:"40.48",E:"114.53",firststr:"Z"},{city:"涿州",N:"39.29",E:"115.59",firststr:"Z"},{city:"遵化",N:"40.11",E:"117.58",firststr:"Z"},{city:"郑州",N:"34.46",E:"113.4",firststr:"Z"},{city:"扎兰屯",N:"48",E:"122.47",firststr:"Z"},{city:"周口",N:"33.37",E:"114.38",firststr:"Z"},{city:"驻马店",N:"32.58",E:"114.01",firststr:"Z"},{city:"枣庄",N:"34.52",E:"117.33",firststr:"Z"},{city:"章丘",N:"36.43",E:"117.32",firststr:"Z"},{city:"招远",N:"37.21",E:"120.23",firststr:"Z"},{city:"诸城",N:"35.59",E:"119.24",firststr:"Z"},{city:"淄博",N:"36.48",E:"118.03",firststr:"Z"},{city:"邹城",N:"35.24",E:"116.58",firststr:"Z"},{city:"肇东",N:"46.04",E:"125.58",firststr:"Z"}]}}}});