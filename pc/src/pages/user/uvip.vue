<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">首页</a>
        »
        <a href="/center">个人中心</a>
        »
        <a href="javascript:;">会员注册</a>
      </div>
    </div>
    <div class="container">
      <div class="date_step">
        <div class="date_title">
          <div class="date_left">
            注册会员
            <span class="line"></span>
            <span class="dot"></span>
          </div>
          <el-steps :active="1" align-center class="date_right">
            <el-step title="选择会员类型">
              <i class="s s1" slot="icon"></i>
            </el-step>
            <el-step title="填写申请单">
              <i class="s s2" slot="icon"></i>
            </el-step>
            <el-step title="线下认证">
              <i class="s s3" slot="icon"></i>
            </el-step>
          </el-steps>
        </div>
      </div>
      <div class="vip">
        <div class="vip-main">
          <div class="item">
            <i class="iconfont iconshualian"></i>
            <p class="mt">免身份证入馆</p>
          </div>
          <div class="item">
            <i class="iconfont icondianji"></i>
            <p>
              一键预约
              <br>常设展览功能
            </p>
          </div>
          <div class="item">
            <i class="iconfont iconicon-test"></i>
            <p class="mt">敬请期待</p>
          </div>
        </div>
        <div class="btns" @click="goVip">免费申请</div>
      </div>
      <div class="content" v-html="info"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "uvip",
  data() {
    return {
      info: ""
    };
  },
  methods: {
    getEquity() {
      this.$api.getEquity().then(res => {
        this.info = res.data.content;
      });
    },
    goVip() {
      this.$router.push("/rvip");
    }
  },
  mounted() {
    this.getEquity();
  }
};
</script>
<style scoped lang="scss">
.topbar-wrapper {
  background-color: #e7e7e7;
  height: 75px;
  line-height: 75px;
  .topbar {
    width: 1200px;
    margin: 0 auto;
    height: 75px;
    line-height: 75px;
    color: #000;
    font-size: 18px;
  }
  .topbar a {
    text-decoration: none;
    color: #000;
    margin: 0 4px;
  }
  .topbar a:hover {
    color: #b47c2d;
  }
}
.container {
  width: 1200px;
  margin: 0 auto;
}
.top {
  padding: 20px 30px;
  border-bottom: 2px solid #b47c2d;
}
.date_step {
  width: 1200px;
  margin: 20px auto;
  padding: 30px 0;
  border-bottom: 5px solid rgba(180, 124, 45, 0.3);

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
      width: 50%;
      color: #000;
      margin-right: -60px;

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
        background-image: url("../.././img/ticket/01.png");
      }

      /deep/ .is-finish .s2 {
        background-image: url("../.././img/ticket/02.png");
      }

      /deep/ .is-finish .s3 {
        background-image: url("../.././img/ticket/03.png");
      }

      /deep/ .is-finish .s4 {
        background-image: url("../.././img/ticket/04.png");
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
        background-image: url("../.././img/ticket/1.png");
      }

      .s2 {
        background-image: url("../.././img/ticket/2.png");
      }

      .s3 {
        background-image: url("../.././img/ticket/3.png");
      }

      .s4 {
        background-image: url("../.././img/ticket/4.png");
      }
    }
  }
}
.vip {
  height: 474px;
  width: 100%;
  padding-top: 40px;
  background: url(../.././img/vip/vip.png) no-repeat;
  background-size: cover;
  .vip-main {
    display: flex;
    padding: 170px 160px 30px;
    .item {
      flex: 1;
      text-align: center;
      i {
        font-size: 60px;
        color: #fff;
        display: block;
        margin: 10px;
      }
      p {
        margin-top: 27px;
        line-height: 20px;
        &.mt {
          margin-top: 47px !important;
        }
      }
    }
  }
  .btns {
    width: 285px;
    height: 47px;
    text-align: center;
    line-height: 47px;
    background: rgba(180, 124, 45, 0.8);
    border-radius: 24px;
    margin: 0 auto;
    color: #fff;
    cursor: pointer;
  }
}
.content {
  padding: 30px 0;
  /deep/ p {
    font-size: 14px;
    line-height: 28px;
  }
  /deep/p img {
    width: 100%;
    display: block;
    height: auto;
  }
}
</style>
