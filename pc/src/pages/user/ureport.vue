<template>
  <div>
    <!-- 右侧部分 -->
    <div class="user-r">
      <div class="film_top">
        <!--<span>全部</span>-->
        <span
          v-for="(item,index) in top_nav"
          :class="{span_active:ind==index}"
          @click="top_fun(index)"
        >{{item.name}}</span>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-row-class-name="table_header"
        :cell-class-name="table_cell"
        v-loading="explain_loading"
      >
        <el-table-column prop="order_sn" label="订单编号" width="220" align="center"></el-table-column>
        <el-table-column label="讲解日期（时段）" width="160" align="center">
          <template slot-scope="scope">
            <div style="margin-bottom: 15px">{{scope.row.t_date}}</div>
            <div>{{scope.row.time_period_show}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="people_num" label="参观人数" width="120" align="center"></el-table-column>
        <el-table-column label="语种" width="80" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.language_id">{{scope.row.language_id}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="guide_num" label="讲解员数量" width="120" align="center"></el-table-column>
        <el-table-column prop="order_amount" label="费用" width="60" align="center"></el-table-column>
        <el-table-column prop="order_status_show" label="订单状态" width="100" align="center"></el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              v-if="scope.row.order_status==2"
              @click="go_pay(scope.row.gorder_id,scope.row.order_sn)"
            >立即支付</el-button>
            <el-button
              size="mini"
              v-if="scope.row.order_status==2"
              @click="cancel_fn(scope.row.gorder_id,scope.row.order_sn)"
            >取消订单</el-button>
            <el-button
              size="mini"
              type="warning"
              v-else-if="scope.row.order_status==3"
              @click="go_refund(scope.row.gorder_id)"
            >申请退款</el-button>
            <el-button size="mini" @click="go_detail(scope.row.gorder_id)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :totalPages="counts"
        @presentPage="getPresentPage"
        :pageSize="limit"
        v-if="counts > 1"
        style="width: 960px;margin: 20px 0;"
      ></pagination>
    </div>
  </div>
</template>
<script>
import pagination from "@/components/pcpaging";

export default {
  name: "ureport",
  data() {
    return {
      top_nav: [{ name: "全部", order_status: "" }],
      ind: 0,
      tableData: [],
      explain_loading: true,
      counts: 0,
      offset: 0,
      limit: 4,
      languages: [],
      p: 0
    };
  },
  created() {
    this.get_MyGuideOrder(this.offset);
    this.get_GuideDetail();
  },
  methods: {
    // 顶部导航
    top_fun(index) {
      this.ind = index;
      this.get_MyGuideOrder(0, this.top_nav[index].order_status);
    },
    // 分页
    getPresentPage(val) {
      this.p = val;
      this.get_MyGuideOrder(val - 1, this.top_nav[this.ind].order_status);
    },
    // table头部样式修改
    table_header(row) {
      return "table_header";
    },
    // table内容样式修改
    table_cell() {
      return "table_cell";
    },
    // 获取预约列表
    get_MyGuideOrder(offset, order_status) {
      this.$api
        .MyGuideOrder(
          localStorage.api_token,
          offset * this.limit,
          this.limit,
          1,
          order_status
        )
        .then(res => {
          if (res.status == 1) {
            this.explain_loading = false;
            this.tableData = res.data.orders;
            this.counts = Math.ceil(res.data.counts / this.limit);
            for (let i in this.tableData) {
              for (let j in this.languages) {
                if (
                  this.tableData[i].language_id == this.languages[j].language_id
                ) {
                  this.tableData[i].language_id = this.languages[
                    j
                  ].language_name;
                }
              }
            }
          }
        });
    },
    // 获取语种
    get_GuideDetail() {
      this.$api.GuideDetail().then(res => {
        this.languages = res.data.language;
        for (let i in res.data.order_status) {
          this.top_nav.push({
            name: res.data.order_status[i],
            order_status: i
          });
        }
      });
    },
    // 查看详情
    go_detail(gorder_id) {
      this.$router.push({
        path: "/explain/explainorder",
        query: { gorder_id: gorder_id }
      });
    },
    // 去支付
    go_pay(gorder_id, order_sn) {
      this.$router.push({
        path: "explain/pay",
        query: { gorder_id: gorder_id, order_sn: order_sn }
      });
    },
    // 退款
    go_refund(gorder_id) {
      let that = this;
      this.$confirm("是否申请退款?", "退款", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.$api
            .GuideorderRefund(localStorage.getItem("api_token"), gorder_id)
            .then(res => {
              if (res.status == 1) {
                this.$message({
                  message: "退款成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: res.msg,
                  type: "error"
                });
              }
              this.tableData = [];
              this.get_MyGuideOrder(
                this.p - 1,
                this.top_nav[this.ind].order_status
              );
            });
        })
        .catch(() => {});
    },
    // 取消订单
    cancel_fn(gorder_id, sn) {
      this.$confirm("取消订单,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .GuideOrderCancel(localStorage.getItem("api_token"), gorder_id)
            .then(res => {
              if (res.status == 1) {
                this.$message({
                  type: "success",
                  message: "取消成功!"
                });
              } else {
                this.$message({
                  message: res.msg,
                  type: "error"
                });
              }
              this.get_MyGuideOrder(
                this.p - 1,
                this.top_nav[this.ind].order_status
              );
            });
        })
        .catch(() => {});
    }
  },
  components: {
    pagination
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

  .top {
    width: 100%;
    height: 172px;
    background: url(../.././img/u_t.png) no-repeat;
    background-size: cover;
  }

  .user-main {
    margin-top: 30px;
    border-top: 1px solid #b47c2d;
    padding: 20px 0;
    display: flex;

    .user-r {
      float: right;
      width: 960px;
      .film_top {
        overflow: hidden;
        padding: 24px 54px;
        background: rgba(56, 67, 85, 0.1);

        span {
          width: 20%;
          text-align: center;
          float: left;
          border-right: 1px #aaaaaa solid;
          font-size: 16px;
          color: #8b8b8b;
          cursor: pointer;
          font-weight: bold;

          &:last-child {
            border: 0;
          }
        }

        .span_active {
          color: #b47c2d;
        }
      }

      /deep/ .el-table {
        /*min-height: 100vh;*/
        .el-table__row {
          height: 120px;
        }

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
            margin: 0 0 10px 0;
            color: #b47c2d;
            border-color: #b47c2d;
            border-radius: 13px;

            &:last-child {
              margin: 0;
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
      }
    }
  }
}
</style>
