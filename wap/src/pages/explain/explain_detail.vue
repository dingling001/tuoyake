<template>
  <div class="fill">
    <ul class="info">
      <li class="language_p2">
        <span class="p1">订单编号</span>
        <span class="p2"><span>{{explain_post.order_sn}}</span>  <span
          class="status">{{explain_post.order_status_show}}</span></span>
      </li>
      <li>
        <span class="p1">参观时间：</span>
        <span class="p2">{{explain_post.t_date}} {{explain_post.time_period}}</span>
      </li>
      <li>
        <span class="p1">下单时间：</span>
        <span class="p2">{{explain_post.add_time}}</span>
      </li>
      <li>
        <span class="p1">订单金额：</span>
        <span class="p2"><span class="price"><span>￥</span>{{explain_post.order_amount}}.00</span></span>
      </li>
      <li>
        <span class="p1">手机号码：</span>
        <span class="p2">{{explain_post.contact_phone}}</span>
      </li>
    </ul>
    <div class="info_title">订单详情</div>
    <ul class="info">
      <li class="language_p2" v-if="explain_post.go_teamname">
        <span class="p1">团体预约</span>
        <span class="p2">{{explain_post.go_teamname}} </span>
      </li>
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
        <div class="p2">
          {{explain_post.exhibition_names}}
        </div>
      </li>

    </ul>
    <div class="bottom" v-if="explain_post.order_status==2">
      <div class="submit" @click="cancel_fn">取消预约</div>
      <div class="submit pay" @click="explain_pay_fn">去支付</div>
    </div>
    <div class="bottom" v-else-if="explain_post.order_status==3">
      <div class="submit " @click="refund_fn">取消预约</div>
    </div>
    <div class="bottom" v-else>
      <div class="submit" @click="$router.back(-1)">返回</div>
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
        visit: {
          date: Session.get('wx_explain_now_date'),
          time: Session.get('wx_explain_time_period'),
        },
        infoList: [],
        guide_cost: '',
        guide_info: {},
        explain_post: {},
        gorder_id: ''
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
      // 获取订单详情
      get_GuideOrderDetail() {
        this.$api.GuideOrderDetail(this.gorder_id).then(res => {
          // console.log(res)
          if (res.status == 1) {
            this.explain_post = res.data;
            let language = this.guide_info.language
            for (let i in language) {
              if (language[i].language_id == this.explain_post.language_id) {
                this.explain_post.language_id = language[i].language_name;
              }
            }
          }
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
                setTimeout(() => {
                  this.$router.replace('/explain')
                }, 2000)
              }
              this.get_GuideOrderDetail()
            })
          }
        })
      },
      // 申请退款
      refund_fn() {
        let that = this;
        MessageBox({
          title: '提示',
          message: '确定是否取消订单?',
          showCancelButton: true,
          confirmButtonClass: 'pw-wx-mint-confirm-btn'
        }).then(() => {
          that.$api.GuideorderRefund(that.gorder_id).then(res => {
            if (res.status == 1) {
              Toast('取消成功')
            } else {
              Toast(res.msg);
              setTimeout(() => {
                this.$router.back(-1)
              }, 2000)
            }
            this.get_GuideOrderDetail()
          })
        }).catch(() => {

        });
      },
      /**
       * @微信支付（微信内置）
       */
      launchWxPay(wx) {
        let v = this;
        WeixinJSBridge.invoke('getBrandWCPayRequest', wx, function (res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            //支付成功
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
        v.showConfirmLayer(); //打开用于用户查单操作的弹窗
        Session.set('hb_pw_wx_h5_pay_modal', gorder_id);
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
        let paymentType = PLAT == 'wx' ? 1 : PLAT == 'wxmini' ? 2 : 1; //支付类型，1：微信（默认），2：微信小程序
        Indicator.open({
          text: '支付中...',
          spinnerType: 'snake'
        });
        v.$api.GuideOrderPay(v.gorder_id, paymentType).then(res => {
          Indicator.close();
          if (res.status == 1) {
            if (paymentType == 1) {
              //微信公众号和微信网页支付
              let wx = res.data.qrcode;
              let ua = navigator.userAgent.toLowerCase();

              if (ua.match(/MicroMessenger/i) == "micromessenger") {
                "object" == typeof WeixinJSBridge && "function" == typeof WeixinJSBridge.invoke ? v.launchWxPay(wx) : document.addEventListener("WeixinJSBridgeReady", function () {
                  v.launchWxPay(wx)
                })
              } else {
                //网页版h5支付
                v.launchH5Pay(wx.mweb_url, v.gorder_id);
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
    }
  }

</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .fill {
    min-height: calc(100vh - 60px);
    background-color: #F2F2F2;
    padding-bottom: 100px;

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
        padding: 12px 0 0 0;
        font-size: 14px;
        /*px*/
        font-weight: 400;
        color: #545454;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:first-child {
          padding: 12px 0;
          border-bottom: 1px solid rgba(181, 181, 181, .18);
          /*no*/
        }

        &:last-child {
          padding: 12px 0;
        }

        .p1 {
          position: relative;
          /*padding: 0 13px;*/
          width: 100px;
          font-size: 14px;
          /*px*/
          color: #353535;
        }

        .p2 {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;

          .status {
            color: $baseClr;
            font-weight: bold;
          }

          .price {
            color: #E8593E;
            font-size: 17px;
            /*px*/
            font-weight: bold;

            span {
              font-size: 14px;
              /*px*/
            }
          }
        }
      }

      .language_p2 {
        display: flex;
        align-items: center;
        padding: 18px 0;
        border-bottom: 1px solid rgba(181, 181, 181, .5);
        /*no*/
        .p2 {
          display: flex;
          align-items: center;
          flex: 1;

          .iconfont {
            color: #353535;
            font-size: 18px;
            /*px*/
            font-weight: bold;
          }
        }

        &:last-child {
          border: 0;
        }
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
          /*border-bottom: 1px solid #B5B5B5;*/
          border-bottom: 1px solid rgba(181, 181, 181, .5);
          /*no*/
          /*!*no*!*/
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

    .bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      padding: 20px;
      align-items: center;
      justify-content: space-between;
      /*background-color: #E7E7E7;*/
      .submit {
        width: 149px;
        margin: 0 auto;
        height: 42px;
        line-height: 42px;
        text-align: center;
        border-radius: 24px;
        color: #353535;
        border: 1px solid;
        /*no*/
        font-size: 18px;
        /*px*/
        font-weight: 400;

        &:active {
          opacity: .7;
        }
      }

      .pay {
        background: $baseClr;
        color: #fff;
        border: 0;
      }
    }
  }
</style>
