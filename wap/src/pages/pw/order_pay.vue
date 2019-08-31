<template>
  <div class="pay" v-cloak>
    <div class="pay__count">订单已完成，请您在<i>{{minutes}}</i>分钟<i>{{seconds}}</i>秒完成网上支付</div>
    <div class="pay__info">
      <p>订单编号：{{detail.order_sn}}</p>
      <p>参观日期：{{detail.t_date}} {{detail.time_period}}</p>
      <p>下单时间：{{detail.add_time}}</p>
      <p>订单金额：<span style="color: #DA4453">￥{{detail.order_amount}}</span></p>
    </div>
    <div class="pay__block">
      <div class="pay__block__title">门票信息</div>
      <div class="pay__block__tickets" v-if="detail.item.length>0">
        <ul v-for="(a,ai) in detail.item" :key="ai">
          <li>
            <label>{{a.toi_username}}<small>{{a.pt_name}}</small></label>
          </li>
          <li>
            <label>{{a.toi_cardtype}}</label>
            <span>{{a.toi_card_num}}</span>
          </li>
          <li class="tickets" v-if="a.tickets.length>0">
            <div class="item" v-for="(b,bi) in a.tickets">
              <div class="ticket__cont">
                <div class="ticket__desc">
                  <div class="name">
                    <span>{{b.ticket_name}}</span>
                    <span>{{b.discount_price}}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="pay__block">
      <div class="pay__block__title">支付方式</div>
      <div class="pay__block__payments">
        <ul>
          <li class="wx" :class="{'checked':chosePayType==1}" @click="chosePay(1)">微信</li>
          <li class="zfb" :class="{'checked':chosePayType==2}" @click="chosePay(2)" v-if="env=='t'">支付宝</li>
        </ul>
      </div>
    </div>
    <div class="pay__bottom">
      <div class="pay__bottom__price">
        <div>付款：<span><i>¥</i>{{detail.order_amount}}</span></div>
      </div>
      <div class="pay__bottom__btn" @click="payOrder">支付</div>
    </div>
  </div>
</template>
<script>
import { Indicator, Toast, MessageBox } from 'mint-ui';
import { Session } from '@/assets/js/utils.js';

const SPINNER_TYPE = "snake";

export default {
  name: 'order_pay',
  data() {
    return {
      env: PLAT,
      torder_id: '',
      detail: {
        item: [{
          tickets: [{
            "titem_id": "",
            "ticket_id": "",
            "ticket_name": "",
            "toi_status": 0,
            "toi_status_show": "", //门票状态
            "can_refund": false, //门票退票标记位
          }]
        }]
      },
      minutes: '00',
      seconds: '00',
      countTimer: null,
      orderStatusTimer: null, //订单状态倒计时轮询
      chosePayType: Session.get('hb_pw_order_pay_type') || 1, //1微信支付（默认），2支付宝支付
    }
  },
  created() {
    let v = this;
    v.torder_id = v.$route.query.torder_id;
  },
  mounted() {
    let v = this;
    v.torder_id && v.getDetail();
    /**
     * @页面销毁清除定时器（单页面之间跳转才触发）
     */
    v.$once('hook:beforeDestroy', () => {
      v.clearCountLoop();
      v.clearOrderStatusLoop();
      MessageBox.close(false);
      Session.get('hb_pw_order_pay_curid') && Session.remove('hb_pw_order_pay_curid');
      Session.get('hb_pw_order_pay_type') && Session.remove('hb_pw_order_pay_type');
    })
  },
  methods: {
    /**
     * @订单详情
     */
    getDetail() {
      let v = this;
      Indicator.open({
        text: '加载中...',
        spinnerType: SPINNER_TYPE
      });
      v.$api.PW_WX_TicketOrderDetail(v.torder_id).then((res) => {
        Indicator.close();
        // console.log(res);
        if (res.status == 1) {
          // 订单状态，1待审核，2待付款，3已完成（已付款），5已取消，6已退款
          if (res.data.order_status == 2) {
            v.detail = res.data;
            v.countDown(res.data.add_time);
            //当且仅当状态为代付款时才打开弹窗，故应先查询订单状态，再显示查单弹窗（避免用户已取消或已退款时转到详情页面误显示弹窗）
            //H5支付时显示查单弹窗并开启订单状态轮询
            if (Session.get('hb_pw_order_pay_curid') == v.torder_id) {
              Session.remove('hb_pw_order_pay_curid');
              v.showConfirmLayer();
            }
          } else if (res.data.order_status == 3) {
            v.$router.replace({ path: '/pw/person/success', query: { 'torder_id': v.torder_id } });
          } else {
            v.$router.replace({ path: '/pw/person/order_detail', query: { 'torder_id': v.torder_id } });
          }
        } else {
          v.showToast(res.msg);
        }
      })
    },
    /**
     * @待支付倒计时
     */
    countDown(timeval) {
      let v = this;
      let ordertimestamp = new Date(timeval.replace(new RegExp("-", "gm"), "/")).getTime();
      let nowtimestamp = new Date().getTime();
      if ((nowtimestamp - ordertimestamp) < 1800000) {
        let timeDown = () => {
          let nowtimestamp = new Date().getTime();
          let leftTime = 1800000 - (nowtimestamp - ordertimestamp);
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
              v.$router.replace('/pw/person/index');
            });
            return;
          }
        }
        // 防止重复开启轮询
        if (!v.countTimer) {
          v.countTimer = setInterval(function() {
            timeDown();
          }, 1e3)
          timeDown();
        }
      } else {
        MessageBox.close(false);
        MessageBox.alert('您的订单超时未支付，请重新购票', '提示', {
          confirmButtonClass: 'pw-wx-mint-confirm-btn'
        }).then(action => {
          v.$router.replace('/pw/person/index');
        });
        return;
      }
    },
    /**
     * @支付中时查询订单状态
     */
    getOrderStatus(successCb) {
      let v = this;
      v.$api.PW_WX_TicketOrderStatus(v.torder_id).then(res => {
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
    /**
     * 发起支付的同时轮询查询订单状态
     */
    orderStatusLoop() {
      let v = this;
      let statusTimer = () => {
        v.getOrderStatus((res) => {
          // 1待审核，2待付款，3已完成（已付款），5已取消，6已退款
          if (res.order_status != 2) {
            if (res.order_status == 3) {
              v.$router.replace({ path: '/pw/person/success', query: { 'torder_id': v.torder_id } });
            } else {
              //用户未支付系统自动取消
              v.$router.replace({ path: '/pw/person/order_detail', query: { 'torder_id': v.torder_id } });
            }
          }
        });
      }
      // 防止重复开启轮询
      if (!v.orderStatusTimer) {
        v.orderStatusTimer = setInterval(() => {
          statusTimer();
        }, 1e3);
        // statusTimer();
      }
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
            if (res.order_status == 3) {
              // 已完成支付跳转详情
              v.$router.replace({ path: '/pw/person/success', query: { 'torder_id': v.torder_id } });
            } else if (res.order_status == 2) {
              // 待支付时误点击已完成时出现的情况
              v.showToast('您的订单未支付完成，请重新支付');
            }
          });
        } else if (action == 'cancel') {
          // 重新支付
          v.getDetail();
        }
      })
    },

    /**
     * @微信支付（微信内置）
     */
    launchWxPay(wx) {
      let v = this;
      WeixinJSBridge.invoke('getBrandWCPayRequest', wx, function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          //支付成功
          v.$router.replace({ path: '/pw/person/success', query: { 'torder_id': v.torder_id } });
        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
          v.showToast('支付取消');
        } else if (res.err_msg == "get_brand_wcpay_request:fail") {
          v.showToast('支付失败');
        }
      });
    },
    /**
     * @H5支付（浏览器中调起微信\支付宝支付中间页）
     */
    launchH5Pay(mweb_url, torder_id) {
      let v = this;
      v.showConfirmLayer(); //打开用于用户查单操作的弹窗
      Session.set('hb_pw_order_pay_curid', torder_id);
      mweb_url && (window.location.href = mweb_url);
    },
    /**
     * @小程序支付
     */
    launchWxMiniPay(mini) {
      let v = this;
      if (mini.appId && mini.timeStamp && mini.nonceStr && mini.package && mini.signType && mini.paySign) {
        //小程序支付时开启订单状态轮询
        v.orderStatusLoop();

        let path = `/pages/pay/index?appId=${mini.appId}&timeStamp=${mini.timeStamp}&nonceStr=${mini.nonceStr}&package=${encodeURIComponent(mini.package)}&signType=${mini.signType}&paySign=${encodeURIComponent(mini.paySign)}`;

        wx.miniProgram.navigateTo({
          url: path
        })
      }
    },
    /**
     * @选择支付方式
     */
    chosePay(type) {
      let v = this;
      v.chosePayType = type;
      Session.set('hb_pw_order_pay_type', type);
    },
    /**
     * @支付订单
     */
    payOrder() {
      let v = this;

      let paymentType = v.chosePayType == 1 ? (PLAT == 'wx' ? 1 : PLAT == 'wxmini' ? 2 : 1) : 4; //支付类型，1：微信（默认），2：微信小程序，4：支付宝

      Indicator.open({
        text: '支付中...',
        spinnerType: SPINNER_TYPE
      });
      v.$api.PW_WX_TicketOrderPay(v.torder_id, paymentType).then(res => {
        Indicator.close();
        if (res.status == 1) {
          if (paymentType == 1) {
            //微信公众号和微信网页支付
            let wx = res.data.wxpayinfo;
            let ua = navigator.userAgent.toLowerCase();

            if (ua.match(/MicroMessenger/i) == "micromessenger") {
              "object" == typeof WeixinJSBridge && "function" == typeof WeixinJSBridge.invoke ? v.launchWxPay(wx) : document.addEventListener("WeixinJSBridgeReady", function() { v.launchWxPay(wx) })
            } else {
              //网页版h5支付
              v.launchH5Pay(wx.mweb_url, v.torder_id);
            }
          } else if (paymentType == 2) {
            //小程序支付
            let mini = res.data.wxpayinfo;
            v.launchWxMiniPay(mini);
          } else {
            //其他支付方式（支付宝）
            //...
            let alipay = res.data.alipayinfo;
            v.launchH5Pay(alipay.url, v.torder_id);
          }
        } else {
          v.showToast(res.msg);
        }
      }).catch(err => {
        v.showToast('支付异常');
      })
    },
    /**
     * @清除倒计时轮询
     */
    clearCountLoop() {
      let v = this;
      if (v.countTimer) { //如果定时器在运行则关闭
        window.clearInterval(v.countTimer);
        v.countTimer = null;
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
    showToast(msg) {
      let toastobj = Toast({
        message: msg,
        position: 'center',
        duration: 2000
      });
      return toastobj;
    },
  }
}

</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';

.pay {
  min-height: calc(100vh - 60px);
  padding-bottom: 80px;
  background-color: #f3f5f9;

  &__count {
    width: 100%;
    line-height: 36px;
    padding: 0 15px;
    font-size: 14px;
    /*px*/
    font-weight: 400;
    color: #000;
    background-color: #FFF7DC;
    border: 1px solid rgba(244, 236, 208, 1);
    /*no*/

    i {
      font-style: normal;
      font-size: 14px;
      /*px*/
      color: #ED5565;
    }
  }

  &__info {
    background-color: #fff;
    padding: 10px 15px;
    /*px*/

    p {
      line-height: 1.8;
      font-size: 14px;
      /*px*/
    }
  }

  &__block {

    &__title {
      font-size: 15px;
      /*px*/
      font-weight: 400;
      color: #353535;
      padding: 20px 15px 13px;
    }

    //门票列表
    &__tickets {
      border-radius: 2px;
      background-color: #fff;

      ul {
        padding: 15px;
        min-height: 135px;

        &+ul {
          border-top: 1px solid #D1D1D1;
          /*no*/
        }

        li {
          display: flex;
          font-size: 14px;
          /*px*/

          &+li {
            margin-top: 12px;
          }

          label {
            min-width: 50px;
            display: flex;
            align-items: center;

            small {
              margin-left: 5px;
              color: #8D8D8D;
              font-size: 12px;
              /*px*/
            }
          }

          &.tickets {
            display: flex;
            flex-direction: column;
            border-top: 1px solid #E2E2E2;
            /*px*/

            .item {
              margin-top: 12px;

              .ticket__cont {
                display: flex;
                align-items: center;


                .ticket__desc {
                  width: 100%;

                  .name {
                    font-size: 14px;
                    /*px*/
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  }
                }
              }
            }
          }
        }
      }
    }

    &__payments {
      ul {

        li {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          padding: 15px;
          font-size: 15px;
          /*px*/
          font-weight: 400;
          background-color: #fff;

          &+li {
            border-top: 1px solid #E2E2E2;
            /*no*/
          }

          &::before {
            content: '';
            display: block;
            width: 30px;
            height: 30px;
            margin-right: 20px;
            background-position: center center;
            background-size: 100% 100%;
            background-repeat: no-repeat;
          }

          &.wx::before {
            background-image: url('../../img/pw/wx_pay.png');
          }

          &.zfb::before {
            background-image: url('../../img/pw/ali_pay.png');
          }


          &::after {
            content: '';
            position: absolute;
            display: block;
            top: 50%;
            right: 15px;
            margin-top: -12px;
            width: 24px;
            height: 24px;
            background-position: center center;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-image: url('../../img/pw/s2.png');
            transition: background-image 0.2s ease-in-out 0s;
          }

          &.checked::after {
            background-image: url('../../img/pw/s1.png');
          }
        }
      }
    }
  }

  &__bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    box-shadow: 0 -10px 10px #F3F5F9;
    @extend .layout_fixed_x_center;

    &__price {
      flex: 1;
      height: 50px;
      font-size: 16px;
      /*px*/
      text-align: left;
      padding: 0 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;


      span {
        font-weight: bold;
        color: #ED5565;

        i {
          font-size: 14px;
          /*px*/
          font-style: normal;
          font-weight: 400;
          margin-right: 2px;
        }
      }
    }

    &__btn {
      width: 145px;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      /*px*/
      text-align: center;
      color: #ffffff;
      background-color: $baseClr;
      transition: all .2s ease-in-out 0s;

      &:active {
        opacity: .7;
      }
    }
  }
}

</style>
