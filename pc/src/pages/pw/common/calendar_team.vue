<template>
  <div id="calendar">
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
      </li>
      <li>
        <p>日</p>
        <p class="en">SUN</p>
      </li>
    </ul>
    <ul class="days" v-if="days.length>0">
      <!--循环<li>标签创建一天 -->
      <li v-for="(dayobj,index) in days" :class="{'active':dateIndex == index,'disabled':dayobj.id == '','full':dayobj.id == -2,'closed':dayobj.id == -1,'today':isToday(dayobj.day)}" @click="selectDay(index,dayobj.id,dayobj.yy_date,dayobj.day)">
        <p>{{ dayobj.day.getMonth()+1 }}月{{ dayobj.day.getDate() }}日</p>
        <!-- <p class="stock" v-if="dayobj.id != '' && dayobj.id >= 0">余{{dayobj.yy_date.tp_last_stock_sum}}</p> -->
        <p class="stock" v-if="dayobj.id != '' && dayobj.id >= 0">有票</p>
        <p class="stock stock-no" v-if="dayobj.id == ''">不可预约</p>
        <p class="stock stock-no" v-if="dayobj.id == -1">闭馆</p>
        <p class="stock stock-no" v-if="dayobj.id == -2">已满</p>
      </li>
    </ul>
    <div class="period">
      <div class="period__tit">入馆时段：</div>
      <ul class="period__list" v-if="calendarInfo.tps.length > 0 && tpList.length > 0">
        <li v-for="(times,index) in calendarInfo.tps" :class="{'active':timePeriodIndex == index,'disabled':tpList[index].tp_last_stock == 0}" @click="selectTime(index,tpList[index].tp_last_stock,tpList[index].td_tp_id)">{{times.time_period_show}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Session } from '@/bin/cache.js';

export default {
  name: 'calendar_team',
  data() {
    return {
      days: [], //日历
      // 时段
      tpList: Session.get('hbpw_team__td_tp_list') || [], //时段选择
      dateIndex: Session.get('hbpw_team__td_index'), //日期索引
      timePeriodIndex: Session.get('hbpw_team__td_tp_index'), //时段索引
    }
  },
  props: {
    calendarInfo: {
      type: Object,
      default: {}
    }
  },
  created: function() {
    if (this.calendarInfo.yy_date.length > 0) {
      this.initdate();
      //初始化时间段
      for (let i = 0; i < this.calendarInfo.tps.length; i++) {
        let tp = {};
        tp.td_tp_id = '';
        tp.tp_last_stock = 1;
        this.tpList.push(tp);
      }
    }
  },
  methods: {
    // 渲染初始化日期
    initdate() {
      if (!this.calendarInfo.yy_date.length) return;
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
        that.calendarInfo.yy_date.forEach(function(item, index) {
          if (item.t_date == date) {
            that.days[m].yy_date = item;
          }
        })
      }
    },
    isToday: function(date) {
      return date.getFullYear() == new Date().getFullYear() && date.getMonth() == new Date().getMonth() && date.getDate() == new Date().getDate();
    },

    //判断可预约的日期
    setDateId: function(d) {
      let dateId = '';
      let dateType = false;
      let date = this.formatDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
      let closed_date = this.calendarInfo.closed_date;
      let closed_pre_week = this.calendarInfo.closed_pre_week;
      let opened_date = this.calendarInfo.opened_date;
      let yy_date = this.calendarInfo.yy_date;


      //固定闭馆日（周几闭馆）
      let closedWeek = d.getDay();
      if (closedWeek == 0) {
        closedWeek = 7;
      }
      closed_pre_week.forEach(function(item, index) {
        if (closedWeek == item) {
          dateType = true
          dateId = -1
        }
      })

      //特殊闭馆日
      closed_date.forEach(function(item, index) {
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
      yy_date.forEach(function(item, index) {
        if (item.t_date == date) {
          if (item.tp_last_stock_sum == 0) {
            //预约已满
            dateType = true;
            dateId = -2;
          } else {
            dateType = true;
            dateId = item.td_id;
          }
        }
      })

      return dateType ? dateId : '';
    },
    //获取选中的日期
    selectDay: function(index, id, yy_date, date) {
      if (id != '' && id >= 0) {
        //有票时
        this.dateIndex = index; //日期索引
        this.tpList = yy_date.tp; //当前余票量对应时段重新赋值

        let nowdate = date.getMonth() + 1 + '月' + date.getDate() + '日     '
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

        Session.set('hbpw_team__td_id', id);
        Session.set('hbpw_team__td_txt', nowdate);
        Session.set('hbpw_team__td_index', index);
        Session.set('hbpw_team__td_tp_list', yy_date.tp);

        // //时段已选择，且仅选择日期时，时段自动重新赋值
        // if (this.timePeriodIndex != null) {
        //   if (this.tpList[this.timePeriodIndex].tp_last_stock == 0) {
        //     //如果已选中时段且该时段没票
        //     this.timePeriodIndex = null;
        //     Session.remove('hbpw_team__td_tp_index'); //清除缓存中的时段索引
        //     Session.remove('hbpw_team__td_tp_txt'); //清除缓存中的时段
        //     Session.remove('hbpw_team__td_tp_id'); //清除缓存中的日期时段id
        //   } else {
        //     let td_tp_id = this.tpList[this.timePeriodIndex].td_tp_id;
        //     Session.set('hbpw_team__td_tp_id', td_tp_id);
        //   }
        // }
        // 
        //时段已选择，重选日期清空时段
        if (this.timePeriodIndex != null) {
          this.timePeriodIndex = null;
          Session.remove('hbpw_team__td_tp_index'); //清除缓存中的时段索引
          Session.remove('hbpw_team__td_tp_txt'); //清除缓存中的时段
          Session.remove('hbpw_team__td_tp_id'); //清除缓存中的时段id
        }
      }
    },
    //获取选中的时间段
    selectTime: function(index, tp_last_stock, td_tp_id) {
      if (tp_last_stock != 0) {
        this.timePeriodIndex = index;
        Session.set('hbpw_team__td_tp_index', index); //时段索引
        Session.set('hbpw_team__td_tp_txt', this.calendarInfo.tps[index].time_period_show); //选择时段
        Session.set('hbpw_team__td_tp_id', td_tp_id); //日期时段id
      }
    },
    // 日期格式化
    formatDate: function(year, month, day) {
      var y = year;
      var m = month;
      if (m < 10) m = "0" + m;
      var d = day;
      if (d < 10) d = "0" + d;
      return y + "-" + m + "-" + d
    },
  }
}

</script>
<style lang="scss" scoped>
#calendar {
  ul.weekdays {
    font-size: 0;
    -webkit-text-size-adjust: none;

    >li {
      display: inline-block;
      width: 100px;
      padding: 12px 0;
      color: #DC613A;
      font-size: 14px;
      text-align: center;
      border: 2px solid #fff;

      p {
        line-height: 1.5;
        font-weight: bold;
      }

      .en {
        font-size: 12px;
      }

      &+li {
        margin-left: 20px;
      }
    }
  }

  // 日历渲染

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

      &+li {
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
          background: url("../../../img/ticket/selected.png") no-repeat;
        }
      }

      &.disabled {
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

      &.full {
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
        &::before {
          content: '今';
          position: absolute;
          top: 0;
          right: 0;
          color: #fff;
          font-size: 12px;
          padding: 2px 4px;
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
      line-height: 56px;
      font-size: 18px;
    }

    &__list {
      float: left;

      >li {
        position: relative;
        display: inline-block;
        width: 166px;
        line-height: 56px;
        text-align: center;
        border: 2px solid #aaa;
        cursor: pointer;
        font-size: 16px;
        background-color: #F1E7D9;

        &+li {
          margin-left: 25px;
        }

        &:hover {
          border-color: #B47C2D;
        }

        &.active {
          color: #fff;
          background-color: #DA9B42;
          border: 2px solid #DA9B42;


          &::after {
            content: '';
            position: absolute;
            right: -2px;
            bottom: -2px;
            width: 25px;
            height: 20px;
            background: url("../../../img/ticket/selected.png") no-repeat;
          }

        }

        &.disabled {
          opacity: .5;
          cursor: not-allowed;

          &:hover {
            border: 2px solid #aaa;
          }

          &::before {
            content: '已无票';
            position: absolute;
            top: 0;
            right: 0;
            color: #fff;
            font-size: 12px;
            padding: 2px 4px;
            background: #E07460;
            text-align: center;
            line-height: 12px;
            display: block;
          }
        }
      }
    }
  }
}

</style>
