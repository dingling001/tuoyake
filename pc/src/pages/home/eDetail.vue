<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">{{$t('navs[0].name')}}</a>»
        <a href="javaScript:;" @click="go">{{$t('navs[4].name')}}</a>
        »
        <a href="javaScript:;">{{detail.type=='1'?$t('cexb'):"临时展览"}}</a>
      </div>
    </div>

    <div class="container">
      <!-- 主体部分 -->
      <div class="main">
        <div class="item1 item">
          <img :src="detail.exhibition_img" alt />
          <p style="margin-top:45px;">
            {{$t('ename')}}：{{detail.exhibition_name}}
            <br />
            {{$t('edate')}}：{{detail.type==1?$t('longtime'):detail.start_date+'-'+detail.end_date}}
          </p>
          <p>
            {{$t('eOpenTime')}}：{{$t('opens')}}
            <br />
            {{$t('eaddr')}}：{{detail.exhibition_address}}
            <br />
            {{$t('etype')}}:{{detail.type==1?$t('cexb'):"临时展览"}}
          </p>
        </div>
        <div class="item2" v-if="detail.content!=''">
          <h3 class="title">{{$t('eintroS')}}</h3>
          <div class="content" v-html="detail.content"></div>
        </div>
        <!-- <div class="item2 item" v-if="detail.foreword!=''">
          <h3 class="title">{{$t('fword')}}</h3>
          <div class="content" v-html="detail.foreword"></div>
        </div>-->
        <div class="item2" v-if="lists.length>0">
          <h3 class="title">{{$t('eintro')}}</h3>
          <div class="content">
            <div
              class="content-img"
              v-for="(it,i) in lists"
              :key="i"
              @click="goEDetail(it.exhibit_id)"
            >
              <img class="img" :src="it.exhibit_list_img" alt />
              <div class="content-title">{{it.exhibit_name}}</div>
              <div class="contents" v-html="it.content_lite"></div>
            </div>
          </div>
        </div>
        <!-- <div class="item2 item" v-if="detail.backword!=''">
          <h3 class="title">{{$t('eword')}}</h3>
          <div class="content" v-html="detail.backword"></div>
        </div>-->
        <div class="item item2" v-if="detail.video!=''">
          <h3 class="title">{{$t('video')}}</h3>
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
            src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //你的视频地址（必填）
          }
        ],
        poster: "", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        debug: true
      }
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
  components: {
    videoPlayer
  },
  mounted() {
    var id = this.$route.query.id;
    this.getDetail(id);
    this.getElist(id);
  },
  methods: {
    // 跳转媒体报道
    go() {
      this.$router.push("/exb");
    },
    onPlayerPlay(player) {
      // alert("play");
    },
    onPlayerPause(player) {
      // alert("pause");
    },
    goEDetail(id) {
      this.$router.push({ path: "/cDetail", query: { id: id } });
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
        this.playerOptions.sources[0].src = res.data.video;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
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
div.container {
  position: relative;
  z-index: 3;
}
.item1 {
  padding-bottom: 60px;
}
.item {
  background: rgba(150, 182, 167, 0.2);
}
.item1 img {
  width: 100%;
  height: 782px;
  display: block;
}
.item1 p {
  color: #323232;
  font-size: 20px;
  line-height: 36px;
  text-align: center;
}
.item2 {
  text-align: center;
  padding-top: 77px;
  padding-bottom: 40px;
}
.title {
  color: #000;
  font-size: 30px;
  height: 30px;
  line-height: 30px;
  margin: 0 auto 45px;
  text-align: center;
  position: relative;
  width: fit-content;
}
.title:after {
  content: "";
  position: absolute;
  top: 50%;
  right: -380px;
  width: 350px;
  height: 2px;
  background: -webkit-gradient(
    linear,
    right top,
    left top,
    color-stop(50%, transparent),
    to(#000)
  );
  background: linear-gradient(right, transparent 50%, #000 100%);
}
.title:before {
  content: "";
  position: absolute;
  top: 50%;
  left: -380px;
  width: 350px;
  height: 2px;
  background: -webkit-gradient(
    linear,
    right top,
    left top,
    color-stop(50%, transparent),
    to(#000)
  );
  background: linear-gradient(right, transparent 50%, #000 100%);
  transform: rotate(180deg);
}
.content {
  margin-bottom: 44px;
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
video {
  width: 1200px;
  height: 675px;
  margin-bottom: 40px;
}
.content-img {
  width: 580px;
  float: left;
  cursor: pointer;
}
.content-img:nth-child(odd) {
  margin-right: 40px;
}
.content-img .img {
  width: 580px;
  height: 580px;
  margin-bottom: 30px;
  box-shadow: 9px 10px 10px 0px rgba(9, 2, 4, 0.14);
}
.content-title {
  font-size: 20px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  text-align: left;
  margin: 0 20px;
  padding-bottom: 5px;
  box-sizing: content-box;
  border-bottom: 2px solid #c0bfc0;
  color: rgba(0, 0, 0, 1);
  line-height: 36px;
}
.contents {
  margin: 10px 20px;
  padding-bottom: 50px;
  text-align: left;
}
.contents /deep/ p {
  text-indent: 2em;
  font-size: 16px;
  line-height: 24px;
  color: #000;
}
.item2 /deep/ p {
  font-size: 16px;
  line-height: 24px;
  text-align: left;
  text-indent: 2em;
}
.hall3 {
  width: 100%;
  height: 250px;
  background: url(../.././img/hall3.png) no-repeat;
  background-size: cover;
}
.hall3 img {
  display: block;
  width: 313px;
  margin: 0px auto;
  padding-top: 75px;
  cursor: pointer;
  height: auto;
}
</style>