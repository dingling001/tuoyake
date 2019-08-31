<template>
  <div class="video">
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
</template>
<script>
import { videoPlayer } from "vue-video-player";
export default {
  name: "video",
  data() {
    return {
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
  mounted() {
    this.playerOptions.sources[0].src = this.$route.query.url;
  },
  methods: {
    onPlayerPlay(player) {
      // alert("play");
    },
    onPlayerPause(player) {
      // alert("pause");
    }
  }
};
</script>
<style lang="scss" scoped>
.video {
  width: 100%;
  height: 100vh;
  position: relative;
  .video-player {
    width: 100%;
    height: 100%;
  }
  /deep/ .video-js.vjs-fluid {
    height: 100%;
  }
  /deep/ .vjs-modal-dialog-content {
    display: none;
  }
  /deep/ .vjs-custom-skin > .video-js .vjs-big-play-button {
    font-size: 15px;
    /*px*/
  }
  /deep/ .video-js:hover .vjs-big-play-button,
  .vjs-custom-skin > .video-js .vjs-big-play-button:focus,
  .vjs-custom-skin > .video-js .vjs-big-play-button:active {
    background-color: #ee8e41;
  }
  /deep/ .vjs-error .vjs-error-display:before {
    content: "资源暂不可播";
    padding: 30px 0;
    font-size: 14px;
    /*px*/
  }
}
</style>