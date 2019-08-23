<template>
  <div>
    <div class="user-r">
      <div class="apply-record">
        <div class="no-data" v-if="recordList.length == 0 && requested">
          <img src="../../img/active/pc_no_data_icon.png">
          <p style="margin-top: 40px;">您还没有进行过报名</p>
          <p
            style="color: #B47C2D;cursor: pointer;"
            @click="$router.push('/active/activeList')"
          >快去报名吧～</p>
        </div>
        <div class="record-list">
          <ul>
            <li v-for="(item,index) in recordList">
              <div class="record-item-top">
                <p
                  class="apply-time"
                >参加日期及场次：{{item.active_date}} {{item.active_start_time}}-{{item.active_end_time}}</p>
                <p class="apply-num">参加人数：{{item.order_count_num}}人</p>
                <p class="order-status">{{item.order_status_name}}</p>
              </div>
              <div class="record-item-btm">
                <img :src="$toThumbsimg(item.active_img, 453, 197, 33,$active)">
                <div class="active-info">
                  <p class="active-name single-line-text">{{item.active_name}}</p>
                  <p class="active-type">{{item.cate_name}}</p>
                  <p class="active-place single-line-text">活动地点：{{item.active_place}}</p>
                  <p class="active-price">
                    <span style="font-size: 18px;">¥</span>
                    {{item.default_price}}
                  </p>
                  <div class="btn-box">
                    <input
                      type="button"
                      :value="payBtnText"
                      :class="{forbid_click1:isForbid}"
                      @click="payMoney(item.torder_id)"
                      style="color: #fff;background: #b47c2d;"
                      v-if="item.order_status == 2"
                    >
                    <input
                      type="button"
                      value="查看详情"
                      class="see-detail"
                      @click="$router.push({path:'/active/orderdetail',query:{torder_id:item.torder_id}})"
                    >
                    <input
                      type="button"
                      value="取消报名"
                      v-if="item.can_refund && item.order_status == 2"
                      @click="open2(item.order_status,item.torder_id)"
                    >
                    <input
                      type="button"
                      value="退票"
                      v-if="item.can_refund && item.order_status == 3"
                      @click="open2(item.order_status,item.torder_id)"
                    >
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <page
          :totalPages="totalPages"
          @presentPage="getPresentPage"
          v-if="totalPages > 1"
          style="width: 960px;margin: 20px 0;"
        ></page>
      </div>
    </div>
    <div class="zhezhao" v-if="showQrcode" @click="closeTc()"></div>
    <div id="qrcode" class="qrcode_box" :class="{opacity_val:showQrcode}"></div>
  </div>
</template>
<script>
import page from "../../components/pcpaging.vue";
import QRCode from "qrcodejs2";
export default {
  name: "uactive",
  data() {
    return {
      payBtnText: "支付",
      isForbid: false,
      showQrcode: false,
      recordList: [], //预约记录列表
      totalPages: 0, //总页数
      page: 1, //当前页
      statusVal: 0, //订单状态
      requested: false
    };
  },
  mounted() {
    const v = this;
    v.getOrderRecord(v.statusVal, v.page);
  },
  methods: {
    closeTc() {
      this.showQrcode = false;
      window.clearInterval(this.timer);
    },
    payMoney(val) {
      const v = this;
      v.timer = setInterval(function() {
        v.$api.orderStatus(val).then(res => {
          if (res.status == 1) {
            if (res.data.order_status == 3) {
              v.getOrderRecord(v.statusVal, v.page);
              window.clearInterval(v.timer);
              v.showQrcode = false;
              v.$message({
                type: "success",
                message: "支付成功!"
              });
            }
          } else {
            v.$message.error(res.msg);
          }
        });
      }, 500);
      v.payBtnText = "支付...";
      v.isForbid = true;
      v.$api.payOrder(val).then(res => {
        v.isForbid = false;
        v.payBtnText = "支付";
        document.getElementById("qrcode").innerHTML = "";
        if (res.status == 1) {
          v.showQrcode = true;
          let qrcode = new QRCode(document.getElementById("qrcode"), {
            width: 300,
            height: 300
          });
          qrcode.makeCode(res.data.qrcode);
        } else {
          v.$message.error(res.msg);
        }
      });
    },
    cancelOrder(val) {
      const v = this;
      v.$api.cancelApplyOrder(val).then(res => {
        if (res.status == 1) {
          v.getOrderRecord(v.statusVal, v.page);
          v.$message({
            type: "success",
            message: "取消成功!"
          });
        } else {
          v.$message.error(res.msg);
        }
      });
    },
    getRefund(val) {
      const v = this;
      v.$api.refundTickets(val).then(res => {
        if (res.status == 1) {
          v.getOrderRecord(v.statusVal, v.page);
          v.$message({
            type: "success",
            message: "退票成功!"
          });
        } else {
          v.$message.error(res.msg);
        }
      });
    },
    open2(val, val1) {
      const v = this;
      let tiptext = "";
      if (val == 2) {
        tiptext = "确定取消报名该活动?";
      } else {
        tiptext = "确定退票?";
      }
      v.$confirm(tiptext, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (val == 2) {
          v.cancelOrder(val1);
        } else {
          v.getRefund(val1);
        }
      });
    },
    getPresentPage(val) {
      const v = this;
      v.page = val;
      v.getOrderRecord(v.statusVal, v.page);
    },
    getOrderRecord(statusVal, pageVal) {
      this.$api.orderRecord(statusVal, pageVal).then(res => {
        this.requested = true;
        this.recordList = res.data.list;
        this.totalPages = Math.ceil(res.data.count / 4);
      });
    }
  },
  components: {
    page
  }
};
</script>
<style scoped>
.no-data{
	overflow: hidden;
	min-height: 900px;
}
.no-data img {
  display: block;
  margin: 0 auto;
  margin-top: 240px;
}

.no-data p {
  font-size: 20px;
  line-height: 36px;
  color: #959595;
  text-align: center;
}
.zhezhao {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
  z-index: 9999;
}

#qrcode {
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  /* IE 9 */
  -webkit-transform: translate(-50%, -50%);
  /* Safari and Chrome */
  -o-transform: translate(-50%, -50%);
  /* Opera */
  -moz-transform: translate(-50%, -50%);
  /* Firefox */
  z-index: 10000;
}

.qrcode_box {
  opacity: 0;
}

.opacity_val {
  opacity: 1;
}

.forbid_click1 {
  pointer-events: none;
}

.container {
  width: 1200px;
  margin: 0 auto;
}

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
}

.usernav {
  width: 218px;
  margin-right: 10px;
  background: rgba(219, 219, 219, 0.2);
  border: 1px solid rgba(170, 170, 170, 0.2);
}

.user-r {
  flex: 1;
}
/*fan*/

.apply-record {
  width: 960px;
}

.record-nav {
  width: 960px;
  height: 60px;
  background: #ebecee;
}

.record-nav li {
  float: left;
}

.record-nav .navs {
  font-size: 16px;
  color: #8b8b8b;
  line-height: 60px;
}

.record-nav .line {
  width: 1px;
  height: 14px;
  background: #aaa;
  margin: 23px 0;
}

.record-list li {
  width: 958px;
  height: 295px;
  border: 1px solid #aaa;
  margin: 10px 0;
}

.record-item-top {
  width: 906px;
  font-size: 16px;
  line-height: 16px;
  padding: 15px 0;
  border-bottom: 1px solid #aaa;
  overflow: hidden;
  margin: 15px 32px 15px 20px;
}

.record-item-top p {
  float: left;
  color: #000;
}

.record-item-top .order-status {
  float: right;
  color: #a82126;
}

.apply-num {
  margin-left: 70px;
}

.record-item-btm {
  margin-left: 20px;
  overflow: hidden;
}

.record-item-btm img {
  display: block;
  width: 453px;
  height: 197px;
  float: left;
}

.record-item-btm p {
  margin-left: 25px;
}

.active-info {
  float: left;
}

.btn-box {
  margin-left: 25px;
}

.active-name {
  width: 420px;
  font-size: 20px;
  color: #000;
  margin: 6px 0;
}

.active-type {
  font-size: 18px;
  color: #4a4a4a;
  margin: 15px 0;
}

.active-place {
  font-size: 16px;
  color: #585858;
  margin: 6px 0;
  width: 420px;
}

.active-price {
  font-size: 24px;
  color: #cf0a0a;
  margin: 21px 0;
}

.btn-box {
  width: 428px;
  overflow: hidden;
}

.btn-box input {
  width: 116px;
  height: 40px;
  border: 1px solid #b47c2d;
  float: right;
  border-radius: 19px;
  font-size: 16px;
  line-height: 40px;
  background: #fff;
  color: #b47c2d;
  cursor: pointer;
}

.see-detail {
  margin: 0 9px;
}
</style>