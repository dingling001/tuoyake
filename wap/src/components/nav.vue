<template>
  <div class="nav">
    <div class="navbars" v-if="!cur" v-cloak>
      <i class="iconfont iconfanhui" @click="goBack" v-if="back"></i>
      <div class="title">{{title}}</div>
      <i class="iconfont active denglu" @click="showNav"></i>
    </div>
    <div class="navbar-wrapper" v-else v-cloak>
      <ul class="navbar">
        <li :class="{'active':l==1}" @click="changeLang('zh')">中文</li>
        <!-- <li :class="{'active':l==2}" @click="changeLang('en')">English</li>
        <li :class="{'active':l==3}" @click="changeLang('ri')">日本語</li>
        <li :class="{'active':l==4}" @click="changeLang('han')">한국어</li>-->
      </ul>
      <i class="iconfont active denglu" @click="showNav"></i>
    </div>

    <div class="mask" v-if="maskF" v-cloak>
      <div class="mask-content">
        <i class="iconfont iconx" @click="maskF= false"></i>
        <div class="top">
          <img :src="avatar" alt />
          <div class="wrapper">
            <div class="btn btn1" @click.stop="goUser" v-if="api_token==''">点击登录/注册</div>
            <div class="btn" @click.stop="goCenter" v-if="api_token!=''">{{phone}}</div>
            <div class="layout" @click="layout" v-if="api_token!=''">退出登录</div>
          </div>
        </div>
        <ul>
          <li v-for="(item,index) in menus" :key="index" @click="go(item.path,index)">{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  name: "vNav",
  data() {
    return {
      api_token: localStorage.app_token ? localStorage.app_token : "",
      cur: false,
      title: "",
      maskF: false,
      back: true,
      l: localStorage.l ? localStorage.l : 1,
      lang: "",
      avatar: STATIC_WEB_URL + "/img/default_avatar.png",
      phone: ""
    };
  },
  computed: {
    menus: function() {
      return this.$t("navs");
    },
    titles: function() {
      return this.$t("title");
    }
  },
  mounted() {
    if (localStorage.app_token && localStorage.app_token != "") {
      this.getUser();
    }
    document.title = this.titles;
    this.$router.afterEach((to, from, next) => {
      if (to.path == "/" || to.path == "/login") {
        this.cur = true;
      } else {
        this.cur = false;
      }
      if (to.meta.title) {
        if (localStorage.l != 1 && localStorage.l != undefined) {
          switch (to.meta.title) {
            case "走进海博":
              this.title = this.menus[1].name;
              break;
            case "机构设置":
              this.title = this.menus[2].name;
              break;
            case "参观服务":
              this.title = this.menus[3].name;
              break;
            case "展览":
              this.title = this.menus[4].name;
              break;
            case "馆藏精粹":
              this.title = this.menus[5].name;
              break;
            case "影院资讯":
              this.title = this.menus[6].name;
              break;
          }
        } else {
          this.title = to.meta.title;
        }
      }
      if (to.meta.back) {
        this.back = to.mate.back;
      }
    });

    if (this.$route.query.api_token) {
      localStorage.app_token = this.$route.query.api_token;
    }
    if (this.$route.path == "/" || this.$route.path == "/login") {
      this.cur = true;
    } else {
      this.cur = false;
    }
    if (this.$route.meta.title) {
      // 多语言情况下替换标题头
      if (localStorage.l && localStorage.l != 1) {
        switch (this.$route.meta.title) {
          case "走进海博":
            this.title = this.menus[1].name;
            break;
          case "机构设置":
            this.title = this.menus[2].name;
            break;
          case "参观服务":
            this.title = this.menus[3].name;
            break;
          case "展览":
            this.title = this.menus[4].name;
            break;
          case "馆藏精粹":
            this.title = this.menus[5].name;
            break;
          case "影院资讯":
            this.title = this.menus[6].name;
            break;
        }
      } else {
        this.title = this.$route.meta.title;
      }
    }
  },
  methods: {
    goCenter() {
      this.maskF = false;
      this.$router.push("/center");
    },
    // 切换其他语言需要清除用户登录
    changeLang(lang) {
      if (lang == "zh") {
        Toast("语言切换中…");
        localStorage.l = 1;
        this.l = 1;
        document.title = "国家海洋博物馆";
      }
      if (lang == "en") {
        Toast("Language Switching...");
        this.l = 2;
        localStorage.l = 2;
        document.title = "National Maritime Museum of China";
        localStorage.removeItem("app_token");
      }
      if (lang == "ri") {
        Toast("言語切り替え中..");
        localStorage.l = 3;
        localStorage.removeItem("app_token");
        document.title = "中国国家海洋博物館";
        this.l = 3;
      }
      if (lang == "han") {
        Toast("언어 전환 중...");
        localStorage.l = 4;
        document.title = "중국국가해양박물관";
        localStorage.removeItem("app_token");
        this.l = 4;
      }

      this.lang = lang;
      localStorage.locale = lang;
      this.$i18n.locale = lang;
      window.location.reload();
    },
    setTitle(title) {
      this.title = title;
    },
    getUser() {
      this.$api.getUser().then(res => {
        this.avatar = res.data.avatar;
        this.phone = res.data.phone;
      });
    },
    goUser() {
      // 如果api_token
      if (localStorage.app_token) {
        this.$router.push("/center");
        this.maskF = false;
        return false;
      } else {
        this.$router.push("/login");
        this.maskF = false;
      }
    },
    go(url, index) {
      this.maskF = false;
      window.scrollTo(0, 0);
      this.$router.push(url);
    },
    showNav() {
      this.maskF = !this.maskF;
    },
    goBack() {
      window.history.go(-1);
      window.scrollTo(0, 0);
    },
    layout() {
      let api_token = localStorage.app_token;
      localStorage.clear();
      this.maskF = false;
      Toast("退出成功");
      setTimeout(() => {
        this.$router.replace("/");
      }, 500);
      this.$api.layout(api_token).then(res => {});
      return false;
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav {
  border-bottom: 1px solid #e5e5e5;
  position: fixed;
  top: -1px;
  left: 0;
  width: 375px;
  margin: 0 auto;
  right: 0;
  z-index: 1200;
  background: #fff;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);
}

.navbar {
  font-size: 15px;
  color: #000;
  padding: 0 11px;
  overflow: hidden;
  text-align: center;
  display: flex;
  justify-content: space-between;
  li {
    color: #777777;
    &.active {
      color: #000;
      font-size: 21px;
      position: relative;
      font-weight: 600;
      &:after {
        content: "";
        width: 100%;
        height: 4px;
        background: #b47c2d;
        border-radius: 3px;
        position: absolute;
        bottom: 4px;
        left: 0;
      }
    }
  }
}

.navbars {
  font-size: 18px;
  color: #000;
  line-height: 60px;
  height: 60px;
  padding: 0 12px;
  overflow: hidden;
  text-align: center;
  display: flex;

  .title {
    flex: 1;
    padding-right: 18px;
  }
  i.active {
    color: #b47c2d;
  }
}

.navbar-wrapper {
  display: flex;
  padding: 0 12px;
  line-height: 60px;
  height: 60px;
  justify-content: space-between;
  position: relative;
  .navbar {
    width: 231px;
    flex-flow: initial;
    padding: 0;
  }
  .navbar_lang {
    min-width: 120px;

    .item {
      float: right;
    }
  }
}

.navbars {
  font-weight: 600;
  font-size: 20px;
  position: relative;
}

.navbars .iconfanhui {
  float: left;
}
i.denglu {
  width: 25px;
  /*px*/
  height: 20px;
  /*px*/
  display: inline-block;
  background: url(.././img/home/nav.png) no-repeat;
  background-size: contain;
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
}
.navbars .iconx {
  float: right;
  width: 22px;
  display: inline-block;
  text-align: right;
}

.mask {
  position: fixed;
  z-index: 1300;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  max-width: 375px;
  top: 0;
  .iconx {
    position: absolute;
    right: 20px;
    top: 20px;
    color: #fff;
    font-size: 15px;
  }
  .top {
    height: 128px;
    padding: 45px 20px 0;
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    /*px*/
    img {
      width: 60px;
      height: 60px;
      border: 2px solid #fff;
      border-radius: 50%;
    }
    .wrapper {
      flex: 1;
      padding: 10px 20px 0;
    }
    .btn {
      color: #fff;
      font-size: 18px;
      margin-bottom: 15px;
    }
    .btn1 {
      margin-top: 10px;
    }
    .layout {
      color: #b47c2d;
      font-size: 15px;
    }
  }
}

.mask .mask-content {
  height: 100%;
  width: 74.13%;
  right: 0;
  position: absolute;
  top: 0;
  background: rgba(29, 29, 29, 0.9);
  display: flex;
  flex-direction: column;
}

.mask ul {
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 20px 0 40px;
  display: flex;
}

.mask li {
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  text-align: center;
}
</style>
