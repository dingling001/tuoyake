<template>
  <div class="p_box">
    <div class="nav_hr">
      <div class="nav_text">
        <router-link tag="span" to="/">首页</router-link>» 个人票务预约
      </div>
    </div>
    <div class="date_step">
      <div class="date_title">
        <div class="date_left">
          选择日期
          <span class="line"></span>
          <span class="dot"></span>
        </div>
        <el-steps :active="1" align-center class="date_right">
          <el-step title="选择参观日期">
            <i class="s s1" slot="icon"></i>
          </el-step>
          <el-step title="填写预约信息">
            <i class="s s2" slot="icon"></i>
          </el-step>
          <el-step title="确认订单">
            <i class="s s3" slot="icon"></i>
          </el-step>
          <el-step title="预约成功">
            <i class="s s4" slot="icon"></i>
          </el-step>
        </el-steps>
      </div>
    </div>
    <div class="date__box">
      <div class="date__cont">
        <Calendar :calendarInfo="calendarInfo" v-if="calendarInfo.yy_date.length>0"></Calendar>
        <!-- 不能预约时的状态显示 -->
        <div v-if="calendarInfo.yy_date.length==0" class="stop__run">
          <div :class="{img: true, weihu: noCorrectTime, zanting: pausedRes}"></div>
          <div class="tips" v-text="msgInfo"></div>
        </div>
      </div>
    </div>
    <div class="calendar__btns" v-if="calendarInfo.yy_date.length>0">
      <div
        class="c__btn person"
        v-if="type==1"
        @click="jumpTo"
        v-loading.fullscreen.lock="fullscreenLoading"
      >个人预约</div>
      <div class="c__btn team" v-if="type==2" @click="jumpTo">团队预约</div>
    </div>
    <!-- 预约须知 -->
    <transition name="fade">
      <div
        class="cover"
        v-show="layerMask==1 || calendarInfo.yy_date.length==0 && pausedRes || calendarInfo.yy_date.length==0 && noCorrectTime"
      ></div>
    </transition>

    <!-- 不能预约时的显示状态 -->
    <div
      class="stop-server"
      v-if="calendarInfo.yy_date.length==0 && pausedRes || calendarInfo.yy_date.length==0 && noCorrectTime"
    >
      <div :class="{img: true, weihu: noCorrectTime, zanting: pausedRes}"></div>
      <div class="tips" v-text="msgInfo"></div>
      <div class="btn" @click="goIndexPage">我知道了</div>
    </div>
    <div class="notice" v-show="layerMask==1">
      <div class="content" v-html="noticeInfo"></div>
      <div class="checkbox" :class="{'checked':ischecked}" @click="ischecked=!ischecked">
        <label>查看并同意</label>
      </div>
      <div class="layer__btns">
        <div class="l__btn cancel" @click="$router.back(-1)">取消</div>
        <div class="l__btn confirm" @click="goNext">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
import Calendar from '../common/calendar_pc.vue';
import { Local } from '@/bin/cache.js';

export default {
  name: 'index',
  data() {
    return {
      fullscreenLoading: false,
      calendarInfo: {
        tps: [],
        yy_date: [],
      },
      noticeInfo: '',
      orderTime: Local.get('pc_pw_time_period') || '',
      api_token: localStorage.api_token ? localStorage.api_token : '',
      vip: '',
      loading: false,
      type: 1, //个人1、团体2
      layerMask: 0, //须知弹层
      ischecked: true, //是否同意须知
      isStop: false, // 判断是否为维护时间 23：00 -7：30
      pausedRes: false, //暂停预约
      noCorrectTime: false, //不再正确的时间
      msgInfo: '', // 不能预约时显示的文本
    };
  },
  computed: {
    orderDate() {
      var date = Local.get('pc_pw_now_date');
      var month = date.split('月')[0];
      var day = date.split('月')[1].split('日')[0];
      var year = new Date().getFullYear();
      return `${year}-${month}-${day}`;
    },
  },
  components: {
    Calendar,
  },

  created: function() {
    // this.vartifyStop();
    this.get_Calendar();
    this.getNotice();
  },
  mounted() {
    if (this.$route.query.state == 1) {
      this.getVipI();
    }
  },
  methods: {
    //获取票务须知
    getNotice() {
      this.$api.getTicksNotice().then(res => {
        // console.log(res);
        if (res.status == 1) {
          this.noticeInfo = res.data.text_tip.replace(/\n/g, '<br/>');
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
          });
        }
      });
    },
    // 获取票务信息
    get_Calendar() {
      // 9902 暂停预约；9901 不再可预约时间 pm 11:00 - am 7:30
      this.$api.Calendar().then(res => {
        // console.log(res)
        // res.data.yy_date = [];
        if (res.status == 1) {
          this.calendarInfo = res.data;
        } else if (res.status === 9002) {
          // 9902 暂停预约
          this.pausedRes = true;
          this.msgInfo = res.msg;
        } else if (res.status === 9001) {
          // 9901 不再可预约时间 pm 11:00 - am 7:30
          this.noCorrectTime = true;
          this.msgInfo = res.msg;
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
          });
        }
      });
    },
    // 如果是会员，调取会员信息
    getVipI() {
      this.$api.getVipI().then(res => {
        if (res.status == 1) {
          this.vip = res.data;
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
          });
        }
      });
    },
    // 确定查看预约
    goNext() {
      if (this.ischecked) {
        this.layerMask = 0;
      } else {
        this.$message({
          message: '请阅读并同意协议',
          type: 'warning',
        });
      }
    },
    jumpTo() {
      //跳转到个人预约信息填写
      let that = this;
      //nowDate  年月日、星期
      //nowTime  时段
      if (Local.get('pc_pw_now_date') && Local.get('pc_pw_time_period')) {
        // 牛逼的会员可以直接一键预约-省去填写信息的时间，但是只能一键预约，成人票-基础票-身份证类型的门票
        if (this.$route.query.state == 1) {
          var td_tp_id = localStorage.pc_pw_td_tp_id;
          this.fullscreenLoading = true;
          // 获取基础门票Id
          this.$api
            .getAllTicks(td_tp_id)
            .then(response => {
              if (response.status === 1) {
                var result = response.data;
                // 成人票的类型id
                var pt_id = [];
                // 基础门票的td_tp_id
                var td_tp_id = 1;
                // 身份证类型的id
                var cardtype_id = [];

                result.pt_data.forEach(item => {
                  if (item.pt_name == '成人票') {
                    pt_id.push(item.pt_id);
                    item.pt_tickets.forEach(temp => {
                      if (temp.ticket_id === 1) {
                        td_tp_id = temp.td_tp_id;
                      }
                    });
                  }
                });

                result.cardtype.forEach(item => {
                  if (item.card_type === '身份证') {
                    cardtype_id.push(item.cardtype_id);
                  }
                });

                this.$api
                  .postBookInfo(
                    this.api_token,
                    td_tp_id,
                    pt_id,
                    [this.vip.real_name],
                    cardtype_id,
                    [this.vip.id_card]
                  )
                  .then(res => {
                    this.fullscreenLoading = false;
                    if (res.status === 1) {
                      var resultOther = res.data;
                      // console.log(resultOther);
                      if (resultOther.order_status === 2) {
                        this.$router.push({
                          path: '/pw/person/pay',
                          query: {
                            torder_id: resultOther.torder_id,
                            order_sn: resultOther.order_sn,
                            order_status: resultOther.order_status,
                          },
                        });
                        // clear 选择的日期
                        Local.remove('pc_pw_dateIndex');
                        Local.remove('pc_pw_now_date');
                        Local.remove('pc_pw_tp_list');
                        Local.remove('pc_pw_time_period');
                        Local.remove('pc_pw_timePeriodIndex');
                        Local.remove('pc_pw_td_tp_id');
                      }
                      if (resultOther.order_status == 3) {
                        this.$router.push({
                          path: '/pw/person/success',
                          query: {
                            date: this.orderDate,
                            time: this.orderTime,
                          },
                        });

                        // clear 选择的日期
                        Local.remove('pc_pw_dateIndex');
                        Local.remove('pc_pw_now_date');
                        Local.remove('pc_pw_tp_list');
                        Local.remove('pc_pw_time_period');
                        Local.remove('pc_pw_timePeriodIndex');
                        Local.remove('pc_pw_td_tp_id');
                      }
                    } else {
                      this.$message({
                        message: res.msg,
                        type: 'error',
                      });
                    }
                  })
                  .catch(error => {
                    this.fullscreenLoading = false;
                    console.log(error);
                  });
              } else {
                this.fullscreenLoading = false;
                this.$message({
                  message: response.msg,
                  type: 'error',
                });
              }
            })
            .catch(error => {
              this.fullscreenLoading = false;
              console.log(error);
            });

          return false;
        }
        if (that.type == 1) {
          //个人
          this.$router.push('/pw/person/fillinfo');
        } else if (that.type == 2) {
          //团体
          // that.$router.push({ path: '/yuyue/personal', query: { ticket_id: 1, td_tp_id: localStorage.td_tp_id } });
        }
      } else {
        if (!Local.get('pc_pw_now_date')) {
          this.$message({
            message: '请选择参观日期！',
            type: 'warning',
          });
        } else {
          this.$message({
            message: '请选择参观时段！',
            type: 'warning',
          });
        }
      }
    },
    // isStop
    goIndexPage() {
      this.$router.push('/');
    },
  },
};
</script>
<style scoped lang="scss">
/** @format */

.p_box {
  padding-bottom: 100px;

  .nav_hr {
    background-color: #e7e7e7;
    height: 60px;
    line-height: 60px;

    .nav_text {
      width: 1200px;
      margin: 0 auto;
      font-size: 18px;

      span {
        cursor: pointer;

        &:hover {
          color: #da9b42;
          text-decoration: underline;
        }
      }
    }
  }

  .date_step {
    width: 1200px;
    margin: 20px auto;
    padding: 30px 0;
    border-bottom: 5px solid rgba(180, 124, 45, 0.3);

    .date_title {
      overflow: hidden;

      .date_left {
        margin-top: 20px;
        float: left;
        font-size: 24px;
        color: #000;
        padding: 0 0 35px 0;
        position: relative;

        .line {
          position: absolute;
          bottom: 0;
          width: 60px;
          height: 5px;
          left: 0;
          background-color: #000;
          border-radius: 2px;
          z-index: 1;
          display: block;
        }

        .dot {
          display: block;
          width: 7px;
          height: 5px;
          border-radius: 3px;
          background-color: #000;
          left: 70px;
          bottom: 0;
          z-index: 1;
          position: absolute;
        }
      }

      .date_right {
        float: right;
        width: 70%;
        color: #000;
        margin-right: -60px;

        /deep/ .el-step__title {
          font-size: 16px;
          color: #000;
        }

        /deep/ .el-step__title.is-finish {
          color: #b47c2d;
        }

        /deep/ .el-step__title.is-process {
          font-weight: normal;
        }

        /deep/ .is-finish .s1 {
          background-image: url('../../../img/ticket/01.png');
        }

        /deep/ .is-finish .s2 {
          background-image: url('../../../img/ticket/02.png');
        }

        /deep/ .is-finish .s3 {
          background-image: url('../../../img/ticket/03.png');
        }

        /deep/ .is-finish .s4 {
          background-image: url('../../../img/ticket/04.png');
        }

        /deep/ .el-step__icon {
          width: 53px;
          height: 53px;
          background-color: #fff;
          overflow: hidden;
          border-style: hidden;
        }

        /deep/ .el-step.is-horizontal .el-step__line {
          top: 25px;
          border-color: #a0a0a0;
          z-index: -1;
        }

        .s {
          width: 50px;
          height: 50px;
          margin: 0 5px;
          background-color: #fff;
          display: inline-block;
          background-repeat: no-repeat;
          background-size: 100% auto;
          background-position: center center;
        }

        .s1 {
          background-image: url('../../../img/ticket/1.png');
        }

        .s2 {
          background-image: url('../../../img/ticket/2.png');
        }

        .s3 {
          background-image: url('../../../img/ticket/3.png');
        }

        .s4 {
          background-image: url('../../../img/ticket/4.png');
        }
      }
    }
  }

  .date__box {
    width: 1200px;
    margin: 0 auto;

    .date__cont {
      width: 822px;
      margin: 0 auto;

      .stop__run {
        margin-top: 100px;

        .img {
          margin: 0 auto 30px;
          background-position: center center;
          background-size: 100% 100%;
          background-repeat: no-repeat;

          &.weihu {
            width: 295px;
            height: 170px;
            background-image: url('../../../img/ticket/no-correct-time.png');
          }

          &.zanting {
            width: 259px;
            height: 200px;
            background-image: url('../../../img/ticket/ss.png');
          }
        }

        .tips {
          font-size: 20px;
          font-weight: 500;
          color: #353535;
          line-height: 36px;
          text-align: center;
        }
      }
    }
  }

  .calendar__btns {
    width: 239px;
    margin: 100px auto 0;

    .c__btn {
      display: inline-block;
      width: 239px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      font-size: 16px;
      // border: 1px solid rgba(210, 210, 210, 1);
      border-radius: 24px;
      margin-right: 30px;
      background-color: #c39657;
      color: #fff;
      cursor: pointer;

      &:active {
        opacity: 0.7;
      }

      &.confirm {
        color: #fff;
        background-color: #b47c2d;
      }
    }
  }

  .notice {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 40px 60px;
    background-color: #fff;
    border-radius: 6px;
    z-index: 1202;
    overflow-y: scroll;

    .content {
      width: 900px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 28px;
      padding: 20px 0;
    }

    .checkbox {
      height: 20px;
      line-height: 20px;

      label {
        float: left;
      }

      &::before {
        content: '';
        float: left;
        // display: inline-block;
        height: 20px;
        width: 20px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url('../../../img/ticket/check.png');
        cursor: pointer;
        margin-right: 10px;
      }

      &.checked {
        &::before {
          background-image: url('../../../img/ticket/checked.png');
        }
      }
    }
  }

  .layer__btns {
    margin: 30px auto 0;
    width: 520px;
    overflow: hidden;

    .l__btn {
      float: left;
      width: 239px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      border: 1px solid #b47c2d;
      border-radius: 24px;
      cursor: pointer;

      &:active {
        opacity: 0.7;
      }

      &.cancel {
        color: #b47c2d;
        margin-right: 40px;
      }

      &.confirm {
        color: #fff;
        background: #b47c2d;
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
  z-index: 1201;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

// 新增的暂停服务的样式弹窗样式
.stop-server {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -333px;
  margin-top: -262.5px;
  width: 600px;
  height: 480px;
  background-color: #fff;
  box-shadow: 0px 7px 17px 0px rgba(0, 0, 0, 0.13);
  border-radius: 20px;
  z-index: 1203;
  .tips {
    margin: 0 auto;
    width: 460px;
    font-size: 20px;
    font-weight: 500;
    color: #353535;
    line-height: 36px;
    text-align: center;
  }
  // border: 1px solid #000;
  .img {
    margin: 50px auto 20px;
    background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;

    &.weihu {
      width: 295px;
      height: 170px;
      background-image: url('../../../img/ticket/no-correct-time.png');
    }

    &.zanting {
      width: 259px;
      height: 200px;
      background-image: url('../../../img/ticket/ss.png');
    }
  }
  .content {
    margin: 40px auto 0;
    width: 464px;
    height: 60px;
    font-size: 20px;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    color: #353535;
    line-height: 36px;
    text-align: center;
  }

  .btn {
    width: 257px;
    height: 48px;
    margin: 30px auto 0;
    background-color: #cc974c;
    color: #fff;
    font-size: 20px;
    line-height: 48px;
    border-radius: 24px;
    text-align: center;
    cursor: pointer;
    .btn-el {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
