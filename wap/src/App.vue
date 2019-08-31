<template>
  <div class="app" v-cloak>
    <Nav v-if="nav" ref="nav" v-cloak></Nav>
    <div :class="{'navP':nav}">
      <keep-alive>
        <transition>
          <router-view :v-wechat-title="title" v-if="$route.meta.keepAlive"></router-view>
        </transition>
      </keep-alive>
      <transition :name="transitionName">
        <router-view :v-wechat-title="title" v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </div>
    <Footer v-if="footer" v-cloak></Footer>
  </div>
</template>
<script>
import Nav from "./components/nav.vue";
import Footer from "./components/footer.vue";
export default {
  name: "App",
  data() {
    return {
      nav: false,
      plat: "",
      footer: false,
      transitionName: "slide-right"
    };
  },
  computed: {
    title: function() {
      return this.$t("title");
    }
  },
  components: {
    Nav,
    Footer
  },
  watch: {
    $route(to, from) {
      let that = this;
      var api_token = that.getParams("api_token");
      if (api_token) {
        localStorage.app_token = api_token;
      }
      var browser = {
        versions: (function() {
          var u = navigator.userAgent,
            app = navigator.appVersion;
          return {
            //移动终端浏览器版本信息
            trident: u.indexOf("Trident") > -1, //IE内核
            presto: u.indexOf("Presto") > -1, //opera内核
            webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
            gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或uc浏览器
            iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf("iPad") > -1, //是否iPad
            webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
          };
        })(),
        language: (
          navigator.browserLanguage || navigator.language
        ).toLowerCase()
      };
      if (browser.versions.mobile) {
        var ua = navigator.userAgent.toLowerCase();
        var api_token = that.getParams("api_token");
        //在微信中打开
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          PLAT = "wx";
          wx.miniProgram.getEnv(function(res) {
            if (res.miniprogram) {
              // 小程序环境下逻辑
              PLAT = "wxmini";
              that.plat = "wxmini";
              that.nav = false;
              that.footer = false;
              return false;
            }
          });
          if (api_token == undefined && that.plat != "wxmini") {
            if (to.meta.nav == undefined) {
              this.nav = true;
            } else {
              this.nav = to.meta.nav;
            }
            if (to.meta.footer == undefined) {
              this.footer = true;
              return false;
            }
            this.footer = to.meta.footer;
          }
        } else {
          if (to.meta.nav == undefined) {
            this.nav = true;
          } else {
            this.nav = to.meta.nav;
          }
          if (to.meta.footer == undefined) {
            this.footer = true;
            return false;
          }
          this.footer = to.meta.footer;
        }
      }
    }
  },
  provide() {
    return {
      app: this
    };
  },
  methods: {
    setTitle(title) {
      this.$refs.nav.setTitle(title);
    },
    getParams(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      var q = window.location.pathname.substr(1).match(reg_rewrite);
      if (r != null) {
        return unescape(r[2]);
      } else if (q != null) {
        return unescape(q[2]);
      } else {
        return null;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.app {
  max-width: 375px;
  margin: 0 auto;
  box-shadow: 0 0 3px #ccc;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
img {
  background: #e5e5e5;
  display: block;
}
.navP {
  flex: 1;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
}
</style>
