<template>
  <div class="date_box">
    <div class="nav_hr">
      <div class="nav_text">
        <router-link tag="span" to="/">首页 »</router-link>
        影院影讯
      </div>
    </div>
    <div class="date_step">
      <div class="date_title">
        <div class="date_left">选择影片类型及数量
          <span class="line"></span>
          <span class="dot"></span>
        </div>
        <el-steps :active="2" align-center class="date_right" v-if="seatinfo.type">
          <el-step title="选择影片场次">
            <i class="s s1" slot="icon"></i>
          </el-step>
          <el-step title="选择影片类型及数量">
            <i class="s s2" slot="icon"></i>
          </el-step>
          <el-step :title="seatinfo.type!=3?'选择座位':'确认订单信息'">
            <i class="s s3" slot="icon"></i>
          </el-step>
          <el-step :title="seatinfo.type!=3?'确认订单信息':'支付'">
            <i class="s s4" slot="icon"></i>
          </el-step>
          <el-step title="支付" v-if="seatinfo.type!=3">
            <i class="s s5" slot="icon"></i>
          </el-step>
        </el-steps>
      </div>
    </div>
    <div class="film_info">
      <div class="film_head">
        <div class="tips" v-if="seatinfo.type==3&&cinema_id==1"><span></span>温馨提示：该场次为沉浸式体验影片。</div>
        <div class="tips" v-else-if="cinema_id==1&&seatinfo.type!=3"><span></span>温馨提示：该场次为非沉浸式体验影片，请选座观影。</div>
        <div class="film_name">{{seatinfo.movie_name}}</div>
        <div class="film_item">影片时长：{{seatinfo.long_time}}分钟</div>
        <div class="film_item">放映地址：{{seatinfo.address}}</div>
        <div class="film_item">日期及场次：{{seatinfo.movie_date}} 周{{week_list[week]}}
          {{seatinfo.movie_start_time}}
        </div>
      </div>
      <div class="film_form">
        <div class="table_head">
          <span>影片类型</span>
          <span>价格</span>
          <span v-if="cinema_id==1">购买数量</span>
        </div>
        <div class="table_ticket" v-if='cinema_id==1'>
          <div class="table_item" v-for="(item, index) in ticket_list">
            <div class="table_label">
              <div>{{item.class_name}}</div>
              <div class="table_des" v-if="item.des">({{item.des}})</div>
            </div>
            <div class="table_label">¥{{item.price}}/ <span v-if="index==0||index==1">人</span><span
              v-else>套</span></div>
            <div class="table_label">
              <!--<el-input-number v-model='item.value' @change="handleChange(index,$event)" :min="1"-->
              <!--:max="10"-->
              <!--label="描述文字"></el-input-number>-->
              <span :class="['icon', 'jian', item.value>0?'':'is_disable']"
                    @click="jian_fn(index,item.value,item.min)"><span
                class="iconfont iconjian1"></span></span>
              <input type="number" v-model="item.value" placeholder="" maxLength="1"
                     @input="changeValue(index,item.value,item.min,item.max,item.plus_show)">
              <span :class="['icon', 'plus', item.value==item.max?'is_disable':'']"
                    @click="plus_fn(index,item.value,item.min,item.max)"><span
                class="iconfont iconaddTodo-nav"></span></span>
            </div>
          </div>
        </div>
        <el-radio-group v-model="radio1" class="table_ticket" v-else-if='cinema_id==2' :max="1"
                        @change="changeticket">
          <el-radio :label="item" class="table_item" v-for="(item,index) in ticket_list"
                    :key="item.movie_ticket_class_id">
            <div class="table_label">
              <div>{{item.class_name}}</div>
              <div class="table_des" v-if="item.des">({{item.des}})</div>
            </div>
            <div class="table_label">¥{{item.price}}/ <span v-if="item.total_num==1">人</span><span
              v-else>套</span></div>
          </el-radio>
        </el-radio-group>
        <div class="ticket_tips" v-if="seatinfo.type!=3&&cinema_id==1">
          已选{{select_num}}个座位，还可选择{{seatinfo.allow_order_num-select_num<0?0:seatinfo.allow_order_num-select_num}}个座位
        </div>
        <div class="ticket_tips" v-else-if="seatinfo.type==3&&cinema_id==1">
          已选{{select_num}}个体验位，还可选择{{seatinfo.allow_order_num-select_num<0?0:seatinfo.allow_order_num-select_num}}个体验位
        </div>
        <div class="ticket_tips" v-else-if="cinema_id==2">
          每个账号每天只能预约1个类型门票
        </div>
        <div class="ticket_total">总计：<span class="price">￥</span><span class="price_num">{{parseFloat(price_total).toFixed(2)}}</span>
        </div>
        <div class="phone_box" v-if="api_token">
          <!--手机号：-->
          <!--<el-input v-model="formLabelAlign.contact_phone" placeholder="请输入内容"></el-input>-->
          <!--<span>{{formLabelAlign.contact_phone}}</span>-->
        </div>
        <div v-else class="login_form">
          <el-form :model="formLabelAlign" status-icon :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="手机号码" prop="contact_phone">
              <el-input type="number" v-model="formLabelAlign.contact_phone"
                        autocomplete="off" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="图片验证码" prop="verify">
              <el-input type="text" v-model="formLabelAlign.verify" autocomplete="off"
                        placeholder="请输入图片验证码"></el-input>
              <div class="verify_number" @click="getImg"><img :src="imgUrl" alt=""></div>
            </el-form-item>
            <el-form-item label="短信验证码" prop="verifys">
              <el-input v-model.number="formLabelAlign.verifys" type="number"
                        placeholder="请输入短信验证码"></el-input>
              <div class="verify_btn" v-show="show_time" @click="getCode">获取验证码</div>
              <div class="verify_btn" v-show="!show_time">{{count}} S</div>
            </el-form-item>
          </el-form>
        </div>
        <div class="ticket_next" @click="go_next">下一步</div>
        <!--        <div class="ticket_next" @click="go_qiumu">下一步</div>-->

      </div>
    </div>
  </div>
</template>

<script>
  import U from '@/bin/common'
  import crypto from "crypto";

  export default {
    name: "film_num",
    data() {
      // 手机号校验
      var checkPhone = (rule, value, callback) => {
        if (!value.trim()) {
          return callback(new Error("请输入手机号"));
        }
        if (!U.checkPhone(value)) {
          return callback(new Error("手机号不正确"));
        } else {
          callback();
        }
      };
      return {
        ticket_list: [],
        film_date_layout_id: '',
        val: '',
        seatinfo: {},
        week_list: ["日", "一", "二", "三", "四", "五", "六",],
        week: 0,
        select_num: 0,
        price_total: '0.00',
        film_phone: '',
        api_token: '',
        formLabelAlign: {
          contact_phone: '',
          verify: '',
          verifys: ''
        },
        imgUrl: '',
        device_uuid: '',
        show_time: true,
        count: 0,
        timer: null,
        rules: {
          verify: [{required: true, message: '请输入图形验证码', trigger: 'blur'}],
          verifys: {required: true, message: '请输入短信验证码', trigger: 'blur'},
          contact_phone: {required: true, validator: checkPhone, trigger: "blur"},
        },
        cinema_id: '',
        radio: [],
        radio1: '',
        total_num: ''
      }
    },
    inject: ["app"],
    created() {
      this.film_date_layout_id = this.$route.query.film_date_layout_id;
      this.cinema_id = this.$route.query.cinema_id;
      this.getSeatInfo();
      this.api_token = localStorage.getItem('api_token');
      this.getImg()
    },
    methods: {
      // 获取影院信息
      getSeatInfo() {
        this.$api.SeatInfo(this.film_date_layout_id).then(res => {
          if (res.status == 1) {
            this.ticket_list = res.data.ticket_list;
            this.seatinfo = res.data;
            this.week = new Date(res.data.movie_date).getDay();
            for (let i in  this.ticket_list) {
              this.ticket_list[i].value = 0;
              this.ticket_list[i].plus_show = false;
              switch (i) {
                case '0':
                  this.ticket_list[i].min = 0;
                  this.ticket_list[i].max = this.seatinfo.allow_order_num;
                  break;
                case '1':
                  this.ticket_list[i].min = 0;
                  this.ticket_list[i].max = this.seatinfo.allow_order_num;
                  break;
                case '2':
                  this.ticket_list[i].min = 0;
                  this.ticket_list[i].max = this.seatinfo.allow_order_num > 2 ? 2 : this.seatinfo.allow_order_num;
                  break;
                case '3':
                  this.ticket_list[i].min = 0;
                  this.ticket_list[i].max = this.seatinfo.allow_order_num > 1 ? 1 : this.seatinfo.allow_order_num;
                  break;
              }
            }
          } else {
            this.errmsg = res.msg;
          }
          // //console.log(this.ticket_list)
        })
      },
      // 生成uuid
      generateUUID() {
        let v = this;
        let md5 = crypto.createHash("md5");
        var d = new Date().getTime();
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
          }
        );
        md5.update(uuid);
        v.device_uuid = md5.digest("hex");
        localStorage.device_uuid = v.device_uuid;
      },
      // 图形验证码
      getImg() {
        this.generateUUID();
        this.imgUrl =
          STATIC_PW_URL +
          "/api/cpt/show?p=w&device_uuid=" +
          this.device_uuid +
          "&random=" +
          Math.random();
      },
      // 获取验证码
      getCode() {
        if (!U.checkPhone(this.formLabelAlign.contact_phone)) {
          this.$message({
            message: '请输入正确的手机号',
            type: 'error'
          });
        } else if (this.formLabelAlign.verify == '') {
          this.$message({
            message: '请输入图形验证码',
            type: 'error'
          });
        } else {
          this.$api.getCode(this.device_uuid, this.formLabelAlign.contact_phone, this.formLabelAlign.verify)
            .then(res => {
              if (res.status == 1) {
                this.counTime();
                this.$message({
                  message: '发送成功',
                  type: 'success'
                });
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error'
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
          }, 1000)
        }
      },

      // 减法
      jian_fn(index, value, min) {
        value = Number(value);
        min = Number(min)
        if (!value) return
        if (this.select_num <= this.seatinfo.allow_order_num) {
          if (value > min) {
            this.$delete(this.ticket_list[index], 'value');
            this.$set(this.ticket_list[index], 'value', value - 1);
          }
        } else if (this.select_num > this.seatinfo.allow_order_num) {
          this.$delete(this.ticket_list[index], 'value');
          this.$set(this.ticket_list[index], 'value', 0);
          this.$message({
            message: '超出最大购票量，请重新选择',
            type: 'error'
          });
        } else {
          this.$message({
            message: '每人最多选择' + this.seatinfo.allow_order_num + '个座位',
            type: 'error'
          });
        }
        this.price_total = parseInt(this.ticket_list[0].value) * this.ticket_list[0].price + parseInt(this.ticket_list[1].value) * this.ticket_list[1].price + parseInt(this.ticket_list[2].value) * this.ticket_list[2].price + parseInt(this.ticket_list[3].value) * this.ticket_list[3].price
        this.select_num = parseInt(this.ticket_list[0].value) + parseInt(this.ticket_list[1].value) + parseInt(this.ticket_list[2].value) * 2 + parseInt(this.ticket_list[3].value) * 3;

      },
      // 加法
      plus_fn(index, value = 0, min, max) {
        value = Number(value);
        max = Number(max)
        if (parseInt(this.ticket_list[0].value) + parseInt(this.ticket_list[1].value) + parseInt(this.ticket_list[2].value) * 2 + parseInt(this.ticket_list[3].value) * 3 > 5) {
          this.$delete(this.ticket_list[index], 'value');
          this.$set(this.ticket_list[index], 'value', 0);
          this.$message({
            message: '超出当日最大购票量，请重新选择',
            type: 'error'
          });
        } else if (parseInt(this.ticket_list[0].value) + parseInt(this.ticket_list[1].value) + parseInt(this.ticket_list[2].value) * 2 + parseInt(this.ticket_list[3].value) * 3 < 5) {
          if (value < max) {
            this.$delete(this.ticket_list[index], 'value');
            this.$set(this.ticket_list[index], 'value', value + 1);
          } else {
          }
        } else {
          this.$message({
            message: '当前最多选择' + this.seatinfo.allow_order_num + '个座位',
            type: 'error'
          });
        }
        this.select_num = parseInt(this.ticket_list[0].value) + parseInt(this.ticket_list[1].value) + parseInt(this.ticket_list[2].value) * 2 + parseInt(this.ticket_list[3].value) * 3;
        this.price_total = parseInt(this.ticket_list[0].value) * this.ticket_list[0].price + parseInt(this.ticket_list[1].value) * this.ticket_list[1].price + parseInt(this.ticket_list[2].value) * this.ticket_list[2].price + parseInt(this.ticket_list[3].value) * this.ticket_list[3].price
        if (this.select_num > this.seatinfo.allow_order_num) {
          this.$delete(this.ticket_list[index], 'value');
          this.$set(this.ticket_list[index], 'value', 0);
          this.$message({
            message: '超出最大购票量，请重新选择',
            type: 'error'
          });
          this.select_num = parseInt(this.ticket_list[0].value) + parseInt(this.ticket_list[1].value) + parseInt(this.ticket_list[2].value) * 2 + parseInt(this.ticket_list[3].value) * 3;
          this.price_total = parseInt(this.ticket_list[0].value) * this.ticket_list[0].price + parseInt(this.ticket_list[1].value) * this.ticket_list[1].price + parseInt(this.ticket_list[2].value) * this.ticket_list[2].price + parseInt(this.ticket_list[3].value) * this.ticket_list[3].price
        }
        // //console.log(this.ticket_list)
      },
      // 监听输入框值变化
      changeValue(index, value, min, max, show) {
        value = Number(value);
        max = Number(max);
        min = Number(min);
        console.log(this.ticket_list[index].value.length)
        if (this.ticket_list[index].value == '') {
          this.ticket_list[index].value = 0
        }
        if (this.ticket_list[index].value >= max) {
          this.$delete(this.ticket_list[index], 'value');
          this.$set(this.ticket_list[index], 'value', max);
          // this.$delete(this.ticket_list[index], 'plus_show');
          // this.$set(this.ticket_list[index], 'plus_show', true);
        }

        this.select_num = parseInt(this.ticket_list[0].value) + parseInt(this.ticket_list[1].value) + parseInt(this.ticket_list[2].value) * 2 + parseInt(this.ticket_list[3].value) * 3;
        this.price_total = parseInt(this.ticket_list[0].value) * this.ticket_list[0].price + parseInt(this.ticket_list[1].value) * this.ticket_list[1].price + parseInt(this.ticket_list[2].value) * this.ticket_list[2].price + parseInt(this.ticket_list[3].value) * this.ticket_list[3].price
        //console.log(this.select_num)
        if (this.select_num > this.seatinfo.allow_order_num) {
          this.$delete(this.ticket_list[index], 'value');
          this.$set(this.ticket_list[index], 'value', 0);
          this.$message({
            message: '超出最大购票量，请重新选择',
            type: 'error'
          });
          this.select_num = parseInt(this.ticket_list[0].value) + parseInt(this.ticket_list[1].value) + parseInt(this.ticket_list[2].value) * 2 + parseInt(this.ticket_list[3].value) * 3;
          this.price_total = parseInt(this.ticket_list[0].value) * this.ticket_list[0].price + parseInt(this.ticket_list[1].value) * this.ticket_list[1].price + parseInt(this.ticket_list[2].value) * this.ticket_list[2].price + parseInt(this.ticket_list[3].value) * this.ticket_list[3].price
        }
      },
      // 选择变化时
      changeticket(e) {
        console.log(e)
        this.price_total = e.price
      },
      // 下一步
      go_next() {
        //console.log(this.select_num)
        if (this.select_num <= 0 && this.cinema_id == 1) {
          this.$message({
            message: '请选择影片类型及数量',
            type: 'error'
          });
        } else {
          let ticket_class_string = '',
            value1 = '',
            value_name1 = '',
            value2 = '',
            value_name2 = '',
            value3 = '',
            value_name3 = '',
            value4 = '',
            value_name4 = '';
          if (this.ticket_list[0].value > 0) {
            value1 = this.ticket_list[0].movie_ticket_class_id + '_' + this.ticket_list[0].value + '#';
            value_name1 = this.ticket_list[0].class_name + ' x' + this.ticket_list[0].value;
          }

          if (this.ticket_list[1].value > 0) {
            value2 = this.ticket_list[1].movie_ticket_class_id + '_' + this.ticket_list[1].value + '#';
            value_name2 = this.ticket_list[1].class_name + ' x' + this.ticket_list[1].value;
          }
          if (this.ticket_list[2].value > 0) {
            value3 = this.ticket_list[2].movie_ticket_class_id + '_' + this.ticket_list[2].value + '#';
            value_name3 = this.ticket_list[2].class_name + ' x' + this.ticket_list[2].value;
          }
          if (this.ticket_list[3].value > 0) {
            value4 = this.ticket_list[3].movie_ticket_class_id + '_' + this.ticket_list[3].value + '#';
            value_name4 = this.ticket_list[3].class_name + ' x' + this.ticket_list[3].value;
          }
          ticket_class_string = (value1 + value2 + value3 + value4).substring(0, (value1 + value2 + value3 + value4).length - 1);
          if (localStorage.getItem('api_token')) {
            if (this.seatinfo.type != 3) {
              // console.log(ticket_class_string)
              this.$router.push({
                path: '/film/film_seat',
                query: {
                  select_num: this.select_num,
                  film_date_layout_id: this.film_date_layout_id,
                  ticket_class_string:ticket_class_string,
                  names: JSON.stringify([value_name1, value_name2, value_name3, value_name4]),
                  phone: '',
                  price_total: parseFloat(this.price_total).toFixed(2)
                }
              })
            } else {
              this.$router.push({
                path: '/film/film_confirm',
                query: {
                  film_date_layout_id: this.film_date_layout_id,
                  select_num: this.cinema_id == 1 ? this.select_num : this.radio1.total_num,
                  ticket_class_string: this.cinema_id == 1 ? ticket_class_string : this.radio1.movie_ticket_class_id + '_1',
                  names: JSON.stringify([value_name1, value_name2, value_name3, value_name4]),
                  phone: '',
                  price_total: parseFloat(this.price_total).toFixed(2)
                }
              })
            }

          } else {
            this.app.openLogin();
            // if (this.formLabelAlign.contact_phone == '') {
            //   this.$message({
            //     message: '请输入手机号',
            //     type: 'error'
            //   });
            // } else if (this.formLabelAlign.verify == '') {
            //   this.$message({
            //     message: '请输入图形验证码',
            //     type: 'error'
            //   });
            // } else if (this.formLabelAlign.verifys == '') {
            //   this.$message({
            //     message: '请输入短信验证码',
            //     type: 'error'
            //   });
            // } else {
            //   this.$api.getLogin(this.formLabelAlign.contact_phone, this.formLabelAlign.verifys).then(res => {
            //     if (res.status == 1) {
            //       localStorage.api_token = res.data.api_token;
            //       this.api_token = res.data.api_token;
            //       this.app.getUser();
            //       this.$router.push({
            //         path: '/film/film_seat',
            //         query: {
            //           phone: this.formLabelAlign.contact_phone,
            //           select_num: this.select_num,
            //           film_date_layout_id: this.film_date_layout_id,
            //           ticket_class_string: ticket_class_string,
            //           names: JSON.stringify([value_name1, value_name2, value_name3, value_name4]),
            //           price_total: parseFloat(this.price_total).toFixed(2)
            //         }
            //       })
            //     }
            //   })
            // }
          }
        }
      },

    }
  }
</script>


<style scoped lang="scss">
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

  .date_step {
    width: 1200px;
    margin: 20px auto 0 auto;
    padding: 30px 0;
    border-bottom: 5px solid rgba(180, 124, 45, .3);

    .date_title {
      overflow: hidden;

      .date_left {
        float: left;
        font-size: 24px;
        color: #000;
        padding: 0 0 27px 0;
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

        .dot {
          display: block;
          width: 7px;
          height: 5px;
          border-radius: 3px;
          background-color: #000;
          left: 70px;
          bottom: 0;
          z-index: 1;
          position: absolute;
        }
      }

      .date_right {
        float: right;
        width: 70%;
        color: #000;
        margin-right: -60px;

        /deep/ .el-step__title {
          font-size: 16px;
          color: #000;
        }

        /deep/ .el-step__title.is-finish {
          color: #B47C2D;
        }

        /deep/ .el-step__title.is-process {
          font-weight: normal;
        }

        /deep/ .is-finish .s1 {
          background-image: url("../../img/ticket/01.png");
        }

        /deep/ .is-finish .s2 {
          background-image: url("../../img/ticket/02.png");
        }

        /deep/ .is-finish .s3 {
          background-image: url("../../img/ticket/03.png");
        }

        /deep/ .is-finish .s4 {
          background-image: url("../../img/ticket/04.png");
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
          border-color: #A0A0A0;
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
          background-image: url("../../img/ticket/1.png");
        }

        .s2 {
          background-image: url("../../img/ticket/2.png");
        }

        .s3 {
          background-image: url("../../img/ticket/3.png");
        }

        .s4 {
          background-image: url("../../img/ticket/4.png");
        }

        .s5 {
          background-image: url("../../img/tickets/5.png");
        }
      }
    }
  }

  .film_info {
    width: 1200px;
    margin: 0 auto;

    .film_head {
      background: rgba(180, 124, 45, .1);
      padding: 18px 0 30px 35px;

      .tips {
        color: #F40A0A;
        font-size: 18px;
        padding: 0 0 14px 0;

        span {
          height: 7px;
          width: 7px;
          display: inline-block;
          border-radius: 7px;
          margin-right: 10px;
          background-color: #F40A0A;

        }
      }

      .film_name {
        font-size: 24px;
        font-weight: bold;
      }

      .film_item {
        padding: 17px 0 0 0;
        color: #040404;
        font-size: 18px;
      }
    }

    .film_form {
      .table_head {
        span {
          width: 33%;
          text-align: center;
          display: inline-block;
          padding: 30px 0 15px 0;
          font-size: 22px;
        }
      }

      .table_ticket {
        border-top: 2px solid rgba(0, 0, 0, .2);
        border-bottom: 2px solid rgba(0, 0, 0, .2);
        display: block;

        .table_item {
          border-bottom: 1px solid rgba(0, 0, 0, .1);
          padding: 20px 0 15px 0;
          margin: 0;
          display: block;

          &:last-child {
            border: 0;
          }

          &:first-child {
            padding: 20px 0;
          }

          .table_label {
            width: 33%;
            text-align: center;
            display: inline-block;
            font-size: 22px;

            input {
              width: 68px;
              margin: 0 10px;
              border-bottom: 1px solid #ccc;
              text-align: center;
            }

            .table_des {
              font-size: 14px;
              padding: 10px 0;
            }

            .icon {
              width: 42px;
              height: 42px;
              border-radius: 21px;
              display: inline-block;
              background-color: #F5F5F5;
              text-align: center;
              line-height: 42px;
              cursor: pointer;
              user-select: none;

              .iconfont {
                font-size: 20px;
                font-weight: bold;
                color: #B47C2D;
              }
            }

            .jian {
              background-color: #B47C2D;

              .iconfont {
                color: #fff;
              }
            }

            .plus {
              background-color: #B47C2D;

              .iconfont {
                color: #fff;
              }
            }

            .is_disable {
              background-color: #F5F5F5;

              .iconfont {
                color: #C8C8C8;
              }
            }
          }

          /deep/ .el-radio__label {
            display: block;
          }

          /deep/ .el-radio__input {
            position: absolute;
            right: 135px;
          }

          /deep/ .el-radio__inner {
            border-color: #B47C2D;
            width: 23px;
            height: 23px;
            border-radius: 0;

            &:after {
              display: block;
              height: 15px;
              width: 6px;
              background-color: #fff;
              background-size: 100%;
              border: 2px solid #fff;
              border-left: 0;
              border-top: 0;
              position: absolute;
              left: 7px;
              top: 1px;
              border-radius: 0;
              transform: translate(0) scale(0);
              transform: rotate(45deg) scaleY(1) !important;
              transition: transform .15s ease-in, -webkit-transform .15s ease-in;
            }
          }

          /deep/ .el-radio__input.is-checked .el-radio__inner, /deep/ .el-radio__input.is-indeterminate .el-radio__inner {
            background-color: #fff;
          }

          /deep/ .el-radio__input.is-checked + .el-radio__label {
            color: #B47C2D;
          }

          /deep/ .el-radio__input.is-disabled .el-radio__inner {
            border-color: #edf2fc;
            background-color: #edf2fc;
          }

          /deep/ .is-checked {
            .el-radio__inner:after {
              display: block;
              height: 15px;
              width: 6px;
              background-color: #fff;
              background-size: 100%;
              border: 2px solid #00c800;
              border-left: 0;
              border-top: 0;
              position: absolute;
              left: 7px;
              top: 1px;
              border-radius: 0;
              transform: translate(0) scale(0);
              transform: rotate(45deg) scaleY(1) !important;
              transition: transform .15s ease-in, -webkit-transform .15s ease-in;
            }
          }

          /deep/ .el-radio__input.is-disabled + span.el-radio__label {
            color: #c0c4cc;
          }

          /deep/ .is-disabled .el-radio__label {
            color: #edf2fc;
          }
        }
      }

      .ticket_tips {
        text-align: right;
        font-size: 16px;
        padding: 21px 0;
        color: #858585;
      }

      .ticket_total {
        font-size: 18px;
        color: #55555A;
        text-align: right;
        margin-bottom: 50px;

        .price {
          font-size: 18px;
          color: #FF3600;
        }

        .price_num {
          font-size: 26px;
          font-weight: bold;
          color: #FF3600;
        }
      }

      .phone_box {
        /deep/ .el-input {
          width: 400px;
        }
      }

      .login_form {
        /deep/ .el-input {
          width: 393px;
        }

        .verify_number {
          position: absolute;
          width: 121px;
          height: 97%;
          /*background-color: #b5b5b5;*/
          right: 65%;
          top: 1px;
          border-radius: 5px;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .verify_btn {
          position: absolute;
          width: 132px;
          height: 40px;
          background: rgba(195, 150, 87, 1);
          border-radius: 5px;
          border: 0;
          top: 0;
          left: 260px;
          color: #fff;
          cursor: pointer;
          text-align: center;
          outline: none;

          &:active {
            opacity: .7;
          }
        }
      }

      .ticket_next {
        width: 300px;
        background-color: #B47C2D;
        margin: 50px auto;
        border-radius: 24px;
        color: #fff;
        font-size: 16px;
        text-align: center;
        padding: 16px 0;
        cursor: pointer;
      }
    }
  }
</style>
