<template>
  <div>
    <div class="nav_hr">
      <div class="nav_text">
        <router-link tag="span" to="/">首页</router-link>» 团体票务预约
      </div>
    </div>
    <div class="date_step">
      <div class="date_title">
        <div class="date_left">
          <span>{{progressTitle}}</span>
          <span class="line"></span>
          <span class="dot"></span>
        </div>
        <div class="date_right clearfix">
          <el-steps :active="progressActiveNum" align-center v-if="showProgress">
            <el-step :title="txt" v-for="(txt,txti) in progressTxt" :key="txti">
              <i :class="'s s'+(Number(txti)+1)" slot="icon"></i>
            </el-step>
          </el-steps>
          <slot name="right"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "progressBar",
  data() {
    return {};
  },
  props: {
    showProgress: {
      type: Boolean,
      default: true
    },
    progressTitle: {
      type: String,
      default: "选择日期"
    },
    progressTxt: {
      type: Array,
      default: () => [
        "选择参观日期",
        "填写预约信息",
        "确认订单",
        "审核订单",
        "预约成功"
      ]
    },
    progressActiveNum: {
      type: Number,
      default: 1
    }
  }
};
</script>
<style lang="scss" scoped>
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
  width: 1200px;
  height: 100px;
  margin: 20px auto 0;
  border-bottom: 5px solid rgba(180, 124, 45, 0.3);

  .date_title {
    overflow: hidden;

    .date_left {
      float: left;
      font-size: 24px;
      color: #000;
      margin-top: 20px;
      padding-bottom: 27px;
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
      width: 900px;
      color: #000;
      margin-right: -50px;
      //
      /deep/ .el-steps {
        .el-step {
          &.is-horizontal {
            .el-step__head {
              .el-step__line {
                top: 25px;
                border-color: #a0a0a0;
                z-index: -1;
              }

              .el-step__icon {
                width: 53px;
                height: 53px;
                background-color: #fff;
                overflow: hidden;
                border-style: hidden;
              }
            }

            .el-step__main {
              .el-step__title {
                font-size: 16px;
                color: #000;

                &.is-finish {
                  color: #b47c2d;
                }

                &.is-process {
                  font-weight: normal;
                }
              }
            }
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

            @for $i from 1 through 5 {
              &.s#{$i} {
                background-image: url(#{"../../../img/ticket/"+$i+".png"});
              }
            }
          }

          .is-finish {
            @for $i from 1 through 5 {
              .s#{$i} {
                background-image: url(#{"../../../img/ticket/0"+$i+".png"});
              }
            }
          }
        }
      }
    }
  }
}

.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
}

.clearfix::after {
  clear: both;
}
</style>
