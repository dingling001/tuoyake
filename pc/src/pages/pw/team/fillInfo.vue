<template>
  <div class="container">
    <!-- 步进条 -->
    <ProgressBar progressTitle="填写预约信息" :progressActiveNum="2"></ProgressBar>
    <!-- header -->
    <div class="header">
      <div class="preson">
        <p class="circle"></p>
        <span class="preson_title">团队信息</span>
        <div class="preson-right">
          <span>参观日期</span>
          <span>{{visitDate}}</span>
        </div>
      </div>
      <div class="team-info">
        <h3 class="title">团队信息</h3>
        <div class="info">
          <div class="name clearfix">
            <span>团体类型：</span>
            <span>{{teamInfo.team_type_name}}</span>
          </div>
          <div class="from clearfix">
            <span>团体名称：</span>
            <span>{{teamInfo.teamname}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- team leader information  -->
    <el-form label-width="120px" :model="ruleForm" :rules="rules" ref="form" class="form-contain">
      <el-form-item label="联系人信息" class="form-item-title"></el-form-item>
      <el-form-item label="联系人姓名" prop="name">
        <el-input class="name" placeholder="请输入联系人姓名" clearable v-model.trim="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idcard">
        <el-input class="name" placeholder="请输入领队身份证号码" clearable v-model.trim="ruleForm.idcard" @blur="ruleForm.idcard && (ruleForm.idcard = $event.target.value.toUpperCase())"></el-input>
      </el-form-item>
      <el-form-item label="领队电话" prop="phone">
        <el-input class="name" type="tel" placeholder="请输入领队电话" clearable v-model.trim="ruleForm.phone" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="行程单号" prop="tripNum">
        <el-input class="name" placeholder="请填写行程单号（选填）" clearable v-model.trim="ruleForm.tripNum"></el-input>
      </el-form-item>
      <!-- member list -->
      <el-form-item label="参观者信息" class="form-item-title"></el-form-item>
      <el-form-item label="参观者名单" prop="files" ref="files">
        <el-upload class="upload" name="listexcel" action="" accept=".xls,.xlsx" :file-list="ruleForm.files" :limit="1" :show-file-list="true" :before-remove="beforeRemove" :on-exceed="handleFileExceed" :on-change="(file,fileList) => handleFileChange(file,fileList,1)" :on-remove="(file,fileList) => handleFileRemove(file,fileList,1)" :http-request="handleUpload">
          <el-button slot="trigger" class="upload__btn">上传表格</el-button>
          <span @click="downloadExcel">模板下载</span>
          <span v-if="excelSuccess || (ruleForm.files.length>0)" @click="dialogVisible = true">查看名单</span>
          <span v-if="excelError" @click="dialogVisible = true">数据错误,查看详情</span>
        </el-upload>
      </el-form-item>
      <el-form-item label="参观人数" required>
        <div style="color: #B47C2D">{{ruleForm.visitNum || "名单待上传"}}</div>
      </el-form-item>
      <!-- 参观公函 -->
      <el-form-item label="参观公函" prop="proveAtta" ref="proveAtta">
        <el-upload class="upload" name="prove_atta" action="" accept="image/*" :auto-upload="false" :file-list="ruleForm.proveAtta" :limit="1" :show-file-list="true" list-type="picture" :before-remove="beforeRemove" :on-exceed="handleFileExceed" :on-change="(file,fileList) => handleFileChange(file,fileList,2)" :on-remove="(file,fileList) => handleFileRemove(file,fileList,2)">
          <el-button slot="trigger" class="upload__btn">上传图片</el-button>
          <span @click="downloadDoc">模板下载</span>
          <span @click="attaVisible = true">点击查看示例</span>
          <div slot="tip" class="upload__tip">
            <p>1、仅支持上传扫描件</p>
            <p>2、支持 JPG、JPEG、PNG格式</p>
          </div>
        </el-upload>
      </el-form-item>
      <!-- 选择参观票 -->
      <el-form-item class="form-item-title" label="选择参观票"></el-form-item>
      <el-form-item class="form-item-checkbox" label-width="0" prop="ticketsId">
        <el-checkbox-group v-model="ruleForm.ticketsId">
          <div v-for="(item, index) in ticketsInfo" :key="index">
            <el-checkbox :label="item.td_tp_id" :disabled="item.ticket_id==1">{{item.ticket_name}}</el-checkbox>
            <span class="right">¥{{parseFloat(item.ticket_price).toFixed(2)}}</span>
          </div>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div class="count">
      <span>总计：</span>
      <span>￥ {{calcPrice}}</span>
    </div>
    <div class="btn-wrap">
      <el-button class="btn back" @click="$router.back()">上一步</el-button>
      <el-button class="btn sub" @click="submitForm('form')">下一步</el-button>
    </div>
    <el-dialog title="团体预约观众信息登记" :lock-scroll="false" :visible.sync="dialogVisible">
      <div class="excel-block" v-if="ruleForm.toi_username.length">
        <p>审核通过的数据：</p>
        <table>
          <colgroup>
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>
          <tr>
            <th>姓名</th>
            <th>证件类型</th>
            <th>证件号</th>
          </tr>
          <tr class="info-item" v-for="(item, index) in ruleForm.toi_username" :key="index">
            <td>{{item}}</td>
            <td>{{ruleForm.toi_cardtype[index]}}</td>
            <td>{{ruleForm.toi_card_num[index]}}</td>
          </tr>
        </table>
      </div>
      <div class="excel-block" v-if="excelError && ruleForm.excel_error_list.length">
        <p>审核未通过的数据：</p>
        <table>
          <colgroup>
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
            <col />
          </colgroup>
          <tr>
            <th>姓名</th>
            <th>证件类型</th>
            <th>证件号</th>
            <th>审核失败原因</th>
          </tr>
          <tr class="info-item" v-for="(item, index) in ruleForm.excel_error_list" :key="index">
            <td>{{item.toi_username}}</td>
            <td>{{item.toi_cardtype}}</td>
            <td>{{item.toi_card_num}}</td>
            <td class="red">{{item.e_msg}}</td>
          </tr>
        </table>
      </div>
    </el-dialog>
    <el-dialog title="参观公函示例" :lock-scroll="false" :visible.sync="attaVisible">
      <img src="../../../img/teampw/gonghan.png">
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios';
import localforage from "localforage";
import ProgressBar from '../common/progressBar.vue';
import utils from "@/bin/common.js";
import { Session } from '@/bin/cache.js';

var checkCardType = (rule, value, callback) => {
  if (!value.trim()) {
    return callback(new Error("身份证号不能为空"));
  }
  if (!utils.checkIdcard(value).status) {
    return callback(new Error("身份证号有误"));
  } else {
    callback();
  }
};

var checkPhone = (rule, value, callback) => {
  if (!value.trim()) {
    return callback(new Error("手机号不能为空"));
  }
  if (!utils.checkPhone(value)) {
    return callback(new Error("手机号不正确"));
  } else {
    callback();
  }
};

export default {
  name: "fillinfo",
  data() {
    return {
      apiToken: localStorage.api_token || "",
      td_id: Session.get('hbpw_team__td_id'),
      td_tp_id: Session.get('hbpw_team__td_tp_id'), //日期时段id
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
        visitNum: 0, // 参观人数
        ticketsId: [], //已选门票id，包含基础门票（其中基础门票必选，ticket_id等于1为基础票）
        toi_username: [], //上传的姓名数组
        toi_cardtype: [], //上传的证件类型数组
        toi_cardtype_id: [], //上传的证件类型id数组
        toi_card_num: [], //上传的证件号码数组
        excel_error_list: [], //上传错误数据数组
      },
      //要校验的字段必须在上面的ruleForm对象内
      rules: {
        name: { required: true, message: "请输入联系人姓名", trigger: "change" },
        idcard: { required: true, validator: checkCardType, trigger: "change" },
        phone: { required: true, validator: checkPhone, trigger: "change" },
        files: { required: true, message: "请上传表格", trigger: "change" },
        proveAtta: { required: true, message: "请上传文件", trigger: "change" },
        ticketsId: { required: true, message: "请至少选择一张门票", type: "array", trigger: "change" }
      },
      excelSuccess: false, //上传excel数据成功
      excelError: false, //上传excel数据错误
      dialogVisible: false, //名单弹层
      attaVisible: false, //公函弹层
    };
  },
  components: {
    ProgressBar
  },
  computed: {
    calcPrice() {
      let price = 0;
      let newArr = [];

      for (let id of this.ruleForm.ticketsId) {
        newArr.push(...this.ticketsInfo.filter(o => id == o.td_tp_id));
      }

      for (let item of newArr) {
        price += parseFloat(item.ticket_price, 10) * (this.ruleForm.visitNum || 1);
      }
      return price.toFixed(2);
    }
  },
  created() {
    this.getTeamInfo(); //团体信息
    this.getTeamTicketsDetail(); //门票详情
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
          //基础票ticket_id为1 默认勾选
          this.ruleForm.ticketsId[0] = this.ticketsInfo.find((o) => o.ticket_id == 1).td_tp_id;
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
    //下载模板
    downloadExcel() {
      window.open(STATIC_WEB_URL + '/团体人员名单模板.xlsx', '_self');
    },
    downloadDoc() {
      window.open(STATIC_WEB_URL + '/参观公函.docx', '_self');
    },
    /**
     * @数据回显
     */
    getForm() {
      let _self = this;
      // localforage.clear();
      localforage.getItem('hbpw_team__fill_form').then(res => {
        // console.log(res)
        if (!!res) {
          //基础票ticket_id为1 默认勾选（重新赋值）
          let baseTicket = this.ticketsInfo.find((o) => o.ticket_id == 1).td_tp_id;
          let canTickets = res.ticketsId.slice(1); //可选门票列表
          //此处判断缓存中的和当前接口返回的门票信息是否匹配，若不匹配则删除缓存中的对应门票id
          for (let i in canTickets) {
            let index = this.ticketsInfo.findIndex(o => canTickets[i] == o.td_tp_id);
            if (index == -1) canTickets.splice(i, 1);
          }
          res.ticketsId = [baseTicket, ...canTickets];

          res.proveAtta.forEach(item => {
            item.url = this.getImgUrl(item.raw); //图片回显
          })

          this.ruleForm = res;
        }
      })
    },
    getImgUrl(file) {
      return window[window.webkitURL ? 'webkitURL' : 'URL'].createObjectURL(new Blob([file]));
    },
    /**
     * @超限提示
     */
    handleFileExceed(file, fileList) {
      this.$message({
        message: '当前限制选择 1 个文件，请删除后继续上传',
        type: 'warning',
        during: 1000,
      });
    },
    /**
     * @删除前确认
     */
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    /**
     * @文件预览
     */
    handleFileChange(file, fileList, type) {
      this.handleFileOpt(file, fileList, type);
    },
    /**
     * @图片删除
     */
    handleFileRemove(file, fileList, type) {
      this.handleFileOpt(file, fileList, type);
      if (+type == 1) {
        this.ruleForm.visitNum = 0;
        this.excelSuccess = false; //隐藏`上传excel数据成功`
        this.excelError = false; //隐藏`上传excel数据错误`
      }
      this.$message({
        message: '文件已删除，请重新上传',
        type: 'warning',
        during: 2000,
      });
    },
    /**
     * @
     */
    handleFileOpt(file, fileList, type) {
      //0参观名单,1参观公函
      let formField = ['files', 'proveAtta'][+type - 1];
      this.ruleForm[formField] = fileList;
      //如果文件为空了说明并没有提交文件所以需要显示警告
      // 如果上传了就不显示提示文件警告
      if (typeof this.ruleForm[formField] != "undefined") {
        if (this.ruleForm[formField].length > 0) {
          this.$refs[formField].clearValidate(formField);
        } else {
          this.$refs[formField].validate(formField);
        }
      }
    },
    /**
     * @团体名单上传服务器验证
     */
    handleUpload(param) {
      let file = param.file;
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
      let extension = testmsg === 'xls' || testmsg == 'xlsx';
      let isLt2M = file.size / 1024 / 1024 < 2;
      if (!extension) {
        this.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'warning'
        });
        return;
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 2MB!',
          type: 'warning'
        });
        return;
      }
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append('p', 'w');
        formData.append('api_token', this.apiToken);
        formData.append('td_id', this.td_id);
        formData.append('listexcel', file);

        axios.post(STATIC_PW_URL + "/api/teamticketorder/listcheck", formData).then(response => {
          let res = response.data;
          if (res.status == 405) {
            this.app.openLogin();
            return;
          }
          if (res.status == 1) {
            // console.log(res)
            this.ruleForm.toi_username = res.data.toi_username;
            this.ruleForm.toi_cardtype = res.data.toi_cardtype;
            this.ruleForm.toi_cardtype_id = res.data.toi_cardtype_id;
            this.ruleForm.toi_card_num = res.data.toi_card_num;
            if (res.data.error_list.length) {
              reject();
              // console.log('未通过')
              this.excelSuccess = false;
              this.excelError = true;
              this.ruleForm.excel_error_list = res.data.error_list;
              this.ruleForm.visitNum = 0;
            } else if (res.data.toi_username.length > 0 && res.data.error_list.length == 0) {
              // console.log('全部通过')
              this.excelSuccess = true;
              this.excelError = false;
              this.ruleForm.excel_error_list = [];
              this.ruleForm.visitNum = Number(res.data.toi_username.length);
              resolve();
            }
          } else {
            this.$message.error(res.msg);
            this.excelSuccess = false;
            this.excelError = false;
            reject();
          }
        }).catch(err => {
          this.excelSuccess = false;
          this.excelError = false;
          reject();
        });
      })
    },
    /**
     * @提交预约
     */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          localforage.setItem('hbpw_team__fill_form', this.ruleForm);
          this.$router.push('/pw/team/review');
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    }
  }
};

</script>
<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding-bottom: 40px;
  // width: 1200px;
  font-size: 16px;
  color: #282828;

  .form-contain {
    margin: 0 auto;
    padding-top: 15px;
    padding-bottom: 30px;
    width: 1107px;

    /deep/ .el-form-item__content {
      width: 400px;
    }

    /deep/ .el-form-item__label {
      font-size: 16px;
      color: #000;
    }

    .upload {
      width: 550px;

      &__btn {
        background-color: #B47C2D;
        color: #fff;
      }

      >span {
        color: #B47C2D;
        margin-left: 30px;
        text-decoration: underline;
        cursor: pointer;
      }

      &__tip {
        margin-top: 1em;
        line-height: 1.5;

        p {
          display: block;
          height: 25px;
          color: #282828;
        }
      }

      // 设置上传图片宽高
      /deep/ .el-upload-list--picture {
        .el-upload-list__item {
          height: auto;

          .el-upload-list__item-thumbnail {
            width: 300px;
            height: auto;
          }
        }
      }
    }

    .form-item-checkbox {
      width: 100%;

      /deep/ .el-form-item__content {
        width: 100%;
        padding-left: 40px;

        .el-form-item__error {
          left: 40px;
        }

        .el-checkbox-group {
          font-size: inherit;

          .el-checkbox {
            line-height: 40px;
            vertical-align: middle;

            .el-checkbox__label {
              font-size: 16px;
              color: #000;
            }

            // &:not(.is-disabled) {
            //   .el-checkbox__label {
            //     color: #000;
            //   }
            // }

            .el-checkbox__input {

              .el-checkbox__inner {
                padding: 10px;

                &::after {
                  top: -2px;
                  width: 8px;
                  left: 4px;
                  height: 15px;
                  border-right-width: 3px;
                  border-bottom-width: 3px;
                }
              }

              &.is-checked .el-checkbox__inner {
                // &.is-checked:not(.is-disabled) .el-checkbox__inner {
                background-color: #fff;

                &::after {
                  border-right-color: #30cc72;
                  border-bottom-color: #30cc72;
                }

              }
            }
          }
        }
      }
    }
  }

  .form-item-title {
    border-top: 1px solid #b47c2d;

    /deep/ .el-form-item__label {
      margin-top: 15px;
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      color: #000;
      line-height: 1;
    }
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

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

    .team-info {
      margin: 0 auto;
      padding-top: 15px;
      width: 1107px;

      .title {
        font-size: 20px;
      }

      .info {
        padding: 10px 1em 0 0;

        div {
          padding: 10px 0 10px 1em;
        }

        span {
          float: left;
          font-size: 18px;
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

        img {
          display: block;
          width: 700px;
          margin: 0 auto;
          border: 1px solid #909399;
        }

        .excel-block {

          &+.excel-block {
            margin-top: 30px;
          }

          p {
            margin-bottom: 10px;
            font-size: 16px;
          }

          table {
            width: 100%;

            tr {

              td,
              th {
                border: 1px solid #ccc;
                text-align: center;
                padding: 10px;

                &.red {
                  color: red;
                }
              }
            }
          }
        }
      }
    }
  }
}

</style>
