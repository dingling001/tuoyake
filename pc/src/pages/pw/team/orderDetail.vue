<template>
  <div class="container" v-loading="loading" element-loading-text="拼命加载中">
    <ProgressBar progressTitle="订单信息" :progressActiveNum="1" :showProgress="false">
      <div slot="right" class="slot-right">
        <div class="status">
          <span>预约状态：</span>
          <!-- 订单状态，1待审核，2待支付，3已完成（已付款），5已取消，6已退款，7审核未通过 -->
          <span class="txt">{{detail.order_status_show}}</span>
        </div>
        <div class="date">
          <span>参观日期：</span>
          <span>{{detail.t_date}} {{detail.t_week}} {{detail.time_period}}</span>
        </div>
      </div>
    </ProgressBar>
    <div class="content">
      <!-- 未通过原因 -->
      <div class="reason" v-if="detail.order_status==7">
        <div class="book-date">
          <span>预约时间</span>
          <span>{{detail.add_time}}</span>
        </div>
        <div class="book-order">
          <span>预约编号</span>
          <span>{{detail.order_sn}}</span>
        </div>
        <div class="reject-reason">
          <img src="../../../img/teampw/icon3.png" alt>
          <h3>审核未通过</h3>
          <div class="cont" v-if="detail.team_order_mark" v-html="detail.team_order_mark.replace(/\n/g, '<br/>')"></div>
        </div>
      </div>
      <!-- 团队预约提交的相关信息 -->
      <div class="submit-info">
        <div class="main">
          <div class="card">
            <h3 class="title">团体信息</h3>
            <ul>
              <li class="clearfix">
                <span class="left label">团体类型</span>
                <span class="left contain">{{detail.teamtype}}</span>
              </li>
              <li class="clearfix">
                <span class="left label">团体名称</span>
                <span class="left contain">{{detail.teamname}}</span>
              </li>
            </ul>
          </div>
          <div class="card">
            <h3 class="title">联系人信息</h3>
            <ul>
              <li class="clearfix">
                <span class="left label">联系人姓名</span>
                <span class="left contain">{{detail.toi_username}}</span>
              </li>
              <li class="clearfix">
                <span class="left label">身份证号</span>
                <span class="left contain">{{detail.toi_card_num}}</span>
              </li>
              <li class="clearfix">
                <span class="left label">手机号码</span>
                <span class="left contain">{{detail.toi_c_phone}}</span>
              </li>
              <li class="clearfix">
                <span class="left label">行程单号</span>
                <span class="left contain">{{detail.toi_itinerary_no || "无"}}</span>
              </li>
            </ul>
          </div>
          <!-- 参观者信息 -->
          <div class="card">
            <h3 class="title">参观者信息</h3>
            <ul>
              <li class="clearfix">
                <span class="left label">参观者名单</span>
                <span class="left contain">
                  <el-button class="btn-style" @click="dialogVisible = true">查看名单</el-button>
                </span>
              </li>
              <li class="clearfix">
                <span class="left label">参观人数</span>
                <span class="left contain" style="color: #B47C2D;">{{detail.people_num}}人</span>
              </li>
              <li class="clearfix">
                <span class="left label">参观公函</span>
                <span class="left contain">
                  <el-button class="btn-style" v-if="detail.toi_prove_atta" @click="attaVisible = true">查看参观公函</el-button>
                  <template v-else>无</template>
                </span>
              </li>
            </ul>
          </div>
          <!-- 选择参观票信息 -->
          <div class="card">
            <h3 class="title">参观票</h3>
            <ul>
              <li class="clearfix tick" v-for="(item,index) in detail.titems" :key="index">
                <span class="left label w50">{{item.ticket_name}}</span>
                <span class="right contain">¥{{item.ticket_price}}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 总价格 -->
        <div class="count">
          <span>总计：</span>
          <span>￥{{detail.order_amount}}</span>
        </div>
        <div class="btn-wrap">
          <el-button class="btn btn-white" v-if="detail.order_status!=2" @click="$router.replace('/team/record')">返回订单列表</el-button>
          <!-- 订单状态，1待审核，2待支付，3已完成（已付款），5已取消，6已退款，7审核未通过 -->
          <el-button class="btn" :class="{'btn-white':detail.order_status==2}" v-if="detail.can_cancel" @click="cancelOrder">{{detail.order_status==2?'取消支付':'取消订单'}}</el-button>
          <el-button class="btn" v-if="detail.can_refund" @click="refundOrder">退票</el-button>
          <el-button class="btn" v-if="detail.order_status==2" @click="payOrder">支付订单</el-button>
          <el-button class="btn" v-if="detail.order_status==7" @click="applyAgain">重新预约</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="团体预约观众信息登记" :lock-scroll="false" :visible.sync="dialogVisible">
      <table>
        <tr>
          <td>姓名</td>
          <td>证件类型</td>
          <td>证件号</td>
        </tr>
        <tr class="info-item" v-for="(item, index) in detailList" :key="index">
          <td>{{item.toi_username}}</td>
          <td>{{item.card_type}}</td>
          <td>{{item.toi_card_num}}</td>
        </tr>
      </table>
    </el-dialog>
    <el-dialog title="团体预约参观公函" :lock-scroll="false" :visible.sync="attaVisible">
      <img class="atta_img" :src="detail.toi_prove_atta" />
    </el-dialog>
  </div>
</template>
<script>
import ProgressBar from '../common/progressBar.vue';
export default {
  name: "order_detail",
  data() {
    return {
      apiToken: localStorage.api_token || "",
      torder_id: this.$route.query.torder_id || "",
      detail: {
        titems: []
      },
      loading: true,
      detailList: [], //预约名单
      dialogVisible: false, //名单弹层
      attaVisible: false, //公函弹层
    }
  },
  components: {
    ProgressBar
  },
  created() {
    this.getDetail();
    this.getDetailList(); //预约名单列表
  },
  methods: {
    getDetail() {
      this.$api.PW_PC_teamTicketOrderD(this.apiToken, this.torder_id).then(res => {
        this.loading = false;
        if (res.status == 1) {
          // console.log(res);
          let dateArr = res.data.t_date.replace(/-/g, '/').split('/');
          let weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
          let weeknum = new Date(res.data.t_date).getDay();
          res.data.t_week = weekdays[weeknum];
          res.data.t_date = dateArr[0] + '年' + dateArr[1] + '月' + dateArr[2] + '日';
          this.detail = res.data;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        this.loading = false;
      });
    },
    /**
     * @团体预约名单列表
     */
    getDetailList() {
      this.$api.PW_PC_teamTicketOrderDL(this.apiToken, this.torder_id).then(res => {
        if (res.status == 1) {
          // console.log(res)
          this.detailList = res.data;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {})
    },
    /**
     * @修改信息
     */
    applyAgain() {
      this.$router.push('/pw/team/index');
    },
    payOrder() {
      this.$router.push({ path: '/pw/team/order_pay', query: { 'torder_id': this.torder_id } })
    },
    /**
     * @取消订单
     */
    cancelOrder() {
      this.$confirm('是否取消订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.PW_PC_teamTicketOrderCancel(this.apiToken, this.torder_id).then(res => {
          if (res.status == 1) {
            // console.log(res)
            this.$message({
              message: '订单已取消',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getDetail();
              }
            });
          } else {
            this.$message.error(res.msg);
          }
        }).catch(err => {})
      }).catch(() => {});
    },
    /**
     * @退票
     */
    refundOrder() {
      this.$confirm('确定提交退票申请吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.PW_PC_teamTicketOrderRefund(this.apiToken, this.torder_id).then(res => {
          if (res.status == 1) {
            // console.log(res)
            this.$message({
              message: '您已成功退票',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getDetail();
              }
            });
          } else {
            this.$message.error(res.msg);
          }
        }).catch(err => {})
      }).catch(() => {});

    }
  },
};

</script>
<style lang="scss" scoped>
.container {
  font-size: 16px;

  .clearfix::before,
  .clearfix::after {
    content: "";
    display: table;
  }

  .clearfix::after {
    clear: both;
  }

  .slot-right {
    float: right;
    width: 340px;
    line-height: 30px;
    margin-top: 15px;
    margin-right: 70px;

    .status {
      .txt {
        color: #DA4453;
      }
    }
  }

  .content {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 80px;

    .reason {
      padding: 20px 0;
      line-height: 40px;
      font-size: 16px;
      border-bottom: 1px solid #b47c2d;

      .book-date {
        span {
          display: inline-block;
          padding: 0 10px;
        }
      }

      .book-order {
        span {
          display: inline-block;
          padding: 0 10px;
        }
      }

      .reject-reason {
        width: 600px;
        margin: 0 auto;
        text-align: center;

        h3 {
          font-size: 20px;
          color: #da4453;
          font-weight: 400;
        }

        img {
          width: 261px;
        }

        .cont {
          line-height: 25px;
        }
      }
    }

    .submit-info {

      .main {
        border-bottom: 5px solid rgba(180, 124, 45, 0.3);

        .left {
          float: left;
        }

        .right {
          float: right;
        }

        .card {
          width: 1107px;
          line-height: 1;
          color: #313131;
          padding-top: 20px;
          margin: 0 auto 30px;

          &+.card {
            border-top: 1px solid #b47c2d;
          }

          .title {
            height: 49px;
            line-height: 49px;
          }

          ul {

            li {
              margin-top: 10px;
              line-height: 30px;

              &.tick {
                line-height: 30px;
              }

              .label {
                width: 100px;
                text-align: right;
                margin-right: 25px;
              }

              .btn-style {
                height: 40px;
                background-color: #b47c2d;
                color: #fff;
                border-radius: 5px;
              }

              .w50 {
                width: 400px;
                text-align: left;
                padding-left: 25px;
              }
            }
          }
        }
      }

      .count {
        margin: 0 auto;
        padding: 40px;
        width: 1200px;
        text-align: right;

        span {
          &:last-child {
            font-size: 18px;
            color: #fe5a00;
            font-weight: 700;
          }
        }
      }

      .btn-wrap {
        margin: 0 auto;
        width: 650px;
        text-align: center;

        .btn {
          width: 300px;
          height: 48px;
          color: #fff;
          border: none;
          cursor: pointer;
          text-align: center;
          border-radius: 24px;
          border: 1px solid #b17a2c;
          background-color: #b17a2c;

          &+.btn {
            margin-left: 44px;
          }

          &-white {
            background-color: #fff;
            color: #B47C2D;
            border-color: #B47C2D;
          }
        }
      }
    }
  }

  /deep/ .el-dialog__wrapper {
    .el-dialog {
      max-height: 80%;
      overflow-y: auto;

      .el-dialog__body {
        table {
          width: 100%;

          tr {
            td {
              border: 1px solid #ccc;
              text-align: center;
              padding: 10px;

              &.red {
                color: red;
              }
            }
          }
        }

        //参观公函
        .atta_img {
          display: block;
          width: 500px;
          height: auto;
          margin: 0 auto;
        }
      }
    }
  }

  //loading
  /deep/ .el-loading-mask {
    z-index: 200;

    .el-loading-spinner {
      svg {
        .path {
          stroke: #aaa;
        }
      }

      .el-loading-text {
        color: #aaa;
      }
    }
  }
}

</style>
