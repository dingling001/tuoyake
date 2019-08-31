<template>
  <div class="order">
    <div class="order__title">预约记录</div>
    <div class="order__list" ref="wrapper" :style="{ height: (wrapperHeight - 20) + 'px' }">
      <!-- order_status==3、33、5、6、66    已完成、已过期、已取消、已退票、部分退票  -->
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
        <ul class="tickets">
          <router-link tag="li" :to="'/enter/order_detail/'+a.torder_id" class="item" :class="{'gray':a.order_status==33 || a.order_status==5 || a.order_status==6}" v-for="(a,i) in list" :key="i">
            <div class="item__status"><span>{{a.order_status_show}}</span></div>
            <ul class="item__info">
              <li>订单编号：{{a.order_sn}} <span>{{(a.order_status==33 || a.order_status==5 || a.order_status==6) ?'详情':'详情/退票'}}<i class="iconfont iconicon_on_the_right"></i></span></li>
              <li>预约时间：{{a.add_time}}</li>
              <li>参观日期：{{a.t_date}}</li>
            </ul>
          </router-link>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
import { Indicator, Toast } from 'mint-ui';
import order from '../../../static/order_list.json';
export default {
  name: 'order_list',
  data() {
    return {
      list: [],
      pgnum: 0,
      pgsize: 10,
      preventRepeat: false, //防止重复获取
      wrapperHeight: 0,
      //可以进行上拉
      allLoaded: false,
      //是否自动触发上拉函数
      isAutoFill: false,
      wrapperHeight: 0,
    };
  },
  created() {
    this.initList();
  },
  mounted() {
    // 父控件要加上高度，否则会出现上拉不动的情况
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    document.querySelector('body').addEventListener('touchmove', function(e) {
      if (!document.querySelector('.order').contains(e.target)) {
        e.preventDefault();
      }
    })
  },
  methods: {
    // getList() {
    //   let json = {
    //     "status": 1,
    //     "msg": "",
    //     "data": [{
    //       "torder_id": 34, //预约单id
    //       "order_sn": "JS19030714273783", //预约单号
    //       "order_status": 66, //订单状态，1待审核，2待支付，3已完成（已付款），5已取消，6已退款 66部分退票
    //       "add_time": "2019-03-07 14:27:07", //下单时间
    //       "t_date": "2019-03-09", //参观日期
    //       "order_status_show": "部分退票", //订单状态显示，已过期，预约成功，待支付，已取消，已退票，部分退票
    //     }]
    //   }
    // },
    initList() {
      let v = this;
      Indicator.open({
        text: '数据加载...',
        spinnerType: 'fading-circle'
      });
      v.baseAjax(true, res => {
        // console.log(res);
        v.list = res.data;
        Indicator.close();
      });
    },


    // 下拉刷新
    loadTop() {
      let v = this;
      v.baseAjax(true, res => {
        // console.log(res);
        v.list = res.data;
        v.allLoaded = false;
        v.preventRepeat = false;

        v.$refs.loadmore.onTopLoaded();
        Toast({
          message: '刷新成功',
          iconClass: 'iconfont icontongyi',
          position: 'center',
          duration: 1000
        });
      });
      // v.$axios
      //   .get("goodslist1.json")
      //   .then(response => {
      //     v.pgnum = 0;
      //     v.allLoaded = false; // 可以进行上拉
      //     v.datas = response.data.message;
      //     v.$refs.loadmore.onTopLoaded();
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     alert("网络错误，不能访问");
      //   });
    },
    // 加载更多
    loadBottom() {
      let v = this;
      if (v.preventRepeat) {
        return;
      }
      v.baseAjax(false, res => {
        v.list = v.list.concat(res.data);
        if (res.data.length < v.pgsize) {
          v.preventRepeat = true;
          v.allLoaded = true;
          return;
        } else {
          v.preventRepeat = false;
        }
        v.$refs.loadmore.onBottomLoaded();
      });
      // this.$axios
      //   .get("goodslist.json")
      //   .then(response => {
      //     // concat数组的追加
      //     this.datas = this.datas.concat(response.data.message);
      //     if (this.courrentPage > 2) {
      //       this.allLoaded = true; // 若数据已全部获取完毕
      //     }
      //     this.courrentPage++;
      //     this.$refs.loadmore.onBottomLoaded();
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     alert("网络错误，不能访问");
      //   });
    },
    baseAjax(isReset, cb) {
      let v = this;
      if (isReset) v.pgnum = 0;
      v.$api.OrderList(v.pgsize, v.pgnum).then(res => {
        // console.log(res)
        v.pgnum++;
        "function" === typeof cb && cb(res);
      });
    },
  },
};

</script>
<style lang="scss" scoped>
.order {
  width: 100%;
  min-height: 100vh;
  padding: 0 15px;
  background-color: #F3F3F3;

  &__title {
    color: #45474E;
    text-align: center;
    font-size: 18px;
    padding: 15px 0;
  }

  &__list {
    width: 100%;
    height: 100%;
    /* 加上这个才会有当数据充满整个屏幕，可以进行上拉加载更多的操作 */
    overflow-y: scroll;

    /deep/ ul.tickets {

      .item {
        position: relative;
        width: 100%;
        height: 100px;
        font-size: 13px;
        background-position: center center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('~img/card1.png');

        &+li.item {
          margin-top: 10px;
        }

        &.gray {
          background-image: url('~img/card2.png');
        }

        &__status {
          position: absolute;
          width: 35px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          span {
            display: block;
            width: 16px;
            color: #fff;
            line-height: 1.5;
            font-size: 14px;
          }
        }

        &__info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 35px;
          height: 100%;
          padding: 5px 0;

          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px 10px 20px;


            &:nth-of-type(1) {
              border-bottom: 1px solid #F3F3F4;
            }

            span {
              color: #999999;

              i {
                color: #FFB2BA;
                margin-left: 5px;
                font-size: 10px;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
}

</style>
