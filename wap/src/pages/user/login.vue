<template>
  <div class="login">
    <i class="iconfont iconfanhui" @click="goBack"></i>
    <h3>快捷登录</h3>
    <div class="form-wrapper">
      <div class="form-inline">
        <!-- <div class="title">手机号</div> -->
        <div class="input-control">
          <div class="img">
            <img src="../.././img/nav/u.png" alt />
          </div>
          <input
            type="text"
            maxlength="11"
            v-model="username"
            autocomplete="off"
            name="username"
            placeholder="请输入您的手机号"
          />
        </div>
      </div>
      <div class="form-inline">
        <!-- <div class="title">图形验证码</div> -->
        <div class="input-control">
          <div class="img">
            <img src="../.././img/nav/pc.png" alt />
          </div>
          <input type="text" v-model="code" maxlength="5" placeholder="请输入图形验证码" />
          <img :src="imgUrl" alt class="code" @click="getImg" />
        </div>
      </div>
      <div class="form-inline">
        <!-- <div class="title">验证码</div> -->
        <div class="input-control">
          <div class="img">
            <img src="../.././img/nav/q.png" alt />
          </div>
          <input type="text" maxlength="6" v-model="smscode" placeholder="请输入手机验证码" />
          <span class="codes" @click="checkCode">{{codes}}</span>
        </div>
      </div>
    </div>

    <div class="loginBtn" @click="goLogin">立即注册/登录</div>
  </div>
</template>
<script>
import crypto from "crypto";
import checkPhone from "../../bin/common.js";
import { Toast } from "mint-ui";
export default {
  name: "login",
  data() {
    return {
      username: "",
      code: "",
      smscode: "",
      timer: "",
      codes: "获取验证码",
      imgUrl: "",
      warn: "",
      bind_uid: ""
    };
  },
  methods: {
    goBack() {
      window.history.go(-1);
      window.scrollTo(0, 0);
    },
    getImg() {
      this.generateUUID();
      this.imgUrl =
        STATIC_PW_URL +
        "/api/cpt/show?p=w&device_uuid=" +
        this.device_uuid +
        "&random=" +
        Math.random();
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
    goLogin() {
      if (this.username == "") {
        Toast("请输入手机号");
        return false;
      }
      if (!checkPhone.checkPhone(this.username)) {
        Toast("请输入正确的手机号");
        return false;
      }
      if (this.smscode == "") {
        Toast("请输入验证码");
        return false;
      }
      if (this.smscode.length != 6) {
        Toast("请输入正确的验证码");
        return false;
      }
      var that = this;
      this.$api
        .getLogin(this.username, this.smscode, this.bind_uid)
        .then(res => {
          if (res.status == 1) {
            localStorage.app_token = res.data.api_token;
            Toast({
              message: "登录成功",
              position: "center",
              duration: 500
            });
            if (this.$route.query.type == 1) {
              this.$router.replace("/collection");
              return false;
            }

            // 判断是否有405地址,有就跳转并且删除缓存的地址
            if (localStorage.url) {
              window.location.href = localStorage.url;
              localStorage.removeItem("url");
              return false;
            }
            let redirect = decodeURIComponent(
              this.$route.query.redirect || "/"
            );
            this.$router.replace(redirect);
          } else {
            this.getImg();
            Toast(res.msg);
          }
        });
    },
    // 验证图形验证码是否正确
    checkCode() {
      if (this.timer != "") {
        return false;
      }
      if (this.username == "") {
        Toast("请输入手机号");
        return false;
      }
      if (!checkPhone.checkPhone(this.username)) {
        Toast("请输入正确的手机号");
        return false;
      }
      if (this.code == "") {
        Toast("请输入图形验证码");
        return false;
      }
      if (this.code.length != 5) {
        Toast("请输入正确的图形验证码");
        return false;
      }

      this.$api.checkCode(this.device_uuid, this.code).then(res => {
        if (res.status == 1) {
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
          this.getCode();
        } else {
          Toast(res.msg);
          this.getImg();
          this.code = "";
        }
      });
    },
    getCode() {
      var that = this;
      this.$api
        .getCode(this.device_uuid, this.username, this.code)
        .then(res => {
          if (res.status == 1) {
            Toast("发送成功");
          } else {
            that.warn = res.msg;
            that.code = "";
            Toast(res.msg);
            that.getImg();
          }
        });
    }
  },
  mounted() {
    this.bind_uid = checkPhone.getCookie("hb_bind_uid");
    this.generateUUID();
    this.getImg();
  }
};
</script>
<style lang="scss" scoped>
.login {
  position: relative;
  padding-top: 55px;
  background: url(../.././img/home/login.png) no-repeat;
  background-size: cover;
  min-height: 100vh;
}
.iconfanhui {
  font-size: 18px;
  /*px*/
  color: #fff;
  font-weight: 600;
  position: absolute;
  top: 20px;
  /*px*/
  left: 12px;
  /*px*/
}
.login h3 {
  font-size: 21px;
  color: #fff;
  text-align: center;
  letter-spacing: 3px;
}
.login-wrapper {
  width: 80%;
  margin: 0 auto;
}
.form-wrapper {
  margin: 0 auto;
  margin-top: 40px;
  /*px*/
  width: 80%;
}
.form-inline {
  margin-top: 20px;
  margin-bottom: 30px;
  height: 50px;
  position: relative;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
div.form-inline .img {
  width: 16px;
  height: 19px;
  margin-right: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  img {
    width: 100%;
    display: block;
    height: auto;
  }
}
.form-inline .title {
  font-size: 14px;
  /*px*/
  font-weight: 600;
  padding-left: 44px;
  color: #313131;
}
.input-control {
  position: relative;
  display: flex;
}
.input-control span {
  position: absolute;
  top: 10px;
  left: 0;
}
.form-inline input {
  outline: 0 none;
  border: 0 none;
  height: 40px;
  width: 100%;
  font-size: 14px;
  /*px*/
  color: #fff;
  background: transparent;
  padding-left: 25px;
}
.form-inline .imgBtn {
  left: auto;
  right: -26px;
  color: #b47c2d;
  cursor: pointer;
}
.loginBtn {
  width: 310px;
  margin: 40px auto 0;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 15px;
  background: rgba(180, 124, 45, 1);
  border-radius: 4px;
  cursor: pointer;
  position: relative;
}
.login-wrapper img {
  display: block;
  width: auto;
  height: 19px;
  outline: 0 none;
  border: 0 none;
  margin: 60px auto 20px;
}
img.code {
  position: absolute;
  top: 6px;
  right: 0px;
  margin: 0;
  width: 86px;
  /*px*/
  height: 27px;
  /*px*/
  z-index: 3;
  cursor: pointer;
}
span.codes {
  width: 90px;
  height: 30px;
  border: 1px solid rgba(180, 124, 45, 1);
  border-radius: 20px;
  color: #b47c2d;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  line-height: 28px;
  position: absolute;
  left: auto;
  top: 6px;
  right: 0;
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
  top: -44px;
  text-align: center;
  left: 0;
  width: 100%;
}
.success {
  color: green;
}
::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #fff;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: #fff;
}
:-ms-input-placeholder {
  /* IE 10+ */
  color: #fff;
}
:-moz-placeholder {
  /* Firefox 18- */
  color: #fff;
}
</style>
