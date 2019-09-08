<template>
  <div style="position: relative;">
    <!-- 右侧部分 -->
    <div class="user-r" v-if="isRecord">
      <div class="film_top">
        <span
          v-for="(item,index) in top_nav"
          :class="{span_active:ind==index}"
          :key="index"
          @click="top_fun(index,item.status)"
        >{{item.name}}</span>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-row-class-name="table_header"
        :cell-class-name="table_cell"
        v-loading="data_loading"
      >
        <el-table-column prop="order_sn" label="订单编号" width="220" align="center"></el-table-column>
        <el-table-column label="下单时间" width="150" align="center">
          <template slot-scope="scope">
            <div style="margin-bottom: 5px">{{scope.row.add_time.split(' ')[0]}}</div>
            <div>{{scope.row.add_time.split(' ')[1]}}</div>
          </template>
        </el-table-column>
        <el-table-column label="参观日期（时段）" width="150" align="center">
          <template slot-scope="scope">
            <div style="margin-bottom: 5px">{{scope.row.t_date}}</div>
            <div>{{ scope.row.time_period }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="people_num" label="参观人数" width="100" align="center"></el-table-column>
        <el-table-column prop="order_amount" label="订单金额（元）" width="150" align="center"></el-table-column>
        <el-table-column prop="order_status_show" label="订单状态" width="90" align="center"></el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              v-if="scope.row.order_status==2"
              @click="go_pay(scope.row.torder_id,scope.row.order_sn, scope.row.order_status)"
            >立即支付</el-button>
            <el-button
              size="mini"
              v-if="scope.row.order_status==2"
              @click="go_cancel(scope.row.torder_id)"
            >取消订单</el-button>
            <el-button
              class="btn"
              type="warning"
              size="mini"
              v-if="false"
              @click="go_refund(scope.row.torder_id,scope.$index+1)"
            >退票</el-button>
            <el-button size="mini" @click="go_detail(scope.row.torder_id)">查看详情</el-button>
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
    <!-- 没有记录的时候的页面状态 -->
    <div class="user-r" v-if="!isRecord">
      <div class="center">
        <img src="../../img/tickets/12.png" alt />
        <p>您还没有进行过预约</p>
        <p>快去预约吧~</p>
      </div>
    </div>
  </div>
</template>
<script>
import uNav from '../../components/uNav';
import pagination from '@/components/pcpaging';

export default {
  name: 'uticket',
  data() {
    return {
      top_nav: [
        { name: '全部', status: 0 },
        { name: '待支付', status: 2 },
        { name: '已取消', status: 5 },
        { name: '待参观', status: 3 },
        { name: '已结束', status: 3 },
      ],
      ind: 0,
      tableData: [],
      data_loading: true,
      counts: 0,
      offset: 0,
      limit: 10,
      // 状态值
      status: 0,
      isRecord: true,
      // 解决同一个状态码不同订单状态问题，总分页数的问题
      pageFlag: true,
      // 是否可以进行退票，在订单详情中来改变这个值
      canrefund: false,
    };
  },
  created() {
    this.get_MyGuideOrder(this.offset);
    // this.$api.getMyOrderRcord(localStorage.api_token).then(res => {
    //   if (res.status === 1) {
    //     res.data.orders.length && (this.isRecord = true);
    //   }
    // });
  },
  computed: {},
  methods: {
    // 顶部导航
    top_fun(index, status) {
      this.data_loading = true;
      this.ind = index;
      this.status = status;
      this.offset = 0;
      this.pageFlag = true;
      if (status == 3) {
        this.get_MyGuideOrder(null, status, index, null);
      } else {
        this.get_MyGuideOrder(this.offset, status, index);
      }

      // console.log(status);
    },
    // 分页
    getPresentPage(val) {
      this.pageFlag = false;
      this.data_loading = true;
      if (this.status == 3) {
        this.get_MyGuideOrder(null, this.status, this.ind, null, val);
      } else {
        this.get_MyGuideOrder(val, this.status);
      }

      console.log('val:', val);
    },
    // table头部样式修改
    table_header(row) {
      console.log(row);
      return 'table_header';
    },
    // table内容样式修改
    table_cell() {
      return 'table_cell';
    },
    // 获取预约列表
    /*
    @offset : 翻页的偏移量，主要为了翻页使用
    @status ： 订单的状态码，筛选使用
    @ind ： 筛选菜单列表的索引，主要为了解决在status为3时来区分筛选的是待参观的还是已过期的门票
    @limit ：每页的条数
    @val ：翻页时传入的，当前页数，为了解决，stauts为3时的翻页的问题
    */
    get_MyGuideOrder(offset, status, ind, limit = this.limit, val = 1) {
      this.$api
        .getMyOrderRcord(localStorage.api_token, status, offset, limit)
        .then(res => {
          if (res.status == 1) {
            this.data_loading = false;
            this.tableData = res.data.orders;
            this.counts = res.data.last_page;
            console.log(this.counts);
            // 根据order_status_show判断是已过期还是待参观的订单
            if (status == 3) {
              var list = []; // 待参观
              var listOther = []; // 已过期
              this.tableData.forEach((item, index) => {
                if (item.order_status_show == '预约成功') {
                  list.push(item);
                } else if (item.order_status_show == '已过期') {
                  listOther.push(item);
                  // console.log(item);
                }
              });

              if (ind == 3) {
                this.tableData = list.slice(
                  val == 1 ? 0 : this.limit * (val - 1),
                  this.limit * val
                );
                console.log(this.tableData);

                this.counts =
                  list.length - this.limit > 0
                    ? list.length % this.limit == 0
                      ? list.length / this.limit
                      : Math.ceil(list.length / this.limit)
                    : 1;
              }

              if (ind == 4) {
                this.tableData = listOther.slice(
                  val == 1 ? 0 : this.limit * (val - 1),
                  this.limit * val
                );
                console.log(this.tableData);

                this.counts =
                  listOther.length - this.limit > 0
                    ? listOther.length % this.limit == 0
                      ? listOther.length / this.limit
                      : Math.ceil(listOther.length / this.limit)
                    : 1;
              }
            }

            // 判断全部时候是否有数据，来判断是否有记录
            if (!status) {
              if (this.tableData.length) {
                this.isRecord = true;
              } else {
                this.isRecord = false;
              }
            }
            console.log(res);
            console.log(offset, status);
            console.log(this.counts);
            // this.counts = Math.ceil(res.data.counts / this.limit)
          } else {
            console.log(res);
            this.data_loading = false;
          }
        });
    },

    // 查看详情
    go_detail(torder_id) {
      this.$router.push({
        path: '/pw/person/order_detail',
        // path: '/test',
        query: { torder_id: torder_id },
      });
    },
    // 退票
    go_refund(torder_id, index) {
      this.$router.push({
        path: '/pw/person/refund',
        query: {
          torder_id: torder_id,
          // refund: index
        },
      });
      console.log(index);
    },
    // 去支付页面
    go_pay(torder_id, order_sn, order_status) {
      this.$router.push({
        path: '/pw/person/pay',
        query: {
          torder_id,
          order_sn,
          order_status,
        },
      });
    },
    // 取消订单
    go_cancel(torder_id) {
      this.$confirm('取消订单,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api
            .postCancelMyOrder(localStorage.getItem('api_token'), torder_id, 1)
            .then(res => {
              console.log(res);
              console.log(res);
              if (res.status == 1) {
                this.$message({
                  type: 'success',
                  message: '取消成功!',
                });
                if (this.timeId) {
                  clearInterval(this.timeId);
                }
                this.get_MyGuideOrder(this.offset);
                this.$router.push('/person');
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error',
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          });
        });
    },
    // 显示是否可以退票
    getCanRefund(order_id) {
      var flag = false;
      var canrefund = false;
      this.$api
        .getMyOrderDetial(localStorage.getItem('api_token'), order_id)
        .then(res => {
          if (res.status === 1) {
            canrefund = res.data.can_refund;
          }

          console.log(res);
          flag = true;
        });
      return canrefund;
    },
  },
  components: {
    uNav,
    pagination,
  },
};
</script>
<style scoped lang="scss">
/** @format */

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
      position: relative;
      width: 960px;
      min-height: 720px;
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
        min-height: 100vh;

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
            width: 80px;
            height: 25px;
            // color: #b47c2d;
            line-height: 25px;
            padding: 0;
            color: #b47c2d;
            border-color: #c39657;
            border-radius: 13px;
            &:hover {
              background-color: #ffffff;
            }
            &.el-button--warning {
              &:hover {
                background-color: #c39657;
              }
            }
            &:last-child {
              margin: 0;
            }
          }

          .el-button--mini {
            font-size: 14px;
          }

          .el-button--warning {
            color: #fff;
            background-color: #c39657;
          }
        }
      }
    }
    .center {
      position: absolute;
      top: 20%;
      left: 50%;
      margin-left: -100px;
      margin-top: -100px;
      // width: 200px;
      width: 400px;
      line-height: 2;
      p {
        text-align: center;
        // line-height: 60px;
        margin-top: 20px;
        &:first-of-type {
          font-size: 20px;
          color: #000;
        }
        &:last-child {
          font-size: 20px;
          color: #b47c2d;
          font-weight: 600;
        }
      }
      img {
        width: 100%;
      }
    }
  }
}
</style>
