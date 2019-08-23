<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">{{$t('navs[0].name')}}</a>
        »
        <a href="javaScript:;">{{$t('navs[3].name')}}</a>
      </div>
    </div>

    <div class="container">
      <!-- 第一版块 -->

      <div class="swiper-container banner">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item,index) in banners"
            :key="index"
            @click="goEx(item.exhibition_id)"
          >
            <img :src="item.exhibition_img" alt />
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
      <!-- 最新展览 -->
      <div class="new-wrapper" v-if="exhibitionList.length>0&&$t('news')">
        <div class="titles">
          <h3>{{$t('exb')}}</h3>
        </div>
        <ul class="ex">
          <li @click="goEx(exhibitionList[0].exhibition_id)">
            <img :src="exhibitionList[0].exhibition_img" />
            <div class="slide-item">
              <h4>{{exhibitionList[0].exhibition_name}}</h4>
              <p>{{$t('etime')}}：{{exhibitionList[0].end_date}}</p>
              <p>{{$t('eaddress')}}：{{exhibitionList[0].exhibition_address}}</p>
            </div>
          </li>
        </ul>
        <div class="btn cex-btn" @click="goNxblist">
          {{$t('more')}}
          <i class="iconfont iconiconfontjiantou"></i>
        </div>
      </div>
      <div class="common-wrapper" v-if="cExhibitionList.length>0">
        <!-- 常设展览 -->
        <div class="titles">
          <h3>{{$t('cexb')}}</h3>
        </div>
        <ul>
          <li
            v-for="(item,index) in cExhibitionList"
            :key="index"
            @click="goEx(item.exhibition_id)"
          >
            <img :src="item.exhibition_img" v-if="index<=3" alt />
            <div class="slide-item" v-if="index<=3">
              <h4>{{item.exhibition_name}}</h4>
              <!-- <p>{{$t('etime')}}：{{item.end_date}}</p> -->
              <p>{{$t('eaddress')}}：{{item.exhibition_address}}</p>
            </div>
          </li>
        </ul>
        <div class="btn" @click="goClist">
          {{$t('more')}}
          <i class="iconfont iconiconfontjiantou"></i>
        </div>
      </div>
      <!-- 网上展览 -->
      <div class="online-wrapper" v-if="online.length>0">
        <div class="titles">
          <h3>{{$t('oexb')}}</h3>
        </div>
        <div class="online">
          <div class="left">
            <img :src="imgUrl" />
          </div>
          <div class="swiper-container active-banner">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in online" :key="index">
                <img :src="item.exhibition_img" alt />
                <div class="slide-item">
                  <h4>{{item.exhibition_name}}</h4>
                  <p>{{$t('titles')}}</p>
                  <div class="btn" @click.self="goOnline(item.full_url)">{{$t('detail')}}</div>
                </div>
              </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
          <div class="right">
            <img :src="imgUrl" alt />
          </div>
        </div>
        <div class="btn" @click="goOnlineList">
          {{$t('more')}}
          <i class="iconfont iconiconfontjiantou"></i>
        </div>
      </div>
      <!-- 展览回顾 -->
      <div class="common-wrapper" v-if="temporary_expire.length>0&&$t('news')">
        <div class="titles">
          <h3>{{$t('vexb')}}</h3>
        </div>
        <ul>
          <li
            v-for="(item,index) in temporary_expire"
            :key="index"
            @click="goEx(item.exhibition_id)"
          >
            <img :src="item.exhibition_img" v-if="index<=3" alt />
            <div class="slide-item" v-if="index<=3">
              <h4>{{item.exhibition_name}}</h4>
              <p>展览时间：{{item.end_date}}</p>
              <p>展览地点：{{item.exhibition_address}}</p>
            </div>
          </li>
        </ul>
        <div class="btn" @click="goExblist">
          查看更多
          <i class="iconfont iconiconfontjiantou"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  name: "home",
  data() {
    return {
      userVip: 0,
      banners: [],
      zS: [],
      exhibitionList: [],
      cExhibitionList: [],
      temporary_expire: [],
      online: [],
      tel: "",
      take: 12,
      skip: 0,
      imgUrl: ""
    };
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
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  filters: {
    time: function(data) {
      var date = new Date(data);
      var month = date.getMonth() + 1;
      var day = date.getDay();
      return month + "-" + day;
    },
    getYMD: function(date) {
      var year = date.substring(0, 4);
      var month = date.substring(4, 7);
      var day = date.substring(8, 10);
      return year + "年" + month + "月" + day + "日";
    }
  },
  mounted() {
    this.initSwiper();
    this.getEx();
    setTimeout(() => {
      this.getOnline();
    }, 1500);
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
      }
    }, 500);
  },
  methods: {
    // 底部切换
    tab_footer(index) {
      let jump = document.querySelectorAll(".titles");
      let total = jump[index].offsetTop - 100;
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
    // 跳转媒体报道
    go() {
      this.$router.push("/exb");
    },
    goOnline(url) {
      if (url) {
        window.location.href = url;
      }
    },
    goClist() {
      this.$router.push("/cexbL");
      window.scroll(0, 0);
    },
    goOnlineList() {
      this.$router.push("/oexbL");
      window.scroll(0, 0);
    },
    // 最新展览
    goNxblist() {
      this.$router.push("/exbL");
    },
    // 展览回顾列表
    goExblist() {
      this.$router.push("/vexbL");
    },
    // 跳转展厅详情页
    goEx(id) {
      this.$router.push({ path: "/eDetail", query: { id: id } });
    },
    initSwiper() {
      this.$api.getEBanner().then(res => {
        this.banners = res.data;
        if (this.banners.length > 5) {
          this.banners = this.banners.splice(0, 5);
        }
        if (this.banners.length > 1) {
          setTimeout(() => {
            let swiper = new Swiper(".banner", {
              autoplay: 3000,
              direction: "horizontal",
              loop: true,
              effect: "fade",
              //手动触发后继续播放
              autoplayDisableOnInteraction: false,
              // 如果需要分页器
              pagination: ".swiper-pagination",
              paginationElement: "span",
              paginationClickable: true
            });
          }, 800);
        }
      });
    },
    getEx() {
      this.$api.getEx().then(res => {
        this.exhibitionList = res.data.temporary_new;
        this.cExhibitionList = res.data.theme;
        this.temporary_expire = res.data.temporary_expire;
        if (this.exhibitionList.length > 5) {
          this.exhibitionList = this.exhibitionList.splice(0, 5);
        }
        if (this.exhibitionList > 1) {
          setTimeout(() => {
            let swiper = new Swiper(".ex-banner", {
              autoplay: 3000,
              direction: "horizontal",
              loop: true,
              effect: "fade",
              //手动触发后继续播放
              autoplayDisableOnInteraction: false,
              // 如果需要分页器
              pagination: ".swiper-pagination",
              paginationElement: "span",
              paginationClickable: true
            });
          }, 800);
        }
      });
    },
    //网上展厅
    getOnline() {
      let _this = this;
      this.$api.getOnline().then(res => {
        this.online = res.data;
        if (res.data.length > 0) {
          this.imgUrl = res.data[0].exhibition_img;
        }
        if (this.online.length > 5) {
          this.online = this.online.splice(0, 5);
        }
        if (this.online.length > 1) {
          setTimeout(() => {
            let swiper = new Swiper(".active-banner", {
              autoplay: 3000,
              direction: "horizontal",
              loop: true,
              effect: "fade",
              //手动触发后继续播放
              autoplayDisableOnInteraction: false,
              // 如果需要分页器
              prevButton: ".swiper-button-prev",
              nextButton: ".swiper-button-next",
              paginationClickable: true,
              onSlideChangeStart: function(swiper) {
                _this.imgUrl = _this.online[swiper.realIndex].exhibition_img;
              }
            });
          }, 800);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
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
div.container {
  position: relative;
  z-index: 3;
}
.banner {
  width: 100%;
  height: 782px;
  margin-bottom: 70px;
  cursor: pointer;
  .swiper-pagination /deep/ .swiper-pagination-bullet {
    width: 30px;
    height: 4px;
    background: #ccc;
    border-radius: initial;
    border-radius: 2px;
  }
}

.swiper-container img {
  width: 100%;
  height: 100%;
}
.swiper-pagination {
  width: 100%;
  margin-top: -30px;
}
//最新展览
.new-wrapper {
  width: 1200px;
  margin: 0 auto;
  .ex li {
    width: 100%;
    margin-bottom: 40px;
    overflow: hidden;
    transition: all 500ms ease-in-out;
    img {
      transition: all 500ms ease-in-out;
    }
    .slide-item {
      padding: 20px 30px;
      background: #fff;
      margin-top: -4px;
      cursor: pointer;
    }
    &:hover {
      box-shadow: 0px 7px 14px 2px rgba(95, 61, 13, 0.14);
      img {
        transform: scale(1.05);
      }
    }
  }
}
// 常设展览
.common-wrapper {
  width: 1200px;
  margin: 0 auto;
  ul {
    overflow: hidden;
    li {
      float: left;
      width: 588px;
      margin-bottom: 23px;
      cursor: pointer;
      overflow: hidden;
      &:hover {
        box-shadow: 0px 7px 14px 2px rgba(95, 61, 13, 0.14);
        img {
          transform: scale(1.02);
        }
      }
      &:nth-child(odd) {
        margin-right: 23px;
      }
      img {
        width: 100%;
        height: 351px;
        display: block;
        transition: all 300ms ease-in-out;
      }
      .slide-item {
        padding: 20px 30px;
        background: #fff;
        margin-top: -4px;
      }
      .slide-item h4 {
        margin: 10px 0;
        font-size: 20px;
      }
      .slide-item p {
        margin-bottom: 10px;
        font-size: 16px;
      }
    }
  }
}

.online {
  width: 100%;
  height: 604px;
  position: relative;
  margin-bottom: 54px;
  .left {
    position: absolute;
    top: 0;
    left: 0;
    width: 320px;
    height: 604px;
    overflow: hidden;
    box-shadow: 0px 7px 14px 2px rgba(95, 61, 13, 0.14);
    z-index: 10;
    img {
      height: 100%;
    }
  }
  .right {
    position: absolute;
    top: 0;
    right: 0;
    width: 320px;
    height: 604px;
    overflow: hidden;
    box-shadow: 0px 7px 14px 2px rgba(95, 61, 13, 0.14);
    z-index: 10;
    img {
      position: absolute;
      top: 0;
      right: 0;
      height: 604px;
    }
  }
  .active-banner {
    width: 1200px;
    height: 604px;
    box-shadow: 0px 7px 14px 2px rgba(95, 61, 13, 0.14);
    position: relative;
    z-index: 15;
    .swiper-slide {
      width: 1200px;
      height: 604px;
      overflow: hidden;
    }
    /deep/ .swiper-button-prev {
      background-image: url(../.././img/larrow.png);
      z-index: 1000;
      width: 40px;
      height: 40px;
      left: -8px;
      z-index: 1000;
    }
    /deep/ .swiper-button-next {
      background-image: url(../.././img/rarrow.png);
      z-index: 1000;
      width: 40px;
      height: 40px;
      right: -8px;
    }
    .slide-item {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
      color: #fff;
      width: 100%;
      height: 100%;
      background: transparent;
      text-align: center;
      padding: 0;
      bottom: auto;
    }
    img {
      height: 100%px;
      width: 100%;
    }
    .btn {
      height: 43px;
      width: 158px;
      margin: 0 auto;
      color: #d5a501;
      font-size: 16px;
      cursor: pointer;
      background: rgba(180, 124, 45, 0);
      border: 2px solid rgba(180, 124, 45, 1);
      border-radius: 2px;
      line-height: 43px;
    }
    p {
      font-size: 24px;
      margin-bottom: 100px;
    }
    h4 {
      height: 146px;
      font-size: 48px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: #ffc600;
      padding-top: 100px;
      margin-bottom: 30px;
    }
  }
}

.titles {
  width: 100%;
  margin: 0px auto 40px;
}
.titles h3 {
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

.common-ex li:hover,
.rcex li:hover {
  box-shadow: 0px 7px 14px 2px rgba(95, 61, 13, 0.14);
}

.active-banner .swiper-pagination /deep/ .swiper-pagination-bullet:focus,
.ex-banner .swiper-pagination /deep/ .swiper-pagination-bullet:active,
.swiper-pagination /deep/ .swiper-pagination-bullet:focus {
  outline: 0 none;
}

.active-banner /deep/ .swiper-pagination-bullet,
.ex-banner /deep/ .swiper-pagination-bullet-active {
  background: #fff !important;
}

.slide-item h4 {
  margin: 10px 0;
  font-size: 20px;
}
.slide-item p {
  margin-bottom: 10px;
  font-size: 16px;
}

.cex li img {
  width: 100%;
  height: 255px;
  cursor: pointer;
}

.btn {
  width: 132px;
  margin: 0 auto 70px;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 18px;
  background: #9c6922;
  border-radius: 20px;
}
</style>