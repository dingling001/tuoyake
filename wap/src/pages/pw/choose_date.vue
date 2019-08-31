<template>
  <div class="home" v-cloak>
    <div class="date__wrap">
      <Calendar @chooseDisabled="clickDis" @chooseTimePeriod="chooseTimeP" :calendarInfo="calendarInfo" v-if="calendarInfo.yy_date.length>0"></Calendar>
      <div v-if="applyStatus.status" class="stop">
        <div class="img" :class="{'weihu':applyStatus.status==9001,'zanting':applyStatus.status==9002}"></div>
        <div class="tips">{{applyStatus.msg}}</div>
      </div>
    </div>
    <div class="line"></div>
    <div class="notice" v-html="noticeInfo"></div>
    <div class="bottom">
      <div class="record" @click="checkRecord">预约记录</div>
      <div class="submit" :class="{'disabled': calendarInfo.yy_date.length==0 || !showCalendar}" @click="yuyue">预约参观票</div>
    </div>
    <!-- 当前时间暂不可预约 -->
    <!-- <transition name="fade">
      <div class="cover" v-show="showModal" @touchmove.prevent></div>
    </transition>
    <div class="modal" v-show="showModal==1" key="modal1">
      <div class="modal__body">
        <div class="title">
          <img src="../../img/pw/weihu_img.png">
        </div>
        <div class="cont">票务预约系统于23:00至次日07:30进行数据维护，暂停服务。给您带来的不便，敬请谅解。</div>
      </div>
      <div class="modal__foot">
        <span @click="confirm">我知道了</span>
      </div>
    </div> -->
  </div>
</template>
<script>
import { Toast, Indicator, MessageBox } from "mint-ui";
import { Session, ModalHelper } from "@/assets/js/utils.js";
import Calendar from "./components/calendar.vue";

const SPINNER_TYPE = "snake";

export default {
  name: "home",
  data() {
    return {
      calendarInfo: {
        tps: [],
        yy_date: []
      },
      noticeInfo: '',
      applyStatus: {
        msg: '',
        status: '',
      },
      showModal: 0, //是否可预约提示弹层
      showCalendar: true, //是否可预约
      state: this.$route.query.state, //是否会员
      vipInfo: "",
      infoList: Session.get('wx_pw_users_info') || [],
      isReChoose: false, //已填写信息，重选日期时
      //---------------------------------------
    };
  },
  created() {
    let v = this;
    v.getAllData();
  },
  mounted() {

  },
  components: {
    Calendar
  },
  beforeDestroy() {
    let v = this;
    ModalHelper.beforeClose();
  },
  methods: {
    /**
     * @并发请求
     */
    async getAllData() {
      let v = this;
      Indicator.open({
        text: "加载中...",
        spinnerType: SPINNER_TYPE
      });
      try {
        await v.getNotice();
        await v.getCalendar();
        v.state == 1 && await v.getVipInfo(); //获取会员信息
        Indicator.close();
      } catch (e) {
        Indicator.close();
      }
    },
    /**
     * @获取须知文案
     */
    getNotice() {
      let v = this;
      return new Promise((resolve, reject) => {
        v.$api.PW_WX_Notice().then(res => {
          if (res.status == 1) {
            // console.log(res)
            v.noticeInfo = res.data.text_tip.replace(/\n/g, '<br/>');
            resolve();
          } else {
            v.showToast(res.msg);
          }
        });
      });
    },
    /**
     * 获取日历信息
     */
    getCalendar() {
      let v = this;
      return new Promise((resolve, reject) => {
        v.$api.PW_WX_Calendar().then(res => {
          // console.log(res)
          // res.data.yy_date = [];
          // res.status = 9001;
          // res.msg = '票务预约系统于23:00至次日07:30进行数据维护，暂停服务。给您带来的不便，敬请谅解。';
          if (res.status == 1) {
            // if (res.data.yy_date.length > 0) {
            //   v.canYuyue();
            //   let timer = setInterval(() => {
            //     v.canYuyue();
            //   }, 1000);
            //   v.$once("hook:beforeDestroy", () => {
            //     clearInterval(timer);
            //   });
            // }
            // 
            if (res.data.yy_date.length > 0) {
              v.calendarInfo = res.data;
              resolve();
            }
          } else if (res.status == 9001 || res.status == 9002) {
            // 9001: 不在可预约时间
            // 9002: 暂停预约
            v.applyStatus = res;
            resolve();
          } else {
            v.showToast(res.msg);
          }
        });
      });
    },

    /**
     * @获取会员信息
     */
    getVipInfo() {
      let v = this;
      return new Promise((resolve, reject) => {
        v.$api.getVipI().then(res => {
          if (res.status == 1) {
            // console.log(res)
            v.vipInfo = res.data;
            resolve();
          } else {
            v.showToast(res.msg);
          }
        });
      });
    },
    /**
     * @获取门票详情及证件类型，实现会员一键预约
     */
    getTicketDetail() {
      let v = this;
      Indicator.open({
        text: "预约中...",
        spinnerType: SPINNER_TYPE
      });
      let tp_id = Session.get('wx_pw_td_tp_id');
      v.$api.PW_WX_TicketDetail(tp_id).then((res) => {
        Indicator.close();
        if (res.status == 1) {
          let toi_cardtype_id = res.data.cardtype[0].cardtype_id;
          let pt_id = res.data.pt_data[0].pt_id;
          let td_tp_id = res.data.pt_data[0].pt_tickets.find((o) => o.ticket_id == 1).td_tp_id;
          v.vipYuyue(toi_cardtype_id, pt_id, td_tp_id);
        } else {
          v.showToast(res.msg);
        }
      })
    },
    /**
     * @会员一键预约
     */
    vipYuyue(toi_cardtype_id, pt_id, td_tp_id) {
      let v = this;
      if (v.vipInfo && v.vipInfo.real_name && v.vipInfo.id_card) {
        // toi_username, toi_cardtype_id, toi_card_num, pt_id, td_tp_id, td_tp_ids, car_no
        v.$api.PW_WX_TicketOrder([v.vipInfo.real_name], [toi_cardtype_id], [v.vipInfo.id_card], [pt_id], td_tp_id, "", "").then(res => {
          // console.log(res)
          if (res.status == 1) {
            let torder_id = res.data.torder_id;
            v.clearCache();
            v.$router.push({ path: '/pw/person/success', query: { 'torder_id': torder_id } });
          } else {
            v.showToast(res.msg);
          }
        });
      } else {
        v.showToast('会员信息不完整！');
      }
    },
    /**
     * @日期重选判断（重选时需重新添加参观者）
     */
    chooseTimeP(tp_id) {
      let v = this;
      if (v.infoList && v.infoList.length > 0) {
        //已添加参观者之一的基础门票id
        let td_tp_id = v.infoList[0].chose_tickets.find(o => o.ticket_id == 1).td_tp_id;
        v.isReChoose = td_tp_id == tp_id ? false : true;
      }
    },
    /**
     * 打开
     */
    openModal() {
      let v = this;
      v.showModal = 1;
      // ModalHelper.afterOpen();
    },
    /**
     * 关闭
     */
    closeModal() {
      let v = this;
      v.showModal = 0;
      // ModalHelper.beforeClose();
    },
    /**
     * 确认--我知道了
     */
    confirm() {
      let v = this;
      v.closeModal();
      v.$router.replace("/");
    },
    clickDis() {
      let v = this;
      v.showToast("不可选");
    },
    /**
     * 是否可预约
     */
    canYuyue() {
      let v = this;
      let canA = v.timeRange("07:30", "23:00"); //系统开放
      if (canA) {
        v.showCalendar = true;
        v.closeModal();
      } else {
        v.showCalendar = false;
        v.openModal();
        v.clearCache();
      }
    },
    /**
     * 去预约参观者
     */
    yuyue() {
      let v = this;
      if (v.calendarInfo.yy_date.length == 0) {
        v.showToast("暂不可预约");
        return;
      }
      if (!v.showCalendar) {
        v.showToast("当前时间不可预约");
        return;
      }
      if (!Session.get("wx_pw_now_date")) {
        v.showToast("请选择参观日期");
        return;
      }
      if (!Session.get("wx_pw_time_period")) {
        v.showToast("请选择参观时段");
        return;
      }

      if (v.state == 1) {
        //会员一键预约
        v.getTicketDetail();
        return;
      }

      if (v.isReChoose) {
        MessageBox({
          title: '提示',
          message: '参观日期改变后需重新添加参观者，确定是否继续？',
          showCancelButton: true,
          confirmButtonClass: 'pw-wx-mint-confirm-btn'
        }).then(action => {
          if (action === 'confirm') {
            Session.remove('wx_pw_users_info');
            v.$router.push("/pw/person/info");
          }
        })
        return;
      }

      v.$router.push("/pw/person/info");
    },
    /**
     * @预约记录
     */
    checkRecord() {
      let v = this;
      v.$router.push('/pw/person/order_list');
    },
    /**
     * 清空缓存
     */
    clearCache(cb) {
      let types = ['wx_pw_dateIndex', 'wx_pw_now_date', 'wx_pw_td_tp_id', 'wx_pw_timePeriodIndex', 'wx_pw_time_period', 'wx_pw_tp_list', 'wx_pw_users_info']
      for (let x in types) {
        Session.remove(types[x]);
      }
      "function" === typeof cb && cb();
    },
    timeRange(beginTime, endTime) {
      var strb = beginTime.split(":");
      if (strb.length != 2) {
        return false;
      }

      var stre = endTime.split(":");
      if (stre.length != 2) {
        return false;
      }

      var b = new Date();
      var e = new Date();
      var n = new Date();

      b.setHours(strb[0]);
      b.setMinutes(strb[1]);
      e.setHours(stre[0]);
      e.setMinutes(stre[1]);

      if (n.getTime() - b.getTime() >= 0 && n.getTime() - e.getTime() < 0) {
        return true;
      } else {
        return false;
      }
    },
    showToast(msg) {
      Toast({
        message: msg,
        position: "center",
        duration: 2000
      });
    }
  }
};

</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';

.home {
  min-height: calc(100vh - 60px);
  padding-bottom: 120px;
  background-color: #fff;

  .date__wrap {
    min-height: 276px;
  }

  .stop {
    width: 100%;
    min-height: 276px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px;

    .img {
      flex-shrink: 0;
      margin: 0 auto;
      background-position: center center;
      background-size: 100% 100%;
      background-repeat: no-repeat;

      &.weihu {
        width: 155px;
        height: 112px;
        background-image: url('../../img/pw/weihu_img.png');
      }

      &.zanting {
        width: 175px;
        height: 134px;
        background-image: url('../../img/pw/stop.png');
      }
    }

    .tips {
      font-size: 15px;
      /*px*/
      font-weight: 500;
      color: #353535;
      line-height: 24px;
      text-align: center;
      margin-top: 20px;
    }
  }

  .line {
    width: 100%;
    height: 10px;
    background-color: #ececec;
  }

  .notice {
    overflow: hidden;
    background: #fff;
    padding: 15px;
    font-size: 14px;
    /*px*/
    font-weight: 400;
    color: #55555a;
    line-height: 25px;
    text-align: justify;
    /*IE*/
    text-justify: inter-ideograph;
  }

  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    height: 48px;
    line-height: 48px;
    font-size: 18px;
    /*px*/
    font-weight: 500;
    text-align: center;
    background-color: #fff;
    box-shadow: 0px -2px 8px 0px rgba(0, 0, 0, 0.08);
    @extend .layout_fixed_x_center;

    .record {
      width: 146px;
      flex-shrink: 0;

      &:active {
        opacity: 0.7;
      }
    }

    .submit {
      flex: 1;
      color: #ffffff;
      background: $baseClr;
      box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.34);

      &:active {
        opacity: 0.7;
      }

      &.disabled {
        background-color: #cecece;
      }
    }
  }
}

// .cover {
//   position: fixed;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   background-color: rgba(0, 0, 0, 0.45);
//   z-index: 9999;
// }

// .modal {
//   width: 293px;
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   padding: 20px 25px;
//   font-size: 13px;
//   /*px*/
//   background-color: #fff;
//   box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.13);
//   border-radius: 10px;
//   z-index: 10000;

//   &__body {
//     color: #858585;
//     text-align: center;

//     .title {
//       width: 148px;
//       height: 86px;
//       margin: 0 auto;

//       img {
//         width: 100%;
//         height: 100%;
//         vertical-align: middle;
//       }
//     }

//     .cont {
//       font-size: 13px;
//       /*px*/
//       font-weight: 300;
//       color: #000;
//       line-height: 18px;
//       margin: 20px 0;
//     }
//   }

//   &__foot {
//     display: flex;
//     justify-content: center;

//     span {
//       width: 200px;
//       font-size: 14px;
//       /*px*/
//       line-height: 40px;
//       font-weight: bold;
//       color: #fff;
//       text-align: center;
//       display: block;
//       background: rgba(238, 142, 65, 1);
//       border-radius: 19px;

//       &:active {
//         opacity: 0.7;
//       }
//     }
//   }
// }

// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.3s;
// }

// .fade-enter,
// .fade-leave-active {
//   opacity: 0;
// }

</style>
