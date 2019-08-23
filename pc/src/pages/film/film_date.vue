<template>
  <div class="date_box">
    <div class="nav_hr">
      <div class="nav_text">
        <router-link tag="span" to="/">首页 »</router-link>
        影院影讯
      </div>
    </div>
    <div class="date_step" v-if="tab==0">
      <div class="date_title">
        <div class="date_left">选择影片场次
          <span class="line"></span>
          <span class="dot"></span>
        </div>
        <el-steps :active="1" align-center class="date_right">
          <el-step title="选择影片场次">
            <i class="s s1" slot="icon"></i>
          </el-step>
          <el-step title="选择影片类型及数量">
            <i class="s s2" slot="icon"></i>
          </el-step>
          <el-step :title="type!=3?'选择座位':'确认订单信息'">
            <i class="s s3" slot="icon"></i>
          </el-step>
          <el-step :title="type!=3?'确认订单信息':'支付'">
            <i class="s s4" slot="icon"></i>
          </el-step>
          <el-step title="支付" v-if="type!=3">
            <i class="s s5" slot="icon"></i>
          </el-step>
        </el-steps>
      </div>
    </div>
    <div class="film_box">
      <div class="video_box">
        <video-player class="video-player vjs-custom-skin"
                      ref="videoPlayer"
                      :playsinline="true"
                      :options="playerOptions"
                      @play="onPlayerPlay($event)"
                      @pause="onPlayerPause($event)"
                      id="foo"
        >
        </video-player>
      </div>
      <div class="film_intro">影片介绍：</div>
      <div class="film_content_box" v-if="movie_info.content">
        <div :class="['film_content',showall?'film_a':'film_b' ] " v-html="movie_info.content">
        </div>
        <div class="hidden_btn" @click="showall=!showall" v-if="movie_info.content.length>200">
          {{showall?'收起':'展开'}}<span
          :class="['iconfont',showall?'iconshouqi':'iconzhankai']"></span></div>
      </div>
      <div class="film_info">
        <div>影片时长：{{movie_info.long_time}}分钟</div>
        <div>放映地址：{{movie_info.address}}</div>
        <div>票<span style="color: #fff;user-select: none">映地</span>价：￥{{movie_info.price}}/张</div>
      </div>
      <div class="film_intro" v-if="tab==0">选择日期：</div>
      <div class="date_box" v-if="tab==0">
                <span :class="['date_item',index==ind?'active_date_item':'',item.time_list==0?'isdisable':'']"
                      v-for="(item,index) in ticket_date_info" :title="item.time_list==0?'闭馆':''"
                      @click="choose_date(index)" v-if="ticket_date_info.length">{{item.t_date.split('-')[1]}}月{{item.t_date.split('-')[2]}}日
                    <span class="icon_box" v-if="index==ind"><span class="iconfont iconxuanzhong-copys"></span></span>
                </span>
      </div>
      <div class="film_intro" v-if="tab==0">选择场次：</div>
      <div class="time_box" v-if="tab==0">
                <span
                  :class="['time_item',index==tind?'active_date_item':'',item.is_select||item.surplus_num==0?'':'isdisable']"
                  v-for="(item ,index) in time_list"
                  @click="choose_time(index)" v-if="time_list.length" :title="'余'+item.surplus_num">{{item.start_time}}
                 <span class="icon_box" v-if="index==tind"><span class="iconfont iconxuanzhong-copys"></span></span>
                </span>
      </div>
      <div class="buy_ticket" @click="buy_fn" v-if="tab==0">购票</div>
    </div>
  </div>
</template>

<script>
  import {videoPlayer} from 'vue-video-player';

  export default {
    name: "film_date",
    data() {
      return {
        showall: false,
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
            src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //你的视频地址（必填）
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
        ind: -1,
        tind: -1,
        movie_id: '',
        tab: 0,
        movie_info: {},
        ticket_date_info: {},
        time_list: [],
        cinema_id: '',
        type:''
      }
    },
    inject: ["app"],
    components: {
      videoPlayer
    },
    created() {
      this.movie_id = this.$route.query.movie_id;
      this.cinema_id = this.$route.query.cinema_id;
      this.tab = this.$route.query.tab;
      this.type=this.$route.query.type;
      if (this.tab == 0) {
        this.get_MovieInfo()
      } else if (this.tab == 1) {
        this.get_JjsyMovieInfo()
      }
    },
    methods: {
      // 获取详情
      get_MovieInfo() {
        this.$api.MovieInfo(this.movie_id, this.cinema_id).then(res => {
          //console.log(res)
          this.playerOptions.sources[0].src = res.data.movie_info.video;
          this.playerOptions.poster = res.data.movie_info.img;
          this.movie_info = res.data.movie_info;
          this.ticket_date_info = res.data.ticket_date_info;
          // this.time_list = res.data.ticket_date_info[0].time_list;
          // for(let i in this.time_list){
          //     this.time_list[i].is_select=true;
          //     var et=this.time_list[i].end_buy_time
          //     var stdt=new Date();
          //     var etdt=new Date(et.replace("-","/"));
          //     if(stdt>etdt){
          //         this.time_list[i].is_select=false;
          //     }
          // }
        })
      },
      // 获取待上映详情
      get_JjsyMovieInfo() {
        this.$api.JjsyMovieInfo(this.movie_id).then(res => {
          //console.log(res)
          this.playerOptions.sources[0].src = res.data.video;
          this.playerOptions.poster = res.data.img;
          this.movie_info = res.data;
        })
      },
      onPlayerPlay(player) {
        // alert("play");
      },
      onPlayerPause(player) {
        // alert("pause");
      },
      // 选择日期
      choose_date(index) {
        if (this.ticket_date_info[index].time_list.length != 0) {
          this.time_list = this.ticket_date_info[index].time_list;
          this.ind = index;
          this.tind = -1;
          for (let i in this.time_list) {
            this.time_list[i].is_select = true;
            var et = this.time_list[i].end_buy_time
            var stdt = new Date();
            var etdt = new Date(et.replace("-", "/"));
            if (stdt > etdt) {
              this.time_list[i].is_select = false;
            }
          }
        }
      },
      // 选择时间
      choose_time(index) {
        if (this.time_list[index].is_select) {
          this.tind = index;
          // let ind = this.ind == -1 ? 0 : this.ind;
          // //console.log(this.ticket_date_info[ind].time_list[index].film_date_layout_id)
        }
      },
      // 购票
      buy_fn() {
        if (this.ind < 0) {
          this.$message({
            message: '请选择日期',
            type: 'error'
          });
        } else if (this.tind < 0) {
          this.$message({
            message: '请选择时间',
            type: 'error'
          });
        } else {
          // let date_id = this.ind;
          // let time_id = this.tind;
          var film_date_layout_id = this.ticket_date_info[this.ind].time_list[this.tind].film_date_layout_id;
          this.$api.SeatInfo(film_date_layout_id).then(res => {
            if (res.status == 1) {
              if(res.data.allow_order_num<=0){
                this.$message({
                  message: '当天超过可购票数量',
                  type: 'error'
                });
              }else{
                this.$router.push({
                  path: '/film/film_num',
                  query: {film_date_layout_id: film_date_layout_id,cinema_id:this.cinema_id}
                })
              }
            } else if (res.status == 405) {
              this.app.openLogin();
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              });
            }
          })
        }
      },
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    }
  }
</script>

<style scoped lang="scss">
  .nav_hr {
    background-color: #E7E7E7;
    height: 75px;
    line-height: 75px;

    .nav_text {
      width: 1200px;
      margin: 0 auto;
      font-size: 18px;

      span {
        cursor: pointer;

        &:hover {
          color: #DA9B42;
        }
      }
    }
  }

  .date_step {
    width: 1200px;
    margin: 20px auto 0 auto;
    padding: 30px 0;
    border-bottom: 5px solid rgba(180, 124, 45, .3);

    .date_title {
      overflow: hidden;

      .date_left {
        float: left;
        font-size: 24px;
        color: #000;
        padding: 0 0 27px 0;
        position: relative;

        .line {
          position: absolute;
          bottom: 0;
          width: 60px;
          height: 5px;
          left: 0;
          background-color: #000;
          border-radius: 2px;
          z-index: 1;
          display: block;
        }

        .dot {
          display: block;
          width: 7px;
          height: 5px;
          border-radius: 3px;
          background-color: #000;
          left: 70px;
          bottom: 0;
          z-index: 1;
          position: absolute;
        }
      }

      .date_right {
        float: right;
        width: 70%;
        color: #000;
        margin-right: -60px;

        /deep/ .el-step__title {
          font-size: 16px;
          color: #000;
        }

        /deep/ .el-step__title.is-finish {
          color: #B47C2D;
        }

        /deep/ .el-step__title.is-process {
          font-weight: normal;
        }

        /deep/ .is-finish .s1 {
          background-image: url("../../img/ticket/01.png");
        }

        /deep/ .is-finish .s2 {
          background-image: url("../../img/ticket/02.png");
        }

        /deep/ .is-finish .s3 {
          background-image: url("../../img/ticket/03.png");
        }

        /deep/ .is-finish .s4 {
          background-image: url("../../img/ticket/04.png");
        }

        /deep/ .is-finish .s5 {
          background-image: url("../../img/tickets/05.png");
        }

        /deep/ .el-step__icon {
          width: 53px;
          height: 53px;
          background-color: #fff;
          overflow: hidden;
          border-style: hidden;
        }

        /deep/ .el-step.is-horizontal .el-step__line {
          top: 25px;
          border-color: #A0A0A0;
          z-index: -1;
        }

        .s {
          width: 50px;
          height: 50px;
          margin: 0 5px;
          background-color: #fff;
          display: inline-block;
          background-repeat: no-repeat;
          background-size: 100% auto;
          background-position: center center;
        }

        .s1 {
          background-image: url("../../img/ticket/1.png");
        }

        .s2 {
          background-image: url("../../img/ticket/2.png");
        }

        .s3 {
          background-image: url("../../img/ticket/3.png");
        }

        .s4 {
          background-image: url("../../img/ticket/4.png");
        }

        .s5 {
          background-image: url("../../img/tickets/5.png");
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

      .film_b::after {
        content: "...";
        color: #fff;
        position: absolute;
        bottom: 0;
        right: 0;
        padding-left: 100px;
        background: -webkit-linear-gradient(left, transparent, #fff 55%);
        background: -o-linear-gradient(right, transparent, #fff 55%);
        background: -moz-linear-gradient(right, transparent, #fff 55%);
        background: linear-gradient(to right, transparent, #fff 55%)
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
          color: #B47C2D;
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
        border: 2px solid rgba(0, 0, 0, .5);
        margin: 0 17px 17px 0;
        cursor: pointer;
        position: relative;
        user-select: none;

        &:nth-child(10) {
          margin: 0 0 17px 0;
        }

        &:hover {
          border-color: #DA9B42;
          color: #DA9B42;
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
            color: #DA4453;
            font-size: 25px;
          }
        }
      }

      .isdisable {
        opacity: .5;
        cursor: not-allowed;

        &:hover {
          color: #55555A;
          border: 2px solid rgba(0, 0, 0, .5);
        }
      }

      .active_date_item {
        background-color: #DA9B42;
        color: #fff;
        border-color: #DA9B42;

        &:hover {
          border-color: #DA9B42;
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
        color: #55555A;
        border: 1px solid rgba(0, 0, 0, .5);
        cursor: pointer;
        margin: 0 25px 10px 0;
        position: relative;

        &:hover {
          border-color: #DA9B42;
          color: #DA9B42;
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
            color: #DA4453;
            font-size: 25px;
          }
        }

      }

      .isdisable {
        opacity: .5;
        cursor: not-allowed;

        &:hover {
          color: #55555A;
          border: 1px solid rgba(0, 0, 0, 0.5);
        }
      }

      .active_date_item {
        background-color: #DA9B42;
        color: #fff;
        border-color: #DA9B42;

        &:hover {
          border-color: #DA9B42;
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
      background-color: #C39657;

      &:active {
        opacity: .7;
      }
    }
  }
</style>
