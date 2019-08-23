<template>
  <div class="container">
    <ProgressBar progressTitle="团体注册" :progressActiveNum="1" :showProgress="false"></ProgressBar>
    <!-- 旅行社团体注册要填写的表单 -->
    <el-form :model="ruleForm" :rules="rules" ref="form">
      <el-form-item class="input-item" prop="teamType">
        <div class="left-contain left type"></div>
        <div class="right-contain left">
          <label>团体类型</label>
          <div class="el-input">
            <el-select v-model="ruleForm.teamType" clearable placeholder="请选择" class="team-type">
              <el-option v-for="item in teamTypeArr" :key="item.team_type_id" :label="item.team_type_name" :value="item.team_type_id">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-form-item>
      <el-form-item class="input-item" prop="teamName">
        <div class="left-contain left name"></div>
        <div class="right-contain left">
          <label>团体名称</label>
          <div class="el-input">
            <el-input clearable placeholder="请输入团体名称，须与资质证书上的名称一致" v-model="ruleForm.teamName">
              <!-- <i slot="suffix" class="el-input-icon"></i> -->
            </el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item class="input-item" prop="creditCode">
        <div class="left-contain left number"></div>
        <div class="right-contain left">
          <label>统一社会信用代码</label>
          <div class="el-input">
            <el-input clearable placeholder="请输入统一社会信用代码" v-model="ruleForm.creditCode">
              <!-- <i slot="suffix" class="el-input-icon"></i> -->
            </el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item class="input-item" prop="files" ref="uploadpic">
        <div class="left-contain left scanning"></div>
        <div class="right-contain left">
          <label>资质证书</label>
          <el-upload ref="upload" class="upload" action="" :auto-upload="false" :file-list="ruleForm.files" :limit="1" list-type="picture" accept="image/png,image/gif,image/jpg,image/jpeg" :before-upload="beforeupload" :before-remove="beforeRemove" :on-change="handleFileChange" :on-remove="handleFileRemove">
            <el-button slot="trigger" class="btn-color">上传图片</el-button>
            <span class="look-example" @click="dialogVisible = true">点击查看示例</span>
            <div slot="tip" class="upload-tip">
              <span>1、请上传有效的营业执照/事业单位法人证书照片</span>
              <span>2、仅支持上传扫描件、支持 JPG、JPEG、PNG格式</span>
            </div>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item class="input-item" prop="contactName">
        <div class="left-contain left people"></div>
        <div class="right-contain left">
          <label>联系人姓名</label>
          <div class="el-input">
            <el-input clearable placeholder="请输入联系人姓名" v-model="ruleForm.contactName">
              <!-- <i slot="suffix" class="el-input-icon"></i> -->
            </el-input>
          </div>
        </div>
      </el-form-item>
      <div class="submit">
        <el-button round class="btn-color btn-submit" @click="validForm('form')">提交注册信息</el-button>
      </div>
    </el-form>
    <el-dialog :lock-scroll="false" :visible.sync="dialogVisible">
      <img src="../../../img/teampw/prove_atta.png">
    </el-dialog>
    <el-dialog :lock-scroll="false" :show-close="true" :close-on-click-modal="false" @close="closeNotice" :visible.sync="noticeVisible">
      <div class="notice_modal" v-if="noticeText">
        <div class="content" v-html="noticeText.replace(/\n/g,'<br>')"></div>
        <div class="checkbox" :class="{'checked':ischecked}" @click="ischecked=!ischecked">已查看并同意</div>
        <div class="confirm_btn" :class="{'disabled':!showConfirm}" @click="submitNotice">
          <span v-show="!showConfirm">请仔细预约须知（{{count}}s）</span>
          <span v-show="showConfirm">确定</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios';
import ProgressBar from '../common/progressBar.vue';

const TIME_COUNT = 10;

export default {
  data() {
    return {
      apiToken: localStorage.api_token || "",
      dialogVisible: false, //点击查看示例
      noticeVisible: false, //预约须知弹层
      noticeText: '', //须知内容
      ischecked: false, //是否同意须知
      timer: null,
      count: 0,
      showConfirm: false,
      teamTypeArr: [], //团体类型
      ruleForm: {
        teamType: "", //团体类型id
        teamName: "", //团体名称
        creditCode: "", //统一社会信用代码
        contactName: "", //联系人姓名
        files: [], // 图片对象存储
      },
      rules: {
        teamType: [
          { required: true, message: "请选择团体类型", trigger: "change" }
        ],
        teamName: [
          { required: true, message: "请输入团体名称", trigger: "change" }
        ],
        creditCode: [
          { required: true, message: "请输入统一社会信用代码", trigger: "change" }
        ],
        files: [
          { required: true, message: '请上传图片', trigger: 'change', }
        ],
        contactName: [
          { required: true, message: "请输入联系人名字", trigger: "change" },
          { min: 2, message: "请输入正确的联系人名字", trigger: "change" }
        ],
      },
    };
  },
  inject: ["app"],
  components: {
    ProgressBar
  },
  created() {
    if (!this.apiToken) {
      this.app.openLogin();
      return;
    }
    this.getTeamTypeList();
  },
  mounted() {
    this.$once('hook:beforeDestroy', () => {
      this.clearTimer();
    })
  },
  methods: {
    /**
     * @团体类型
     */
    getTeamTypeList() {
      this.$api.PW_PC_teamTypeList().then(res => {
        // console.log(res);
        if (res.status == 1) {
          this.teamTypeArr = res.data.sort((a, b) => a.team_type_id - b.team_type_id);
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    /**
     * @文件类型进行判断
     */
    beforeupload(file) {
      // 文件类型进行判断
      let isJPG = /^image\/(jpeg|png|jpg)$/.test(file.type);
      let isLt2M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error("上传图片只能是 image/jpeg/png 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }
      return isJPG && isLt5M;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    /**
     * @图片预览
     */
    handleFileChange(file, fileList) {
      this.handleFileOpt(file, fileList);
    },
    /**
     * @图片删除
     */
    handleFileRemove(file, fileList) {
      this.handleFileOpt(file, fileList);
      this.$message({
        message: '图片已删除，请重新上传',
        type: 'warning'
      });
    },
    /**
     * @
     */
    handleFileOpt(file, fileList) {
      this.ruleForm.files = fileList;
      //如果files为空了说明并没有提交文件所以需要显示警告
      // 如果上传了就不显示提示文件警告
      if (typeof this.ruleForm.files != "undefined") {
        if (this.ruleForm.files.length > 0) {
          this.$refs["uploadpic"].clearValidate("files");
        } else {
          this.$refs["uploadpic"].validate("files");
        }
      }
    },
    /** 
     * @表单校验
     */
    validForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.teamType == 1) {
            //旅行社
            this.showNotice();
            return;
          }
          this.submitReally();
        } else {
          return false;
        }
      });
    },
    //打开弹层
    showNotice() {
      this.noticeVisible = true;
      this.$api.PW_PC_teamRegisterTextTip().then(res => {
        // console.log(res)
        if (res.status == 1) {
          if (res.data.team_zcxz) {
            this.noticeText = res.data.team_zcxz;
            this.runTimer();
          }
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    //关闭弹层
    closeNotice() {
      this.ischecked = false;
      this.noticeVisible = false;
      this.clearTimer();
    },
    //开启倒计时
    runTimer() {
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.showConfirm = false;
        this.timer = setInterval(() => {
          if (this.count > 1 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.clearTimer();
          }
        }, 1000);
      }
    },
    //清除定时器
    clearTimer() {
      if (this.timer) {
        window.clearInterval(this.timer);
        this.showConfirm = true;
        this.timer = null;
      }
    },
    /**
     * @确定预约（须知弹层）
     */
    submitNotice() {
      if (!this.showConfirm) return;
      if (!this.ischecked) {
        this.$message({
          message: '请阅读并同意协议',
          type: 'warning',
        });
        return;
      }
      this.submitReally();
    },
    /**
     * @提交注册信息
     */
    submitReally() {
      let formData = new FormData();
      formData.append('p', 'w');
      formData.append('api_token', this.apiToken);
      formData.append('team_type_id', this.ruleForm.teamType);
      formData.append('teamname', this.ruleForm.teamName);
      formData.append('team_username', this.ruleForm.contactName);
      formData.append('s_c_code', this.ruleForm.creditCode);
      this.ruleForm.files.forEach(item => {
        formData.append('team_atta', item.raw)
      });

      axios.post(STATIC_PW_URL + "/api/teamusers/apply", formData).then(response => {
        let res = response.data;
        if (res.status == 405) {
          this.app.openLogin();
          return;
        } else if (res.status == 1) {
          // console.log(res)
          this.$router.push('/pw/team/register_result');
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {});
    },
  }
};

</script>
<style lang="scss" scoped>
.container {
  margin: 0 auto;

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .el-form {
    margin: 0 auto;
    width: 950px;
    padding: 50px 13px 100px;

    .input-item {

      &::after {
        content: "";
        display: table;
        clear: both;
      }

      font-size: 16px;

      /deep/ .el-form-item__error {
        left: 70px;
      }
    }

    .left-contain {
      width: 50px;
      height: 50px;

      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      opacity: .4;

      &.people {
        background-image: url("../../../img/teampw/lianxiren-2.png");
      }

      &.fenzhi {
        background-image: url("../../../img/teampw/fenzhi.png");
      }

      &.type {
        background-image: url("../../../img/teampw/leixing.png");
      }

      &.name {
        background-image: url("../../../img/teampw/tuantitijian.png");
      }

      &.number {
        background-image: url("../../../img/teampw/zhengshudongjie--2.png");
      }

      &.scanning {
        background-image: url("../../../img/teampw/saomiao-2.png");
      }
    }

    .right-contain {
      width: 854px;
      margin-left: 10px;

      label {
        display: block;
        padding-left: 1em;
        font-size: 16px;
        font-weight: 600;
      }

      /deep/ .el-input {
        box-shadow: 0px 0px 16px 0px rgba(231, 231, 231, 0.75);
      }
    }

    .select-contain {
      width: 273px;
      margin-left: 12px;

      &:first-of-type {
        margin-left: 0;
      }
    }

    .upload {
      padding-left: 1em;
      margin-top: 15px;

      .look-example {
        color: #b47c2d;
        text-decoration: underline;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
      }

      .upload-tip {
        margin-top: 1em;
        line-height: 1.5;

        span {
          display: block;
          height: 25px;
          color: #282828;
        }
      }
    }

    .btn-color {
      margin-right: 40px;
      background-color: #b47c2d;
      font-size: 18px;
      color: #fff;
      width: 130px;
      height: 48px;
    }

    .submit {
      margin: 40px auto 0;
      width: 300px;

      .btn-submit {
        display: block;
        margin: 0 auto;
        width: 300px;
        height: 50px;
        border-radius: 24px;
      }
    }

    .el-input-icon {
      position: absolute;
      right: 5px;
      top: 50%;
      margin-top: -6px;
      width: 12px;
      height: 12px;
      background-image: url("../../../img/teampw/mustBe.png");
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }

    .team-type {
      width: 100%;
    }

  }

  /deep/ .el-dialog__wrapper {
    .el-dialog {
      min-width: 700px;
      max-width: 800px;

      .el-dialog__body {
        img {
          width: 100%;
        }

        .notice_modal {

          padding: 0 50px;

          .content {
            font-size: 18px;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
            line-height: 36px;
          }

          .checkbox {
            display: inline-block;
            height: 20px;
            line-height: 20px;
            color: #C39657;
            margin-top: 20px;
            cursor: pointer;

            &::before {
              content: '';
              float: left;
              height: 20px;
              width: 20px;
              background-position: center center;
              background-repeat: no-repeat;
              background-size: 100% 100%;
              background-image: url('../../../img/ticket/check.png');
              margin-right: 10px;
            }

            &.checked {
              &::before {
                background-image: url('../../../img/ticket/checked.png');
              }
            }
          }

          .confirm_btn {
            width: 322px;
            height: 48px;
            line-height: 48px;
            font-size: 16px;
            text-align: center;
            margin: 50px auto 0;
            color: #fff;
            cursor: pointer;
            border-radius: 24px;
            background-color: #B47C2D;

            &.disabled {
              cursor: not-allowed;
              background-color: #CCCCCC;
            }
          }
        }
      }
    }
  }
}

// 设置上传图片宽高
/deep/ .el-upload-list--picture {
  .el-upload-list__item {
    height: auto;

    .el-upload-list__item-thumbnail {
      width: auto;
      height: 200px;
    }
  }
}

</style>
