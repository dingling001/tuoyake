<template>
  <div class="container">
    <div>
      <ul class="top_nav">
        <li v-for="(a,i) in topNav" :class="{'span_active':curIndex==i}" @click="chooseItem(i,a.status)" :key="i">{{a.name}}</li>
      </ul>
      <div v-loading="loading" element-loading-text="拼命加载中">
        <el-table :data="tableData" style="width: 100%" header-row-class-name="table_header" cell-class-name="table_cell" :stripe="true">
          <!--  height="525" -->
          <el-table-column prop="order_sn" label="订单编号" width="175" align="center"></el-table-column>
          <el-table-column prop="add_time" label="下单时间" width="175" align="center"></el-table-column>
          <el-table-column label="参观日期(时段)" width="180" align="center">
            <template slot-scope="scope">{{scope.row.t_date}} {{scope.row.time_period}}</template>
          </el-table-column>
          <el-table-column prop="people_num" label="参观人数" width="90" align="center"></el-table-column>
          <el-table-column label="订单金额(元)" width="120" align="center">
            <template slot-scope="scope">
              ￥{{scope.row.order_amount}}
            </template>
          </el-table-column>
          <el-table-column prop="order_status_show" label="订单状态" width="100" align="center"></el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <!-- 订单状态，1待审核，2待支付，3已完成（已付款），5已取消，6已退款，7审核未通过 -->
            <template slot-scope="scope">
              <el-button size="mini" class="btn_cancel" v-if="scope.row.order_status==1" @click="cancelOrder(scope.row.torder_id);">取消订单</el-button>
              <el-button size="mini" class="btn_cancel" v-if="scope.row.order_status==2" @click="$router.push({path:'/pw/team/order_pay',query:{'torder_id':scope.row.torder_id}})">支付</el-button>
              <el-button size="mini" @click="$router.push({path:'/pw/team/order_detail',query:{'torder_id':scope.row.torder_id}})">查看详情</el-button>
            </template>
          </el-table-column>
          <div slot="empty">
            <img src="../../../../img/teampw/icon2.png" alt>
            <div class="">您还没有进行过预约<br>
              <router-link to="/pw/team/index">快去预约吧~</router-link>
            </div>
          </div>
        </el-table>
        <pagination :totalPages="totalPages" @presentPage="toPresentPage" v-if="totalPages > 1" style="width: 960px;margin: 20px 0;"></pagination>
      </div>
    </div>
  </div>
</template>
<script>
import pagination from "@/components/pcpaging";

export default {
  data() {
    return {
      apiToken: localStorage.api_token || "",
      topNav: [
        { name: "全部", status: "" },
        { name: "待支付", status: 2 },
        { name: "待参观", status: 3 },
        { name: "已取消", status: 5 },
      ],
      loading: false,
      curIndex: 0, //当前导航栏
      status: "",
      pageNum: 1,
      pageSize: 10, //每页条数
      tableData: [],
      totalPages: 1, //总页数
    };
  },
  components: {
    pagination
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      this.$api.PW_PC_teamTicketOrderList(this.apiToken, this.pageSize, this.pageNum, this.status).then(res => {
        this.loading = false;
        if (res.status == 1) {
          // console.log(res);
          this.tableData = res.data.orders;
          this.totalPages = res.data.total > this.pageSize ? Math.ceil(res.data.total / this.pageSize) : 1;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        this.loading = false;
      })
    },
    /**
     * @条件筛选
     */
    chooseItem(index, status) {
      if (this.curIndex == index) return;
      this.pageNum = 1; //当前页码重置
      this.totalPages = 1; //总页数重置
      this.curIndex = index;
      this.status = status;
      this.getList();
    },
    /**
     * @分页切换（当前页面）
     */
    toPresentPage(num) {
      this.pageNum = num;
      this.getList();
    },
    /**
     * @取消订单
     */
    cancelOrder(torder_id) {
      this.$confirm('是否取消订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.PW_PC_teamTicketOrderCancel(this.apiToken, torder_id).then(res => {
          if (res.status == 1) {
            // console.log(res)
            this.$message({
              message: '您已成功取消订单',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getList();
              }
            });
          } else {
            this.$message.error(res.msg);
          }
        }).catch(err => {})
      }).catch(() => {});
    },
  }
};

</script>
<style lang="scss" scoped>
.container {
  width: 960px;
  margin: 0 auto;
  padding-top: 15px;

  ul.top_nav {
    overflow: hidden;
    padding: 24px 0;
    background: rgba(56, 67, 85, 0.1);

    li {
      width: 25%;
      text-align: center;
      float: left;
      font-size: 16px;
      color: #8b8b8b;
      font-weight: bold;
      cursor: pointer;

      &+li {
        border-left: 1px #aaaaaa solid;
      }

      &:hover {
        color: #b47c2d;
      }

      &.span_active {
        color: #b47c2d;
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

  /deep/ .el-table {
    min-height: 750px;

    .table_header {
      font-weight: bold;
      font-size: 16px;
      color: #000;

      th {
        padding: 25px 0;
      }
    }

    .table_cell {
      font-size: 16px;
      color: #000;

      .el-button {
        display: block;
        min-width: 88px;
        color: #b47c2d;
        border-color: #b47c2d;
        border-radius: 15px;
        margin: 0;

        //取消订单
        &.btn_cancel {
          color: #fff;
          background-color: #B17A2C;
        }

        &+.el-button {
          margin-top: 10px;
        }
      }

      .el-button--mini {
        font-size: 14px;
      }

      .el-button--warning {
        color: #fff;
        background-color: #b47c2d;
      }
    }

    /deep/ .el-table__empty-block {
      padding: 150px 0;

      .el-table__empty-text {
        line-height: 30px;
        font-size: 14px;

        img {
          width: 415px;
        }

        a {
          color: #B47C2D;
          cursor: pointer;
        }
      }
    }
  }

  .user-main {
    margin-top: 30px;
    border-top: 1px solid #b47c2d;
    padding: 20px 0;
    display: flex;

    .user-r {
      float: right;
      width: 960px;
      margin-left: 15px;
    }
  }
}

</style>
