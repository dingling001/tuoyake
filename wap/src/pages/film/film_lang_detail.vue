<template>
  <div class="f_item">
    <div class="v_box">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        id="foo"
        v-if="playerOptions.sources[0].src "
      ></video-player>
      <div v-else style="padding: 50px 0;color: #666;font-size: 16px;">视频加载中……</div>
    </div>
    <div class="movie_content movie_content_auto">{{movie_info.content}}</div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "film_item",
  data() {
    return {
      movie_id: "",
      td_id: "",
      showmore: false,
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
            src: "" //你的视频地址（必填）
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
      },
      movie_info: {
        content: "",
        time_list: []
      },
      index: 0
    };
  },
  created() {
    this.index = this.$route.query.index;
    this.get_CinemaDateMovie();
  },
  methods: {
    // list
    get_CinemaDateMovie() {
      this.$api.LanguageMovieList(localStorage.l).then(res => {
        if (res.status == 1) {
          this.movie_list = res.data.movie_list;
          this.playerOptions.sources[0].src = this.movie_list[this.index].video;
          this.playerOptions.poster = this.movie_list[this.index].img;
          this.movie_info = this.movie_list[this.index];
        } else {
          localStorage.l = 1;
          this.$i18n.locale = "zh";
          localStorage.locale = "zh";
          Toast("正在切换至中文……");
          setTimeout(() => {
            this.$router.replace("/film/film_index");
          }, 3000);
        }
      });
    },
    onPlayerPlay(player) {
      // alert("play");
    },
    onPlayerPause(player) {
      // alert("pause");
    }
  }
};
</script>

<style scoped lang="scss">
.f_item {
  .v_box {
    text-align: center;
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
  .movie_content {
    height: 76px;
    padding: 16px;
    color: #353535;
    text-align: justify;
    line-height: 21px;
    text-indent: 2em;
    font-size: 14px;
    /*px*/
    overflow: hidden;
    transition: height 2s ease-in-out;
    position: relative;
    .movie_mold {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: linear-gradient(
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.2),
        #fff
      );
    }
  }
  .movie_content_auto {
    height: auto;
    transition: height 2s ease-in-out;
  }
  .look_more {
    text-align: center;
    color: #ee8e41;
    font-size: 14px;
    /*px*/
    padding: 10px 0 15px 0;
    .iconfont {
      font-size: 18px;
      /*px*/
    }
  }
  .choose_title {
    margin: 0 13px;
    padding: 10px 0;
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    /*no*/
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    /*px*/
    color: #353535;
    font-weight: bold;
    .btn {
      border: 1px solid #cc974c;
      /*no*/
      color: #cc974c;
      font-size: 12px;
      /*px*/
      border-radius: 11px;
      /*no*/
      padding: 3px 5px;
      font-weight: normal;
      display: inline-block;
    }
  }
  .m_list {
    .nodata {
      font-size: 14px;
      /*px*/
      color: #ccc;
      padding: 10px 0;
      text-align: center;
    }
    margin: 0 13px;
    .m_item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      /*no*/
      .item_l {
        flex: 1;
        .time_box {
          padding: 0 0 8px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 18px;
          /*px*/
          .price {
            font-size: 17px;
            /*px*/
            color: #e8593e;
            span {
              font-size: 14px;
              /*px*/
            }
          }
        }
        .long_time {
          color: rgba(56, 56, 56, 0.6);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          /*px*/
        }
      }
      .item_btn {
        text-align: center;
        color: #cc974c;
        font-size: 14px;
        /*px*/
        background: rgba(218, 155, 66, 0);
        border: 1px solid rgba(204, 151, 76, 1);
        /*no*/
        border-radius: 14px;
        /*no*/
        padding: 8px 18px;
        margin-left: 30px;
      }
      .item_disable {
        opacity: 0.6;
        background-color: #ccc;
        border: 1px solid #f5f5f5;
        color: #fff;
      }
    }
  }
}
</style>
