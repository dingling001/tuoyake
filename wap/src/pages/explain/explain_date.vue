<template>
  <div :class="['home',show_mold?'overflow':'']">
    <Calendar></Calendar>
    <div class="line"></div>
    <div class="notice" v-html="wxts_text">
      <!--      <p class="p">温馨提示：</p>-->
      <!--      <p class="p">周二至周日全天免费开放，周一闭馆（国家法定节假日除外）</p>-->
      <!--      <p class="p">开馆时间：上午 09:00-下午 17:00</p>-->
    </div>
    <div class="text_guidesd" v-if="text_guidesd">{{text_guidesd}}</div>
    <div class="bottom">
      <div class="submit " @click="go_explain">讲解预约</div>
    </div>
    <div class="e_mold" v-if="show_mold">
      <div class="e_item" @touchstart.stop>
        <div class="e_head ">预约须知</div>
        <!--        <ul class="ul">-->
        <!--          <li>1、预约讲解员需要提前选择参观人数，讲解语种（每20个人会再安排一位讲解员，超过20个游客增加一位讲解员，不足20人安排一个讲解员）；</li>-->
        <!--          <li>2、预约讲解员需要提前支付预约费用，如需取消需要提前一个工作日通过电话或预约端进行取消；</li>-->
        <!--          <li>3、如有特殊情况工作人员会通过预留电话提前电话联系游客；</li>-->
        <!--          <li>4、预约讲解开始当天不能进行取消，费用照常收取；</li>-->
        <!--          <li>5、游客未在预约时间内到场，预约讲解视为取消失败，照常收取讲解费用不做保留；</li>-->
        <!--          <li>6、预约只能需要提前至少一个工作日开始，不能预约当日讲解员。</li>-->
        <!--          <li>7、预约讲解员需要提前预约当天入馆门票，如未预约门票不能入关，讲解费用不退。</li>-->
        <!--        </ul>-->
        <div class="ul" v-html="text_tip"></div>
        <div class="e_btn " @click="show_mold=false">确定并继续</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Toast,MessageBox} from 'mint-ui';
  import {Session} from '@/assets/js/utils.js';
  import Calendar from '@/pages/explain/explain_calendar.vue';

  export default {
    name: "home",
    data() {
      return {
        show_mold: true,
        pageScrollYoffset: 0,
        wxts_text: '',
        text_tip: '',
        text_guidesd: '',
        canchoose: true,
        op_end_time: '',
        op_start_time: ''
      };
    },
    created() {
      let that = this;
      this.get_GuideDetail();
      // that.showToast('输入不能为空')
    },
    components: {
      Calendar
    },
    methods: {
      showToast(msg) {
        Toast({
          message: msg,
          position: 'center',
          duration: 2000
        });
      },
      // 获取须知
      get_GuideDetail() {
        this.$api.GuideDetail().then(res => {
          this.wxts_text = res.data.wxts_text;
          this.text_tip = res.data.text_tip;
          this.text_guidesd = res.data.text_guidesd;
          var h = new Date().getHours();
          var m = new Date().getMinutes();
          this.op_end_time = res.data.op_end_time;
          this.op_start_time = res.data.op_start_time;
          var op_end_time = res.data.op_end_time.split(':');
          var op_start_time = res.data.op_start_time.split(':');
          if (!res.data.op_start_time && !res.data.op_end_time) return
          if (h > parseInt(op_end_time[0],10)) {
            this.canchoose = false;
          } else if (h ==parseInt(op_end_time[0],10)) {
            if (m > parseInt(op_end_time[1],10)) {
              this.canchoose = false
            }
          }
          if (h < parseInt(op_start_time[0],10)) {
            this.canchoose = false;
          } else if (h == op_start_time[0]) {
            if (m < parseInt(op_start_time[1],10)) {
              this.canchoose = false;
            }
          }
        })
      },
      // 不可预约
      cancel_fn() {
        MessageBox({
          title: '提示',
          message: `当前不在可预约时段，预约时段为${this.op_start_time}~${this.op_end_time}`,
          showCancelButton: false,
          confirmButtonClass: 'pw-wx-mint-confirm-btn'
        }).then(action => {
          if (action === 'confirm') {
          }
        })
      },
      // 讲解预约
      go_explain() {
        let that = this;
        if (!that.canchoose) {
          that.cancel_fn();
          return;
        }
        if (!Session.get('wx_explain_now_date')) {
          that.showToast('请选择参观日期');
          return;
        }
        if (!Session.get('wx_explain_time_period')) {
          that.showToast('请选择参观时段');
          return;
        }
        that.$router.push('/explain/explain_info');
      }
    }
  };

</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .home {
    min-height: 100vh;
    background-color: #fff;

    .line {
      width: 100%;
      height: 10px;
      background-color: #ECECEC;
    }

    .notice {
      overflow: hidden;
      background: #fff;
      padding: 15px 15px 0 15px;
      text-align: justify;
      font-size: 14px;
      /*px*/
      font-weight: 400;
      color: #989897;
      line-height: 23px;
      white-space: pre-wrap;

      /deep/ p {

      }
    }

    .text_guidesd {
      color: red;
      text-align: justify;
      padding: 0 15px 15px 15px;
      line-height: 23px;
      font-size: 14px;
      /*px*/
    }

    .bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 20px;
      background-color: #fff;

      .submit {
        width: 347px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        background: $baseClr;
        border-radius: 24px;
        font-size: 18px;
        /*px*/
        font-weight: 400;
        color: #FFFFFF;

          &:active {
          opacity: .7;
        }
      }
    }

    .e_mold {
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      overflow: hidden;
      background-color: rgba(0, 0, 0, .5);
      z-index: 1001;
      display: flex;
      align-items: center;
      justify-content: center;

      .e_item {
        width: 78%;
        height: 430px;
        background-color: #fff;
        border-radius: 10px;
        /*no*/
        text-align: center;
        padding: 30px;
        position: relative;

        .e_head {
          padding: 0 0 30px 0;
          font-size: 20px;
          /*px*/
          color: $baseClr
        }

        .ul {
          height: 249px;
          overflow: scroll;
          line-height: 25px;
          color: #353535;
          font-size: 14px;
          /*px*/
          text-align: justify;
          white-space: pre-wrap;
        }


        .e_btn {
          width: 200px;
          height: 40px;
          background: $baseClr;
          border-radius: 19px;
          color: #fff;
          line-height: 38px;
          margin: 25px auto 0 auto;
          font-size: 18px;
          /*px*/
        }
      }
    }
  }

  .overflow {
    height: 100vh;
    position: fixed;
    z-index: 10000;
    width: 100%;
    overflow: hidden;
  }

</style>
