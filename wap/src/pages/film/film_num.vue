<template>
  <div class="num_box">
    <div class="top">
      <div class="num_name">{{seatinfo.movie_name}}</div>
      <div class="num_date">{{seatinfo.movie_date}} 周{{week_list[week]}} {{seatinfo.movie_start_time}}</div>
    </div>
    <div class="line"></div>
    <div class="num_item">
      <!--      <div class="num_top"><span>门票种类</span><span>价格</span><span>数量</span></div>-->
      <div class="table_ticket">
        <div class="table_item" v-for="(item, index) in ticket_list">
          <div class="table_label">
            <div>{{item.class_name}}</div>
            <div class="table_des" v-if="item.des">({{item.des}})</div>
          </div>
          <div class="table_mid">¥{{item.price}}/ <span v-if="item.total_num==1">人</span><span
            v-else>套</span></div>
          <div class="input">
            <!--<el-input-number v-model='item.value' @change="handleChange(index,$event)" :min="1"-->
            <!--:max="10"-->
            <!--label="描述文字"></el-input-number>-->
            <span :class="['icon jian', item.value==0?'is_disable':'']"
                  @click="jian_fn(index,item.value,item.min)">
              <span class="iconfont iconjian1"></span>
            </span>
            <input type="number" v-model="item.value" placeholder="" maxLength="1"
                   @input="changeValue(index,item.value,item.min,item.max)">
            <span :class="['icon plus', item.value==item.max?'is_disable':'']"
                  @click="plus_fn(index,item.value,item.min,item.max)">
              <span class="iconfont iconaddTodo-nav"></span>
            </span>
          </div>
        </div>
      </div>
      <div class="ticket_tips" v-if="seatinfo.type==3">
        已添加{{select_num}}个体验位，还可添加{{5-select_num<0?0:5-select_num}}个体验位
      </div>
      <div class="ticket_tips" v-else>已添加{{select_num}}个座位，还可添加{{5-select_num<0?0:5-select_num}}个座位
      </div>
      <!--<div class="ticket_total">总计：<span class="price">￥</span><span class="price_num">{{parseFloat(price_total).toFixed(2)}}</span>-->
      <!--</div>-->
    </div>
    <div class="ticket_btn" v-if="seatinfo.type==3" @click="no_seat">{{parseFloat(price_total).toFixed(2)}}确认</div>
    <div class="ticket_btn" v-else @click="seat_fn">￥{{parseFloat(price_total).toFixed(2)}} 确认</div>
  </div>
</template>

<script>
  import {Indicator, Toast, MessageBox} from 'mint-ui';

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
        cinema_id: '',
        isocdein:''
      }
    },
    created() {
      this.film_date_layout_id = this.$route.query.film_date_layout_id;
      this.cinema_id = this.$route.query.cinema_id;
      this.isocdein=this.$route.query.isocdein;
      this.get_SeatInfo()
    },
    methods: {
      // 获取影院信息
      get_SeatInfo() {
        Indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle"
        });
        this.$api.SeatInfo(this.film_date_layout_id,).then(res => {
          Indicator.close();
          if (res.status != 1) {
            Toast(res.msg);
            return
          }
          this.ticket_list = res.data.ticket_list;
          this.seatinfo = res.data;
          this.week = new Date(res.data.movie_date).getDay();
          for (let i in  this.ticket_list) {
            this.ticket_list[i].value = 0;
            this.ticket_list[i].min = 0;
            this.ticket_list[i].max = Math.floor(res.data.allow_order_num / this.ticket_list[i].total_num)
          }
          // //console.log(this.ticket_list)
        })
      },
      // 减法
      jian_fn(index, value, min) {
        value = Number(value);
        min = Number(min)
        if (!value) return;
        if (value > min) {
          this.$delete(this.ticket_list[index], 'value');
          this.$set(this.ticket_list[index], 'value', value - 1);
        }
        this.totalPrice();
      },
      // 加法
      plus_fn(index, value = 0, min, max) {
        value = Number(value);
        max = Number(max)
        console.log(parseInt(this.select_num))
        console.log(parseInt(this.seatinfo.allow_order_num))
        if (parseInt(this.select_num) > parseInt(this.seatinfo.allow_order_num)) {
          this.$delete(this.ticket_list[index], 'value');
          this.$set(this.ticket_list[index], 'value', 0);
          Toast('超出当日最大购票量，请重新选择')
        } else if ( parseInt(this.select_num) < parseInt(this.seatinfo.allow_order_num)) {
          if (value < max) {
            this.$delete(this.ticket_list[index], 'value');
            this.$set(this.ticket_list[index], 'value', value + 1);
          } else {
          }
        } else {
          Toast('当前最多选择' + this.seatinfo.allow_order_num + '个座位')
        }
        this.totalPrice();
        if (this.select_num > this.seatinfo.allow_order_num) {
          this.$delete(this.ticket_list[index], 'value');
          this.$set(this.ticket_list[index], 'value', 0);
          Toast('超出最大购票量，请重新选择');
          this.totalPrice()
        }
        // //console.log(this.ticket_list)
      },
      // 监听输入框值变化
      changeValue(index, value, min, max) {
        value = Number(value);
        max = Number(max);
        min = Number(min);
        var len = this.ticket_list[index].value.length;
        if (this.ticket_list[index].value == '' || this.ticket_list[index].value <= 0) {
          this.ticket_list[index].value = 0
        }
        if (this.ticket_list[index].value >= max) {
          this.$delete(this.ticket_list[index], 'value');
          this.$set(this.ticket_list[index], 'value', max);
        }
        this.totalPrice();
        //console.log(this.select_num)
        if (this.select_num > this.seatinfo.allow_order_num) {
          this.$delete(this.ticket_list[index], 'value');
          this.$set(this.ticket_list[index], 'value', 0);
          Toast('超出最大购票量，请重新选择')
          this.totalPrice()
        }
      },
      // 计算总价格
      totalPrice() {
        this.select_num = 0;
        this.price_total = 0;
        for (var i in this.ticket_list) {
          this.price_total += parseFloat(this.ticket_list[i].price) * this.ticket_list[i].value;
          this.select_num += this.ticket_list[i].value * parseInt(this.ticket_list[i].total_num);
        }
        console.log(this.select_num)
      },
      // 沉浸式
      no_seat() {
        if (this.select_num <= 0) {
          Toast('请选择影片类型及数量')
        } else {
          var ticket_class_string = [];
          var value_names = [];
          for (var i in this.ticket_list) {
            if (this.ticket_list[i].value > 0) {
              ticket_class_string.push(this.ticket_list[i].movie_ticket_class_id + '_' + this.ticket_list[i].value)
              value_names.push(this.ticket_list[i].class_name + ' x' + this.ticket_list[i].value)
            }
          }
          let film_post = {
            seat_num: this.select_num,
            movie_name: this.seatinfo.movie_name,
            movie_start_time: this.seatinfo.movie_start_time,
            movie_end_time: this.seatinfo.movie_end_time,
            movie_date: this.seatinfo.movie_date,
            names: JSON.stringify(value_names),
            price_total: parseFloat(this.price_total).toFixed(2),
            seat: this.select_num,
            ticket_class_string: ticket_class_string.join('#'),
          };
          this.$router.push({
            path: '/film/film_confirm',
            query: {
              select_num: this.select_num,
              movie_type: this.seatinfo.type,
              film_date_layout_id: this.film_date_layout_id,
              film_post: JSON.stringify(film_post),
              ticket_class_string: ticket_class_string.join('#'),
              names: JSON.stringify(value_names),
              cinema_id: this.cinema_id
            }
          })
        }
      },
      // 非沉浸式
      seat_fn() {
        if (this.select_num <= 0) {
          Toast('请选择影片类型及数量')
        } else {
          var ticket_class_string = [];
          var value_names = [];
          for (var i in this.ticket_list) {
            if (this.ticket_list[i].value > 0) {
              ticket_class_string.push(this.ticket_list[i].movie_ticket_class_id + '_' + this.ticket_list[i].value)
              value_names.push(this.ticket_list[i].class_name + ' x' + this.ticket_list[i].value)
            }
          }
          this.$router.push({
            path: '/film/film_seat',
            query: {
              select_num: this.select_num,
              film_date_layout_id: this.film_date_layout_id,
              ticket_class_string: ticket_class_string.join('#'),
              names: JSON.stringify(value_names),
              price_total: parseFloat(this.price_total).toFixed(2),
              type: this.seatinfo.type,
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
        border-bottom: 1px solid rgba(0, 0, 0, .2);

        span {
          flex: 1;
          text-align: center;
          font-size: 15px;
          /*px*/

        }
      }

      .table_ticket {
        /*border-top: 2px solid rgba(0, 0, 0, .2);*/
        min-height: 300px;

        .table_item {
          border-bottom: 1px solid rgba(0, 0, 0, .1);
          padding: 20px 0 15px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;


          .table_label {
            flex: 2;
            display: inline-block;
            color: #353535;
            font-size: 17px;
            font-weight: bold;
            /*px*/
            .table_des {
              font-size: 10px;
              /*px*/
              color: #727272;
              padding: 10px 0;
            }
          }

          .table_mid {
            flex: 1;
            color: $baseClr;
            font-size: 15px;
            /*  px*/
            text-align: center;
          }

          .input {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex: 1;

            input {
              background-color: #E9E9E9;
              border: 0;
              outline: none;
              width: 34px;
              padding: 3px 0;
              text-align: center;
              border-radius: 0;
              color: #353535;
              /*font-family: '黑体';*/
              font-size: 15px;
              /*  px*/
            }

            .icon {
              width: 37px;
              height: 22px;
              display: inline-block;
              border-radius: 2px;
              text-align: center;
              line-height: 22px;
              cursor: pointer;
              user-select: none;

              .iconfont {
                font-size: 15px;
                /*px*/
                font-weight: bold;
                color: #353535;
              }
            }

            .is_disable {
              .iconfont {
                color: rgba(53, 53, 53, .5);
              }
            }
          }
        }
      }

      .ticket_tips {
        /*border-top: 1px solid rgba(0, 0, 0, .2);*/
        /*no*/
        font-size: 12px;
        /*px*/
        padding: 15px 0;
        color: #727272;
      }
    }


    .ticket_btn {
      /*position: fixed;*/
      /*bottom: 10px;*/
      margin: 12px;
      background-color: #CC974C;
      border-radius: 24px;
      /*no*/
      text-align: center;
      padding: 15px 0;
      color: #fff;
      font-size: 18px;
      /*px*/
    }
  }
</style>
