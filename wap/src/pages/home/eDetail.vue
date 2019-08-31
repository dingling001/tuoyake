<template>
  <div class="container">
    <!-- 主体部分 -->
    <div class="main">
      <div class="item1 item">
        <img :src="$toThumbsimg(detail.exhibition_img,375,151,33,$web)" alt />
        <p>
          {{$t('ename')}}：{{detail.exhibition_name}}
          <br />
          {{$t('edate')}}：{{detail.type==1?"永久":detail.start_date+'-'+detail.end_date}}
        </p>
        <p>
          {{$t('eOpenTime')}}：9:00—17:00（16:00停止入馆，周一闭馆）
          <br />
          {{$t("eaddr")}}：{{detail.exhibition_address}}
          <br />
          {{$t('etype')}}:{{detail.type==1?$t('cexb'):"临时展览"}}
        </p>
      </div>
      <div class="item2" v-if="detail.content!=''">
        <h3 class="title">
          <span :class="{'e-title':$t('news')==''}">{{$t('jexb')}}</span>
        </h3>
        <div class="content" v-html="detail.content"></div>
      </div>
      <!-- <div class="item2 item" v-if="detail.foreword!=''">
        <h3 class="title">{{$t('fword')}}</h3>
        <div class="content" v-html="detail.foreword"></div>
      </div>-->
      <div class="item2" v-if="lists.length>0">
        <h3 class="title">
          <span :class="{'e-title':$t('news')==''}">{{$t('eintro')}}</span>
        </h3>
        <div class="content">
          <div
            class="content-img"
            v-for="(it,i) in lists"
            :key="i"
            @click="goEDetail(it.exhibit_id)"
          >
            <img class="img" :src="it.exhibit_list_img" alt />
            <div class="content-title">
              <span>{{it.exhibit_name}}</span>
            </div>
            <div class="contents" v-html="it.content_lite"></div>
          </div>
        </div>
      </div>
      <!-- <div class="item2 item" v-if="detail.backword!=''">
        <h3 class="title">{{$t('eword')}}</h3>
        <div class="content" v-html="detail.backword"></div>
      </div>-->
      <div class="item item2" v-if="detail.video!=''">
        <h3 class="title">
          <span class="img" v-if="$t('news')">
            <img src="../.././img/home/line_l.png" alt />
          </span>
          <span :class="{'e-title':$t('news')==''}">{{$t('video')}}</span>
          <span class="img" v-if="$t('news')">
            <img src="../.././img/home/line_r.png" alt />
          </span>
        </h3>
        <div class="content">
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
      <div class="hall3" v-if="detail.full_url!=''">
        <a :href="detail.full_url">
          <img src="../.././img/360.png" alt />
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { videoPlayer } from "vue-video-player";
export default {
  name: "home",
  data() {
    return {
      detail: "",
      unit: [],
      lists: [],
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
  inject: ["app"],
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
  components: {
    videoPlayer
  },
  computed: {
    common: function() {
      return this.$t("cexb");
    }
  },
  mounted() {
    var id = this.$route.query.id;
    this.getDetail(id);
    this.getElist(id);
  },

  methods: {
    onPlayerPlay(player) {
      // alert("play");
    },
    onPlayerPause(player) {
      // alert("pause");
    },
    // 跳转展品详情
    goEDetail(id) {
      this.$router.push({ path: "/cDetail", query: { id: id } });
      window.scroll(0, 0);
    },
    getElist(id) {
      this.$api.getElist(id).then(res => {
        if (res.status == 1) {
          this.lists = res.data.exhibit;
        }
      });
    },
    getDetail(id) {
      var that = this;
      this.$api.getEInfo(id).then(res => {
        this.detail = res.data;
        this.playerOptions.sources[0].src = this.detail.video;
        if (res.data.type == 1) {
          this.app.setTitle(this.common);
        } else {
          this.app.setTitle("临时展览");
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
}

.item1 {
  padding-bottom: 20px;
  background: #f5f5f5;
}
.item1 img {
  width: 100%;
  height: 151px;
  display: block;
  margin-bottom: 10px;
}
.item1 p {
  color: #323232;
  font-size: 13px;
  /*px*/
  line-height: 24px;
  text-align: center;
}
.item2 {
  text-align: center;
  padding-top: 25px;
}
.item2:nth-child(odd) {
  background: #f5f5f5;
}
.title {
  color: #000;
  font-size: 18px;
  /*px*/
  height: 20px;
  line-height: 20px;
  margin: 0 auto 10px;
  text-align: center;
}
.content {
  overflow: hidden;
  padding: 10px 0 25px 0;
}
.video-player {
  width: 98%;
  height: 310px;
  margin-bottom: 20px;
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

.content-img {
  width: 100%;
  cursor: pointer;
}
.content-img .img {
  width: 350px;
  height: 350px;
  margin-bottom: 15px;
  margin-top: 15px;
  box-shadow: 5px 5px 5px 0px rgba(9, 2, 4, 0.14);
  border-radius: 4px;
  /*no*/
}
.content-title {
  font-size: 15px;
  /*px*/
  font-weight: 600;
  text-align: left;
  margin: 0 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  box-sizing: content-box;
  color: rgba(0, 0, 0, 1);
  line-height: 24px;
  span {
    display: inline-block;
    padding-bottom: 5px;
  }
}
.content {
  margin: 10px 12px 0;
  padding-bottom: 25px;
  text-align: left;
}
.content /deep/ p,
.contents /deep/ p {
  text-indent: 2em;
  font-size: 13px;
  /*px*/
  line-height: 24px;
  padding: 0 12px;
  color: #000;
}
.item2 /deep/ p {
  font-size: 13px;
  /*px*/
  line-height: 24px;
  text-align: left;
  text-indent: 2em;
}
.hall3 {
  width: 100%;
  height: 125px;
  background: url(../.././img/hall3.png) no-repeat;
  background-size: cover;
}
.hall3 img {
  display: block;
  width: 156px;
  margin: 0px auto;
  padding-top: 35px;
  cursor: pointer;
  height: auto;
}
</style>