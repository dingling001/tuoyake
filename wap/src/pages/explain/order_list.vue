<template>
  <Refresh ref="mescroll" @pullUpToLoadMore="pullUpToLoadMore" :page="page">
    <div class="order">
      <ul v-if="list.length>0" v-cloak>
        <li v-for="(a,ai) in list">
          <ul class="tickets">
            <li class="item">
              <!-- 1待审核，2待支付，3已完成（已付款），5已取消，6已退款 -->
              <div class="item__status" :class="{'gray': a.order_status==5 || a.order_status==6}">
                {{a.order_status_show}}
              </div>
              <ul class="item__info">
                <li>订单编号：{{a.order_sn}}</li>
                <li>下单时间：{{a.add_time}}</li>
                <li>参观时间：{{a.t_date}} {{a.time_period_show}}</li>
                <li class="price">订单金额：<span>￥<i>{{a.order_amount}}</i></span></li>
              </ul>
            </li>
          </ul>
          <ul class="btns">
            <li v-if="a.order_status==2" @click="confirmCancelOrder(a.gorder_id)">取消订单</li>
            <router-link tag="li" :to="{path:'/explain/explain_detail',query:{'gorder_id':a.gorder_id}}">查看详情
            </router-link>
            <li v-if="a.order_status==2" @click="payOrder(a.gorder_id)" class="btns__pay">支付</li>
          </ul>
        </li>
      </ul>
    </div>
  </Refresh>
</template>
<script>
  import Refresh from './pullRefresh.vue';
  import {Toast, MessageBox, Indicator} from 'mint-ui';

  export default {
    name: 'order_list',
    props: [],
    data() {
      return {
        curOrderId: '', //当前订单id
        list: [],
        page: {
          num: -1,
          limit: 5
        },
        bRequest: true,
      };
    },
    components: {
      Refresh
    },
    created() {
      let v = this;
    },
    mounted() {
    },
    computed: {},
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$refs.mescroll.onBeforeRouteEnter(vm);
      })
    },
    //此处主要针对ios开启回弹效果，建议在页面关闭前调用mescroll.setBounce(true), 可避免对其他页面的影响
    beforeRouteLeave(to, from, next) {
      this.$refs.mescroll.onBeforeRouteLeave();
      next();
    },
    methods: {
      pullUpToLoadMore(page) {
        let v = this;
        v.getList(page.size, page.num, (curPageData) => {
          // console.log(curPageData)
          let temp = curPageData;
          if (page.num == 0) v.list = [];
          if (temp.length != 0) {
            v.list = v.list.concat(temp)
            v.$nextTick(() => {
              //下拉刷
              v.$refs.mescroll.endSuccess(v.list.length)
            })
          } else {
            // 没有更多了
            v.$refs.mescroll.endSuccess(0)
          }
          v.$forceUpdate();
        }, () => {
          //重置音频
          v.$refs.mescroll.endErr()
        })
      },
      async getList(pageSize, pageNum, successCallback, errorCallback) {
        let v = this;
        try {
          let res = await v.$api.GuideOrder(pageSize, pageNum);
          successCallback && successCallback(res.data)
        } catch (e) {
          // 联网失败的回调
          errorCallback && errorCallback()
        }
      },
      confirmCancelOrder(gorder_id) {
        let v = this;
        v.curOrderId = gorder_id;
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
        if (v.curOrderId) {
          v.$api.GuideOrderCancel(v.curOrderId).then(res => {
            if (res.status == 1) {
              v.showToast('订单已取消');
              setTimeout(() => {
                v.pullUpToLoadMore({num: 0, size: 5}); //重新获取订单信息
              }, 300)
            } else {
              v.showToast(res.msg);
            }
          })
        }
      },
      /**
       * @微信支付（微信内置）
       */
      launchWxPay(wx,gorder_id) {
        let v = this;
        WeixinJSBridge.invoke('getBrandWCPayRequest', wx, function (res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            //支付成功
            v.$router.replace({path: 'explain/explain_success', query: {'gorder_id': gorder_id}});
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
      /**
       * @订单支付
       */
      payOrder(gorder_id) {
        let v = this;
        let paymentType = PLAT == 'wx' ? 1 : PLAT == 'wxmini' ? 2 : 1; //支付类型，1：微信（默认），2：微信小程序
        Indicator.open({
          text: '支付中...',
          spinnerType: 'snake'
        });
        v.$api.GuideOrderPay(gorder_id, paymentType).then(res => {
          Indicator.close();
          if (res.status == 1) {
            if (paymentType == 1) {
              //微信公众号和微信网页支付
              let wx = res.data.qrcode;
              let ua = navigator.userAgent.toLowerCase();

              if (ua.match(/MicroMessenger/i) == "micromessenger") {
                "object" == typeof WeixinJSBridge && "function" == typeof WeixinJSBridge.invoke ? v.launchWxPay(wx) : document.addEventListener("WeixinJSBridgeReady", function () {
                  v.launchWxPay(wx,gorder_id)
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
      showToast(msg) {
        Toast({
          message: msg,
          position: 'center',
          duration: 2000
        });
      },
    },
  };

</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';

  /deep/ .mint-msgbox-btn {
    .mint-msgbox-confirm {
      color: $baseClr !important;
    }
  }

  /deep/ .mescroll {
    top: 60px !important;
    background-color: #f2f2f2;
  }

  .order {

    > ul {
      width: 100%;
      background-color: #f2f2f2;
      height: 100%;

      > li {
        padding: 15px 25px;
        background-color: #fff;
        margin-top: 10px;

        ul.tickets {

          .item {
            position: relative;
            width: 100%;
            height: 100px;
            font-size: 13px;
            /*px*/

            &__status {
              position: absolute;
              width: 20px;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #E8593E;
              font-size: 18px; /*px*/
              font-weight: bold;
              line-height: 1.5;

              &.gray {
                color: #979797;
              }
            }

            &__info {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              margin-left: 35px;
              height: 100%;
              padding: 5px 0;
              color: #353535;

              li {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-size: 14px; /*px*/
              }

              .price {
                span {
                  color: #E8593E;

                  i {
                    font-weight: bold;
                    font-style: normal;
                  }
                }
              }
            }
          }
        }

        .btns {
          display: flex;
          justify-content: flex-end;
          margin-top: 15px;

          > li {
            display: inline-block;
            width: 76px;
            height: 23px;
            line-height: 23px;
            font-size: 14px; /*px*/
            text-align: center;
            color: #6B6B6B;
            border: 1px solid #6B6B6B; /*no*/
            border-radius: 11px;

            & + li {
              margin-left: 10px;
            }
          }

          &__pay {
            color: $baseClr !important;
            border-color:$baseClr !important;
          }
        }
      }
    }

    .tips {
      font-size: 12px; /*px*/
      font-weight: 400;
      color: #8F8F8F;
      line-height: 20px;
      text-align: center;
      padding: 15px;
    }
  }

</style>
