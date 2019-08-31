<template>
  <div class="fill">
    <div class="count">订单已完成，请您在<i>{{minutes}}</i>分钟<i>{{seconds}}</i>秒完成网上支付</div>
    <ul class="info">
      <li>
        <span class="p1">讲解时间</span>
        <span class="p2">{{explain_post.t_date}}   {{explain_post.time_period}}</span>
      </li>
      <li>
        <span class="p1">下单时间</span>
        <span class="p2">{{explain_post.add_time}}</span>
      </li>
      <li>
        <span class="p1">订单金额</span>
        <span class="p2 price">￥{{explain_post.order_amount}}</span>
      </li>
      <li>
        <span class="p1">手机号码</span>
        <span class="p2">{{explain_post.contact_phone}}</span>
      </li>
    </ul>
    <div class="info_title">订单详情</div>
    <ul class="info">
      <div class="user__list">
        <ul>
          <li class="item">
            <div class="title">
              <div class="left">
                <div class="name">{{explain_post.go_username}}</div>
                <div class="num">{{explain_post.card_type}} {{explain_post.go_card_num}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <li class="language_p2">
        <span class="p1">参观人数</span>
        <span class="p2">{{explain_post.people_num}} 人</span>
      </li>
      <li class="language_p2">
        <span class="p1">语种</span>
        <div class="p2">
          {{explain_post.language_id}}
        </div>
      </li>
      <li class="language_p2">
        <span class="p1">讲解员</span>
        <div class="p2 guide">
          {{explain_post.guide_num}} 位
        </div>
      </li>
      <li class="language_p2">
        <span class="p1">讲解展厅</span>
        <span class="p2" style="line-height: 20px">{{explain_post.exhibition_names}}</span>
      </li>
      <!--      <li class="total">-->
      <!--        <span> 总计￥<span class="price">{{ explain_post.order_amount}}.00</span></span>-->
      <!--      </li>-->
    </ul>
    <!--    <div class="bottom" v-if="explain_post.order_status==2">-->
    <!--      <div class="submit" @click="cancel_fn">取消预约</div>-->
    <!--      <div class="submit pay" @click="explain_pay_fn">去支付</div>-->
    <!--    </div>-->
    <!--    <div class="bottom" v-else>-->
    <!--      <div class="submit">{{explain_post.order_status_show}}</div>-->
    <!--      <router-link class="submit pay" to="/explain" replace tag="div">重新预约</router-link>-->
    <!--    </div>-->
    <div class="block" v-if="explain_post.order_status==2">
      <div class="block__title">支付方式</div>
      <div class="block__payments">
        <ul>
          <li class="wx" :class="{'checked':chosePayType==1}" @click="chosePay(1)">微信</li>
          <!--          <li class="zfb" :class="{'checked':chosePayType==2}" @click="chosePay(2)" v-if="env=='t'">支付宝</li>-->
        </ul>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom__price">
        <div>付款：<span><i>¥</i>{{explain_post.order_amount}}</span></div>
      </div>
      <div class="bottom__btn " @click="explain_pay_fn">支付</div>
    </div>
  </div>
</template>
<script>
  import {Toast, MessageBox, Indicator} from 'mint-ui';
  import {Session} from '@/assets/js/utils.js';
  export default {
    name: 'explain_pay',
    data() {
      return {
        env: PLAT,
        visit: {
          date: Session.get('wx_explain_now_date'),
          time: Session.get('wx_explain_time_period'),
        },
        infoList: [],
        guide_cost: '',
        guide_info: {},
        explain_post: {},
        gorder_id: '',
        orderStatusTimer: null,
        minutes: '00',
        seconds: '00',
        chosePayType: Session.get('hb_explain_order_pay_type') || 1, //1微信支付（默认），2支付宝支付
        countTimer: null
      }
    },
    created() {
      this.gorder_id = this.$route.query.gorder_id;
      this.getGuideDetail()
      this.get_GuideOrderDetail()
    },
    methods: {
      // 获取基本信息
      getGuideDetail() {
        let v = this;
        v.$api.GuideDetail().then((res) => {
          this.guide_info = res.data;
        })
      },
      /**
       * @选择支付方式
       */
      chosePay(type) {
        let v = this;
        v.chosePayType = type;
        Session.set('hb_explain_order_pay_type', type);
      },
      // 获取订单详情
      get_GuideOrderDetail() {
        let v = this;
        this.$api.GuideOrderDetail(this.gorder_id).then(res => {
          if (res.status == 1) {
            this.explain_post = res.data;
            let language = this.guide_info.language
            for (let i in language) {
              if (language[i].language_id == this.explain_post.language_id) {
                this.explain_post.language_id = language[i].language_name;
              }
            }
            v.countDown(res.data.add_time);
            if (res.data.order_status == 2) {
              if (Session.get('hb_explain_wx_h5_pay_modal') == v.gorder_id) {
                Session.remove('hb_explain_wx_h5_pay_modal');
                v.showConfirmLayer();
              }
            } else if (res.data.order_status == 3) {
              Session.remove('hb_explain_order_pay_type');
              v.$router.replace({path: '/explain/explain_success', query: {'gorder_id': v.gorder_id}});
            }
          }
        })
      },
      /**
       * @支付中时查询订单状态
       */
      getOrderStatus(successCb) {
        let v = this;
        v.$api.GuideOrderStatus(v.gorder_id).then(res => {
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
      // 取消预约
      cancel_fn() {
        MessageBox({
          title: '提示',
          message: '确定是否取消订单?',
          showCancelButton: true,
          confirmButtonClass: 'pw-wx-mint-confirm-btn'
        }).then(action => {
          if (action === 'confirm') {
            this.$api.GuideOrderCancel(this.gorder_id).then(res => {
              if (res.status == 1) {
                Toast('取消成功')
              } else {
                Toast(res.msg)
              }
              setTimeout(() => {
                this.$router.replace('/explain')
              }, 2000)
            })
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
              if (res.order_status == 3) {
                // 已完成支付跳转详情
                Session.remove('hb_explain_order_pay_type');
                v.$router.replace({path: '/explain/explain_success', query: {'gorder_id': v.gorder_id}});
              } else if (res.order_status == 2) {
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
       * 发起支付的同时轮询查询订单状态
       */
      orderStatusLoop() {
        let v = this;

        // 防止重复开启轮询
        if (!v.orderStatusTimer) {
          v.orderStatusTimer = setInterval(() => {
            v.getOrderStatus((res) => {
              // 1待审核，2待付款，3已完成（已付款），5已取消，6已退款
              if (res.order_status != 2) {
                if (res.order_status == 3) {
                  // 已完成支付跳转成功
                  Session.remove('hb_explain_order_pay_type');
                  v.$router.replace({path: '/explain/explain_success', query: {'gorder_id': v.gorder_id}});
                  return;
                }
                //只要不是未支付状态，则清除订单状态轮询（包含一直未支付自动取消的情况）
                v.clearOrderStatusLoop();
                v.get_GuideOrderDetail();
              }
            });
          }, 3e3);
        }
      },
      /**
       * @微信支付（微信内置）
       */
      launchWxPay(wx) {
        let v = this;
        WeixinJSBridge.invoke('getBrandWCPayRequest', wx, function (res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            //支付成功
            Session.remove('hb_explain_order_pay_type');
            v.$router.replace({path: '/explain/explain_success', query: {'gorder_id': v.gorder_id}});
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
      launchH5Pay(mweb_url, gorder_id) {
        let v = this;
        console.log(mweb_url)
        v.showConfirmLayer(); //打开用于用户查单操作的弹窗
        Session.set('hb_explain_wx_h5_pay_modal', gorder_id);
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
      // 支付
      explain_pay_fn() {
        let v = this;
        // let paymentType = PLAT == 'wx' ? 1 : PLAT == 'wxmini' ? 2 : 1; //支付类型，1：微信（默认），2：微信小程序
        let paymentType = v.chosePayType == 1 ? (PLAT == 'wx' ? 1 : PLAT == 'wxmini' ? 2 : 1) : 4; //支付类型，1：微信（默认），2：微信小程序，4：支付宝
        Indicator.open({
          text: '支付中...',
          spinnerType: 'snake'
        });
        v.$api.GuideOrderPay(v.gorder_id, paymentType).then(res => {
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
                v.launchH5Pay(wx.mweb_url, v.gorder_id);
              }
            } else if (paymentType == 2) {
              //小程序支付
              let mini = res.data.wxpayinfo;
              v.launchWxMiniPay(mini);
            } else {
              //其他支付方式
              //...
              let alipay = res.data.alipayinfo;
              v.launchH5Pay(alipay.url, v.gorder_id);
            }
          } else {
            v.showToast(res.msg);
          }
        }).catch(err => {
          v.showToast('支付异常');
        })
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
      // 弹层
      showToast(msg) {
        Toast({
          message: msg,
          position: 'center',
          duration: 2000
        });
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
                v.$router.replace('/explain');
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
            v.$router.replace('/explain');
          });
          return;
        }
      },
    }
  }

</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .fill {
    min-height: calc(100vh - 60px);
    background-color: #F2F2F2;

    .count {
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

    .info_title {
      padding: 20px 0 16px 13px;
      color: #353535;
      font-size: 15px;
      /*px*/

    }

    ul.info {
      padding: 0 15px;
      background-color: #fff;

      > li {
        padding: 15px 0;
        font-size: 15px;
        /*px*/
        font-weight: 400;
        color: #545454;

        & + li {
          border-top: 1px solid #B5B5B5;
          /*no*/
        }

        .p1 {
          position: relative;
          padding: 0 13px 0 0;
          width: 100px;

          &.need {
            &::before {
              position: absolute;
              left: 5px;
              top: 50%;
              text-align: center;
              transform: translateY(-50%);
              content: '*';
              padding-top: 5px;
              color: #E32A2A;
              font-size: 15px;
              /*px*/
            }
          }
        }

        .p2 {
          div {
            flex: 1;
          }

          input {
            height: 100%;
            outline: none;
            border: 0;
            font-size: 14px;
            /*px*/
            font-weight: 400;
            padding: 0 0 0 30px;

            &::placeholder {
              color: #B0B0B0;
              text-align: left;
            }
          }
        }

        .price {
          color: #E8593E;
          font-weight: bold;
        }
      }

      .language_p2 {
        display: flex;
        align-items: center;

        .p2 {
          display: flex;
          align-items: center;
          flex: 1;
          text-align: justify;

          .iconfont {
            color: #353535;
            font-size: 18px;
            /*px*/
            font-weight: bold;
          }
        }
      }


      .total {
        text-align: right;
        font-size: 14px;
        /*px*/


      }
    }

    .user__list {
      background-color: #fff;

      .check__all {
        display: flex;
        align-items: center;
        color: #545454;
        font-size: 12px;
        /*px*/
        padding-top: 15px;

        &::before {
          content: '';
          display: inline-block;
          width: 18px;
          height: 18px;
          background-position: center center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-image: url('../../img/pw/checkbox.png');
          transition: all .2s ease-in-out 0s;
          margin-right: 15px;
        }

        &.active {
          &::before {
            background-image: url('../../img/pw/checkbox_ed.png');
          }
        }
      }

      ul {
        li.item {
          border-bottom: 1px solid #B5B5B5;
          /*no*/
          .title {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left {
              line-height: 25px;
              padding: 16px 0 0 0;

              .name {
                font-size: 17px;
                /*px*/
                font-weight: 600;
                color: #353535;
              }

              .num {
                padding: 5px 0;
                font-size: 14px;
                /*px*/
                font-weight: 400;
                color: #545454;
              }
            }

            .right {
              img {
                width: 17px;
                height: 19px;
                vertical-align: top;
              }
            }
          }
        }
      }
    }

    /*.bottom {*/
    /*  position: fixed;*/
    /*  bottom: 0;*/
    /*  left: 0;*/
    /*  width: 100%;*/
    /*  display: flex;*/
    /*  padding: 20px;*/
    /*  align-items: center;*/
    /*  justify-content: space-between;*/
    /*  !*background-color: #E7E7E7;*!*/
    /*  .submit {*/
    /*    width: 149px;*/
    /*    height: 42px;*/
    /*    line-height: 42px;*/
    /*    text-align: center;*/
    /*    border-radius: 24px;*/
    /*    color: #353535;*/
    /*    border: 1px solid;*/
    /*    !*no*!*/
    /*    font-size: 18px;*/
    /*    !*px*!*/
    /*    font-weight: 400;*/

    /*    &:active {*/
    /*      opacity: .7;*/
    /*    }*/
    /*  }*/

    /*  .pay {*/
    /*    background: rgba(204, 151, 76, 1);*/
    /*    color: #fff;*/
    /*    border: 0;*/
    /*  }*/
    /*}*/
    .block {
      padding: 0 0 100px 0;

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

          & + ul {
            border-top: 1px solid #D1D1D1;
            /*no*/
          }

          li {
            display: flex;
            font-size: 14px;
            /*px*/

            & + li {
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

            & + li {
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

    .bottom {
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
