<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">{{$t('navs[0].name')}}</a>
        »
        <a href="javaScript:;">{{$t('navs[4].name')}}</a>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="container">
        <div class="service">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in services" :key="index">
                <img :src="item" alt />
                <div class="active">{{index+1}}/{{services.length}}</div>
              </div>
            </div>
          </div>

          <div class="d3" @click="showD=!showD" v-if="d3!=''">
            <img src="../.././img/c3.png" alt />
            360
          </div>
          <div class="video" @click="showV=!showV" v-if="video_path!=''">
            <img src="../.././img/cv.png" alt />
            视频
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">
          {{title}}
          <div class="join" @click="addT" v-if="$t('news')" :class="{'gray':is_traveled==1}">
            <i
              class="iconfont"
              :class="{'iconiconset0187':is_traveled==1,'iconjia':is_traveled==0}"
            ></i>
            {{is_traveled==0?'加入行程单':'取消行程单'}}
          </div>
        </div>
        <p v-if="$t('news')" class="btns">
          <span @click="doLike">
            <i class="iconfont iconthumbs-up" :class="{'actives':is_like==1}"></i>
            点赞
          </span>
          <span @click="doCollect">
            <i class="iconfont iconshoucang2" :class="{'actives':is_collection==1}"></i>
            收藏
          </span>
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
        </p>
        <div v-html="content" class="content"></div>
      </div>

      <!-- 3d资源展示 -->
      <div class="mask" v-if="showD">
        <div class="mask-content">
          <h3>{{title}}</h3>
          <span class="close" @click="showD=!showD"></span>
          <div class="mask-d3">
            <iframe :src="d3" frameborder="0" scrolling="no"></iframe>
          </div>
        </div>
      </div>
      <div class="mask" v-if="showV">
        <div class="mask-content">
          <h3>{{title}}</h3>
          <span class="close" @click="showV=!showV"></span>
          <div class="mask-d3">
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
      </div>
    </div>
    <h3 class="topTitle" v-if="lists.length>0">
      <i class="iconfont iconzhihuiwenwu"></i>
      {{$t('exbt')}} /
      <div class="right" @click="cpage=cpage+1">
        {{$t('hyp')}}
        <span class="hyp"></span>
      </div>
    </h3>
    <ul class="collections">
      <li v-for="(item,index) in lists" :key="index" @click="go(item.exhibit_id)">
        <img :src="item.exhibit_list_img" alt />
        <h3>{{item.exhibit_name}}</h3>
        <p>{{item.exhibition_name}}</p>
        <p>
          <span class="look">
            <i class="iconfont iconeyes"></i>
            {{item.look_num}}
          </span>
          <span class="like">
            <i class="iconfont iconthumbs-up"></i>
            {{item.like_num}}
          </span>
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
import Swiper from "swiper";
import { videoPlayer } from "vue-video-player";
export default {
  data() {
    return {
      id: "",
      shareF: false,
      showD: false,
      showV: false,
      api_token: localStorage.api_token ? localStorage.api_token : "",
      services: "",
      is_like: "",
      is_collection: "",
      is_traveled: "",
      content: "",
      link: "",
      title: "",
      addF: true,
      d3: "",
      video_path: "",
      ckip: 0,
      ctake: 4,
      cpage: 0,
      lists: [],
      pageF: true,
      playerOptions: {
        //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
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
            src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //你的视频地址（必填）
          }
        ],
        poster: "", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        debug: true
        //        controlBar: {
        //          timeDivider: true,
        //          durationDisplay: true,
        //          remainingTimeDisplay: false,
        //          fullscreenToggle: true  //全屏按钮
        //        }
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
  inject: ["app"],
  watch: {
    cpage: function(val) {
      this.ckip = val * this.ctake;
      this.getCates(this.id, this.ctake, this.ckip);
    }
  },
  methods: {
    onPlayerPlay(player) {
      // alert("play");
    },
    onPlayerPause(player) {
      // alert("pause");
    },
    go(id) {
      this.$router.push({ path: "/cDetail", query: { id: id } });
      this.getDetail(id);
      this.id = id;
      this.getCates(this.id, 4, 0);
    },
    shareWeibo() {
      var url =
        "http://service.weibo.com/share/share.php?appkey=&title=" +
        this.title +
        "&url=" +
        window.origin +
        "/cDetail?id=" +
        this.id +
        "&searchPic=false&style=simple";
      window.open(url, "_blank");
    },
    pageD() {
      if (this.cpage > 1) {
        this.cpage--;
      }
    },
    pageA() {
      this.cpage++;
    },
    getDetail(id) {
      this.$api.geteInfo(id).then(res => {
        this.services = res.data.exhibit_imgs;
        this.initSwiper();
        this.title = res.data.exhibit_name;
        this.link = window.origin + "/cDetail?id=" + this.id;
        this.content = res.data.content;
        this.is_like = res.data.is_like;
        this.is_traveled = res.data.is_travelled;
        this.d3 = res.data["3d_path"];
        this.video_path = res.data["video_path"];
        if (res.data["video_path"]) {
          this.playerOptions.sources[0].src = res.data["video_path"];
          this.playerOptions.poster = res.data.exhibit_imgs[0].img;
        }
        this.is_collection = res.data.is_collection;
      });
    },
    copyUrl() {
      var oInput = document.createElement("input");
      oInput.value = window.location.href;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      this.$message.success("复制成功");
    },
    initSwiper() {
      setTimeout(() => {
        let swiper = new Swiper(".swiper-container", {
          autoplay: 3000,
          direction: "vertical",
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          }
        });
      }, 500);
    },
    doLike() {
      if (localStorage.api_token == "") {
        this.app.openLogin();
        return false;
      }
      this.$api.doLike(this.id).then(res => {
        if (res.status == 1) {
          if (this.is_like == 0) {
            this.is_like = 1;
          } else {
            this.is_like = 0;
          }
        }
      });
    },
    addT() {
      if (localStorage.api_token == "" || localStorage.api_token == undefined) {
        this.app.openLogin();
        return false;
      }
      if (this.is_traveled == 1) {
        this.$api.cancelTravel(this.id).then(res => {
          if (res.status == 1) {
            this.is_traveled = 0;
          }
        });
      } else {
        this.$api.addTravel(this.id).then(res => {
          if (res.status == 1) {
            this.is_traveled = 1;
          }
        });
      }
    },
    doCollect() {
      if (localStorage.api_token == "") {
        this.app.openLogin();
        return false;
      }
      this.$api.doLike(this.id, 2).then(res => {
        if (res.status == 1) {
          if (this.is_collection == 0) {
            this.is_collection = 1;
          } else {
            this.is_collection = 0;
          }
        }
      });
    },
    getCates(id, take, skip) {
      this.$api.getCates(id, take, skip).then(res => {
        if (res.data.count <= (this.cpage + 1) * 4) {
          this.cpage = 0;
        }
        this.lists = res.data.exhibit;
      });
    },
    visit_exhibit(id) {
      this.$api.visit_exhibit(id).then(res => {});
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getDetail(this.id);
    this.getCates(this.id, 4, 0);
    this.visit_exhibit(this.id);
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
.content-wrapper {
  width: 1200px;
  margin: 22px auto 67px;
  display: flex;
}
.container {
  width: 545px;
  margin-right: 55px;
}
.right {
  flex: 1;
  height: 100%;
  color: #666;
}
.collections,
.topTitle {
  width: 1200px;
  margin: 0 auto;
}
.service {
  width: 545px;
  height: 545px;
  position: relative;
}
.join {
  width: 141px;
  height: 36px;
  background: #d6953b;
  border-radius: 4px;
  line-height: 33px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  position: absolute;
  top: 20px;
  right: 0px;
  cursor: pointer;
  .iconjia {
    font-size: 20px;
  }
  &.gray {
    background: #ccc;
  }
}
.d3,
.video {
  width: 73px;
  height: 82px;
  background: rgba(245, 245, 245, 1);
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 100px;
  z-index: 15;
  font-size: 16px;
  color: #000;
  text-align: center;
  img {
    display: block;
    width: 30px;
    height: auto;
    margin: 15px auto 9px;
  }
}
.video {
  right: 15px;
}
.active {
  width: 65px;
  height: 28px;
  line-height: 28px;
  background: rgba(165, 110, 34, 0.6);
  position: absolute;
  right: 30px;
  bottom: 10px;
  color: #fff;
  font-size: 16px;
  text-align: center;
  border-radius: 14px;
}
.swiper-container {
  width: 546px;
  margin: 0 auto;
  height: 546px;
  overflow: hidden;
}
.service /deep/.swiper-button-prev {
  width: 18px;
  height: 33px;
  background: url(../.././img/home/cl.png) no-repeat;
  background-size: cover;
}
.service /deep/.swiper-button-next {
  width: 18px;
  height: 33px;
  background: url(../.././img/home/cr.png) no-repeat;
  background-size: cover;
}
.swiper-slide {
  width: 546px;
  height: 546px;
}
.swiper-slide img {
  width: 546px;
  height: 546px;
}

.title {
  font-size: 20px;
  color: #402e2a;
  line-height: 30px;
  height: 30px;
  text-align: left;
  margin: 0px auto 20px;
  position: relative;
}
.mask {
  position: fixed;
  z-index: 1210;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  .mask-content {
    width: 1200px;
    height: 751px;
    padding: 10px 50px 55px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 6px;
    transform: translate(-50%, -50%);
    span {
      width: 40px;
      height: 40px;
      position: absolute;
      top: -50px;
      right: -50px;
      background: url(../.././img/nav/close.png) no-repeat;
      background-size: contain;
      cursor: pointer;
    }
    h3 {
      font-size: 20px;
      color: #000;
      margin: 20px 0;
    }
    .mask-d3 {
      width: 100%;
      height: 620px;
      iframe {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.content {
  margin-bottom: 30px;
  margin-top: 20px;
}
.content /deep/ p {
  font-size: 16px;
  letter-spacing: 1px;
  line-height: 30px;
  color: rgba(0, 0, 0, 0.8);
  text-indent: 2em;
}
.btns {
  text-align: left;
  font-size: 16px;
  margin-right: 15px;
  margin-bottom: 20px;
  span {
    display: inline-block;
    text-align: center;
    margin-right: 40px;
    cursor: pointer;
    &:last-child {
      margin-right: 20px;
    }
  }
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
.btns i {
  font-size: 25px;
  display: inline;
  vertical-align: middle;
  &.iconjian1 {
    font-size: 22px;
    font-weight: 400;
  }
}
.btns i.actives {
  color: #e11b1b;
}
.topTitle {
  height: 60px;
  line-height: 40px;
  font-size: 26px;
  border-bottom: 1px solid #a56e22;
  margin-bottom: 20px;
}
.topTitle i.iconzhihuiwenwu {
  display: inline-block;
  font-size: 26px;
  margin-right: 5px;
}
.topTitle .right {
  float: right;
  position: relative;
  padding-right: 25px;
  color: #000;
  font-size: 16px;
  cursor: pointer;
}
.topTitle .hyp {
  width: 23px;
  height: 16px;
  background: url(../.././img/change.png) no-repeat;
  background-size: contain;
  position: absolute;
  top: 35%;
  transform: translateY(-50%);
  right: -5px;
}
.collections {
  overflow: hidden;
}
.collections li {
  width: 290px;
  float: left;
  padding-bottom: 5px;
  margin-bottom: 40px;
  margin-right: 13.3px;
  border-radius: 4px;
  background: #f0f0f0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}
.collections li:nth-child(4n) {
  margin-right: 0;
}
.collections li img {
  width: 290px;
  height: 290px;
}
.collections li h3 {
  font-size: 18px;
  color: #353535;
  margin: 16px 20px 10px;
  overflow: hidden;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.collections li p {
  padding-bottom: 10px;
  font-size: 16px;
  margin: 0 20px;
  overflow: hidden;
  color: #7b7c7d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.look {
  float: left;
  color: #858585;
  font-size: 16px;
  display: block;
  width: 40%;
}
.like {
  float: left;
  color: #858585;
  font-size: 16px;
  display: block;
  width: 40%;
  text-align: right;
}
</style>