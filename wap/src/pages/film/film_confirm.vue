<template>
  <div class="film_confirm_box">
    <div class="film_info">
      <div class="film_head">
        <div class="film_name">{{film_post.movie_name}}</div>
        <div class="film_item">{{film_post.movie_date}} 周{{week_list[week]}}
          {{film_post.movie_start_time}}
        </div>
        <div class="film_ticket">
          <div class="film_item">影片类型：</div>
          <div class="right">
            <div class="film_item ">
              <div class="ticket_item" v-for="item in film_post.names" v-if="item">{{item}}</div>
            </div>
            <div>
              共计{{film_post.seat_num}}张
            </div>
          </div>
        </div>

        <div class="film_item fs" v-if="movie_type==3"><span>体验位：</span>
          <div>
            体验位 x {{film_post.seat_num}}
          </div>
        </div>
        <div class="film_item fs" v-else><span>座位号：</span>
          <div>
            <span v-for="item in film_post.seat_names">{{item}}</span>
          </div>
        </div>
        <!--<div class="film_item">影片时长：{{film_post.long_time}}分钟</div>-->
        <!--<div class="film_item">放映地址：{{film_post.address}}</div>-->

      </div>
    </div>
    <div class="login_box">
      <div class="phone_box"><span class="iconfont iconbitianxinghao"></span>联系人手机：
        <input type="number" v-model="phone" :placeholder="placeholder">
      </div>
    </div>
    <div class="confirm_info">
      <div class="confirm_total">合计：<span class="yuan">￥</span><span
        class="price">{{film_post.price_total }}</span>
      </div>
    </div>
    <div class="confirm_order" @click="confirm_fn">确认订单</div>
  </div>
</template>

<script>
  import u from '@/bin/common';
  import {Toast, MessageBox, Indicator} from 'mint-ui';
  import {Session} from '@/assets/js/utils.js';

  export default {
    name: "film_confirm",
    data() {
      return {
        film_date_layout_id: '',
        film_post: {},
        week_list: ["日", "一", "二", "三", "四", "五", "六",],
        week: 0,
        phone: '',
        movie_type: '',
        placeholder: '',
        oldtime: '',
        orderStatusTimer: null,
        cinema_id:''
      }
    },
    created() {
      this.film_date_layout_id = this.$route.query.film_date_layout_id;
      this.movie_type = this.$route.query.movie_type;
      this.cinema_id=this.$route.query.cinema_id;
      // //console.log(this.$route.query.movie_type)
      // //console.log(this.$route.query.film_date_layout_id)
      if (localStorage.getItem('film_post') && this.movie_type == 1 || this.movie_type == 2) {
        this.film_post = JSON.parse(localStorage.getItem('film_post'));
        //console.log(this.film_post)
        this.week = new Date(this.film_post.movie_date).getDay();
        for (let i in this.film_post.seat_names) {
          if (i != this.film_post.seat_names.length - 1) {
            this.film_post.seat_names[i] = this.film_post.seat_names[i] + '、  '
          }
        }
      } else if (this.movie_type == 3&&this.cinema_id==1) {
        this.film_post = JSON.parse(this.$route.query.film_post);
        this.film_post.names = JSON.parse(this.film_post.names)
      }else if(localStorage.getItem('qfilm_post')&&this.cinema_id==2&&this.movie_type == 3){
        this.film_post = JSON.parse(localStorage.getItem('qfilm_post'));
        this.film_post.names = JSON.parse(this.film_post.names)
        this.week = new Date(this.film_post.movie_date).getDay();
        this.film_post.seat_names=['体验位 x 1']
      }
      this.getu()
      if (Session.get('film_order_id_value')) {
        Session.remove('film_order_id_value');
        this.showConfirmLayer();
      }
    },
    methods: {
      preventclick(msc) {
        let oldtime = this.oldtime;
        if (oldtime == '') {
          oldtime = new Date().getTime();
          return true;
        } else {
          var newtime = new Date().getTime();
          if (newtime - oldtime > msc) {
            oldtime = new Date().getTime();
            return true;
          } else {
            return false;
          }
        }
      },
      // 创建订单
      confirm_fn() {
        console.log(this.preventclick(3000))
        if (!u.checkPhone(this.phone) && !this.placeholder) {
          Toast('手机号不正确')
        } else {
          Indicator.open({
            text: '订单创建中...',
            spinnerType: 'snake'
          });
          this.$api.CreateFilmOrder(
            this.film_date_layout_id,
            this.film_post.ticket_class_string,
            this.film_post.seat,
            this.film_post.seat_num,
            this.phone).then(res => {
            console.log(res)
            Indicator.close();
            if (res.status == 1) {
              Session.set('order_id', res.data.order_id);
              if (this.film_post.price_total == 0) {
                this.$router.replace({
                  path: '/film/film_success',
                  query: {
                    order_id: res.data.order_id,
                    date: this.film_post.movie_date,
                    time: this.film_post.movie_start_time
                  }
                })
              } else {
                this.$router.replace({
                  path: '/film/film_pay',
                  query: {
                    order_id: res.data.order_id,
                  }
                })
              }
            } else if (res.msg == '座位已被购买，请重新选择') {
              Toast(res.msg);
              Session.remove('order_id');
              setTimeout(() => {
                this.$router.back(-1)
              }, 1500)
            } else if (res.msg == '存在未支付的订单，请完成支付后再进行购买') {
              Toast(res.msg);
              Session.remove('order_id');
              setTimeout(() => {
                this.$router.replace({path: '/film/umovie', query: {}})
              }, 1500)
            } else {
              Toast(res.msg);
              Session.remove('order_id');
              setTimeout(() => {
                this.$router.replace({path: '/film/film_index', query: {}})
              }, 1500)
            }
          })
        }
      },
      // 获取个人信息
      getu() {
        this.$api.getUser().then(res => {
          //console.log(res)
          this.placeholder = res.data.phone
        })
      },
      // 弹层
      showToast(msg) {
        Toast({
          message: msg,
          position: 'center',
          duration: 2000
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  .film_confirm_box {
    height: 91vh;
    overflow: hidden;
    background-color: #F2F2F2;
    .film_info {
      margin: 0 auto;

      .film_head {
        background-color: #fff;
        padding: 17px 0 17px 12px;

        .film_name {
          font-size: 22px;
          /*px*/
          color: #353535;
          font-weight: bold;
        }

        .film_item {
          padding: 10px 0 ;
          color: #353535;
          font-size: 14px;
          /*px*/
        }

        .fs {
          display: flex;

          div {
            flex: 1;
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            span {
              /*&:nth-child(5) {*/
              /*margin: 5px 0 0 0;*/
              /*}*/
            }
          }
        }

        .film_ticket {
          display: flex;
          justify-content: space-between;
          padding: 0 20px 0 0;

          .right {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            /*px*/
          }

          .ticket_item {
            padding: 0 0 6px 0;

            &:last-child {
              padding: 0;
            }
          }
        }
      }
    }

    .login_box {
      background-color: #fff;
      margin: 10px 0 0 0;
      padding: 0 13px;

      .phone_box {
        display: flex;
        align-items: center;
        font-size: 14px;
        /*px*/
        color: #353535;

        .iconbitianxinghao {
          color: #E8593E;
          font-size: 8px;
          /*px*/
        }

        input {
          border: 0;
          padding: 20px 0;
          flex: 1;
          outline: none;

          &:active {
            border: 0;
          }
        }
      }
    }

    .confirm_info {
      margin: 18px 20px 85px 0;

      .confirm_total {
        text-align: right;
        color: #EA6B55;
        font-size: 14px;
        /*px*/
        .yuan {
          color: #FF3600;
          font-size: 14px;
          /*px*/
        }

        .price {
          font-size: 24px;
          /*px*/
          color: #FF3600;
          font-weight: bold;
        }
      }

      .confirm_notice {
        margin-bottom: 25px;

        &:last-child {
          margin-bottom: 58px;
        }

        .notice_title {
          font-size: 16px;
          margin-bottom: 15px;
        }

        p {
          font-size: 14px;
          padding: 0 0 0 15px;
          line-height: 26px;
        }
      }
    }

    .confirm_order {
      width: 347px;
      /*position: absolute;*/
      /*bottom: 10px;*/
      /*left: 0;*/
      /*right: 0;*/
      margin: 30vh auto 25px auto;
      color: #fff;
      border-radius: 24px;
      text-align: center;
      padding: 15px 0;
      font-size: 16px;
      background-color: #CC974C;
      box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.11);
      cursor: pointer;

      &:active {
        opacity: .7;
      }
    }
  }
</style>
