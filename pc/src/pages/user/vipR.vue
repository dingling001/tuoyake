<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">首页</a>
        »
        <a href="/center">个人中心</a>
        »
        <a href="javascript:;">
          会员注册
        </a>
        
      </div>
    </div>
    <div class="container">
      <div class="date_step">
        <div class="date_title">
          <div class="date_left">
            填写申请单
            <span class="line"></span>
            <span class="dot"></span>
          </div>
          <el-steps :active="2" align-center class="date_right">
            <el-step title="选择会员类型">
              <i class="s s1" slot="icon"></i>
            </el-step>
            <el-step title="填写申请单">
              <i class="s s2" slot="icon"></i>
            </el-step>
            <el-step title="线下认证">
              <i class="s s3" slot="icon"></i>
            </el-step>
          </el-steps>
        </div>
      </div>
      <div class="vip">
        <div class="common-title">
          <span class="dot"></span>
          <span class="small-title">基本信息</span>
        </div>
        <div class="input-box">
          <p>
            <span>姓名</span>
            <img src="../../img/volunteer/vol_required_icon.png">
          </p>
          <input type="text" placeholder="请填写姓名" v-model="vip.username">
          <p>
            <span>性别</span>
            <img src="../../img/volunteer/vol_required_icon.png">
          </p>
          <select v-model="vip.sex">
            <option value>请选择</option>
            <option value="1">男</option>
            <option value="2">女</option>
          </select>
        </div>
        <div class="input-box">
          <p>
            <span>民族</span>
            <img src="../../img/volunteer/vol_required_icon.png">
          </p>
          <select v-model="vip.nation">
            <option value>请选择</option>
            <option v-for="(item,index) in nationList" :key="index" :value="item">{{item}}</option>
          </select>
          <p>
            <span>学历</span>
            <img src="../../img/volunteer/vol_required_icon.png">
          </p>
          <select v-model="vip.edu">
            <option value>请选择</option>
            <option v-for="(item,index) in edus" :key="index" :value="item.id">{{item.label}}</option>
          </select>
        </div>
        <div class="input-box">
          <p>
            <span>身份证号</span>
            <img src="../../img/volunteer/vol_required_icon.png">
          </p>
          <input style="width: 419px;" type="text" placeholder="请填写18位身份证号码" v-model="vip.id_card">
        </div>
        <div class="input-box address">
          <p>
            <span>居住地址</span>
            <img src="../../img/volunteer/vol_required_icon.png">
          </p>
          <select v-model="vip.province" @change="setCity">
            <option value>请选择</option>
            <option
              v-for="(item,index) in provices"
              :value="item.region_id"
              :key="index"
            >{{item.region_name}}</option>
          </select>
          <select v-model="vip.city" @change="setCounty">
            <option value>请选择</option>
            <option
              v-for="(item,index) in citys"
              :value="item.region_id"
              :key="index"
            >{{item.region_name}}</option>
          </select>
          <select v-model="vip.town">
            <option value>请选择</option>
            <option
              v-for="(item,index) in county"
              :value="item.region_id"
              :key="index"
            >{{item.region_name}}</option>
          </select>
        </div>
        <div class="input-box">
          <p>
            <span>家庭地址</span>
            <img src="../../img/volunteer/vol_required_icon.png">
          </p>
          <textarea
            style="width: 644px;height:122px"
            type="text"
            placeholder="请填写地址"
            v-model="vip.address"
          ></textarea>
        </div>
        <div class="input-box">
          <p>
            <span>手机号码</span>
            <img src="../../img/volunteer/vol_required_icon.png">
          </p>
          <input type="text" readonly v-model="phone">
        </div>
        <div class="input-box">
          <p class="info-wrapper">
            <span>入会须知</span>
            <span class="info" @click="getEquity">《国家海洋博物馆网络会员管理办法》</span>
          </p>
        </div>
        <div class="agreement-box">
          <div class="promise" :class="{promise_act:read}" @click="read = !read">我已阅读并同意以上条款与条件</div>
        </div>
        <div class="upload-box">
          <div class="img-box" :class="{img_box_act:srcUrl == ''}">
            <img :src="srcUrl">
          </div>
          <p>上传一寸免冠照片</p>

          <input type="button" value="上传图片" @click="showP=!showP">
        </div>
        <div class="btns" @click="registerVip">确定注册</div>
      </div>
    </div>
    <div class="mask" v-if="infoF">
      <div class="mask-content">
        <i class="iconfont iconx" @click="infoF=!infoF"></i>
        <div class="info-content" v-html="content"></div>
      </div>
    </div>
    <!-- 上传图片遮罩 -->
    <div class="mask" v-if="showP">
      <div class="mask-content">
        <div class="item-wrapper">
          <div class="item">
            <h3>我的照片</h3>
            <div class="photo" @click="chooseImg">
              <i class="iconfont iconaddTodo-nav" v-if="img==''" @click.stop="chooseImg"></i>
              <img :src="img" class="img" alt v-if="img!=''">
              <input
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                ref="file"
                @change="uploadImg($event)"
              >
            </div>
          </div>
          <div class="item">
            <h3>照片示例</h3>
            <img src="../.././img/vip.png" alt>
          </div>
        </div>
        <div class="wrapper">
          <div class="cancel" @click="showP=!showP">取消上传</div>
          <div class="ok" @click="upLoadFile">确定上传</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import checkId from "../../bin/common.js";
export default {
  name: "uvip",
  data() {
    return {
      infoF: false,
      showP: false,
      nationList: [],
      read: false,
      content: "",
      vip: {
        username: "",
        sex: "",
        nation: "",
        edu: "",
        id_card: "",
        province: "",
        city: "",
        town: "",
        address: "",
        portrait: ""
      },
      img: "",
      read: false,
      files: "",
      filesV: "",
      provices: [],
      citys: [],
      county: [],
      options: [
        {
          value: 1,
          label: "男"
        },
        {
          value: 2,
          label: "女"
        }
      ],
      edus: [
        {
          value: 1,
          label: "小学"
        },
        {
          value: 2,
          label: "初中"
        },
        {
          value: 3,
          label: "高中"
        },
        {
          value: 4,
          label: "专科"
        },
        {
          value: 5,
          label: "本科"
        },
        {
          value: 6,
          label: "硕士"
        },
        {
          value: 7,
          label: "博士及以上"
        }
      ],
      phone: "",
      srcUrl: ""
    };
  },
  methods: {
    getEquity() {
      this.$api.getInfoVip().then(res => {
        this.content = res.data.content;
        this.infoF = true;
      });
    },
    registerVip() {
      if (this.vip.username == "") {
        this.$message.error("请填写姓名");
        return false;
      }
      if (this.vip.sex == "") {
        this.$message.error("请选择性别");
        return false;
      }
      if (this.vip.id_card == "") {
        this.$message.error("请填写身份证号码");
        return false;
      }
      if (!checkId.checkIdcard(this.vip.id_card).status) {
        this.$message.error("请填写正确的身份证号");
        return false;
      }
      if (this.vip.nation == "") {
        this.$message.error("请填写民族");
        return false;
      }
      if (this.vip.edu == "") {
        this.$message.error("请选择学历");
        return false;
      }
      if (this.vip.province == "") {
        this.$message.error("请选择居住地");
        return false;
      }
      if (this.vip.city == "") {
        this.$message.error("请选择市");
        return false;
      }
      if (this.vip.town == "") {
        this.$message.error("请选择县或区");
        return false;
      }
      if (this.vip.address == "") {
        this.$message.error("请填写详细地址");
        return false;
      }
      if (this.vip.portrait == "") {
        this.$message.error("请上传会员头像");
        return false;
      }
      if (this.read == false) {
        this.$message.error("请勾选会员条款");
        return false;
      }
      this.$api
        .registerRemeber(
          this.vip.username,
          this.vip.sex,
          this.vip.portrait,
          this.vip.nation,
          this.vip.edu,
          this.vip.id_card,
          this.vip.province,
          this.vip.city,
          this.vip.town,
          this.vip.address
        )
        .then(res => {
          if (res.status == 1) {
            this.$router.push("/vipC");
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    upLoadFile() {
      let v = this;
      let formData = new FormData();
      formData.append("p", "w");
      formData.append("api_token", localStorage.api_token);
      formData.append("img", this.files);
      axios.post(STATIC_WEB_URL + "/api/member/upload", formData).then(res => {
        if (res.data.status == 1) {
          this.srcUrl = this.img;
          this.showP = !this.showP;
          v.vip.portrait = res.data.data;
        } else {
          this.$message.error(res.msg);
          this.img = "";
        }
      });
    },
    goVip() {
      this.$router.push("/rvip");
    },
    uploadImg(e) {
      let v = this;
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (files[0].size > 5000000) {
        this.$message.error("上传图片大小应小于5M");
        return false;
      }
      this.files = files[0];
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = e => {
        v.img = e.target.result;
      };
    },
    getR() {
      this.$api.getRegion().then(res => {
        this.provices = res.data;
      });
    },
    // getEducationList() {
    //   this.$api.educationList().then(res => {
    //     if (res.status == 1) {
    //       this.educationList = res.data;
    //     }
    //   });
    // },
    getNationList() {
      this.$api.nationList().then(res => {
        if (res.status == 1) {
          this.nationList = res.data;
        }
      });
    },
    setCity() {
      for (let i = 0; i < this.provices.length; i++) {
        if (this.provices[i].region_id == this.vip.province) {
          this.citys = this.provices[i].child;
          this.vip.city = "";
        }
      }
    },
    setCounty() {
      for (let i = 0; i < this.citys.length; i++) {
        if (this.citys[i].region_id == this.vip.city) {
          this.county = this.citys[i].child;
          this.vip.town = "";
        }
      }
    },
    getUser() {
      this.$api.getUser().then(res => {
        this.phone = res.data.phone;
      });
    },
    chooseImg() {
      this.$refs.file.click();
    }
  },
  mounted() {
    this.getR();
    this.getNationList();
    this.getUser();
  }
};
</script>
<style scoped lang="scss">
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
}
.top {
  padding: 20px 30px;
  border-bottom: 2px solid #b47c2d;
}
.date_step {
  width: 1200px;
  margin: 20px auto;
  padding: 30px 0;
  border-bottom: 5px solid rgba(180, 124, 45, 0.3);

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
      width: 50%;
      color: #000;
      margin-right: -60px;

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
        background-image: url("../.././img/ticket/01.png");
      }

      /deep/ .is-finish .s2 {
        background-image: url("../.././img/ticket/02.png");
      }

      /deep/ .is-finish .s3 {
        background-image: url("../.././img/ticket/03.png");
      }

      /deep/ .is-finish .s4 {
        background-image: url("../.././img/ticket/04.png");
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
        background-image: url("../.././img/ticket/1.png");
      }

      .s2 {
        background-image: url("../.././img/ticket/2.png");
      }

      .s3 {
        background-image: url("../.././img/ticket/3.png");
      }

      .s4 {
        background-image: url("../.././img/ticket/4.png");
      }
    }
  }
}
.vip {
  position: relative;
  .common-title {
    width: 320px;
    height: 62px;
    background: #f4f4f4;
    border-radius: 31px;
  }
  .common-title .dot {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    float: left;
    background: #b47c2d;
    margin: 26px 23px 26px 37px;
  }
  .common-title .small-title {
    font-size: 18px;
    color: #000;
    line-height: 62px;
    float: left;
  }
  .input-box {
    overflow: hidden;
    margin: 20px 0;
  }
  .input-box input,
  .input-box textarea,
  .input-box select {
    width: 265px;
    height: 56px;
    border: 1px solid #eee;
    box-shadow: 0px 0px 16px 0px rgba(231, 231, 231, 0.75);
    border-radius: 1px;
    padding-left: 12px;
    float: left;
  }
  .input-box textarea {
    resize: none;
    padding: 10px;
  }
  .input-box textarea:focus {
    outline: 0 none;
  }
  .address select {
    width: 200px;
    margin-right: 20px;
  }
  .input-box .required_act {
    border-color: red;
  }
  .input-box p {
    display: block;
    width: 120px;
    height: 56px;
    line-height: 56px;
    float: left;
    text-align: right;
    padding-right: 17px;
    font-size: 16px;
    color: #313131;
  }
  .input-box p span {
    float: right;
  }
  .input-box p img {
    float: right;
    margin: 25px 10px 0 0;
  }
  .input-box .info-wrapper {
    width: auto;
    padding-left: 30px;
    span {
      display: inline-block;
      float: none;
      margin: 0 10px 0 0;
    }
  }
  .info {
    text-decoration: underline;
    color: #b47c2d;
    cursor: pointer;
  }
  .upload-box {
    position: absolute;
    top: 122px;
    right: 90px;
  }
  .upload-box .img-box {
    width: 189px;
    background: #e5e5e5;
    img {
      display: block;
      width: 189px;
    }
  }
  .agreement-box {
    overflow: hidden;
    padding: 0 0 30px 180px;
  }
  .promise {
    height: 30px;
    font-size: 16px;
    color: #313131;
    background: url(../../img/volunteer/vol_check_box.png) no-repeat left center;
    padding-left: 24px;
    line-height: 30px;
    float: left;
    cursor: pointer;
  }
  .promise_act {
    background: url(../../img/volunteer/vol_check_act.png) no-repeat left center;
  }
  .img_box_act {
    height: 270px;
  }
  .upload-box p {
    width: 189px;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    color: #adadad;
  }
  .upload-box input {
    width: 189px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    border-radius: 5px;
    background: #b47c2d;
    font-size: 16px;
    cursor: pointer;
  }
}

.btns {
  width: 300px;
  height: 48px;
  line-height: 48px;
  background: rgba(180, 124, 45, 1);
  border-radius: 24px;
  height: 48px;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
  margin: 30px auto;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1201;
  .mask-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1030px;
    height: 590px;
    background: #fff;
    padding: 30px 50px;
    .iconx {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }
    .item-wrapper {
      display: flex;

      .item {
        flex: 1;
        &:nth-child(1) {
          width: 300px;
          .photo {
            width: 170px;
            height: 230px;
            background: #e5e5e5;
            position: relative;
            cursor: pointer;
            .img {
              width: 100%;
              height: 100%;
            }
            input {
              display: none;
            }
            i {
              position: absolute;
              top: 50%;
              left: 50%;
              color: #fff;
              font-size: 36px;
              transform: translate(-50%, -50%);
            }
          }
        }
        text-align: left;
        h3 {
          font-size: 20px;
          font-weight: 400;
          margin-bottom: 26px;
        }
        img {
          display: block;
          margin: 10px 0;
        }
      }
    }
    .content {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      /deep/ p {
        text-align: left;
        color: #000;
        font-size: 20px;
      }
    }
    .wrapper {
      padding-top: 80px;
      overflow: hidden;
      width: 60%;
      margin: 0 auto;
      .cancel {
        width: 206px;
        height: 47px;
        line-height: 47px;
        color: #000000;
        text-align: center;
        float: left;
        font-size: 16px;
        background: #fff;
        border: 1px solid rgba(0, 0, 0, 1);
        border-radius: 24px;
        cursor: pointer;
      }
      .ok {
        width: 206px;
        height: 47px;
        background: rgba(180, 124, 45, 0.8);
        line-height: 47px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        float: right;
        border-radius: 24px;
        cursor: pointer;
      }
    }
  }
}
</style>
