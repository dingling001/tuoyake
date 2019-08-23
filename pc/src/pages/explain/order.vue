<template>
  <div>
    <div class="nav_hr">
      <div class="nav_text">
        <router-link tag="span" to="/">首页 »</router-link>
        讲解预约
      </div>
    </div>
    <!-- 功能栏 -->
    <div class="tickets_centre">
      <div class="date_title">
        <!-- 日期 -->
        <div class="date_left">
          确认信息
          <span class="line"></span>
          <span class="dian"></span>
        </div>
        <!-- 步骤条 -->
        <el-steps :active="3" align-center class="date_right">
          <el-step title="选择预约时间">
            <i class="s s1" slot="icon"></i>
          </el-step>
          <el-step title="填写预约信息">
            <i class="s s2" slot="icon"></i>
          </el-step>
          <el-step title="确认信息">
            <i class="s s3" slot="icon"></i>
          </el-step>
          <el-step title="支付">
            <i class="s s4" slot="icon"></i>
          </el-step>
          <el-step title="预约完成">
            <i class="s s5" slot="icon"></i>
          </el-step>
        </el-steps>
      </div>
    </div>
    <!-- 信息表 -->
    <div class="messages">
      <!-- 信息头部 -->
      <div class="preson">
        <p class="circle"></p>
        <span class="preson_title">预约人信息</span>
        <div class="preson-right">
          <span>预约讲解日期</span>
          <span>{{nowDate}}</span>
          <span>{{nowTime}}</span>
        </div>
      </div>
      <!-- 表格信息 -->
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
            <span class="left contain ">{{tableData.language}}</span>
          </li>
          <li class="clearfix">
            <span class="left label">讲解员</span>
            <span class="left contain ">{{tableData.guide_num}}</span>
          </li>
          <li class="clearfix">
            <span class="left label">讲解展厅</span>
            <div class="left contain" v-if="tableData.exhibition_ids!=0">
              {{exhibion_cost_data}}
            </div>
            <div v-else class="left contain">所有展厅</div>
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
      <!-- 结算 -->
      <div class="total">
                <span class="total_price">
                    <span class="n1">总计：</span><span class="n2">￥</span><span
                  class="n3">{{total_price}}.00</span>
                </span>
      </div>
      <!-- 结尾付款 -->
      <div class="footer">
        <div class="cancle" @click="$router.replace('/explain/message')">返回修改</div>
        <div class="sure" @click="pay_order">立即预约</div>
      </div>
    </div>
  </div>
</template>

<script>
  import U from '@/bin/common'

  export default {
    data() {
      return {
        tableData: {
          go_username: "",
          go_cardtype_id: '',
          contact_phone: "",
          go_card_num: "",
          people_num: 20,
          language: "",
          language_id: '',
          guide_num: 0,
          price: '',
          yy_type_id: '',
          go_teamname: '',
          card_type: '',
        },
        gd_tp_id: "",
        nowDate: '',//日期
        nowTime: '',//时间,
        total_price: 0,
        detail_info: {},
        exhibion_cost_data: ''
      };
    },
    created() {
      this.get_GuideDetail();
      if (localStorage.getItem('post') && localStorage.gd_tp_id) {
        this.gd_tp_id = localStorage.gd_tp_id;
        let post = JSON.parse(localStorage.getItem('post'));
        // console.log(post)
        this.tableData.yy_type_id = post.yy_type_id;
        this.tableData.exhibition_ids = post.exhibition_ids == 0 ? 0 : post.exhibition_ids.split(',');
        this.tableData.go_teamname = post.go_teamname;
        this.tableData.go_username = post.go_username;
        this.tableData.contact_phone = post.contact_phone;
        this.tableData.people_num = post.people_num;
        this.tableData.guide_num = post.guide_num;
        this.tableData.language_id = post.language_id;
        this.tableData.go_card_num = post.go_card_num;
        this.tableData.go_cardtype_id = post.go_cardtype_id;
        this.total_price = post.price;
      } else {
        this.$router.replace('/explain')
      }
      if (localStorage.gd_id && localStorage.nowDate && localStorage.nowTime && localStorage.gd_tp_id) {
        this.nowDate = U.dateFtt("MM月dd日", new Date(localStorage.nowDate))
        this.nowTime = localStorage.nowTime
      } else {
        this.$router.replace('/explain')
      }

    },
    methods: {
      // 获取预约详情
      get_GuideDetail() {
        this.$api.GuideDetail().then(res => {
          this.detail_info = res.data;
          var arr = [];
          for (var j in this.detail_info.exhibion_cost_data) {
            for (var i in this.tableData.exhibition_ids) {
              if (this.tableData.exhibition_ids[i] == this.detail_info.exhibion_cost_data[j].exhition_id) {
                arr.push(this.detail_info.exhibion_cost_data[i].exhition_name)
              }
            }
          }
          this.exhibion_cost_data = arr.join('、');
          if (localStorage.getItem('post') && localStorage.gd_tp_id) {
            var post = JSON.parse(localStorage.getItem('post'));
            for (var j in this.detail_info.language) {
              if (this.detail_info.language[j].language_id == post.language_id) {
                this.tableData.language = this.detail_info.language[j].language_name;
              }
            }
            for (var k in this.detail_info.cardtype) {
              if (this.detail_info.cardtype[k].cardtype_id == post.go_cardtype_id) {
                this.tableData.card_type = this.detail_info.cardtype[k].card_type
              }
            }
          }
        });
      },
      // 去支付
      pay_order() {
        this.$api.Guideorder(localStorage.api_token,
          this.tableData.yy_type_id,
          this.tableData.go_teamname,
          this.tableData.exhibition_ids.toString(),
          this.gd_tp_id,
          this.tableData.go_username,
          this.tableData.go_cardtype_id,
          this.tableData.go_card_num,
          this.tableData.contact_phone,
          this.tableData.people_num,
          this.tableData.language_id,
          this.tableData.guide_num).then((res) => {
          // console.log(res.status)
          if (res.status == 1) {
            this.$router.replace({
              path: '/explain/pay',
              query: {
                gorder_id: res.data.gorder_id,
                order_sn: res.data.order_sn,
                order_status: res.data.order_status
              }
            });
            localStorage.removeItem('post');
            localStorage.removeItem('nowDate');
            localStorage.removeItem('nowTime');
            localStorage.removeItem('gd_tp_id');
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      },

    }
  };
</script>

<style lang="scss" scoped>
  .nav_hr {
    background-color: #E7E7E7;
    height: 75px;
    line-height: 75px;

    .nav_text {
      width: 1200px;
      margin: 0 auto;
      font-size: 18px;

      span {
        cursor: pointer;

        &:hover {
          color: #DA9B42;
        }
      }
    }
  }

  .tickets_centre {
    font-family: PingFangSC-Regular;
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
        width: 867px;
        color: #000;
        margin-right: -50px;
        text-align: center;

        /deep/ .el-step__title {
          font-size: 16px;
          color: #000;
        }

        /deep/ .el-step__title.is-finish {
          color: #b47c2d;
        }

        /deep/ .el-step__title.is-process {
          font-weight: normal;
        }

        /deep/ .is-finish .s1 {
          background-image: url("../../img/tickets/01.png");
        }

        /deep/ .is-finish .s2 {
          background-image: url("../../img/tickets/02.png");
        }

        /deep/ .is-finish .s3 {
          background-image: url("../../img/tickets/03.png");
        }

        /deep/ .is-finish .s4 {
          background-image: url("../../img/tickets/04.png");
        }

        /deep/ .is-finish .s5 {
          background-image: url("../../img/tickets/05.png");
        }

        /deep/ .el-step__icon {
          width: 53px;
          height: 53px;
          background-color: #fff;
          overflow: hidden;
          border-style: hidden;
        }

        /deep/ .el-step.is-horizontal .el-step__line {
          top: 25px;
          border-color: #a0a0a0;
          z-index: -1;
        }

        .s {
          width: 50px;
          height: 50px;
          margin: 0 5px;
          background-color: #fff;
          display: inline-block;
          background-repeat: no-repeat;
          background-size: 100% auto;
          background-position: center center;
        }

        .s1 {
          background-image: url("../../img/tickets/1.png");
        }

        .s2 {
          background-image: url("../../img/tickets/2.png");
        }

        .s3 {
          background-image: url("../../img/tickets/3.png");
        }

        .s4 {
          background-image: url("../../img/tickets/4.png");
        }

        .s5 {
          background-image: url("../../img/tickets/5.png");
        }
      }
    }
  }

  .messages {
    width: 1200px;
    margin: 20px auto;
    box-sizing: border-box;
    overflow: hidden;

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

      .preson_title {
        color: #fff;
        padding-left: 65px;
      }

      .preson-right {
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

    // 表格
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

    // 结尾付款
    .footer {
      margin: 0 auto 80px auto;
      overflow: hidden;
      width: 650px;

      .cancle {
        float: left;
        width: 220px;
        height: 48px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(85, 85, 90, 1);
        line-height: 48px;
        text-align: center;
        border: 1px solid rgba(210, 210, 210, 1);
        border-radius: 24px;
        cursor: pointer;
      }

      .sure {
        float: right;
        width: 220px;
        height: 48px;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        background: rgba(180, 124, 45, 1);
        opacity: 0.8;
        border-radius: 24px;
        cursor: pointer;
      }
    }
  }
</style>
