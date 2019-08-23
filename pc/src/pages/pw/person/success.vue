<template>
  <div class="success-con">
    <!-- 功能栏 -->
    <!-- 步骤条 -->
    <div class="header">
      <step-header :current="4" title="预约成功" tag="个人票务预约"></step-header>
    </div>
    <!-- 信息表 -->
    <div class="messages">
      <!-- logo -->
      <div class="make_logo"></div>
      <div class="make_text">
        <p class="make_success">预约成功</p>
        <!-- <p class="k1">您的订单号为GHJY1235648</p> -->
        <p class="k2">
          您提交的【
          <strong>{{year}}年{{ month }}月{{ day }}日 {{ time }}</strong>】的参观预约已经预约成功
          <br />请参观当日凭预约时填写的证件，检票进馆~
        </p>
      </div>
      <!-- 结尾付款 -->
      <div class="footer">
        <router-link class="cancle" to="/person" tag="div">查看订单</router-link>
        <router-link class="sure" to="/pw/person/index" tag="div">继续预约</router-link>
      </div>
      <div class="warm_tips">
        如果您的团体需要讲解服务，请进行
        <router-link :to="{path:'/explain',query:{'torder_id':torder_id}}" replace>讲解预约</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import StepHeader from '../common/header.vue';
export default {
  data() {
    return {
      year: '',
      month: '',
      day: '',
      time: '',
      api_token: localStorage.api_token || null,
      torder_id: '',
    };
  },
  created() {
    if (this.$route.query.date) {
      var dateList = this.$route.query.date.split('-');
      this.time = this.$route.query.time;
      this.year = dateList[0];
      this.month = dateList[1];
      this.day = dateList[2];
    }
  },
  components: {
    StepHeader,
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
/** @format */
.success-con {
  padding-bottom: 60px;
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
    // width: 121px;
    // height: 113px;
    margin: 0 auto;
    width: 300px;
    height: 200px;
    background-image: url('../../../img/tickets/11.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    // position: absolute;
    // left: 50%;
    // top: 80px;
    // transform: translate(-50%, -50%);
  }

  .make_text {
    width: 604px;
    // height: 180px;
    text-align: center;
    font-size: 16px;
    margin: 20px auto 20px;

    .make_success {
      font-size: 20px;
      color: #444;
      line-height: 40px;
      font-size: 700;
      // margin-bottom: 50px;
    }

    .k1 {
      font-size: 18px;
      color: #777;
      margin-bottom: 20px;
    }

    .k2 {
      font-size: 18px;
      color: #777;
      line-height: 40px;
    }
  }

  // 结尾付款
  .footer {
    margin: 0px auto 40px;
    width: 604px;
    overflow: hidden;
    font-size: 16px;
    font-weight: 400;
    line-height: 48px;

    .cancle {
      float: left;
      width: 220px;
      height: 48px;
      color: #c39657;
      line-height: 48px;
      text-align: center;
      border: 1px solid #c39657;
      border-radius: 24px;
      // margin-left: 380px;
      cursor: pointer;
    }

    .sure {
      float: right;
      width: 220px;
      height: 48px;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      background: #c39657;
      opacity: 0.8;
      border-radius: 24px;
      // margin-right: 248px;
      cursor: pointer;
    }
  }

  .warm_tips {
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 41px;

    a {
      color: #c39657;
    }
  }
}
</style>
