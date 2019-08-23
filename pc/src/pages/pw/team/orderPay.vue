<template>
  <div class="container">
    <!-- 步进条 -->
    <ProgressBar progressTitle="预约结果" :progressActiveNum="5"></ProgressBar>
    <div class="content">
      <div class="pay_message">
        <ul class="pay_item">
          <li class="pay_msg">
            订单已完成，请您在<span style="color:#DA4453">{{minutes}}</span>分钟<span style="color:#DA4453">{{seconds}}</span>秒完成网上支付
          </li>
          <li class="pay_msg">
            <span class="pay_edit">订单编号：</span>{{detail.order_sn}}
          </li>
          <li class="pay_msg">
            参观日期：{{detail.t_date}} {{detail.t_week}} {{detail.time_period}}
          </li>
          <li class="pay_msg">
            <span class="c1">订单金额:</span>
            <span class="c2">￥</span>
            <span class="c3">{{detail.order_amount}}</span>
          </li>
        </ul>
      </div>
      <div class="order_pay">
        <div class="order_title">付款方式</div>
        <div class="order_pay_box">
          <!-- 微信 -->
          <div class="order_item wechat" :class="{'checked_order':payType==1}" @click="payType=1">
            <i class="iconfont iconxuanzhong-copys" v-show="payType==1"></i>
          </div>
          <!-- 支付宝 -->
          <div class="order_item alipay" :class="{'checked_order':payType==4}" @click="payType=4">
            <i class="iconfont iconxuanzhong-copys" v-show="payType==4"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="cancle" v-if="detail.can_cancel" @click="cancelPay">取消支付</div>
      <div class="sure" @click="submitPay">支付</div>
    </div>
    <el-dialog :lock-scroll="false" :visible.sync="qrVisible" @close="closeDialog">
      <div slot="title" class="modal_title"><img src="../../../img/teampw/wx.png">微信支付</div>
      <div class="modal_body">
        <div class="qr_img" id="qrcode">
          <qrcode :value="qrcodeSrc" :options="{ size: 200 }"></qrcode>
          <div class="qr_timeout" v-show="timeoutFlag">二维码已过期，<a href="javascript:void(0);" @click="submitPay">刷新</a>重新获取二维码。</div>
        </div>
        <div>微信扫描二维码完成支付</div>
        <div class="price">¥<span>{{detail.order_amount}}</span></div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ProgressBar from '../common/progressBar.vue';

const QRCODE_TIME = 45; //轮询 45s 二维码过期

export default {
  name: "team_success",
  data() {
    return {
      apiToken: localStorage.api_token || "",
      torder_id: this.$route.query.torder_id || "",
      detail: "",
      minutes: "--",
      seconds: "--",
      payType: 1, //1：微信，2：微信小程序，4：支付宝
      qrVisible: false,
      qrcodeSrc: "",
      restTime: QRCODE_TIME,
      timeoutFlag: false,
      countTimer: null, //支付倒计时
      loopQrTimeOut: null, //二维码过期轮询
      orderStatusTimer: null, //订单状态轮询
    }
  },
  components: {
    ProgressBar,
  },
  created() {
    this.torder_id && this.getDetail();
  },
  mounted() {
    this.$once('hook:beforeDestroy', () => {
      this.closeLoop('countTimer');
      this.closeLoop('loopQrTimeOut');
      this.closeLoop('orderStatusTimer');
    })
  },
  methods: {
    /** 
     * @获取订单详情
     */
    getDetail() {
      this.$api.PW_PC_teamTicketOrderD(this.apiToken, this.torder_id).then(res => {
        if (res.status == 1) {
          // console.log(res)
          if (res.data.order_status == 2) {
            //2待付款
            let dateArr = res.data.t_date.replace(/-/g, '/').split('/');
            let weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
            let weeknum = new Date(res.data.t_date).getDay();
            res.data.t_week = weekdays[weeknum];
            res.data.t_date = dateArr[0] + '年' + dateArr[1] + '月' + dateArr[2] + '日';
            this.detail = res.data;
            this.countDown(res.data.ck_time);
          } else {
            this.$router.replace({ path: '/pw/team/order_detail', query: { 'torder_id': res.data.torder_id } });
            return;
          }
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {})
    },
    /**
     * @支付倒计时
     */
    countDown(timeval) {
      let ordertimestamp = Date.parse(new Date(timeval.replace(/-/g, '/')));
      let nowtimestamp = new Date().getTime();
      if ((nowtimestamp - ordertimestamp) < 1800000) {
        let fn = () => {
          let nowtimestamp = new Date().getTime();
          let leftTime = 1800000 - (nowtimestamp - ordertimestamp);
          let mm = parseInt(leftTime / 1000 / 60 % 60, 10);
          let ss = parseInt(leftTime / 1000 % 60, 10);
          this.minutes = mm < 10 ? ('0' + mm) : mm;
          this.seconds = ss < 10 ? ('0' + ss) : ss;
          if (this.minutes <= 0 && this.seconds <= 0) {
            this.closeLoop('countTimer');
            this.cancelOrder('您的订单超时未支付，系统已自动为您取消订单');
          }
          return fn;
        }
        this.countTimer = setInterval(fn(), 1000)
      } else {
        this.$alert('您的订单超时未支付，请重新购票', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {
            this.$router.replace('/pw/team/index');
          }
        });
        return;
      }
    },
    closeDialog() {
      this.restTime = QRCODE_TIME;
      this.closeLoop('orderStatusTimer');
    },
    /** 
     * @打开弹层，提交支付
     */
    submitPay() {
      this.$api.postMyOrderPay(this.apiToken, this.torder_id, this.payType).then(res => {
        // console.log(res)
        if (res.status == 1) {
          this.getOrderStatus();

          if (this.payType == 1) {
            //微信支付
            this.qrVisible = true;
            this.qrcodeSrc = res.data.qrcode;
            this.getRestTime();
          } else if (this.payType == 4) {
            //支付宝支付
            window.open(res.data.alipayinfo.url);
          }
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    /** 
     * @取消支付确认
     */
    cancelPay() {
      this.$confirm('是否取消支付?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cancelOrder();
      }).catch(() => {});
    },
    /** 
     * @取消订单
     */
    cancelOrder(title) {
      this.$api.PW_PC_teamTicketOrderCancel(this.apiToken, this.torder_id).then(res => {
        if (res.status == 1) {
          this.$message({
            message: title || '订单已取消',
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.$router.replace({ path: '/pw/team/order_detail', query: { 'torder_id': this.torder_id } });
            }
          });
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    /**
     * @轮询 45s 二维码过期
     */
    getRestTime() {
      this.timeoutFlag = false;
      this.loopQrTimeOut = window.setInterval(() => {
        this.restTime--;
        if (this.restTime <= 0) {
          this.timeoutFlag = true;
          this.restTime = QRCODE_TIME;
          this.closeLoop('loopQrTimeOut');
          this.closeLoop('orderStatusTimer');
        }
      }, 1000);
    },
    /** 
     * @查询订单状态
     */
    getOrderStatus() {
      let fn = () => {
        this.$api.PW_PC_teamTicketOrderStatus(this.apiToken, this.torder_id).then(res => {
          if (res.status == 1) {
            // console.log(res)
            if (res.data.order_status == 3) {
              this.$router.replace({ path: '/pw/team/order_detail', query: { 'torder_id': this.torder_id } });
              return;
            }
          } else {
            this.$message.error(res.msg);
            this.closeLoop('orderStatusTimer');
            return;
          }
        })
        return fn;
      }
      this.orderStatusTimer = setInterval(fn(), 1000);
    },
    closeLoop(timer) {
      this[timer] && (window.clearInterval(this[timer]), this[timer] = null);
    },
  }
};

</script>
<style lang="scss" scoped>
.container {
  margin: 0 auto;

  /deep/ .el-dialog__wrapper {

    .el-dialog {
      max-width: 600px;
      min-width: 300px;

      .el-dialog__header {

        .modal_title {
          font-size: 16px;
          line-height: 0;

          img {
            width: 50px;
            height: 32px;
            vertical-align: middle
          }
        }
      }

      .el-dialog__body {
        .modal_body {
          text-align: center;
          padding: 40px 20px;

          .qr_img {
            position: relative;
            width: 200px;
            height: 200px;
            margin: 0 auto 30px;
            overflow: hidden;

            .qr_timeout {
              position: absolute;
              padding: 80px 10px 0;
              line-height: 2;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              color: red;
              font-size: 13px;
              background-color: rgba(238, 238, 238, 0.95);

              a {
                cursor: pointer;
                color: #67a4ff;
              }
            }
          }

          .price {
            margin-top: 50px;
            font-size: 24px;
            color: #DA0B0B;

            span {
              font-size: 36px;
            }
          }
        }
      }
    }
  }

  .content {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 80px;

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

    .order_pay {
      padding: 30px 0;
      border-bottom: 5px solid rgba(180, 124, 45, 0.3);

      .order_title {
        font-size: 20px;
        line-height: 1;

        &::before {
          content: '';
          display: inline-block;
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
          float: left;
          width: 189px;
          height: 63px;
          position: relative;
          margin-right: 36px;
          cursor: pointer;
          background-position: center;
          background-repeat: no-repeat;
          border: 1px solid rgba(136, 157, 186, 0.5);

          .iconfont {
            position: absolute;
            right: -1px;
            bottom: -1px;
            z-index: 2;
            height: 26px;
            width: 25px;
            text-align: center;
            line-height: 30px;

            &.iconxuanzhong-copys {
              color: #da4453;
              font-size: 25px;
            }
          }

          &.wechat {
            background-image: url("../../../img/film/order_wechat.png");
          }

          &.alipay {
            background-image: url("../../../img/film/order_alipay.png");
          }

          &.checked_order {
            border-color: #da4453;
          }
        }
      }
    }
  }

  .footer {
    width: 1200px;
    margin: 0px auto 80px;
    overflow: hidden;
    font-size: 16px;
    font-weight: 400;
    line-height: 48px;
    text-align: center;

    .cancle {
      float: left;
      width: 220px;
      height: 48px;
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
      color: rgba(255, 255, 255, 1);
      text-align: center;
      background: rgba(180, 124, 45, 1);
      opacity: 0.8;
      border-radius: 24px;
      margin-right: 248px;
      cursor: pointer;
    }
  }

}

</style>
