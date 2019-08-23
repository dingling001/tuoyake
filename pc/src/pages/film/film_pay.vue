<template>
  <div class="film_pay_box">
    <div class="nav_hr">
      <div class="nav_text">
        <router-link tag="span" to="/">首页 »</router-link>
        影院影讯
      </div>
    </div>
    <div class="date_step">
      <div class="date_title">
        <div class="date_left">支付
          <span class="line"></span>
          <span class="dot"></span>
        </div>
        <el-steps :active="5" align-center class="date_right">
          <el-step title="选择影片场次">
            <i class="s s1" slot="icon"></i>
          </el-step>
          <el-step title="选择影片类型及数量">
            <i class="s s2" slot="icon"></i>
          </el-step>
          <el-step title="选择座位">
            <i class="s s3" slot="icon"></i>
          </el-step>
          <el-step title="确认订单信息">
            <i class="s s4" slot="icon"></i>
          </el-step>
          <el-step title="支付">
            <i class="s s5" slot="icon"></i>
          </el-step>
        </el-steps>
      </div>
    </div>
    <div class="film_pay_info">
      <div class="tips">温馨提示：请在<span class="time"><span>{{m>=10?m:'0'+m}}:{{s>=10?s:'0'+s}}</span></span>内完成支付，超时订单会自动取消
      </div>
      <div class="order_num">订单编号<span class="num">{{orderInfo.order_no}}</span></div>
      <div class="order_num">订单金额<span class="price">￥</span><span class="order_money">{{orderInfo.amount}}</span>
      </div>
      <div class="order_pay">
        <div class="order_title"><span></span>付款方式</div>
        <div class="order_pay_box">
          <div :class="['order_item', 'wechat', wechat_status?'checked_order':'']" @click="wepay">
                        <span class="icon_box" v-if="wechat_status"><span
                          class="iconfont iconxuanzhong-copys"></span></span>
          </div>
          <!--<div :class="['order_item', 'alipay', alipay_status?'checked_order':'']" @click="alipay">-->
          <!--<span class="icon_box" v-if="alipay_status"><span-->
          <!--class="iconfont iconxuanzhong-copys"></span></span>-->
          <!--</div>-->
        </div>
      </div>
      <div class="pay_btn_box">
        <div class="pay_btn" v-if="order_status==1" @click="pay_fn">去付款</div>
        <div class="pay_btn" v-else-if="order_status==2" @click="pay_fn">已支付</div>
        <div class="pay_btn" v-else-if="order_status==3">已取消</div>
        <div class="pay_btn" v-else-if="order_status==4">已完成</div>

      </div>
      <div class="gpxz" v-html="gpxz"></div>
      <!--            <div class="confirm_notice">-->
      <!--                <div class="notice_title"> 1、购票须知</div>-->
      <!--                <p>1) 3D影院位于国家海洋博物馆场馆X楼，观看电影须购国家海洋博物馆参观票入馆观看。</p>-->
      <!--                <p>2) 电影票预售期为X天，数量有限，售完为止。</p>-->
      <!--                <p>3) 所购电影票以官网公布的预售场次为准。</p>-->
      <!--                <p>4) 一个手机号可以购买5张电影票，儿童全票（含婴幼儿）。</p>-->
      <!--                <p>5) 孕妇、心脏病、高血压患者及婴幼儿不建议观影。</p>-->
      <!--                <p>6) 电影开场前30分钟停止售票。</p>-->
      <!--            </div>-->
      <!--            <div class="confirm_notice">-->
      <!--                <div class="notice_title">2、检票说明</div>-->
      <!--                <p>网上购票观众必须取票后凭纸质电影票至影院检票入场。</p>-->
      <!--            </div>-->
      <!--            <div class="confirm_notice">-->
      <!--                <div class="notice_title">3、电影票改签</div>-->
      <!--                <p>1）如遇特殊情况无法正常观影，可将电影票进行改签操作，需凭购票信息或已取的电影票至人工服务台进行改签。每张电影票只能改签1次。</p>-->
      <!--            </div>-->
      <!--            <div class="confirm_notice">-->
      <!--                <div class="notice_title">4、退票说明</div>-->
      <!--                <p>1) 预售电影票在未使用的情况下，可于开场前30分钟在网上平台申请退款。</p>-->
      <!--                <p>2) 如遇超过网上退票期限等其它特殊情况，需在电影开场前30分钟凭本人购票时预留的信息至国家海洋博物馆售票窗口现场申请人工退票。</p>-->
      <!--                <p>3) 申请退款成功后，退款会在预约观影日之后10个工作日内原路退回至付款的账户。</p>-->
      <!--            </div>-->
    </div>
    <div class="mold" v-if="pay_mold" @click="pay_mold=false">
      <div class="wechat_item">
        <div class="title_box">
          <div class="icon_wepay" v-if="wechat_status"><span class="iconfont iconweixin1"></span> 微信支付</div>
          <div class="icon_wepay" v-if="alipay_status"><span class="iconfont iconzhifubao"></span> 支付宝支付</div>
          <div class="iconfont iconx" @click.stop="pay_mold=false"></div>
        </div>
        <div class="code_box">
          <qrcode :value="qrcode" :options="{ size: 160 }"></qrcode>
        </div>
        <div class="pay_text" v-if="wechat_status"> 微信扫描</div>
        <div class="pay_text" v-if="alipay_status"> 支付宝扫描</div>
        <div class="pay_text">二维码完成支付</div>
        <div class="pay_money"><span class="price">￥</span><span class="price_num">{{orderInfo.amount}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import countDown from '@/components/countDown.vue'

  export default {
    name: "film_pay",
    data() {
      return {
        wechat_status: false,
        alipay_status: false,
        pay_mold: false,
        order_id: '',
        orderInfo: {},
        m: '',
        s: '',
        order_status: '',
        qrcode: '',
        pay_status: false,
        orderTime: null,
        gpxz: ''
      }
    },
    created() {
      this.get_CinemaCalendar()
      this.order_id = this.$route.query.order_id;
      this.get_FilmOrderInfo();
      this.get_FilmOrderStatus()
    },
    // beforeDestroy() {
    //     //console.log(1111110)
    //     clearInterval(this.orderTime);
    //     this.orderTime = null;
    // },
    methods: {
      // 获取订单详情
      get_FilmOrderInfo() {
        let that = this;
        this.$api.FilmOrderInfo(localStorage.getItem('api_token'), this.order_id).then(res => {
          this.orderInfo = res.data;
          var add_time = Date.parse(new Date(res.data.created_at));
          var end_time = Date.parse(new Date());
          var minutes = parseInt(
            ((end_time - add_time) % (1000 * 60 * 60)) / (1000 * 60)
          );
          var hours = parseInt(
            ((end_time - add_time) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          var seconds = parseInt(((end_time - add_time) % (1000 * 60)) / 1000);
          if (minutes <= 15 && hours < 1) {
            that.m = 14 - minutes;
            that.s = 60 - seconds;
            that.add();
          } else {
            that.m = 0;
            that.s = 0;
          }
        })
      },
      // 选择微信支付
      wepay() {
        this.wechat_status = !this.wechat_status;
        this.alipay_status = false
      },
      // 选择支付宝支付
      alipay() {
        this.alipay_status = !this.alipay_status;
        this.wechat_status = false
      },
      // 去付款
      pay_fn() {
        let that = this;
        if (!that.alipay_status && !that.wechat_status) {
          that.$message({
            message: '请选择支付方式',
            type: 'warning'
          });
        } else if (that.wechat_status && !that.alipay_status) {
          that.pay_mold = true;
          that.$api.FilmPayOrder(localStorage.getItem('api_token'), 1, that.order_id).then(res => {
            if (res.status == 1) {
              that.qrcode = res.data.qrcode;
              that.orderTime = setInterval(() => {
                that.get_FilmOrderStatus()
              }, 1000)
              this.$once('hook:beforeDestroy', function () {
                clearInterval(that.orderTime)
              })
            }
          });
        } else if (!this.wechat_status && this.alipay_status) {
          this.pay_mold = true;
          //console.log('支付宝支付')
        }
      },
      // 获取订单状态
      get_FilmOrderStatus() {
        this.$api.FilmOrderStatus(localStorage.getItem('api_token'), this.order_id).then(res => {
          if (res.status == 1) {
            this.order_status = res.data.order_status;
            if (res.data.order_status == 2) {
              this.$message({
                message: '支付成功！',
                type: 'success'
              });
              clearInterval(this.orderTime);
              setTimeout(() => {
                this.$router.push({
                  path: '/film/film_success',
                  query: {order_sn: this.orderInfo.order_no}
                })
              }, 1500)
            } else if (res.data.order_status == 1) {

            } else {
              setTimeout(() => {
                this.$router.push({path: '/film/film_index'})
              }, 1500)
            }
          }
        })
      },
      // 倒计时
      add() {
        var _this = this;
        var time = window.setInterval(function () {
          if (_this.s === 0 && _this.m !== 0) {
            _this.s = 59;
            _this.m -= 1;
          } else if (_this.m === 0 && _this.s === 0) {
            _this.s = 0;
            window.clearInterval(time);
          } else {
            _this.s -= 1;
          }
        }, 1000);
      },
      num: function (n) {
        return n < 10 ? '0' + n : '' + n
      },
      // 获取须知
      get_CinemaCalendar() {
        this.$api.CinemaCalendar().then((res) => {
          if (res.status == 1) {
            this.gpxz = res.data.gpxz;
          }
        })
      }
    },
    components: {
      countDown
    },
    watch: {
      s: {
        handler(newVal) {
          this.num(newVal)
        }
      },
      m: {
        handler(newVal) {
          this.num(newVal)
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  .film_pay_box {
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

    .film_pay_info {
      width: 1200px;
      margin: 0 auto;

      .gpxz {
        line-height: 24px;
        padding: 0 0 50px 0;
       /deep/ p{
          font-size: 14px;
        }
      }

      .tips {
        padding: 30px 0;
        font-size: 16px;

        .time {
          color: #FF3600;
          font-size: 24px;
        }
      }

      .order_num {
        padding: 0 0 20px 0;
        font-size: 16px;

        .num {
          margin-left: 30px;
        }

        .price {
          font-size: 14px;
          color: #FF3600;
          font-weight: bold;
          margin-left: 30px;
        }

        .order_money {
          font-size: 26px;
          color: #FF3600;
          font-weight: bold;
        }
      }

      .order_pay {
        padding: 35px 55px;
        border-top: 2px rgba(0, 0, 0, .3) dashed;
        border-bottom: 5px solid rgba(180, 124, 45, .3);

        .order_title {
          font-size: 20px;
          line-height: 1;

          span {
            height: 10px;
            width: 10px;
            border-radius: 50%;
            background-color: #000;
            margin-right: 10px;
            display: inline-block;
          }
        }

        .order_pay_box {
          overflow: hidden;
          margin: 28px 0 0 0;

          .order_item {
            background-position: center;
            width: 189px;
            height: 63px;
            background-repeat: no-repeat;
            float: left;
            position: relative;
            border: 1px solid rgba(136, 157, 186, .5);
            margin-right: 36px;
            cursor: pointer;

            .icon_box {
              position: absolute;
              right: 0;
              bottom: 0;
              z-index: 2;
              height: 26px;
              width: 25px;
              text-align: center;
              line-height: 30px;

              .iconxuanzhong-copys {
                color: #DA4453;
                font-size: 25px;
              }
            }
          }

          .wechat {
            background-image: url("../../img/film/order_wechat.png");
          }

          .alipay {
            background-image: url("../../img/film/order_alipay.png");
          }

          .checked_order {
            border-color: #DA4453;
          }
        }
      }

      .pay_btn_box {
        overflow: hidden;
        margin: 70px 100px;

        .pay_btn {
          float: right;
          width: 220px;
          height: 48px;
          line-height: 48px;
          text-align: center;
          color: #fff;
          font-size: 16px;
          background: rgba(195, 150, 87, 1);
          border-radius: 24px;
          cursor: pointer;

          &:active {
            opacity: .7;
          }
        }
      }

      .confirm_notice {
        margin-bottom: 25px;

        &:last-child {
          margin-bottom: 58px;
        }

        .notice_title {
          font-size: 18px;
          margin-bottom: 15px;
        }

        p {
          font-size: 16px;
          padding: 0 0 0 15px;
          line-height: 26px;
        }
      }
    }

    .mold {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .6);
      z-index: 10000;

      .wechat_item {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 600px;
        height: 480px;
        background-color: #fff;
        padding: 43px 56px;

        .title_box {
          overflow: hidden;

          .icon_wepay {
            float: left;
            font-size: 18px;

            .iconweixin1 {
              color: #00C800;
              font-size: 20px;
            }

            .iconzhifubao {
              color: #08A3EA;
              font-size: 24px;
            }
          }

          .iconx {
            float: right;
            color: #CFCFCF;
            font-size: 20px;
            cursor: pointer;
          }
        }

        .code_box {
          width: 160px;
          height: 160px;
          margin: 25px auto;

          img {
            width: 100%;
          }
        }

        .pay_text {
          text-align: center;
          font-size: 14px;
          padding-bottom: 10px;
        }

        .pay_money {
          width: 375px;
          padding: 32px 0;
          margin: 0 auto;
          text-align: center;
          border-bottom: 1px rgba(0, 0, 0, .1) solid;

          .price {
            font-size: 24px;
            color: #DA0B0B;
            font-weight: bold;
          }

          .price_num {
            color: #DA0B0B;
            font-size: 36px;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
