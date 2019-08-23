<template>
  <!-- 右侧部分 -->
  <div class="user-r">
    <h3 class="user-title">换绑手机号</h3>
    <div class="user-container">
      <h1>换绑手机</h1>
      <p>
        换绑手机后，新手机号将作为登录账号，
        <br />所有信息将同步新账号
      </p>
      <div class="login-main">
        <div class="form-wrapper">
          <div class="form-inline">
            <div class="title">手机号</div>
            <div class="input-control">
              <span>+86</span>
              <input
                type="text"
                maxlength="11"
                v-model="username"
                name="username"
                placeholder="请输入您的旧手机号"
              />
            </div>
          </div>
          <div class="form-inline">
            <div class="title">新手机号</div>
            <div class="input-control">
              <span>+86</span>
              <input
                type="text"
                maxlength="11"
                v-model="nusername"
                name="nusername"
                placeholder="请输入您的新手机号"
              />
            </div>
          </div>
          <div class="form-inline">
            <div class="title">图形验证码</div>
            <div class="input-control">
              <input type="text" v-model="code" maxlength="5" placeholder="请输入图形验证码" />
              <img :src="imgUrl" alt class="code" @click="getImg" />
            </div>
          </div>
          <div class="form-inline">
            <div class="title">验证码</div>
            <div class="input-control">
              <input type="text" maxlength="6" v-model="smscode" placeholder="请输入手机验证码" />
              <span class="codes" @click="getCode">{{codes}}</span>
            </div>
          </div>
        </div>
        <div class="loginBtn" @click="goLogin">
          <div class="warn" v-if="warn" :class="{'success':warn=='发送成功'}">{{warn}}</div>确定
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import crypto from "crypto";
import checkPhone from "../.././bin/common.js";
export default {
  name: "center",
  data() {
    return {
      code: "",
      smscode: "",
      username: "",
      nusername: "",
      warn: "",
      device_uuid: "",
      timer: "",
      count: 60,
      codes: "获取验证码",
      imgUrl: ""
    };
  },
  methods: {
    getImg() {
      this.generateUUID();
      this.imgUrl =
        STATIC_PW_URL +
        "/api/cpt/show?p=w&device_uuid=" +
        this.device_uuid +
        "&random=" +
        Math.random();
    },
    goLogin() {
      if (this.username == "") {
        this.warn = "请输入原手机号";
        return false;
      }
      if (!checkPhone.checkPhone(this.username)) {
        this.warn = "请输入原正确的手机号";
        return false;
      }
      if (!checkPhone.checkPhone(this.nusername)) {
        this.warn = "请输入正确的手机号";
        return false;
      }
      if (this.code == "") {
        this.warn = "请输入图形验证码";
        return false;
      }
      if (this.code.length != 5) {
        this.warn = "请输入正确的图形验证码";
        return false;
      }
      this.$api
        .changePhones(this.smscode, this.nusername, this.username)
        .then(res => {
          if (res.status == 1) {
            localStorage.api_token = res.data.api_token;
            localStorage.phone = this.nusername;
            this.$message({
              message: "修改成功!",
              type: "success"
            });
            setTimeout(() => {
              //window.location.reload();
            }, 800);
          } else {
            this.warn = res.msg;
          }
        });
    },
    // 生成uuid
    generateUUID() {
      let v = this;
      let md5 = crypto.createHash("md5");
      var d = new Date().getTime();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function(c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      md5.update(uuid);
      v.device_uuid = md5.digest("hex");
      localStorage.device_uuid = v.device_uuid;
    },
    getCode() {
      if (this.timer != "") {
        return false;
      }
      if (this.username == "") {
        this.warn = "请输入原手机号";
        return false;
      }
      if (!checkPhone.checkPhone(this.username)) {
        this.warn = "请输入原正确的手机号";
        return false;
      }
      if (this.nusername == "") {
        this.warn = "请输入新手机号";
        return false;
      }
      if (!checkPhone.checkPhone(this.nusername)) {
        this.warn = "请输入正确的手机号";
        return false;
      }
      if (this.code == "") {
        this.warn = "请输入图形验证码";
        return false;
      }
      if (this.code.length != 5) {
        this.warn = "请输入正确的图形验证码";
        return false;
      }
      this.count = 60;
      this.timer = setInterval(() => {
        if (this.count >= 1) {
          this.count--;
          this.codes = this.count + "s";
        }
        if (this.count == 0) {
          clearInterval(this.timer);
          this.timer = "";
          this.codes = "获取验证码";
        }
      }, 1000);
      var that = this;
      this.$api
        .getCode(this.device_uuid, this.nusername, this.code)
        .then(res => {
          if (res.status == 1) {
            that.warn = "发送成功";
            setTimeout(() => {
              that.warn = "";
            }, 3000);
          } else {
            that.warn = res.msg;
          }
        });
    }
  },
  created() {
    this.getImg();
  }
};
</script>
<style lang="scss" scoped>
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
  padding-left: 14px;
}
.user-title {
  font-size: 18px;
  color: #b47c2d;
  padding-bottom: 10px;
  padding-left: 30px;
  margin-top: 10px;
  border-bottom: 2px solid #b47c2d;
}
.user-container {
  width: 90%;
  margin: 164px auto 30px;
}
.user-container h1 {
  text-align: center;
  color: #000;
  font-size: 24px;
}
.user-container p {
  font-size: 16px;
  color: #000;
  width: 290px;
  text-align: center;
  line-height: 24px;
  margin: 30px auto;
}
.login-main {
  width: 400px;
  margin: 0 auto;
}
.form-wrapper {
  margin-top: 10px;
}
.form-inline {
  margin-top: 30px;
  margin-bottom: 10px;
  height: 60px;
  padding-left: 50px;
  position: relative;
}
div.form-inline:nth-child(1):after {
  content: "";
  width: 33px;
  height: 37px;
  background: url(../.././img/nav/u.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 4px;
  left: 0px;
  z-index: 2;
}
div.form-inline:nth-child(2):after {
  content: "";
  width: 33px;
  height: 37px;
  background: url(../.././img/nav/u.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 4px;
  left: 0px;
  z-index: 2;
}
div.form-inline:nth-child(3):after {
  content: "";
  width: 40px;
  height: 40px;
  background: url(../.././img/nav/pc.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 4px;
  left: 0px;
  z-index: 2;
}
div.form-inline:nth-child(4):after {
  content: "";
  width: 40px;
  height: 40px;
  background: url(../.././img/nav/q.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 4px;
  left: 0px;
  z-index: 2;
}
.form-inline .title {
  font-size: 14px;
  font-weight: 600;
  color: #313131;
}
.input-control {
  position: relative;
}
.input-control span {
  position: absolute;
  top: 14px;
  left: 0;
}
.form-inline input {
  outline: 0 none;
  border: 0 none;
  height: 40px;
  width: 300px;
  border-bottom: 1px solid #ccc;
}
.form-inline input[name="username"],
.form-inline input[name="nusername"] {
  text-indent: 46px;
}
.form-inline .imgBtn {
  left: auto;
  right: -26px;
  color: #b47c2d;
  cursor: pointer;
}
.loginBtn {
  width: 190px;
  margin: 40px auto 0;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  background: rgba(180, 124, 45, 1);
  border-radius: 25px;
  cursor: pointer;
  position: relative;
}
.login-btns {
  position: relative;
  height: 50px;
  margin: 30px 0 0 0;
  line-height: 50px;
}
.cancel {
  float: left;
  width: 172px;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
  color: #b47c2d;
  font-size: 18px;
  background: rgba(255, 255, 255, 0);
  border: 1px solid rgba(180, 124, 45, 1);
  border-radius: 25px;
  text-align: center;
}
.btn {
  width: 172px;
  height: 50px;
  background: rgba(180, 124, 45, 1);
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  color: #fff;
  float: right;
  text-align: center;
}
.login-main img {
  display: block;
  width: 238px;
  height: 238px;
  outline: 0 none;
  border: 0 none;
  margin: 60px auto 20px;
}
.login-main img.code {
  position: absolute;
  top: 0;
  right: 30px;
  margin: 0;
  width: 130px;
  height: 40px;
  z-index: 3;
  cursor: pointer;
}
span.codes {
  width: 131px;
  height: 40px;
  border: 1px solid rgba(180, 124, 45, 1);
  border-radius: 20px;
  color: #b47c2d;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  line-height: 40px;
  position: absolute;
  left: auto;
  top: -8px;
  right: 28px;
}
.login-main p {
  font-size: 18px;
  font-family: Adobe Heiti Std R;
  font-weight: normal;
  font-style: italic;
  color: rgba(180, 124, 45, 1);
  line-height: 25px;
  text-align: center;
}
.warn {
  color: #f71313;
  font-size: 14px;
  position: absolute;
  white-space: nowrap;
  top: -44px;
  text-align: center;
  left: 0;
  width: 100%;
}
.success {
  color: green;
}
</style>