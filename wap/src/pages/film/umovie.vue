<template>
  <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :loadingText="loadingText" v-else class="list">
    <div class="order">
      <ul v-if="list.length>0">
        <li v-for="(a,ai) in list">
          <ul class="tickets">
            <li class="item">
              <!--1待支付2支付完成3已取消4已完成5已过期-->
              <div class="item_img"><img :src="$toThumbsimg(a.movie_img,94,132,33,$moive)" alt=""></div>
              <!--<div class="item__status" :class="{'gray': a.order_status==5 || a.order_status==6}">{{a.order_status_show}}</div>-->
              <div class="item_r">
                <div class="item_name">
                  <span class="name">{{a.movie_name}}</span>
                  <span class="status success" v-if="a.status==1">待支付</span>
                  <span class="status success" v-else-if="a.status==2">预约成功</span>
                  <span class="status" v-else-if="a.status==3">已取消</span>
                  <span class="status" v-else-if="a.status==4">已完成</span>
                  <span class="status" v-else-if="a.status==5">已过期</span>
                </div>
                <div class="item_info">订单编号：{{a.order_no}}</div>
                <div class="item_info">下单时间：{{a.created_at}}</div>
                <div class="item_info">场次：{{a.date}} {{a.start_time}}</div>
                <div class="item_info">订单金额：<span>{{a.amount}}</span></div>
              </div>
            </li>
          </ul>
          <ul class="btns">
            <li @click="go_detail(a.movie_img,a.order_id)">
              查看详情
            </li>
            <li @click="confirmCancelOrder(a.order_id)" v-if="a.status==2||a.status==1">取消订单</li>
            <li class="btns__pay" v-if="a.status==1" @click="pay_order(a.order_id)">支付</li>
          </ul>
        </li>
      </ul>
      <div  v-else class="nodata">暂无数据</div>
    </div>
  </v-scroll>
</template>
<script>
  import Scroll from './Scroll.vue';
  import {Toast, MessageBox, Indicator} from 'mint-ui';

  export default {
    name: 'order_list',
    props: [],
    data() {
      return {
        curOrderId: '', //当前订单id
        list: [],
        page: {
          num: 0,
          limit: 5
        },
        counter: 1,
        take: 5,
        loadingText: '',
        payment_id: 1
      };
    },
    components: {
      'v-scroll': Scroll
    },
    created() {
      let v = this;
      v.get_FilmOrderList(0)
    },
    mounted() {
    },
    methods: {
      // 获取列表
      get_FilmOrderList(order_status) {
        this.$api.FilmOrderList(
          localStorage.app_token,
          order_status,
          this.take,
          0,
        ).then(res => {
          this.list = res.data.order_list;
          if (res.data.order_list.length < this.take) {
            this.loadingText = '';
          }
        })
      },
      // 下拉刷新
      onRefresh(done) {
        this.counter = 0
        this.get_FilmOrderList(this.counter, 0);
        done() // call done
      },
      // 上拉加载
      onInfinite(done) {
        let vm = this;
        vm.$api.FilmOrderList(localStorage.getItem('app_token'), 0, this.take, this.counter * this.take).then((res) => {
          let arr = res.data.order_list;
          vm.loadingText = '上拉加载更多'
          vm.list = vm.list.concat(arr);
          if (arr.length < vm.take) {
            setTimeout((res) => {
              vm.loadingText = '到底啦';
            }, 1000)
            //vm.$el.querySelector('.load-more').style.display = 'none';
            return;
          } else {
            vm.counter++;
          }
          done() // call done
        }, (response) => {
          //console.log('error');
        });
      },
      confirmCancelOrder(torder_id) {
        let v = this;
        v.curOrderId = torder_id;
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
          v.$api.FilmCancelOrder(localStorage.getItem('app_token'), v.curOrderId).then(res => {
            if (res.status == 1) {
              v.showToast('订单已取消');
              this.get_FilmOrderList(0, 0)
            } else {
              v.showToast(res.msg);
            }
          })
        }
      },
      // 支付
      pay_order(id) {
        let v = this;
        let paymentType = PLAT == 'wx' ? 1 : PLAT == 'mini' ? 2 : 1; //支付类型，1：微信（默认），2：微信小程序
        this.$api.FilmPayOrder(id,this.payment_id).then(res => {
          if (res.status == 1) {
            if (paymentType == 1) {
              //微信公众号和微信网页支付
              let wx = res.data.wxpayinfo;
              let ua = navigator.userAgent.toLowerCase();
              if (ua.match(/MicroMessenger/i) == "micromessenger") {
                WeixinJSBridge.invoke('getBrandWCPayRequest', wx, function (res) {
                  if (res.err_msg == "get_brand_wcpay_request:ok") {
                    //支付成功
                    v.$router.replace('/film/film_success');
                  } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                    //支付取消
                    v.showToast('支付取消');
                  } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                    //支付失败
                    v.showToast('支付失败');
                  }
                });
              } else {
                //网页版h5支付
                location.href = wx.mweb_url;
              }
            } else if (paymentType == 2) {
              //小程序支付
              let mini = res.data.wxpayinfo;
              let path = `/pages/pay/index?appId=${mini.appId}&timeStamp=${mini.timeStamp}&nonceStr=${mini.nonceStr}&package=${encodeURIComponent(mini.package)}&signType=${mini.signType}&paySign=${encodeURIComponent(mini.paySign)}`;
              wx.miniProgram.navigateTo({
                url: path
              })
            } else {
              //其他支付方式
              //...
            }
          } else {
            v.showToast(res.msg);
          }
        }).catch(err => {
          //console.log(err)

        })
      },
      // 公众号支付
      showToast(msg) {
        Toast({
          message: msg,
          position: 'center',
          duration: 2000
        });
      },
      // 去详情
      go_detail(img, order_id) {
        if (img) {
          this.$router.push({path: '/film/film_detail', query: {'order_id': order_id}})
        } else {
          this.showToast('该片已下架')
        }

      }
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
    /*margin-top: 30px;*/
    > ul {
      width: 100%;
      background-color: #f2f2f2;
      height: 100%;

      > li {
        padding: 12px 0 5px 12px;
        background-color: #fff;
        border: 1px solid rgba(181, 181, 181, .18);
        /*no*/
        ul.tickets {
          .item {
            position: relative;
            width: 100%;
            font-size: 13px;
            display: flex;

            .item_img {
              flex-shrink: 0;
              width: 94px;
              height: 132px;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              background-color: #f5f5f5;

              img {
                width: 100%
              }
            }

            .item_r {
              flex: 1;
              margin-left: 20px;

              .item_name {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 16px;
                padding: 0 20px 0 0;

                .name {
                  font-size: 17px;
                  /*px*/
                  color: #282828;
                  font-weight: bold;
                  flex: 1;
                  overflow:hidden;text-overflow:ellipsis;
                  text-align: justify;
                  white-space:nowrap;
                  margin-right: 5px;
                }

                .status {
                  color: rgba(0, 0, 0, .5);
                  font-size: 13px;
                  /*px*/
                  flex-shrink: 0;
                }

                .success {
                  color: $baseClr;
                  font-size: 13px;
                  /*px*/
                }
              }

              .item_info {
                color: #353535;
                font-size: 13px;
                /*px*/
                padding-bottom: 16px;

                span {
                  color: $baseClr;
                  font-size: 15px;
                  /*px*/
                  font-weight: bold;
                }

                &:last-child {
                  padding: 0;
                }
              }
            }
          }
        }

        .btns {
          display: flex;
          justify-content: flex-end;
          margin-top: 8px;
          padding: 0 22px 0 0;

          > li {
            display: inline-block;
            width: 76px;
            height: 23px;
            line-height: 23px;
            font-size: 14px;
            text-align: center;
            color: #6B6B6B;
            border: 1px solid #6B6B6B;
            border-radius: 11px;

            & + li {
              margin-left: 10px;
            }
          }

          &__pay {
            color: $baseClr!important;
            border-color:$baseClr !important;
          }
        }
      }
    }

    .tips {
      font-size: 12px;
      font-weight: 400;
      color: #8F8F8F;
      line-height: 20px;
      text-align: center;
      padding: 15px;
    }
    .nodata{
      line-height: 1.066667rem;
      text-align: center;
      color: #ccc;
      font-size: 12px;
    }
  }

</style>
