<template>
  <div>
    <div class="nav_hr">
      <div class="nav_text">
        <router-link tag="span" to="/">首页 »</router-link>
        讲解预约
      </div>
    </div>
    <div class="tickets_center">
      <div class="date_title">
        <!-- 日期 -->
        <div class="date_left">
          选择预约时间
          <span class="line"></span>
          <span class="dian"></span>
        </div>
        <!-- 步骤条 -->
        <el-steps :active="1" align-center class="date_right">
          <el-step title="选择预约时间">
            <i class="s s1" slot="icon"></i>
          </el-step>
          <el-step title="填写预约信息">
            <i class="s s2" slot="icon"></i>
          </el-step>
          <el-step title="确认信息">
            <i class="s s3" slot="icon"></i>
          </el-step>
          <el-step title="支付">
            <i class="s s4" slot="icon"></i>
          </el-step>
          <el-step title="预约完成">
            <i class="s s5" slot="icon"></i>
          </el-step>
        </el-steps>
      </div>
    </div>
    <div class="calender_box">
      <div class="calender_item">
        <ul class="weekdays">
          <li>
            <p>一</p>
            <p class="en">MON</p>
          </li>
          <li>
            <p>二</p>
            <p class="en">TUE</p>
          </li>
          <li>
            <p>三</p>
            <p class="en">WED</p>
          </li>
          <li>
            <p>四</p>
            <p class="en">THU</p>
          </li>
          <li>
            <p>五</p>
            <p class="en">FRI</p>
          </li>
          <li>
            <p>六</p>
            <p class="en">SAT</p>
          </li>
          <li>
            <p>日</p>
            <p class="en">SUN</p>
          </li>
        </ul>
        <ul class="days" v-loading="showDate">
          <!--循环<li>标签创建一天 -->
          <li v-for="(dayobj,index) in days"
              :class="{'active':activeNum == index,'disabled':dayobj.id == '','full':dayobj.id == -2,'closed':dayobj.id == -1,'today':isToday(dayobj.day)}"
              @click="selectDay(index,dayobj.id,dayobj.yy_date,dayobj.day)">
            <p>{{ dayobj.day.getMonth()+1 }}月{{ dayobj.day.getDate() }}日</p>
            <!--<p class="stock" v-if="dayobj.id != '' && dayobj.id >= 0">-->
            <!--余{{dayobj.yy_date.tp_last_stock_sum}} </p>-->
            <p class="stock stock-no" v-if="dayobj.id == -1">闭馆</p>
            <p class="stock stock-no" v-if="dayobj.id == -2">已满</p>
          </li>
        </ul>
        <div class="period">
          <div class="period__tit">讲解开始时段：</div>
          <ul class="period__list" v-if="calendarInfo.tps.length > 0 && tpList.length > 0">
            <li v-for="(times,index) in calendarInfo.tps"
                :class="{'active':activeTimeNum == index,'disabled':tpList[index].tp_last_stock == 0 } "
                @click="selectTime(index,tpList[index].tp_last_stock,tpList[index].td_tp_id)">
              <div> {{times.time_period_show}}</div>
              <div v-if="tpList[index].tp_last_stock>=0" class="tp_last_stock">
                剩余{{tpList[index].tp_last_stock}}
              </div>
            </li>
          </ul>
        </div>
        <div class="text_guidesd" v-if="text_guidesd">（{{text_guidesd}}）</div>
      </div>
      <div class="last">
        <div class="last_box">
          <div class="cuo" @click="$router.back(-1)">取消</div>
          <div class="dui" @click="choose_date">确定</div>
        </div>
        <div class="last_line"></div>
      </div>
    </div>
    <transition name="fade">
      <div class="cover" v-show="layerMask==1" @click=""></div>
    </transition>
    <div class="notice" v-show="layerMask==1">
      <div class="title">预约须知</div>
      <div class="content" v-html="text_tip">
        <!--        <p>1、预约讲解员需要提前选择参观人数，讲解语种（每20个人会再安排一位讲解员，超过20个游客增加一位讲解员，不足20人安排一个讲解员）；</p>-->
        <!--        <p>2、预约讲解员需要提前支付预约费用，如需取消需要提前一个工作日通过电话或预约端进行取消；</p>-->
        <!--        <p>3、如有特殊情况工作人员会通过预留电话提前电话联系游客；</p>-->
        <!--        <p>4、预约讲解开始当天不能进行取消，费用照常收取；</p>-->
        <!--        <p>5、游客未在预约时间内到场，预约讲解视为取消失败，照常收取讲解费用不做保留；</p>-->
        <!--        <p>6、预约只能需要提前至少一个工作日开始，不能预约当日讲解员。</p>-->
        <!--        <p>7、预约讲解员需要提前预约当天入馆门票，如未预约门票不能入关，讲解费用不退。</p>-->
      </div>
      <div class="checkbox" :class="{'checked':ischecked}" @click="ischecked=!ischecked"><label>已查看并同意</label>
      </div>
      <div class="layer__btns">
        <div class="l__btn cancel" @click="go_index">取消预约</div>
        <div class="l__btn confirm" @click="go_next">确定预约</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'explain_tickets',
    data() {
      return {
        calendarInfo: {
          tps: []
        },
        tpList: [],
        days: [], //日历
        activeNum: null,
        activeTimeNum: null,
        layerMask: 1,
        ischecked: false,
        showDate: false,
        text_tip: '',
        text_guidesd: '',
        canchoose: true,
        op_end_time: '',
        op_start_time: ''
      }
    },
    created: function () {
      this.get_Calendar();
      this.get_GuideDetail();

    },
    methods: {
      // 获取须知
      get_GuideDetail() {
        this.$api.GuideDetail().then(res => {
          // this.wxts_text = res.data.wxts_text;
          this.text_tip = res.data.text_tip;
          this.text_guidesd = res.data.text_guidesd;
          var h = new Date().getHours();
          var m = new Date().getMinutes();
          this.op_end_time = res.data.op_end_time;
          this.op_start_time = res.data.op_start_time;
          var op_end_time = res.data.op_end_time.split(':');
          var op_start_time = res.data.op_start_time.split(':');
          if (!res.data.op_start_time && !res.data.op_end_time) return
          if (h > op_end_time[0]) {
            this.canchoose = false;
          } else if (h == op_end_time[0]) {
            if (m > op_end_time[1]) {
              this.canchoose = false
            }
          }
          if (h < op_start_time[0]) {
            this.canchoose = false;
          } else if (h == op_start_time[0]) {
            if (m < op_start_time[1]) {
              this.canchoose = false;
            }
          }
        })
      },
      // 取消
      go_index() {
        this.$router.replace('/')
      },
      // 确定查看预约
      go_next() {
        if (this.ischecked) {
          this.layerMask = 0;
        } else {
          this.$message({
            message: '请阅读并同意协议',
            type: 'warning'
          });
        }
      },
      // 获取信息
      get_Calendar() {
        this.$api.GetCalendar().then((res) => {
          if (res.status == 1) {
            this.calendarInfo = res.data
            this.initdate();
            //初始化时间段
            for (let i = 0; i < this.calendarInfo.tps.length; i++) {
              let tp = {};
              tp.tp_last_stock = -1;
              this.tpList.push(tp);
            }
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      },
      // 渲染初始化日期
      initdate() {
        //获取可预约的第一天的日期
        var firstDate = new Date(this.calendarInfo.yy_date[0].t_date.replace(/-/g, "/"))
        var firstWeek = firstDate.getDay();
        if (firstWeek == 0) {
          firstWeek = 7;
        }
        var firstParse = Date.parse(firstDate)

        //获取可预约的最后一天的日期
        var lastDate = new Date(this.calendarInfo.yy_date[this.calendarInfo.yy_date.length - 1].t_date.replace(/-/g, "/"))
        var lastWeek = lastDate.getDay();
        if (lastWeek == 0) {
          lastWeek = 7;
        }
        var lastParse = Date.parse(lastDate)

        //补齐可预约的第一天之前的日子
        for (let i = firstWeek - 1; i > 0; i--) {
          let d = new Date(firstParse - 86400000 * i);
          let dayobject = {};
          dayobject.day = d;
          dayobject.id = this.setDateId(d);
          dayobject.yy_date = {};
          this.days.push(dayobject);
        }
        //可预约的第一天到可预约最后一天
        var interval2 = Math.floor((lastParse - firstParse) / 86400000)
        for (let i = 0; i <= interval2; i++) {
          let d = new Date(firstParse + 86400000 * i);
          let dayobject = {};
          dayobject.day = d;
          dayobject.id = this.setDateId(d);
          dayobject.yy_date = {};
          this.days.push(dayobject);
        }
        //补齐可预约最后一天之后的日子
        for (let i = 1; i <= 7 - lastWeek; i++) {
          let d = new Date(lastParse + 86400000 * i);
          let dayobject = {};
          dayobject.day = d;
          dayobject.id = this.setDateId(d);
          dayobject.yy_date = {};
          this.days.push(dayobject);
        }
        //可预约日期添加具体数据
        for (let m = 0; m < this.days.length; m++) {
          var that = this;
          let date = that.formatDate(that.days[m].day.getFullYear(), that.days[m].day.getMonth() + 1, that.days[m].day.getDate())
          that.calendarInfo.yy_date.forEach(function (item, index) {
            if (item.t_date == date) {
              that.days[m].yy_date = item;
            }
          })
        }
      },
      // 日期格式化
      formatDate: function (year, month, day) {
        var y = year;
        var m = month;
        if (m < 10) m = "0" + m;
        var d = day;
        if (d < 10) d = "0" + d;
        return y + "-" + m + "-" + d
      },
      // 当天
      isToday: function (date) {
        return date.getFullYear() == new Date().getFullYear() && date.getMonth() == new Date().getMonth() && date.getDate() == new Date().getDate();
      },
      //判断可预约的日期
      setDateId: function (d) {
        let dateId = '';
        let dateType = false;
        let date = this.formatDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
        let closed_date = this.calendarInfo.closed_date;
        let closed_pre_week = this.calendarInfo.closed_pre_week;
        let opened_date = this.calendarInfo.opened_date;
        for (let i in this.calendarInfo.yy_date) {
          if (this.isToday(new Date(this.calendarInfo.yy_date[i].t_date))) {
            this.calendarInfo.yy_date.splice(i, 1);
          }
        }
        let yy_date = this.calendarInfo.yy_date;

        //固定闭馆日（周几闭馆）
        let closedWeek = d.getDay();
        if (closedWeek == 0) {
          closedWeek = 7;
        }
        closed_pre_week.forEach(function (item, index) {
          if (closedWeek == item) {
            dateType = true;
            dateId = -1
          }
        })

        //特殊闭馆日
        closed_date.forEach(function (item, index) {
          if (item == date) {
            dateType = true
            dateId = -1
          }
        })

        //特殊开馆日
        // opened_date.forEach(function(item, index) {
        //     if (item == date) {
        //         dateType = true;
        //         dateId = -1;
        //     }
        // })
        //
        //
        //可预约日期
        yy_date.forEach(function (item, index) {
          if (item.t_date == date) {
            if (item.tp_last_stock_sum == 0) {
              //预约已满
              dateType = true;
              dateId = -2;
            } else {
              dateType = true;
              dateId = item.gd_id;
            }
          }
        })
        return dateType ? dateId : '';
      },
      //获取选中的日期
      selectDay: function (index, id, yy_date, date) {
        // console.log(yy_date);
        if (id != '' && id >= 0) {
          this.activeNum = index
          this.tpList = yy_date.tp
          //如果已选中时段且该时段没票
          if (this.activeTimeNum != null && this.tpList[this.activeTimeNum].tp_last_stock == 0) {
            this.activeTimeNum = null
            localStorage.nowTime = ''
          }
          //将日期格式化后存储到localStorage
          let nowdate = date.getMonth() + 1 + '月' + date.getDate() + '日';
          if (date.getDay() == '1') {
            nowdate += '周一      '
          } else if (date.getDay() == '2') {
            nowdate += '周二      '
          } else if (date.getDay() == '3') {
            nowdate += '周三      '
          } else if (date.getDay() == '4') {
            nowdate += '周四      '
          } else if (date.getDay() == '5') {
            nowdate += '周五      '
          } else if (date.getDay() == '6') {
            nowdate += '周六      '
          } else if (date.getDay() == '0') {
            nowdate += '周日      '
          }
          //nowDate年月日、星期
          localStorage.nowDate = nowdate
          if (this.activeTimeNum != null) {
            localStorage.td_tp_id = this.tpList[this.activeTimeNum].td_tp_id
          }
        }
      },
      //获取选中的时间段
      selectTime: function (index, tp_last_stock, td_tp_id) {
        if (tp_last_stock != 0) {
          this.activeTimeNum = index
          //将值存储到localStorage
          // localStorage.nowTime = this.calendarInfo.tps[index].time_period_show; //时段
          // localStorage.td_tp_id = td_tp_id; //时段id
        }
      },
      cannotchoose() {
        this.$alert(`当前不在预约时间内;每天可预约时段为${this.op_start_time}~${this.op_end_time}`, {
          confirmButtonText: '知道了',
          callback: action => {

          }
        });
      },
      // 确定预约时间
      choose_date() {
        this.canchoose=true;
        if (!this.canchoose) {
          this.cannotchoose()
        } else if (this.activeNum == null) {
          this.$message({
            message: '请选择预约日期',
            type: 'warning'
          });
        } else if (this.activeTimeNum == null) {
          this.$message({
            message: '请选择预约时段',
            type: 'warning'
          });
        } else {
          localStorage.nowTime = this.calendarInfo.tps[this.activeTimeNum].time_period_show; //时段
          localStorage.gd_tp_id = this.tpList[this.activeTimeNum].gd_tp_id;
          localStorage.gd_id = this.days[this.activeNum].id;
          localStorage.nowDate = this.days[this.activeNum].day;
          this.$router.push({
            path: '/explain/message',
            query: {}
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nav_hr {
    background-color: #E7E7E7;
    height: 75px;
    line-height: 75px;

    .nav_text {
      width: 1200px;
      margin: 0 auto;
      font-size: 18px;

      span {
        cursor: pointer;

        &:hover {
          color: #DA9B42;
        }
      }
    }
  }

  .tickets_center {
    box-sizing: border-box;
    width: 1200px;
    margin: 20px auto;
    padding-bottom: 30px;
    padding-top: 30px;
    border-bottom: 5px solid rgba(180, 124, 45, 0.3);

    .date_title {
      overflow: hidden;

      .date_left {
        float: left;
        font-size: 24px;
        color: #000;
        padding: 10px 0 32px 0;
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

        .dian {
          position: absolute;
          display: block;
          width: 7px;
          height: 5px;
          border-radius: 3px;
          background-color: #000;
          left: 70px;
          bottom: 0;
          z-index: 1;
        }
      }

      .date_right {
        float: right;
        width: 867px;
        color: #000;
        margin-right: -50px;
        text-align: center;

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
          background-image: url("../../img/tickets/01.png");
        }

        /deep/ .is-finish .s2 {
          background-image: url("../../img/tickets/02.png");
        }

        /deep/ .is-finish .s3 {
          background-image: url("../../img/tickets/03.png");
        }

        /deep/ .is-finish .s4 {
          background-image: url("../../img/tickets/04.png");
        }

        /deep/ .is-finish .s5 {
          background-image: url("../../img/tickets/05.png");
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
          background-image: url("../../img/tickets/1.png");
        }

        .s2 {
          background-image: url("../../img/tickets/2.png");
        }

        .s3 {
          background-image: url("../../img/tickets/3.png");
        }

        .s4 {
          background-image: url("../../img/tickets/4.png");
        }

        .s5 {
          background-image: url("../../img/tickets/5.png");
        }
      }
    }
  }

  .calender_box {
    width: 1200px;
    margin: 0 auto;

    .calender_item {
      width: 860px;
      margin: 0 auto;

      ul.weekdays {
        font-size: 0;
        -webkit-text-size-adjust: none;

        > li {
          display: inline-block;
          width: 100px;
          padding: 12px 0;
          color: #DC613A;
          font-size: 19px;
          text-align: center;
          border: 2px solid #fff;

          p {
            line-height: 1.5;
            font-weight: bold;
          }

          .en {
            font-size: 14px;
          }

          & + li {
            margin-left: 20px;
          }
        }
      }

      .days {
        margin-top: 30px;

        li {
          position: relative;
          color: #555;
          font-size: 18px;
          width: 100px;
          height: 70px;
          text-align: center;

          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 2px solid #aaa;
          vertical-align: top;
          cursor: pointer;
          background-color: #F1E7D9;

          & + li {
            margin-left: 20px;
          }

          &:nth-of-type(n+8) {
            margin-top: 20px !important;
          }

          &:nth-of-type(7n+1) {
            margin-left: 0 !important;
          }

          &:hover {
            border: 2px solid #B47C2D;
          }

          .stock {
            margin-top: 5px;
            font-size: 15px;
            color: #fe5a00;
          }

          &.active {
            color: #fff;
            background-color: #DA9B42;
            border: 2px solid #DA9B42;

            .stock {
              color: #fff;
            }

            &::after {
              content: '';
              position: absolute;
              right: -2px;
              bottom: -2px;
              width: 25px;
              height: 20px;
              background: url("../../img/ticket/selected.png") no-repeat;
            }
          }

          &.disabled {
            line-height: 37px;
            opacity: .5;
            background-color: #fff;
            cursor: not-allowed;

            &:hover {
              border: 2px solid #aaa;
            }
          }

          &.full {
            color: #a1a1a1;
            background-color: #fff;
            cursor: not-allowed;

            &:hover {
              border: 2px solid #aaa;
            }
          }

          &.closed {
            color: #a1a1a1;
            opacity: .5;
            background-color: #fff;
            cursor: not-allowed;

            &:hover {
              border: 2px solid #aaa;
            }

            .stock {
              color: #a1a1a1;
            }
          }

          &.today {
            &::after {
              content: '今';
              position: absolute;
              top: 0;
              right: 0;
              color: #fff;
              font-size: 12px;
              width: 20px;
              height: 15px;
              background: #E07460;
              text-align: center;
              line-height: 12px;
              display: block;
            }
          }
        }
      }

      .period {
        margin-top: 75px;
        overflow: hidden;

        &__tit {
          float: left;
          line-height: 60px;
          font-size: 18px;
        }

        &__list {
          float: left;

          > li {
            position: relative;
            display: inline-block;
            width: 166px;
            height: 62px;
            line-height: 50px;
            text-align: center;
            border: 2px solid #aaa;
            cursor: pointer;
            color: #A1A1A1;

            & + li {
              margin-left: 25px;
            }

            .tp_last_stock {
              position: absolute;
              color: #DC613A;
              font-size: 12px;
              top: 15px;
              left: 0;
              right: 0;
              margin: 0 auto;
            }

            &:hover {
              border-color: #B47C2D;
              background-color: #F1E7D9;
              color: #55555A;
            }

            &.active {
              color: #fff;
              background-color: #DA9B42;
              border: 2px solid #B47C2D;

              .tp_last_stock {
                color: #fff;
              }

              &::after {
                content: '';
                position: absolute;
                right: -2px;
                bottom: -2px;
                width: 25px;
                height: 20px;
                background: url("../../img/ticket/selected.png") no-repeat;
              }
            }

            &.disabled {
              opacity: .5;
              cursor: not-allowed;

              &:hover {
                border: 2px solid #aaa;
              }
            }

          }

          .lineheight60 {
            line-height: 60px;
          }
        }
      }

      .text_guidesd {
        color: red;
        padding: 20px 0;
      }
    }

    .last {
      width: 1200px;
      margin: 90px auto 0 auto;

      .last_box {
        overflow: hidden;
        // margin-bottom: 53px;
        .cuo {
          float: left;
          width: 239px;
          height: 48px;
          border: 1px solid #d2d2d2;
          border-radius: 24px;
          text-align: center;
          line-height: 48px;
          margin-left: 312px;
          cursor: pointer;
        }

        .dui {
          float: right;
          width: 239px;
          height: 48px;
          color: #fff;
          background-color: #b47c2d;
          border-radius: 24px;
          text-align: center;
          line-height: 48px;
          margin-right: 315px;
          cursor: pointer;
        }
      }

      .last_line {
        margin-top: 53px;
        margin-bottom: 81px;
        height: 5px;
        background: rgba(180, 124, 45, 1);
        opacity: 0.3;
      }
    }
  }

  .notice {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 70px;
    background-color: #fff;
    border-radius: 6px;
    z-index: 1202;

    .title {
      font-size: 18px;
      font-weight: 400;
      color: #000000;
      line-height: 36px;
    }

    .content {
      width: 700px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 36px;
      padding: 20px;
      min-height: 300px;
      white-space: pre-line;
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
        display: inline-block;
        height: 20px;
        width: 20px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("../../img/ticket/check.png");
        cursor: pointer;
        margin-right: 10px;
      }

      &.checked {
        &::before {
          background-image: url("../../img/ticket/checked.png");
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
      border: 1px solid #B47C2D;
      border-radius: 24px;
      cursor: pointer;

      &:active {
        opacity: 0.7;
      }

      &.cancel {
        color: #B47C2D;
        margin-right: 40px;
      }

      &.confirm {
        color: #fff;
        background: #B47C2D;
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
</style>
