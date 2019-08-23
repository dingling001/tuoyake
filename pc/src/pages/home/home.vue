<template>
  <div :class="{'container':$t('news')}">
    <!-- 第一版块 -->
    <div class="container-item">
      <div class="swiper-container banner">
        <div class="swiper-wrapper">
          <div
            class="slide"
            v-for="(item,index) in banners"
            :key="index"
            :class="{'active':cur==index}"
            @click="go(item.url)"
            :style="{'background':'url('+item.img+')no-repeat','background-size':'cover'}"
          ></div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="page">
          <span
            v-for="(item,index) in banners"
            :class="{'active':cur==index}"
            :key="index"
            @click="cur=index"
          ></span>
        </div>
      </div>
      <!-- 主体部分 -->
      <div class="main">
        <div class="ad" v-if="$t('news')">
          <div class="title">
            海博
            公告
          </div>
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
        <!-- 海博新闻 -->
        <div class="news" v-if="$t('news')">
          <div id="news">
            <h3>
              <i class="iconfont iconzixun"></i>
              {{$t('news')}}&nbsp;/
            </h3>
            <div class="news-container" :class="{'animated fadeInUp ':top>120&&top<200&&num<=1}">
              <div class="swiper-container news-banner">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="(item,index) in news"
                    :key="index"
                    @click="goAd(item.article_id)"
                  >
                    <img :src="item.img" alt />
                    <div class="slide-item">
                      {{item.title.length>20?item.title.substring(0,20)+'...':item.title}}
                      【{{item.created_at|time}}】
                    </div>
                  </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
              </div>
              <!-- 右侧部分 -->
              <div class="news-main">
                <div class="news-item">
                  <h4>
                    海博资讯
                    <span @click.stop="goList(0)">查看更多</span>
                  </h4>
                  <ul>
                    <li v-for="(item,index) in zS" :key="index" @click="goAd(item.article_id)">
                      <div class="news-items">{{item.title}}</div>
                      <span class="date">{{item.created_at|time}}</span>
                    </li>
                  </ul>
                </div>
                <div class="news-item">
                  <h4>
                    媒体报道
                    <span @click.stop="goList(1)">查看更多</span>
                  </h4>
                  <ul>
                    <li v-for="(item,index) in medias" :key="index" @click="goAd(item.article_id)">
                      <div class="news-items">{{item.title}}</div>
                      <span class="date">{{item.created_at|time}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="info" id="info">
          <div class="info-l">
            <h3 class="xuzhi-title">
              <span class="xuzhi"></span>
              {{$t('info')}}&nbsp;/
            </h3>
            <h4>{{$t('openT')}}：</h4>
            <p v-html="openTime" class="openTime"></p>
            <h4 class="tel" v-if="tel!=''">{{$t('tel')}}：</h4>
            <p v-html="tel" v-if="tel!=''" class="tel-content"></p>
          </div>
          <div class="info-r" v-if="$t('news')">
            <router-link to="/pw/person/index" tag="div" class="item"></router-link>
            <!-- <div class="item item1" @click="goTeam"></div> -->
            <!-- <div class="item item2"></div> -->
            <router-link to="/team" tag="div" class="item item1"></router-link>
            <router-link to="/jiangjie" tag="div" class="item item2"></router-link>
          </div>
          <div class="info-all" v-else @click="goAll">
            <div class="imgs">
              <img src="../.././img/home/360h.png" alt />
            </div>
            <p>{{$t('fullScreen')}}</p>
          </div>
        </div>
        <!-- vip入口 -->
        <div class="vip" v-if="$t('news')" id="vip">
          <div class="item" @click="goAll">
            <div class="img-wrapper">
              <img src="../.././img/home/360h.png" alt />
            </div>

            <p>{{$t('fullScreen')}}</p>
          </div>
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
            <p>{{is_vol==1?'志愿者活动':'加入志愿者'}}</p>
          </div>
        </div>
        <!-- 最新展览 -->
        <div class="ex exb" v-if="exhibitionList.length>0&&$t('news')!=''">
          <h3 class="zhan-title">
            <i class="zhanlan"></i>
            最新展览&nbsp;/
            <span @click="goN">
              查看更多
              <i class="iconfont iconfanhui1"></i>
            </span>
          </h3>
          <div class="ex-container">
            <div class="swiper-container ex-banner">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(item,index) in exhibitionList"
                  :key="index"
                  @click="goEx(item.exhibition_id)"
                >
                  <img :src="item.exhibition_img" v-if="index<=4" alt />
                  <div class="slide-item" v-if="index<=4">
                    <h4>{{item.exhibition_name}}</h4>
                    <p>展览时间：{{item.end_date}}</p>
                    <p>展览地点：{{item.exhibition_address}}</p>
                  </div>
                </div>
              </div>
              <!-- 如果需要分页器 -->
              <div class="swiper-pagination"></div>
            </div>
          </div>
        </div>
        <!-- 常设展览 -->
        <div class="ex cexb" v-if="cExhibitionList.length>0" id="ex2">
          <h3>
            <i class="iconfont iconhaiyang"></i>
            {{$t('cexb')}}&nbsp;/
            <span @click="goc">
              {{$t('more')}}
              <i class="iconfont iconfanhui1"></i>
            </span>
          </h3>
          <div class="ex-c" v-if="cExhibitionList[0]">
            <div class="img" @click="goEx(cExhibitionList[0].exhibition_id)">
              <img :src="cExhibitionList[0].exhibition_img" alt />
              <div class="des">{{cExhibitionList[0].exhibition_name}}</div>
            </div>
          </div>
          <div class="ex-wrapper exs">
            <div
              class="item"
              v-if="cExhibitionList[1]"
              @click="goEx(cExhibitionList[1].exhibition_id)"
            >
              <img :src="cExhibitionList[1].exhibition_img" alt />
              <div class="des">{{cExhibitionList[1].exhibition_name}}</div>
            </div>
            <div
              class="item"
              v-if="cExhibitionList[2]"
              @click="goEx(cExhibitionList[2].exhibition_id)"
            >
              <img :src="cExhibitionList[2].exhibition_img" alt />
              <div class="des">{{cExhibitionList[2].exhibition_name}}</div>
            </div>
            <div
              class="item"
              v-if="cExhibitionList[3]"
              @click="goEx(cExhibitionList[3].exhibition_id)"
            >
              <img :src="cExhibitionList[3].exhibition_img" alt />
              <div class="des">{{cExhibitionList[3].exhibition_name}}</div>
            </div>
          </div>
        </div>
        <!-- 最新活动 -->
        <div class="ex actives" v-if="activeL.length>0&&$t('news')" id="active">
          <h3>
            <i class="iconfont iconshoucang"></i>
            最新活动&nbsp;/
            <span @click="goActive">
              查看更多
              <i class="iconfont iconfanhui1"></i>
            </span>
          </h3>
          <div class="ex-c">
            <div class="swiper-container active-banner">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(item,index) in activeL"
                  :key="index"
                  @click="goD(item.active_id)"
                >
                  <img :src="item.active_img" alt />
                  <div class="slide-item">
                    <h4>{{item.active_name}}</h4>
                    <p>活动时间：{{item.active_start_date|getYMD}}--{{item.active_end_date|getYMD}}</p>
                    <p>{{item.content.length>80?item.content.substring(0,80)+'...':item.content}}</p>
                    <div class="btns">进入详情 >></div>
                  </div>
                </div>
              </div>
              <!-- 如果需要分页器 -->
              <div class="swiper-pagination"></div>
            </div>
          </div>
        </div>
        <div class="ex" v-if="eList.length>0" id="ex3">
          <h3>
            <i class="iconfont iconzhihuiwenwu"></i>
            {{$t('jexbs')}}&nbsp;/
            <span @click="goCollection">
              {{$t('more')}}
              <i class="iconfont iconfanhui1"></i>
            </span>
          </h3>
          <div class="ex-wrapper ec ex-z">
            <div
              class="item"
              v-for="(item,index) in eList"
              :key="index"
              @click="goEDetail(item.exhibit_id)"
            >
              <img :src="item.exhibit_list_img" alt />
              <div class="des">
                <div class="des-wrapper">
                  <h3>{{item.exhibit_name}}</h3>
                  <p>{{item.exhibition_name}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="last" v-if="$t('news')" id="last">
          <div class="last-item" @click="gowen">
            <div class="last-content">
              <h3>海博文创</h3>
              <p>手工 · 纪念品 · 陶瓷</p>
            </div>
            <img src="../.././img/home/w.png" alt />
          </div>
          <div class="last-item" @click="goAround">
            <div class="last-content">
              <h3>海博周边</h3>
              <p>景点 · 餐饮 · 酒店 · 服务</p>
            </div>
            <img src="../.././img/home/z.png" alt />
          </div>
        </div>
      </div>
      <!-- 问卷调查部分 -->
      <div class="question-wrapper" v-if="$t('news')!=''" id="questions">
        <div class="top">
          <div class="item" @click="goFeedback">
            <div class="item-content">
              <img src="../.././img/home/q1.png" alt />
              <h3>意见反馈</h3>
            </div>
            <p>
              您的意见有助于我们更好的提升
              官网体验，感谢您的支持！
            </p>
          </div>
          <div class="item" @click="goQuestion">
            <div class="item-content">
              <img src="../.././img/home/q2.png" alt />
              <h3>问卷调查</h3>
            </div>
            <p>
              请回答几个简单的小问题，让我们
              能够为您更好的服务体验吧～
            </p>
          </div>
        </div>
        <div class="bottom">
          <p>地 址：天津市滨海新区中新生态城海轩道377号</p>
          <p>开馆时间：周二至周日 09:00—17:00（16:00后停止入馆），周一闭馆（法定节假日除外,特殊情况另行通知)</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import checkPhone from "@/bin/common.js";

export default {
  name: "home",
  data() {
    return {
      userVip: 0,
      cur: 0,
      num: 0,
      l: localStorage.l || 1,
      banners: [],
      eList: [],
      timer: "",
      news: [],
      medias: [],
      zS: [],
      ad: [],
      openTime: "",
      exhibitionList: [],
      cExhibitionList: [],
      activeL: [],
      tel: "",
      is_vol: "",
      is_team: "",
      member_status: "",
      api_token: localStorage.api_token ? localStorage.api_token : "",
      top: 0,
      height: 0
    };
  },
  filters: {
    time: function(data) {
      var month = data.substring(5, 7);
      var day = data.substring(8, 10);
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
    window.addEventListener("scroll", this.handleScroll);
    this.height = document.body.clientHeight;
    this.getIndex();
    this.num = 0;
    this.getActivity();
    var token = checkPhone.getCookie("hb_api_token");
    // 返回微信授权如果有hb_api_token，缓存api_token
    if (this.api_token == "") {
      if (token) {
        checkPhone.delCookie("hb_api_token");
        checkPhone.delCookie("hb_bind_uid");
        localStorage.api_token = token;
        this.api_token = token;
        this.app.getUser();
      } else {
        var bind_uid = checkPhone.getCookie("hb_bind_uid");
        if (bind_uid) {
          this.app.openBind();
        }
      }
    }

    if (this.api_token) {
      this.getUser();
    }
  },
  inject: ["app"],
  methods: {
    handleScroll() {
      this.top =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.top = this.top + this.height + 50;
      if (document.getElementById("news") != null) {
        var top1 = document.getElementById("news").offsetTop;
        if (top1 <= this.top) {
          document.getElementById("news").className = "animated fadeInUp";
        }
      }

      if (document.getElementById("info") != null) {
        var top2 = document.getElementById("info").offsetTop;
        if (top2 <= this.top) {
          document.getElementById("info").className = "info animated fadeInUp";
        }
      }

      if (document.getElementById("vip") != null) {
        var top3 = document.getElementById("vip").offsetTop;
        if (top3 <= this.top) {
          document.getElementById("vip").className = "vip animated fadeInUp";
        }
      }

      if (document.getElementById("ex2") != null) {
        var top4 = document.getElementById("ex2").offsetTop;
        if (top4 <= this.top) {
          document.getElementById("ex2").className =
            "ex cexb animated fadeInUp";
        }
      }

      if (document.getElementById("active") != null) {
        var top5 = document.getElementById("active").offsetTop;
        if (top5 <= this.top) {
          document.getElementById("ex2").className =
            "ex actives animated fadeInUp";
        }
      }
      if (document.getElementById("ex3") != null) {
        var top6 = document.getElementById("ex3").offsetTop;
        if (top6 <= this.top) {
          document.getElementById("ex3").className = "ex animated fadeInUp";
        }
      }
      if (document.getElementById("last") != null) {
        var top7 = document.getElementById("last").offsetTop;
        if (top7 <= this.top) {
          document.getElementById("last").className = "last animated fadeInUp";
        }
      }
      if (document.getElementById("questions") != null) {
        var top7 = document.getElementById("questions").offsetTop;
        if (top7 <= this.top) {
          document.getElementById("questions").className =
            "question-wrapper animated fadeInUp";
        }
      }
    },
    goQuestion() {
      this.$router.push("/question");
    },
    goFeedback() {
      if (localStorage.api_token) {
        this.$router.push("/feedback");
      } else {
        this.app.openLogin();
      }
    },
    goAll() {
      window.location.href = "https://www.hymuseum.org.cn/uploadfiles/360html/";
    },
    goTeam() {
      // if (localStorage.api_token) {
      //   if (this.is_team == 1) {
      //     this.$router.push("/pw/team/index");
      //   } else {
      //     this.$api.getUser().then(res => {
      //       this.is_team = res.data.is_team;
      //       if (this.is_team == 1) {
      //         this.$router.push("/pw/team/index");
      //       } else {
      //         this.$router.push("/pw/team/register");
      //       }
      //     });
      //   }
      // } else {
      //   this.app.openLogin();
      // }
    },
    gowen() {
      this.$router.push("/jian");
    },
    go(url) {
      if (url) {
        window.location.href = url;
      }
    },
    goAround() {
      this.$router.push({ path: "/guide", query: { state: "about" } });
    },
    goCollection() {
      this.$router.push("/collection");
    },
    getUser() {
      this.$api.getUser().then(res => {
        if (res.status == 1) {
          this.is_vol = res.data.is_vol;
          this.member_status = res.data.member_status;
          this.is_team = res.data.is_team;
        }
      });
    },
    goVip() {
      // if (this.member_status) {
      //   if (this.member_status == 1 || this.member_status == 3) {
      //     this.$router.push("/vipC");
      //     return false;
      //   }
      //   if (this.member_status == 0) {
      //     this.$router.push("/uvip");
      //     return false;
      //   }
      //   this.$router.push("/vip");
      // } else {
      //   if (localStorage.api_token) {
      //     this.$api.getUser().then(res => {
      //       if (res.status == 1) {
      //         this.is_vol = res.data.is_vol;
      //         this.member_status = res.data.member_status;
      //         if (this.member_status == 1 || this.member_status == 3) {
      //           this.$router.push("/vipC");
      //           return false;
      //         }
      //         if (this.member_status == 0) {
      //           this.$router.push("/uvip");
      //           return false;
      //         }
      //         this.$router.push("/vip");
      //         return false;
      //       }
      //     });
      //   } else {
      //     this.app.openLogin();
      //   }
      // }
    },
    toVolunteer() {
      //进入志愿者
      const v = this;
      if (this.is_vol) {
        v.$router.push("/volunteer/pcvolloading");
      } else {
        if (localStorage.api_token) {
          v.$router.push("/volunteer/pcvolloading");
        } else {
          this.app.openLogin();
        }
      }
    },
    // 跳转媒体报道
    goList(curs) {
      localStorage.curs = curs;
      this.$router.push({ path: "/introL" });
    },
    goc() {
      this.$router.push("/cexbL");
    },
    goN() {
      this.$router.push("/exbL");
    },
    goEDetail(id) {
      this.$router.push({ path: "/cDetail", query: { id: id } });
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
        query: { active_id: id, active_cate: 1 }
      });
    },
    // 跳转活动列表
    goActive() {
      this.$router.push({
        path: "/active/activeList",
        query: { active_cate: 1 }
      });
    },

    goAd(id) {
      this.$router.push({ path: "/adetail", query: { id: id } });
    },

    getIndex() {
      var that = this;
      this.$api.getIndex().then(res => {
        that.banners = res.data.lun;
        that.ad = res.data.gong;
        setTimeout(() => {
          var swiper = new Swiper(".ad-container", {
            direction: "vertical",
            loop: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false
          });
        }, 800);
        that.news = res.data.tui;
        that.zS = res.data.zi;
        that.medias = res.data.mei;
        that.openTime = res.data.visit.open;
        that.tel = res.data.visit.tel;
        that.eList = res.data.exhibit;
        that.exhibitionList = res.data.exhibition.temporary_new.splice(0, 5);
        that.cExhibitionList = res.data.exhibition.theme;

        var timer = setInterval(() => {
          if (that.cur <= that.banners.length - 2) {
            that.cur = that.cur + 1;
          } else {
            that.cur = 0;
          }
        }, 5000);
        if (that.news.length > 1) {
          setTimeout(() => {
            var swiper = new Swiper(".news-banner", {
              loop: true,
              effect: "fade",
              autoplayDisableOnInteraction: false,
              autoplay: 2500,
              // 如果需要分页器
              pagination: ".swiper-pagination",
              paginationElement: "span",
              paginationClickable: true
            });
          }, 800);
        }
        if (that.exhibitionList.length > 1) {
          setTimeout(() => {
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
      });
    },
    //获取活动
    getActivity() {
      var that = this;
      this.$api.activeList().then(res => {
        that.activeL = res.data.new;
        that.activeL = this.activeL.splice(0, 5);
        if (this.activeL.length > 1) {
          setTimeout(() => {
            var swiper = new Swiper(".active-banner", {
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
      });
    }
  }
};
</script>
<style lang="scss" scoped>
div.container {
  position: relative;
  z-index: 3;
  overflow: hidden;
}

div.container:after {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 1450px;
  top: 1670px;
  z-index: -1;
  background: #f2ece5;
}

.banner {
  width: 100%;
  height: 670px;
  position: relative;
  cursor: pointer;
  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale(1, 1);
    opacity: 0;
    z-index: -1;
    transition: transform 5000ms linear 0s;
    &.active {
      animation: scale 5000ms linear;
    }
  }

  .page {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    text-align: center;
    opacity: 1;
    z-index: 10;
    span {
      width: 20px;
      height: 4px;
      background: #999;
      display: inline-block;
      margin: 0 4px;
      cursor: pointer;
      transition: all 300ms ease;
      &.active {
        background: white;
        width: 30px;
      }
    }
  }
}
@keyframes scale {
  0% {
    transform: scale(1, 1);
    opacity: 0.5;
    z-index: 1;
    transition: opacity z-index transform 500ms "cubic-bezier(0,1,1,1)";
  }
  30% {
    opacity: 1;
  }
  60% {
    transform: scale(1.05);
    z-index: 1;
    opacity: 1;
    transition: opacity z-index transform 200ms "cubic-bezier(0,1,1,1)" 0.3s;
  }
  80% {
    transform: scale(1.05);
    z-index: 1;
    opacity: 1;
    transition: opacity z-index transform 200ms "cubic-bezier(0,1,1,1)" 0.3s;
  }
  100% {
    transform: scale(1.5);
    transition: scale 100ms "cubic-bezier(0.5,0,0.2,1)";
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
.news {
  min-height: 382px;
}
.news-item {
  min-height: 112px;
}
.info {
  min-height: 360px;
}

.exb {
  min-height: 777px;
}
.cexb {
  min-height: 911px;
}
.news-banner {
  cursor: pointer;
}
.news-banner .swiper-slide {
  position: relative;
}
.active-banner {
  height: 578px;
  width: 1200px;
  .swiper-slide {
    cursor: pointer;
  }
}
.news-banner .slide-item,
.active-banner .slide-item {
  position: absolute;
  color: #fff;
  padding: 0 30px 30px;
  bottom: 0px;
  width: 100%;
  z-index: 3;
  background: linear-gradient(top, transparent, rgba(0, 0, 0, 0.5));
}

.active-banner img {
  height: 578px;
  width: 100%;
  cursor: pointer;
}

.banner .swiper-pagination /deep/ .swiper-pagination-bullet {
  width: 30px;
  height: 4px;
  background: #ccc;
  border-radius: initial;
}

.ex-wrapper .item,
.ex-banner .swiper-slide {
  cursor: pointer;
  overflow: hidden;
}

.exs .item:hover img,
.ex-banner .swiper-slide:hover img,
.active-banner .swiper-slide:hover img {
  transform: scale(1.05);
}

.ex-banner .swiper-slide img {
  height: 579px;
  width: 100%;
  transition: all ease-in-out 500ms;
}

.active-banner .swiper-pagination /deep/ .swiper-pagination-bullet:focus,
.ex-banner .swiper-pagination /deep/ .swiper-pagination-bullet:active,
.swiper-pagination /deep/ .swiper-pagination-bullet:focus {
  outline: 0 none;
}

.ex-banner /deep/ .swiper-pagination-bullets {
  bottom: 140px;
}

.active-banner /deep/ .swiper-pagination-bullet,
.ex-banner /deep/ .swiper-pagination-bullet-active {
  background: #fff !important;
}

.ex-banner .slide-item {
  padding: 20px 30px;
  background: #fff;
  margin-top: -4px;
  box-shadow: 0px 7px 14px 2px rgba(95, 61, 13, 0.14);
}

.slide-item {
  position: relative;
}

.slide-item .btns {
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  bottom: 30px;
  right: 30px;
}

.slide-item h4 {
  margin: 10px 0;
  font-size: 20px;
}

.slide-item p {
  margin-bottom: 10px;
}

.ex-banner h4 {
  font-size: 20px;
  margin-top: 0;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  margin-bottom: 10px;
}

.ex-banner p {
  margin: 0 0 0.25rem 0;
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.8);
}

.main {
  width: 1200px;
  margin: 30px auto;
}
.ad {
  width: 100%;
  height: 100px;
  background: rgba(180, 124, 45, 1);
  border-radius: 2px;
  font-size: 18px;
  color: #fff;
  display: flex;
  padding: 15px;
  position: relative;
}

.title {
  width: 40px;
  line-height: 27px;
  margin-top: 5px;
  margin-right: 60px;
  margin-left: 10px;
  position: relative;
}

.title:after {
  content: "";
  width: 42px;
  height: 42px;
  background: url(../.././img/home/ad.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 7px;
  right: -50px;
}

.ad-swiper {
  background: #f8f2ea;
  color: #000;
  flex: 1;
  height: 70px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
  list-style: inside;
}

.ad-swiper .swiper-slide {
  width: 100%;
  line-height: 70px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  padding-left: 30px;
  &:after {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    transform: translateY(-50%);
    background: #5e3b09;
    position: absolute;
    top: 35px;
    left: 15px;
    z-index: 50;
  }
}

.ad-swiper .swiper-slide:hover {
  color: #ab752c;
}
.h {
  height: 216px;
  width: 186px;
  background: url(../.././img/home/h.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: -83px;
  right: 0;
  z-index: 3;
}

.news h3,
.info h3 {
  margin-top: 40px;
  margin-bottom: 23px;
  font-size: 26px;
}

.news h3 i,
.info h3 i {
  margin-right: 5px;
  font-size: 26px;
  display: inline-block;
}

.news-container {
  width: 100%;
  height: 312px;
  display: flex;
}

.news-banner {
  flex: 1;
  height: 311px;
}

.news-main {
  width: 565px;
  font-size: 16px;
  margin-left: 25px;
}

.news-main h4 {
  overflow: hidden;
  position: relative;
}

.news-main h4:after {
  content: "";
  width: 72%;
  height: 1px;
  background: #cac9c9;
  position: absolute;
  top: 50%;
  margin-top: -0.5px;
  left: 80px;
}

.news-main h4 span {
  color: #6b6b6b;
  float: right;
  cursor: pointer;
}

.news-item ul {
  list-style: initial;
  padding-left: 30px;
  margin: 16px 0;
}

.news-item li {
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  position: relative;
  color: #4a5261;
}

.news-item li:hover {
  color: #ab752c;
  &:after {
    content: "";
    width: 8px;
    height: 8px;
    background: #ab752c;
    position: absolute;
    border-radius: 50%;
    top: 50%;
    left: -20px;
    margin-top: -4px;
  }
}

.news-items {
  width: 450px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  float: left;
}

.date {
  display: block;
  float: right;
}

.active-banner /deep/ .swiper-pagination-bullet,
.ex-banner /deep/ .swiper-pagination-bullet,
.news-banner /deep/ .swiper-pagination-bullet {
  background: #ccc;
}

.ex-c img {
  width: 100%;
  height: 100%;
  transition: all ease-in-out 500ms;
}

.info {
  overflow: hidden;
  padding-bottom: 40px;
  position: relative;
  .info-l {
    width: 715px;
    float: left;
  }
  h4 {
    font-size: 18px;
    margin: 0;
    padding: 0;
    &.tel {
      margin-top: 16px;
    }
  }
  p.tel-content {
    margin-top: 13px;
    line-height: 28px;
    font-size: 18px;
    color: #4a5261;
    /deep/ p {
      line-height: 28px;
      font-size: 18px;
      color: #4a5261;
    }
  }
  .info-r {
    float: right;
    width: 340px;
    margin-top: 15px;
    margin-right: 60px;
    .item {
      width: 350px;
      height: 82px;
      background: url(../.././img/home/p.png) no-repeat;
      background-size: cover;
      margin-top: 15px;
      cursor: pointer;
    }
    .item1 {
      background: url(../.././img/home/t.png) no-repeat;
      background-size: cover;
    }
    .item2 {
      background: url(../.././img/home/j.png) no-repeat;
      background-size: cover;
    }
  }
  .openTime {
    color: #4a5261;
    font-size: 18px;
    border-bottom: 1px solid #97c1d3;
    margin: 0;
    margin-top: 16px;
    padding-bottom: 16px;
    line-height: 24px;
    & /deep/ p {
      margin: 0;
      padding: 0;
      font-size: 18px;
      line-height: 28px;
      font-size: 18px;
    }
    & /deep/ span {
      font-size: 18px !important;
      line-height: 28px !important;
      color: #35393c !important;
    }
  }

  .info-all {
    width: 433px;
    height: 175px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 7px 14px 2px rgba(95, 61, 13, 0.14);
    border-radius: 2px;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -87.5px;
    text-align: center;
    cursor: pointer;
    .imgs {
      width: 126px;
      height: 46px;
      margin: 32px auto;
      img {
        width: 100%;
        height: auto;
        display: block;
        outline: 0 none;
      }
    }
    p {
      font-family: "PingFangSC-Medium";
      font-size: 30px;
      font-weight: 500;
      color: rgba(30, 30, 30, 1);
    }
  }
}
.xuzhi {
  display: inline-block;
  width: 36px;
  height: 36px;
  background: url(../.././img/home/info.png) no-repeat;
  background-size: cover;
  margin-bottom: -8px;
}
.zhan-title i.zhanlan {
  display: inline-block;
  width: 36px;
  height: 36px;
  background: url(../.././img/home/f.png) no-repeat;
  background-size: cover;
  margin-bottom: -8px;
}

.bg1 {
  background: #c6ae8b;
  padding: 80px 0;
}

.vip {
  width: 1200px;
  height: 170px;
  box-shadow: 0px 7px 14px 2px rgba(95, 61, 13, 0.14);
  display: flex;
  background: #fff;
  color: #1e1e1e;
  font-size: 30px;
  cursor: pointer;
  min-height: 170px;
  .item {
    flex: 1;
    text-align: center;
    cursor: pointer;
    p {
      margin: 0;
      font-size: 26px;
      position: relative;
      transition: all 300ms ease-in-out;
    }
    .img-wrapper {
      margin: 35px auto 19px;
      height: 40px;
      width: 160px;
      img {
        height: 40px;
        display: block;
        margin: 0 auto;
        background: transparent;
      }
    }
    &:hover p {
      font-size: 30px;
    }
  }

  .item1 {
    position: relative;
    &:after,
    &:before {
      content: "";
      height: 46%;
      width: 1px;
      background: #2f2f2e;
      opacity: 0.8;
      position: absolute;
      top: 32%;
      left: 0;
    }
    &:before {
      left: auto;
      right: 0;
    }
  }
}

.ex h3 {
  margin-top: 60px;
  margin-bottom: 23px;
  font-size: 26px;
  overflow: hidden;
}

.ex h3 i {
  font-size: 26px;
  margin-right: 5px;
  &.iconfanhui1 {
    font-size: 16px;
  }
}

.ex h3 span {
  float: right;
  font-size: 16px;
  color: #6b6b6b;
  cursor: pointer;
}

.ex-container {
  box-shadow: 0px 7px 14px 2px rgba(95, 61, 13, 0.14);
  border-radius: 2px;
}

.ex-wrapper {
  margin-top: 26px;
  overflow: hidden;
  color: #fdfcfc;
  font-size: 24px;
}

.ex-wrapper .item {
  float: left;
  width: 385px;
  height: 235px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.ex-wrapper .item img {
  width: 100%;
  height: 100%;
  transition: all ease-in-out 500ms;
}

.ex-wrapper div.item:nth-child(2) {
  margin: 0 22px;
}
.actives {
  min-height: 648px;
}
.ec .item {
  height: 390px;
  width: 390px;
  position: relative;
}

.ex-c .img {
  width: 100%;
  height: 580px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all ease-in-out 500ms;
  &:hover img {
    transform: scale(1.05);
  }
}

.ex-c .des,
.ex-wrapper .item .des {
  position: absolute;
  left: 0;
  bottom: 0px;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  padding-left: 30px;
  background: url(../.././img/home/underlay-bg.png);
  background-size: contain;
  line-height: 69px;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 26px;
  font-weight: 500;
  color: #ffffff;
}

.ex-z .item .des {
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  line-height: 69px;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 26px;
  font-weight: 500;
  color: #ffffff;
  display: none;
  .des-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 24px;
    padding-top: 8px;
    h3 {
      padding: 0;
      margin: 0;
      font-size: 24px;
      font-weight: 400;
    }
    p {
      font-size: 18px;
      color: #fff;
      margin-top: 14px;
    }
  }
}
.ex-z .item:hover .des {
  display: block;
}
.ec .item .des small {
  font-size: 20px;
}
.ec div.item:nth-child(2),
.ec div.item:nth-child(5) {
  margin: 0 14px;
}
.ex-wrapper div.item:nth-child(4),
.ex-wrapper div.item:nth-child(5),
.ex-wrapper div.item:nth-child(6) {
  margin-top: 14px;
}
.ec img {
  width: 100%;
  height: 100%;
  display: block;
  transition: all ease-in-out 500ms;
}

.last {
  margin: 30px auto 0;
  overflow: hidden;
}

.last-item {
  width: 593px;
  float: left;
  height: 205px;
  box-shadow: 0px 2px 12px 0px rgba(181, 153, 137, 0.57);
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

div.last-item:first-child {
  margin-right: 14px;
}
.last-item img {
  width: 100%;
  height: auto;
  display: block;
  transition: all ease-in-out 500ms;
  position: relative;
  z-index: -1;
}
.last-item:hover {
  img {
    transform: scale(1.02);
  }
}
.last-content {
  width: 415px;
  height: 109px;
  background: rgba(94, 59, 9, 0.6);
  box-shadow: 0px 2px 12px 0px rgba(181, 153, 137, 0.57);
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.active-banner .swiper-slide {
  overflow: hidden;
}
.active-banner img {
  transition: all 500ms ease-in-out;
}

.last-content h3 {
  padding-top: 30px;
  font-size: 22px;
}
.last-content p {
  margin-top: 20px;
  font-size: 16px;
}

.last-content:after {
  content: "";
  width: 431px;
  height: 125px;
  background: rgba(94, 59, 9, 1);
  border: 3px solid rgba(0, 0, 0, 1);
  box-shadow: 0px 2px 12px 0px rgba(181, 153, 137, 0.57);
  opacity: 0.2;
  position: absolute;
  top: -8px;
  left: -8px;
}
/*问卷调查*/
.question-wrapper {
  width: 1200px;
  margin: 30px auto 40px;
  background: url(../.././img/home/q_top.png) no-repeat;
  background-size: cover;
  height: 490px;
  .top {
    padding: 38px 40px 0;
    overflow: hidden;
    .item {
      width: 550px;
      margin-right: 15px;
      float: left;
      background: rgba(255, 255, 255, 0.8);
      box-shadow: 0px 2px 11px 1px rgba(82, 81, 81, 0.69);
      border-radius: 6px;

      cursor: pointer;
      .item-content {
        padding: 50px 79px 21px;
        display: flex;
        img {
          width: 79px;
          height: auto;
          margin-right: 28px;
        }
        h3 {
          font-size: 24px;
          color: #000;
          line-height: 30px;
          font-weight: 500;
          margin-bottom: 25px;
          margin-top: 15px;
        }
      }
      p {
        line-height: 36px;
        color: rgba(0, 0, 0, 0.8);
        font-size: 18px;
        margin: 0 auto;
        padding: 0 79px 34px;
      }
      &:last-child {
        margin: 0;
        .item-content {
          padding-bottom: 17px;
        }
        img {
          width: 68px;
          height: 74px;
        }
      }
    }
  }
  .bottom {
    width: 1120px;
    height: 155px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 11px 1px rgba(82, 81, 81, 0.69);
    border-radius: 6px;
    margin: 20px auto 0;
    p {
      padding: 0 40px;
      line-height: 36px;
      font-size: 18px;
      color: rgba(0, 0, 0, 0.8);
      &:first-child {
        padding-top: 40px;
      }
    }
  }
}
</style>
