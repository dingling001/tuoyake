<template>
  <div
    class="container"
    v-loading="!flag"
    element-loading-text="正在确认订单请稍等...."
    element-loading-background="rgba(0, 0, 0, 0.4)"
  >
    <div class="header">
      <step-header :current="3" title="确认订单信息" tag="个人票务预约"></step-header>
    </div>
    <div class="list-header">
      <from-header :bookDate="bookDate" :bookTime="bookTime"></from-header>
      <ul>
        <li class="index">序号</li>
        <li class="tick-type">门票类型</li>
        <li class="name">姓名</li>
        <li class="certificate-type">证件类型</li>
        <li class="certificate-id">证件号码</li>
        <li class="ticks-list">
          <span class="tick-name">门票名称</span>
          <span class="tick-price">票价</span>
        </li>
        <!-- <li class="operation">操作</li> -->
      </ul>
    </div>

    <div class="list-content">
      <ul>
        <li v-for="(listItem, index) in listDate" :key="index">
          <!-- 序号 -->
          <div class="index">
            <span>{{ index + 1 }}</span>
          </div>
          <!-- 门票类型 -->
          <div class="tick-type">{{ listItem.tickType }}</div>
          <!-- 姓名 -->
          <div class="name">
            <div style="width: 100%">{{ listItem.personName }}</div>
          </div>
          <!-- 证件类型 -->
          <div class="certificate-type">{{ listItem.cardType }}</div>
          <!-- 证件号 -->
          <div class="certificate-id">{{ listItem.cardID }}</div>
          <!-- 门票名称 和 票价 -->
          <div class="ticks-list">
            <div class="ticks-list" v-for="(item, index) in listItem.ticketList" :key="index">
              <!-- {{ index }} -->
              <span class="tick-name">{{ item.ticket_name }}</span>
              <span class="tick-price">￥{{ item.ticket_price }}</span>
            </div>
          </div>
          <!-- <div class="operation">
            <el-button round size="medium">删除</el-button>
          </div>-->
        </li>
      </ul>
    </div>

    <div class="count-container">
      <div class="count">
        <span>总计：</span>
        <span>￥ {{ total }}</span>
      </div>
    </div>

    <div class="button clearfix">
      <el-button round class="back" @click="goBack()">返回修改</el-button>
      <el-button round class="refund" @click="goPay()">提交预约</el-button>
    </div>
  </div>
</template>

<script>
import { Local } from '@/bin/cache.js';
import StepHeader from '../common/header.vue';
import FromHeader from '../common/formHeader.vue';
export default {
  components: {
    StepHeader,
    FromHeader,
  },
  created() {
    this.listDate = Local.get('pw_person_info') || null;
    this.sendData = Local.get('pw_send_info') || null;
    if (!this.listDate && !this.sendData) {
      this.$router.push('/pw/person/index');
    }
  },
  data() {
    return {
      listDate: [],
      sendData: [],
      api_token: localStorage.api_token || null,
      // orderDate:  Local.get('pc_pw_now_date') || '',
      orderTime: Local.get('pc_pw_time_period') || '',
      // 防止重复提交订单信息
      flag: true,
      dateLoading: false,
    };
  },
  computed: {
    bookDate() {
      if (Local.get('pc_pw_now_date') && Local.get('pc_pw_time_period')) {
        return Local.get('pc_pw_now_date');
      }
    },
    bookTime() {
      if (Local.get('pc_pw_now_date') && Local.get('pc_pw_time_period')) {
        return Local.get('pc_pw_time_period');
      }
    },
    total() {
      var total = 0;
      if (this.listDate) {
        this.listDate.forEach(function(item, index) {
          item.ticketList.forEach(function(every, index) {
            total = total + Number(every.ticket_price);
          });
        });
      }

      return total;
    },
    orderDate() {
      var date = Local.get('pc_pw_now_date');
      console.log(date);
      var month = date.split('月')[0];
      var day = date.split('月')[1].split('日')[0];
      var year = new Date().getFullYear();
      return `${year}-${month}-${day}`;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 下订单上传订票信息
    postData(obj) {
      this.flag = false;
      this.dateLoading = true;
      var pt_id = obj.pt_id;
      var td_tp_id = obj.td_tp_id;
      var toi_username = obj.toi_username;
      var toi_cardtype_id = obj.toi_cardtype_id;
      var toi_card_num = obj.toi_card_num;
      var td_tp_ids = [];
      obj.td_tp_ids.forEach(function(item, index) {
        //  去掉基础门票
        item.splice(item.indexOf(td_tp_id), 1);
        var temp = item.join(',');
        td_tp_ids.push(temp);
      });
      this.$api
        .postBookInfo(
          this.api_token,
          td_tp_id,
          pt_id,
          toi_username,
          toi_cardtype_id,
          toi_card_num,
          td_tp_ids
        )
        .then(res => {
          // 2待付款，3已完成（已付款），5已取消，6已退款
          if (res.status === 1) {
            var result = res.data;
            if (result.order_status === 2) {
              this.$router.push({
                path: '/pw/person/pay',
                query: {
                  torder_id: result.torder_id,
                  order_sn: result.order_sn,
                  order_status: result.order_status,
                },
              });
            }
            if (result.order_status == 3) {
              this.$router.push({
                path: '/pw/person/success',
                query: {
                  date: this.orderDate,
                  time: this.orderTime,
                },
              });
            }

            Local.remove('pw_person_info');
            Local.remove('pw_order_info');
            Local.remove('pw_send_info');
            // clear 选择的日期
            Local.remove('pc_pw_dateIndex');
            Local.remove('pc_pw_now_date');
            Local.remove('pc_pw_tp_list');
            Local.remove('pc_pw_time_period');
            Local.remove('pc_pw_timePeriodIndex');
            Local.remove('pc_pw_td_tp_id');
          } else if (res.status === 902) {
            // 902：没有余票
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/pw/person/index');
                // clear 选择的日期
                Local.remove('pc_pw_dateIndex');
                Local.remove('pc_pw_now_date');
                Local.remove('pc_pw_tp_list');
                Local.remove('pc_pw_time_period');
                Local.remove('pc_pw_timePeriodIndex');
                Local.remove('pc_pw_td_tp_id');
              },
            });
          } else {
            this.$message({
              message: res.msg,
              type: 'error',
            });
          }
          this.flag = true;
        })
        .catch(error => {
          console.log(error);
        });

      console.log(this.flag);
    },
    goPay() {
      if (this.api_token && this.sendData) {
        if (this.flag) {
          this.postData(this.sendData);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/** @format */

.container {
  padding-bottom: 40px;
  z-index: -1;
  /deep/ .el-loading-spinner .path {
    stroke: #f1f0ef;
  }
  /deep/ .el-loading-spinner .el-loading-text,
  /deep/ .el-loading-spinner i {
    font-size: 16px;
    color: #f1f0ef;
  }
  .list-header {
    width: 1200px;
    margin: 0 auto;

    ul {
      margin: 0 auto;
      width: 1060px;
      margin-top: 15px;
      // padding-left: 75px;
      &::after {
        content: '';
        display: table;
        clear: both;
      }
      li {
        float: left;
        margin: 0 5px;
        font-size: 16px;
        line-height: 36px;
        border-bottom: 2px solid #efbb72;
        text-align: center;
        &:first-of-type,
        &:last-of-type {
          margin: 0;
        }
        &.index {
          width: 69px;
        }
        &.name {
          width: 100px;
        }
        &.tick-type,
        &.certificate-type {
          width: 147px;
        }
        &.certificate-id {
          width: 229px;
        }
        &.ticks-list {
          margin-left: 20px;
          border: none;
          &::after {
            content: '';
            display: table;
            clear: both;
          }
          .tick-name {
            float: left;
            width: 216px;
            border-bottom: 2px solid #efbb72;
            margin-right: 5px;
          }
          .tick-price {
            float: left;
            width: 80px;
            border-bottom: 2px solid #efbb72;
            margin-left: 5px;
          }
        }
        &.operation {
          width: 116px;
        }
      }
    }
  }

  .list-content {
    width: 1200px;
    border-bottom: 5px solid rgba(180, 124, 45, 0.3);
    margin: 0 auto;
    ul {
      width: 1060px;
      margin: 0 auto;
      &::after {
        content: '';
        display: table;
        clear: both;
      }
      &::before {
        content: '';
        display: table;
      }
      li {
        position: relative;
        // margin-top: 15px;
        // margin-bottom: 15px;
        padding: 15px 0;
        font-size: 16px;
        line-height: 40px;
        text-align: center;
        border-bottom: 1px solid #adadad;
        &:last-of-type {
          border: none;
        }
        &::after {
          content: '';
          display: table;
          clear: both;
        }
        div {
          float: left;
          margin: 0 5px;
          &:first-of-type,
          &:last-of-type {
            margin: 0;
          }
          &.index {
            width: 69px;
            span {
              display: inline-block;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background-color: #f4f4f4;
            }
          }
          &.name {
            width: 100px;
            text-align: center;
          }
          &.tick-type,
          &.certificate-type {
            width: 147px;
          }
          &.certificate-id {
            width: 229px;
          }
          &.ticks-list {
            width: 300px;
            border: none;
            text-align: left;
            line-height: 40px;
            font-size: 16px;
            margin-left: 20px;
            // border-right: 1px solid #b47c2d;
            &::after {
              content: '';
              display: table;
              clear: both;
            }
            /deep/ .el-checkbox {
              margin: 0;
            }
            /deep/ .el-checkbox__label {
              padding-left: 10px;
              font-size: 16px;
            }
            /deep/ .el-checkbox__input {
              position: absolute;
              top: 3px;
              left: 0;
            }
            .tick-name {
              float: left;
              width: 190px;
              margin-right: 5px;
              margin-left: 15px;
              white-space: normal;
            }
            .tick-price {
              float: left;
              // text-align: center;
              width: 80px;
              margin-left: 5px;
              padding-left: 14px;
            }
          }
          &.operation {
            position: absolute;
            top: 50%;
            right: 25px;
            margin-top: -20px;
            width: 116px;
            vertical-align: middle;
            text-align: center;
          }
        }
      }
    }
  }
  .count-container {
    width: 1200px;
    margin: 40px auto 40px;
    line-height: 50px;
    &::after {
      content: '';
      display: table;
      clear: both;
    }

    .count {
      float: right;
      line-height: 50px;
      padding: 0 70px;
      font-size: 16px;
      font-weight: 700;
      span {
        font-size: 18px;
        &:last-child {
          font-size: 16px;
          font-weight: 700;
          color: #ff3600;
        }
      }
    }
  }
  .button {
    width: 630px;
    margin: 40px auto 80px;
    &::after {
      content: '';
      display: table;
      clear: both;
    }
    .back {
      float: left;
      width: 220px;
      height: 48px;
      border-radius: 24px;
      border-color: #c39657;
      color: #c39657;
      &:focus,
      &:hover {
        background-color: transparent;
        color: #c39657;
        border-color: #c39657;
      }
    }
    .refund {
      float: right;
      height: 48px;
      width: 220px;
      background-color: #c39657;
      color: #fff;
      border-radius: 24px;
    }
  }
}
</style>

