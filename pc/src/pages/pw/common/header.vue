<template>
  <div>
    <div class="nav_hr">
      <div class="nav_text">
        <router-link tag="span" to="/">首页</router-link>
        » {{ tag }}
      </div>
    </div>
    <div class="date_step">
      <div class="date_title">
        <div class="date_left">
          <div class="title">{{ title }}</div>

          <div class="bottom">
            <span class="line"></span>
            <span class="dot"></span>
          </div>
        </div>
        <el-steps :active="current" align-center class="date_right" v-show="show">
          <el-step title="选择参观日期">
            <i class="s s1" slot="icon"></i>
          </el-step>
          <el-step title="填写预约信息">
            <i class="s s2" slot="icon"></i>
          </el-step>
          <el-step title="确认订单">
            <i class="s s3" slot="icon"></i>
          </el-step>
          <el-step title="预约成功">
            <i class="s s4" slot="icon"></i>
          </el-step>
        </el-steps>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: "选择日期"
    },
    show: {
      type: Boolean,
      default: true
    },
    tag: {
      type: String,
      default: "团体票务预约"
    }
  }
};
</script>

<style lang="scss" scoped>
/** @format */

.nav_hr {
  background-color: #e7e7e7;
  height: 60px;
  line-height: 60px;

  .nav_text {
    width: 1200px;
    margin: 0 auto;
    font-size: 18px;

    span {
      cursor: pointer;

      &:hover {
        color: #da9b42;
        text-decoration: underline;
      }
    }
  }
}
.date_step {
  // display: flex;
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
      // padding: 0 0 27px 0;
      position: relative;
      // line-height: 53px;
      text-align: center;
      .title {
        height: 54px;
        line-height: 54px;
      }
      .bottom {
        width: 100%;
        line-height: 38px;
        height: 38px;
        position: relative;
      }
      .line {
        position: absolute;
        // display: inline-block;
        // float: left;
        // bottom: 0;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 60px;
        height: 5px;
        left: 0;
        background-color: #000;
        border-radius: 2px;
        z-index: 1;
        // display: block;
      }

      .dot {
        // display: block;
        // display: inline-block;
        // float: right;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 7px;
        height: 5px;
        border-radius: 3px;
        background-color: #000;
        left: 70px;
        // bottom: 0;
        z-index: 1;
        // position: absolute;
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
        color: #b47c2d;
      }

      /deep/ .el-step__title.is-process {
        font-weight: normal;
      }

      /deep/ .is-finish .s1 {
        background-image: url("../../../img/ticket/01.png");
      }

      /deep/ .is-finish .s2 {
        background-image: url("../../../img/ticket/02.png");
      }

      /deep/ .is-finish .s3 {
        background-image: url("../../../img/ticket/03.png");
      }

      /deep/ .is-finish .s4 {
        background-image: url("../../../img/ticket/04.png");
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
        background-image: url("../../../img/ticket/1.png");
      }

      .s2 {
        background-image: url("../../../img/ticket/2.png");
      }

      .s3 {
        background-image: url("../../../img/ticket/3.png");
      }

      .s4 {
        background-image: url("../../../img/ticket/4.png");
      }
    }
  }
}
</style>
