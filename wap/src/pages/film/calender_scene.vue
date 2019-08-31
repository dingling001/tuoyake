<template>
  <div class="calendar">
    <div class="calendar__block">
      <div class="header">
        <div class="title">选择观影日期</div>
        <div class="date">{{formatDate(new Date(calendarInfo.today).getFullYear(),new
          Date(calendarInfo.today).getMonth()+1)}}
        </div>
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
        <li v-for="(dayobj,index) in datelist"
            :class="{'disabled': !isToday(dayobj.date),'closed':!dayobj.is_select,'today active':isToday(dayobj.date)}"
            @click="selectDay(index,dayobj.is_select,dayobj.date)">
          <p>{{ dayobj.day}}</p>
          <p class="stock-no" v-if="dayobj.status&&dayobj.is_select">{{dayobj.seats}}</p>
          <p class="stock" v-if="!dayobj.status&&!dayobj.is_select">{{dayobj.seats}}</p>
        </li>
      </ul>
    </div>
    <!--        <div class="overlay" v-show="overlayFlag"><img src="../../img/pw/loader.gif"></div>-->
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import {Session} from '@/assets/js/utils.js';

  export default {
    data() {
      return {
        days: [], //日历
        dateIndex: 0, //已选日期索引（无默认值，避免为0时走默认）
      }
    },
    created() {
      // this.get_Calendar()
      if (this.calendarInfo.yy_date.length > 0) {
        this.initdate();
        this.$emit('date_choose', this.calendarInfo.today);
      }
    },
    props: {
      calendarInfo: {
        type: Object,
        default: {}
      }
    },
    methods: {
      //获取日历信息
      get_Calendar() {
        // this.overlayFlag = 1;
        this.$api.CinemaCalendar().then((res) => {
          // this.overlayFlag = 0;
          this.calendarInfo = res.data
          this.initdate()
          let closed_pre_week = this.calendarInfo.closed_pre_week;
          let datelist = this.datelist;
          let special_date = this.calendarInfo.special_date;

          for (let i in datelist) {
            for (let j in closed_pre_week) {
              if (closed_pre_week[j] != 0) {
                if (closed_pre_week[j] == datelist[i].date.split('-')[3]) {
                  datelist[i].status = false;
                  datelist[i].is_select = false;
                  datelist[i].seats = '闭馆'
                }
              }
              for (let k in  special_date) {
                let s = datelist[i].date.split('-').splice(0, 3).join('-')
                if (special_date[k].special_date == s) {
                  if (special_date[k].type == 1) {
                    datelist[i].status = true;
                    datelist[i].is_select = true;
                    datelist[i].seats = special_date[k].msg
                  } else if (special_date[k].type == 2) {
                    datelist[i].status = false;
                    datelist[i].is_select = false;
                    datelist[i].seats = special_date[k].msg
                  }
                }
              }
            }
          }
        })
      },
      initdate() {
        let today = new Date(this.calendarInfo.today).getDay() - 1 == -1 ? 6 : new Date().getDay() - 1;
        // //console.log(today)
        let beforedate = [];//今天之前的日期
        let afterdate = [];//今天之后的日期
        let nextdate = [];//下周的日期
        for (let j = 0; j <= today; j++) {
          if (j == 0) {
            beforedate.push({
              day: this.fun_date(0).split('-')[2],
              date: this.fun_date(0, 1),
              seats: '',
              status: true,
              select: false,
              is_select: true,
            })
          } else {
            beforedate.push({
              day: this.fun_date(-j).split('-')[2],
              date: this.fun_date(-j, 1),
              seats: '',
              status: false,
              select: false,
              is_select: false,
            })
          }

        }
        for (let k = 1; k < 7 - today; k++) {
          if (k < 7) {
            afterdate.push({
              day: this.fun_date(k).split('-')[2],
              date: this.fun_date(k, 1),
              seats: '',
              status: true,
              select: false,
              is_select: true,
            })
          } else {
            afterdate.push({
              day: this.fun_date(k).split('-')[2],
              date: this.fun_date(k, 1),
              seats: '',
              status: true,
              select: false,
              is_select: true,
            })
          }
        }
        for (let m = 0; m < 7 - today; m++) {
          nextdate.push({
            day: this.fun_date(m).split('-')[2],
            date: this.fun_date(m, 1),
            seats: '',
            status: false,
            select: false,
            is_select: true,
          })
        }
        this.datelist = beforedate.reverse().concat(afterdate).concat(nextdate.splice(7));
      },
      fun_date(aa, type) {
        // let aa=aa-1;
        var date1 = new Date();
        // time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();//time1表示当前时间
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + aa);
        var month = date2.getMonth() + 1;
        if (type) {
          var time2 = date2.getFullYear() + "-" + (month <= 9 ? '0' + month : month) + "-" + (date2.getDate() <= 9 ? '0' + date2.getDate() : date2.getDate()) + '-' + date2.getDay();
        } else {
          var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + (date2.getDate() <= 9 ? '0' + date2.getDate() : date2.getDate());
        }
        return time2
      },
      isToday: function (date) {
        var today = this.calendarInfo.today
        return date.split('-')[0] == new Date(today).getFullYear() && date.split('-')[1] == new Date(today).getMonth() + 1 && date.split('-')[2] == new Date(today).getDate();
      },
      //获取选中的日期
      selectDay: function (index, is_select, date) {
        let that = this;
        if (this.isToday(date)) {
          //有票时
          that.dateIndex = index; //日期索引
          date = date.split('-').splice(0, 3).join('-')
          that.$emit('date_choose', date);
        } else {
          Toast('日期不可选');
        }
      },
      // 日期格式化
      formatDate: function (year, month) {
        var y = year;
        var m = month;
        if (m < 10) m = "0" + m;
        return y + "." + m
      },
    }
  }

</script>
<style lang="scss" scoped>
  .calendar {
    background-color: #ECECEC;

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
          font-weight: bold;
          color: #353535;
        }

        .date {
          font-size: 16px;
          /*px*/
          font-family: PingFangSC-Regular;
          font-weight: bold;
          color: #DC613A;
        }
      }

      ul.weekdays {
        font-size: 0;
        /*px*/
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
          color: #DC613A;

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
          border: 1px solid rgba(180, 124, 45, 1);
          // border: 1px solid #eee5d7;
          transition: all 0.2s ease-in-out 0s;

          &:nth-child(n+8) {
            margin-top: 5px;
          }

          .stock {
            font-size: 11px;
            /*px*/
            color: #DC613A;
            -webkit-transform: scale(0.8);
          }

          .stock-no {
            font-size: 14px;
            /*px*/
          }

          &.today {
            opacity: 1;
            position: relative;

            &::after {
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
              background: url('../../img/pw/01.png') center center / 100% 100% no-repeat;
            }

            .stock {
              font-size: 12px;
              /*px*/
              color: #ed5565;
              -webkit-transform: scale(0.8);
            }
          }

          &.active {
            color: #fff;
            background-color: #d19d52;
            border: 1px solid #d19d52;

            .stock {
              color: #fff;
              -webkit-transform: scale(0.8);
            }
          }

          &.disabled {
            color: #353535;
            opacity: .7;
            cursor: not-allowed;
            border: 1px solid #AAAAAA;
            background-color: #fff;

            .stock {
              color: #353535;
              -webkit-transform: scale(0.8);
            }
          }

          &.full {
            color: #a1a1a1;
            cursor: not-allowed;
            border: 1px solid #fff;

            .stock {
              font-size: 12px;
              /*px*/
              -webkit-transform: scale(0.8);
              color: #ed5565;
            }
          }

          &.closed {
            color: #a1a1a1;
            cursor: not-allowed;
            background-color: #fff;
            border: 1px solid #AAAAAA;
            opacity: .7;

            .stock {
              color: #a1a1a1;
              -webkit-transform: scale(0.8);
            }
          }
        }
      }
    }

    .times {
      display: flex;
      justify-content: space-between;

      li {
        position: relative;
        height: 28px;
        line-height: 28px;
        font-size: 16px;
        /*px*/
        width: 32%;
        text-align: center;
        display: inline-block;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid #F1E7D9;
        background-color: #F1E7D9;

        &.active {
          color: #fff;
          border: 1px solid #d19d52;
          background-color: #d19d52;

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
            background-color: #d27966;
            z-index: 20;
            background: url('../../img/pw/selected.png') center center / 100% 100% no-repeat;
          }
        }

        &.disabled {
          opacity: .5;
          cursor: not-allowed;

          &::after {
            position: absolute;
            top: 3px;
            right: 0;
            content: '已无票';
            font-size: 12px;
            -webkit-transform: scale(0.8);
            color: #ed5565;
            line-height: 1;

          }
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
