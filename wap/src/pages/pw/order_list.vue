<template>
  <Refresh ref="mescroll" @pullUpToLoadMore="pullUpToLoadMore" :page="page">
    <div class="order">
      <ul v-if="list.length>0" v-cloak>
        <li v-for="(a,ai) in list">
          <ul class="tickets">
            <li class="item">
              <!-- 1待审核，2待支付，3已完成（已付款），5已取消，6已退款 -->
              <div class="item__status" :class="{'gray': a.order_status==5 || a.order_status==6}">{{a.order_status_show}}</div>
              <ul class="item__info">
                <li>订单编号：{{a.order_sn}}</li>
                <li>下单时间：{{a.add_time}}</li>
                <li>参观时间：{{a.t_date}} {{a.time_period}}</li>
                <li class="price">订单金额：<span>￥<i>{{a.order_amount}}</i></span></li>
              </ul>
            </li>
          </ul>
          <ul class="btns">
            <li v-if="a.order_status==2" @click="confirmCancel(a.torder_id)">取消订单</li>
            <li v-if="a.order_status==2" @click="payOrder(a.torder_id)" class="btns__pay">支付</li>
            <li v-if="a.order_status!=2" @click="goDetail(a.torder_id)">查看详情</li>
          </ul>
        </li>
      </ul>
    </div>
  </Refresh>
</template>
<script>
import Refresh from './components/pullRefresh.vue';
import { Toast, MessageBox } from 'mint-ui';
import { Session } from '@/assets/js/utils.js';

const SPINNER_TYPE = "snake";

export default {
  name: 'order_list',
  props: [],
  data() {
    return {
      list: [],
      page: {
        num: 0,
        limit: 5
      },
      bRequest: true,
    };
  },
  components: {
    Refresh
  },
  created() {},
  mounted() {},
  computed: {

  },
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
        let temp = curPageData;
        if (page.num == 1) v.list = [];
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
        let res = await v.$api.PW_WX_TicketOrderList(pageSize, pageNum);
        successCallback && successCallback(res.data.orders)
      } catch (e) {
        // 联网失败的回调
        errorCallback && errorCallback()
      }
    },
    /**
     * @确认是否取消订单
     */
    confirmCancel(torder_id) {
      let v = this;
      MessageBox({
        title: '提示',
        message: '确定是否取消订单?',
        closeOnClickModal: false,
        showCancelButton: true,
        confirmButtonClass: 'pw-wx-mint-confirm-btn'
      }).then(action => {
        if (action === 'confirm') {
          v.cancelOrder(torder_id);
        }
      })
    },
    /**
     * @取消订单
     */
    cancelOrder(torder_id) {
      let v = this;
      v.$api.PW_WX_TicketOrderCancel(torder_id).then(res => {
        if (res.status == 1) {
          v.showToast('订单已取消');
          setTimeout(() => {
            v.pullUpToLoadMore({ num: 1, size: 5 }); //重新获取订单信息
          }, 300)
        } else {
          v.showToast(res.msg);
        }
      })
    },
    /**
     * @去支付
     */
    payOrder(torder_id) {
      let v = this;
      v.$router.push({ path: '/pw/person/order_pay', query: { 'torder_id': torder_id } });
    },
    /**
     * @查看详情
     */
    goDetail(torder_id) {
      let v = this;
      v.$router.push({ path: '/pw/person/order_detail', query: { 'torder_id': torder_id } });
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
    color: #EE8E41 !important;
  }
}

/deep/ .mescroll {
  top: 60px !important;
  background-color: #f2f2f2 !important;
  @extend .layout_fixed_x_center;
}

.order {

  >ul {
    width: 100%;
    background-color: #f2f2f2;
    height: 100%;

    >li {
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
            font-size: 18px;
            /*px*/
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
              font-size: 14px;
              /*px*/
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

        >li {
          display: inline-block;
          width: 76px;
          height: 23px;
          line-height: 23px;
          font-size: 14px;
          /*px*/
          text-align: center;
          color: #6B6B6B;
          border: 1px solid #6B6B6B;
          /*no*/
          border-radius: 11px;

          &+li {
            margin-left: 10px;
          }
        }

        &__pay {
          color: #EE8E41 !important;
          border-color: #EE8E41 !important;
        }
      }
    }
  }


  .tips {
    font-size: 12px;
    /*px*/
    font-weight: 400;
    color: #8F8F8F;
    line-height: 20px;
    text-align: center;
    padding: 15px;
  }
}

</style>
