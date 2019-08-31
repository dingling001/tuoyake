<template>
  <!--<div class="calendar" v-if="days.length>0">-->
  <div class="calendar">
    <div class="calendar__block">
      <div class="header">
        <div class="title">选择参观日期</div>
        <div class="date">{{formatDate1(new Date().getFullYear(), new Date().getMonth() + 1)}}</div>
      </div>
      <ul class="weekdays" v-if="days.length>0">
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
      <ul class="days" v-if="days.length>0">
        <li v-for="(dayobj,index) in days"
            :class="{'disabled': dayobj.id == '','full':dayobj.id == -2,'closed':dayobj.id == -1||dayobj.id == -4,'today':isToday(dayobj.day),'active':dateIndex == index}"
            @click="selectDay(index,dayobj.id,dayobj.yy_date,dayobj.day)">
          <!-- <p v-if="dayobj.id >= 0 || dayobj.id == -2">{{ dayobj.day.getDate() }}</p> -->
          <p>{{ dayobj.day.getDate() }}</p>
          <!-- <p class="stock" v-if="dayobj.id != '' && dayobj.id >= 0">余{{dayobj.yy_date.tp_last_stock_sum}}</p> -->
          <!--<p class="stock" v-if="dayobj.id == ''">不可预约</p>-->
          <!--<p class="stock" v-if="dayobj.id != '' && dayobj.id >= 0">有票</p>-->
          <!-- <p class="stock" v-if="dayobj.id != '' && isToday(dayobj.day)">今天</p> -->
          <!--<p class="stock" v-if="dayobj.id == -2">已满</p>-->
          <!--<p class="stock" v-if="dayobj.id == -4||dayobj.id == 99">{{dayobj.yy_date.msg}}</p>-->
          <p class="stock" v-if="dayobj.id == -1||dayobj.id==-4">闭馆</p>
        </li>
      </ul>
    </div>
    <!-- <div class="overlay" v-show="overlayFlag"><img src="../../../img/pw/loader.gif"></div> -->
  </div>
</template>
<script>
  import {Toast, Indicator} from 'mint-ui';
  import {Session} from '@/assets/js/utils.js';

  export default {
    data() {
      return {
        // calendarInfo: {
        //   tps: []
        // },
        days: [], //日历
        dateIndex: null, //已选日期索引（无默认值，避免为0时走默认）
        timePeriodIndex: null, //已选时段索引（无默认值，避免为0时走默认）
        // overlayFlag: 0,
      }
    },
    props: {
      calendarInfo: {
        type: Object,
        default: {}
      }
    },
    created() {
      // //获取日历信息
      // this.get_Calendar();
      if (this.calendarInfo.yy_date.length > 0) {
        this.initData();
      }
    },
    methods: {
      initData: function () {
        let yydate = this.calendarInfo.yy_date;
        let yy_date = []
        // let closed_pre_week = this.calendarInfo.closed_pre_week;
        let special_date = this.calendarInfo.special_date;
        yydate.map(item => {
          yy_date.push({
            t_date: item,
            msg: ''
          })
        });
        Indicator.close();
        yy_date.map((item, index) => {
          // let day = new Date(item).getDay() == 0 ? 7 : new Date(item).getDay();
          // closed_pre_week.map((i, m) => {
          //   if (i != 0) {
          //     if (i == day) {
          //       yy_date.splice(index, 1)
          //     }
          //   }
          // })
          special_date.map((i, m) => {
            if (i.special_date == item.t_date) {
              item.msg = i.msg
            }
          })
        })
        if (!yy_date.length) return;
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
          let date = that.formatDate(that.days[m].day.getFullYear(), that.days[m].day.getMonth() + 1, that.days[m].day.getDate())
          yy_date.forEach(function (item, index) {
            if (item.t_date == date) {
              that.days[m].yy_date = item;
            }
          })
        }
        // console.log(that.days)
      },
      isToday: function (date) {
        var today=this.calendarInfo.today
        return date.getFullYear() == new Date(today).getFullYear() && date.getMonth() == new Date(today).getMonth() && date.getDate() == new Date(today).getDate();
      },
      //判断可预约的日期
      setDateId: function (d) {
        let dateId = '';
        let dateType = false;
        let date = this.formatDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
        let closed_pre_week = this.calendarInfo.closed_pre_week;
        let special_date = this.calendarInfo.special_date;
        let yy_date = this.calendarInfo.yy_date;
        //固定闭馆日（周几闭馆）
        let closedWeek = d.getDay() == 0 ? 7 : d.getDay();
        //可预约日期
        yy_date.map(function (item, index) {
          if (item == date) {
            dateType = true;
            dateId = index + 1;
            // let day = new Date(item).getDay() == 0 ? 7 : new Date(item).getDay();
            special_date.map((i, m) => {
              if (i.special_date == item) {
                dateType = true;
                if (i.type == 1) {
                  dateId = 99; //特殊开馆日
                } else if (i.type == 2) {
                  dateId = -4; //特殊闭馆日
                }
              }
            })
          }
        });
        closed_pre_week.map((j, n) => {
          if (j != 0) {
            if (j == closedWeek) {
              dateType = true;
              dateId = -1
            }
          }
        });
        return dateType ? dateId : '';
      },
      //获取选中的日期
      selectDay: function (index, id, yy_date, date) {
        let that = this;
        if (id != '' && id >= 0) {
          that.dateIndex = index; //日期索引
          let nowdate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
          that.$emit('date_choose', nowdate)
        } else {
          that.$emit('chooseDisabled')
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
    /*min-height: 216px;*/

    &__block {
      overflow: hidden;
      background: #fff;
      margin-bottom: 10px;
      padding: 15px;

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
          background-color: #F0E5D5;
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
        line-height: 28px;
        font-size: 16px;
        /*px*/
        text-align: center;
        color: #555;
        cursor: pointer;
        border-radius: 4px;
        background-color: #F1E7D9;
        border: 1px solid $baseClr;
        /*no*/
        & + li {
          margin-left: 15px;
        }

        &.active {
          color: #fff;
          border: 1px solid $baseClr;
          /*px*/
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
