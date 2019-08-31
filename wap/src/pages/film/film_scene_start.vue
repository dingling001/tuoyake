<template>
  <div class="home">
    <Calendar @date_choose="s_date" :calendarInfo="calendarInfo" @chooseDisabled="clickDis"
              v-if="flg&&calendarInfo.yy_date.length>0"></Calendar>
    <div class="line"></div>
    <div class="bottom">
      <div :class="['submit',flg&&calendarInfo.yy_date.length>0?'':'disable']" @click="film_fn">
        <span v-if="calendarInfo.yy_date.length>0">预约影院票</span>
      </div>
    </div>
    <div class="notice" v-html="calendarInfo.gpxz">
      <!--<p class="p">预约须知：</p>-->
      <!--<p class="p">一、国家海洋博物馆预约服务系统实行全员实名制预约参观，个人观众需提前1-7天在“国家海洋博物馆”官方网站或“掌上海博”小程序预约，入馆时段为：9:30-14:00，预约量为3000人。</p>-->
      <!--<p class="p">二、参观当天凭预约时使用的本人二代身份证从正门（南门）入馆参观，一人一证，现场通过闸机或手持验票终端完成身份验证工作。</p>-->
      <!--<p class="p">三、试开馆期间参观预约只提供个人参观预约，预约均采取实名制，请提供预约人真实姓名、联系方式、二代身份证号码等信息，每个身份证每天只能预约1次。预约编码当天有效，过期作废。</p>-->
      <!--<p class="p">四、预约成功后，系统自动发送预约成功消息通知，如发生身份证消磁等特殊情况，可凭订单内的检票二维码信息检票，经馆内安检合格后入馆参观。目前仅可通过“国家海洋博物馆”官方公众号预约，请大家认准，以免耽误您的行程。</p>-->
      <!--<p class="p">五、未提前预约的观众，在我馆未达到当日额定预约上限时，可以现场预约，经馆内安检合格方可入馆参观。</p>-->
      <!--<p class="p">六、持身份证以外证件（如：护照、学生证、户口本等）的观众，预约后现场通过工作人员核对相关证件信息，安检合格后扫描订单内的检票二维码进馆。</p>-->
      <!--<p class="p">七、身高1.3米（含1.3米）以下儿童无需预约，可直接与家长一同入馆。</p>-->
      <!--<p class="p">八、如无法按时入馆参观，观众可于参观当日20:00点前在本系统申请退票，逾期无法退票，系统将自动默认该账号爽约1次。连续3次爽约的账号，将在90天内不能预约。</p>-->
    </div>
  </div>
</template>
<script>
  import {Toast,Indicator } from 'mint-ui';
  import Calendar from '@/pages/film/calender_scene';

  export default {
    name: "film_start",
    data() {
      return {
        calendarInfo: {
          yy_date: []
        },
        date: '',
        flg: false,
        flg1: false,
        cinemalist: [],
        cinema_id: '',
        cinema_name: '',
        cinema_type: '',
        errmsg: ''
      };
    },
    inject: ['app'],
    created() {
      this.cinema_type = this.$route.query.cinema_type;
      this.cinema_name = this.$route.query.cinema_name;
      this.app.setTitle(this.cinema_name)
      this.ge_CinemaList();
      localStorage.removeItem('film_post');
      localStorage.removeItem('qfilm_post')
    },
    components: {
      Calendar
    },
    methods: {
      // 获取影院列表
      ge_CinemaList() {
        this.$api.CinemaList().then(res => {
          this.cinemalist = res.data;
          if (this.cinema_type == 'yy') {
            this.cinema_id = 1;
          } else if (this.cinema_type == 'xk') {
            this.cinema_id = 2;
          } else {

          }
          this.get_c_info();
        });
      },
      // 获取日期信息
      get_c_info() {
        let that = this;
        Indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle"
        });
        that.$api.CinemaCalendar(this.cinema_id).then((res) => {
          // //console.log(res)
          this.flg = true;
          if (res.status == 1) {
            that.calendarInfo = res.data;
            if (that.calendarInfo.yy_date.length == 0) {
              that.flg1 = true;
            }
          } else {
            Toast(res.msg)
          }
          Indicator.close();
        })
      },
      // 导出组件时间
      s_date(val) {
        this.date = val;
      },
      // 获取日期信息
      // get_c_info() {
      //   let that = this;
      //   Indicator.open({
      //     text: "加载中...",
      //     spinnerType: "fading-circle"
      //   });
      //   that.$api.CinemaCalendar(this.cinema_id).then((res) => {
      //     // //console.log(res)
      //     this.flg = true;
      //     if (res.status == 1) {
      //       that.calendarInfo = res.data;
      //       if (that.calendarInfo.yy_date.length == 0) {
      //         that.flg1 = true;
      //       }
      //     } else {
      //       Toast(res.msg)
      //     }
      //     Indicator.close();
      //   })
      // },
      clickDis() {
        let v = this;
        v.showToast("不可选");
      },
      // 弹出信息
      showToast(msg) {
        Toast({
          message: msg,
          position: 'center',
          duration: 2000
        });
      },

      get_CinemaDateMovie(date) {
        this.$api.CinemaDateMovie( date, this.cinema_id,'uncheck').then(res => {
          if (res.status == 1) {
            var path = this.cinema_id == 1 ? '/film/film_movie' : '/film/film_qmovie';
            this.$router.push({
              path: path,
              query: {date: this.date, cinema_id: this.cinema_id,isocdein:1}
            })
          } else {
            this.showToast(res.msg)
          }
        })
      },
      // 预约
      film_fn() {
        if (this.calendarInfo.yy_date.length < 0) {
          this.showToast('暂未开放');
        } else if (this.date == '') {
          this.showToast('请选择观影日期');
        } else {
          this.get_CinemaDateMovie(this.date)
        }
      }
    }
  };

</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';

  .home {
    min-height: calc(100vh - 60px);
    background-color: #fff;
    .errmsg {
      color: red;
      font-size: 14px;
      /*px*/
      padding: 15px 0;
      text-align: center;
      .yuyue{
        color: $baseClr;
      }
    }
    .homebox {
      /*min-height: 216px;*/
      min-height: 166px;
    }

    .nodata {
      color: #ccc;
      padding: 15px;
      text-align: center;
      font-size: 22px;
      /*px*/
    }

    .line {
      width: 100%;
      height: 10px;
      background-color: #ECECEC;
    }

    .notice {
      overflow: hidden;
      background: #fff;
      padding: 0 15px 30px 15px;

      /deep/ p {
        font-size: 14px;
        /*px*/
        font-weight: 400;
        color: #55555A;
        line-height: 25px;
      }
    }

    .bottom {
      /*position: fixed;*/
      /*bottom: 0;*/
      /*left: 0;*/
      display: flex;
      justify-content: center;
      padding: 34px 20px;
      background-color: #fff;

      .submit {
        width: 347px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        background: $baseClr;
        border-radius: 24px;
        font-size: 18px;
        font-weight: 400;
        color: #FFFFFF;

        &:active {
          opacity: .7;
        }
      }

      .disable {
        background-color: #cccc;
      }
    }
  }

</style>
