<template>
  <div class="num_box">
    <div class="top">
      <div class="num_name">{{seatinfo.movie_name}}</div>
      <div class="num_date">{{seatinfo.movie_date}} 周{{week_list[week]}} {{seatinfo.movie_start_time}}</div>
    </div>
    <div class="line"></div>
    <div class="num_item">
      <div class="num_top">影票类型</div>
      <div class="table_ticket">
        <div class="table_item" v-for="(item, index) in ticket_list" @click="takepic(index,item.price)">
          <div class="table_label">
            <div>{{item.class_name}}</div>
            <div class="table_des" v-if="item.des">({{item.des}})</div>
          </div>
          <div class="table_mid">¥{{item.price}}/ <span v-if="item.total_num==1">人</span><span
            v-else>套</span></div>
          <div class="input">
            <span class="iconbox">
              <span class="icon" v-show="ind==index"></span>
            </span>
          </div>
        </div>
      </div>
      <div class="ticket_tips">每个账号每天只能预约1个类型门票</div>
    </div>
    <div class="ticket_total">合计：<span class="price">￥</span><span class="price_num">{{parseFloat(price_total).toFixed(2)}}</span>
    </div>
    <div :class="[ind>-1?'ticket_btn':'ticket_btn ticket_btn_disable']" @click="submitorder">
      {{ind>-1?'下一步':'请选择影票类型'}}
    </div>
  </div>
</template>

<script>
  import {Indicator, Toast} from 'mint-ui';

  export default {
    name: "film_num",
    data() {
      return {
        seatinfo: {},
        ticket_list: [],
        film_date_layout_id: '',
        week_list: ["日", "一", "二", "三", "四", "五", "六",],
        week: 0,
        select_num: 0,
        price_total: 0,
        ind: -1,
        cinema_id: '',
        isocdein: ''
      }
    },
    created() {
      this.film_date_layout_id = this.$route.query.film_date_layout_id;
      console.log(this.film_date_layout_id)
      this.cinema_id = this.$route.query.cinema_id;
      this.isocdein = this.$route.query.isocdein;
      this.get_SeatInfo()
    },
    methods: {
      // 获取影院信息
      get_SeatInfo() {
        Indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle"
        });
        this.isocdein = this.$route.query.isocdein;
        var isocdein = this.isocdein == 1 ? 'uncheck' : '';
        this.$api.SeatInfo(this.film_date_layout_id, isocdein).then(res => {
          Indicator.close();
          if (res.status == 1) {
            this.ticket_list = res.data.ticket_list;
            this.seatinfo = res.data;
            this.week = new Date(res.data.movie_date).getDay();
          } else {
            this.showToast(res.msg)
            this.$router.push('/film/film_index')
          }
          // //console.log(this.ticket_list)
        })
      },
      // 切换影片
      takepic(index, price) {
        this.ind = index;
        this.price_total = price;
      },
      // 弹出信息
      showToast(msg) {
        Toast({
          message: msg,
          position: 'center',
          duration: 2000
        });
      },
      submitorder() {
        if (this.ind < 0) {
          this.showToast('你还没有选择任何影票，请选择一种类型的影票。')
        } else {
          var ticket_class_string = this.ticket_list[this.ind].movie_ticket_class_id + '_1'
          let post = {
            seat: this.ticket_list[this.ind].total_num,
            seat_num: this.ticket_list[this.ind].total_num,
            movie_name: this.seatinfo.movie_name,
            movie_start_time: this.seatinfo.movie_start_time,
            movie_end_time: this.seatinfo.movie_end_time,
            address: this.seatinfo.address,
            movie_date: this.seatinfo.movie_date,
            names: JSON.stringify([this.ticket_list[this.ind].class_name + 'x 1']),
            ticket_class_string: ticket_class_string,
            long_time: this.seatinfo.long_time,
            price_total: this.price_total,
          };
          localStorage.setItem('qfilm_post', JSON.stringify(post))
          this.$router.push({
            path: '/film/film_confirm',
            query: {
              film_date_layout_id: this.film_date_layout_id,
              movie_type: this.seatinfo.type,
              cinema_id: this.cinema_id
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '@/style/mixin.scss';

  .num_box {
    min-height: 90vh;
    background-color: #F7F7F7;
    padding: 10px 0;

    .top {
      background-color: #fff;

      .num_name {
        color: #353535;
        font-size: 22px;
        /*px*/
        font-weight: bold;
        margin: 0 12px;
        padding: 17px 0;
        background-color: #fff;
      }

      .num_date {
        color: #353535;
        font-size: 14px;
        /*px*/
        margin: 0 12px;
        padding: 0 0 13px 0;
      }
    }

    .line {
      height: 10px;
      background-color: #ECECEC;
    }

    .num_item {
      background-color: #fff;
      padding: 10px 12px 0 12px;

      .num_top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0;
        color: #353535;
        font-size: 19px;
        /*px*/
        font-weight: bold;
        /*border-bottom: 1px solid rgba(0, 0, 0, .2);*/
        span {
          flex: 1;
          text-align: center;
          font-size: 15px;
          /*px*/

        }
      }

      .table_ticket {
        /*border-top: 2px solid rgba(0, 0, 0, .2);*/
        min-height: 333px;

        .table_item {
          border-bottom: 1px solid rgba(0, 0, 0, .1);
          padding: 20px 10px 15px 0;
          display: flex;
          align-items: center;

          &:last-child {
            border: 0;
          }

          .table_label {
            display: inline-block;
            color: #353535;
            font-size: 17px;
            /*px*/
            font-weight: bold;
            flex: 3;

            .table_des {
              font-size: 10px;
              /*px*/
              color: #727272;
              padding: 10px 0;
              font-weight: normal;
            }
          }

          .table_mid {
            flex: 2;
            font-size: 15px;
            /*px*/
            color: $baseClr;
          }

          .input {
            display: flex;
            justify-content: flex-end;
            flex: 1;

            .iconbox {
              width: 17px;
              /*no*/
              height: 17px;
              /* no*/
              border: 2px solid $baseClr;
              /*no*/
              border-radius: 100%;
              flex-shrink: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              /*line-height: 1;*/
              .icon {
                width: 9px;
                /*no*/
                height: 9px;
                /*no*/
                background: $baseClr;
                border-radius: 50%;
                flex-shrink: 0;
                display: inline-block;
                line-height: normal;
              }
            }
          }
        }
      }
    }

    .ticket_tips {
      border-top: 1px dashed rgba(0, 0, 0, .2);
      /*no*/
      font-size: 12px;
      /*px*/
      padding: 15px 0;
      color: #727272;
    }

    .ticket_total {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 15px;
      /*  px*/
      color: #353535;
      padding: 10px 15px;

      .price {
        color: $baseClr;
      }

      .price_num {
        color: $baseClr;
        font-weight: bold;
        font-size: 18px;
        /*  px*/
      }
    }
  }

  .ticket_btn {
    /*position: fixed;*/
    /*bottom: 10px;*/
    margin: 12px;
    background-color: $baseClr;
    border-radius: 24px;
    /*no*/
    text-align: center;
    padding: 15px 0;
    color: #fff;
    font-size: 18px;
    /*px*/
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.11);

    &:active {
      opacity: .7;
    }
  }

  .ticket_btn_disable {
    background: rgba(0, 0, 0, .3)
  }
</style>
