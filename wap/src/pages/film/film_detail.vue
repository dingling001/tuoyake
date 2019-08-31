<template>
  <div class="fd_box">
    <div class="count" v-if="order_info.status==1">订单已完成，请您在<i>{{minutes}}</i>分钟<i>{{seconds}}</i>秒完成网上支付</div>
    <div class="fd_name">
      <span>{{order_info.movie_name}}</span>
      <span class="status success" v-if="order_info.status==1">待支付</span>
      <span class="status success" v-else-if="order_info.status==2">已预约</span>
      <span class="status" v-else-if="order_info.status==3">已取消</span>
      <span class="status" v-else-if="order_info.status==4">已完成</span>
      <span class="status" v-else-if="order_info.status==5">已过期</span>
    </div>
    <div class="qrcode_box" v-if="order_info.status!=1">
      <div v-if="order_info.status==2">
        <qrcode :value="order_info.order_no" :options="{ size: 160 }"></qrcode>
      </div>
      <div v-else class="no_code"><img src="../../img/film/no_code.png" alt=""></div>
      <div class="seat_num">{{order_info.seat_num}}张电影票</div>
      <div :class="['qrcode_num', order_info.status==2?'':'linecross op']">取票码:{{order_info.order_no}}</div>
    </div>
    <div class="fd_detail">
      <div class="fd_title">订单详情</div>
    </div>
    <div class="fd_item"><span>影片名称</span><span>{{order_info.movie_name}}</span></div>
    <div class="fd_item"><span>下单时间</span><span>{{order_info.created_at}}</span></div>
    <div class="fd_item"><span>日期场次</span><span>{{order_info.movie_time}}</span></div>
    <div class="fd_item"><span>订单金额</span><span class="price">￥{{order_info.amount}}</span></div>
    <div class="film_ticket">
      <div class="film_item">影片类型：</div>
      <div class="right">
        <div class="film_item">
          <div class="ticket_item" v-for="item in order_info.ticket_class" v-if="item">
            <div>
              <div>{{item.class_name}}</div>
              <div class="des">({{item.des}})</div>
            </div>
            <span>{{item.buy_num}}</span>
          </div>
        </div>
        <!--        <div>-->
        <!--          共计{{order_info.seat_num}}张-->
        <!--        </div>-->
      </div>
    </div>
    <div class="fd_item"><span>影票数量</span><span>  {{order_info.seat_num}}</span></div>
    <div class="film_ticket">
      <span v-if="order_info.movie_type==3" class="span">已选体验位</span>
      <span v-else class="span">已选座位</span>
      <div class="seat_box"><span v-for="item in order_info.seat_arr">{{item}}</span></div>
    </div>
    <div class="fd_item"><span>联系电话</span><span>{{order_info.phone}}</span></div>
    <div class="cancel_btn" v-if="order_info.status==2" @click="confirmCancelOrder">取消订单</div>
    <div class="cancel_box" v-else-if="order_info.status==1">
      <span @click="confirmCancelOrder">取消订单</span>
      <span @click="pay_order" class="paybtn">立即支付</span>
    </div>
    <!--    <div class="cancel_btn" v-else @click="$router.back(-1)">返回列表</div>-->
  </div>
</template>

<script>
  import {Toast, MessageBox, Indicator} from 'mint-ui';
  import {Session} from '@/assets/js/utils.js';

  export default {
    name: "film_detail",
    data() {
      return {
        order_id: '',
        order_info: {},
        payment_id: 1,
        minutes: '00',
        seconds: '00',
      }
    },
    created() {
      this.order_id = this.$route.query.order_id;
      this.get_FilmOrderInfo();
    },
    methods: {
      // 获取订单详情
      get_FilmOrderInfo() {
        this.$api.FilmOrderInfo(localStorage.getItem('app_token'), this.order_id).then(res => {
          if (res.status == 1) {
            this.order_info = res.data;
            if (this.order_info.status == 1) {
              this.countDown(res.data.created_at);
            }
            if (res.data.status == 1) {
              if (Session.get('film_order_id_value') == this.order_id) {
                this.showConfirmLayer();
                Session.remove('film_order_id_value');
              }
            }
          }
        })
      },
      // 确认取消订单
      confirmCancelOrder() {
        let v = this;
        MessageBox({
          title: '提示',
          message: '确定是否取消订单?',
          showCancelButton: true,
          confirmButtonClass: 'pw-wx-mint-confirm-btn'
        }).then(action => {
          if (action === 'confirm') {
            v.cancelOrder();
          }
        })
      },
      /**
       * @取消订单
       */
      cancelOrder() {
        let v = this;
        v.$api.FilmCancelOrder(localStorage.getItem('app_token'), this.order_id).then(res => {
          if (res.status == 1) {
            Toast('订单已取消');
            this.get_FilmOrderInfo()
          } else {
            Toast(res.msg);
          }
        })
      },
      /**
       * @H5支付时打开确认弹窗用于查单操作
       */
      showConfirmLayer() {
        let v = this;
        v.orderStatusLoop(); //开启订单状态轮询
        MessageBox({
          title: '支付确认',
          message: '1、如果您已完成支付，请点击「支付完成」<br>2、如果您未支付成功，请点击「重新支付」再次进行支付',
          closeOnClickModal: false,
          showCancelButton: true,
          confirmButtonClass: 'pw-wx-mint-confirm-btn',
          cancelButtonText: '重新支付',
          confirmButtonText: '支付完成', // 确认按钮的文本
        }).then(action => {
          // 清除当前订单状态查询定时器
          v.clearOrderStatusLoop();
          //以下两种操作均包含未支付和已支付两种情况
          if (action == 'confirm') {
            // 再次查询订单，确保是否支付完成
            v.getOrderStatus((res) => {
              if (res.order_status == 2) {
                // 已完成支付跳转详情
                v.$router.replace({path: '/film/film_success', query: {}});
              } else if (res.order_status == 1) {
                // 待支付时误点击已完成时出现的情况
                v.showToast('您的订单未支付完成，请重新支付');
              }
            });
          } else if (action == 'cancel') {
            // 重新支付
            // v.getDetail();
            v.clearOrderStatusLoop();
          }
        })
      },
      /**
       * @微信支付（微信内置）
       */
      launchWxPay(wx) {
        let v = this;
        WeixinJSBridge.invoke('getBrandWCPayRequest', wx, function (res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            //支付成功
            v.$router.replace({path: '/film/film_success', query: {'order_id': this.order_id}});
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            v.showToast('支付取消');
          } else if (res.err_msg == "get_brand_wcpay_request:fail") {
            v.showToast('支付失败');
          }
        });
      },
      /**
       * @H5支付（浏览器中调起微信支付中间页）
       */
      launchH5Pay(mweb_url, order_id) {
        let v = this;
        v.showConfirmLayer(); //打开用于用户查单操作的弹窗
        Session.set('film_order_id_value', order_id);
        mweb_url && (window.location.href = mweb_url);
      },
      /**
       * @小程序支付
       */
      launchWxMiniPay(mini) {
        let v = this;
        if (mini.appId && mini.timeStamp && mini.nonceStr && mini.package && mini.signType && mini.paySign) {
          let path = `/pages/pay/index?appId=${mini.appId}&timeStamp=${mini.timeStamp}&nonceStr=${mini.nonceStr}&package=${encodeURIComponent(mini.package)}&signType=${mini.signType}&paySign=${encodeURIComponent(mini.paySign)}`;
          wx.miniProgram.navigateTo({
            url: path
          })
        }
      },
      /**
       * 发起支付的同时轮询查询订单状态
       */
      orderStatusLoop() {
        let v = this;
        // 防止重复开启轮询
        if (!v.orderStatusTimer) {
          v.orderStatusTimer = setInterval(() => {
            v.getOrderStatus((res) => {
              // 1待审核，2待付款，3已完成（已付款），5已取消，6已退款
              if (res.order_status != 1) {
                if (res.order_status == 2) {
                  // 已完成支付跳转成功
                  v.$router.replace({path: '/film/film_success', query: {'order_id': this.order_id}});
                  return;
                }
                //只要不是未支付状态，则清除订单状态轮询（包含一直未支付自动取消的情况）
                v.clearOrderStatusLoop();
              }
            });
          }, 3e3);
        }
      },
      /**
       * @清除订单状态轮询
       */
      clearOrderStatusLoop() {
        let v = this;
        if (v.orderStatusTimer) { //如果定时器在运行则关闭
          window.clearInterval(v.orderStatusTimer);
          v.orderStatusTimer = null;
        }
      },
      /**
       * @支付中时查询订单状态
       */
      getOrderStatus(successCb) {
        let v = this;
        v.$api.FilmOrderStatus(this.order_id).then(res => {
          // console.log(res)
          if (res.status == 1) {
            "function" === typeof successCb && successCb(res.data);
          } else {
            v.clearOrderStatusLoop();
            v.showToast(res.msg);
          }
        }).catch(err => {
          v.clearOrderStatusLoop();
          v.showToast('订单状态请求异常');
        })
      },
      // 支付
      pay_order() {
        let v = this;
        let paymentType = PLAT == 'wx' ? 1 : PLAT == 'wxmini' ? 2 : 1; //支付类型，1：微信（默认），2：微信小程序
        Indicator.open({
          text: '支付中...',
          spinnerType: 'snake'
        });
        v.$api.FilmPayOrder(v.order_id, paymentType).then(res => {
          Indicator.close();
          if (res.status == 1) {
            if (paymentType == 1) {
              //微信公众号和微信网页支付
              let wx = res.data.wxpayinfo;
              let ua = navigator.userAgent.toLowerCase();

              if (ua.match(/MicroMessenger/i) == "micromessenger") {
                "object" == typeof WeixinJSBridge && "function" == typeof WeixinJSBridge.invoke ? v.launchWxPay(wx) : document.addEventListener("WeixinJSBridgeReady", function () {
                  v.launchWxPay(wx)
                })
              } else {
                //网页版h5支付
                console.log('网页版h5支付')
                v.launchH5Pay(wx.mweb_url, v.order_id);
              }
            } else if (paymentType == 2) {
              //小程序支付
              let mini = res.data.wxpayinfo;
              v.launchWxMiniPay(mini);
            } else {
              //其他支付方式
              //...
            }
          } else {
            v.showToast(res.msg);
          }
        }).catch(err => {
          v.showToast('支付异常');
        })
      },
      // 弹层
      showToast(msg) {
        Toast({
          message: msg,
          position: 'center',
          duration: 2000
        });
      },
      // 支付倒计时
      countDown(timeval) {
        let v = this;
        let ordertimestamp = new Date(timeval.replace(new RegExp("-", "gm"), "/")).getTime();
        let nowtimestamp = new Date().getTime();
        if ((nowtimestamp - ordertimestamp) < 900000) {
          let timeDown = () => {
            let nowtimestamp = new Date().getTime();
            let leftTime = 900000 - (nowtimestamp - ordertimestamp);
            let mm = parseInt(leftTime / 1000 / 60 % 60, 10);
            let ss = parseInt(leftTime / 1000 % 60, 10);
            v.minutes = mm < 10 ? ('0' + mm) : mm;
            v.seconds = ss < 10 ? ('0' + ss) : ss;
            if (v.minutes <= 0 && v.seconds <= 0) {
              v.clearCountLoop();
              v.clearOrderStatusLoop();
              MessageBox.close(false);
              MessageBox.alert('您的订单超时未支付，请重新购票', '提示', {
                confirmButtonClass: 'pw-wx-mint-confirm-btn'
              }).then(action => {
                v.$router.replace('/film');
              });
              return;
            }
          }
          // 防止重复开启轮询
          if (!v.countTimer) {
            v.countTimer = setInterval(function () {
              timeDown();
            }, 1e3)
            timeDown();
          }
        } else {
          MessageBox.close(false);
          MessageBox.alert('您的订单超时未支付，请重新购票', '提示', {
            confirmButtonClass: 'pw-wx-mint-confirm-btn'
          }).then(action => {
            v.$router.replace('/film');
          });
          return;
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  @import '@/style/mixin.scss';

  .fd_box {
    min-height: 100vh;
    background-color: #F2F2F2;
    padding-bottom: 30px;

    .count {
      width: 100%;
      line-height: 36px;
      padding: 0 15px;
      font-size: 14px;
      /*px*/
      font-weight: 400;
      color: #000;
      background-color: $calendar_bgcolor;
      border: 1px solid rgba(244, 236, 208, 1);
      /*no*/

      i {
        font-style: normal;
        font-size: 14px;
        /*px*/
        color: $baseClr;
      }
    }

    .fd_name {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      padding: 16px 20px;
      font-size: 22px;
      /*px*/
      color: #353535;
      font-weight: bold;

      .status {
        color: rgba(0, 0, 0, .5);
        font-size: 14px;
        /*px*/
      }

      .success {
        color: $baseClr;
        font-size: 14px;
        /*px*/
      }
    }

    .qrcode_box {
      margin: 4px 0 12px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 17px 0;
      background-color: #fff;

      .linecross {
        text-decoration: line-through;
      }

      .seat_num {
        color: rgba(53, 53, 53, .5);
        font-size: 14px;
        /*px*/
        padding: 10px 0;
      }

      .qrcode_num {
        border: 1px solid #000;
        /*no*/
        padding: 10px 42px;
        color: #353535;
        font-size: 14px;
        /*px*/
        border-radius: 16px;
        /*no*/
      }

      .no_code {
        width: 140px;
        height: 140px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 100%;
        }
      }
    }

    .op {
      opacity: .3;
    }

    .fd_detail {
      margin-bottom: 4px;
      background-color: #fff;

      .fd_title {
        font-size: 17px;
        /*px*/
        color: #353535;
        padding: 17px 20px;
      }
    }

    .fd_item {
      color: #353535;
      border: 1px solid rgba(181, 181, 181, .18);
      /*no*/
      font-size: 14px;
      /*px*/
      padding: 15px 20px;
      background-color: #fff;

      span {
        margin-right: 15px;

      }

      .price {
        color: $baseClr;
        font-weight: bold;
        font-size: 15px;
        /*px*/
      }
    }

    .film_ticket {
      display: flex;
      justify-content: space-between;
      padding: 15px 20px;
      background-color: #fff;
      color: #353535;
      border: 1px solid rgba(181, 181, 181, .18);
      /*no*/
      .span {
        height: 24px;
        line-height: 24px;
      }

      .right {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        /*px*/
        .film_item {
          flex: 1;
        }
      }

      .ticket_item {
        padding: 0 0 6px 0;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:last-child {
          padding: 0;
          margin: 0;
        }

        .des {
          font-size: 10px;
          /*  px*/
          color: #727272;
          margin: 10px 0 0 0;
        }

        /*span {*/
        /*  width: 100px;*/
        /*  display: inline-block;*/
        /*}*/
      }

      .seat_box {
        flex: 1;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-left: 20px;

        span {
          border: 1px solid #000;
          /*no*/
          padding: 5px 9px;
          border-radius: 5px;
          /*no*/
          margin: 0 15px 6px 0;

          &:last-child {
            margin: 0 0 6px 0;
          }
        }
      }

      &:last-child {
        padding-right: 0;
      }
    }

    .cancel_btn {
      width: 149px;
      border: 1px solid rgba(0, 0, 0, 1);
      border-radius: 24px;
      margin: 15px auto;
      padding: 15px 0;
      color: #353535;
      text-align: center;
      font-size: 18px;
      /*px*/
    }

    .cancel_box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 23px;
      margin: 10px 0;

      span {
        width: 149px;
        border: 1px solid rgba(0, 0, 0, 1);
        border-radius: 24px;
        padding: 15px 0;
        color: #353535;
        text-align: center;
        font-size: 18px;
        /*px*/
      }

      .paybtn {
        color: #fff;
        background-color: $baseClr;
        border-color: $baseClr;
      }
    }
  }
</style>
