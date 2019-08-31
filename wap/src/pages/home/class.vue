<template>
  <div class="class">
    <div class="topbar">
      <router-link :to="{path:'/class'}" class="active">每周一图</router-link>
      <router-link :to="{path:'/baiL'}">海洋百科</router-link>
      <router-link :to="{path:'/answer'}">互动问答</router-link>
    </div>
    <div class="title">
      <h3 id="intro">每周一图</h3>
    </div>
    <div class="banner-wrapper">
      <div class="swiper-container banner">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in first.default_img" :key="index">
            <img :src="item" alt />
            <div class="swiper-btn">{{(index+1)}}/{{first.default_img.length}}</div>
          </div>
        </div>
      </div>
      <div class="video" v-if="first.video_url!=''" @click="showV(first.video_url)">视频</div>
      <div class="d3" v-if="first.three_url!=''" @click="showD(first.three_url)">3D</div>
    </div>

    <div class="first">
      <h3>
        {{first.title}}
        <span @click="doZan">
          <i class="iconfont iconthumbs" :class="{'active':first.if_zan!=0}"></i>
          点赞
        </span>
      </h3>
      <div class="des" v-html="first.content"></div>
    </div>
    <div class="titles title">
      <h3>
        <i class="iconfont iconzhihuiwenwu"></i>往期推荐&nbsp;/
        <span @click="goWeekL">
          更多
          <i class="iconfont iconfanhui1"></i>
        </span>
      </h3>
    </div>
    <ul class="weeks">
      <li v-for="(item,index) in weeks" :key="index" @click="goD(item.article_id)">
        <img :src="item.default_img" alt />
      </li>
    </ul>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  data() {
    return {
      first: "",
      weeks: "",
      bai: "",
      video: ""
    };
  },
  methods: {
    //跳转3d网址
    showD(url) {
      window.location.href = url;
    },
    //跳转视频
    showV(url) {
      this.$router.push({ path: "/video", query: { url: url } });
    },
    getHall() {
      this.$api.getHall().then(res => {
        this.first = res.data.first;
        this.weeks = res.data.weeks;
        this.bai = res.data.bai;
        setTimeout(() => {
          this.initS();
        }, 500);
      });
    },
    doZan() {
      if (localStorage.app_token) {
        this.$api.doZan(this.first.article_id).then(res => {
          if (res.status == 1) {
            if (this.first.if_zan == 0) {
              this.first.if_zan = 1;
            } else {
              this.first.if_zan = 0;
            }
          }
        });
      } else {
        if (this.first.if_zan == 0) {
          this.first.if_zan = 1;
        } else {
          this.first.if_zan = 0;
        }
      }
    },
    goD(id) {
      this.$router.push({ path: "/detail", query: { id: id } });
    },

    initS() {
      var _this = this;
      this.swiper = new Swiper(".swiper-container", {
        autoplay: 3000,
        direction: "horizontal",
        loop: true,
        effect: "fade",
        //手动触发后继续播放
        autoplayDisableOnInteraction: false,
        // 如果需要分页器
        prevButton: ".swiper-button-prev",
        nextButton: ".swiper-button-next",
        paginationClickable: true
      });
    },
    goWeekL() {
      this.$router.push({ path: "/weekL" });
    }
  },
  mounted() {
    this.getHall();
  }
};
</script>
<style lang="scss" scoped>
.class {
  margin: 0 auto;
  width: 100%;
  background: #f5f5f5;
}
.container {
  width: 100%;
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
  width: 120px;
  padding: 5px 10px 0;
  display: inline-block;
  text-align: center;
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
.title {
  width: 100%;
  margin: 12px auto 10px;
}
.title h3 {
  margin: 0 10px;
  font-weight: 400;
  color: #000;
  font-size: 14px;
  text-indent: 5px;
  border-left: 2px solid #000;
}
.titles {
  font-size: 14px;
  margin: 10px 0;
}
.titles h3 {
  border: 0 none;
}
.titles span {
  display: block;
  float: right;
}
.banner-wrapper {
  position: relative;
}
.banner {
  margin: 0 12px;
  height: 191.5px;
  margin-top: 15px;
  margin-bottom: 20px;
}
.banner img {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  width: 100% !important;
}
.swiper-slide .swiper-btn {
  color: #fff;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 20px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}
.banner-wrapper .video {
  position: absolute;
  bottom: 0px;
  left: 30%;
  width: 66.5px;
  height: 32px;
  line-height: 32px;
  color: #fff;
  font-size: 14px;
  background: rgba(180, 124, 45, 1);
  border: 1px solid rgba(180, 124, 45, 1);
  border-radius: 32px;
  text-align: center;
  z-index: 100;
}
.des /deep/ p {
  font-size: 12px;
  span {
    font-size: 12px !important;
  }
}
.banner-wrapper .d3 {
  position: absolute;
  bottom: 0px;
  right: 30%;
  width: 66.5px;
  height: 32px;
  line-height: 32px;
  color: #fff;
  font-size: 14px;
  background: rgba(180, 124, 45, 1);
  border: 1px solid rgba(180, 124, 45, 1);
  border-radius: 32px;
  text-align: center;
  z-index: 100;
}
.first {
  padding: 0 20px 10px 20px;
}
.first h3 {
  font-size: 14px;
  margin-bottom: 10px;
  overflow: hidden;
}
.first h3 span {
  float: right;
  font-size: 14px;
  color: #000;
}
.first h3 span i {
  font-size: 18px;
  vertical-align: middle;
  display: inline-block;
  margin-right: 3px;
}
.first h3 span i.active {
  color: #e11b1b;
}
.first /deep/ p {
  font-size: 12px;
  line-height: 20px;
  text-align: 2em;
  font-weight: 300;
}
.weeks {
  margin: 0 12px;
  overflow: hidden;
}
.weeks li {
  width: 169px;
  height: 104px;
  float: left;
  position: relative;
  margin-right: 12px;
  margin-bottom: 20px;
  cursor: pointer;
}
.weeks li:nth-child(2n) {
  margin-right: 0;
}
.weeks li img {
  width: 100%;
  height: 100%;
  display: block;
}
.weeks-title {
  position: absolute;
  bottom: 30px;
  left: 30px;
  color: #fff;
  font-size: 14px;
  width: 74%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.ke {
  overflow: hidden;
  margin-bottom: 15px;
}
.ke li {
  float: left;
  width: 169px;
  height: 241.5px;
  margin-right: 15px;
  position: relative;
  cursor: pointer;
}
.ke li:nth-child(3) {
  margin-right: 0;
}
.ke li img {
  width: 100%;
  height: 100%;
}
.btn {
  width: 183px;
  height: 40px;
  margin: 0 auto 30px;
  background: rgba(180, 124, 45, 1);
  border-radius: 20px;
  color: #fff;
  font-size: 18px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.hu {
  width: 100%;
  height: 113px;
  background: rgba(245, 245, 245, 1);
  box-shadow: 0px 7px 8px 0px rgba(168, 167, 165, 0.5);
  position: relative;
}
.hu img {
  width: 100%;
  height: 100%;
}
.btns {
  width: 96px;
  height: 25px;
  background: rgba(180, 124, 45, 1);
  border-radius: 20px;
  position: absolute;
  top: 60px;
  left: 50px;
  cursor: pointer;
  line-height: 25px;
  text-align: center;
  font-size: 12px;
  color: #fff;
}
</style>
