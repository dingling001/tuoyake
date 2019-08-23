<template>
  <div class="container">
    <!-- 步进条 -->
    <ProgressBar progressTitle="确认订单" :progressActiveNum="3"></ProgressBar>
    <!-- header -->
    <div class="header">
      <div class="preson">
        <p class="circle"></p>
        <span class="preson__title">团队信息</span>
        <div class="preson__right">
          <span>参观日期</span>
          <span>{{visitDate}}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="card">
        <h3 class="title">团队信息</h3>
        <ul class="info">
          <li class="name clearfix">
            <span>团体类型</span>
            <span>{{teamInfo.team_type_name}}</span>
          </li>
          <li class="name clearfix">
            <span>团体名称</span>
            <span>{{teamInfo.teamname}}</span>
          </li>
        </ul>
      </div>
      <div class="card">
        <h3 class="title">联系人信息</h3>
        <ul class="info">
          <li class="name clearfix">
            <span>联系人姓名</span>
            <span>{{ruleForm.name}}</span>
          </li>
          <li class="name clearfix">
            <span>身份证号</span>
            <span>{{ruleForm.idcard}}</span>
          </li>
          <li class="name clearfix">
            <span>领队电话</span>
            <span>{{ruleForm.phone}}</span>
          </li>
          <li class="name clearfix">
            <span>行程单号</span>
            <span>{{ruleForm.tripNum || "无"}}</span>
          </li>
        </ul>
      </div>
      <div class="card">
        <h3 class="title">参观者信息</h3>
        <ul class="info">
          <li class="name clearfix">
            <span style="line-height: 40px;">参观者名单</span>
            <span>
              <el-button class="check__btn" @click="dialogVisible = true">查看名单</el-button>
            </span>
          </li>
          <li class="name clearfix">
            <span>参观人数</span>
            <span style="color: #B47C2D;">{{ruleForm.visitNum}}人</span>
          </li>
          <li class="name clearfix">
            <span style="line-height: 40px;">参观公函</span>
            <span>
              <el-button class="check__btn" @click="attaVisible = true">查看参观公函</el-button>
            </span>
          </li>
        </ul>
      </div>
      <div class="card tickets">
        <h3 class="title">参观票</h3>
        <ul class="info">
          <li v-for="(item, index) in ruleForm.tickets" :key="index">
            <span>{{item.ticket_name}}</span>
            <span style="float: right;">¥{{item.ticket_price}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="count">
      <span>总计：</span>
      <span>￥ {{calcPrice}}</span>
    </div>
    <div class="btn-wrap">
      <el-button class="btn back" @click="$router.back()">上一步</el-button>
      <el-button class="btn sub" @click="submitForm" :loading="submitLoading">{{submitLoading?"提交中...":"提交审核"}}</el-button>
    </div>
    <el-dialog title="团体预约观众信息登记" :lock-scroll="false" :visible.sync="dialogVisible">
      <table>
        <tr>
          <td>姓名</td>
          <td>证件类型</td>
          <td>证件号</td>
        </tr>
        <tr class="info-item" v-for="(item, index) in ruleForm.toi_username" :key="index">
          <td>{{item}}</td>
          <td>{{ruleForm.toi_cardtype[index]}}</td>
          <td>{{ruleForm.toi_card_num[index]}}</td>
        </tr>
      </table>
    </el-dialog>
    <el-dialog title="团体预约参观公函" :lock-scroll="false" :visible.sync="attaVisible">
      <div class="atta" v-for="(item,index) in ruleForm.proveAtta">
        <img :src="item.url" />
        <span>{{item.name}}</span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios';
import localforage from "localforage";
import ProgressBar from '../common/progressBar.vue';
import { Session } from '@/bin/cache.js';


export default {
  name: "fillinfo_confirm",
  data() {
    return {
      apiToken: localStorage.api_token || "",
      td_tp_id: Session.get('hbpw_team__td_tp_id'),
      visitDate: Session.get("hbpw_team__td_txt") + Session.get("hbpw_team__td_tp_txt"),
      teamInfo: "", //团体信息
      ticketsInfo: [], //门票详情
      ruleForm: {
        name: "", //领队姓名
        idcard: "", //身份证号
        phone: "", //联系电话
        tripNum: "", //行程单号
        files: [], // 人员名单文件对象存储，上传excel检查
        proveAtta: [], // 社会公函文件对象存储，上传excel检查
        visitNum: 0, //参观人数
        tickets: [], //已选门票（动态添加）
        ticketsId: [], //已选门票id
        toi_username: [], //上传的姓名数组
        toi_cardtype: [], //上传的证件类型数组
        toi_cardtype_id: [], //上传的证件类型id数组
        toi_card_num: [], //上传的证件号码数组
      },
      dialogVisible: false, //名单弹层
      attaVisible: false, //公函弹层
      submitLoading: false,
    };
  },
  components: {
    ProgressBar
  },
  computed: {
    calcPrice() {
      if (this.ruleForm.tickets.length == 0) return;
      let price = 0;
      for (let item of this.ruleForm.tickets) {
        price += parseFloat(item.ticket_price, 10) * (this.ruleForm.visitNum || 1);
      }
      return price.toFixed(2);
    }
  },
  created() {
    this.getTeamInfo();
    this.getTeamTicketsDetail();
  },
  methods: {
    /**
     * @获取团体信息
     */
    getTeamInfo() {
      this.$api.PW_PC_teamInfo(this.apiToken).then(res => {
        if (res.status == 1) {
          // console.log(res)
          this.teamInfo = res.data;
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    /**
     * @获取团体门票详情
     */
    getTeamTicketsDetail() {
      this.$api.PW_PC_teamTicketD(this.apiToken, this.td_tp_id).then(res => {
        // console.log(res)
        if (res.status == 1) {
          this.ticketsInfo = res.data.pt_tickets;
          this.getForm();
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 1500,
            onClose: () => {
              this.$router.replace('/pw/team/index');
            }
          });
        }
      })
    },
    /**
     * @数据回填
     */
    getForm() {
      localforage.getItem('hbpw_team__fill_form').then(res => {
        // console.log(res)
        if (!!res) {
          for (let i in res.ticketsId) {
            let index = this.ticketsInfo.findIndex(o => res.ticketsId[i] == o.td_tp_id);
            if (index == -1) res.ticketsId.splice(i, 1);
          }
          if (!res.ticketsId.length) {
            this.$message({
              message: "门票信息错误，请重新选择门票！",
              type: 'error',
              duration: 1500,
              onClose: () => {
                this.$router.replace('/pw/team/fillinfo');
              }
            });
            return;
          } else {
            //根据td_tp_id筛选已选门票
            let tickets = [];
            res.ticketsId.forEach(id => {
              let arr = this.ticketsInfo.filter(o => id == o.td_tp_id);
              tickets.push(...arr);
            })
            res.proveAtta.forEach(item => {
              item.url = this.getImgUrl(item.raw); //图片回显
            })
            this.ruleForm = res;
            this.ruleForm.tickets = tickets;
          }
        }
      })
    },
    getImgUrl(file) {
      return window[window.webkitURL ? 'webkitURL' : 'URL'].createObjectURL(new Blob([file]));
    },
    /**
     * @提交预约
     */
    submitForm() {
      let formData = new FormData();
      formData.append('p', 'w');
      formData.append('api_token', this.apiToken);
      formData.append('contact_username', this.ruleForm.name);
      formData.append('contact_idcard', this.ruleForm.idcard);
      formData.append('contact_phone', this.ruleForm.phone);
      formData.append('toi_prove_atta', this.ruleForm.proveAtta[0].raw);
      formData.append('toi_itinerary_no', this.ruleForm.tripNum); //行程单号（可选）
      formData.append('td_tp_id', this.ruleForm.ticketsId[0]); //基础门票ticket_id为1
      formData.append('td_tp_ids', this.ruleForm.ticketsId.slice(1)); //临展票id，英文逗号分隔（可选）

      for (var i = 0; i < this.ruleForm.toi_username.length; i++) {
        formData.append("toi_username[]", this.ruleForm.toi_username[i]);
        formData.append('toi_cardtype_id[]', this.ruleForm.toi_cardtype_id[i]);
        formData.append('toi_card_num[]', this.ruleForm.toi_card_num[i]);
      }
      //
      // console.log(formData.get('toi_prove_atta'))
      // return;
      // 
      this.submitLoading = true;
      axios.post(STATIC_PW_URL + "/api/teamticketorder", formData).then(response => {
        this.submitLoading = false;
        let res = response.data;
        if (res.status == 405) {
          this.app.openLogin();
          return;
        }
        if (res.status == 1) {
          localforage.clear();
          Session.remove('hbpw_team__td_id');
          Session.remove('hbpw_team__td_txt');
          Session.remove('hbpw_team__td_index');
          Session.remove('hbpw_team__td_tp_list');
          Session.remove('hbpw_team__td_tp_index');
          Session.remove('hbpw_team__td_tp_txt');
          Session.remove('hbpw_team__td_tp_id');
          setTimeout(() => {
            this.$router.replace({ path: '/pw/team/success', query: { 'torder_id': res.data.torder_id } });
          }, 50)
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {})
    }
  }
};

</script>
<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding-bottom: 40px;
  font-size: 16px;
  color: #282828;

  .clearfix::after,
  .clearfix::before {
    content: "";
    display: table;
  }

  .clearfix::after {
    content: "";
    clear: both;
  }

  .clearfix {
    zoom: 1;
  }

  .header {
    margin: 20px auto 0;
    width: 1200px;

    .preson {
      width: 100%;
      height: 62px;
      line-height: 62px;
      border-radius: 31px;
      background: rgba(220, 97, 58, 1);
      position: relative;

      .circle {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #fff;
        margin: 28px 18px 24px 37px;
      }

      &__title {
        color: #fff;
        padding-left: 65px;
      }

      &__right {
        position: absolute;
        right: 0;
        bottom: 3%;
        padding-right: 40px;
        font-size: 18px;
        color: #fff;

        span {
          padding-right: 5px;
        }
      }
    }
  }

  .content {
    .card {
      width: 1107px;
      margin: 0 auto;
      padding: 25px 0;

      &+.card {
        border-top: 1px solid #b47c2d;
      }

      .title {
        font-size: 20px;
      }

      .info {
        li {
          margin-top: 25px;
          overflow: hidden;

          >span {
            float: left;

            &:nth-of-type(1) {
              width: 120px;
              margin-right: 40px;
              text-align: right;
            }


          }

          .check__btn {
            background-color: #B47C2D;
            color: #fff;
          }
        }
      }

      &.tickets {
        .info {
          li {
            padding-left: 40px;

            span {
              &:nth-of-type(1) {
                width: auto;
              }
            }
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
    border-top: 5px solid rgba(180, 124, 45, 0.3);

    span {
      &:last-child {
        font-size: 18px;
        color: #fe5a00;
        font-weight: 700;
      }
    }
  }

  .btn-wrap {
    width: 650px;
    margin: 0 auto;
    text-align: center;

    .btn {
      width: 300px;
      height: 48px;
      border-radius: 24px;
      text-align: center;

      &+.btn {
        margin-left: 44px;
      }

      &.back {
        color: #000;
        border: 1px solid rgba(210, 210, 210, 1);
      }

      &.sub {
        color: #fff;
        // border: none;
        border: 1px solid #B47C2D;
        background-color: #B47C2D;
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
        .atta {
          text-align: center;

          img {
            width: 500px;
            height: auto;
          }

          span {
            display: inline-block;
            width: 100%;
            padding: 20px 0;
          }
        }
      }
    }
  }
}

</style>
