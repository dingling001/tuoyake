<template>
  <div class="seat_box">
    <div class="seat_info">
      <div class="tips" v-if="seat_info.type==3">温馨提示：该场次为沉浸式体验影片。</div>
      <div class="tips" v-else>温馨提示：该场次为非沉浸式体验影片，请选座观影。</div>
      <div class="film_head">
        <div class="film_name">{{seat_info.movie_name}}</div>
        <div class="film_item">影片时长：{{seat_info.long_time}}分钟</div>
        <div class="film_item">放映地址：{{seat_info.address}}</div>
        <div class="film_item">日期及场次：{{seat_info.movie_date}} 周{{week_list[week]}}
          {{seat_info.movie_start_time}}
        </div>
        <div class="film_ticket">
          <div class="film_item">影片类型：</div>
          <div class="right">
            <div class="film_item ">
              <div class="ticket_item" v-for="item in names" v-if="item">{{item}}</div>
            </div>
            <div> 共计{{select_num}}张</div>
          </div>
        </div>
      </div>
      <div class="seat_area">
        <div class="seat_left">
          <div class="seats">
            <div :class="['seats_item', iconshow?'seats_active':'']">
              <div class="seat_screen">
                银幕方向
                <div class="seat_d">银幕中央</div>
              </div>
              <div :class="['line_num_box' ,iconshow?'line_num_box_active':'']"><span
                v-for="(item ,index ) in seat_info.seat">{{index+1}}</span>
              </div>
              <div class="row" v-for="(item ,index) in seat_info.seat">
                <div class="icon_seat" v-for="(i,sindex) in item"
                     @click="handleChooseSeat(index,sindex)">
                                    <span class="icon_item" v-if="i!=-1"
                                          :class="i==2?'bought-seat':(i==1?'selected-seat':'unselected-seat')"
                                    ></span>
                  <!--<span v-else-if="i==1" class="icon_item selected-seat"></span>-->
                  <!--<span v-else-if="i==0" class="icon_item unselected-seat"></span>-->
                  <!--<span v-else-if="i==2" class="icon_item bought-seat"></span>-->
                </div>
              </div>
            </div>
          </div>
          <div class="seat_tips">
            <div class="chosen">
              <span class="can_item unselected-seat"></span>
              <span class="can_text">可选座位</span>
            </div>
            <div class="chosen">
              <span class="can_item bought-seat"></span>
              <span class="can_text">不可选座位</span>
            </div>
            <div class="chosen">
              <span class="can_item selected-seat"></span>
              <span class="can_text">已选座位</span>
            </div>
          </div>
        </div>
        <div class="immerse_seat">
          <div class="immerse_seat_item" v-for="(item,index) in select_seat"
               @click="del_seat(index,item.index,item.sindex)">
            {{item.seat_name}}
            <span class="iconfont iconshanchu"></span>
          </div>
        </div>
        <div class="buy_tips">已选{{select_seat.length}}个座位，还需选择{{select_num-select_seat.length}}个座位</div>
      </div>
      <div :class="['buy_btn',select_seat.length>0?'':'is_noseat' ]" @click="confirm_choose">
        <span v-if="select_seat.length<=0">请先选座</span>
        <span v-else>确认选座</span>
      </div>
    </div>
  </div>
</template>
<script>
  import u from '@/bin/common'
  import {Indicator, Toast, MessageBox} from 'mint-ui';

  const TIME_COUNT = 60; //更改倒计时时间
  export default {
    name: "film_seat",
    data() {
      return {
        immerse_list: [],
        tel: '',
        code: '',
        img_code: '',
        show: true, // 初始启用按钮
        count: '', // 初始化次数
        timer: null,
        form: {},
        buy_loading: false,
        buy_immerse_loading: false,
        film_date_layout_id: '',
        seat_info: {
          seat: []
        },
        select_seat: [],
        real_seat: [],
        seatStatus: true,
        device_uuid: '',
        week_list: ["日", "一", "二", "三", "四", "五", "六",],
        week: 0,
        select_num: 0,
        ticket_class_string: '',
        names: [],
        price_total: '0.00',
        iconshow: false,
        positionY: '-650px',
        positionX: '-684px',
        x: .4,
        y: .4,
        flags: false,
        position: {x: 0, y: 0},
        nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
        baseLeft: 0,
        baseTop: 0,
        bodyWidth: document.body.clientWidth,
        ele: null, // 不能在这里设置， dom还没有生
      }
    },
    created() {
      this.film_date_layout_id = this.$route.query.film_date_layout_id;
      this.select_num = this.$route.query.select_num;
      this.ticket_class_string = this.$route.query.ticket_class_string;
      this.names = JSON.parse(this.$route.query.names);
      this.price_total = this.$route.query.price_total
      this.get_SeatInfo()
    },
    methods: {
      // 获取影院信息
      get_SeatInfo() {
        Indicator.open('加载中……')
        this.$api.SeatInfo(this.film_date_layout_id).then(res => {
          // //console.log(res)
          Indicator.close();
          this.seat_info = res.data;
          let seat = this.seat_info.seat;
          let un_seat = this.seat_info.un_seat;
          this.week = new Date(res.data.movie_date).getDay();
          for (let k in un_seat) {
            un_seat[k] = un_seat[k].split('_')
          }
          // 判断预留座位和已售出
          for (let i in seat) {
            for (let j in un_seat) {
              if (i == un_seat[j][0]) {
                for (let m in seat[i]) {
                  if (m == un_seat[j][1]) {
                    seat[i][m] = 2
                  }
                }
              }
            }
          }
          // 判断实际座位
          let pai = 1;
          for (let i in this.seat_info.seat) {
            let zuo = 0;
            for (let j in this.seat_info.seat[i]) {
              if (this.seat_info.seat[i][j] == -1) {
                this.real_seat.push({
                  val: i + '_' + j,
                  seat: ''
                })
              } else {
                zuo = zuo + 1;
                this.real_seat.push({
                  val: i + '_' + j,
                  seat: pai + '排' + zuo + '座'
                })
              }
            }
            if (zuo > 0) {
              pai = pai + 1;
            }
          }
          // //console.log(this.real_seat)
          // this.rowWidth=this.seat_info.seat[0].length*34+'px'
        })
      },
      // 弹出确认超过当前张
      overConfrim() {
        MessageBox({
          title: '提示',
          message: '本次最多可选' + this.select_num + '个座位',
          showCancelButton: false
        }).then(action => {
          this.seatStatus = true
        }).catch(() => {
        });
      },
      // 选座
      handleChooseSeat(index, sindex) {
        let v = this;
        let seatValue = this.seat_info.seat[index][sindex];

        let newArray = this.seat_info.seat;
        // v.iconshow = true;
        // this.x = .9;
        // this.y = .9;
        //如果是已购座位，直接返回
        if (seatValue == 2 || seatValue == -1) return

        let obj = {
          index: index,
          sindex: sindex,
          value: seatValue,
          val: index + '_' + sindex
        }
        if (this.seatStatus) {
          // //console.log(this.select_seat.length)
          let flag = v.select_seat.some(item => {
            return item.index == index && item.sindex == sindex;
          })
          let pos = v.select_seat.findIndex(item => {
            return item.index == index && item.sindex == sindex;
          })
          // 如果是已选座位点击后变未选
          if (seatValue == 1 && flag) {
            newArray[index][sindex] = 0
            this.$set(this.seat_info.seat[index], sindex, 0)
            v.select_seat.splice(pos, 1)
          } else if (seatValue == 0 && this.select_seat.length < this.select_num && !flag) {
            newArray[index][sindex] = 1
            this.$set(this.seat_info.seat[index], sindex, 1)
            v.select_seat.push(obj)

          } else if (this.select_seat.length == this.select_num) {
            this.overConfrim()
          }
          this.seatValue = this.seat_info.seat[index][sindex];
          // console.log(this.seatValue)
          for (let i in this.real_seat) {
            for (let j in this.select_seat) {
              if (this.real_seat[i].val == this.select_seat[j].val) {
                this.select_seat[j].seat_name = this.real_seat[i].seat;
              }
            }
          }
          // console.log(this.select_seat)
          if (this.select_seat.length > this.select_num) {
            this.seatStatus = false;
          }
        } else {
          this.overConfrim()
        }
        // //console.log(this.select_seat)
      },
      // 删除座位
      del_seat(ind, index, sindex) {
        let newArray = this.seat_info.seat;
        // 如果是已选座位点击后变未选
        newArray[ind][sindex] = 0
        this.$set(this.seat_info.seat[index], sindex, 0);
        this.select_seat.splice(ind, 1)
      },
      // 确认选座
      confirm_choose() {
        if (this.select_seat.length == 0) {
          Toast('请选择座位')
        } else if (this.select_seat.length != this.select_num) {
          Toast('请再选择' + (parseInt(this.select_num) - this.select_seat.length) + '个座位')
        } else {
          let seat = '';
          let seat_names = []
          for (let i in this.select_seat) {
            seat += this.select_seat[i].val + '#';
            seat_names.push(this.select_seat[i].seat_name)
          }
          // seat_names.join('/')
          //console.log(seat_names.join('/'))
          // seat = seat.substring(0, seat.length - 1)
          let post = {
            seat: seat,
            seat_num: this.select_seat.length,
            movie_name: this.seat_info.movie_name,
            movie_start_time: this.seat_info.movie_start_time,
            movie_end_time: this.seat_info.movie_end_time,
            address: this.seat_info.address,
            seat_names: seat_names,
            movie_date: this.seat_info.movie_date,
            names: this.names,
            ticket_class_string: this.ticket_class_string,
            long_time: this.seat_info.long_time,
            price_total: this.price_total,
          }
          localStorage.setItem('film_post', JSON.stringify(post))
          this.$router.push({
            path: '/film/film_confirm',
            query: {film_date_layout_id: this.film_date_layout_id, movie_type: this.seat_info.type,cinema_id:this.cinema_id}
          })
        }
      },

    }
  }

</script>
<style scoped lang="scss">
  @import '@/style/mixin.scss';

  .seat_box {
    .seat_info {
      .tips {
        color: $baseClr;
        font-size: 14px;
        /*px*/
        background:$calendar_bgcolor;
        padding: 8px 0;
        text-align: center;
      }

      .film_head {
        padding: 17px 12px;

        .film_name {
          font-size: 18px;
          /*px*/
          color: #353535;
          font-weight: bold;
        }

        .film_item {
          padding: 6px 0 0 0;
          color: #040404;
          font-size: 14px;
          /*px*/
        }

        .film_ticket {
          display: flex;
          justify-content: space-between;

          .right {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .ticket_item {
            padding: 0 0 6px 0;

            &:last-child {
              padding: 0;
            }
          }
        }
      }

      .seat_area {
        width: 100%;
        background: rgba(238, 238, 238, 0);

        .seat_left {
          background-color: #f5f5f5;

          .seat_screen {
            font-size: 10px;
            /*px*/
            background-color: rgba(166, 166, 166, .42);
            color: rgba(112, 112, 112, .68);
            text-align: center;
            width: 137px;
            margin: 0 auto 20px auto;
            padding: 3px 0;
            position: relative;

            .seat_d {
              color: rgba(112, 112, 112, .42);
              font-size: 13px;
              /*px*/
              border: 1px solid rgba(166, 166, 166, .42);
              /*no*/
              width: 60px;
              position: absolute;
              top: 18px;
              left: 0;
              right: 0;
              margin: 0 auto;
              text-align: center;
            }
          }

          .seats {
            position: relative;
            overflow-x: scroll;
            overflow-y: scroll;
            height: 250px;

            .seats_item {
              position: relative;
              padding: 0 0 0 42px;
              transition: .3s all;
              width: 1000px;

              .row {
                margin: 0 auto 5px auto;
                display: flex;
                align-items: center;

                .icon_seat {
                  width: 30px;
                  height: 30px;
                  margin-right: 2px;
                  flex-shrink: 0;

                  .icon_item {
                    width: 100%;
                    height: 30px;
                    display: inline-block;
                  }

                  &:last-child {
                    margin: 0;
                  }
                }

                /*&:nth-child(2n) {*/
                /*margin: 0 auto 10px 11px;*/
                /*!*margin: 0 auto 10px auto;*!*/
                /*}*/
              }

              .line_num_box {
                position: absolute;
                left: 10px;
                top: 20px;
                background: #CDCDCD;
                border-radius: 16px;
                padding: 12px 0;
                width: 30px;
                overflow: hidden;
                transition: all .3s;

                span {
                  float: left;
                  display: block;
                  width: 30px;
                  font-size: 20px;
                  /*px*/
                  color: #fff;
                  text-align: center;
                  height: 30px;
                  line-height: 30px;
                  margin-bottom: 5px;

                  &:last-child {
                    margin: 0;
                  }
                }
              }

              .line_num_box_active {
                top: -5px;
                left: -2px;
              }

            }

            .seats_active {
              transform: scale(.9, .9);
              padding: 0 0 0 30px;
            }

            .selected-seat {
              background: url('../../img/film/selected.png') center center no-repeat;
              background-size: 100% 100%;
            }

            .unselected-seat {
              background: url('../../img/film/unselected.png') center center no-repeat;
              background-size: 100% 100%;
            }

            .bought-seat {
              background: url('../../img/film/bought.png') center center no-repeat;
              background-size: 100% 100%;
            }
          }

          .seat_tips {
            display: flex;
            align-items: center;
            justify-content: space-around;
            overflow: hidden;
            color: #727272;
            padding: 30px 0 12px 0;
            font-size: 14px;
            /*px*/
            .chosen {
              text-align: right;
              display: flex;
              align-items: center;
            }

            .can_item {
              width: 23px;
              height: 23px;
              margin-right: 10px;
            }

            .can_text {
              height: 25px;
              line-height: 25px;
            }

            .selected-seat {
              background: url('../../img/film/selected.png') center center no-repeat;
              background-size: 100% 100%;
            }

            .unselected-seat {
              background: url('../../img/film/unselected.png') center center no-repeat;
              background-size: 100% 100%;
            }

            .bought-seat {
              background: url('../../img/film/bought.png') center center no-repeat;
              background-size: 100% 100%;
            }
          }

          .film_title {
            font-size: 20px;
            padding: 13px 48px;
            font-weight: bold;
          }
        }

        .immerse_seat {
          margin: 12px 12px 0 12px;
          flex-wrap: wrap;
          display: flex;
          align-items: center;

          .immerse_seat_item {
            width: 83px;
            height: 30px;
            margin: 0 5px 10px 0;
            text-align: center;
            line-height: 30px;
            background: url("../../img/film/immerse_seat.png") no-repeat center;
            background-size: 100% 100%;
            position: relative;
            color: #55555A;
            font-size: 14px;
            /*px*/
            &:nth-child(3) {
              margin: 0 0 10px 0;
            }

            .iconfont {
              position: absolute;
              right: -2px;
              top: -12px;
              color: #000;
              opacity: .5;
              z-index: 1;
            }
          }
        }

        .buy_tips {
          margin-left: 15px;
          font-size: 12px;
          /*px*/
          color: #727272;
          padding: 0 0 10px 0;
        }
      }

      .buy_btn {
        border-radius: 28px;
        text-align: center;
        padding: 15px 0;
        color: #fff;
        background-color: $baseClr;
        border: 0;
        display: block;
        width: 315px;
        margin: 10px auto;
        /*position: fixed;*/
        /*left: 0;*/
        /*right: 0;*/
        /*bottom: 10px;*/
        font-size: 18px;
        /*px*/
        &:active {
          opacity: .7;
        }
      }

      .is_noseat {
        background-color: $calendar_bgcolor;
      }
    }
  }

</style>
