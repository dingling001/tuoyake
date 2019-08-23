<template>
  <div>
    <!-- 功能栏 -->
    <div class="tickets_centre">
      <div class="date_title">
        <!-- 日期 -->
        <div class="date_left">
          选择日期
          <span class="line"></span>
          <span class="dian"></span>
        </div>
        <!-- 步骤条 -->
        <el-steps :active="5" align-center class="date_right">
          <el-step title="选择预约时间">
            <i class="s s1" slot="icon"></i>
          </el-step>
          <el-step title="填写预约信息">
            <i class="s s2" slot="icon"></i>
          </el-step>
          <el-step title="确认信息">
            <i class="s s3" slot="icon"></i>
          </el-step>
          <el-step title="支付">
            <i class="s s4" slot="icon"></i>
          </el-step>
          <el-step title="预约完成">
            <i class="s s5" slot="icon"></i>
          </el-step>
        </el-steps>
      </div>
    </div>
    <!-- 信息表 -->
    <div class="messages">
      <!-- logo -->
      <div class="make_logo"></div>
      <div class="make_text">
        <p class="make_success">支付失败</p>
        <p class="k1">对不起，您的支付尚未成功，请查尝试再次支付（59s）</p>
      </div>
      <!-- 结尾付款 -->
      <div class="footer">
        <div class="cancle">返回</div>
        <div class="sure">重新支付</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.tickets_centre {
  font-family: PingFangSC-Regular;
  box-sizing: border-box;
  width: 1200px;
  margin: 20px auto;
  padding-bottom: 30px;
  padding-top: 30px;
  border-bottom: 5px solid rgba(180, 124, 45, 0.3);
  .date_title {
    overflow: hidden;
    .date_left {
      float: left;
      font-size: 24px;
      color: #000;
      padding: 10px 0 32px 0;
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
      .dian {
        position: absolute;
        display: block;
        width: 7px;
        height: 5px;
        border-radius: 3px;
        background-color: #000;
        left: 70px;
        bottom: 0;
        z-index: 1;
      }
    }
    .date_right {
      float: right;
      width: 867px;
      color: #000;
      margin-right: -50px;
      text-align: center;
      /deep/ .el-step__title {
        font-size: 16px;
        color: #000;
      }
      /deep/ .el-step__title.is-finish {
        color: #b47c2d;
      }
      /deep/ .el-step__title.is-process {
        font-weight: normal;
      }
      /deep/ .is-finish .s1 {
        background-image: url("../../img/tickets/01.png");
      }
      /deep/ .is-finish .s2 {
        background-image: url("../../img/tickets/02.png");
      }
      /deep/ .is-finish .s3 {
        background-image: url("../../img/tickets/03.png");
      }
      /deep/ .is-finish .s4 {
        background-image: url("../../img/tickets/04.png");
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
        border-color: #a0a0a0;
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
        background-image: url("../../img/tickets/1.png");
      }
      .s2 {
        background-image: url("../../img/tickets/2.png");
      }
      .s3 {
        background-image: url("../../img/tickets/3.png");
      }
      .s4 {
        background-image: url("../../img/tickets/4.png");
      }
      .s5 {
        background-image: url("../../img/tickets/5.png");
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
    width: 121px;
    height: 113px;
    background-image: url("../../img/tickets/12.png");
    position: absolute;
    left: 50%;
    top: 80px;
    transform: translate(-50%, -50%);
  }
  .make_text {
    width: 604px;
    height: 180px;
    text-align: center;
    font-size: 16px;
    margin: 180px auto 40px auto;
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
  }
  // 结尾付款
  .footer {
    margin: 0px auto 80px auto;
    overflow: hidden;
    font-size: 16px;
    font-weight: 400;
    line-height: 48px;
    .cancle {
      float: left;
      width: 220px;
      height: 48px;
      color: rgba(85, 85, 90, 1);
      line-height: 48px;
      text-align: center;
      border: 1px solid rgba(210, 210, 210, 1);
      border-radius: 24px;
      margin-left: 280px;
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
    }
  }
}
</style>

