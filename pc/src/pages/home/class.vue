<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">{{$t('navs[0].name')}}</a>
        »
        <router-link :to="{path:'/class'}">{{$t('navs[7].name')}}</router-link>
      </div>
    </div>
    <div class="class">
      <div class="title">
        <h3 id="intro">每周一图</h3>
      </div>
      <div class="swiper-container banner">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in first.default_img" :key="index">
            <img :src="item" alt />
          </div>
        </div>
        <div class="swiper-button-prev" v-if="first.default_img.length>1"></div>
        <div class="swiper-button-next" v-if="first.default_img.length>1"></div>
        <div class="btn" v-if="first.three_url!=''&&first.video_url!=''">
          <span :class="{'active':active==0}" @click="active=0">图文</span>
          <span :class="{'active':active==1}" v-if="first.three_url!=''" @click="active=1">3D</span>
          <span :class="{'active':active==2}" v-if="first.video_url!=''" @click="active=2">视频</span>
        </div>
        <div class="d3" v-if="showD">
          <iframe :src="first.three_url" frameborder="0" scrolling="no"></iframe>
        </div>
        <div class="d3" v-if="showV">
          <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
            id="foo"
          ></video-player>
        </div>
      </div>
      <div class="first">
        <h3>
          {{first.title}}
          <span class="share-wrapper">
            <i class="iconfont iconsharearrow"></i>
            分享
            <div class="share-wrapp">
              <div class="share">
                <div class="item" @click="copyUrl">
                  <span class="link"></span>复制链接
                </div>
                <div class="item" @click="shareWeibo">
                  <span class="weibo"></span>
                  新浪微博
                </div>
                <div class="item">
                  <span class="weixin"></span>微信扫一扫
                </div>
                <qrcode ref="qrcode" id="qrcode" :value="link" :options="{ size:120 }"></qrcode>
              </div>
            </div>
          </span>

          <span @click="doZan">
            <i class="iconfont iconthumbs-up" :class="{'active':first.if_zan!=0}"></i>
            点赞
          </span>
        </h3>
        <div class="des" v-html="first.content"></div>
      </div>
      <div class="btn-wrapper" v-if="weeks.length>0">
        <span @click="goWeekL">
          查看更多
          <i class="iconfont iconfanhui1"></i>
        </span>
      </div>
      <ul class="weeks" v-if="weeks.length>0">
        <li v-for="(item,index) in weeks" :key="index" @click="goD(item.article_id)">
          <img :src="item.default_img" alt />
          <div class="weeks-titles">{{item.title}}</div>
        </li>
      </ul>
      <div class="title">
        <h3>海洋百科</h3>
      </div>
      <ul class="ke">
        <li v-for="(item,index) in bai" :key="index" @click="goDa(item.article_id)">
          <img :src="item.default_img" alt />
          <div class="weeks-title">{{item.title}}</div>
        </li>
      </ul>
      <div class="btn" @click="goBai">查看更多</div>
      <div class="title titles">
        <h3>海洋伙伴互动问答</h3>
      </div>
      <div class="hu">
        <img src="../.././img/ke1.png" alt />
        <div class="btns" @click="goQuestion">开始问答</div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import { videoPlayer } from "vue-video-player";
export default {
  data() {
    return {
      first: { default_img: [] },
      weeks: "",
      bai: "",
      shareF: false,
      showV: false,
      showD: false,
      video: "",
      link: "",
      active: 0,
      playerOptions: {
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "" //你的视频地址（必填）
          }
        ],
        poster: "", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        debug: true
      }
    };
  },
  components: {
    videoPlayer
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  watch: {
    active: function(val) {
      if (val == 0) {
        this.showD = false;
        this.showV = false;
        this.onPlayerPause();
      }
      if (val == 1) {
        this.showD = true;
        this.showV = false;
        this.onPlayerPause();
      }
      if (val == 2) {
        this.showD = false;
        this.playerOptions.sources[0].src = this.first.video_url;
        this.showV = true;
      }
    },
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
  methods: {
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
    onPlayerPlay(player) {},
    onPlayerPause(player) {},
    shareWeibo() {
      var url =
        "http://service.weibo.com/share/share.php?appkey=&title=" +
        this.first.title +
        "&url=" +
        window.origin +
        "/class=" +
        "&searchPic=false&style=simple";
      window.open(url, "_blank");
    },
    showShare() {
      this.link = window.origin + "/class";
      this.shareF = !this.shareF;
    },
    copyUrl() {
      var oInput = document.createElement("input");
      oInput.value = window.origin + "/class";
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      this.$message.success("复制成功");
    },
    doZan() {
      if (localStorage.api_token) {
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
    goQuestion() {
      this.$router.push("/question");
    },
    goBai() {
      this.$router.push("/baiL");
    },
    goD(id) {
      this.$router.push({ path: "/detail", query: { id: id } });
    },
    goDa(id) {
      this.$router.push({ path: "/baiD", query: { id: id } });
    },
    initS() {
      var _this = this;
      if (this.first.default_img.length > 1) {
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
          paginationClickable: true,
          onSlideChangeStart: function(swiper) {
            _this.activeIndex = swiper.realIndex;
          }
        });
      }
    },
    goWeekL() {
      this.$router.push({ path: "/weekL" });
    },
    // 底部切换
    tab_footer(index) {
      let jump = document.querySelectorAll(".title");
      let total = jump[index].offsetTop - 180;
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
    }
  },
  mounted() {
    this.getHall();
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
  }
};
</script>
<style lang="scss" scoped>
.topbar-wrapper {
  background-color: #e7e7e7;
  height: 60px;
  line-height: 60px;
  margin-bottom: 30px;
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
.class {
  margin: 0 auto;
  width: 1200px;
}
.title {
  width: 100%;
  margin: 80px auto 40px;
}
.share-wrapper {
  position: relative;
  cursor: pointer;
  display: block;

  &:hover {
    .share-wrapp {
      display: block;
    }
  }
  .share-wrapp {
    padding-top: 40px;
    position: absolute;
    top: 0;
    width: 170px;
    background: transparent;
    height: 210px;
    display: none;
    left: 50%;
    transform: translateX(-50%);
    z-index: 15;
    .share {
      position: absolute;
      top: 30px;
      right: 0px;
      width: 170px;
      height: 308px;
      padding-top: 20px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 3px 7px 3px rgba(0, 0, 0, 0.35);
      border-radius: 4px;
    }
    .share:after {
      content: "";
      width: 8px;
      height: 8px;
      background: #fff;
      box-shadow: -2px 3px 7px 3px rgba(0, 0, 0, 0.35);
      transform: rotate(45deg);
      position: absolute;
      top: -4px;
      left: 50%;
      z-index: -1;
      margin-left: -4px;
    }
    .item {
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      padding-left: 60px;
      position: relative;
      text-align: left;
      cursor: pointer;
    }
    .item span {
      width: 26px;
      height: 26px;
      background: url(../.././img/share/link.png) no-repeat;
      background-size: cover;
      position: absolute;
      top: 50%;
      left: 26px;
      margin-top: -13px;
      &.weibo {
        background: url(../.././img/share/weibo.png) no-repeat;
        background-size: cover;
      }
      &.weixin {
        background: url(../.././img/share/weixin.png) no-repeat;
        background-size: cover;
      }
    }
    .qrcode {
      width: 120px;
      height: 120px;
      margin: 12px auto;
    }
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
.banner {
  width: 1200px;
  height: 647px;
  margin-top: 50px;
  margin-bottom: 30px;
  position: relative;
  .swiper-button-prev {
    width: 28px;
    height: 29px;
    background: url(../.././img/class/arrow.png) no-repeat;
    background-size: contain;
    transform: rotate(180deg);
  }
  .d3 {
    position: absolute;
    width: 1200px;
    height: 647px;
    background: rgba(0, 0, 0, 0.75);
    top: 0;
    left: 0;
    z-index: 1020;
    video,
    iframe {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
  .swiper-button-next {
    width: 28px;
    height: 29px;
    background: url(../.././img/class/arrow.png) no-repeat;
    background-size: contain;
  }
  .btn {
    width: 167px;
    height: 26px;
    line-height: 26px;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 30px;
    left: 50%;
    margin-left: -83.5px;
    z-index: 1040;
    display: flex;
    span {
      flex: 1;
      text-align: center;
      border-radius: 13px;
      font-size: 14px;
      &.active {
        background: #b47c2d;
      }
    }
  }
}
.banner img {
  width: 100%;
  vertical-align: middle;
}
.first {
  padding: 0 0px 30px 0px;
}
.first h3 {
  font-size: 24px;
  margin-bottom: 20px;
}
.first h3 span {
  float: right;
  font-size: 16px;
  display: inline-block;
  width: 80px;
  color: #666;
  font-weight: 400;
  line-height: 25px;
  margin-left: 30px;
  &:last-child {
    margin-left: 0;
  }
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
}
.first h3 span i {
  font-size: 25px;
  width: 20px;
  float: left;
  vertical-align: middle;
  display: inline-block;
  margin-right: 12px;
}
.first h3 span i.active {
  color: #e11b1b;
}
.first /deep/ p {
  font-size: 18px;
  line-height: 25px;
  text-align: 2em;
  font-weight: 300;
}
.btn-wrapper {
  overflow: hidden;
  margin-bottom: 22px;
  span {
    float: right;
    cursor: pointer;
  }
}
.weeks {
  width: 1200px;
  height: 180px;
  margin-bottom: 20px;
}
.weeks li {
  width: 290px;
  height: 180px;
  float: left;
  position: relative;
  margin-right: 13.3px;
  cursor: pointer;
  overflow: hidden;
}
.weeks li:nth-child(4n) {
  margin-right: 0;
}
.weeks li img {
  width: 100%;
  height: 100%;
}
.weeks-title {
  position: absolute;
  left: 0;
  bottom: -69px;
  box-sizing: border-box;
  width: 100%;
  height: 59px;
  padding-left: 20px;
  background: url(../.././img/home/underlay-bg.png);
  background-size: contain;
  line-height: 49px;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #ffffff;
  font-size: 26px;
}
.weeks-titles {
  position: absolute;
  bottom: 0px;
  left: 20px;
  color: #fff;
  font-size: 18px;
  position: absolute;
  left: 0;
  bottom: -49px;
  box-sizing: border-box;
  width: 100%;
  height: 46px;
  padding-left: 20px;
  background: url(../.././img/home/underlay-bg.png);
  background-size: contain;
  line-height: 39px;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.weeks li:hover .weeks-title,
.weeks li:hover .weeks-titles,
.ke li:hover .weeks-title {
  bottom: 0px;
}
.ke {
  overflow: hidden;
  margin-bottom: 50px;
}
.ke li {
  float: left;
  width: 390px;
  height: 556px;
  margin-right: 15px;
  position: relative;
  cursor: pointer;
  line-height: 556px;
  cursor: pointer;
  font-size: 0;
  background: #f5f5f5;
  &:after {
    content: "";
    width: 14px;
    box-shadow: 0 0 11px rgba(0, 0, 0, 0.7);
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      from(rgba(0, 0, 0, 0.3)),
      to(rgba(0, 0, 0, 0))
    );
    position: absolute;
    top: 0;
    left: 0;
    z-index: 33;
    height: 556px;
  }
}
.ke li:nth-child(3) {
  margin-right: 0;
}
.ke li img {
  width: 100%;
  font-size: 0;
  vertical-align: middle;
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
  width: 1200px;
  height: 446px;
  background: rgba(245, 245, 245, 1);
  box-shadow: 0px 7px 8px 0px rgba(168, 167, 165, 0.5);
  position: relative;
  margin-bottom: 50px;
}
.hu img {
  width: 100%;
}
.btns {
  width: 183px;
  height: 40px;
  background: rgba(180, 124, 45, 1);
  border-radius: 20px;
  position: absolute;
  top: 250px;
  left: 345px;
  cursor: pointer;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: #fff;
}
</style>