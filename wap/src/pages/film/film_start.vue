<template>
  <div class="home">
    <div class="homebox">
      <Calendar @date_choose="s_date" :calendarInfo="calendarInfo" @chooseDisabled="clickDis"
                v-if="flg&&calendarInfo.yy_date.length>0"></Calendar>
    </div>
    <div v-if="flg&&flg1" class="nodata">暂未开放</div>
    <div class="line"></div>
    <div  class="errmsg">
      <div v-if="errmsg">{{errmsg}}, <router-link  tag="span"  to='/pw/person/index' class="yuyue">免费预约</router-link></div>
    </div>
    <div class="bottom">
      <div :class="['submit',flg&&calendarInfo.yy_date.length>0?'':'disable']" @click="film_fn">
        <span v-if="calendarInfo.yy_date.length>0">预约影院票</span>
      </div>
    </div>
    <div class="notice" v-html="calendarInfo.gpxz"></div>
  </div>
</template>
<script>
  import {Toast, Indicator} from 'mint-ui';
  import Calendar from '@/pages/film/calendar';

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
      // 导出组件时间
      s_date(val) {
        this.date = val;
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
        var isocdein = this.isocdein == 1 ? 'uncheck' : '';
        this.$api.CinemaDateMovie( date, this.cinema_id,isocdein).then(res => {
          if (res.status == 1) {
            var path = this.cinema_id == 1 ? '/film/film_movie' : '/film/film_qmovie';
            this.$router.push({
              path: path,
              query: {date: this.date, cinema_id: this.cinema_id}
            })
          } else {
            this.showToast(res.msg)
            this.errmsg = res.msg;
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
      padding: 0 20px 34px 20px;
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
