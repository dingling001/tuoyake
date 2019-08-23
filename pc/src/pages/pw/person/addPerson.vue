<template>
  <div
    class="container"
    v-loading="data_loading"
    element-loading-text="努力加载中...."
    element-loading-background="rgba(0, 0, 0, 0.4)"
  >
    <div class="header">
      <step-header :title="this.$route.meta.title" :current="2" tag="个人票务预约"></step-header>
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
        <li class="operation">操作</li>
      </ul>
    </div>
    <div class="list-content">
      <ul>
        <li v-for="(listItem, index) in listData" :key="index">
          <el-form :rules="messageRules" :model="listItem" ref="formFirst">
            <div class="index">
              <span>{{ index + 1 }}</span>
            </div>
            <div class="tick-type">
              <el-select v-model="listItem.tickType" popper-class="select-con">
                <el-option
                  v-for="(item, index) in tickData"
                  :key="index"
                  :label="item.pt_name"
                  :value="item.pt_id"
                ></el-option>
              </el-select>
            </div>
            <div class="name">
              <el-form-item prop="name">
                <el-input v-model="listItem.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </div>
            <div class="certificate-type">
              <el-select v-model="listItem.certificateType" popper-class="select-con">
                <el-option
                  v-for="(item) in certificateType"
                  :key="item.cardtype_id"
                  :label="item.card_type"
                  :value="item.cardtype_id"
                ></el-option>
              </el-select>
            </div>
            <div class="certificate-id">
              <el-form-item
                prop="certificateID"
                :rules="{'required': true,'validator': verifyCard  ,'trigger': 'blur','typeName': listItem.certificateType}"
              >
                <el-input
                  v-model="listItem.certificateID"
                  @blur="listItem.certificateID && (listItem.certificateID = $event.target.value.toUpperCase())"
                  placeholder="请输入证件号"
                ></el-input>
              </el-form-item>
            </div>
            <div class="ticks-list">
              <el-checkbox-group v-model="listItem.ticks" class="checkbox-group">
                <el-checkbox
                  v-for="(item, index) in showTickInfo(listItem.tickType)"
                  :key="index"
                  :label="item.td_tp_id"
                  :disabled="item.td_tp_id === findMustTicket(item)"
                >
                  <span class="tick-name">{{ item.ticket_name }}</span>
                  <span class="tick-price">{{ item.ticket_price }}</span>
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="operation">
              <el-button
                round
                size="medium"
                v-if="listData.length > 1"
                @click="deletePerson(index)"
              >删除</el-button>
            </div>
          </el-form>
        </li>
      </ul>
    </div>
    <div class="add-contain">
      <div class="add-button" @click="addPerson()">
        <span>+</span>
        <span>添加参观者</span>
      </div>
      <div class="info">已添加{{listData.length}}人，还可添加{{5 - listData.length}}人</div>
      <div class="count">
        <span>总计：</span>
        <span>￥ {{total}}</span>
      </div>
    </div>
    <div class="form-contain" v-if="!api_token">
      <el-form :model="ruleFrom" ref="formSecond" :rules="messageRules">
        <el-form-item label="手机号码" prop="phone" label-width="100px">
          <el-input placeholder="请输入手机号" class="phone" v-model="ruleFrom.phone"></el-input>
        </el-form-item>
        <el-form-item label="图形验证码" prop="verify" label-width="100px">
          <el-input class="verify" v-model="ruleFrom.verify"></el-input>
          <div class="verify_number" @click="getImg">
            <img :src="imgUrl" alt />
          </div>
          <div class="exchange" @click="getImg">换一换</div>
        </el-form-item>
        <el-form-item label="验证码 " prop="verifys" label-width="100px">
          <el-input placeholder="请输入验证码" class="verifys" v-model="ruleFrom.verifys"></el-input>
          <!-- <div class="verify-btn" @click="getCode">获取验证码</div> -->
          <div class="verify_btn" v-show="show_time" @click="getCode">获取验证码</div>
          <div class="verify_btn" v-show="!show_time">{{count}} S</div>
        </el-form-item>
      </el-form>
    </div>
    <div class="button">
      <el-button class="next-btn" round @click="goNext">下一步</el-button>
    </div>
  </div>
</template>
<script>
import { Local } from '@/bin/cache.js';
import crypto from 'crypto';
import U from '@/bin/common';
import StepHeader from '../common/header.vue';
import FromHeader from '../common/formHeader.vue';
export default {
  data() {
    var that = this;
    var checkPhone = function(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入手机号'));
      } else if (!U.checkPhone(value)) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    return {
      flagged: true,
      data_loading: true,
      certificateType: [
        {
          card_type: '身份证',
          cardtype_id: 1,
        },
        {
          card_type: '护照',
          cardtype_id: 2,
        },
      ],
      // 渲染页面列表的数字数据
      listData: [],
      tickData: [],
      ruleFrom: {
        phone: '',
        verify: '',
        verifys: '',
      },
      messageRules: {
        phone: { required: true, validator: checkPhone, trigger: 'none' },
        verifys: {
          required: true,
          message: '请输入短信验证码',
          trigger: 'none',
        },
        verify: {
          required: true,
          message: '请输入图形验证码',
          trigger: 'none',
        },
        name: { required: true, message: '请输入姓名', trigger: 'blur' },
      },
      count: 0,
      show_time: true,
      td_tp_id: Local.get('pc_pw_td_tp_id') || null,
      imgUrl: '',
      api_token: '',
      device_uuid: '',
      timer: null,
      checkImg: false, //图形验证码状态
    };
  },
  inject: ['app'],
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
    sendData() {
      var sendData = {
        td_tp_id: this.listData[0].td_tp_id,
        pt_id: [],
        toi_username: [],
        toi_cardtype_id: [],
        toi_card_num: [],
        td_tp_ids: [],
      };

      this.listData.forEach(function(item, index) {
        sendData.pt_id.push(item.tickType);
        sendData.toi_username.push(item.name);
        sendData.toi_cardtype_id.push(item.certificateType);
        sendData.toi_card_num.push(item.certificateID.toUpperCase());
        sendData.td_tp_ids.push(item.ticks);
      });

      return sendData;
    },
    // 合计金额
    total() {
      var ticksId = [];
      var tickets = [];
      var obj = {};
      var total = 0;
      this.listData.forEach(function(item, index) {
        ticksId = ticksId.concat(item.ticks);
      });

      this.tickData.forEach(function(item, index) {
        item.pt_tickets.forEach(function(a, b) {
          obj[a.td_tp_id] = a.ticket_price;
        });
      });

      ticksId.forEach(function(item, index) {
        total += Number(obj[item]) || 0;
      });
      if (total > 0) {
        var strList = total.toString().split('.');
        total = `${strList[0]}.${strList[1].slice(0, 2)}`;
      }

      return total;
    },
    // 为了保存到LocalStrage,为了确认订单用
    saveInfo() {
      var list = [];
      var vm = this;
      this.listData.forEach(function(item, index) {
        var obj = {};
        var ticketList = [];
        var dId = item.tickType;
        item.ticks.forEach(function(item, index) {
          var a = vm.getTicketName(item, dId);
          ticketList = ticketList.concat(a);
        });
        obj.personName = item.name;
        obj.cardID = item.certificateID;
        obj.cardType = vm.getCardtype(item.certificateType) || '';
        obj.ticketList = ticketList;
        obj.tickType = vm.getTickType(item.tickType);
        list.push(obj);
      });

      return list;
    },
  },
  methods: {
    // 身份证的验证格式的验证
    verifyCard: function(rules, value, callback) {
      if (!value.trim()) {
        return callback(new Error('请输入正确的证件号码'));
      } else if (rules.typeName === 1 && !U.checkIdcard(value).status) {
        return callback(new Error('身份证号码不正确'));
      } else {
        callback();
        console.log();
      }
    },
    // 生成uuid
    generateUUID() {
      let v = this;
      let md5 = crypto.createHash('md5');
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function(c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      md5.update(uuid);
      v.device_uuid = md5.digest('hex');
      localStorage.device_uuid = v.device_uuid;
    },

    // 图形验证码
    getImg() {
      this.generateUUID();
      this.imgUrl =
        STATIC_PW_URL +
        '/api/cpt/show?p=w&device_uuid=' +
        this.device_uuid +
        '&random=' +
        Math.random();
    },

    // 获取验证码
    getCode() {
      if (!U.checkPhone(this.ruleFrom.phone)) {
        this.$message({
          message: '请输入正确的手机号',
          type: 'error',
        });
      } else if (this.ruleFrom.verify == '') {
        this.$message({
          message: '请输入图形验证码',
          type: 'error',
        });
      } else {
        this.$api
          .getCode(this.device_uuid, this.ruleFrom.phone, this.ruleFrom.verify)
          .then(res => {
            if (res.status == 1) {
              this.counTime();
              this.$message({
                message: '发送成功',
                type: 'success',
              });
            } else {
              this.$message({
                message: res.msg,
                type: 'error',
              });
            }
          });
      }
    },
    // 倒计时
    counTime() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show_time = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show_time = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    // 找到门票价格为0的门票，为了选作为必选的门票
    /*
      item: 门票对象
      return: 门票的td_tp_id
    */
    findMustTicket(item) {
      if (Number(item.ticket_id) === 1) {
        return item.td_tp_id;
      }
    },
    // 根据证件类型ID获取证件类型描述
    getCardtype(id) {
      var found = this.certificateType.find(function(item, index) {
        if (item.cardtype_id === id) {
          return true;
        }
      });
      // console.log(found);
      if (found) {
        return found.card_type;
      }
    },
    // 根据门票Id和类型Id获取门票的描述和价格
    getTickType(id) {
      var found = this.tickData.find(function(item, index) {
        return item.pt_id === id;
      });
      if (found) {
        return found.pt_name;
      }
    },
    // 根据门票的id获取已经选择了的门票
    getTicketName(tId, dId) {
      var list = [];
      var ticketType = '';
      this.tickData.forEach(function(item, index) {
        if (item.pt_id == dId) {
          ticketType = item.pt_name;
          var temp = item.pt_tickets.find(function(item, index) {
            return item.td_tp_id === tId;
          });
          if (temp) {
            list.push(temp);
          }
        }
      });

      return list;
    },
    // 增加人员
    addPerson() {
      var obj = {
        name: '',
        tickType: this.tickData[0].pt_id, // 默认添加为成人
        certificateType: this.certificateType[0].cardtype_id, // 默认添加身份证类型
        certificateID: '',
        ticks: [],
      };
      this.tickData[0].pt_tickets.forEach(function(item, index) {
        if (Number(item.ticket_id) == 1) {
          obj.ticks.push(item.td_tp_id);
        }
      });
      if (this.listData.length < 5) {
        this.listData.push(obj);
      } else {
        this.$message('每个用户最多只能增加5个人员');
      }
    },
    // 删除人员
    /*
      @param: index 为列表的索引
    */
    deletePerson(index) {
      if (this.listData.length === 1) {
        return;
      }

      this.listData.splice(index, 1);
    },
    // 根据寻找的票务类型成人还是儿童，来显示不同的门票信息
    /*
      @param：tickType 为选择的门票类型，成人还是儿童
     */
    showTickInfo(tickType) {
      // console.log(tickType);
      var obj = this.tickData.find(function(item, index) {
        return item.pt_id === tickType;
      });

      if (obj) {
        return obj.pt_tickets;
      }
    },
    // 下一步
    // 上传订单信息
    goNext() {
      var flag_one = false;
      var flag_tow = false;
      var listValid = [];
      if (!this.$refs.formFirst[0]) {
        this.$message({
          message: '最少添加一个成员',
          type: 'error',
        });
        return;
      }
      for (var i = 0; i < this.$refs.formFirst.length; i++) {
        this.$refs.formFirst[i].validate(valid => {
          if (valid) {
            //
            // flag_one = true;
            listValid.push(1);
          } else {
            listValid.push(0);
          }
        });
      }

      if (listValid.indexOf(0) !== -1) {
        this.$message({
          message: '人员信息填写不正确',
          type: 'error',
        });
        return false;
      }

      if (!this.api_token) {
        this.$refs.formSecond.validate(valid => {
          if (valid) {
            this.$api
              .getLogin(this.ruleFrom.phone, this.ruleFrom.verifys)
              .then(res => {
                if (res.status === 1) {
                  localStorage.api_token = res.data.api_token;
                  this.api_token = res.data.api_token;
                  this.app.getUser();
                  Local.set('pw_order_info', this.listData);
                  Local.set('pw_send_info', this.sendData);
                  Local.set('pw_person_info', this.saveInfo);
                  this.$router.push('/pw/person/confirm_order');
                } else {
                  this.$message({
                    message: res.msg,
                    type: 'error',
                  });
                }
              });
          } else {
            return false;
          }
        });
        // if (!U.checkPhone(this.ruleFrom.phone)) {
        //   this.$message({
        //     message: "请输入正确的手机号",
        //     type: "error"
        //   });
        // } else if (this.ruleFrom.verify == "") {
        //   this.$message({
        //     message: "请输入图形验证码",
        //     type: "error"
        //   });
        // } else {
        //   this.$api
        //     .getLogin(this.ruleFrom.phone, this.ruleFrom.verifys)
        //     .then(res => {
        //       if (res.status === 1) {
        //         localStorage.api_token = res.data.api_token;
        //         this.api_token = res.data.api_token;
        //         this.app.getUser();
        //         Local.set("pw_send_info", this.sendData);
        //         Local.set("pw_person_info", this.saveInfo);
        //         this.$router.push("/pw/person/confirm_order");
        //       } else {
        //         this.$message({
        //           message: res.msg,
        //           type: "error"
        //         });
        //       }
        //     });
        // }
      } else {
        // flag_tow = true;
        Local.set('pw_order_info', this.listData);
        Local.set('pw_send_info', this.sendData);
        Local.set('pw_person_info', this.saveInfo);
        this.$router.push('/pw/person/confirm_order');
      }
    },
    // 获取票务信息和分类 axios
    getTicks() {
      this.$api
        .getAllTicks(this.td_tp_id)
        .then(res => {
          setTimeout(() => {
            this.data_loading = false;
          }, 0);
          if (res.status === 1) {
            var result = res.data;
            this.certificateType = result.cardtype;
            this.tickData = result.pt_data;
            // 获取新门票详情的td_tp_id
            var temp = this.tickData[0].pt_tickets.find(function(item, index) {
              return item.ticket_id === 1;
            });
            var new_td_tp_id = temp.td_tp_id;

            // 初始化数据表单
            if (!this.listData.length) {
              var obj = {};
              obj.name = '';
              // 默认为身份证
              obj.certificateType = this.certificateType[0].cardtype_id;
              obj.certificateID = '';
              // 默认为成人
              obj.tickType = this.tickData[0].pt_id;
              // 初始选择的门票默认门票
              var tickets = this.tickData[0].pt_tickets;
              var vm = this;
              tickets.forEach(function(item, index) {
                if (item.ticket_id == 1) {
                  obj.td_tp_id = item.td_tp_id;
                  obj.ticks = [];
                  obj.ticks.push(item.td_tp_id);
                }
              });

              this.listData.push(obj);
            } else if (this.listData[0].td_tp_id !== new_td_tp_id) {
              // console.log(1111);
              this.listData.forEach(function(item, index) {
                item.td_tp_id = new_td_tp_id;
                item.ticks = [];
                item.ticks.push(new_td_tp_id);
              });
            }

            // console.log(result);
            this.getCardtype(1);
            // console.log(this.showTickInfo(1));
          } else {
            this.$message({
              message: res.msg,
              type: 'error',
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  },

  components: {
    StepHeader,
    FromHeader,
  },

  created() {
    // console.log(this.td_tp_id);
    if (!this.td_tp_id) {
      this.$router.push('/pw/person/index');
      return;
    } else {
      // 移除选择的日期，解决没有了门票还可以进入到下一步的问题；
      // Local.remove("pc_pw_td_tp_id");
      Local.remove('pc_pw_dateIndex');
      Local.remove('pc_pw_tp_list');
      Local.remove('pc_pw_timePeriodIndex');
    }
    this.api_token = localStorage.api_token || '';
    var orderInfo = Local.get('pw_order_info');
    this.listData = orderInfo ? orderInfo : [];
    this.getTicks();
    this.getImg();
    // console.log(this.app);
  },
};
</script>
<style lang="scss" scoped>
/** @format */

.container {
  margin: 0 auto;
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
      margin-top: 15px;

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
            width: 69px;
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
        padding: 20px 0;
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
            position: relative;
            width: 100px;
          }

          &.tick-type,
          &.certificate-type {
            width: 147px;
          }

          &.certificate-id {
            position: relative;
            width: 229px;

            /deep/ .el-form-item {
              width: 100%;
            }
          }

          &.ticks-list {
            width: 300px;
            border: none;
            text-align: left;
            line-height: 20px;
            font-size: 16px;
            margin-left: 20px;
            border-right: 1px solid #b47c2d;

            &::after {
              content: '';
              display: table;
              clear: both;
            }

            /deep/ .el-checkbox {
              margin: 0;
              line-height: 40px;
            }

            /deep/ .el-checkbox__label {
              padding-left: 10px;
              font-size: 16px;
            }
            /deep/ .el-checkbox__inner {
              padding: 10px;
              &::after {
                top: -2px;
                width: 8px;
                left: 4px;
                height: 15px;
                border-right-width: 3px;
                border-bottom-width: 3px;
                // border: 3px solid #fff;
              }
            }
            /deep/ .is-focus {
              border-color: #dcdfe6;
            }
            /deep/ .el-checkbox__input {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: 0;

              .el-checkbox__inner {
                &:hover {
                  border-color: #b47c2d;
                }
              }
            }

            /deep/ .el-checkbox__input.is-checked {
              .el-checkbox__inner {
                background-color: #fff;
                border-color: #b47c2d;
                &:hover {
                  border-color: #b47c2d;
                }
                &::after {
                  border-right-color: #30cc72;
                  border-bottom-color: #30cc72;
                }
              }
            }
            /deep/ .el-checkbox__input.is-disabled {
              .el-checkbox__inner {
                background-color: #f2f6fc;
                &::after {
                  border-right-color: #a9a9a9;
                  border-bottom-color: #a9a9a9;
                }
              }
            }
            .tick-name {
              color: #000;
              float: left;
              width: 190px;
              padding-left: 10px;
              margin-right: 5px;
              margin-left: 15px;
              white-space: normal;
            }

            .tick-price {
              color: #000;
              float: left;
              text-align: center;
              width: 69px;
              margin-left: 5px;
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
            .el-button:focus,
            .el-button:hover {
              background-color: #c39657;
              color: #fff;
              border-color: #c39657;
            }
          }
        }
      }
    }
  }

  .add-contain {
    width: 1200px;
    margin: 40px auto 40px;
    line-height: 44px;

    &::after {
      content: '';
      display: table;
      clear: both;
    }

    .add-button {
      float: left;
      // display: inline-block;
      // width: 163px;
      height: 44px;
      line-height: 42px;
      text-align: center;
      border-radius: 24px;
      padding: 0 30px;
      border: 1px solid #b47c2d;
      color: #c39657;
      cursor: pointer;

      span {
        &:first-child {
          float: left;
          font-weight: 700;
          font-size: 20px;
        }

        &:last-child {
          float: left;
          padding-left: 3px;
          font-size: 16px;
        }
      }
    }

    .info {
      float: left;
      margin-left: 50px;
      padding: 0 15px;
      font-size: 16px;
      color: #858585;
    }

    .count {
      float: right;
      // line-height: 50px;
      padding: 0 40px;
      font-size: 16px;

      span {
        &:last-child {
          font-size: 16px;
          font-weight: 700;
          color: #ff3600;
        }
      }
    }
  }

  .form-contain {
    width: 1200px;
    margin: 0 auto;

    .phone {
      width: 390px;
    }

    .verify {
      width: 250px;
    }

    .verifys {
      width: 250px;
    }

    .verify_number {
      position: absolute;
      width: 121px;
      height: 97%;
      /*background-color: #b5b5b5;*/
      right: 65%;
      top: 1px;
      border-radius: 5px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .exchange {
      position: absolute;
      width: 50px;
      height: 16px;
      font-size: 14px;
      color: #b47c2d;
      right: 60%;
      top: 4%;
      cursor: pointer;
    }

    // .verify-btn {
    //   display: inline-block;
    //   width: 130px;
    //   height: 40px;
    //   text-align: center;
    //   line-height: 40px;
    //   background-color: #b47c2d;
    //   border: 1px solid #b47c2d;
    //   border-radius: 20px;
    //   cursor: pointer;
    // }
    .verify_btn {
      display: inline-block;
      width: 132px;
      height: 40px;
      background: #c39657;
      border-radius: 5px;
      border: 0;
      top: 0;
      left: 300px;
      color: #fff;
      cursor: pointer;
      text-align: center;
      outline: none;

      &:active {
        opacity: 0.7;
      }
    }
  }

  .button {
    margin: 80px auto;
    width: 300px;

    .next-btn {
      width: 300px;
      height: 48px;
      border-radius: 24px;
      background-color: #c39657;
      color: #fff;
      border: none;
    }
  }

  /deep/ .el-input__inner {
    &:focus {
      border-color: #b47c2d;
    }
  }
  /deep/ .el-input.is-active {
    &.is-active {
      .el-input__inner:focus {
        border-color: #b47c2d;
      }
    }
  }

  /deep/ .el-select .el-input.is-focus .el-input__inner {
    border-color: #b47c2d;
  } 
}
</style>
