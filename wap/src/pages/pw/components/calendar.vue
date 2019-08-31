<template>
  <div class="calendar" v-if="days.length>0">
    <div class="calendar__block">
      <div class="header">
        <div class="title">选择参观日期</div>
        <div class="date">{{showDate}}</div>
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
        <li v-for="(dayobj,index) in days" :class="{'disabled': dayobj.id == '','full':dayobj.id == -2,'closed':dayobj.id == -1,'today':isToday(dayobj.day),'active':dateIndex == index}" @click="selectDay(index,dayobj.id,dayobj.yy_date,dayobj.day)">
          <!-- <p v-if="dayobj.id >= 0 || dayobj.id == -2">{{ dayobj.day.getDate() }}</p> -->
          <p>{{ dayobj.day.getDate() }}</p>
          <!-- <p class="stock" v-if="dayobj.id != '' && dayobj.id >= 0">余{{dayobj.yy_date.tp_last_stock_sum}}</p> -->
          <p class="stock" v-if="dayobj.id == ''">不可预约</p>
          <p class="stock" v-if="dayobj.id != '' && dayobj.id >= 0">有票</p>
          <!-- <p class="stock" v-if="dayobj.id != '' && isToday(dayobj.day)">今天</p> -->
          <p class="stock" v-if="dayobj.id == -2">已满</p>
          <!-- 设置特定日期文案  yt.nie 20190630改 -->
          <p class="stock" v-if="dayobj.id == -1">{{isToday(dayobj.day,new Date('2019/07/01'))?'免预约':'闭馆'}}</p>
        </li>
      </ul>
    </div>
    <div class="calendar__block">
      <div class="header">
        <div class="title">选择入馆时段</div>
      </div>
      <ul class="times" v-if="calendarInfo.tps.length > 0 && tpList.length > 0">
        <li v-for="(times,index) in calendarInfo.tps" :class="{'active':timePeriodIndex == index,'disabled':tpList[index].tp_last_stock == 0}" @click="selectTime(index,tpList[index].tp_last_stock,tpList[index].td_tp_id)">
          {{times.time_period_show}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui';
import { Session } from '@/assets/js/utils.js';

export default {
  data() {
    return {
      plat: PLAT,
      showDate: '', //显示已选日期
      days: [], //日历
      tpList: Session.get('wx_pw_tp_list') || [], //时段选择
      dateIndex: Session.get('wx_pw_dateIndex'), //已选日期索引（无默认值，避免为0时走默认）
      timePeriodIndex: Session.get('wx_pw_timePeriodIndex'), //已选时段索引（无默认值，避免为0时走默认）
    }
  },
  props: {
    calendarInfo: {
      type: Object,
      default: {}
    }
  },
  created() {
    let that = this;
    // //获取日历信息
    if (that.calendarInfo.yy_date.length > 0) {
      that.initData();
      that.initChooseDate();
    }
  },
  methods: {
    /**
     * @日历渲染
     */
    initData: function() {
      let yy_date = this.calendarInfo.yy_date;
      let tps = this.calendarInfo.tps;
      if (!yy_date.length || !tps.length) return;
      //获取可预约的第一天的日期
      let firstDate = new Date(yy_date[0].t_date.replace(/-/g, "/"))
      let firstWeek = firstDate.getDay(); //获取可预约的第一天是星期几
      if (firstWeek == 0) {
        firstWeek = 7; //周日返回‘0’ 放在第七位
      }
      let firstParse = Date.parse(firstDate) //第一天的时间戳

      //获取可预约的最后一天的日期
      let lastDate = new Date(yy_date[yy_date.length - 1].t_date.replace(/-/g, "/"))
      let lastWeek = lastDate.getDay(); //获取可预约的最后一天是星期几
      if (lastWeek == 0) {
        lastWeek = 7; //周日返回‘0’ 放在第七位
      }
      let lastParse = Date.parse(lastDate) //最后一天的时间戳


      //补齐可预约的第一天之前的日子
      for (let i = firstWeek - 1; i > 0; i--) {
        let d = new Date(firstParse - 86400000 * i);
        let dayobject = {}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day = d;
        dayobject.id = this.setDateId(d);
        dayobject.yy_date = {};
        this.days.push(dayobject); //将日期放入data 中的days数组 供页面渲染使用
      }
      //可预约的第一天到可预约最后一天
      let interval2 = Math.floor((lastParse - firstParse) / 86400000)
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
        let date = that.datefmt(that.days[m].day, 'YYYY-MM-DD')
        yy_date.forEach(function(item, index) {
          if (item.t_date == date) {
            that.days[m].yy_date = item;
          }
        })
      }

      //初始化时间段
      for (let i = 0; i < tps.length; i++) {
        let tp = {};
        tp.td_tp_id = '';
        tp.tp_last_stock = 1;
        this.tpList.push(tp);
      }
    },
    /**
     * @初始化选择日期
     */
    initChooseDate: function() {
      let that = this;
      let choseDate = Session.get('wx_pw_now_date') || '';
      let year = choseDate.substring(0, 4) || new Date().getFullYear();
      let month = choseDate.substring(5, 7) || (new Date().getMonth() + 1);
      that.showDate = that.dateJoin(year, month);
    },
    /**
     * @param    {[type]}   date        [循环出的单个日期]
     * @param    {[type]}   specialDate [指定的特殊日期]
     * @return   {Boolean}              [日期对比是否相等]
     */
    isToday: function(date, specialDate) {
      let customDate = specialDate ? new Date(specialDate) : new Date();
      return date.getFullYear() == customDate.getFullYear() && date.getMonth() == customDate.getMonth() && date.getDate() == customDate.getDate();
    },
    /**
     * @判断可预约的日期
     * dateId -1闭馆，-2已满，为空禁选
     */
    setDateId: function(d) {
      let dateId = '';
      let dateType = false;
      let date = this.datefmt(d, 'YYYY-MM-DD');
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
      return dateType ? dateId : ''; //为空即无票
    },
    /**
     * @获取选中的日期
     * @param   index   [当前选中日期索引]
     * @param   id      [当前选中日期id]
     * @param   yy_date [当前选中日期信息]
     * @param   date    [当前选中日期]
     */
    selectDay: function(index, id, yy_date, date) {
      let that = this;
      if (id != '' && id >= 0) {
        //有票时
        that.dateIndex = index; //日期索引
        that.tpList = yy_date.tp; //当前余票量对应时段重新赋值
        that.showDate = that.dateJoin(date.getFullYear(), date.getMonth() + 1); //选择当前日期

        let nowdate = that.datefmt(date, 'YYYY年MM月DD日');;


        Session.set('wx_pw_dateIndex', index);
        Session.set('wx_pw_now_date', nowdate);
        Session.set('wx_pw_tp_list', yy_date.tp);

        // //时段已选择，且仅选择日期时，时段自动重新赋值
        // if (that.timePeriodIndex != null) {
        //   if (that.tpList[that.timePeriodIndex].tp_last_stock == 0) {
        //     //如果已选中时段且该时段没票
        //     that.timePeriodIndex = null;
        //     Session.remove('wx_pw_timePeriodIndex'); //清除缓存中的时段索引
        //     Session.remove('wx_pw_time_period'); //清除缓存中的时段
        //     Session.remove('wx_pw_td_tp_id'); //清除缓存中的时段id
        //   } else {
        //     let td_tp_id = that.tpList[that.timePeriodIndex].td_tp_id;
        //     Session.set('wx_pw_td_tp_id', td_tp_id);
        //     that.$emit('chooseTimePeriod', td_tp_id);
        //   }
        // }

        //时段已选择，重选日期清空时段
        if (that.timePeriodIndex != null) {
          that.timePeriodIndex = null;
          Session.remove('wx_pw_timePeriodIndex'); //清除缓存中的时段索引
          Session.remove('wx_pw_time_period'); //清除缓存中的时段
          Session.remove('wx_pw_td_tp_id'); //清除缓存中的时段id
        }
      } else {
        that.$emit('chooseDisabled')
      }
    },
    /**
     * @获取选中的时间段
     * @param     index          [所选时段索引]
     * @param     tp_last_stock  [所选时段票量]
     * @param     td_tp_id       [所选时段id]
     */
    selectTime: function(index, tp_last_stock, td_tp_id) {
      let that = this;

      if (tp_last_stock != 0) {
        that.timePeriodIndex = index;
        Session.set('wx_pw_timePeriodIndex', index); //时段索引
        Session.set('wx_pw_td_tp_id', td_tp_id); //时段id
        Session.set('wx_pw_time_period', that.calendarInfo.tps[index].time_period_show); //缓存时段文案，例"11:00-14:00"
        that.$emit('chooseTimePeriod', td_tp_id);
      } else {
        that.$emit('chooseDisabled');
      }
    },
    /**
     * @日期拼接
     */
    dateJoin: function(year, month) {
      month = parseInt(month);
      month = month < 10 ? "0" + month : month;
      return year + "." + month
    },
    datefmt: function(date = new Date(), fmt = 'YYYY-MM-DD hh:mm:ss') {
      let weekdays = ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d'];
      let o = {
        "M+": date.getMonth() + 1,
        "D+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S+": date.getMilliseconds(),
        "w+": date.getDay()
      }
      if (/(Y+)/i.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (let k in o) {
        if (o.hasOwnProperty(k)) {
          if (k === "w+") {
            fmt = fmt.replace("w", '\u661f\u671f' + weekdays[o[k]])
          } else if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ?
              o[k] : ("00" + o[k]).substr(("" + o[k]).length))
          }
        }
      }
      return fmt
    }
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

    &+& {
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
        color: #DC613A;
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
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        color: #DC613A;

        p {
          margin-bottom: 2px;
          font-size: 15px;
          /*px*/
        }

        small {
          font-size: 10px;
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
        vertical-align: top;
        border-radius: 4px;
        border: 1px solid $baseClr;
        /*no*/
        background-color: $calendar_bgcolor;
        transition: all 0.2s ease-in-out 0s;

        &:nth-child(n+8) {
          margin-top: 5px;
        }

        .stock {
          font-size: 11px;
          /*px*/
          color: #DC613A;
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
            background-color: #d27966;
            z-index: 20;
            background: url('../../../img/pw/01.png') center center / 100% 100% no-repeat;
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
            background-color: #d27966;
            z-index: 20;
            background: url('../../../img/pw/selected.png') center center / 100% 100% no-repeat;
          }
        }

        //不可预约
        &.disabled {
          color: #353535;
          opacity: .5;
          cursor: not-allowed;
          border: 1px solid #AAAAAA;
          /*no*/
          background-color: #fff;

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
          background-color: #fff;
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
    flex-wrap: nowrap;

    li {
      position: relative;
      width: calc(100% / 3 - 10px);
      height: 28px;
      line-height: 26px;
      font-size: 16px;
      text-align: center;
      color: #555;
      cursor: pointer;
      border-radius: 4px;
      border: 1px solid $baseClr;
      /*no*/
      background-color: $calendar_bgcolor;

      &+li {
        margin-left: 15px;
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
          background-color: #d27966;
          z-index: 20;
          background: url('../../../img/pw/selected.png') center center / 100% 100% no-repeat;
        }
      }

      &.disabled {
        opacity: .5;
        cursor: not-allowed;

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
}

</style>
