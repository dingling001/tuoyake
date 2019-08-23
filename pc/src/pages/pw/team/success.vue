<template>
  <div class="container">
    <!-- 步进条 -->
    <ProgressBar progressTitle="审核订单" :progressActiveNum="4"></ProgressBar>
    <div class="messages">
      <!-- logo -->
      <div class="make_logo"></div>
      <div class="make_text">
        <p class="make_success">提交成功，预约审核中</p>
        <p class="k1">您【{{detail.t_date}}&nbsp;&nbsp;{{detail.time_period}}】的参观预约订单已经成功提交审核，</p>
        <p class="k2" v-if="free">请留意短信通知或在团体预约记录中查看审核进度，审核通过后视为预约成功。</p>
        <p class="k2" v-if="!free">请留意短信通知或在团体预约记录中查看审核进度，审核通过并支付成功后视为预约成功。</p>
        <p class="k2">我们会在1-2天内完成审核，如需加急审核请电话联系我们 ，电话：022-67185137</p>
        <div class="tips" v-if="torder_id">如果您的团体需要讲解服务，请在订单审核通过后进行讲解预约。</div>
      </div>
      <div class="footer">
        <router-link class="cancle" to="/pw/team/index" tag="div" replace>继续预约</router-link>
        <router-link class="sure" to="/team/record" tag="div" replace>查看记录</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import ProgressBar from '../common/progressBar.vue';
export default {
  name: "team_success",
  data() {
    return {
      apiToken: localStorage.api_token || "",
      torder_id: this.$route.query.torder_id || "",
      detail: {
        t_date: '0000年00月00日',
        time_period: '00:00-00:00'
      },
      free: true, //是否收费，默认免费
    }
  },
  components: {
    ProgressBar,
  },
  created() {
    this.torder_id && this.getDetail();
  },
  methods: {
    getDetail() {
      this.$api.PW_PC_teamTicketOrderD(this.apiToken, this.torder_id).then(res => {
        if (res.status == 1) {
          // console.log(res)
          let dateArr = res.data.t_date.split('-');
          res.data.t_date = dateArr[0] + '年' + dateArr[1] + '月' + dateArr[2] + '日';
          this.free = parseFloat(res.data.order_amount).toFixed(2) == '0.00' ? true : false;
          this.detail = res.data;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {})
    }
  }
};

</script>
<style lang="scss" scoped>
.container {
  margin: 0 auto;

  .messages {
    width: 1200px;
    margin: 80px auto;
    box-sizing: border-box;
    overflow: hidden;
    font-family: MicrosoftYaHei;
    position: relative;

    // logo
    .make_logo {
      width: 399px;
      height: 280px;
      background: url("../../../img/teampw/icon1.png") center center / 100% 100% no-repeat;
      margin: 0 auto;
    }

    .make_text {
      font-size: 16px;
      text-align: center;
      margin: 40px 0 80px;

      .make_success {
        font-size: 26px;
        color: #444;
        margin-bottom: 50px;
      }

      .k1 {
        font-size: 16px;
        color: #777;
        // margin-bottom: 20px;
        line-height: 40px;
      }

      .k2 {
        font-size: 16px;
        color: #777;
        line-height: 40px;
      }

      .tips {
        text-align: center;
        font-size: 24px;
        font-weight: 400;
        line-height: 41px;
        margin-top: 30px;
      }
    }

    // 结尾付款
    .footer {
      width: 1200px;
      margin: 0px auto;
      overflow: hidden;
      font-size: 16px;
      font-weight: 400;
      line-height: 48px;
      text-align: center;

      .cancle {
        float: left;
        width: 220px;
        height: 48px;
        color: rgba(85, 85, 90, 1);
        line-height: 48px;
        text-align: center;
        border: 1px solid rgba(210, 210, 210, 1);
        border-radius: 24px;
        margin-left: 300px;
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
        margin-right: 248px;
        cursor: pointer;
      }
    }
  }
}

</style>
