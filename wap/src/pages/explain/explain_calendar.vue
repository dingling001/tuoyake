<template>
  <div class="calendar">
    <div class="calendar__block">
      <div class="header">
        <div class="title">选择讲解日期</div>
        <div class="date">{{formatDate1(new Date().getFullYear(),new Date().getMonth()+1)}}</div>
      </div>
      <ul class="weekdays">
        <li>
          <p>一</p>
          <small>MON</small>
        </li>
        <li>
          <p>二</p>
          <small>TUE</small>
        </li>
        <li>
          <p>三</p>
          <small>WED</small>
        </li>
        <li>
          <p>四</p>
          <small>THU</small>
        </li>
        <li>
          <p>五</p>
          <small>FRI</small>
        </li>
        <li>
          <p>六</p>
          <small>SAT</small>
        </li>
        <li>
          <p>日</p>
          <small>SUN</small>
        </li>
      </ul>
      <ul class="days">
        <li v-for="(dayobj,index) in days"
            :class="{'disabled': dayobj.id == '','full':dayobj.id == -2,'closed':dayobj.id == -1,'today':isToday(dayobj.day),'active':dateIndex == index}"
            @click="selectDay(index,dayobj.id,dayobj.yy_date,dayobj.day)">
          <p v-if="dayobj.id >= 0 || dayobj.id == -2">{{ dayobj.day.getDate() }}</p>
          <!-- <p class="stock" v-if="dayobj.id != '' && dayobj.id >= 0">余{{dayobj.yy_date.tp_last_stock_sum}}</p> -->
          <p class="stock" v-if="dayobj.id == ''">无票</p>
          <p class="stock" v-if="dayobj.id != '' && dayobj.id >= 0">有票</p>
          <p class="stock" v-if="dayobj.id == -2">已满</p>
          <!--<p class="stock" v-if="isToday(dayobj.day)"><span v-if="dayobj.id == ''">今天</span></p>-->
          <p class="stock-no" v-if="dayobj.id == -1">闭馆</p>
        </li>
      </ul>
    </div>
    <div class="calendar__block">
      <div class="header">
        <div class="title">讲解开始时段</div>
      </div>
      <ul class="times" v-if="calendarInfo.tps.length > 0 && tpList.length > 0">
        <li v-for="(times,index) in calendarInfo.tps"
            :class="{'active':timePeriodIndex == index,'disabled':tpList[index].tp_last_stock == 0}"
            @click="selectTime(index,tpList[index].tp_last_stock,tpList[index].gd_tp_id)">
          {{times.time_period_show}}
        </li>
      </ul>
    </div>
    <div class="overlay" v-show="overlayFlag"><img src="../../img/pw/loader.gif"></div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import {Session} from '@/assets/js/utils.js';

  export default {
    data() {
      return {
        calendarInfo: {
          tps: []
        },
        days: [], //日历
        tpList: Session.get('wx_explain_tp_list') || [], //时段选择
        dateIndex: Session.get('wx_explain_dateIndex'), //日期索引
        timePeriodIndex: Session.get('wx_explain_timePeriodIndex'), //时段索引
        overlayFlag: 0,
      }
    },
    created() {
      this.get_Calendar()
    },
    methods: {
      //获取日历信息
      get_Calendar() {
        this.overlayFlag = 1;
        this.$api.GuideCalendar().then((res) => {
          // console.log(res)
          this.overlayFlag = 0;
          this.calendarInfo = res.data;
          this.initData();
          //初始化时间段
          for (let i in this.calendarInfo.tps) {
            let tp = {};
            tp.tp_last_stock = 1;
            this.tpList.push(tp);
          }
          // console.log(this.tpList)
          // console.log(this.calendarInfo)
        })
      },
      initData: function () {
        //获取可预约的第一天的日期
        var firstDate = new Date(this.calendarInfo.yy_date[0].t_date.replace(/-/g, "/"))
        var firstWeek = firstDate.getDay(); //获取可预约的第一天是星期几
        if (firstWeek == 0) {
          firstWeek = 7; //周日返回‘0’ 放在第七位
        }
        var firstParse = Date.parse(firstDate) //第一天的时间戳

        //获取可预约的最后一天的日期
        var lastDate = new Date(this.calendarInfo.yy_date[this.calendarInfo.yy_date.length - 1].t_date.replace(/-/g, "/"))
        var lastWeek = lastDate.getDay(); //获取可预约的最后一天是星期几
        if (lastWeek == 0) {
          lastWeek = 7; //周日返回‘0’ 放在第七位
        }
        var lastParse = Date.parse(lastDate) //最后一天的时间戳


        //补齐可预约的第一天之前的日子
        for (let i = firstWeek - 1; i > 0; i--) {
          let d = new Date(firstParse - 86400000 * i);
          let dayobject = {}; //用一个对象包装Date对象  以便为以后预定功能添加属性
          dayobject.day = d;
          dayobject.id = '';
          dayobject.yy_date = {};
          this.days.push(dayobject); //将日期放入data 中的days数组 供页面渲染使用
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
            dateType = true
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

        return dateType ? dateId : ''; //为空即无票

      },
      //获取选中的日期
      selectDay: function (index, id, yy_date, date) {
        let that = this;
        if (id != '' && id >= 0) {
          //有票时
          that.dateIndex = index; //日期索引
          that.tpList = yy_date.tp; //当前余票量对应时段重新赋值

          let nowdate = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
          Session.set('wx_explain_dateIndex', index);
          Session.set('wx_explain_now_date', nowdate);
          Session.set('wx_explain_tp_list', yy_date.tp);
          if (that.timePeriodIndex != null) {
            let gd_tp_id = that.tpList[that.timePeriodIndex].gd_tp_id;
            Session.set('wx_explain_gd_tp_id', gd_tp_id);
          }
        } else {
          Toast('日期不可选');
        }
        // console.log(Session.get('wx_explain_gd_tp_id'))
      },
      //获取选中的时间段
      selectTime: function (index, tp_last_stock, gd_tp_id) {
        let that = this;
        //如果已选中时段且该时段没票
        if (that.timePeriodIndex != null && that.tpList[index].tp_last_stock == 0) {
          that.timePeriodIndex = null;
          Session.set('wx_explain_time_period', '');
        }
        if (tp_last_stock != 0) {
          that.timePeriodIndex = index;
          Session.set('wx_explain_timePeriodIndex', index);
          Session.set('wx_explain_time_period', that.calendarInfo.tps[index].time_period_show); //选择时段
          Session.set('wx_explain_gd_tp_id', gd_tp_id);
        }
        // console.log(Session.get('wx_explain_time_period'))
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
      formatDate1: function (year, month) {
        var y = year;
        var m = month;
        if (m < 10) m = "0" + m;
        return y + "." + m
      },
    }
  }

</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .calendar {
    background-color: #ECECEC;

    &__block {
      overflow: hidden;
      background: #fff;
      padding: 15px;

      & + & {
        margin-top: 10px;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 20px;

        .title {
          font-size: 22px;
          /*px*/
          font-weight: 500;
          color: #353535;
        }

        .date {
          font-size: 16px;
          /*px*/
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: $baseClr;
        }
      }

      ul.weekdays {
        font-size: 0;
        display: flex;
        justify-content: space-between;

        li {
          width: calc(100% / 7 - 3px);
          text-align: center;
          display: inline-block;
          padding: 5px 0;
          font-size: 13px;
          /*px*/
          box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          color: $baseClr;

          p {
            margin-bottom: 2px;
            font-size: 15px;
            /*px*/
          }

          small {
            font-size: 8px;
            /*px*/
          }
        }
      }


      .days {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 10px;

        li {
          position: relative;
          color: #555;
          font-size: 15px;
          /*px*/
          width: calc(100% / 7 - 3px);
          min-height: 45px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background-color: $calendar_bgcolor;
          vertical-align: top;
          border-radius: 4px;
          border: 1px solid $baseClr;
          /*no*/
          transition: all 0.2s ease-in-out 0s;

          &:nth-child(n+8) {
            margin-top: 5px;
          }

          .stock {
            font-size: 11px;
            /*px*/
            color: $baseClr;
            white-space: nowrap;
            -webkit-transform: scale(0.8);
          }

          // 当日
          &.today {
            opacity: 1;
            position: relative;

            &::before {
              content: '';
              position: absolute;
              display: block;
              width: 10px;
              height: 10px;
              top: 0;
              right: 2px;
              color: #fff;
              font-size: 8px;
              /*px*/
              background-color: $calendar_bgcolor;
              z-index: 20;
              background: url('../../img/pw/01.png') center center / 100% 100% no-repeat;
            }

            .stock {
              color: #ed5565;
            }
          }

          //点击高亮
          &.active {
            color: #fff;
            background-color: $baseClr;
            border: 1px solid $baseClr;
            /*no*/

            .stock {
              color: #fff;
            }

            &::after {
              content: '';
              position: absolute;
              display: block;
              width: 16px;
              height: 13px;
              bottom: 0;
              right: 0;
              color: #fff;
              font-size: 8px;
              /*px*/
              background-color: $calendar_bgcolor;
              z-index: 20;
              background: url('../../img/pw/selected.png') center center / 100% 100% no-repeat;
            }
          }

          //不可预约
          &.disabled {
            color: #353535;
            opacity: .5;
            cursor: not-allowed;
            border: 1px solid #AAAAAA;
            /*no*/
            background-color: #fff !important;

            .stock {
              color: #353535;
            }
          }

          //已满
          &.full {
            color: #a1a1a1;
            cursor: not-allowed;
            border: 1px solid #fff;
            /*no*/

            .stock {
              color: #ed5565;
            }
          }

          //闭馆
          &.closed {
            color: #353535;
            cursor: not-allowed;
            background-color: #fff !important;
            border: 1px solid #AAAAAA;
            /*no*/
            opacity: .5;

            .stock {
              font-size: 12px;
              /*px*/
              color: #353535;
            }
          }
        }
      }
    }


    .times {
      width: 100%;
      display: flex;
      /*flex-wrap: nowrap;*/
      flex-wrap: wrap;
      justify-content: space-between;

      li {
        position: relative;
        /*width: calc(100% / 3);*/
        height: 28px;
        line-height: 28px;
        padding: 1px 5px;
        width: 32%;
        font-size: 14px;
        /*px*/
        text-align: center;
        color: #555;
        cursor: pointer;
        border-radius: 4px;
        background-color: $calendar_bgcolor;
        border: 1px solid $baseClr;
        /*no*/
        margin-bottom: 10px;

        & + li {
          /*margin-left: 15px;*/
        }

        &.active {
          color: #fff;
          border: 1px solid $baseClr;
          /*no*/
          background-color: $baseClr;

          &::after {
            content: '';
            position: absolute;
            display: block;
            width: 16px;
            height: 13px;
            bottom: 0;
            right: 0;
            color: #fff;
            font-size: 8px;
            /*px*/
            background-color: $calendar_bgcolor;
            z-index: 20;
            background: url('../../img/pw/selected.png') center center / 100% 100% no-repeat;
          }
        }

        &.disabled {
          opacity: .5;
          cursor: not-allowed;
          background-color: #fff !important;
          // &::after {
          //   position: absolute;
          //   top: 3px;
          //   right: 0;
          //   content: '已无票';
          //   white-space: nowrap;
          //   font-size: 12px;
          //   -webkit-transform: scale(0.8);
          //   color: #ed5565;
          //   line-height: 1;
          // }
        }
      }
    }

    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.6);
      z-index: 999;
      transition: all .2s ease-in-out 0s;

      img {
        display: block;
        width: 50px;
        height: 50px;
        margin: 300px auto 0;
      }
    }
  }

</style>
