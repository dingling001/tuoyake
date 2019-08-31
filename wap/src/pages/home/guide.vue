<template>
  <div class="container">
    <div class="topbar">
      <router-link :to="{path:'/guide'}" class="active">{{$t('zhinan')}}</router-link>
      <router-link :to="{path:'/traff'}">{{$t('traff')}}</router-link>
      <!-- <router-link :to="{path:'/can'}">{{$t('can')}}</router-link> -->
      <router-link :to="{path:'/around'}" v-if="$t('news')">{{$t('around')}}</router-link>
    </div>
    <div class="yuyue" v-if="$t('news')">
      <router-link to="/pw/person/index" tag="div" class="pw">
        <i class="iconfont iconticket"></i>
        <h3>票务预约</h3>
        <p>个人票务</p>
      </router-link>
      <!-- 讲解预约 -->
      <div class="jj pw" @click="goExplain" v-if="$t('news')">
        <i class="iconfont iconziyuan"></i>
        <h3>讲解预约</h3>
        <p>个人讲解</p>
      </div>
    </div>
    <div class="main">
      <div class="openTime">
        <h3>
          <i class="iconfont iconshizhong"></i>
          {{$t('openT')}}
        </h3>
        <div class="item" v-html="open"></div>
      </div>
      <div class="openTime">
        <h3>
          <i class="iconfont iconzhinanzhen"></i>
          {{$t('visit')}}
        </h3>
        <div class="item" v-html="visit"></div>
      </div>
      <div class="openTime">
        <h3>
          <i class="iconfont iconzixun1"></i>
          {{$t('guide')}}
        </h3>
        <div class="item" v-html="guide"></div>
      </div>
      <div class="openTime serice-wrapper">
        <div class="info serivce">
          <h3>
            <i class="iconfont iconshuihu"></i>
            {{$t('service')}}
          </h3>
          <div class="swiper-container service">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in services" :key="index">
                <img :src="item.img" alt />
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
      <div class="openTime">
        <div class="info">
          <h3>
            <i class="iconfont iconwuzhangai"></i>
            {{$t('zhanai')}}
          </h3>
          <div class="swiper-container zhanai">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in zhanai" :key="index">
                <img :src="item.img" alt />
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  name: "guide",
  data() {
    return {
      open: "",
      visit: "",
      guide: "",
      services: [],
      zhanaiIndex: 0,
      zhanai: []
    };
  },
  methods: {
    getIntro() {
      this.$api.getVisit().then(res => {
        this.open = res.data.open;
        this.visit = res.data.visit;
        this.guide = res.data.guider;
        this.services = res.data.service;
        this.zhanai = res.data.service_wu;
        setTimeout(() => {
          this.initS();
        }, 500);
        setTimeout(() => {
          this.initA();
        }, 500);
      });
    },
    goExplain() {
      // this.$router.push("/explain");
      this.$router.push("/jiangjie");
    },
    goPw() {
      this.$router.push("/pw/person/index");
    },
    initS() {
      var _this = this;
      this.swiper = new Swiper(".service", {
        autoplay: 3000,
        direction: "horizontal",
        loop: true,
        //手动触发后继续播放
        autoplayDisableOnInteraction: false,
        pagination: ".swiper-pagination",
        paginationClickable: true,
        paginationBulletRender: function(swiper, index, className) {
          return '<span class="' + className + '">' + (index + 1) + "F</span>";
        }
      });
    },
    initA() {
      var _this = this;
      this.zhanSwiper = new Swiper(".zhanai", {
        autoplay: 3000,
        direction: "horizontal",
        loop: true,
        //手动触发后继续播放
        autoplayDisableOnInteraction: false,
        pagination: ".swiper-pagination",
        paginationClickable: true,
        paginationBulletRender: function(swiper, index, className) {
          return '<span class="' + className + '">' + (index + 1) + "F</span>";
        }
      });
    }
  },
  mounted() {
    this.getIntro();
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  background: #f5f5f5;
  height: 100%;
}
.topbar {
  height: 47px;
  line-height: 42px;
  font-size: 15px;
  text-align: center;
  background: #fff;
}
.topbar a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px 0;
  display: inline-block;
  text-align: center;
  width: 120px;
}
.topbar a:last-child {
  margin-right: 0;
}
.topbar a.active {
  position: relative;
  color: #000;
  z-index: 1;
  font-size: 18px;
  font-weight: 600;
}
.topbar a.active:after {
  content: "";
  width: 36px;
  height: 3px;
  background: #b47c2d;
  border-radius: 2px;
  z-index: -1;
  position: absolute;
  border-radius: 1.5px;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
}
.yuyue {
  padding: 12px;
  /*px*/
  display: flex;
  .pw {
    border-radius: 5px;
    flex: 1;
    background: #d2efff;
    position: relative;
    padding: 20px 15px;
    .iconticket,
    .iconziyuan {
      font-size: 35px;
      position: absolute;
      top: 15px;
      right: 20px;
      color: #47c0ff;
    }
    .iconziyuan {
      color: #f6b35e;
    }
    h3 {
      font-size: 18px;
      color: #000;
      font-weight: 500;
    }
    p {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
      margin-top: 14px;
      /*px*/
    }
  }
  .jj {
    margin-left: 15px;
    /*px*/
    background: #fff4d3;
  }
}
.main {
  margin: 0 12px 0px;
}
.openTime {
  padding: 22px 15px;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 12px;
  .item {
    margin-bottom: 0;
  }
  i {
    font-weight: 600;
  }
}
.main h3 {
  font-weight: 600;
  font-size: 15px;
  /*px*/
  color: #000;
}
.main h3 i {
  font-size: 18px;
  vertical-align: middle;
  margin-top: -2px;
  display: inline-block;
  margin-right: 2px;
  color: #000;
  font-weight: 500;
  &.iconwuzhangai {
    font-size: 18px;
  }
  &.iconzhinanzhen {
    font-size: 20px;
  }
}
.item {
  margin: 10px 0 22.5px;
  font-size: 14px;
}
.item /deep/ p {
  font-size: 14px;
  line-height: 20px;
  color: #000;
}
.item /deep/ span {
  font-size: 14px !important;
  line-height: 20px;
  color: #000;
}
.service,
.zhanai {
  width: 100%;
  height: 9rem;
  margin: 0px auto;
}
.service img,
.zhanai img {
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
.swiper-pagination {
  width: 135px !important;
  height: 21px;
  line-height: 21px;
  background: rgba(147, 174, 204, 0.5);
  border-radius: 11px;
  display: flex;
  position: absolute;
  z-index: 1003;
  bottom: 0px !important;
  left: 50% !important;
  margin-left: -67.5px !important;
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
</style>
