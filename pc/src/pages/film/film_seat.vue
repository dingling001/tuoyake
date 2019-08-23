<template>
  <div class="seat_box">
    <div class="nav_hr">
      <div class="nav_text">
        <router-link tag="span" to="/">首页 »</router-link>
        影院影讯
      </div>
    </div>
    <div class="date_step">
      <div class="date_title">
        <div class="date_left">选择座位
          <span class="line"></span>
          <span class="dot"></span>
        </div>
        <el-steps :active="3" align-center class="date_right">
          <el-step title="选择影片场次">
            <i class="s s1" slot="icon"></i>
          </el-step>
          <el-step title="选择影片类型及数量">
            <i class="s s2" slot="icon"></i>
          </el-step>
          <el-step title="选择座位">
            <i class="s s3" slot="icon"></i>
          </el-step>
          <el-step title="确认订单信息">
            <i class="s s4" slot="icon"></i>
          </el-step>
          <el-step title="支付">
            <i class="s s5" slot="icon"></i>
          </el-step>
        </el-steps>
      </div>
    </div>
    <div class="seat_info">
      <div class="film_head">
        <div class="tips" v-if="seat_info.type==3"><span></span>温馨提示：该场次为沉浸式体验影片。</div>
        <div class="tips" v-else><span></span>温馨提示：该场次为非沉浸式体验影片，请选座观影。</div>
        <div class="film_name">{{seat_info.movie_name}}</div>
        <div class="film_item">影片时长：{{seat_info.long_time}}分钟</div>
        <div class="film_item">放映地址：{{seat_info.address}}</div>
        <div class="film_item">日期及场次：{{seat_info.movie_date}} 周{{week_list[week]}}
          {{seat_info.movie_start_time}}
        </div>
        <div class="film_ticket">
          <div class="film_item left">影片类型：</div>
          <div class="film_item right">
            <div class="ticket_item" v-for="item in names" v-if="item">{{item}}</div>
          </div>
        </div>
      </div>
      <div class="seat_area">
        <div class="seat_left">
          <div class="seat_screen">屏幕</div>
          <div class="immerse_box">
            <div class="immerse_item">
              <div :class="['immerse_area',seat_info.type==3?'is_immerse_area':'']">沉浸式体验区</div>
            </div>
          </div>
          <div class="seats">
            <div class="line_num_box"><span v-for="(item ,index ) in seat_info.seat">{{index+1}}</span>
            </div>
            <div class="seat_tips">
              <div class="can_choose">
                <span class="can_item unselected-seat"></span>
                <span class="can_text">可选座位</span>
              </div>
              <div class="no_choose">
                <span class="can_item bought-seat"></span>
                <span class="can_text">不可选座位</span>
              </div>
              <div class="chosen">
                <span class="can_item selected-seat"></span>
                <span class="can_text">已选座位</span>
              </div>
            </div>
            <div class="seats_item">
              <div class="row" v-for="(item ,index) in seat_info.seat" :style="{width: rowWidth}">
                <div class="icon_seat" v-for="(i,sindex) in item"
                     @click="handleChooseSeat(index,sindex)">
                                    <span class="icon_item" v-if="i!=-1"
                                          :class="i==2?'bought-seat':(i==1?'selected-seat':'unselected-seat')"></span>
                  <!--<span v-else-if="i==1" class="icon_item selected-seat"></span>-->
                  <!--<span v-else-if="i==0" class="icon_item unselected-seat"></span>-->
                  <!--<span v-else-if="i==2" class="icon_item bought-seat"></span>-->
                </div>
              </div>
            </div>
          </div>
          <div class="film_title">座位</div>
          <div class="immerse_seat">
            <div class="immerse_seat_item" v-for="(item,index) in select_seat"
                 @click="del_seat(index,item.index,item.sindex)">{{item.seat_name}}
              <span class="iconfont iconshanchu"></span>
            </div>
          </div>
          <div class="buy_tips">已选{{select_seat.length}}个座位，还需选择{{select_num-select_seat.length}}个座位</div>
        </div>
      </div>
      <el-button type="text" class="buy_btn" plain :loading="buy_loading" @click="confirm_choose">
        确认选座
      </el-button>
    </div>
  </div>
</template>
<script>
  import u from '@/bin/common'
  import crypto from "crypto";

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
        rowWidth: 'auto',
        select_seat: [],
        real_seat: [],
        seatStatus: true,
        device_uuid: '',
        week_list: ["日", "一", "二", "三", "四", "五", "六",],
        week: 0,
        select_num: 0,
        ticket_class_string: '',
        phone: "",
        names: [],
        price_total: '0.00'
      }
    },
    created() {
      this.film_date_layout_id = this.$route.query.film_date_layout_id;
      this.select_num = this.$route.query.select_num;
      this.ticket_class_string = this.$route.query.ticket_class_string;
      this.names = JSON.parse(this.$route.query.names);
      this.phone = this.$route.query.phone;
      this.price_total = this.$route.query.price_total
      this.get_SeatInfo()
    },
    methods: {
      // 获取影院信息
      get_SeatInfo() {
        this.$api.SeatInfo(this.film_date_layout_id).then(res => {
          // //console.log(res)
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
        this.$confirm('本次最多可选' + this.select_num + '个座位', '', {
          confirmButtonText: '知道了',
          // cancelButtonText: '取消',
          showCancelButton: false,
          type: 'warning',
          center: true,
          closeOnPressEscape: false,
          closeOnClickModal: false,
          closeOnHashChange: false,
        }).then(() => {
          this.seatStatus = true
        }).catch(() => {
        });
      },
      // 选座
      handleChooseSeat(index, sindex) {
        let v = this;
        let seatValue = this.seat_info.seat[index][sindex];
        let newArray = this.seat_info.seat;
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
          for (let i in this.real_seat) {
            for (let j in this.select_seat) {
              if (this.real_seat[i].val == this.select_seat[j].val) {
                this.select_seat[j].seat_name = this.real_seat[i].seat;
              }
            }
          }
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
          this.$message({
            message: '请选择座位',
            type: 'error'
          });
        } else if (this.select_seat.length != this.select_num) {
          this.$message({
            message: '请再选择' + (parseInt(this.select_num) - this.select_seat.length) + '个座位',
            type: 'error'
          });
        } else if (localStorage.getItem('api_token')) {
          let seat = [];
          let seat_names = []
          for (let i in this.select_seat) {
            seat.push(this.select_seat[i].val);
            seat_names.push(this.select_seat[i].seat_name)
          }
          seat = seat.join('#');
          console.log(seat);
          console.log( this.ticket_class_string)
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
            phone: this.phone,
            long_time: this.seat_info.long_time,
            price_total: this.price_total,
            type: this.seat_info.type
          }
          localStorage.setItem('film_post', JSON.stringify(post))
          this.$router.push({
            path: '/film/film_confirm',
            query: {film_date_layout_id: this.film_date_layout_id}
          })
        }
      }
    }
  }

</script>
<style scoped lang="scss">
  /*/deep/ .el-message-box__btns {*/
  /*.el-button--primary {*/
  /*background-color: #CC974C;*/
  /*border-color: #CC974C;*/
  /*}*/
  /*}*/
  .seat_box {
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

    .date_step {
      width: 1200px;
      margin: 20px auto 0 auto;
      padding: 30px 0;
      border-bottom: 5px solid rgba(180, 124, 45, .3);

      .date_title {
        overflow: hidden;

        .date_left {
          float: left;
          font-size: 24px;
          color: #000;
          padding: 0 0 27px 0;
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

          .dot {
            display: block;
            width: 7px;
            height: 5px;
            border-radius: 3px;
            background-color: #000;
            left: 70px;
            bottom: 0;
            z-index: 1;
            position: absolute;
          }
        }

        .date_right {
          float: right;
          width: 70%;
          color: #000;
          margin-right: -60px;

          /deep/ .el-step__title {
            font-size: 16px;
            color: #000;
          }

          /deep/ .el-step__title.is-finish {
            color: #B47C2D;
          }

          /deep/ .el-step__title.is-process {
            font-weight: normal;
          }

          /deep/ .is-finish .s1 {
            background-image: url("../../img/ticket/01.png");
          }

          /deep/ .is-finish .s2 {
            background-image: url("../../img/ticket/02.png");
          }

          /deep/ .is-finish .s3 {
            background-image: url("../../img/ticket/03.png");
          }

          /deep/ .is-finish .s4 {
            background-image: url("../../img/ticket/04.png");
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
            border-color: #A0A0A0;
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
            background-image: url("../../img/ticket/1.png");
          }

          .s2 {
            background-image: url("../../img/ticket/2.png");
          }

          .s3 {
            background-image: url("../../img/ticket/3.png");
          }

          .s4 {
            background-image: url("../../img/ticket/4.png");
          }

          .s5 {
            background-image: url("../../img/tickets/5.png");
          }
        }
      }
    }

    .seat_info {
      width: 1200px;
      margin: 0 auto;

      .film_head {
        background: rgba(180, 124, 45, .1);
        padding: 18px 0 30px 35px;

        .tips {
          color: #F40A0A;
          font-size: 18px;
          padding: 0 0 14px 0;

          span {
            height: 7px;
            width: 7px;
            display: inline-block;
            border-radius: 7px;
            margin-right: 10px;
            background-color: #F40A0A;

          }
        }

        .film_name {
          font-size: 24px;
          font-weight: bold;
        }

        .film_item {
          padding: 17px 0 0 0;
          color: #040404;
          font-size: 18px;
        }

        .film_ticket {
          overflow: hidden;

          .left {
            float: left;
          }

          .right {
            float: left;
          }

          .ticket_item {
            padding: 0 0 15px 0;

            &:last-child {
              padding: 0;
            }
          }
        }
      }

      .tips {
        padding: 30px 0;
        font-size: 16px;

        .iconbitianxinghao {
          color: #D81E06;
        }
      }

      .seat_area {
        width: 100%;
        border: 1px solid #B5B5B5;
        overflow: hidden;
        margin: 0 0 80px 0;
        background: rgba(238, 238, 238, 0);
        padding: 0 0 30px 0;

        .seat_left {
          /*float: left;*/
          /*width: 820px;*/

          .seat_screen {
            font-size: 20px;
            color: #000;
            text-align: center;
            padding: 15px 0;
          }

          .immerse_box {
            /*width: 800px;*/
            /*height: 205px;*/
            height: 103px;
            border: #B47C2D 1px solid;
            border-bottom: 0;
            margin: 0 15px;
            position: relative;
            box-shadow: inset #b47c2d 0 0 3px;

            .immerse_item {
              position: absolute;
              left: 5px;
              margin: 0 auto;
              top: 5px;
              border: rgba(180, 124, 45, .5) 2px solid;
              border-bottom: 0;
              width: 99%;
              right: 5px;
              height: 97px;
              background-color: #fff;
              padding: 12px;
              cursor: pointer;

              .immerse_area {
                background: rgba(218, 218, 218, 0.32);
                line-height: 82px;
                text-align: center;
                font-size: 24px;
                letter-spacing: 2px;
                cursor: not-allowed;
              }

              .is_immerse_area {
                background: rgba(180, 124, 45, 0.32);
              }
            }

          }

          .seats {
            position: relative;
            /*background: rgba(218, 218, 218, 0.32);*/
            /*width: 800px;*/
            /*height: 503px;*/
            padding-bottom: 50px;
            margin: 20px;

            .line_num_box {
              position: absolute;
              left: 10px;
              top: 11px;
              background: rgba(180, 124, 45, .1);
              border-radius: 16px;
              padding: 25px 0;
              width: 32px;
              overflow: hidden;

              span {
                float: left;
                display: block;
                width: 32px;
                font-size: 15px;
                color: rgba(0, 0, 0, .5);
                text-align: center;
                height: 30px;
                line-height: 30px;
                margin-bottom: 10px;

                &:last-child {
                  margin: 0;
                }
              }
            }

            .seat_tips {
              position: absolute;
              bottom: 0;
              width: 420px;
              left: 0;
              right: 0;
              margin: 0 auto;
              overflow: hidden;
              color: #55555A;
              font-size: 15px;

              .can_choose {
                float: left;
                width: 140px;
              }

              .no_choose {
                width: 140px;
                float: left;
                text-align: center;
              }

              .chosen {
                width: 140px;
                float: left;
                text-align: right;
              }

              .can_item {
                width: 32px;
                height: 30px;
                margin-right: 10px;
                display: inline-block;
                float: left;
              }

              .can_text {
                height: 25px;
                line-height: 25px;
                display: inline-block;
                float: left;
              }
            }

            .seats_item {
              padding: 35px 0 0 55px;

              .row {
                overflow: hidden;
                margin: 0 auto 10px auto;

                .icon_seat {
                  width: 32px;
                  height: 30px;
                  float: left;
                  margin-right: 5px;

                  /*cursor: pointer;*/
                  .icon_item {
                    width: 100%;
                    height: 31px;
                    display: inline-block;
                  }

                  &:last-child {
                    margin: 0;
                  }
                }

                &:nth-child(2n) {
                  margin: 0 auto 10px 11px;
                }
              }
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

          .immerse_seat {
            overflow: hidden;
            /*padding: 5px 0;*/
            margin-left: 48px;

            .immerse_seat_item {
              float: left;
              width: 102px;
              height: 40px;
              margin: 0 20px 10px 0;
              text-align: center;
              line-height: 40px;
              background: url("../../img/film/immerse_seat.png") no-repeat center;
              background-size: cover;
              position: relative;
              color: #55555A;
              font-size: 16px;

              &:hover .iconfont {
                display: block;
              }

              .iconfont {
                position: absolute;
                right: -5px;
                top: -11px;
                z-index: 2;
                color: #a0a1a7;
                cursor: pointer;
                display: none;
              }
            }

            .immerse_seat_item_btn {
              border: 1px solid #B47C2F;
              color: #C39657;
              width: 102px;
              float: left;
              margin: 0 2px 10px 0;
              text-align: center;
              padding: 8px 0;
              border-radius: 20px;
              cursor: pointer;

              &:hover {
                color: #fff;
                background-color: #B47C2F;
              }
            }
          }

          .buy_tips {
            margin-left: 48px;
            font-size: 16px;
            color: #55555A;
            padding: 10px 0;
          }

        }

        /*
        .seat_right {
            float: right;
            width: 378px;
            background-color: #F9F9F9;
            padding: 42px 30px;

            .film_info {
                overflow: hidden;

                .film_img {
                    float: left;
                    width: 112px;
                    height: 156px;
                    line-height: 156px;

                    img {
                        width: 100%;
                        vertical-align: middle;
                    }
                }

                .film_item {
                    float: right;
                    width: 205px;
                    padding: 0 0 0 18px;

                    .film_name {
                        font-size: 20px;
                        font-weight: bold;
                        padding: 5px 0 10px 0;
                    }

                    .film_time {
                        font-size: 18px;
                        line-height: 28px;

                        .iconfont {
                            margin-right: 5px;
                            font-size: 18px;
                            color: #CC974C;
                        }
                    }
                }
            }
            .immerse_seat {
                overflow: hidden;
                padding: 5px 0;

                .immerse_seat_item {
                    float: left;
                    width: 102px;
                    margin: 0 5px 10px 0;
                    text-align: center;
                    padding: 10px 0;
                    background: url("../../img/film/immerse_seat.png") no-repeat center;
                    background-size: cover;
                    position: relative;
                    color: #55555A;
                    font-size: 16px;

                    &:nth-child(3n) {
                        margin: 0 0 10px 0;
                    }

                    .iconfont {
                        position: absolute;
                        right: -2px;
                        top: -3px;
                        z-index: 2;
                        color: #a0a1a7;
                        cursor: pointer;
                    }
                }

                .immerse_seat_item_btn {
                    border: 1px solid #B47C2F;
                    color: #C39657;
                    width: 102px;
                    float: left;
                    margin: 0 2px 10px 0;
                    text-align: center;
                    padding: 8px 0;
                    border-radius: 20px;
                    cursor: pointer;

                    &:hover {
                        color: #fff;
                        background-color: #B47C2F;
                    }
                }
            }

            .buy_total {
                font-size: 16px;
                color: #55555A;
                padding: 15px 0;
                border-bottom: 1px solid #AAAAAA;

                .price_box {
                    color: #FE5A00;
                    font-weight: bold;
                }

                .price_total {
                    color: #FE5A00;
                    font-size: 26px;
                    font-weight: bold;
                }
            }

            .is_login_box {
                height: 218px;
                .is_login {
                    margin: 12px 0;
                    .code_img {
                        margin: 2px 0;
                        cursor: pointer;
                        img {
                            height: 36px;
                            width: 100%;
                        }
                    }
                    /deep/ .el-input {
                        margin-bottom: 12px;

                        .el-input__inner {
                            border-radius: 24px;
                            font-size: 16px;
                            border-color: #B5B5B5;

                            &::placeholder {
                                color: #55555A;
                            }
                        }
                    }

                    /deep/ .el-input__suffix {
                        right: 20px;

                        .el-button--text {
                            color: #B5B5B5;
                        }
                    }
                }
            }


            }
        }
        */
      }

      .buy_btn {
        border-radius: 28px;
        text-align: center;
        padding: 15px 0;
        color: #fff;
        background-color: #B47C2D;
        cursor: pointer;
        border: 0;
        display: block;
        width: 315px;
        margin: 50px auto;

        &:active {
          opacity: .7;
        }
      }
    }
  }

</style>
