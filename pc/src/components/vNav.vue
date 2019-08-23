<template>
  <div>
    <div class="nav" :class="{'nav-min':lang!='zh'}">
      <div class="nav-main">
        <div class="nav-top">
          <!-- <ul class="language" v-if="cur==0">
          <li>
            <a href="javaScript:;" :class="{'active':lang=='zh'}" @click="changeLang('zh')">中文</a>
            <a href="javaScript:;" :class="{'active':lang=='en'}" @click="changeLang('en')">English</a>
            <a href="javaScript:;" @click="changeLang('ri')" :class="{'active':lang=='ri'}">日本语</a>
            <a href="javaScript:;" @click="changeLang('han')" :class="{'active':lang=='han'}">한국어</a>
          </li>
          </ul>-->
          <div class="btn" @click="openLogin" v-if="api_token==''&&lang=='zh'">
            <span>登录</span>
            |
            <span>注册</span>
          </div>
          <div class="user" v-if="api_token!=''&&$t('news')" @click="goCenter">
            <img v-if="avatar" :src="avatar" alt />
            {{phone}}
            <div class="layout">
              <div class="item" @click="goCenter">个人中心</div>
              <div class="item" @click.stop="layout">
                <i class="iconfont iconclose"></i>退出
              </div>
            </div>
          </div>
          <div class="search" v-if="lang=='zh'&&this.$route.path!='/search'">
            <el-autocomplete
              v-model="keyword"
              class="input"
              :fetch-suggestions="querySearchAsync"
              placeholder
              @select="handleSelect"
              @keyup.enter="getSearch()"
            ></el-autocomplete>
            <span class="search-btn" @click="getSearch()">
              <i class="iconfont iconsearch"></i>
            </span>
          </div>
          <div class="logo" @click="go('/')"></div>
        </div>
        <ul
          class="navbar"
          :class="{'navbar-zh':lang=='zh','navbar-ri':lang=='ri','navbar-en':lang!='zh','navbar-han':lang=='han'}"
        >
          <li
            :class="['nav_'+index,{'active':index==cur}]"
            v-for="(item,index) in menus"
            :key="index"
            @click="go(item.path)"
          >
            <a href="javaScript:;">
              {{item.name}}
              <ul class="smenu" v-if="item.childs">
                <li
                  v-for="(i,index) in item.childs"
                  :key="index"
                  @click.self="goUrl(item.path,i.id)"
                >{{i.name}}</li>
              </ul>
            </a>
          </li>
        </ul>
      </div>
      <div class="mask" v-if="loginFlag">
        <div class="login-wrapper">
          <div class="close" @click="closeLogin"></div>
          <div class="header">
            <div class="btns" :class="{'active':select==0}" @click="select=0">快捷登录</div>
            <div class="btns wx" :class="{'active':select==1}" @click="showWx">微信登录</div>
          </div>
          <div class="login-main" v-if="select==0">
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
                    placeholder="请输入您的手机号"
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
                  <span class="codes" @click="checkCode">{{codes}}</span>
                </div>
              </div>
            </div>

            <div class="loginBtn" @click="goLogin">
              <div class="warn" v-if="warn" :class="{'success':warn=='发送成功'}">{{warn}}</div>立即注册/登录
            </div>
          </div>
          <div v-else class="login-main">
            <div class="logins">
              <iframe :src="msg" frameborder="0" class="login-qr"></iframe>
            </div>
            <p>请使用微信扫描二维码登录</p>
          </div>
        </div>
      </div>
      <div class="mask" v-if="bindFlag">
        <div class="login-wrapper">
          <div class="close" @click="closeBind"></div>
          <div class="header bind-header">绑定手机账号</div>
          <div class="login-main" v-if="select==0">
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
                    placeholder="请输入您的手机号"
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
                  <span class="codes" @click="checkCode">{{codes}}</span>
                </div>
              </div>
            </div>

            <div class="loginBtn" @click="goLogin">
              <div class="warn" v-if="warn" :class="{'success':warn=='发送成功'}">{{warn}}</div>立即注册/登录
            </div>
          </div>
          <div v-else class="login-main">
            <div class="logins">
              <iframe :src="msg" frameborder="0" class="login-qr"></iframe>
            </div>
            <p>请使用微信扫描二维码登录</p>
          </div>
        </div>
      </div>
    </div>
    <div class="navbar-wrapper" v-show="top>164" :class="{'animated slideInDown':top>164}">
      <ul
        class="navbar"
        :class="{'navbar-zh':lang=='zh','navbar-ri':lang=='ri','navbar-en':lang!='zh','navbar-han':lang=='han'}"
      >
        <li
          :class="['nav_'+index,{'active':index==cur}]"
          v-for="(item,index) in menus"
          :key="index"
          @click="go(item.path)"
        >
          <a href="javaScript:;">
            {{item.name}}
            <ul class="smenu" v-if="item.childs">
              <li
                v-for="(i,index) in item.childs"
                :key="index"
                @click.self="goUrl(item.path,i.id)"
              >{{i.name}}</li>
            </ul>
          </a>
        </li>
        <div class="user-icon">
          <div class="btns" @click="openLogin" v-if="api_token==''&&lang=='zh'">
            登录
            |
            注册
          </div>
          <div class="user-wrapper" v-if="api_token!=''&&$t('news')" @click="goCenter">
            <img v-if="avatar" :src="avatar" alt />
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
import crypto from "crypto";
import checkPhone from "../bin/common.js";
export default {
  data() {
    return {
      cur: "0",
      lang: localStorage.locale ? localStorage.locale : "zh",
      loginFlag: false,
      select: 0,
      username: "",
      avatar: "",
      phone: "",
      keyword: "",
      code: "",
      smscode: "",
      child: [],
      codes: "获取验证码",
      wUrl: "",
      device_uuid: "",
      hots: [],
      showHost: false,
      imgUrl: "",
      warn: "",
      timer: "",
      count: 60,
      msg: STATIC_PW_URL + "/wx_oauth_w#hd_r=" + STATIC_WEB_URL,
      api_token: localStorage.api_token ? localStorage.api_token : "",
      bind_uid: "",
      bindFlag: false,
      timeout: null,
      top: 0
    };
  },

  watch: {
    username(val) {
      if (val != "" && checkPhone.checkPhone(this.username)) {
        this.warn = "";
      } else {
        this.warn = "请输入正确的手机号";
      }
    },
    code(val) {
      if (val != "" && val.length == 5) {
        this.warn = "";
      } else {
        this.warn = "请输入正确的图形验证码";
      }
    },
    smscode(val) {
      if (val != "" && val.length == 6) {
        this.warn = "";
      } else {
        this.warn = "请输入正确的验证码";
      }
    },
    loginState: function(val) {
      if (val) {
        this.api_token = "";
      }
    }
  },
  filters: {
    userP: function(val) {
      return val.substring(0, 3) + "···" + val.substring(8, 11);
    }
  },
  computed: {
    menus: function() {
      return this.$t("navs");
    },
    loginState() {
      return this.$store.state.loginState;
    },
    titles: function() {
      return this.$t("titles");
    }
  },
  methods: {
    querySearchAsync(queryString, cb) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(this.hots);
      }, 1000 * Math.random());
    },
    getHos() {
      this.hots = [];
      this.$api.getHost().then(res => {
        var hots = res.data;
        for (var i in hots) {
          this.hots.push({ id: hots[i].id, value: hots[i].title });
        }
      });
    },
    handleSelect(item) {
      this.keyword = item.value;
      if (this.keyword != undefined && this.keyword != "") {
        localStorage.keyword = this.keyword;
        this.$router.push({
          path: "/search"
        });
      }
    },
    getUser() {
      this.$api.getUser().then(res => {
        if (res.status == 1) {
          this.avatar = res.data.avatar;
          this.phone = res.data.phone;
          this.api_token = localStorage.api_token;
        } else {
          localStorage.clear();
          this.$router.push("/");
        }
      });
    },
    showWx() {
      this.select = 1;
    },
    changeLang(lang) {
      if (lang == "zh") {
        localStorage.l = 1;
      }
      if (lang == "en") {
        localStorage.l = 2;
      }
      if (lang == "ri") {
        localStorage.l = 3;
      }
      if (lang == "han") {
        localStorage.l = 4;
      }
      this.lang = lang;
      localStorage.locale = lang;
      this.$i18n.locale = lang;
      window.location.reload();
    },
    go(url) {
      this.$router.push(url);
    },
    goUrl(url, id) {
      setTimeout(() => {
        this.$router.push({ path: url, query: { state: id } });
      }, 500);
    },
    goCenter() {
      this.$router.push("/center");
    },
    // 登出操作
    layout() {
      let api_token = localStorage.api_token;
      localStorage.clear();
      this.$router.replace("/");
      this.api_token = "";
      this.$message.success("退出成功");
      this.$api.layout(api_token).then(res => {});
    },
    // 关闭注册页面
    closeLogin() {
      this.warn = "";
      this.username = "";
      this.code = "";
      this.smscode = "";
      this.loginFlag = false;
    },
    openLogin() {
      this.warn = "";
      this.username = "";
      this.code = "";
      this.smscode = "";
      this.loginFlag = true;
      this.getImg();
    },
    openBind() {
      this.warn = "";
      this.code = "";
      this.smscode = "";
      this.bindFlag = true;
      this.getImg();
    },
    // 关闭微信绑定的弹窗
    closeBind() {
      this.warn = "";
      this.username = "";
      this.code = "";
      this.smscode = "";
      this.bindFlag = false;
    },
    hideH() {
      setTimeout(() => {
        this.showHost = false;
      }, 800);
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
    getSearch() {
      if (this.keyword) {
        this.goSearch(this.keyword);
      }
    },
    goSearch(keyword) {
      this.keyword = keyword;
      if (this.keyword != undefined && this.keyword != "") {
        localStorage.keyword = this.keyword;
        this.$router.push({
          path: "/search"
        });
      }
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
        this.warn = "请输入手机号";
        return false;
      }
      if (!checkPhone.checkPhone(this.username)) {
        this.warn = "请输入正确的手机号";
        return false;
      }
      if (this.smscode == "") {
        this.warn = "请输入验证码";
        return false;
      }
      if (this.smscode.length != 6) {
        this.warn = "请输入正确的验证码";
        return false;
      }
      var that = this;
      var bind_uid = checkPhone.getCookie("hb_bind_uid");
      if (bind_uid) {
        this.bind_uid = bind_uid;
      }
      this.$api
        .getLogin(this.username, this.smscode, this.bind_uid)
        .then(res => {
          if (res.status == 1) {
            localStorage.api_token = res.data.api_token;
            that.api_token = res.data.api_token;
            localStorage.phone = res.data.phone;
            that.phone = res.data.phone;
            that.avatar = res.data.avatar;
            that.closeLogin();
            this.$store.commit("closeLoginState");
            if (bind_uid) {
              checkPhone.delCookie("hb_bind_uid");
            }
            window.location.reload();
          } else {
            that.warn = res.msg;
            this.getImg();
            setTimeout(() => {
              that.warn = "";
            }, 3000);
          }
        });
    },
    // 验证图形验证码是否正确
    checkCode() {
      if (this.timer != "") {
        return false;
      }
      if (this.username == "") {
        this.warn = "请输入手机号";
        return false;
      }
      if (!checkPhone.checkPhone(this.username)) {
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
        .checkCode(this.device_uuid, this.code, this.bind_uid)
        .then(res => {
          if (res.status == 1) {
            this.getCode();
          } else {
            this.warn = res.msg;
            this.getImg();
            setTimeout(() => {
              this.warn = "";
              this.code = "";
            }, 3000);
          }
        });
    },
    getCode() {
      var that = this;
      this.$api
        .getCode(this.device_uuid, this.username, this.code)
        .then(res => {
          if (res.status == 1) {
            that.warn = "发送成功";
            this.count = 60;
            this.codes = this.count + "s";
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
            setTimeout(() => {
              that.warn = "";
            }, 3000);
          } else {
            that.warn = res.msg;
            this.getImg();
            setTimeout(() => {
              that.warn = "";
            }, 3000);
          }
        });
    },
    handleScroll() {
      this.top =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    }
  },
  mounted() {
    document.title = this.titles;
    window.addEventListener("scroll", this.handleScroll);
    this.$router.afterEach((to, from) => {
      if (to.meta.cur != undefined) {
        if (to.meta.cur == 6 && localStorage.l != 1 && localStorage.l) {
          this.cur = 5;
        } else {
          this.cur = to.meta.cur;
        }
      } else {
        this.cur = -1;
      }
    });
    if (localStorage.api_token) {
      this.getUser();
    }
    if (this.$route.meta.cur != undefined) {
      if (this.$route.meta.cur == 6 && localStorage.l != 1 && localStorage.l) {
        this.cur = 7;
      } else {
        this.cur = this.$route.meta.cur;
      }
    } else {
      this.cur = -1;
    }
    this.getHos();
  }
};
</script>
<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 164px;
  background: rgba(241, 240, 239, 1);
  font-family: "PingFangSC-Regular";
  z-index: 1200;
  position: relative;
}
.nav-min {
  height: 100px;
  .nav-top {
    height: 60px;
    .logo {
      margin-top: -20px;
    }
  }
}
.nav-main {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
.nav-top {
  height: 100px;
  position: relative;
  padding-top: 40px;
  .language {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.nav-main .logo {
  width: 195px;
  height: 34px;
  background: url(.././img/home/logo.png) no-repeat;
  background-size: contain;
  cursor: pointer;
  margin-top: 25px;
}
.search {
  width: 448px;
  height: 40px;
  background: rgba(245, 245, 245, 1);
  border: 1px solid rgba(191, 191, 191, 1);
  border-radius: 2px;
  float: right;
  margin-top: 19px;
  display: flex;
  position: relative;
}
.user {
  float: right;
  width: 150px;
  margin: 20px 0 0 40px;
  position: relative;
  height: 40px;
  z-index: 10;
  cursor: pointer;
}
.user:after {
  content: "";
  width: 0px;
  height: 0px;
  border-top: 11px solid #ccc;
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  position: absolute;
  top: 12px;
  right: 0px;
}
.layout {
  display: none;
  text-align: center;
  width: 130px;
  color: #999999;
  font-size: 16px;
  line-height: 44px;
  border-radius: 5px;
  background: #fff;
  position: absolute;
  left: 0;
  bottom: -88px;
  cursor: pointer;
}
.layout .item:hover {
  color: #b47c2d;
}
.user:hover .layout {
  display: block;
}
.layout i {
  display: inline-block;
  margin-right: 5px;
}
.user img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: inline;
  outline: 0 none;
  cursor: pointer;
  vertical-align: middle;
}
.search .input {
  flex: 1;
  outline: 0 none;
  height: 38px;
  line-height: 38px;
  border: 0 none;
  font-size: 16px;
  color: #000000;
  /deep/ .el-input__inner {
    border: 0 none;
    background: transparent;
  }
}
.search i {
  font-size: 26px;
  color: #fff;
  line-height: 40px;
  margin-left: 14px;
  cursor: pointer;
}
.search-btn {
  width: 53px;
  height: 38px;
  background: rgba(180, 124, 45, 1);
  display: inline-block;
}
.btn {
  width: 96px;
  height: 30px;
  line-height: 30px;
  background: rgba(180, 124, 45, 0.3);
  border-radius: 2px;
  font-size: 16px;
  cursor: pointer;
  float: right;
  margin: 23px 0 0 94px;
  text-align: center;
}
.language {
  margin: 0;
  padding-top: 18px;
  font-size: 18px;
  text-align: right;
}
.language a {
  color: #171717;
  margin-left: 30px;
}
a.active {
  color: #b47c2d;
}
.navbar {
  margin: 26px 0 0 0;
  height: 38px;
  padding: 0;
}
.navbar > li {
  padding: 0;
  font-size: 18px;
  cursor: pointer;
  float: left;
  white-space: nowrap;
  position: relative;
  transition: ease-in-out 300ms;
  text-align: center;
  a {
    position: relative;
    font-weight: 600;
    line-height: 22px;
    color: #666666;
  }
  &.nav_0 {
    width: 122px;
    overflow: hidden;
    a {
      display: inline-block;
      width: fit-content;
      margin-right: 70px;
    }
  }
  &.nav_1,
  &.nav_2,
  &.nav_4,
  &.nav_5,
  &.nav_6 {
    width: 173px;
    a {
      display: inline-block;
      width: fit-content;
      margin-right: 70px;
    }
  }
  &.nav_3 {
    width: 118px;
    a {
      display: inline-block;
      width: fit-content;
      margin-right: 70px;
    }
  }
}
.navbar-ri {
  width: 820px;
  margin: 0px auto 0;
}
.navbar-en {
  margin: 0 auto;
  width: 984px;
  & li {
    margin: 0;
    flex: none;
    float: left;
    margin-right: 45px;
    .smenu li {
      margin-right: 0;
      float: none;
    }
  }
}
.navbar-han {
  width: 800px;
  margin: 0 auto;
}
.navbar-ri > li {
  margin-right: 80px;
}
.navbar > li:hover .smenu {
  display: block;
}
.navbar > li.active {
  a {
    border-bottom: 4px solid #b47c2d;
    color: #b47c2d;
    padding-bottom: 11px;
    position: relative;
    color: #b47c2d;
    display: inline-block;
  }
}
.smenu {
  position: absolute;
  top: 31px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0;
  margin: 0;
  color: #000;
  box-shadow: 0px 2px 11px 1px rgba(82, 81, 81, 0.24);
  display: none;
  background: #fff;
  font-size: 16px;
  border-radius: 4px;
  &:after {
    content: "";
    width: 10px;
    height: 10px;
    background: #fff;
    position: absolute;
    top: -1px;
    left: 50%;
    transform: rotate(45deg) translateX(-50%);
    z-index: -1;
  }
}
.smenu li {
  font-size: 16px;
  text-align: center;
  padding: 12px 36px;
  cursor: pointer;
  font-weight: 400;
  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  &:last-child {
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }
}
.smenu li:hover {
  background: #bb8942;
  color: #fff;
}
.cur1 {
  left: 120px;
}
.smenu ul li {
  float: left;
  margin: 0 15px;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5010;
}
.login-wrapper {
  box-sizing: content-box;
  width: 380px;
  height: 400px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 64px 88px 64px 110px;
  transform: translate(-50%, -50%);
}
.header {
  overflow: hidden;
  text-align: center;
}
.bind-header {
  color: #d1923a;
  font-weight: 600;
  font-size: 20px;
}
.btns {
  height: 30px;
  width: 120px;
  font-size: 20px;
  text-align: center;
  margin: 0 auto;
  float: left;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}
.wx {
  margin-left: 90px;
}
.header .active {
  color: #d1923a;
  border-color: #d1923a;
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
  background: url(.././img/nav/u.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 10px;
  left: 0px;
  z-index: 2;
}
div.form-inline:nth-child(2):after {
  content: "";
  width: 40px;
  height: 40px;
  background: url(.././img/nav/pc.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 10px;
  left: 0px;
  z-index: 2;
}
div.form-inline:nth-child(3):after {
  content: "";
  width: 40px;
  height: 40px;
  background: url(.././img/nav/q.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 10px;
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
  top: 10px;
  left: 0;
}
.form-inline input {
  outline: 0 none;
  border: 0 none;
  height: 40px;
  width: 300px;
  border-bottom: 1px solid #ccc;
}
.form-inline input[name="username"] {
  text-indent: 46px;
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
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  background: rgba(180, 124, 45, 1);
  border-radius: 25px;
  cursor: pointer;
  position: relative;
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
  top: -44px;
  text-align: center;
  left: 0;
  width: 100%;
}
.success {
  color: green;
}
.close {
  width: 40px;
  height: 40px;
  background: url(../img/nav/close.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: -40px;
  right: -40px;
  cursor: pointer;
}
.logins {
  width: 400px;
  height: 310px;
  margin: auto;
  display: block;
  overflow: hidden;
  position: relative;
}
.login-qr {
  width: 407px;
  height: 440px;
  margin: auto;
  display: block;
  overflow: hidden;
  position: absolute;
  top: -30px;
  left: -14px;
}
.navbar-wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0 -2px 4px 1px #ccc;
  z-index: 1000;
  height: 60px;
  transition: all ease-in-out 1500ms;
  .navbar {
    width: 1200px;
    margin: 22px auto 0;
    position: relative;
    li {
      &.nav_0 {
        width: 90px;
        overflow: hidden;
        a {
          display: inline-block;
          width: fit-content;
          margin-right: 70px;
        }
      }
      &.nav_1,
      &.nav_2,
      &.nav_4,
      &.nav_5,
      &.nav_6 {
        width: 136px;
        a {
          display: inline-block;
          width: fit-content;
          margin-right: 70px;
        }
      }
      &.nav_3 {
        width: 98px;
        a {
          display: inline-block;
          width: fit-content;
          margin-right: 70px;
        }
      }
    }
    .user-icon {
      position: absolute;
      top: 35%;
      right: 0;
      transform: translateY(-50%);
      cursor: pointer;

      .btns {
        font-size: 18px;
        font-weight: 600;
        color: #666666;
      }
      .user-wrapper {
        width: 30px;
        height: 30px;
        margin-top: -6px;
        margin-right: 10px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: auto;
          display: block;
        }
      }
    }
  }
}
</style>
