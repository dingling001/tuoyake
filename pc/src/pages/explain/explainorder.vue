<template>
  <div>
    <div class="nav_hr">
      <div class="nav_text">
        <router-link tag="span" to="/">首页 »</router-link>
        <router-link tag="span" to="/center">个人中心 »</router-link>
        <router-link tag="span" to="/ureport">讲解预约 »</router-link>
        订单信息
      </div>
    </div>
    <div class="tickets_centre">
      <div class="date_title">
        <!-- 日期 -->
        <div class="date_left">
          订单信息
          <span class="line"></span>
          <span class="dian"></span>
        </div>
        <div class="date_right">
          <div class="order_status">预约状态：<span>{{tableData.order_status_show}}</span></div>
          <div class="order_date">
            讲解日期：<span>{{tableData.t_date}} 星期{{week_list[week]}} {{tableData.time_period}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="order_form">
      <div class="order_head">
        <div class="order_title">订单编号：<span>{{tableData.order_sn}}</span></div>
        <div class="order_title">下单时间：<span>{{tableData.add_time}}</span></div>
      </div>
      <div class="tablemessage">
        <ul>
          <li class="clearfix">
            <span class="left label">预约类型</span>
            <div class="left contain">
              <span v-if="tableData.yy_type_id==1">个人预约 </span>
              <span v-else-if="tableData.yy_type_id==2">团队预约</span>
            </div>
          </li>
          <li class="clearfix">
            <span class="left label">姓名</span>
            <span class="left contain ">{{tableData.go_username}}</span>
          </li>
          <li class="clearfix">
            <span class="left label">证件号类型</span>
            <span class="left contain ">{{tableData.card_type}}</span>
          </li>
          <li class="clearfix">
            <span class="left label">{{tableData.card_type}}号码</span>
            <span class="left contain ">{{tableData.go_card_num}}</span>
          </li>
          <li class="clearfix">
            <span class="left label">参观人数</span>
            <span class="left contain ">{{tableData.people_num}}人</span>
          </li>
          <li class="clearfix">
            <span class="left label">选择语种</span>
            <span class="left contain ">{{tableData.language_id}}</span>
          </li>
          <li class="clearfix">
            <span class="left label">讲解员</span>
            <span class="left contain ">{{tableData.guide_num}}</span>
          </li>
          <li class="clearfix">
            <span class="left label">讲解展厅</span>
            <div class="left contain">{{tableData.exhibition_names}}</div>
          </li>
          <li class="clearfix">
            <span class="left label">电话号码</span>
            <span class="left contain ">{{tableData.contact_phone}}</span>
          </li>
          <li class="clearfix" v-if="tableData.yy_type_id==2">
            <span class="left label">团队名称/旅行社名称</span>
            <span class="left contain ">{{tableData.go_teamname}}</span>
          </li>
        </ul>
      </div>
      <div class="total" v-if="tableData">
        <div class="total_price">
          <span class="n1">总计：</span><span class="n2">￥</span><span
          class="n3">{{parseFloat(tableData.order_amount,10).toFixed(2) }}</span>
        </div>
      </div>
      <div class="order_btn">
        <div class="btn left" v-if="tableData.order_status==2" @click="cancel_fn">取消订单</div>
        <div class="btn right" v-if="tableData.order_status==2" @click="pay_fn">立即支付</div>
        <div class="btn right" v-else-if="tableData.order_status==3&&today!=date" @click="refund_fn">申请退款</div>
      </div>
    </div>

  </div>
</template>

<script>
  import U from '@/bin/common'

  export default {
    name: 'explainorder',
    data() {
      return {
        dialogVisible: true,
        c: [],
        s: [],
        tableData: {},
        gorder_id: '',
        week_list: ["日", "一", "二", "三", "四", "五", "六",],
        week: 0,
        languages: [],
        date: '',
        today: ""
      };
    },
    created() {
      this.gorder_id = this.$route.query.gorder_id;
      this.get_GuideDetail();
      this.get_TicketOrderDetail();
      this.today = U.dateFtt("yy-MM-dd", new Date());
    },
    methods: {
      // 获取订单详情
      get_TicketOrderDetail() {
        this.$api.TicketOrderDetail(localStorage.getItem('api_token'), this.gorder_id).then(res => {
          console.log(res)
          if (res.status == 1) {
            this.tableData = res.data;
            this.week = new Date(res.data.t_date).getDay();
            this.date = U.dateFtt("yy-MM-dd", new Date(res.data.t_date));
            for (let j in this.languages) {
              if (this.tableData.language_id == this.languages[j].language_id) {
                this.tableData.language_id = this.languages[j].language_name;
              }
            }
          }
        })
      },
      // 获取语种
      get_GuideDetail() {
        this.$api.GuideDetail().then(res => {
          this.languages = res.data.language;
        })
      },
      // 支付
      pay_fn() {
        this.$router.push({
          path: '/explain/pay',
          query: {gorder_id: this.tableData.gorder_id, order_sn: this.tableData.order_sn}
        })
      },
      // 申请退款
      refund_fn() {
        let that = this;
        this.$confirm('是否申请退款?', '退款', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$api.GuideorderRefund(localStorage.getItem('api_token'), that.tableData.gorder_id).then(res => {
            if (res.status == 1) {
              this.$message({
                message: '退款成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              });
            }
            this.tableData = [];
            this.get_TicketOrderDetail()
          })
        }).catch(() => {

        });
      },
      // 取消订单
      cancel_fn() {
        this.$confirm('取消订单,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.GuideOrderCancel(localStorage.getItem('api_token'), this.gorder_id).then(res => {
            if (res.status == 1) {
              this.$message({
                type: 'success',
                message: '取消成功!'
              });
              this.tableData = [];
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              });
            }
            this.get_TicketOrderDetail();
          })

        }).catch(() => {
        });

      },
    }
  };
</script>

<style lang="scss" scoped>
  .nav_hr {
    background-color: #e7e7e7;
    height: 75px;
    line-height: 75px;

    .nav_text {
      width: 1200px;
      margin: 0 auto;
      font-size: 18px;

      span {
        cursor: pointer;

        &:hover {
          color: #da9b42;
        }
      }
    }
  }

  .tickets_centre {
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
        min-width: 251px;
        color: #000;

        .order_status {
          font-size: 18px;
          padding: 15px 0 10px 0;

          span {
            color: #DA4453;
          }
        }

        .order_date {
          font-size: 18px;

          span {
            color: #55555A;
          }
        }
      }
    }
  }

  // 表格


  .order_form {
    width: 1200px;
    margin: 20px auto;

    /*/deep/ .el-table {*/
    /*  font-size: 16px;*/
    /*  color: #000;*/

    /*  .has-gutter {*/
    /*    font-size: 16px;*/
    /*    font-weight: bold;*/
    /*    color: #000;*/
    /*  }*/
    /*}*/
    .tablemessage {
      margin-top: 30px;
      margin-left: 50px;

      .clearfix::before,
      .clearfix::after {
        content: "";
        display: table;
      }

      .clearfix::after {
        clear: both;
      }

      .left {
        float: left;
      }

      .right {
        float: right;
      }

      ul {
        li {
          margin-top: 10px;
          line-height: 30px;


          &.tick {
            line-height: 30px;
          }

          .label {
            width: 163px;
            text-align: right;
            margin-right: 47px;
            font-size: 16px;
            color: #282828;
          }

          .contain {
            font-size: 16px;
            color: #000;
            font-weight: bold;
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

      /deep/ .table_list .el-table__row {
        .cell {
          text-align: center;
          font-size: 16px;
          color: #000;
        }
      }

      /deep/ .el-table th > .cell {
        color: #000;
        font-size: 16px;
        font-weight: bold;
      }
    }

    // 结算
    .total {
      text-align: right;
      margin: 50px 0;

      .total_price {
        font-size: 18px;
        padding: 30px 0 0 0;
        border-top: rgba(180, 124, 45, .3) solid 5px;
        display: inline-block;

        .n1 {
          font-size: 14px;
          text-align: center;
          color: #55555A;
        }

        .n2 {
          font-weight: bold;
          color: rgba(255, 54, 0, 1);
          line-height: 36px;
        }

        .n3 {
          font-weight: bold;
          color: rgba(255, 54, 0, 1);
          font-size: 26px;
        }
      }
    }

    .order_head {
      overflow: hidden;

      .order_title {
        padding: 0 0 16px 0;
        font-size: 16px;
        float: left;
        margin-right: 82px;

        span {
          color: #55555A;
        }
      }

    }

    .order_total_price {
      border: 1px solid #EBEEF5;
      border-top: 0;
      padding: 22px 12px 11px 0;

      .price_item {
        display: inline-block;
        width: 49%;
        text-align: right;
        font-size: 20px;

        &:last-child {
          color: #D71212;
        }

        .price {
          font-size: 16px;
        }
      }
    }

    .order_btn {
      width: 623px;
      overflow: hidden;
      margin: 100px auto;

      .btn {
        width: 220px;
        border-radius: 24px;
        text-align: center;
        height: 48px;
        font-size: 16px;
        line-height: 48px;
        cursor: pointer;
      }

      .left {
        border: 1px solid #C39657;
        float: left;
      }

      .right {
        background-color: #C39657;
        color: #fff;
        float: right;
        user-select: none;

        &:active {
          opacity: .7;
        }
      }

      .reorder {
        float: none;
        margin: 0 auto;
      }
    }
  }
</style>
