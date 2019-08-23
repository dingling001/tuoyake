<template>
  <div class="container">
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">首页</a>
        »
        <a href="/center">个人中心</a>
        »
        <a href="javascript: void(0)">展览门票</a>
      </div>
    </div>
    <div class="header clearfix">
      <h3>订单信息</h3>
      <div class="right">
        <div class="status">
          <span>预约状态：</span>
          <span class="staus-info" v-text="orderData.order_status_show">预约成功</span>
        </div>
        <div class="date">
          <span>参观日期:</span>
          <span v-text="orderData.t_date"></span>
          <span v-text="orderData.time_period"></span>
        </div>
      </div>
    </div>
    <div class="order-info">
      <div>
        <span>订单编号</span>
        <span v-text="orderData.order_sn">G2345678</span>
      </div>
      <div>
        <span>下单时间</span>
        <span v-text="orderData.add_time">2017-12-04 15:39:42</span>
      </div>
    </div>
    <div class="older-table">
      <el-table :data="tableData" width="100%" border v-loading="data_loading">
        <el-table-column width="70" label="序号" align="center" type="index"></el-table-column>
        <el-table-column width="150" label="门票类型" align="center" prop="pt_name"></el-table-column>
        <el-table-column width="100" label="姓名" align="center" prop="toi_username"></el-table-column>
        <el-table-column width="150" label="证件类型" align="center" prop="toi_cardtype"></el-table-column>
        <el-table-column width="220" label="证件号码" align="center" prop="toi_card_num"></el-table-column>
        <el-table-column width="250" label="门票名称" align="center" class-name>
          <template slot-scope="scope">
            <div
              v-for="(item, index) in scope.row.tickets"
              :key="index"
              :class="{'tick-info': true, 
              'tick-name': true,
              'wait': item.toi_status === 2,
              'timeout': item.toi_status === 5,
              'over': item.toi_status === 3,
              'refund': item.toi_status == 6,
              }"
            >
              <span
                v-if="item.can_refund&&showCheckbox"
                :class="{'checkbox': true, 'checked': refundList.indexOf(item.titem_id) !== -1 }"
                @click="refundTicket($event,item.titem_id, item.ticket_id, scope.row.tickets)"
              ></span>
              <span>{{ item.ticket_name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :width="priceWidth" label="票价" align="center">
          <template slot-scope="scope">
            <div
              :class="{
                'tick-info': true,
                 'wait': item.toi_status === 2,
                 'timeout': item.toi_status === 5,
                 'over': item.toi_status === 3,
                 'refund': item.toi_status == 6,
              }"
              v-for="(item, index) in scope.row.tickets"
              :key="index"
            >￥{{ item.discount_price }}</div>
          </template>
        </el-table-column>

        <el-table-column width="120" label="检票二维码" align="center" v-if="!waitPay">
          <template slot-scope="scope">
            <div class="tick-info" v-for="(item, index) in scope.row.tickets" :key="index">
              <span v-if="!item.jp_qrcode">无</span>
              <span
                v-else-if="item.toi_status === 1"
                class="qcord-link"
                @click="showQrcode(item.jp_qrcode,scope.row, item)"
              >检票二维码</span>
              <span v-else class="qcord-link noclick">检票二维码</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="total">
        <span>总计</span>
        <span>¥ {{orderData.order_amount}}</span>
      </div>
    </div>

    <div class="tag-contain clearfix" v-if="!waitPay">
      <div class="tag-item">
        <span class="wait"></span>
        <span>待检票</span>
      </div>
      <div class="tag-item">
        <span class="over"></span>
        <span>已检票</span>
      </div>
      <div class="tag-item">
        <span class="timeout"></span>
        <span>已过期</span>
      </div>
      <div class="tag-item">
        <span class="refund"></span>
        <span>已退票</span>
      </div>
    </div>
    <!-- 正常状态的已经完成订单的 -->
    <div class="button clearfix" v-if="canRefund && !showCheckbox">
      <el-button round class="back" @click="goback">返回订单列表</el-button>
      <el-button round class="refund" @click="goRefund">退票</el-button>
    </div>
    <!-- 退票的按钮状态 -->
    <div class="button clearfix" v-if="showCheckbox">
      <el-button round class="back" @click="refundBack">返回</el-button>
      <el-button round class="refund" @click="goRefundTicked">确认退票</el-button>
    </div>

    <!-- 待支付状态的 -->
    <div class="button clearfix" v-if="waitPay">
      <el-button round class="back" @click="cancel_fn">取消订单</el-button>
      <el-button round class="refund" @click="goPay">立即支付</el-button>
    </div>
    <!-- 订单已经取消的状态案件 -->
    <div class="button clearfix" v-if="cancleOrder||!canRefund&&!waitPay">
      <el-button round class="back center" @click="goback">返回订单列表</el-button>
    </div>
    <!-- 二维码的容器 -->
    <div :class="{'mark':true,'active': flag}">
      <div class="show-qcord">
        <div class="close">
          <!-- <span class="close-icon" @click="closeQrcode"></span> -->
        </div>
        <div class="header-title">
          <div class="name clearfix">
            <span v-text="qcodeName"></span>
            <span v-text="qcodeType"></span>
          </div>
          <p class="info" v-text="qcodeInfo"></p>
        </div>
        <div class="center-qcode">
          <img :src="qcodeSrc" alt />
          <p>请截屏保存二维码进行检票</p>
        </div>
        <el-button round class="btn" @click="closeQrcode()">关闭</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      orderData: {},
      torder_id: "",
      api_token: "",
      // 二维码的遮蔽层显示控制
      flag: false,
      // 二维码地址
      qcodeSrc: "",
      // 二维码容器上的信息
      qcodeName: "",
      qcodeType: "",
      qcodeInfo: "",
      data_loading: true,
      // 订单待支付状态和订单带取消状态
      waitPay: false,
      cancleOrder: false,
      // 只有点击退票按钮时候显示可以退票的按钮
      showCheckbox: false,
      canRefund: false,
      // 要退票的票ID列表
      refundList: []
    };
  },
  computed: {
    priceWidth() {
      var temp = 100;
      if (this.waitPay) {
        temp += 120;
      }
      return temp.toString;
    }
  },
  created() {
    this.torder_id = this.$route.query.torder_id || null;
    this.api_token = localStorage.getItem("api_token") || null;

    if (this.api_token && this.torder_id) {
      this.getOrderDetail();
    } else {
      this.$router.push("/pw/person/index");
    }
    // 退票的路由
    if (this.$route.query.refund) {
      this.showCheckbox = true;
    }
  },
  methods: {
    // 获取订单详情
    getOrderDetail() {
      this.$api.getMyOrderDetial(this.api_token, this.torder_id).then(res => {
        if (res.status === 1) {
          this.orderData = res.data;
          this.tableData = res.data.item;
          this.data_loading = false;
          // 待支付
          if (res.data.order_status === 2) {
            this.waitPay = true;
          }
          // 已经取消订单的
          if (res.data.order_status === 5) {
            this.cancleOrder = true;
          }
          // 判断是否可以退票
          this.canRefund = res.data.can_refund;

          console.log(res);
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    // 打开和关闭二维码
    showQrcode(src, item, ticket) {
      this.qcodeSrc = src;
      this.qcodeName = item.toi_username;
      this.qcodeType = item.pt_name;
      this.qcodeInfo = ticket.ticket_name;
      this.flag = true;
      // console.log(src);
      // console.log(item);
    },
    closeQrcode() {
      this.flag = false;
    },
    // 立即支付操作
    goPay() {
      this.$router.push({
        path: "/pw/person/pay",
        query: {
          torder_id: this.orderData.torder_id,
          order_sn: this.orderData.order_sn,
          order_status: this.orderData.order_status
        }
      });
    },
    // 退回列表页面
    goback() {
      this.$router.push("/person");
    },
    // 选择要进行退票的门票
    refundTicket(e, id, ticket_id, list) {
      var clickElement = e.target;
      // clickElement.classList.toggle("checked");
      if (this.refundList.indexOf(id) === -1) {
        this.refundList.push(id);
      } else {
        var index = this.refundList.indexOf(id);
        this.refundList.splice(index, 1);
      }
      // 选择基础门票就进行全部退票
      if (ticket_id === 1) {
        var vm = this;
        var listCon = this.refundList;
        // 基础票不存在的时候
        if (listCon.indexOf(id) !== -1) {
          list.forEach(function(item, index) {
            if (item.ticket_id !== 1) {
              // 将基础门票下的所有可以退票的门票选中
              if (listCon.indexOf(item.titem_id) === -1 && item.can_refund) {
                vm.refundList.push(item.titem_id);
              }
            }
          });
        }
        // 基础票存在的时候，在点击只取消基础票
        console.log(this.refundList);
      } else if (this.refundList.indexOf(list[0].titem_id) !== -1) {
        this.refundList.splice(this.refundList.indexOf(list[0].titem_id), 1);
      }
    },
    // 点击退票按钮
    goRefund() {
      if (
        this.orderData.order_status === 3 ||
        this.orderData.order_status === 66
      ) {
        this.showCheckbox = true;
      }
    },
    // 退票确认
    goRefundTicked() {
      if (!this.refundList.length) {
        this.$message({
          message: "请选择要退的门票",
          type: "error"
        });
        return;
      }
      this.$confirm("确定提交退票申请吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        var titem_ids = this.refundList.join(",");
        this.data_loading = true;
        console.log(titem_ids);
        this.$api.postRefundTicket(this.api_token, titem_ids).then(res => {
          if (res.status === 1) {
            this.refundList = [];
            this.$notify({
              title: "成功",
              dangerouslyUseHTMLString: true,
              message:
                "<p>退票成功！</p><p>您已成功退票，其余门票请准时到馆参观</p>",
              type: "success"
            });
            this.getOrderDetail();
            this.showCheckbox = false;
          } else {
            this.$alert(res.msg, "提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.showCheckbox = false;
                // console.log(this.showCheckbox);
                this.data_loading = false;
                this.refundList = [];
              }
            });
          }
        });
      });
    },
    // 退票界面的返回界面
    refundBack() {
      this.showCheckbox = false;
      this.refundList = [];
    },
    // 取消订单
    cancel_fn() {
      this.$confirm("取消订单,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .postCancelMyOrder(
              localStorage.getItem("api_token"),
              this.torder_id,
              1
            )
            .then(res => {
              // console.log(res);
              if (res.status == 1) {
                this.$message({
                  type: "success",
                  message: "取消成功!"
                });
                if (this.timeId) {
                  clearInterval(this.timeId);
                }
                this.getOrderDetail();
                this.waitPay = false;
                // this.$router.push("/person");
              } else {
                this.$message({
                  message: res.msg,
                  type: "error"
                });
              }
            });
        })
        .catch(e => {
          // this.$message({
          //   type: "info",
          //   message: "已取消"
          // });
          console.log(e);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
/** @format */

.container {
  position: relative;
  padding-bottom: 100px;
  .topbar-wrapper {
    background-color: #e7e7e7;
    height: 60px;
    line-height: 60px;
    .topbar {
      width: 1200px;
      margin: 0 auto;
      height: 60px;
      line-height: 60px;
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
  .clearfix::before,
  .clearfix::after {
    content: "";
    display: table;
  }

  .clearfix::after {
    clear: both;
  }

  .header {
    width: 1200px;
    margin: 0 auto;
    padding: 15px 0;
    border-bottom: 5px solid rgba(180, 124, 45, 0.3);
    line-height: 40px;

    h3 {
      position: relative;
      float: left;
      font-size: 18px;

      &::after,
      &::before {
        content: "";
        position: absolute;
        bottom: -5px;
        height: 5px;
        background-color: #000;
        border-radius: 2px;
      }

      &::before {
        width: 40px;
        left: 0;
      }

      &::after {
        width: 5px;
        left: 45px;
        border-radius: 50%;
      }
    }

    .right {
      float: right;
      font-size: 16px;
      line-height: 1.6;
    }

    .staus-info {
      color: #da4453;
    }

    .resolve {
      color: #b47c2d;
    }
  }

  .order-info {
    margin: 0 auto;
    width: 1200px;
    line-height: 24px;
    font-size: 16px;

    div {
      float: left;
      margin: 15px 40px;

      &:first-child {
        margin-left: 0;
      }

      span {
        display: inline-block;
        margin: 0 8px;

        &:first-child {
          margin-left: 0;
        }
      }
    }
  }

  .older-table {
    margin: 0 auto;
    padding: 0 15px;
    width: 1200px;
    text-align: center;
    /deep/ table {
      font-size: 16px;
    }
    .tick-name {
      // width: 200px;
      position: relative;
      text-indent: 20px;
      text-align: left;
      line-height: 40px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .checkbox {
      position: absolute;
      top: 50%;
      left: 5px;
      margin-top: -10px;
      width: 20px;
      height: 20px;
      // border: 1px solid #000;
      border-radius: 4px;
      background-image: url("../../../img/ticket/check.png");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      &.checked {
        background-image: url("../../../img/ticket/checked.png");
      }
    }
    .tick-info {
      padding: 12px 10px;
      line-height: 40px;
      border-bottom: 1px solid #ebeef5;
      &:last-child {
        border: none;
      }
    }
  }

  .total {
    width: 1200px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    line-height: 50px;
    border-bottom: 1px solid #ebeef5;

    span {
      &:last-child {
        float: right;
        margin-right: 100px;
      }
    }
  }

  .tag-contain {
    width: 1200px;
    margin: 15px auto;

    .tag-item {
      float: right;
      margin: 0 10px;
      line-height: 40px;

      span {
        float: left;
        line-height: 40px;

        &:first-child {
          margin: 14px 15px;
          width: 14px;
          height: 14px;
          // background-color: #b47c2d;
        }
      }
    }
  }

  .button {
    width: 630px;
    margin: 40px auto;

    .back {
      float: left;
      width: 220px;
      height: 48px;
      border-radius: 24px;
      &:hover {
        background-color: rgba(195, 150, 87, 0.2);
        color: #b47c2d;
        border-color: #c39657;
      }
      &.center {
        float: none;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
    }

    .refund {
      float: right;
      height: 48px;
      border-radius: 24px;
      width: 220px;
      background-color: #c39657;
      color: #fff;
    }
  }

  /deep/ td {
    padding: 0;

    .cell {
      padding-left: 0;
      padding-right: 0;
    }
  }

  /deep/ tr:hover > td {
    &.wait {
      background-color: #86a5cc;
    }

    &.over {
      background-color: #90bea2;
    }

    &.timeout {
      background-color: #ffd77c;
    }

    &.refund {
      background-color: #e5e5e5;
    }
  }

  /deep/ td.wait {
    background-color: #86a5cc;
  }

  /deep/ td.over {
    background-color: #90bea2;
  }

  /deep/ td.timeout {
    background-color: #ffd77c;
  }

  /deep/ td.refund {
    background-color: #e5e5e5;
  }

  .wait {
    background-color: #86a5cc;
  }

  .over {
    background-color: #90bea2;
  }

  .timeout {
    background-color: #ffd77c;
  }

  .refund {
    background-color: #e5e5e5;
  }

  .qcord-link {
    color: #b47c2d;
    cursor: pointer;
    &.noclick {
      color: rgba(0, 0, 0, 0.7);
    }
  }

  .mark {
    &.active {
      display: block;
    }

    display: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }

  .show-qcord {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1000;
    margin-left: -218px;
    margin-top: -225px;
    width: 436px;
    height: 450px;
    padding-left: 30px;
    background-color: #fff;
    box-shadow: 0px 2px 11px 1px rgba(82, 81, 81, 0.24);
    .close {
      // position: absolute;
      // width: 100%;
      height: 40px;
      padding: 10px;
    }

    .close-icon {
      float: right;
      margin-top: 15px;
      margin-right: 15px;
      font-size: 20px;
      height: 15px;
      width: 15px;
      background-image: url("../../../img/ticket/close.png");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      cursor: pointer;
    }

    .header-title {
      line-height: 1.5;
      font-size: 18px;

      .name {
        span {
          float: left;

          &:first-child {
            font-weight: 700;
            font-size: 20px;
            margin-right: 10px;
          }

          &:last-child {
            color: #525151;
          }
        }
      }
    }

    .center-qcode {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 300px;
      height: 200px;
      margin-top: -100px;
      margin-left: -150px;

      img {
        margin: 20px auto;
        width: 140px;
        height: 140px;
        display: block;
      }

      p {
        margin: 0 auto;
        width: 100%;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
      }
    }

    .btn {
      position: absolute;
      bottom: 30px;
      left: 50%;
      margin-left: -137px;
      width: 274px;
      height: 44px;
      color: #fff;
      background-color: #c39657;
    }
  }
}
</style>
