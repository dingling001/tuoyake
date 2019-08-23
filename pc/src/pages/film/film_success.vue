<template>
  <div>
    <div class="nav_hr">
      <div class="nav_text">
        <router-link tag="span" to="/">首页 »</router-link>
        影院影讯
      </div>
    </div>
    <!-- 信息表 -->
    <div class="messages">
      <!-- logo -->
      <div class="make_logo" v-if="flag&&orderInfo.status==2"></div>
      <div class="make_logo make_logos" v-if="flag&&orderInfo.status!=2"></div>
      <div class="make_text">
        <p class="make_success" v-if="orderInfo.status==2">预约成功</p>
        <p class="make_success" v-else>{{errmsg}}</p>
        <!--        <p class="k1">您的订单号为{{orderInfo.order_no}}</p>-->
        <!--        <p class="k2">请留意您预约的手机号码，我们将您的预约信息发送到您的手机号上，您可于参观当日凭预约编码在讲解台领取讲解服务祝您旅途愉快~</p>-->

        <p class="k2" v-if="orderInfo.status==2">
          您【{{orderInfo.movie_time}}】的影院预约已经提交成功，请同时实名预约国家海洋馆参观服务，当日凭预约时填写的证件进馆观影。感谢您使用国家海洋博物馆影院预约系统，祝您观影愉快。
        </p>
      </div>
      <!-- 结尾付款 -->
      <div class="footer">
        <router-link class="cancle" to="/film/film_index" replace tag="div">继续预约</router-link>
        <router-link class="sure" :to="'/film/film_order?order_id='+order_id" replace tag="div"
                     v-if="orderInfo.status==2">查看订单
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        order_sn: '',
        order_id: '',
        orderInfo: {},
        errmsg: '',
        flag:false
      };

    },
    created() {
      this.order_sn = this.$route.query.order_sn;
      this.order_id = this.$route.query.order_id;
      this.get_FilmOrderInfo()
    },
    methods: {
      // 获取订单详情
      get_FilmOrderInfo() {
        this.$api.FilmOrderInfo(localStorage.getItem('api_token'), this.order_id).then(res => {
          // console.log(res)
          this.flag=true;
          if (res.status == 1) {
            this.orderInfo = res.data;
          } else {
            this.errmsg = res.msg || '预约失败';
          }
        })
      },
    }
  };
</script>

<style lang="scss" scoped>
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

  .messages {
    width: 1200px;
    margin: 20px auto;
    box-sizing: border-box;
    overflow: hidden;
    font-family: MicrosoftYaHei;
    position: relative;
    // logo
    .make_logo {
      width: 348px;
      height: 265px;
      background-image: url("../../img/tickets/11.png");
      /*position: absolute;*/
      /*left: 50%;*/
      /*top: 80px;*/
      background-size: cover;
      margin: 0 auto;
    }

    .make_logos {
      background-image: url("../../img/tickets/16.png");
    }

    .make_text {
      width: 604px;
      /*height: 180px;*/
      text-align: center;
      font-size: 16px;
      margin: 40px auto;

      .make_success {
        font-size: 26px;
        color: #444;
        margin-bottom: 50px;
      }

      .k1 {
        font-size: 18px;
        color: #777;
        margin-bottom: 20px;
      }

      .k2 {
        font-size: 18px;
        color: #777;
        line-height: 41px;
      }
    }

    // 结尾付款
    .footer {
      margin: 0 auto 80px auto;
      overflow: hidden;
      font-size: 16px;
      font-weight: 400;
      line-height: 48px;
      width: 608px;

      .cancle {
        float: left;
        width: 220px;
        height: 48px;
        color: rgba(85, 85, 90, 1);
        line-height: 48px;
        text-align: center;
        border: 1px solid rgba(210, 210, 210, 1);
        border-radius: 24px;
        cursor: pointer;
      }

      .sure {
        float: right;
        width: 220px;
        height: 48px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        background: rgba(180, 124, 45, 1);
        opacity: 0.8;
        border-radius: 24px;
        cursor: pointer;
      }
    }
  }
</style>

