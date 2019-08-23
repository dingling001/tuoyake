<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">{{$t('navs[0].name')}}</a>
        »
        <a href="javascript:;">{{$t('navs[2].name')}}</a>
      </div>
    </div>
    <div class="top" v-if="$t('news')">
      <div class="container">
        <div class="item" @click="goPw"></div>
        <div class="item item0" @click="goTeam"></div>
        <div class="item item1" @click="goE"></div>
      </div>
    </div>
    <div class="container">
      <div class="title sub-title">
        <h3>{{$t('zhinan')}}</h3>
      </div>
      <div class="info">
        <h3>
          <span></span>
          {{$t('openT')}}
        </h3>
        <div class="info-main" v-html="open"></div>
      </div>
      <div class="info visit">
        <h3>
          <span></span>
          {{$t('visit')}}
        </h3>
        <div class="info-main" v-html="visit"></div>
      </div>
      <div class="info guide">
        <h3>
          <span></span>
          {{$t('guide')}}
        </h3>
        <div class="info-main" v-html="guide"></div>
      </div>
      <div class="info serivce">
        <h3>
          <span></span>
          {{$t('service')}}
        </h3>
        <div class="swiper-container service1">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in services" :key="index">
              <img :src="item.img" alt />
            </div>
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
        <div class="swiper-pagination" id="pagination1"></div>
      </div>
      <div class="info zhan">
        <h3>
          <span></span>
          {{$t('zhanai')}}
        </h3>
        <div class="swiper-container zhanai">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in zhans" :key="index">
              <img :src="item.img" alt />
            </div>
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
        <div class="swiper-pagination" id="pagination2"></div>
      </div>
      <div class="title sub-title">
        <h3>{{$t('traff')}}</h3>
      </div>
    </div>
    <div class="traffic">
      <div class="traffic-container">
        <div class="tr-l">
          <h3>{{$t('traff')}}</h3>
          <div class="tr-info" v-html="traff"></div>
        </div>
        <baidu-map
          class="map maps"
          id="mapCanvas"
          :center="center"
          :zoom="zoom"
          @ready="handler"
          :ak="ak"
        >
          <!-- <bm-info-window
            :position="{lng: 117.80, lat: 39.12}"
            :title="$t('titles')"
            :show="infoWindow.show"
            @close="infoWindowClose"
            @open="infoWindowOpen"
          >
            <p v-text="infoWindow.contents"></p>
          </bm-info-window>-->
          <!-- <bm-marker
            :position="{lng: 117.80, lat: 39.11}"
            :dragging="true"
            animation="BMAP_ANIMATION_BOUNCE"
          ></bm-marker>-->
          <!-- <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>-->
        </baidu-map>
      </div>
    </div>
    <div class="container">
      <div class="title sub-title" v-if="restaurant">
        <h3>{{$t('can')}}</h3>
      </div>
      <div class="dinner" v-if="restaurant">
        <img :src="restaurant.img" alt />
        <div class="dinner-main">
          <h3>{{restaurant.title}}</h3>
          <p>{{restaurant.intro}}</p>
          <p>{{restaurant.des}}</p>
          <span @click="goMore">{{$t('more')}} ></span>
        </div>
      </div>
      <div class="title sub-title" v-if="$t('news')">
        <h3>{{$t('around')}}</h3>
        <p>
          半小时车程以内包括航母主题公园、中新友好图书馆、方特欢乐水世界（季节性开放）等，
          就餐可查询中新生态城。
        </p>
      </div>

      <div class="around" v-if="$t('news')">
        <baidu-map
          class="map"
          id="around"
          :center="center"
          :zoom="zoom2"
          @ready="handler2"
          :ak="ak"
        >
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
          <div v-if="zoom2>11">
            <bm-marker
              v-for="(item,index) in points"
              :key="index"
              :position="{lng: item.lng, lat: item.lat,}"
              :dragging="false"
              :icon="{url: web+'/img/map/'+(index+1)+'.png', size: {width: 51.5, height:58}}"
            >
              <bm-label
                v-if="zoom2>=14"
                :content="item.name"
                :labelStyle="{color: '#EE8E41', fontSize : '12px'}"
                :offset="{width: -15, height: 60}"
              />
            </bm-marker>
          </div>
        </baidu-map>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  data() {
    return {
      open: "",
      visit: "",
      guide: "",
      services: [],
      swiper: "",
      activeIndex: 0,
      zhanaiIndex: 0,
      zhans: [],
      traff: "",
      zhanSwiper: "",
      restaurant: "",
      // infoWindow: {
      //   show: true,
      //   contents: "天津市滨海新区中新生态城海轩道377号"
      // },
      web: STATIC_WEB_URL,
      ak: "PhuixLOuLnCTqNWNtyyqupPIhOw7HCZl",
      zoom: 15,
      zoom2: 14.5,
      points: [
        {
          lat: 39.1299970114,
          lng: 117.7470798972,
          name: "国家动漫园"
        },
        {
          lat: 39.1900722389,
          lng: 117.8712518072,
          name: "滨海鲤鱼门"
        },
        {
          lat: 39.1634962861,
          lng: 117.816648941,
          name: "天津泰达航母主题公园"
        },
        {
          lat: 39.1600365665,
          lng: 117.7456303052,
          name: "方特欢乐世界"
        },
        {
          lat: 39.1114332688,
          lng: 117.758996545,
          name: "津沽记忆博物馆"
        },
        {
          lat: 39.110538046,
          lng: 117.7605766355,
          name: "东方艺术馆"
        },
        {
          lat: 39.1018071279,
          lng: 117.8469380875,
          name: "东堤公园"
        },
        {
          name: "生态公园",
          lat: 39.10397683,
          lng: 117.7504506572
        },
        {
          name: "欢乐水魔方",
          lat: 39.106454046,
          lng: 117.7540546355
        },
        {
          name: "国家海洋博物馆",
          lat: 39.1123,
          lng: 117.8018569923
        },
        {
          name: "滨海妈祖文化园",
          lat: 39.1130220566,
          lng: 117.8524476452
        },
        {
          lat: 39.1463380948,
          lng: 117.7462936274,
          name: "亿利生态公园"
        },
        {
          name: "鼓浪水镇月沙滩",
          lat: 39.1839739535,
          lng: 117.8759930496
        },
        {
          name: "遗鸥公园",
          lat: 39.1427792495,
          lng: 117.7949950552
        },
        {
          name: "惠风溪公园",
          lat: 39.136980026,
          lng: 117.7647760544
        },
        {
          name: "永定洲公园",
          lat: 39.10632683,
          lng: 117.7445306572
        }
      ],
      center: { lng: 117.8018569923, lat: 39.112 },
      is_team: 0
    };
  },
  inject: ["app"],
  computed: {
    infoWindow: function() {
      return {
        show: true,
        contents: this.$t("guideAddress")
      };
    }
  },
  filters: {
    getYMD: function(data) {
      if (data == "") {
        return;
      }
      var date = new Date(data);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDay();
      return year + "." + month + "." + day;
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        var state = val.query.state;
        var that = this;
        switch (state) {
          case "about":
            that.tab_footer(2);
            break;
          case "intro":
            that.tab_footer(0);
            break;
          case "zixun":
            that.tab_footer(1);
            break;
          case "around":
            that.tab_footer(3);
            break;
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    infoWindowClose(e) {
      this.infoWindow.show = false;
    },
    infoWindowOpen(e) {
      this.infoWindow.show = true;
    },
    goMore() {
      this.$router.push("/vDetail");
    },
    goE() {
      this.$router.push("/jiangjie");
    },
    goPw() {
      this.$router.push("/pw/person/index");
    },
    getDetail() {
      this.$api.getVisit().then(res => {
        this.open = res.data.open;
        this.visit = res.data.visit;
        this.guide = res.data.guider;
        this.services = res.data.service;
        this.traff = res.data.traff;
        this.restaurant = res.data.restaurant;
        this.zhans = res.data.service_wu;
        setTimeout(() => {
          this.initS();
        }, 500);
        setTimeout(() => {
          this.initZ();
        }, 500);
      });
    },
    tab_footer(index) {
      let jump = document.querySelectorAll(".sub-title");
      let total = jump[index].offsetTop - 260;
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = total / 100;
      if (total > distance) {
        smoothDown();
      } else {
        let newTotal = distance - total;
        step = newTotal / 50;
        smoothUp();
      }

      function smoothDown() {
        if (distance < total) {
          distance += step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          setTimeout(smoothDown, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
        }
      }

      function smoothUp() {
        if (distance > total) {
          distance -= step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          setTimeout(smoothUp, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
        }
      }
    },
    go(id) {
      this.activeIndex = id;
      this.swiper.slideTo(id, 500, false);
    },
    goZan(index) {
      this.zhanaiIndex = index;
      this.zhanSwiper.slideTo(index, 500, false);
    },
    initS() {
      var _this = this;
      this.swiper = new Swiper(".service1", {
        autoplay: 3000,
        direction: "horizontal",
        loop: true,
        effect: "fade",
        prevButton: ".swiper-button-prev",
        nextButton: ".swiper-button-next",
        //手动触发后继续播放
        autoplayDisableOnInteraction: false,
        paginationClickable: true,
        pagination: "#pagination1",
        paginationClickable: true,
        paginationBulletRender: function(swiper, index, className) {
          return '<span class="' + className + '">' + (index + 1) + "F</span>";
        }
      });
    },
    initZ() {
      var _this = this;
      this.zhanSwiper = new Swiper(".zhanai", {
        autoplay: 3000,
        direction: "horizontal",
        loop: true,
        effect: "fade",
        prevButton: ".swiper-button-prev",
        nextButton: ".swiper-button-next",
        //手动触发后继续播放
        autoplayDisableOnInteraction: false,
        pagination: "#pagination2",
        paginationClickable: true,
        paginationBulletRender: function(swiper, index, className) {
          return '<span class="' + className + '">' + (index + 1) + "F</span>";
        }
      });
    },
    handler({ BMap, map }) {
      var _this = this;
      map.addEventListener("zoomend", function(e) {
        _this.zoom = map.getZoom();
      });
      this.center.lng = 117.8018569923;
      this.center.lat = 39.1123;
      this.zoom = 12;
    },
    handler2({ BMap, map }) {
      var _this = this;
      map.addEventListener("zoomend", function(e) {
        _this.zoom2 = map.getZoom();
      });
      this.center.lng = 117.8018569923;
      this.center.lat = 39.13;
      this.zoom2 = 14.5;
    },
    goTeam() {
      this.$router.push("/team");
      //   if (localStorage.api_token) {
      //     if (this.is_team == 1) {
      //       this.$router.push("/pw/team/index");
      //     } else {
      //       this.$api.getUser().then(res => {
      //         this.is_team = res.data.is_team;
      //         if (this.is_team == 1) {
      //           this.$router.push("/pw/team/index");
      //         } else {
      //           this.$router.push("/pw/team/register");
      //         }
      //       });
      //     }
      //   } else {
      //     this.app.openLogin();
      //   }
    }
  },
  mounted() {
    this.getDetail();
    setTimeout(() => {
      var state = this.$route.query.state;
      var that = this;
      switch (state) {
        case "about":
          that.tab_footer(2);
          break;
        case "intro":
          that.tab_footer(0);
          break;
        case "zixun":
          that.tab_footer(1);
          break;
        case "around":
          that.tab_footer(3);
          break;
      }
    }, 800);
  }
};
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.topbar-wrapper {
  background-color: #e7e7e7;
  height: 60px;
  line-height: 60px;
  .topbar {
    width: 1200px;
    margin: 0 auto;
    height: 60px;
    line-height: 60px;
    color: #000;
    font-size: 18px;
  }
  .topbar a {
    text-decoration: none;
    color: #000;
    margin: 0 4px;
  }
  .topbar a:hover {
    color: #b47c2d;
  }
}
.top {
  height: 212px;
  width: 100%;
  background: url(../.././img/v2.png) no-repeat;
  background-size: cover;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
.item {
  width: 354px;
  height: 78px;
  background: url(../.././img/home/vp.png) no-repeat;
  background-size: contain;
  margin-top: 15px;
  float: left;
  margin-top: 65px;
  margin-left: 25px;
  cursor: pointer;
}
.item0 {
  background: url(../.././img/home/vt.png) no-repeat;
  background-size: contain;
  margin-left: 50px;
  margin-right: 50px;
}
.item1 {
  background: url(../.././img/home/vj.png) no-repeat;
  background-size: contain;
  margin-left: 0;
}
.title {
  width: 100%;
  margin: 60px auto 40px;
  p {
    font-size: 16px;
    line-height: 24px;
    width: 640px;
    margin: 20px auto 0;
    text-align: center;
  }
}
.title h3 {
  width: fit-content;
  text-align: center;
  margin: 0 auto;
  padding: 0 30px;
  font-weight: 400;
  color: #000;
  font-size: 26px;
  position: relative;
  vertical-align: middle;
  &:after {
    content: "";
    width: 58px;
    height: 18px;
    position: absolute;
    top: 50%;
    left: -50px;
    margin-top: -6px;
    background: url(../.././img/home/t_l.png) no-repeat;
    background-size: cover;
  }
  &:before {
    content: "";
    width: 58px;
    height: 18px;
    position: absolute;
    top: 50%;
    right: -50px;
    margin-top: -6px;
    background: url(../.././img/home/t_r.png) no-repeat;
    background-size: cover;
  }
}
.info {
  border: 1px solid #93aecc;
  margin-bottom: 30px;
  position: relative;
  padding: 41px 56px 41px 56px;
}
.info h3 {
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(147, 174, 204, 1);
  height: 34px;
  line-height: 34px;
  margin-top: -10px;
}
.info .info-main {
  margin-top: 20px;
}
.info-main /deep/ p {
  font-size: 18px;
  line-height: 24px;
}
.info h3 span {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  display: inline-block;
  margin-right: 10px;
  background: url(../.././img/v-t.png) no-repeat;
  background-size: contain;
  background-position: 0 0;
  margin-bottom: 5px;
}
.visit h3 span {
  background: url(../.././img/v-i.png) no-repeat;
  background-size: contain;
  background-position: 0 0;
}
.guide h3 span {
  background: url(../.././img/v-g.png) no-repeat;
  background-size: contain;
  background-position: 0 0;
}
.serivce h3 span {
  background: url(../.././img/v-s.png) no-repeat;
  background-size: contain;
  background-position: 0 0;
}
.zhan h3 span {
  background: url(../.././img/v-z.png) no-repeat;
  background-size: contain;
  background-position: 0 0;
}
.service,
.zhanai {
  width: 930px;
  height: 680px;
  margin: 0 auto;
}
.service .swiper-slide,
.zhanai .swiper-slide {
  width: 100%;
  height: 100%;
}
.swiper-container /deep/ .swiper-button-prev {
  background: url(../.././img/home/arrow_r.png) no-repeat;
  background-size: contain;
}
.swiper-container /deep/.swiper-button-next {
  background: url(../.././img/home/arrow_l.png) no-repeat;
  background-size: contain;
}
.swiper-container img {
  width: 930px;
  height: 680px;
  display: block;
  margin: 0 auto;
}
.swiper-pagination {
  width: 135px;
  height: 21px;
  line-height: 21px;
  background: rgba(147, 174, 204, 0.5);
  border-radius: 11px;
  display: flex;
  position: absolute;
  z-index: 1003;
  top: 72%;
  left: 50%;
  margin-left: -67.5px;
}
.swiper-pagination /deep/ .swiper-pagination-bullet {
  display: inline-block;
  flex: 1;
  height: 21px;
  line-height: 21px;
  text-align: center;
  cursor: pointer;
  border-radius: 11px;
  background: transparent;
  margin: 0;
  opacity: 1;
  color: #fff;
  font-size: 13px;
}
.swiper-pagination /deep/ .swiper-pagination-bullet-active {
  background: rgba(147, 174, 204, 1);
}
.traffic {
  overflow: hidden;
  height: 416px;
  margin-bottom: 75px;
}
.traffic-container {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  background: #e5e5e5;
  padding: 50px 70px;
  display: flex;
}
.tr-l {
  flex: 1;
  margin-right: 25px;
  h3 {
    font-size: 26px;
  }
}
.maps {
  border: 2px solid rgba(201, 201, 201, 1);
}
#mapCanvas {
  width: 524px;
  height: 310px;
}
.tr-info {
  margin-top: 30px;
  height: 254px;
  overflow-y: auto;
  padding-right: 25px;
  /deep/ p {
    color: #000;
    font-size: 16px;
    line-height: 24px;
  }
}
.dinner {
  border: 1px solid #93aecc;
  display: flex;
  padding: 38px 33px;
  margin-bottom: 75px;
}
.dinner img {
  width: 400px;
  height: 300px;
  display: block;
  margin-right: 26px;
}
.dinner h3 {
  font-size: 24px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  margin-bottom: 14px;
}
.dinner-main {
  padding-bottom: 60px;
  position: relative;
  flex: 1;
}
.dinner-main p,
.dinner-main /deep/ p {
  font-size: 20px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 30px;
}
.dinner-main span {
  position: absolute;
  bottom: 0px;
  right: 33px;
  cursor: pointer;
  flex: 1;
}
.around {
  border: 1px solid #93aecc;
  padding: 30px;
  height: 770px;
  margin-bottom: 40px;
}
#around {
  width: 1140px;
  height: 710px;
}
#around /deep/ .anchorBL,
#mapCanvas /deep/ .anchorBL {
  display: none;
}
.map {
  height: 100%;
  width: 100%;
  /deep/ .BMap_Marker img {
    width: 100%;
    height: 100%;
    display: block;
  }
  /deep/ .anchorBL {
    display: none;
  }
  /deep/ .BMapLabel {
    left: 25.75px !important;
    transform: translateX(-50%) !important;
    border: 0 none !important;
    background: #fff;
    padding: 4px 10px !important;
    border-radius: 15px;
  }
}
</style>