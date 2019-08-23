<template>
  <div class="film_confirm_box">
    <div class="nav_hr">
      <div class="nav_text">
        <router-link tag="span" to="/">首页 »</router-link>
        影院影讯
      </div>
    </div>
    <div class="date_step">
      <div class="date_title">
        <div class="date_left">确认订单信息
          <span class="line"></span>
          <span class="dot"></span>
        </div>
        <el-steps :active="film_post.type!=3?4:3" align-center class="date_right">
          <el-step title="选择影片场次">
            <i class="s s1" slot="icon"></i>
          </el-step>
          <el-step title="选择影片类型及数量">
            <i class="s s2" slot="icon"></i>
          </el-step>
          <el-step :title="film_post.type!=3?'选择座位':'确认订单信息'">
            <i class="s s3" slot="icon"></i>
          </el-step>
          <el-step :title="film_post.type!=3?'确认订单信息':'支付'">
            <i class="s s4" slot="icon"></i>
          </el-step>
          <el-step title="支付" v-if="film_post.type!=3">
            <i class="s s5" slot="icon"></i>
          </el-step>
        </el-steps>
      </div>
    </div>
    <div class="film_info">
      <div class="film_head">
        <div class="tips" v-if="film_post.type==3"><span></span>温馨提示：该场次为沉浸式体验影片。</div>
        <div class="tips" v-else><span></span>温馨提示：该场次为非沉浸式体验影片，请选座观影。</div>
        <div class="film_name">{{film_post.movie_name}}</div>
        <div class="film_item">影片时长：{{film_post.long_time}}分钟</div>
        <div class="film_item">放映地址：{{film_post.address}}</div>
        <div class="film_item">日期及场次：{{film_post.movie_date}} 周{{week_list[week]}}
          {{film_post.movie_start_time}}
        </div>
        <div class="film_ticket">
          <div class="film_item left">影片类型：</div>
          <div class="film_item right" >
            <div class="ticket_item" v-for="item in film_post.names" v-if="item">{{item}}</div>
          </div>
        </div>
        <div class="film_item" v-if="film_post.type!=3">座位号： <span>{{film_post.seat_names}}</span></div>
        <div class="film_item" v-else>体验位： <span>体验位 x {{select_num}}</span></div>
      </div>

    </div>
    <div class="confirm_info">
      <!--<div class="tips">温馨提示：请您确认您的订单信息，并在<span class="time">14</span>分钟 内完成付款，如超时系统将自动释放已选座位！</div>-->
      <!--<div class="confirm_buy">-->
      <!--<div class="confirm_item">-->
      <!--<div class="confirm_top">影片</div>-->
      <!--<div class="confirm_bottom">{{film_post.movie_name}}</div>-->
      <!--</div>-->
      <!--<div class="confirm_item">-->
      <!--<div class="confirm_top">日期及场次</div>-->
      <!--<div class="confirm_bottom">{{film_post.movie_date}}  {{film_post.movie_start_time}}</div>-->
      <!--</div>-->
      <!--<div class="confirm_item" style="width: 210px">-->
      <!--<div class="confirm_top">影院</div>-->
      <!--<div class="confirm_bottom">{{film_post.address}}</div>-->
      <!--</div>-->
      <!--<div class="confirm_num">-->
      <!--<div class="confirm_top">票数</div>-->
      <!--<div class="confirm_bottom">{{film_post.seat_names.length}}张</div>-->
      <!--</div>-->
      <!--<div class="confirm_seat">-->
      <!--<div class="confirm_top">座位</div>-->
      <!--<div class="confirm_bottom">-->
      <!--<span v-for="item in film_post.seat_names">{{item}}</span>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <div class="confirm_total">总计：<span class="yuan">￥</span><span class="price">{{film_post.price_total }}</span>
      </div>
      <div class="confirm_order" @click="confirm_fn">立即购票</div>
      <div class="gpxz" v-html="gpxz">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "film_confirm",
    data() {
      return {
        film_date_layout_id: '',
        film_post: {
          names:[],
          price_total:0
        },
        week_list: ["日", "一", "二", "三", "四", "五", "六",],
        week: 0,
        gpxz: '',
        seat_info: {}
      }
    },
    created() {
      this.film_date_layout_id = this.$route.query.film_date_layout_id;
      this.get_CinemaCalendar();
      if (localStorage.getItem('film_post')) {
        this.film_post = JSON.parse(localStorage.getItem('film_post'))
        console.log(this.film_post)
        this.film_post.seat_names = this.film_post.seat_names.join('、');
        // console.log(this.film_post.type)
      } else {
        // this.film_post=
        // this.$router.replace('/film/film_index')
        this.film_date_layout_id = this.$route.query.film_date_layout_id;
        this.get_SeatInfo();
        this.phone = this.$route.query.phone;
      }
    },
    methods: {
      // 获取须知
      get_CinemaCalendar() {
        this.$api.CinemaCalendar().then((res) => {
          if (res.status == 1) {
            this.gpxz = res.data.gpxz;
          }
        })
      },
      // 获取影院信息
      get_SeatInfo() {
        this.$api.SeatInfo(this.film_date_layout_id).then(res => {
          console.log(res)
          this.film_post = res.data;
          this.select_num = this.$route.query.select_num;
          this.film_post.names = JSON.parse(this.$route.query.names);
          this.film_post.price_total = this.$route.query.price_total;
          this.film_post.ticket_class_string=this.$route.query.ticket_class_string;
          this.film_post.seat=this.$route.query.select_num;
          this.film_post.seat_num=this.$route.query.select_num;
          console.log(this.film_post)
        })
      },
      // 立即购票
      confirm_fn() {
        this.$api.CreateFilmOrder(this.film_date_layout_id, localStorage.getItem('api_token'), this.film_post.ticket_class_string, this.film_post.seat, this.film_post.seat_num).then(res => {
          // console.log(res)
          if (res.status == 1) {
            localStorage.removeItem('film_post');
            if (res.data.amount == 0) {
              this.$router.replace({path: '/film/film_success', query: {order_id: res.data.order_id}})

            } else {
              this.$router.replace({path: '/film/film_pay', query: {order_id: res.data.order_id}})
            }
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
            if (res.msg == '存在未支付的订单，请完成支付后再进行购买') {
              setTimeout((res) => {
                this.$router.replace('/umovie')
              }, 2000)
            } else if (res.msg == '座位已被购买，请重新选择') {
              setTimeout((res) => {
                this.$router.go(-1);
              }, 2000)
            } else {
              setTimeout((res) => {
                this.$router.replace({
                  path: '/film/film_index',
                  query: {film_date_layout_id: this.film_date_layout_id}
                })
              }, 2000)
            }

          }
        })
        // this.$router.push({path: '/film/film_pay', query: {}})
      },
    }
  }
</script>

<style scoped lang="scss">
  .film_confirm_box {
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

    .film_info {
      width: 1200px;
      margin: 0 auto;

      .film_head {
        background: rgba(180, 124, 45, .1);
        padding: 18px 0 30px 35px;

        .tips {
          color: #F40A0A;
          font-size: 18px;
          padding: 0 0 14px 0;

          span {
            height: 7px;
            width: 7px;
            display: inline-block;
            border-radius: 7px;
            margin-right: 10px;
            background-color: #F40A0A;

          }
        }

        .film_name {
          font-size: 24px;
          font-weight: bold;
        }

        .film_item {
          padding: 17px 0 0 0;
          color: #040404;
          font-size: 18px;
        }

        .film_ticket {
          overflow: hidden;

          .left {
            float: left;
          }

          .right {
            float: left;
          }

          .ticket_item {
            padding: 0 0 15px 0;

            &:last-child {
              padding: 0;
            }
          }
        }
      }
    }

    .confirm_info {
      width: 1200px;
      margin: 0 auto;

      .gpxz {
        font-size: 14px;
        line-height: 24px;
      }

      .tips {
        padding: 30px 0;
        font-size: 16px;

        .time {
          color: #F01111;
          font-size: 24px;
        }
      }

      .confirm_buy {
        overflow: hidden;

        .confirm_item {
          float: left;
          width: 190px;
          margin: 0 30px 0 0;
          text-align: center;
        }

        .confirm_num {
          width: 60px;
          float: left;
          margin: 0 30px 0 0;
          text-align: center;
        }

        .confirm_seat {
          width: 420px;
          float: left;
          text-align: center;
        }

        .confirm_top {
          padding: 15px 0;
          border-bottom: 2px solid #EFBB72;
          font-weight: bold;
          font-size: 16px;
        }

        .confirm_bottom {
          padding: 10px 0;
          line-height: 25px;
          font-size: 14px;

          span {
            margin-right: 10px;
          }
        }
      }

      .confirm_total {
        margin: 20px 0 85px 0;
        text-align: right;
        color: #55555A;
        font-size: 18px;

        .yuan {
          color: #FF3600;
          font-size: 14px;
          font-weight: bold;
        }

        .price {
          font-size: 26px;
          color: #FF3600;
          font-weight: bold;
        }
      }

      .confirm_order {
        width: 220px;
        margin: 0 auto 90px auto;
        color: #fff;
        border-radius: 24px;
        text-align: center;
        padding: 15px 0;
        font-size: 16px;
        background-color: #C39657;
        cursor: pointer;

        &:active {
          opacity: .7;
        }
      }

      .confirm_notice {
        margin-bottom: 25px;

        &:last-child {
          margin-bottom: 58px;
        }

        .notice_title {
          font-size: 16px;
          margin-bottom: 15px;
        }

        p {
          font-size: 14px;
          padding: 0 0 0 15px;
          line-height: 26px;
        }
      }
    }
  }
</style>
