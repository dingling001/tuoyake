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
          填写预约信息
          <span class="line"></span>
          <span class="dian"></span>
        </div>
        <!-- 步骤条 -->
        <el-steps :active="2" align-center class="date_right">
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
      <div class="person">
        <p class="circle"></p>
        <span class="person_title">预约人信息</span>
        <div class="person-right">
          <span>参观日期</span>
          <span>{{nowDate}}</span>
          <span>{{nowTime}}</span>
          <!--<span>12月6日</span>-->
          <!--<span>周四</span>-->
          <!--<span>9:00-11:00</span>-->
        </div>
      </div>
      <!-- 信息表单 -->
      <div class="table">
        <el-form
          :label-position="labelPosition"
          label-width="200px"
          :model="formLabelAlign"
          :rules="messageRules"
          ref="messageFormRef"
          v-loading="tableloading"
        >
          <el-form-item label="预约类型" prop="yy_type_id">
            <el-select v-model="formLabelAlign.yy_type_id" placeholder="请选择预约类型" @change="changeTeam($event)">
              <el-option :label="item.yy_type" :value="item.yy_type_id"
                         v-for="item in yy_type_list" :key="item.yy_type_id" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="formLabelAlign.yy_type_id==2?'团队负责人':'姓名'" prop="go_username">
            <el-input class="name" placeholder="请输入联系人姓名" type="text"
                      v-model="formLabelAlign.go_username"></el-input>
          </el-form-item>
          <el-form-item label="证件号类型" prop="go_cardtype_id">
            <el-select v-model="formLabelAlign.go_cardtype_id" @change="changeCardType($event)" placeholder="请选择证件类型">
              <el-option :label="item.card_type" :value="item.cardtype_id"
                         v-for="item in guide_detail.cardtype" :key="item.cardtype_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="type" :label="label" prop="go_card_num">
            <el-input :placeholder="placeholder" v-model="formLabelAlign.go_card_num"
                      @blur="formLabelAlign.go_card_num &&formLabelAlign.go_cardtype_id==1&&(formLabelAlign.go_card_num = $event.target.value.toUpperCase())"></el-input>
          </el-form-item>
          <el-form-item label="选择语种" prop="language_id">
            <el-select v-model="formLabelAlign.language_id" @change="changeLanguage($event)" placeholder="请选择语种">
              <el-option :label="item.language_name" :value="item.language_id"
                         v-for="item in guide_detail.language" :key="item.language_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="number" label="参观人数" prop="people_num">
            <el-input placeholder="请输入参观人数" v-model.number="formLabelAlign.people_num"
                      type="number" @input="people_fn"></el-input>
          </el-form-item>
          <el-form-item label="讲解员" prop="guide_num">
            <el-select v-model="formLabelAlign.guide_num" placeholder="请选择讲解员人数" @change="guide_change($event)">
              <el-option :label="item" :value="item" v-for="item in guide_detail.guide_num_max"
                         :key="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="团队名称/旅行社名称" prop="go_teamname" v-if="formLabelAlign.yy_type_id==2">
            <el-input v-if="Object.keys(team_info).length>0" v-model="formLabelAlign.go_teamname" class="phone"
                      disabled></el-input>
            <el-input v-else placeholder="请输入团队名称 / 旅行社名称" class="phone"
                      v-model="formLabelAlign.go_teamname"></el-input>
          </el-form-item>
          <el-form-item label="讲解展厅" prop="exhibition_ids">
            <div class="exhibition_box">
              <div class="checkall">
                <el-checkbox v-model="check_all" @change="checkAll" :disabled="alldisabled">通讲 ￥
                  {{parseFloat(allcost).toFixed(2)}}
                </el-checkbox>
              </div>
              <el-checkbox-group v-model="formLabelAlign.exhibition_ids" @change="checkSingle">
                <el-checkbox :label="item.exhition_id" v-for="item in exhibion_cost_data" :key="item.exhition_id"
                             :disabled="item.disabled">
                  {{item.exhition_name}} ￥<span v-if="formLabelAlign.language_id==1"> {{parseFloat(item.guide_cost.person_cn_exhition).toFixed(2)}}</span><span
                  v-else-if="formLabelAlign.language_id==2">{{parseFloat(item.guide_cost.person_en_exhition).toFixed(2) }}</span>
                </el-checkbox>
              </el-checkbox-group>
              <div class="totalcost">费用：￥{{parseFloat(totalcost).toFixed(2)}}</div>
            </div>
          </el-form-item>
          <el-form-item label="手机号码" prop="contact_phone">
            <el-input placeholder="请输入手机号" class="phone" v-model="formLabelAlign.contact_phone"></el-input>
          </el-form-item>
          <el-form-item label="图形验证码" prop="verify">
            <el-input class="verify" v-model="formLabelAlign.verify" placeholder="请输入图形验证码"></el-input>
            <div class="verify_number" @click="getImg"><img :src="imgUrl" alt=""></div>
            <div class="exchange" @click="getImg">换一换</div>
          </el-form-item>
          <el-form-item label="短信验证码" prop="verifys" v-if="api_token==undefined||api_token==''">
            <el-input class="verifys" v-model="formLabelAlign.verifys" placeholder="请输入短信验证码"></el-input>
            <div class="verify_btn" v-show="show_time" @click="getCode">获取验证码</div>
            <div class="verify_btn" v-show="!show_time">{{count}} S</div>
          </el-form-item>
        </el-form>
        <p class="attention" v-html="guide_detail.text_guide"></p>
        <div class="footer">
          <div @click="$router.back(-1)" class="cancel">取消</div>
          <!--<div class="sure" @click="appointment_fn">确定</div>-->
          <el-button class="sure" @click="appointment_fn('messageFormRef')">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import crypto from "crypto";
  import U from '@/bin/common'

  export default {
    name: 'explain_message',
    data() {
      // 手机号校验
      var checkPhone = (rule, value, callback) => {
        if (!value.trim()) {
          return callback(new Error("手机号不能为空"));
        }
        if (!U.checkPhone(value)) {
          return callback(new Error("手机号不正确"));
        } else {
          callback();
        }
      };
      // 身份证校验
      var checkType = (rule, value, callback) => {
        if (!value.trim()) {
          return callback(new Error(this.label + "不能为空"));
        } else if (!U.checkIdcard(value).status && this.label_id == 1) {
          return callback(new Error(this.label + "号有误"));
        } else if (!/^[a-zA-Z0-9]{5,17}$/.test(value) && this.label_id == 2) {
          return callback(new Error(this.label + "号有误"));
        } else if (!/^[a-z0-9]{5,12}$/i.test(value) && this.label_id == 3 || this.label_id == 4 || this.label_id == 5 || this.label_id == 6) {
          return callback(new Error(this.label + "号有误"));
        } else {
          callback();
        }
      };

      return {
        // 激活步骤条
        activeStep: "2",
        labelPosition: "right",
        formLabelAlign: {
          yy_type_id: '',//预约类型
          go_username: "", //姓名
          exhibition_ids: [],//展厅
          go_cardtype_id: "", //证件号类型
          go_card_num: "", //身份证号码
          people_num: "", //参观人数
          language_id: "", //选择语种
          guide_num: "", // 讲解员
          contact_phone: "", //手机号码
          verify: "",
          verifys: "", //短信验证码,
          go_teamname: ''//团队名称
        },
        // 信息进行校验
        messageRules: {
          yy_type_id: {required: true, message: '请选择预约类型', trigger: 'change'},
          go_teamname: {required: true, message: '请输入团队名称 / 旅行社名称', trigger: 'blur'},
          go_username: [{required: true, message: '请输入联系人姓名', trigger: 'blur'},
            {min: 2, message: '长度在2个字符以上', trigger: 'blur'}],
          go_cardtype_id: {required: true, message: '请选择证件类型', trigger: 'change'},
          go_card_num: {required: true, validator: checkType, trigger: 'blur'},
          people_num: [
            {required: true, message: '参观人数不能为空', trigger: 'blur'},
            {type: 'number', min: 1, message: '参观人数必须大于1', trigger: 'blur'}
          ],
          guide_num: {required: true, message: '请选择讲解人数', trigger: 'change'},
          exhibition_ids: {required: true, message: '请选择讲解展厅', trigger: 'change'},
          language_id: {required: true, message: '请选择语种', trigger: 'change'},
          verify: {required: true, message: '请输入图形验证码', trigger: 'blur'},
          verifys: {required: true, message: '请输入短信验证码', trigger: 'blur'},
          contact_phone: {required: true, validator: checkPhone, trigger: "blur"},
        },
        yy_type_list: [
          {yy_type: '个人预约', yy_type_id: 1, disabled: false},
          {yy_type: '团队预约', yy_type_id: 2, disabled: false}
        ],
        gd_id: '',//日期id
        nowDate: '',//日期
        gd_tp_id: '',//时间id
        nowTime: '',//时间
        guide_detail: {
          cardtype: [],
          guide_num_max: 0,
          language: '',
          guide_cost: ''
        },
        imgUrl: '',
        api_token: '',
        device_uuid: '',
        show_time: true,
        count: 0,
        timer: null,
        label: '',
        placeholder: '',
        checkImg: false,//图形验证码状态
        label_id: '',
        is_team: 0,// 是否注册团队
        team_info: [],//团队信息
        team_type: 0,
        guide_person_allownum: 0,
        guide_team_allownum: 0,
        allownum: 0,
        check_all: false,
        exhibion_cost_data: [],
        tableloading: true,
        exhibion_cost_data_ids: [],
        allcost: 0,
        totalcost: 0,
        alldisabled: false,
        open_date: []
      };
    },
    inject: ["app"],
    created() {
      // getUser
      this.api_token = localStorage.api_token;
      this.get_GuideDetail();
      this.getImg();
      if (localStorage.gd_id && localStorage.nowDate && localStorage.nowTime && localStorage.gd_tp_id) {
        this.gd_tp_id = localStorage.gd_tp_id;
        // console.log(localStorage.gd_tp_id)
        var nowDate = localStorage.nowDate;
        this.nowDate = U.dateFtt("MM月dd日", new Date(localStorage.nowDate));
        this.nowTime = localStorage.nowTime;
        if (new Date(nowDate).getDay() == 6 || new Date(nowDate).getDay() == 0) {
          this.yy_type_list[1].disabled = true;
          // this.get_Calendar();
        }
      } else {
        this.$router.push('/explain')
      }
      if (localStorage.getItem('post')) {
        let post = JSON.parse(localStorage.getItem('post'));
        this.formLabelAlign.go_username = post.go_username;
        this.formLabelAlign.go_card_num = post.go_card_num;
        this.formLabelAlign.people_num = post.people_num;
        this.formLabelAlign.guide_num = post.guide_num;
        this.formLabelAlign.contact_phone = post.contact_phone;
        this.formLabelAlign.language_id = post.language_id;
        this.formLabelAlign.go_teamname = post.go_teamname;
      }
      if (localStorage.api_token) {
        this.getUser();
        this.get_team();
      }
    },
    methods: {
      // 获取预约详情
      get_GuideDetail() {
        this.$api.GuideDetail().then(res => {
          this.tableloading = false;
          // console.log(res)
          this.guide_detail = res.data;
          this.guide_num_max = res.data.guide_num_max;
          this.guide_person_allownum = res.data.guide_person_allownum;
          this.guide_team_allownum = res.data.guide_team_allownum;
          this.exhibion_cost_data = res.data.exhibion_cost_data;
          this.allownum = this.guide_person_allownum;
          this.label = this.guide_detail.cardtype[0].card_type;
          this.formLabelAlign.yy_type_id = this.yy_type_list[0].yy_type_id
          this.formLabelAlign.language_id = res.data.language[0].language_id;
          this.allcost = res.data.language[0].guide_cost_person;
          this.formLabelAlign.guide_num = 1;
          this.formLabelAlign.go_cardtype_id = this.guide_detail.cardtype[0].cardtype_id;
          this.placeholder = '请输入' + this.label;
          for (var k in this.exhibion_cost_data) {
            this.exhibion_cost_data_ids.push(this.exhibion_cost_data[k].exhition_id);
            this.exhibion_cost_data[k].disabled = false;
          }
          if (localStorage.getItem('post')) {
            var post = JSON.parse(localStorage.getItem('post'));
            for (var i in this.guide_detail.cardtype) {
              if (post.go_cardtype_id == this.guide_detail.cardtype[i].cardtype_id) {
                this.label = this.guide_detail.cardtype[i].card_type;
                this.formLabelAlign.go_cardtype_id = post.go_cardtype_id;
                this.placeholder = '请输入' + this.label;
              }
            }
            var language = this.guide_detail.language;
            for (var j in this.yy_type_list) {
              if (post.yy_type_id == this.yy_type_list[j].yy_type_id) {
                this.formLabelAlign.yy_type_id = this.yy_type_list[j].yy_type_id;
                if (this.formLabelAlign.yy_type_id == 2) {
                  this.allownum = this.guide_team_allownum;
                  this.formLabelAlign.exhibition_ids = 0;
                  this.team_type = 1;
                  for (var i in language) {
                    if (this.formLabelAlign.language_id == language[i].language_id) {
                      this.allcost = language[i].guide_cost_team;
                    }
                  }
                  for (var j in this.exhibion_cost_data) {
                    this.exhibion_cost_data[j].disabled = true;
                  }
                }
              }
            }
            if (post.language_id == 2) {
              this.check_all = true;
              this.formLabelAlign.exhibition_ids = 0;
              for (var j in this.exhibion_cost_data) {
                this.exhibion_cost_data[j].disabled = true;
              }
              this.allcost = this.guide_detail.language[1].guide_cost_team
            }
          }
          this.totalPrice()
        })
      },
      // 获取日历
      get_Calendar() {
        this.$api.GetCalendar().then((res) => {
          if (res.status == 1) {
            var nowdate = U.dateFtt("yyyy-MM-dd", new Date(localStorage.nowDate));
            this.open_date = res.data.opened_date;
            for (var i in this.open_date) {
              if (this.open_date[i] == nowdate) {
                this.yy_type_list[1].disabled = false;
              }
            }
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      },
      // 选择全部展厅
      checkAll(val) {
        if (this.check_all) {
          this.formLabelAlign.exhibition_ids = 0;
          for (var i in this.exhibion_cost_data) {
            this.exhibion_cost_data[i].disabled = true;
          }
        } else {
          this.formLabelAlign.exhibition_ids = [];
          for (var j in this.exhibion_cost_data) {
            this.exhibion_cost_data[j].disabled = false;
          }
        }
        this.totalPrice();
      },
      // 单个选择
      checkSingle(value) {
        this.alldisabled = this.formLabelAlign.exhibition_ids.length > 0;
        this.totalPrice();
      },
      // 判断用户是否注册团体
      getUser() {
        this.$api.getUser().then(res => {
          if (res.status == 1) {
            this.is_team = res.data.is_team;
          }
        })
      },
      // 计算总价
      totalPrice() {
        this.totalcost = 0;
        // if (this.formLabelAlign.yy_type_id == 1) {
        if (this.check_all) {
          for (var i in this.guide_detail.language) {
            if (this.formLabelAlign.language_id == this.guide_detail.language[i].language_id) {
              if (this.formLabelAlign.yy_type_id == 1) {
                this.totalcost = this.formLabelAlign.guide_num * this.guide_detail.language[i].guide_cost_person
              } else {
                this.totalcost = this.formLabelAlign.guide_num * this.guide_detail.language[i].guide_cost_team
              }
            }
          }
        } else {
          for (var j in this.exhibion_cost_data) {
            for (var k in this.formLabelAlign.exhibition_ids) {
              if (this.exhibion_cost_data[j].exhition_id == this.formLabelAlign.exhibition_ids[k]) {
                if (this.formLabelAlign.language_id == 1) {
                  if (this.formLabelAlign.yy_type_id == 1) {
                    this.totalcost += this.formLabelAlign.guide_num * this.exhibion_cost_data[j].guide_cost.person_cn_exhition
                  } else {
                    this.totalcost += this.formLabelAlign.guide_num * this.exhibion_cost_data[j].guide_cost.team_cn_exhition
                  }
                } else if (this.formLabelAlign.language_id == 2) {
                  if (this.formLabelAlign.yy_type_id == 1)
                    this.totalcost += this.formLabelAlign.guide_num * this.exhibion_cost_data[j].guide_cost.person_en_exhition
                }
              }
            }
          }
          // this.totalcost = this.formLabelAlign.guide_num * this.guide_detail.language[k].guide_cost_person
        }
        // } else if (this.formLabelAlign.yy_type_id == 2) {
        //   for (var h in this.guide_detail.language) {
        //     if (this.formLabelAlign.language_id == this.guide_detail.language[h].language_id) {
        //       if (this.check_all) {
        //         this.totalcost = this.formLabelAlign.guide_num * this.guide_detail.language[h].guide_cost_team
        //       }
        //       else{
        //         for (var n in this.exhibion_cost_data) {
        //           for (var m in this.formLabelAlign.exhibition_ids) {
        //             if (this.exhibion_cost_data[n].exhition_id == this.formLabelAlign.exhibition_ids[m]) {
        //               if (this.formLabelAlign.language_id == 1) {
        //                 this.totalcost += this.formLabelAlign.guide_num * this.exhibion_cost_data[n].guide_cost.person_cn_exhition
        //               } else if (this.formLabelAlign.language_id == 2) {
        //                 this.totalcost += this.formLabelAlign.guide_num * this.exhibion_cost_data[n].guide_cost.person_en_exhition
        //               }
        //             }
        //           }
        //         }
        //       }
        //     }
        //   }
        // }
        // console.log(this.totalcost)
      },
      // 获取团队信息
      get_team() {
        this.$api.PW_PC_teamInfo(localStorage.api_token).then(res => {
          if (res.status == 1 && res.data.team_status == 2) {
            this.team_info = res.data;
            this.formLabelAlign.go_teamname = res.data.team_username;
          } else {
            // this.formLabelAlign.team_name=res.msg;
          }
        })
      },
      // 监听输入人数
      people_fn() {
        var guide_value = Number(this.formLabelAlign.guide_num);
        for (var i = 1; i < this.guide_detail.guide_num_max + 1; i++) {
          if (i == guide_value) {
            if (this.formLabelAlign.people_num > i * this.allownum) {
              this.$message({
                message: '每位讲解员最多携带' + this.allownum + '人',
                type: 'error'
              });
              this.formLabelAlign.people_num = i * this.allownum;
            }
          }
        }
      },
      // 讲解员人数变化
      guide_change(e) {
        var guide_value = Number(e);
        for (var i = 1; i < this.guide_detail.guide_num_max + 1; i++) {
          if (i == guide_value) {
            if (this.formLabelAlign.people_num > i * this.allownum) {
              this.$message({
                message: '每位讲解员最多携带' + this.allownum + '人',
                type: 'error'
              });
              this.formLabelAlign.people_num = i * this.allownum;
            }
          }
        }
        this.totalPrice();
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
                this.getImg()
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
      // 改变证件类型
      changeCardType(e) {
        let cardtype = this.guide_detail.cardtype;
        for (let i in cardtype) {
          if (e == cardtype[i].cardtype_id) {
            this.label = cardtype[i].card_type;
            this.label_id = cardtype[i].cardtype_id;
            this.placeholder = '请输入' + this.label;
            this.formLabelAlign.go_card_num = ''
          }
        }
      },
      // 改变语言
      changeLanguage(e) {
        let language = this.guide_detail.language;
        for (let i in language) {
          if (e == language[i].language_id) {
            // language_text = language[i].language_name;
            // localStorage.setItem('language_name', language_text);
            if (this.formLabelAlign.yy_type_id == 1) {
              this.allcost = language[i].guide_cost_person
            } else if (this.formLabelAlign.yy_type_id == 2) {
              this.allcost = language[i].guide_cost_team
            }
          }
        }
        if (e == 2 && this.formLabelAlign.yy_type_id == 2 || e == 2 && this.formLabelAlign.yy_type_id == 1) {
          this.formLabelAlign.exhibition_ids = 0;
          for (var j in this.exhibion_cost_data) {
            this.exhibion_cost_data[j].disabled = true;
          }
        } else if (e == 1 && this.formLabelAlign.yy_type_id == 1) {
          for (var k in this.exhibion_cost_data) {
            this.exhibion_cost_data[k].disabled = false;
          }
        }
        this.formLabelAlign.exhibition_ids = [];
        this.check_all = false;
        this.formLabelAlign.people_num = '';
        this.totalPrice();
      },
      // 改变预约类型
      changeTeam(e) {
        var language = this.guide_detail.language;
        if (e == 1) {
          this.allownum = this.guide_person_allownum;
          this.team_type = 0;
          for (var i in language) {
            if (this.formLabelAlign.language_id == language[i].language_id) {
              this.allcost = language[i].guide_cost_person;
              if (language[i].language_id == 2) {
                for (var j in this.exhibion_cost_data) {
                  this.exhibion_cost_data[j].disabled = true;
                }
              } else if (language[i].language_id == 1) {
                for (var j in this.exhibion_cost_data) {
                  this.exhibion_cost_data[j].disabled = false;
                }
              }
            }
          }
        } else if (e == 2) {
          this.allownum = this.guide_team_allownum;
          this.team_type = 1;
          for (var i in language) {
            if (this.formLabelAlign.language_id == language[i].language_id) {
              this.allcost = language[i].guide_cost_team;
            }
          }
          for (var j in this.exhibion_cost_data) {
            this.exhibion_cost_data[j].disabled = false;
          }
        }
        this.alldisabled = false;
        this.check_all = false;
        this.formLabelAlign.exhibition_ids = [];
        this.formLabelAlign.people_num = '';
        this.totalPrice();
      },
      // 预约
      appointment_fn(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.api_token) {
              this.$api.ExplainCheckImg(this.formLabelAlign.verify, this.device_uuid).then((res) => {
                if (res.status == 1) {
                  let post = {
                    api_token: this.api_token,
                    yy_type_id: this.formLabelAlign.yy_type_id,
                    go_teamname: this.formLabelAlign.go_teamname,
                    exhibition_ids: this.check_all ? 0 : this.formLabelAlign.exhibition_ids.toString(),
                    gd_tp_id: this.gd_tp_id,
                    go_username: this.formLabelAlign.go_username,
                    go_cardtype_id: this.formLabelAlign.go_cardtype_id,
                    go_card_num: this.formLabelAlign.go_card_num,
                    contact_phone: this.formLabelAlign.contact_phone,
                    people_num: this.formLabelAlign.people_num,
                    language_id: this.formLabelAlign.language_id,
                    guide_num: this.formLabelAlign.guide_num,
                    price: this.totalcost
                  };
                  if (this.formLabelAlign.yy_type_id == 2) {
                    this.$api.PW_PC_teamInfo(this.api_token).then(res_team => {
                      if (res_team.status == 1) {
                        if (res_team.data.team_status == 2) {
                          this.$router.push({path: '/explain/order'});
                        } else if (res_team.data.team_status == 1) {
                          this.openTips('您的团队信息正在待审核', '提示', '知道了')
                        } else if (res_team.data.team_status == 3) {
                          this.openTips('您的团队信息未通过审核，请联系客服', '提示', '知道了')
                        } else if (res_team.data.team_status == 4) {
                          this.openTips('您的团队信息暂不可用，请联系客服', '提示', '知道了')
                        }
                      } else {
                        // 否则去注册团体
                        this.openTeamReg();
                      }
                    })
                  } else {
                    this.$router.push({path: '/explain/order'})
                  }
                  localStorage.setItem('post', JSON.stringify(post))
                } else {
                  this.$message({
                    message: res.msg,
                    type: 'error'
                  });
                  this.getImg()
                }
              })
            } else {
              this.$api.getLogin(this.formLabelAlign.contact_phone, this.formLabelAlign.verifys).then(res => {
                if (res.status == 1) {
                  localStorage.api_token = res.data.api_token;
                  this.app.getUser();
                  this.api_token = res.data.api_token;
                  let post = {
                    api_token: this.api_token,
                    yy_type_id: this.formLabelAlign.yy_type_id,
                    go_teamname: this.formLabelAlign.go_teamname,
                    exhibition_ids: this.check_all ? 0 : this.formLabelAlign.exhibition_ids.toString(),
                    gd_tp_id: this.gd_tp_id,
                    go_username: this.formLabelAlign.go_username,
                    go_cardtype_id: this.formLabelAlign.go_cardtype_id,
                    go_card_num: this.formLabelAlign.go_card_num,
                    contact_phone: this.formLabelAlign.contact_phone,
                    people_num: this.formLabelAlign.people_num,
                    language_id: this.formLabelAlign.language_id,
                    guide_num: this.formLabelAlign.guide_num,
                    price: this.totalcost
                  };
                  localStorage.setItem('post', JSON.stringify(post))
                  if (this.formLabelAlign.yy_type_id == 2) {
                    this.$api.PW_PC_teamInfo(res.data.api_token).then(res_team => {
                      if (res_team.status == 1 && res.data.is_team == 1 && res_team.data.team_status == 2) {
                        // 如果是团体
                        if (this.formLabelAlign.go_teamname == res_team.data.team_username) {
                          // 检查团体名称是否一致
                          this.$router.push({path: '/explain/order'});
                        } else {
                          // 不一致提示是否修改
                          this.openTeamName()
                        }
                      } else {
                        // 否则去注册团体
                        this.openTeamReg();
                      }
                    })
                  } else {
                    this.$router.push({path: '/explain/order'});
                  }
                } else {
                  this.$message({
                    message: res.msg,
                    type: 'error'
                  });
                }
              })
            }
          } else {
            // console.log('error submit!!');
            this.$message({
              message: '请完善表单信息',
              type: 'error'
            });
            return false;
          }
        });
      },
      // 去注册团体
      openTeamReg() {
        this.$confirm('还未注册团体，请先注册团体', '提示', {
          confirmButtonText: '注册',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.replace({path: '/pw/team/register'})
        }).catch(() => {
        });
      },
      // 填写团体不一致
      openTeamName() {
        this.$confirm('您填写的团队或旅行社名称不匹配是否自动填写为注册时的团体名称？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.get_team();
        }).catch(() => {
        });
      },
      // 提示信息
      openTips(msg = '是否执行此操作？', title = '提示信息', btntext = '确定') {
        this.$alert(msg, title, {
          confirmButtonText: btntext,
          showClose: false
        });
      },
      // // 重置表单
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // },
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

  // 个人信息
  .messages {
    width: 1200px;
    margin: 20px auto;
    box-sizing: border-box;

    /deep/ .el-loading-mask {
      z-index: 10;
    }

    .person {
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

      .person_title {
        color: #fff;
        padding-left: 65px;
      }

      .person-right {
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

    // 表单
    .table {
      margin-top: 30px;
      margin-left: 50px;

      /deep/ .el-form-item__label {
        font-size: 16px;
        color: #282828;
      }

      /deep/ .el-checkbox {
        margin-right: 50px;
      }

      .exhibition_box {
        border: 1px solid #dcdfe6;
        border-radius: 1px;
        width: 891px;
        padding: 0 20px;

        .totalcost {
          text-align: right;
          font-size: 16px;
          color: #DC613A;
        }

        /deep/ .el-checkbox__label {
          font-size: 16px;
          color: #000;
        }

        .checkall {
          border-bottom: 1px solid #dcdfe6;
        }

        /deep/ .el-checkbox__inner {
          border-color: #B47C2D;
        }

        /deep/ .el-checkbox__input.is-checked .el-checkbox__inner, /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background-color: #fff;
        }

        /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
          color: #B47C2D;
        }

        /deep/ .el-checkbox__input.is-disabled .el-checkbox__inner {
          border-color: #edf2fc;
          background-color: #edf2fc;
        }

        /deep/ .el-checkbox__inner:after {
          border-color: #30CC72;
          border-width: 2px;
        }

        /deep/ .el-checkbox__input.is-disabled + span.el-checkbox__label {
          color: #c0c4cc;
        }

        /deep/ .is-disabled .el-checkbox__label {
          color: #edf2fc;
        }
      }

      /deep/ .name .el-input__inner {
        width: 393px;
      }

      /deep/ .type .el-input__inner {
        width: 393px;
      }

      /deep/ .number .el-input__inner {
        width: 393px;
      }

      /deep/ .phone .el-input__inner {
        width: 393px;
      }

      .verify_number {
        position: absolute;
        width: 121px;
        height: 80%;
        /*height: 85%;*/
        /*background-color: #b5b5b5;*/
        right: 67%;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border-radius: 5px;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .exchange {
        position: absolute;
        /*width: 50px;*/
        /*height: 16px;*/
        padding: 0 15px;
        font-size: 14px;
        color: #b47c2d;
        right: 58%;
        top: 4%;
        cursor: pointer;
      }

      /deep/ .verify .el-input__inner {
        width: 321px;
        position: relative;
      }

      .verify_btn {
        position: absolute;
        width: 132px;
        height: 40px;
        background: rgba(195, 150, 87, 1);
        border-radius: 5px;
        border: 0;
        top: 0;
        left: 300px;
        color: #fff;
        cursor: pointer;
        text-align: center;
        outline: none;

        &:active {
          opacity: .7;
        }
      }

      .attention {
        margin: 50px 77px auto;
        /*font-size: 16px;*/
        line-height: 25px;
        text-align: justify;
        color: red;
      }

      /deep/ .verifys .el-input__inner {
        width: 249px;
      }

      .footer {
        margin: 77px auto 105px auto;
        overflow: hidden;

        .cancel {
          float: left;
          width: 240px;
          height: 48px;
          line-height: 48px;
          text-align: center;
          border: 1px solid rgba(210, 210, 210, 1);
          border-radius: 24px;
          margin-left: 200px;
          cursor: pointer;
        }

        .sure {
          float: right;
          width: 240px;
          height: 48px;
          /*line-height: 48px;*/
          color: #fff;
          text-align: center;
          background: rgba(180, 124, 45, 1);
          opacity: 0.8;
          border-radius: 24px;
          margin-right: 200px;
        }
      }
    }
  }
</style>
