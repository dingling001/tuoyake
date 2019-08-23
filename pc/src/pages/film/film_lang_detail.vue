<template>
  <div class="date_box">
    <div class="nav_hr">
      <div class="nav_text">
        <router-link tag="span" to="/">{{$t('navs')[0].name}} »</router-link>
        {{$t('movie')}}
      </div>
    </div>
    <div class="film_box">
      <div class="video_box">
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
      <div class="film_intro">{{$t('brief')}}：</div>
      <div class="film_content_box" v-if="movie_info.content">
        <div class="film_content film_a" v-html="movie_info.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";

export default {
  name: "film_date",
  data() {
    return {
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
      },
      index: 0,
      movie_info: {}
    };
  },
  components: {
    videoPlayer
  },
  created() {
    this.index = this.$route.query.index;
    this.get_CinemaDateMovie();
  },
  methods: {
    get_CinemaDateMovie() {
      this.$api.LanguageMovieList(localStorage.l).then(res => {
        if (res.status == 1) {
          console.log(res.data.movie_list);
          this.playerOptions.sources[0].src =
            res.data.movie_list[this.index].video;
          this.playerOptions.poster = res.data.movie_list[this.index].img;
          this.movie_info = res.data.movie_list[this.index];
        } else {
          localStorage.l = 1;
          this.$i18n.locale = "zh";
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
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  }
};
</script>

<style scoped lang="scss">
.nav_hr {
  background-color: #e7e7e7;
  height: 75px;
  line-height: 75px;

  .nav_text {
    width: 1200px;
    margin: 0 auto;
    font-size: 18px;

    span {
      cursor: pointer;

      &:hover {
        color: #da9b42;
      }
    }
  }
}
.film_box {
  width: 1200px;
  margin: 0 auto;
  padding: 0 0 100px 0;

  .video_box {
    width: 1098px;
    margin: 0 auto;
    padding: 36px 0 0 0;
  }

  .film_intro {
    font-size: 18px;
    padding: 30px 0 15px 0;
    font-weight: bold;
  }

  .film_content_box {
    position: relative;

    .film_content {
      font-size: 16px;
      line-height: 24px;
      text-align: justify;
      text-indent: 2em;
      height: 72px;
      overflow: hidden;
      /*text-overflow: ellipsis;*/
      /*display: -webkit-box;*/
      /*-webkit-line-clamp: 3;*/
      /*-webkit-box-orient: vertical;*/
      /*overflow: hidden;*/
      position: relative;
    }

    .film_a {
      height: auto;
    }

    .hidden_btn {
      position: absolute;
      right: -5px;
      bottom: 5px;
      cursor: pointer;

      .iconfont {
        color: #b47c2d;
      }

      .iconshouqi {
        font-size: 13px;
        margin-left: 10px;
      }
    }
  }

  .film_info {
    padding: 20px 0;
    font-size: 16px;
    line-height: 28px;
  }

  .date_box {
    overflow: hidden;
    margin: 0 20px;

    .date_item {
      width: 8.5%;
      display: block;
      float: left;
      text-align: center;
      height: 54px;
      line-height: 54px;
      border: 2px solid rgba(0, 0, 0, 0.5);
      margin: 0 17px 17px 0;
      cursor: pointer;
      position: relative;
      user-select: none;

      &:nth-child(10) {
        margin: 0 0 17px 0;
      }

      &:hover {
        border-color: #da9b42;
        color: #da9b42;
      }

      .icon_box {
        position: absolute;
        right: 7px;
        bottom: 4px;
        z-index: 2;
        height: 16px;
        width: 16px;
        text-align: center;
        line-height: 20px;

        .iconxuanzhong-copys {
          color: #da4453;
          font-size: 25px;
        }
      }
    }

    .isdisable {
      opacity: 0.5;
      cursor: not-allowed;

      &:hover {
        color: #55555a;
        border: 2px solid rgba(0, 0, 0, 0.5);
      }
    }

    .active_date_item {
      background-color: #da9b42;
      color: #fff;
      border-color: #da9b42;

      &:hover {
        border-color: #da9b42;
        color: #fff;
      }
    }
  }

  .time_box {
    overflow: hidden;
    margin: 0 20px;

    .time_item {
      width: 166px;
      float: left;
      text-align: center;
      height: 40px;
      line-height: 40px;
      color: #55555a;
      border: 1px solid rgba(0, 0, 0, 0.5);
      cursor: pointer;
      margin: 0 25px 10px 0;
      position: relative;

      &:hover {
        border-color: #da9b42;
        color: #da9b42;
      }

      .icon_box {
        position: absolute;
        right: 8px;
        bottom: 5px;
        z-index: 2;
        height: 16px;
        width: 16px;
        text-align: center;
        line-height: 20px;

        .iconxuanzhong-copys {
          color: #da4453;
          font-size: 25px;
        }
      }
    }

    .isdisable {
      opacity: 0.5;
      cursor: not-allowed;

      &:hover {
        color: #55555a;
        border: 1px solid rgba(0, 0, 0, 0.5);
      }
    }

    .active_date_item {
      background-color: #da9b42;
      color: #fff;
      border-color: #da9b42;

      &:hover {
        border-color: #da9b42;
        color: #fff;
      }
    }
  }

  .buy_ticket {
    width: 387px;
    margin: 80px auto 0 auto;
    border-radius: 32px;
    cursor: pointer;
    padding: 15px 0;
    font-size: 18px;
    text-align: center;
    color: #fff;
    background-color: #c39657;

    &:active {
      opacity: 0.7;
    }
  }
}
</style>
