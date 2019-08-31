<template>
  <div class="f_item">
    <div class="v_box">
      <video-player class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    id="foo"
                    v-if="playerOptions.sources[0].src"
      >
      </video-player>
      <div v-else class="v_box">
        <div class="vimg">
          <img :src="playerOptions.poster "  alt="">
        </div>
      </div>
    </div>
    <div
      :class="['movie_content',showmore?'movie_content_auto':'',movie_info.content.length>10?'':'movie_content_auto']">
      {{movie_info.content}}
      <div class="movie_mold" v-if="!showmore&&movie_info.content.length>10"></div>
    </div>
    <div class="look_more" @click="showmore=!showmore"
         v-if="movie_info.content.length>10&&movie_info.content.length">
      <span v-if="showmore">收起</span>
      <span v-else>查看全部介绍</span>
      <span :class="['iconfont', showmore?'iconyou-copy-copy':' iconyou-copy']"></span>
    </div>
    <div class="choose_title"><span>选择观影场次</span>
      <span class="btn" @click="join_trip" v-if="movie_info.is_trip==0"><span
        class="iconfont iconaddTodo-nav"></span>加入行程单</span>
      <router-link class="btn" v-else tag="span" to="/travel">
        查看行程单
      </router-link>
    </div>
    <div class="m_list" v-if="movie_info.time_list.length>0">
      <div class="m_item" v-for="item in movie_info.time_list ">
        <div class="item_l">
          <div class="time_box"><span>{{item.start_time}}</span><span
            class="price"><span class="adult">成人</span><span class="price_unit">￥</span>{{movie_info.price}}</span>
          </div>
          <div class="long_time"><span>片长：{{movie_info.long_time}}分钟</span><span>余：{{item.surplus_num}}</span>
          </div>
        </div>
        <div :class="['item_btn',item.is_select?'' :'item_disable']"
             @click="buy_ticket(item.film_date_layout_id,item.is_select)">购票
        </div>
      </div>
    </div>
    <div class="m_list" v-else>
      <div class="nodata">暂无场次安排</div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'

  export default {
    name: "film_item",
    data() {
      return {
        movie_id: '',
        td_id: '',
        showmore: false,
        playerOptions: {
//        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4",
            src: "" //你的视频地址（必填）
          }],
          poster: "", //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          debug: true
//        controlBar: {
//          timeDivider: true,
//          durationDisplay: true,
//          remainingTimeDisplay: false,
//          fullscreenToggle: true  //全屏按钮
//        }
        },
        movie_info: {
          content: '',
          time_list: []
        },
        cinema_id: ''
      }
    },
    inject: ['app'],
    created() {
      this.movie_id = this.$route.query.movie_id;
      this.td_id = this.$route.query.td_id;
      this.cinema_id = this.$route.query.cinema_id;
      this.app.setTitle(this.$route.query.movie_name)
      this.get_MovieLayout()
    },
    methods: {
      // 获取信息
      get_MovieLayout() {
        this.$api.MovieLayout(this.cinema_id, this.movie_id, this.td_id).then(res => {
          if (res.status == 1) {
            this.playerOptions.sources[0].src = res.data.video;
            this.playerOptions.poster = res.data.img;
            this.movie_info = res.data;
            this.time_list = res.data.time_list;
            for (let i in this.time_list) {
              this.time_list[i].is_select = true;
              var et = this.time_list[i].end_buy_time
              var stdt = new Date();
              var etdt = new Date(et.replace(/\-/g, "/"));
              if (stdt > etdt) {
                this.time_list[i].is_select = false;
              }
            }
          } else {
            // this.$router.replace('/film/film_index')
          }
        })
      },
      onPlayerPlay(player) {
        // alert("play");
      },
      onPlayerPause(player) {
        // alert("pause");
      },
      // 购票
      buy_ticket(id, is_select) {
        if (is_select) {
          this.$router.push({path: '/film/film_num', query: {film_date_layout_id: id, cinema_id: this.cinema_id}})
        } else {
          Toast('该场次已停止售票')
        }
      },
      // 加入行程单
      join_trip(id) {
        this.$api.AddTrip(localStorage.getItem('app_token'), this.movie_info.movie_id).then(res => {
          this.get_MovieLayout()
        })
      },
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          // //console.log(val)
          // this.$route.meta.title = val.meta.title
        },
        // 深度观察监听
        deep: true,
        immediate: true
      }
    },
  }
</script>

<style scoped lang="scss">
  @import '@/style/mixin.scss';

  .f_item {
    .v_box {
      text-align: center;
      height: 214px;

      .vimg {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        overflow: hidden;
        img{
          height: 100%;
        }
      }

      /deep/ .vjs-modal-dialog-content {
        display: none;
      }

      /deep/ .vjs-custom-skin > .video-js .vjs-big-play-button {
        font-size: 15px;
        /*px*/
      }

      /deep/ .video-js:hover .vjs-big-play-button, .vjs-custom-skin > .video-js .vjs-big-play-button:focus, .vjs-custom-skin > .video-js .vjs-big-play-button:active {
        background-color: $baseClr;
      }

      /deep/ .vjs-error .vjs-error-display:before {
        content: '资源暂不可播';
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
        background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, .2), #fff);
      }
    }

    .movie_content_auto {
      height: auto;
      transition: height 2s ease-in-out;
    }

    .look_more {
      text-align: center;
      color: $baseClr;
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
      border-bottom: 2px solid rgba(0, 0, 0, .2);
      /*no*/
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;
      /*px*/
      color: #353535;
      font-weight: bold;

      .btn {
        border: 1px solid $baseClr;
        /*no*/
        color: $baseClr;
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
        border-bottom: 1px solid rgba(0, 0, 0, .1);
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
              color: $baseClr;
              font-weight: bold;

              .adult {
                color: rgba(53, 53, 53, .5);
                font-weight: normal;
                font-size: 11px;
                /*  px*/
              }

              .price_unit {
                font-size: 14px;
                /*px*/
                font-weight: normal;
              }
            }
          }

          .long_time {
            color: rgba(56, 56, 56, .6);
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 13px;
            /*px*/
          }
        }

        .item_btn {
          text-align: center;
          color: $baseClr;
          font-size: 14px;
          /*px*/
          background: rgba(218, 155, 66, 0);
          border: 1px solid $baseClr;
          /*no*/
          border-radius: 14px;
          /*no*/
          padding: 8px 18px;
          margin-left: 30px;
        }

        .item_disable {
          opacity: .6;
          background-color: #ccc;
          border: 1px solid #f5f5f5;
          color: #fff;
        }
      }
    }
  }
</style>
