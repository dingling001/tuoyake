<template>
  <div>
    <!-- 功能栏 -->
    <div class="tickets_centre">
      <div class="date_title">
        <!-- 日期 -->
        <div class="date_left">
          支付
          <span class="line"></span>
          <span class="dian"></span>
        </div>
        <!-- 步骤条 -->
        <el-steps :active="4" align-center class="date_right">
          <el-step title="选择预约时间">
            <i class="s s1" slot="icon"></i>
          </el-step>
          <el-step title="填写预约信息">
            <i class="s s2" slot="icon"></i>
          </el-step>
          <el-step title="确认信息">
            <i class="s s3" slot="icon"></i>
          </el-step>
          <el-step title="支付">
            <i class="s s4" slot="icon"></i>
          </el-step>
          <el-step title="预约完成">
            <i class="s s5" slot="icon"></i>
          </el-step>
        </el-steps>
      </div>
    </div>
    <!-- 信息表 -->
    <div class="messages">
      <!-- 信息头部 -->
      <div class="preson">
        <p class="circle"></p>
        <span class="preson_title">支付订单</span>
      </div>
      <!-- 支付信息 -->
      <div class="pay_message">
        <ul class="pay_item">
          <li class="pay_msg" v-if="orderStatus.order_status==2">
            订单已完成，请您在<span style="font-size: 30px;">{{m>=10?m:'0'+m}}</span>分钟<span
            style="font-size: 30px;">{{s>=10?s:'0'+s}}</span>秒内完成网上支付
          </li>
          <li class="pay_msg">
            <span class="pay_edit">订单编号：</span>{{order_info.order_sn}}
          </li>
          <li class="pay_msg">
            预约讲解日期：
            <span>{{order_info.t_date}}</span>
            <span>{{order_info.time_period}}</span>
          </li>
          <li class="pay_msg">
            <span class="c1">订单金额:</span>
            <span class="c2">￥</span>
            <span class="c3">{{order_info.order_amount}}.00</span>
          </li>
        </ul>
      </div>
      <!-- 支付方式 -->
      <!--<div class="attion">-->
      <!--<p class="attion_circle"></p>-->
      <!--<span class="attion_text">付款方式</span>-->
      <!--<div class="attion_wx">-->
      <!--<div class="wx_logo"></div>-->
      <!--</div>-->
      <!--<div class="attion_zfb">-->
      <!--<div class="zfb_logo"></div>-->
      <!--</div>-->
      <!--</div>-->
      <div class="order_pay" v-if="orderStatus.order_status==2">
        <div class="order_title"><span></span>付款方式</div>
        <div class="order_pay_box">
          <div :class="['order_item', 'wechat', wechat_status?'checked_order':'']" @click="wepay">
                        <span class="icon_box" v-if="wechat_status">
                            <span class="iconfont iconxuanzhong-copys"></span>
                        </span>
          </div>
          <!--          <div :class="['order_item', 'alipay', alipay_status?'checked_order':'']" @click="alipay">-->
          <!--                    <span class="icon_box" v-if="alipay_status">-->
          <!--                    <span class="iconfont iconxuanzhong-copys"></span>-->
          <!--                    </span>-->
          <!--          </div>-->
        </div>
      </div>
      <!-- 结算 -->
      <!--<div class="total_line"></div>-->
      <!-- 结尾付款 -->
      <div class="footer" v-if="orderStatus.order_status==2">
        <div class="cancle" @click="cancel_fn">取消订单</div>
        <div class="sure" @click="pay_fn">立即支付</div>
      </div>
      <div class="footer" v-else-if="orderStatus.order_status==5">
        <div class="cancle">{{orderStatus.order_status_show}}</div>
        <router-link to="/explain" class="sure">重新预约</router-link>
      </div>
      <div class="footer" v-else>
        <div class="cancle">{{orderStatus.order_status_show}}</div>
        <router-link to="/explain" class="sure">再次预约</router-link>
      </div>
    </div>
    <div class="mold" v-if="pay_mold" @click="pay_mold=false">
      <div class="wechat_item" @click.stop>
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
        <div class="pay_money"><span class="price">￥</span><span class="price_num">{{order_info.order_amount}}.00</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import countDown from '@/components/countDown.vue'
  import U from '@/bin/common'

  export default {
    data() {
      return {
        gorder_id: '',
        m: 0,
        s: 0,
        nowDate: '',
        nowTime: '',
        wechat_status: false,
        alipay_status: false,
        pay_mold: false,
        order_info: [],
        orderStatus: {},
        qrcode: '',
        order_sn: '',
        T: null
      };
    },
    created() {
      if (localStorage.gd_id && localStorage.nowDate && localStorage.nowTime && localStorage.gd_tp_id) {
        this.gd_tp_id = localStorage.gd_tp_id;
        // console.log(localStorage.gd_tp_id)
        this.nowDate = U.dateFtt("MM月dd日", new Date(localStorage.nowDate))
        this.nowTime = localStorage.nowTime
      }
      // else {
      //     this.$router.push('/explain/tickets')
      // }
      this.gorder_id = this.$route.query.gorder_id;
      this.get_TicketOrderDetail();
      this.get_GuideOrderStatus()
    },
    methods: {
      // 获取订单详情
      get_TicketOrderDetail() {
        var that = this;
        this.$api.TicketOrderDetail(localStorage.api_token, this.gorder_id).then(res => {
          this.order_info = res.data;
          this.order_sn = res.data.order_sn;
          var add_time = Date.parse(new Date(res.data.add_time.replace(/-/g, "/")));
          var end_time = Date.parse(new Date())
          var minutes = parseInt(((end_time - add_time) % (1000 * 60 * 60)) / (1000 * 60));
          var hours = parseInt(((end_time - add_time) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var seconds = parseInt(((end_time - add_time) % (1000 * 60)) / 1000);
          // console.log((end_time - add_time))
          // console.log(seconds)
          if (minutes <= 29 && hours < 1) {
            that.m = 29 - minutes;
            that.s = 60 - seconds;
            that.add();
          } else {
            that.minutes = 0;
            that.seconds = 0;
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
        if (!this.alipay_status && !this.wechat_status) {
          this.$message({
            message: '请选择支付方式',
            type: 'warning'
          });
        } else {
          var payment_id = this.wechat_status ? 1 : 4;
          this.$api.GuideOrderPay(localStorage.getItem('api_token'), this.gorder_id, payment_id).then(res => {
            // console.log(res)
            if (res.status == 1) {
              if (this.wechat_status) {
                this.pay_mold = true;
                this.qrcode = res.data.qrcode;
              } else {
                window.open(res.data.alipayinfo.url)
              }
              this.T = setInterval(() => {
                this.get_GuideOrderStatus()
              }, 1000)
              this.$once('hook:beforeDestroy', function () {
                clearInterval(this.T)
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              });
            }
          })
        }
        // else if (!this.wechat_status && this.alipay_status) {
        //   this.pay_mold = true;
        //   // this.$router.push({path: '/explain/success', query: {}})
        //   console.log('支付宝支付')
        // }
      },
      // 取消订单
      cancel_fn() {
        this.$confirm('取消订单,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.GuideOrderCancel(localStorage.getItem('api_token'), this.gorder_id).then(res => {
            if (res.status == 1) {
              this.$message({
                type: 'success',
                message: '取消成功!'
              });
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              });
            }
            this.get_TicketOrderDetail();
            this.get_GuideOrderStatus()
          })
        }).catch(() => {
        });
      },
      // 获取订单状态
      get_GuideOrderStatus() {
        this.$api.GuideOrderStatus(localStorage.getItem('api_token'), this.gorder_id).then(res => {
          if (res.status == 1) {
            this.orderStatus = res.data;
            if (res.data.order_status == 3) {
              clearInterval(this.T)
              this.$router.push({path: '/explain/success', query: {order_sn: this.order_sn}})
            }
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            });
          }
        })
      },
      // 倒计时
      add() {
        var _this = this
        var time = window.setInterval(function () {
          if (_this.s === 0 && _this.m !== 0) {
            _this.s = 59
            _this.m -= 1
          } else if (_this.m === 0 && _this.s === 0) {
            _this.s = 0
            window.clearInterval(time)
          } else {
            _this.s -= 1
          }
        }, 1000)
      },
      num: function (n) {
        return n < 10 ? '0' + n : '' + n
      },
    },
    components: {
      countDown,
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
    mounted() {
    }
  };
</script>

<style lang="scss" scoped>
  .tickets_centre {
    box-sizing: border-box;
    width: 1200px;
    margin: 20px auto;
    padding-bottom: 30px;
    padding-top: 30px;
    border-bottom: 5px solid rgba(180, 124, 45, 0.3);

    .date_title {
      overflow: hidden;

      .date_left {
        float: left;
        font-size: 24px;
        color: #000;
        padding: 10px 0 32px 0;
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

        .dian {
          position: absolute;
          display: block;
          width: 7px;
          height: 5px;
          border-radius: 3px;
          background-color: #000;
          left: 70px;
          bottom: 0;
          z-index: 1;
        }
      }

      .date_right {
        float: right;
        width: 867px;
        color: #000;
        margin-right: -50px;
        text-align: center;

        /deep/ .el-step__title {
          font-size: 16px;
          color: #000;
        }

        /deep/ .el-step__title.is-finish {
          color: #b47c2d;
        }

        /deep/ .el-step__title.is-process {
          font-weight: normal;
        }

        /deep/ .is-finish .s1 {
          background-image: url("../../img/tickets/01.png");
        }

        /deep/ .is-finish .s2 {
          background-image: url("../../img/tickets/02.png");
        }

        /deep/ .is-finish .s3 {
          background-image: url("../../img/tickets/03.png");
        }

        /deep/ .is-finish .s4 {
          background-image: url("../../img/tickets/04.png");
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
          border-color: #a0a0a0;
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
          background-image: url("../../img/tickets/1.png");
        }

        .s2 {
          background-image: url("../../img/tickets/2.png");
        }

        .s3 {
          background-image: url("../../img/tickets/3.png");
        }

        .s4 {
          background-image: url("../../img/tickets/4.png");
        }

        .s5 {
          background-image: url("../../img/tickets/5.png");
        }
      }
    }
  }

  .messages {
    width: 1200px;
    margin: 20px auto;
    box-sizing: border-box;
    overflow: hidden;

    .preson {
      width: 100%;
      height: 62px;
      line-height: 62px;
      border-radius: 31px;
      background: rgba(220, 97, 58, 1);
      position: relative;

      .circle {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #fff;
        margin: 28px 18px 24px 37px;
      }

      .preson_title {
        color: #fff;
        padding-left: 65px;
      }
    }

    // 订单信息
    .pay_message {
      height: 210px;
      margin-top: 35px;
      border-bottom: 2px dashed #cacaca;

      .pay_item {
        font-size: 16px;
        font-weight: 400;

        .pay_msg {
          margin-bottom: 28px;

          .pay_edit {
            color: #323232;
          }

          .pay_time {
            font-size: 30px;
            font-weight: bold;
          }
        }

        li:first-child {
          height: 30px;
          line-height: 30px;

          .eight {
            font-size: 30px;
          }

          .sixteen {
            font-size: 30px;
          }
        }

        li:nth-child(3) {
          span {
            padding-right: 5px;
            color: rgba(0, 0, 0, 1);
          }
        }

        li:last-child {
          .c1 {
            color: #55555a;
          }

          .c2 {
            color: #ff3600;
            font-weight: bold;
          }

          .c3 {
            color: #ff3600;
            font-weight: bold;
            font-size: 26px;
          }
        }
      }
    }

    // 支付方式
    .attion {
      margin-top: 33px;
      height: 30px;
      position: relative;
      box-sizing: border-box;

      .attion_circle {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #000;
        margin-left: 45px;
      }

      .attion_text {
        position: absolute;
        margin-top: -2px;
        margin-left: 8px;
        font-size: 20px;
      }

      .attion_wx {
        width: 189px;
        height: 62px;
        margin: 28px 36px 36px 45px;
        background-image: url("../../img/tickets/07.png");
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center center;
        position: relative;

        .wx_logo {
          width: 132px;
          height: 31px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-image: url("../../img/tickets/8.png");
        }
      }

      .attion_zfb {
        float: right;
        width: 189px;
        height: 62px;
        border: 1px solid rgba(136, 157, 186, 1);
        opacity: 0.5;
        margin: -99px 721px 50px 50px;
        position: relative;

        .zfb_logo {
          width: 105px;
          height: 38px;
          background-image: url("../../img/tickets/9.png");
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

    .order_pay {
      padding: 30px 0;
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

    // 结算
    .total_line {
      margin-top: 125px;
      width: 100%;
      height: 5px;
      background: rgba(180, 124, 45, 1);
      opacity: 0.3;
    }

    // 结尾付款
    .footer {
      margin: 80px auto 120px auto;
      overflow: hidden;

      .cancle {
        float: left;
        width: 220px;
        height: 48px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(85, 85, 90, 1);
        line-height: 48px;
        text-align: center;
        border: 1px solid rgba(210, 210, 210, 1);
        border-radius: 24px;
        margin-left: 300px;
        cursor: pointer;
      }

      .sure {
        float: right;
        width: 220px;
        height: 48px;
        line-height: 48px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        background: rgba(180, 124, 45, 1);
        opacity: 0.8;
        border-radius: 24px;
        margin-right: 300px;
        cursor: pointer;
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
      height: 560px;
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
</style>
