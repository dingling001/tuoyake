<template>
  <div class="class">
    <div class="title">
      <h3 id="intro">每日一图</h3>
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

    <div class="first" v-if="first">
      <h3>
        {{first.title}}
        <span @click="doZan">
          <i class="iconfont iconthumbs" :class="{'active':first.if_zan!=0}"></i>
          {{first.if_zan==0?'未点赞':"已点赞"}}
        </span>
      </h3>
      <div class="des" v-html="first.content"></div>
    </div>
    <div class="titles title">
      <h3>
        <i class="iconfont iconzhihuiwenwu"></i>
        往期推荐&nbsp;/
        <span>
          <i class="iconfont iconfanhui" @click="pageD" v-if="cpage>0"></i>
          <i class="iconfont iconfanhui1" @click="pageA" v-if="pageF"></i>
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
      first: {
        if_zan: 0
      },
      weeks: "",
      bai: "",
      video: "",
      cpage: 0,
      ctake: 4,
      cskip: 0,
      pageF: true
    };
  },
  watch: {
    cpage: function(val) {
      this.cskip = val * this.ctake;
      this.getWeek();
    }
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
    pageD() {
      if (this.cpage >= 1) {
        this.cpage--;
      }
    },
    pageA() {
      this.cpage++;
    },
    getWeekD(id) {
      this.$api.getWeekD(id).then(res => {
        this.first = res.data;
        setTimeout(() => {
          this.initS();
        }, 500);
      });
    },
    goD(id) {
      this.$router.push({ path: "/detail", query: { id: id } });
      this.id = id;
      this.getWeekD(id);
      this.getWeek();
      window.scroll(0, 0);
    },
    getWeek() {
      this.$api.getWeek(this.cskip, this.ctake).then(res => {
        this.weeks = res.data.data;
        if (res.data.data.length < this.ctake) {
          this.pageF = false;
        }
        if (res.data.count <= this.ctake) {
          this.pageF = false;
        }
      });
    },
    initS() {
      var _this = this;
      this.swiper = new Swiper(".swiper-container", {
        autoplay: 3000,
        direction: "horizontal",
        effect: "fade",
        loop: true,
        //手动触发后继续播放
        autoplayDisableOnInteraction: false,
        // 如果需要分页器
        pagination: ".swiper-pagination",
        paginationElement: "span",
        paginationClickable: true
      });
    },
    goWeekL() {
      this.$router.push({ path: "/weekL" });
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
    }
  },
  mounted() {
    var id = this.$route.query.id;
    this.getWeekD(id);
    this.getWeek();
  }
};
</script>
<style lang="scss" scoped>
.class {
  margin: 0 auto;
  padding-top: 20px;
  width: 100%;
}
.container {
  width: 100%;
}
.title {
  width: 100%;
  margin: 0px auto 10px;
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
  margin-right: 10px;
}
.banner-wrapper {
  position: relative;
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
}
.des /deep/ p span {
  font-size: 12px !important;
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
.banner {
  margin: 0 23px;
  height: 191.5px;
  margin-top: 15px;
  margin-bottom: 20px;
}
.banner img {
  width: 100%;
  height: 100%;
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
  margin-right: 10px;
}
.first h3 span i {
  font-size: 14px;
  margin-right: 5px;
  display: inline-block;
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
  width: 100%;
  overflow: hidden;
  margin-bottom: 15px;
}
.weeks li {
  width: 169px;
  height: 104px;
  float: left;
  position: relative;
  margin-left: 15px;
  margin-bottom: 20px;
  cursor: pointer;
}
.weeks li:nth-child(4n) {
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
