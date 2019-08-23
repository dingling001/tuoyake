<template>
  <!-- 右侧部分 -->
  <div class="user-r">
    <div class="film_top">
      <span
        v-for="(item,index) in top_nav"
        :class="{span_active:ind==index}"
        @click="top_fun(index,item.status)"
        :key="index"
      >{{item.name}}</span>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-row-class-name="table_header"
      :cell-class-name="table_cell"
      v-loading="film_loading"
    >
      <el-table-column prop="order_no" label="订单编号" width="100" align="center"></el-table-column>
      <el-table-column prop="created_at" label="下单时间" width="120" align="center"></el-table-column>
      <el-table-column prop="cinema_name" label="影院名称" width="100" align="center"></el-table-column>
      <el-table-column prop="movie_name" label="影片名称" width="140" align="center"></el-table-column>
      <el-table-column label="日期场次" width="120" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.date&&scope.row.start_time">
            <span>{{scope.row.date}}</span>
            <span>{{scope.row.start_time}}</span>
          </div>
          <div v-else>-</div>
        </template>
      </el-table-column>
      <el-table-column prop="seat_num" label="张数" width="60" align="center"></el-table-column>
      <el-table-column prop="amount" label="订单金额" width="120" align="center"></el-table-column>
      <el-table-column label="订单状态" width="100" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status==1">待支付</span>
          <span v-else-if="scope.row.status==2">已支付</span>
          <span v-else-if="scope.row.status==3">已取消</span>
          <span v-else-if="scope.row.status==4">已完成</span>
          <span v-else-if="scope.row.status==5">已过期</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            v-if="scope.row.status==1"
            @click="go_detail(scope.row.order_id)"
          >立即支付</el-button>
          <el-button
            size="mini"
            v-if="scope.row.status==2||scope.row.status==1"
            @click="send_FilmCancelOrder(scope.row.order_id)"
          >取消订单</el-button>
          <el-button
            size="mini"
            @click="go_detail(scope.row.order_id)"
            :disabled="!scope.row.date&&!scope.row.start_time"
          >查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :totalPages="counts"
      @presentPage="getPresentPage"
      :pageSize="take"
      v-if="counts > 1"
      style="width: 960px;margin: 20px 0;"
    ></pagination>
  </div>
</template>

<script>
import pagination from "@/components/pcpaging";

export default {
  name: "umovie",
  data() {
    return {
      top_nav: [
        { name: "全部", status: 0 },
        { name: "待支付", status: 1 },
        { name: "已取消", status: 3 },
        { name: "待观影", status: 2 },
        { name: "已结束", status: 4 }
      ],
      ind: 0,
      tableData: [],
      counts: 0,
      page: 0,
      take: 5,
      film_loading: true,
      status: 0
    };
  },
  created() {
    this.get_FilmOrderList(0, 0);
  },
  methods: {
    // 顶部导航
    top_fun(index, status) {
      this.ind = index;
      this.status = status;
      this.get_FilmOrderList(0, status);
    },
    // 分页
    getPresentPage(val) {
      this.page = val - 1;
      this.get_FilmOrderList(this.page, this.status);
    },
    // table头部样式修改
    table_header(row) {
      return "table_header";
    },
    // table内容样式修改
    table_cell() {
      return "table_cell";
    },
    // 获取列表
    get_FilmOrderList(skip, order_status) {
      this.$api
        .FilmOrderList(
          localStorage.api_token,
          order_status,
          skip * this.take,
          this.take
        )
        .then(res => {
          this.film_loading = false;
          this.tableData = res.data.order_list;
          this.counts = Math.ceil(res.data.count / this.take);
        });
    },
    // 查看详情
    go_detail(order_id) {
      this.$router.push({
        path: "/film/film_order",
        query: { order_id: order_id }
      });
    },
    // 退款
    send_FilmCancelOrder(order_id) {
      this.$confirm("取消订单,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .FilmCancelOrder(localStorage.getItem("api_token"), order_id)
            .then(res => {
              if (res.status == 1) {
                this.$message({
                  type: "success",
                  message: "取消成功!"
                });
                this.get_FilmOrderList(this.ind, this.status);
              } else {
                this.$message({
                  message: res.msg,
                  type: "error"
                });
              }
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
.user-r {
  float: right;
  width: 970px;
  margin-left: 0px;
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
</style>
