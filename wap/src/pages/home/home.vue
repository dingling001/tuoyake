<template>
  <div class="container">
    <!-- 顶部轮播效果实现 -->
    <div class="banner-wrapper">
      <div class="input-wrapper" @click.stop="goSearch">
        <span class="iconfont iconsearch"></span>
        <input type="text" placeholder="搜索您想搜索的" />
      </div>
      <div class="swiper-container banner">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item,index) in banners"
            :key="index"
            @click="goLink(item.url)"
          >
            <img :src="item.img" alt />
            <!-- <img :src="$toThumbsimg(item.img,750,840,33,$web)" alt /> -->
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </div>

    <div class="full" v-if="$t('news')==''">
      <div class="full-img" @click="goAll">
        <img src="../../img/home/full.png" alt />
        <span class="full-title">{{$t('fullScreen')}}</span>
      </div>
    </div>
    <!-- 海博公告 -->
    <div class="ad" v-if="$t('news')">
      <ul class="ad-swiper">
        <div class="ad-container swiper-container">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item,index) in ad"
              :key="index"
              @click="goAd(item.article_id)"
            >{{item.title}}</div>
          </div>
        </div>
      </ul>
    </div>
    <!-- 个人预约 -->
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

    <!-- 新闻 -->
    <div class="news">
      <h3 v-if="$t('news')">
        {{$t('news')}}
        <span @click="goList(0)" class="icon">
          {{$t('more')}}
          <i class="iconfont iconfanhui1"></i>
        </span>
      </h3>
      <ul v-if="$t('news')">
        <li v-for="(item,index) in news" :key="index" @click="goAd(item.article_id)">
          <img :src="$toThumbsimg(item.img,292,176,33,$web)" alt />
          <div class="news-items">
            <h3>{{item.title.length>16?item.title.substring(0,16)+'...':item.title}}</h3>
            <p>{{item.created_at}}</p>
          </div>
        </li>
      </ul>
      <h3>{{$t('visit')}}</h3>
      <div class="info">
        <h3>
          <span class="iconfont iconshijian"></span>
          {{$t('openT')}}：
        </h3>
        <div v-html="openTime" class="openTime"></div>
        <h3 v-if="tel!=''">
          <span class="iconfont icondianhua-1"></span>
          {{$t('visitT')}}：
        </h3>
        <div v-html="tel" v-if="tel!=''" class="visits"></div>
      </div>
    </div>
    <div class="vip" v-if="$t('news')">
      <div class="top">
        <div class="img-wrapper" @click="goAll">
          <img src="../.././img/home/360h.png" alt /> 海博全景
        </div>
      </div>
      <div class="vip-wrapper">
        <div class="item item1" @click="goVip">
          <div class="img-wrapper">
            <img src="../.././img/home/vip.png" alt />
          </div>
          <p>{{member_status==2?'我的会员':'成为会员'}}</p>
        </div>
        <div class="item item2" @click="toVolunteer()">
          <div class="img-wrapper">
            <img src="../.././img/home/v.png" alt />
          </div>
          <p>{{volText}}</p>
        </div>
      </div>
    </div>
    <div class="ex exb" v-if="exhibitionList.length>0&&$t('news')">
      <h3 class="zhan-title">最新展览</h3>
      <div class="ex-container">
        <div class="swiper-container ex-banner">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item,index) in exhibitionList"
              :key="index"
              @click="goEx(item.exhibition_id)"
            >
              <div class="img">
                <img :src="$toThumbsimg(item.exhibition_img,375,170,33,$web)" v-if="index<=4" alt />
              </div>

              <div class="slide-item" v-if="index<=4">
                <h4>{{item.exhibition_name}}</h4>
                <p>展览时间：{{item.end_date}}</p>
                <p>展览地点：{{item.exhibition_address}}</p>
              </div>
            </div>
          </div>
          <!--  如果需要分页器 -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <div class="ex exc exb-common" :class="{'mt40':$t('news')==''}" v-if="cExhibitionList.length>0">
      <h3>
        {{$t('cexb')}}
        <span @click="goc">
          {{$t('more')}}
          <i class="iconfont iconfanhui1"></i>
        </span>
      </h3>
      <div class="ex-c" v-if="cExhibitionList[0]">
        <div class="img" @click="goEx(cExhibitionList[0].exhibition_id)">
          <img :src="$toThumbsimg(cExhibitionList[0].exhibition_img,702,339,33,$web)" alt />
          <div class="des">{{cExhibitionList[0].exhibition_name}}</div>
        </div>
      </div>
      <div class="ex-wrapper exs">
        <div class="item" v-if="cExhibitionList[1]" @click="goEx(cExhibitionList[1].exhibition_id)">
          <div class="img">
            <img :src="$toThumbsimg(cExhibitionList[1].exhibition_img,342,209,33,$web)" alt />
          </div>

          <div class="des">{{cExhibitionList[1].exhibition_name}}</div>
        </div>
        <div class="item" v-if="cExhibitionList[2]" @click="goEx(cExhibitionList[2].exhibition_id)">
          <div class="img">
            <img :src="$toThumbsimg(cExhibitionList[2].exhibition_img,342,209,33,$web)" alt />
          </div>
          <div class="des">{{cExhibitionList[2].exhibition_name}}</div>
        </div>
      </div>
    </div>
    <!-- 最新活动 -->
    <div class="ex active-wrapper" v-if="activeL.length>0&&$t('news')">
      <h3>
        最新活动
        <span @click="goActive">
          {{$t('more')}}
          <i class="iconfont iconfanhui1"></i>
        </span>
      </h3>
      <div class="ex-c" v-if="activeL.length>0">
        <div class="swiper-container active-banner">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item,index) in activeL"
              :key="index"
              @click="goD(item.active_id)"
            >
              <img :src="$toThumbsimg(item.active_img,702,377,33,$active)" alt />
              <div class="slide-item">
                <h4>{{item.active_name}}</h4>
                <p>活动时间：{{item.active_start_date|getYMD}}--{{item.active_end_date|getYMD}}</p>
                <p>{{item.content.length>80?item.content.substring(0,80)+'...':item.content}}</p>
              </div>
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <div class="ex" v-if="eList.length>0">
      <h3>
        {{$t('jb')}}
        <span @click="goElist">
          {{$t('more')}}
          <i class="iconfont iconfanhui1"></i>
        </span>
      </h3>
      <div class="ec">
        <div
          class="item"
          v-for="(item,index) in eList"
          :key="index"
          @click="goEDetail(item.exhibit_id)"
        >
          <img :src="$toThumbsimg(item.exhibit_list_img,220,220,33,$web)" alt />
          <div class="des">
            {{item.exhibit_name}}
            <br />
            <small>{{item.exhibition_name}}</small>
          </div>
        </div>
      </div>
    </div>
    <div class="advice last" v-if="$t('news')">
      <div class="advice-content">
        <div class="item" @click="goWen">
          <img src="../.././img/home/w.png" alt />
          <h3>海博文创</h3>
          <p>手工 · 纪念品 · 陶瓷</p>
        </div>
        <div class="item" @click="goAround">
          <img src="../.././img/home/z.png" alt />
          <h3>海博周边</h3>
          <p>景点 · 餐饮 · 酒店 · 服务</p>
        </div>
      </div>
    </div>
    <div class="advice">
      <h3 class="title">意见反馈</h3>
      <div class="advice-content">
        <div class="item" @click="goAdvice">
          <img src="../.././img/home/advice.png" alt />
          <h3>意见反馈</h3>
          <p>
            您的意见有助于我们更好
            的提升官网体验，感谢您
            的支持！
          </p>
        </div>
        <div class="item" @click="goQuestion">
          <img src="../.././img/home/question.png" alt />
          <h3>问卷调查</h3>
          <p>
            请回答几个简单的小问题，
            让我们能够为您更好的服
            务体验吧～
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import { Toast } from "mint-ui";
export default {
  name: "home",
  data() {
    return {
      banners: [],
      width: "",
      top: 0,
      ad: [],
      news: [],
      medias: [],
      zS: [],
      openTime: "",
      tel: "",
      cExhibitionList: [],
      exhibitionList: [],
      activeL: [],
      eList: [],
      member_status: 0,
      scrollTop: 0,
      volText: "加入志愿者" //志愿者文案
    };
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
  computed: {
    new: function() {
      return this.$t("news");
    }
  },
  watch: {
    new(val) {
      if (localStorage.app_token) {
        this.getUser();
      }
      this.getIndex();
      var that = this;
      setTimeout(function() {
        that.getActivity();
      }, 2000);
    }
  },
  methods: {
    goSearch() {
      this.$router.push("/search");
    },
    //360 全景地址
    goAll() {
      window.location.href = "https://www.hymuseum.org.cn/uploadfiles/360html/";
    },
    toVolunteer() {
      this.$router.push("/volunteer/wxvolloading");
    },
    goAdvice() {
      this.$router.push("/advice");
    },
    goQuestion() {
      this.$router.push("/question");
    },
    // 跳转媒体列表
    goList(curs) {
      this.$router.push({ path: "/introL", query: { curs: curs } });
    },
    goVip() {
      // if (this.member_status == 0) {
      //   this.$router.push("/vip");
      // }
      // if (this.member_status == 1 || this.member_status == 3) {
      //   this.$router.push("/vipC");
      // }
      // if (this.member_status == 2) {
      //   this.$router.push("/vipS");
      // }
      this.$router.push("/huiyuan");
    },
    goElist() {
      this.$router.push("/collection");
    },
    goN() {
      this.$router.push("/exbL");
    },
    goLink(url) {
      if (url) {
        window.location.href = url;
      }
    },
    //获取活动
    getActivity() {
      this.$api.activeList().then(res => {
        this.activeL = res.data.new;
        if (this.activeL.length > 5) {
          this.activeL = this.activeL.splice(0, 5);
        }
        if (this.activeL.length > 1) {
          setTimeout(() => {
            var swiper = new Swiper(".active-banner", {
              loop: true,
              autoplay: 3000,
              effect: "fade",
              autoplayDisableOnInteraction: false,
              paginationClickable: true,
              // 如果需要分页器
              pagination: ".swiper-pagination",
              paginationElement: "span"
            });
          }, 800);
        }
      });
    },
    getUser() {
      const v = this;
      v.$api.getUser().then(function(res) {
        v.member_status = res.data.member_status;
        if (res.data.is_vol == 1) {
          v.$api.volInfo().then(res => {
            if (res.data.grade_status == 6 || res.data.grade_status == 5) {
              v.volText = "志愿者活动";
            } else {
              v.volText = "加入志愿者";
            }
          });
        } else {
          v.volText = "加入志愿者";
        }
      });
    },
    // 跳转讲解预约
    goExplain() {
      //this.$router.push("/explain");
      this.$router.push("/jiangjie");
    },
    goWen() {
      this.$router.push("/wen");
    },
    goAround() {
      this.$router.push("/around");
    },
    goAd(id) {
      this.$router.push({ path: "/adetail", query: { id: id } });
    },
    getIndex() {
      var that = this;
      this.$api.getIndex().then(function(res) {
        that.banners = res.data.lun;
        that.ad = res.data.gong;
        setTimeout(() => {
          var swiper = new Swiper(".ad-container", {
            direction: "vertical",
            loop: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false
          });
        }, 500);

        that.news = res.data.tui.splice(0, 2);
        that.zS = res.data.zi;
        that.medias = res.data.mei;
        that.openTime = res.data.visit.open;
        that.tel = res.data.visit.tel;
        that.eList = res.data.exhibit;
        that.exhibitionList = res.data.exhibition.temporary_new.splice(0, 5);
        that.cExhibitionList = res.data.exhibition.theme;
        if (that.banners.length > 1) {
          setTimeout(function() {
            var swiper = new Swiper(".banner", {
              loop: true,
              effect: "fade",
              autoplay: 2500,
              autoplayDisableOnInteraction: false,
              // 如果需要分页器
              pagination: ".swiper-pagination",
              paginationElement: "span",
              paginationClickable: true
            });
          }, 800);
          if (that.exhibitionList.length > 1) {
            setTimeout(function() {
              var swiper = new Swiper(".ex-banner", {
                loop: true,
                autoplay: 3000,
                effect: "fade",
                autoplayDisableOnInteraction: false,
                // 如果需要分页器
                pagination: ".swiper-pagination",
                paginationElement: "span",
                paginationClickable: true
              });
            }, 800);
          }
        }
      });
    },
    goEx(id) {
      this.$router.push({
        path: "/eDetail",
        query: { id: id }
      });
    },
    //跳转活动详情
    goD(id) {
      this.$router.push({
        path: "/active/activedetail",
        query: { active_id: id }
      });
    },
    // 跳转活动列表
    goActive() {
      this.$router.push("/active/activeList");
    },
    goc() {
      this.$router.push("/cexbL");
    }, // 获取精选展品列表
    goEDetail(id) {
      this.$router.push({ path: "/cDetail", query: { id: id } });
    }
  },
  mounted() {
    if (localStorage.app_token) {
      this.getUser();
    }
    this.getIndex();
    var that = this;
    setTimeout(function() {
      that.getActivity();
    }, 2000);
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  font-size: 32px;
}
img {
  background: #e5e5e5;
}
.banner-wrapper {
  padding: 10px 12px 0 12px;
  border-radius: 4px;
  overflow: hidden;
  /*px*/
  position: relative;
  .input-wrapper {
    width: 311px;
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    top: 20px;
    /*px*/
    left: 50%;
    transform: translateX(-50%);
    z-index: 900;
    display: flex;
    padding: 15px;
    padding-left: 30px;
    span {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
    }
    /*px*/
    input {
      flex: 1;
      border: 0 none;
      outline: 0 none;
      margin-left: 5px;
      /*px*/
      font-size: 15px;
      /*px*/
      background: transparent;
      margin-top: -1px;
      &:focus {
        border-color: transparent;
        outline: 0 none;
      }
    }
  }
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.banner {
  width: 100%;
  height: 420px;
  overflow: hidden;
}

.swiper-slide img {
  width: 100%;
  height: auto;
  display: block;
  border: 0 none;
  outline: 0 none;
  border-radius: 4px;
}
.full {
  height: 42.5px;
  margin: 15px 0;
}
.full-img {
  width: 90%;
  height: auto;
  border-radius: 21.75px;
  position: relative;
  margin: 0 auto;
}
.full-img img {
  width: 100%;
  height: auto;
  display: block;
  background: #fff;
}
.full-title {
  font-size: 18px;
  line-height: 24px;
  position: absolute;
  top: 50%;
  left: 20px;
  color: #a9752b;
  transform: translateY(-50%);
}
.swiper-container /deep/ .swiper-pagination-bullet {
  background: #b47c2d;
}

.swiper-container /deep/ .swiper-pagination-bullet-active {
  background: #b47c2d;
  width: 20px !important;
  border-radius: 5px;
}

.ad {
  height: 50px;
  line-height: 50px;
  border-radius: 2px;
  font-size: 13px;
  color: #000;
  display: flex;
  margin: 15px 12px 15px;
  border-radius: 4px;
  position: relative;
  box-shadow: 0px 1px 5px 1px rgba(82, 81, 81, 0.1);
}

.title {
  width: 40px;
  line-height: 20px;
  margin-top: 5px;
  margin-right: 30px;
  margin-left: 10px;
  position: relative;
}

.title i {
  width: 42px;
  height: 42px;
  position: absolute;
  top: 10px;
  font-size: 30px;
  right: -40px;
}
.ad-swiper {
  flex: 1;
  color: #000;
  height: 30px;
  margin: 10px 0 0 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}

.ad-swiper .swiper-slide {
  line-height: 30px;
  position: relative;
  width: 100%;
  white-space: nowrap;
  display: list-item;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  margin-left: 5px;
  padding-left: 15px;
}
.yuyue {
  padding: 0 12px;
  margin-bottom: 30px;
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
/* 海博新闻 */
.news {
  padding: 0 12px;

  h3 {
    font-size: 21px;
    margin: 0 0 12px 0;
    position: relative;
    span.icon {
      position: absolute;
      font-size: 13px;
      bottom: 0.053333rem;
      right: -0.16rem;
      color: #b47c2d;
      cursor: pointer;
      i {
        font-size: 13px;
        margin-right: 5px;
      }
    }
  }
  ul {
    margin-bottom: 21px;
    /*px*/
    li {
      display: flex;
      padding-bottom: 9px;
      margin-bottom: 9px;
      border-bottom: 1px solid #f5f5f5;
      cursor: pointer;
      &:last-child {
        border: 0 none;
      }
      img {
        width: 146px;
        height: 88px;
        border-radius: 5px;
      }
      .news-items {
        flex: 1;
        margin-left: 10px;
        h3 {
          font-weight: 500;
          line-height: 24px;
          /*px*/
          font-size: 15px;
          /*px*/
          color: rgba(0, 0, 0, 0.9);
          min-height: 48px;
          /*px*/
          text-align: justify;
        }
        p {
          font-size: 12px;
          /*px*/
          color: rgba(0, 0, 0, 0.6);
          margin-top: 28px;
        }
      }
    }
  }
}
/* 开放时间 */
.openTime {
  margin-bottom: 14px;
}
.visits {
  margin-top: 8px;
  /deep/ p {
    margin-bottom: 4px !important;
  }
  /deep/ p:last-child {
    margin-bottom: 0;
  }
}
.openTime /deep/ p {
  font-size: 14px;
  line-height: 20px;
  color: #585858;
}
.openTime /deep/ span {
  font-size: 14px !important;
  color: #585858 !important;
  line-height: 20px !important;
}
.gonggao {
  position: absolute;
  top: 39%;
  right: -20px;
  width: 22px;
  height: 22px;
  margin-top: -11px;
  background: url(../.././img/home/ad.png) no-repeat;
  background-size: cover;
}
.ad-swiper li {
  height: 50px;
}
.ad-swiper .swiper-slide:hover {
  color: #ab752c;
}

.ad-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 80%;
}
.exb,
.exb-common {
  min-height: 290px;
}

.ex-banner .slide-item {
  padding: 14px 14px 12px 0;
  /*px*/
  background: #fff;
  box-shadow: 0px 7px 14px 2px rgba(95, 61, 13, 0.14);
}

.ex-banner .swiper-slide .img {
  height: 170px;
  /*px*/
  width: 100%;
  display: block;
  border-radius: 8px;
  /*px*/
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    display: block;
    background: transparent;
  }
}

.slide-item {
  position: relative;
}

.slide-item .btns {
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 30px;
}

.slide-item h4 {
  margin: 0 0 10px;
  font-size: 14px;
}

.slide-item p {
  margin-bottom: 10px;
  font-size: 12px;
}
.slide-item p:last-child {
  margin-bottom: 0;
}
.ex-banner /deep/ .swiper-pagination-bullets {
  bottom: 90px;
}

h3.item span {
  float: right;
  color: #6b6b6b;
}

.info {
  padding: 20px 15px;
  box-shadow: 0px 0px 3.5px 0px rgba(160, 160, 160, 0.3);
  border-radius: 5px;
  h3 {
    font-size: 15px;
    color: #1f1f1f;
    font-weight: 600;
    margin-bottom: 4px;
  }
}
h3.info-title {
  position: relative;
  padding-left: 20px;
  margin-top: 24px;
}
.xuzhi {
  display: inline-block;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 50%;
  left: 0px;
  margin-top: -7.5px;
  background: url(../.././img/home/info.png) no-repeat;
  background-size: cover;
}
.zhan-title {
  position: relative;
  color: #1f1f1f;
  font-weight: 600;
  font-size: 21px;
  margin: 0 0 12px 0;
}

.info /deep/ p {
  font-size: 14px;
  color: #585858;
  padding: 0;
  margin-bottom: 10px;
}
/* vip会员 */
.vip {
  margin: 20px 12px 30px;
  box-shadow: 0 0 6px #ccc;
  border-radius: 5px;
  height: 148px;
  .top {
    width: 100%;
    height: 74px;
    text-align: center;
    position: relative;
    &:after {
      content: "";
      width: 94%;
      height: 1px;
      /*px*/
      background: #e5e5e5;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    /* px */
    .img-wrapper {
      display: block;
      font-size: 15px;
      /* px */
      font-weight: 600;
      white-space: nowrap;
      position: absolute;
      top: 50%;
      left: 55%;
      transform: translate(-50%, -50%);
      height: 74px;
      line-height: 74px;
      padding-left: 50px;
      width: 180px;
      img {
        display: inline-block;
        vertical-align: middle;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
    }
  }
}
.vip-wrapper {
  height: 74px;
  display: flex;
  background: #fff;
  color: #1e1e1e;
  font-size: 13px;
  cursor: pointer;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.vip .item {
  flex: 1;
  text-align: center;
  cursor: pointer;
}
.vip .item .img-wrapper {
  height: 32px;
  display: block;
  overflow: hidden;
  margin: 12px auto 2px;
}
.vip .img-wrapper img {
  width: auto;
  display: block;
  margin: 0 auto;
  background: #fff;
  height: 26px;
}
.vip .item1 {
  position: relative;
}

.vip .item1:before {
  content: "";
  height: 46%;
  width: 1px;
  background: #e5e5e5;
  opacity: 0.8;
  position: absolute;
  top: 32%;
  right: 0;
}
.vip p {
  margin: 0;
  font-size: 15px;
  /*px*/
  font-weight: 600;
}

.active-banner {
  height: 188.5px;
  /*px*/
  .swiper-slide {
    border-radius: 5px;
    /*px*/
    overflow: hidden;
  }
  .slide-item {
    position: absolute;
    color: #fff;
    padding: 0 10px 20px;
    bottom: 0px;
    width: 100%;
    z-index: 3;
    background: linear-gradient(top, transparent, rgba(0, 0, 0, 0.5));
  }
}

.ex {
  margin: 30px 12px 0;
}
.mt40 {
  margin-bottom: 20px;
}
.active-wrapper {
  margin: 24px 12px;
}
.ex h3 {
  font-size: 21px;
  color: #1f1f1f;
  /*overflow: hidden;*/
  font-size: 21px;
  margin: 0 0 12px 0;
  position: relative;
}

.ex h3 i {
  font-size: 13px;
  margin-right: 5px;
}

.ex h3 span {
  position: absolute;
  bottom: 2px;
  right: -6px;
  font-size: 13px;
  /*px*/
  color: #b47c2d;
  cursor: pointer;
}

.ex-container {
  border-bottom: 1px solid #ccc;
}

.ex-wrapper,
.ec {
  margin-top: 9px;
  overflow: hidden;
  color: #fdfcfc;
  font-size: 24px;
}

.ex-wrapper .item {
  float: left;
  width: 171px;
  height: 104.5px;
  margin-right: 9px;
  position: relative;
  cursor: pointer;
  .img {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .des {
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
}
.ex-wrapper .item:nth-child(2n) {
  margin-right: 0;
}
.ex-c {
  position: relative;
  overflow: hidden;
  .img {
    position: relative;
    z-index: 3;
    border-radius: 5px;
    /*px*/
    overflow: hidden;
    img {
      background: transparent;
      display: block;
      width: 100%;
    }
  }
}
.ex-c img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.exc {
  margin-top: 20px;
}

.ex-wrapper .item .des,
.ex-c .des {
  position: absolute;
  z-index: 3;
  bottom: 0px;
  left: 0;
  padding: 12px;
  color: #fff;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 500;
  background: linear-gradient(top, transparent, rgba(0, 0, 0, 0.5));
}

.ec .item {
  width: 171px;
  float: left;
  margin-right: 9px;
  &:last-child,
  &:nth-last-child(2) {
    margin-top: 15px;
  }
  img {
    border-radius: 4px;
    /*px*/
  }
  .des {
    color: #000;
    font-size: 15px;
    /*px*/
    margin: 5px 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    small {
      font-size: 12px;
      /*px*/
      color: #000;
      width: 100%;
      font-weight: 300;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;
      margin-top: 5px;
    }
  }
}
.ec .item:nth-child(2n) {
  margin-right: 0;
}

.ec .item:hover .des {
  display: block;
}

.ec img {
  width: 100%;
  height: 100%;
}

.advice {
  padding: 0 12px 14px;
  /*px*/
  .title {
    margin-top: 20px;
    width: 100%;
  }
  h3 {
    color: #1f1f1f;
    font-size: 0.56rem;
    margin: 0px 0 0.32rem;
  }
  .advice-content {
    display: flex;
    .item {
      flex: 1;
      padding: 20px;
      text-align: center;
      box-shadow: 0px 2px 11px 1px rgba(82, 81, 81, 0.2);
      border-radius: 6px;
      /*px*/
      img {
        width: 55px;
        /*px*/
        background: transparent;
        margin: 0 auto 17px;
        /*px*/
      }
      h3 {
        font-size: 15px;
        /*px*/
        margin-bottom: 14px;
        /*px*/
      }
      p {
        font-size: 12px;
        /*px*/
        line-height: 15px;
        /*px*/
        color: rgba(0, 0, 0, 0.8);
      }
      &:first-child {
        margin-right: 10px;
        /*px*/
        img {
          width: 77.5px;
        }
      }
    }
  }
}
.last {
  margin-top: 30px;
  padding-bottom: 15px !important;
  .item {
    &:first-child {
      margin-right: 10px;
      /*px*/
      img {
        width: 55px !important;
      }
    }
  }
}
</style>
