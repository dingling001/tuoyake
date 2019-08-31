<template>
  <div class="detail" v-cloak>
    <div class="detail__title">
      <span>订单编号：{{detail.order_sn}}</span>
      <!-- 订单状态，1待审核，2待付款，3已完成（已付款），5已取消，6已退款 -->
      <span class="status__txt" :class="{'gray':[5,6].includes(+detail.order_status)}">{{detail.order_status_show}}</span>
    </div>
    <ul class="detail__info">
      <li>
        <p>参观日期：{{detail.t_date}} {{detail.time_period}}</p>
        <p>下单时间：{{detail.add_time}}</p>
        <p>订单金额：<span style="color: #DA4453">￥{{detail.order_amount}}</span></p>
      </li>
    </ul>
    <div class="detail__list" v-if="detail.item.length>0">
      <ul v-for="(a,ai) in detail.item" :key="ai">
        <li>
          <label>{{a.toi_username}}<small>{{a.pt_name}}</small></label>
        </li>
        <li>
          <label>{{a.toi_cardtype}}</label>
          <span>{{a.toi_card_num}}</span>
        </li>
        <li class="tickets" v-if="a.tickets.length>0">
          <!-- 门票状态 toi_status  1待取票，2待检票，22待支付，3已检票，5已过期，55已取消，6已退票 -->
          <div class="item" :class="{'gray':[3,5,6].includes(+b.toi_status)}" v-for="(b,bi) in a.tickets">
            <div class="ticket__cont">
              <!-- <span class="select_icon" :class="{'on':b.isSelected==1}" v-if="b.can_refund && isRefund" @click="chooseItem(b,a.tickets)"></span> -->
              <i class="iconfont" :class="[b.isSelected==1?'iconfuxuankuang1':'iconfuxuankuang']" v-if="b.can_refund && isRefund" @click="chooseItem(b,a.tickets)"></i>
              <div class="ticket__desc">
                <div class="name">
                  <span>{{b.ticket_name}}</span>
                  <span>{{b.discount_price}}</span>
                </div>
                <div class="status">
                  <span class="tickets__status">{{b.toi_status_show}}</span>
                  <span class="qr__btn" v-if="b.jp_qrcode" @click="toggleQrcode(ai,bi)">{{b.jp_qrcode && b.jp_qrcode === toggleIndex?'收起':'查看检票二维码'}}</span>
                </div>
              </div>
            </div>
            <div class="qrcode" v-show="b.jp_qrcode && b.jp_qrcode === toggleIndex"><img :src="b.jp_qrcode"></div>
          </div>
        </li>
      </ul>
    </div>
    <transition-group name="slid_up">
      <!-- 订单状态，1待审核，2待付款，3已完成（已付款），5已取消，6已退款,66部分退票 -->
      <div class="waiting" v-if="detail.can_refund && refundArr.length==0" @click="isRefund=!isRefund" key="btn2">
        <span class="return__btn">退票</span>
      </div>
      <div class="refund" v-if="refundArr.length>0" key="btn3">
        <div class="refund__price">
          <div>退票金额：<span><i>¥</i>{{calcRefundPrice}}</span></div>
        </div>
        <div class="refund__btn" @click="showRefundLayer">确认退票</div>
      </div>
    </transition-group>
    <transition name="fade">
      <div class="cover" v-show="layerConfirmStatus" @click="closeLayer" @touchmove.prevent></div>
    </transition>
    <div class="modal" v-if="layerConfirmStatus==1" key="modal1">
      <div class="modal__body">
        <div class="confrim">{{layerConfirmTxt}}</div>
      </div>
      <div class="modal__foot">
        <span @click="closeLayer">取消</span>
        <span @click="handlelayerConfirm">确定</span>
      </div>
    </div>
    <div class="modal" v-if="layerConfirmStatus==2" key="modal2">
      <div class="modal__body">
        <div class="success">
          <div class="icon__status">
            <i class="iconfont iconkongxinduigou"></i>
            <p>退票成功!</p>
          </div>
          <div>您已成功退票，其余门票请准时到馆参观</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Indicator, Toast, MessageBox } from 'mint-ui';
import { Session, Exp, ModalHelper } from '@/assets/js/utils.js';

const SPINNER_TYPE = "snake";

export default {
  name: 'order_detail',
  props: [],
  data() {
    return {
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
      toggleIndex: '',
      layerFlag: 0, //1退票申请
      layerConfirmStatus: 0, //1、确认退票，2、退票成功
      layerConfirmTxt: '确定提交退票申请吗？',
      isRefund: false,
      refundArr: [],
      refundLayerStatus: 0, //1确认退票，2、成功
    };
  },
  created() {
    let v = this;
    v.torder_id = v.$route.query.torder_id;
  },
  mounted() {
    let v = this;
    v.torder_id && v.getDetail();
  },
  computed: {
    calcRefundPrice() {
      let v = this;
      if (v.refundArr.length == 0) return;
      let price = 0;
      for (let item of v.refundArr) {
        price += parseFloat(item.discount_price, 10);
      }
      return price.toFixed(2);
    }
  },
  watch: {
    layerConfirmStatus(value) {
      value ? ModalHelper.afterOpen() : ModalHelper.beforeClose();
    }
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
          res.data.item = v.addAttr(res.data.item); //添加选择标志
          v.detail = res.data;
        } else {
          v.showToast(res.msg);
        }
      })
    },
    /**
     * @查看二维码
     */
    toggleQrcode(ai, bi) {
      let v = this;
      let qr = v.detail.item[ai].tickets[bi].jp_qrcode;
      if (qr) {
        v.toggleIndex = qr !== v.toggleIndex ? qr : "";
      } else {
        Toast({
          message: '暂无可用二维码',
          position: 'center',
          duration: 2000
        });
      }
    },
    //每一项中添加isSelected
    addAttr(arr) {
      let v = this;
      arr.forEach(function(o) {
        let tickets = o.tickets;
        tickets.forEach(function(obj) {
          v.$set(obj, "isSelected", 0);
        })
      });
      return arr;
    },
    /**
     * curTicket        [当前参观者选中的门票]
     * curTicketsList   [当前参观者门票列表]
     *
     * 父选中，子全选中（包含子单独选中时的去除重复选中状态）
     * 父取消，子全取消
     * 子可单独选中，全部子选中时，父不选中
     */
    chooseItem(curTicket, curTicketsList) {
      let v = this;
      let newArr = [];

      let baseTicket = curTicketsList.find((o) => o.ticket_id == 1); //基础票
      let otherTickets = curTicketsList.filter((o) => o.ticket_id != 1); //收费票list

      if (curTicket.ticket_id == 1) {
        //当前选中基础门票时
        let result = baseTicket.isSelected == 0 ? 1 : 0;
        baseTicket.isSelected = result;
        otherTickets.forEach(function(child) {
          child.isSelected = result;
        });
      } else {
        //其他收费门票
        curTicket.isSelected = curTicket.isSelected == 0 ? 1 : 0;
        baseTicket.isSelected = 0;
      }

      v.detail.item.forEach(function(items) {
        let tickets = items.tickets;
        tickets.forEach(function(obj) {
          if (obj.can_refund && obj.isSelected == 1) {
            newArr.push(obj);
          }
        })
      })
      v.refundArr = newArr;
    },
    /**
     * @关闭弹窗
     */
    closeLayer() {
      let v = this;
      v.layerFlag = 0;
      v.layerConfirmStatus = 0;
    },
    /**
     * @是否退票
     */
    showRefundLayer() {
      let v = this;
      v.layerFlag = 1;
      v.layerConfirmStatus = 1;
      v.layerConfirmTxt = '确定提交退票申请吗？';
    },
    /**
     * @确认框确定执行操作
     */
    handlelayerConfirm() {
      let v = this;
      if (v.layerFlag == 1) {
        //退票
        v.refund();
      }
    },
    /**
     * @退票申请
     */
    refund() {
      let v = this;
      if (Exp.isArray(v.refundArr) && v.refundArr.length) {
        v.closeLayer();
        Indicator.open({
          text: '处理中...',
          spinnerType: SPINNER_TYPE
        });
        let idsArr = [];
        for (let item of v.refundArr) {
          idsArr.push(item.titem_id);
        }
        let idstr = idsArr.join(',');
        v.$api.PW_WX_TicketOrderRefund(idstr).then((res) => {
          Indicator.close();
          // console.log(res)；
          if (res.status == 1) {
            v.layerConfirmStatus = 2;
            setTimeout(() => {
              v.closeLayer();
              v.isRefund = false;
              v.refundArr = [];
              v.getDetail(); //重新获取订单信息
            }, 500)
          } else {
            Toast({
              message: res.msg,
              position: 'center',
              duration: 3000
            });
          }
        })
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
};

</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';

.detail {
  min-height: calc(100vh - 60px);
  padding: 10px 10px 100px;
  background-color: #F3F5F9;

  .iconfont {
    width: 16px;
    height: 16px;
    margin-top: 1px;
    margin-right: 5px;
    color: #B2B2B2;
    transition: all .2s ease-in-out 0s;

    &.iconfuxuankuang {}

    &.iconfuxuankuang1 {
      color: $baseClr;
    }
  }

  &__title {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    font-size: 14px;
    /*px*/

    .status__txt {
      color: #DA4453;

      &.gray {
        color: #8D8D8D;
      }
    }

    // 待支付倒计时
    .waiting__pay__tips {
      font-size: 14px;
      /*px*/

      i {
        font-style: normal;
        color: #DA4453;
      }
    }
  }

  // 参观日期下单时间等
  &__info {
    background-color: #fff;
    padding: 15px;
    /*px*/

    li {
      font-size: 14px;
      /*px*/

      p {
        line-height: 1.8;
        display: flex;
        // justify-content: space-between;
      }
    }
  }

  &__list {
    border-radius: 2px;
    margin-top: 10px;
    background-color: #fff;

    ul {
      padding: 15px 15px 8px;

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

        &.tickets {
          display: flex;
          flex-direction: column;

          .item {
            padding: 8px 0;

            &+.item {
              border-top: 1px solid #E2E2E2;
              /*px*/
            }

            &.gray {
              color: #8D8D8D !important;
              opacity: .7;

              .qr__btn {
                color: #8D8D8D !important;
              }
            }

            .ticket__cont {
              display: flex;
              align-items: center;

              >span.select_icon {
                display: inline-block;
                width: 12px;
                height: 12px;
                margin-right: 10px;
                flex-shrink: 0;
                background-position: center center;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-image: url('../../img/pw/no_selected.png');

                &.on {
                  background-image: url('../../img/pw/icon_selected.png');
                }
              }

              .ticket__desc {
                width: 100%;

                .name {
                  font-size: 14px;
                  /*px*/
                  margin-bottom: 5px;
                }

                .name,
                .status {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;


                  .tickets__status {
                    color: #adadad;
                    font-size: 12px;
                    /*px*/
                  }

                  .qr__btn {
                    color: $baseClr;
                  }
                }
              }
            }

            .qrcode {
              margin-top: 10px;

              img {
                display: block;
                width: 124px;
                height: 124px;
                margin: 0 auto;
              }
            }
          }
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
      }
    }
  }

  //退票
  .waiting {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 20px 0;
    background-color: #F3F5F9;
    display: flex;
    justify-content: center;
    @extend .layout_fixed_x_center;

    span {
      display: block;
      width: 128px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      /*px*/
      text-align: center;
      color: #575859;

      border-radius: 20px;
      transition: all .2s ease-in-out 0s;
      background-color: #fff;

      &:active {
        opacity: .7;
      }

      &+span {
        margin-left: 40px;
      }

      &.cancel__btn {
        border: 1px solid #575859;
        /*no*/
      }

      &.pay__btn {
        color: #fff;
        border: 1px solid $baseClr;
        /*no*/
        background-color: $baseClr;
      }

      &.return__btn {
        width: 183px;
        color: #FFFFFF;
        border-radius: 18px;
        background-color: $baseClr;
        border: 1px solid $baseClr;
        /*no*/
      }
    }
  }

  // 

  .refund {
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
      font-size: 15px;
      /*px*/
      text-align: left;
      padding: 0 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;


      span {
        font-size: 13px;
        /*px*/
        font-weight: 400;
        color: #ED5565;

        i {
          font-style: normal;
          font-size: 15px;
          /*px*/
          margin-right: 5px;
        }
      }
    }

    &__btn {
      width: 145px;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
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


.cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  @extend .layout_fixed_x_center;
}

.modal {
  width: 295px;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1001;
  transform: translate(-50%, -50%);
  background-color: #fff;
  font-size: 14px;
  /*px*/
  border-radius: 4px;

  &__body {
    color: #858585;
    text-align: center;
    margin: 0 10px;

    .confrim,
    .success {
      padding: 30px 0;
    }

    .icon__status {
      color: #4FCB7B;
      margin-bottom: 20px;

      .iconkongxinduigou {
        font-size: 37px;
        /*px*/
        color: #4FCB7B;
      }

      p {
        margin-top: 10px;
      }
    }
  }

  &__foot {
    display: flex;
    border-top: 1px solid #D2D2D2;
    /*no*/

    span {
      width: 50%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      display: block;

      &:active {
        opacity: .7;
      }

      &:nth-of-type(2) {
        color: $baseClr;
      }
    }
  }
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.slid_up-enter-active,
.slid_up-leave-active {
  transition: all 0.3s;
}

.slid_up-enter,
.slid_up-leave-active {
  transform: translate3d(0, 100%, 0);
}

</style>
