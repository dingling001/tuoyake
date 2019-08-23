<template>
  <div v-cloak class="app">
    <div v-if="menus">
      <vNav ref="nav" v-if="nav"></vNav>
      <div class="contains" :class="{'lang':$t('news')==''}">
        <router-view></router-view>
      </div>
      <vFooter v-if="footer"></vFooter>
    </div>
    <router-view v-else></router-view>
    <div class="mask" v-if="noLine">
      <div class="content">
        <img src="./img/noLine.png" alt />
        <p>
          亲，网络不给力，请
          <a href="/">刷新</a>
          试试
        </p>
      </div>
    </div>
    <div class="mask-hot" v-if="hotF">
      <div class="content">
        <img src="./img/hot.png" alt />
        <div class="btn" @click="closeHot"></div>
        <p>太热情了，请稍后再来吧</p>
      </div>
    </div>
  </div>
</template>
<script>
import vNav from "./components/vNav.vue";
import vFooter from "./components/footer.vue";

export default {
  name: "App",
  data() {
    return {
      menus: true,
      nav: false,
      footer: false,
      noLine: false,
      hotF: false
    };
  },
  provide() {
    return {
      app: this
    };
  },
  computed: {
    loginState() {
      return this.$store.state.loginState;
    },
    hotState() {
      return this.$store.state.hosState;
    },
    refreshState() {
      return this.$store.state.refreshState;
    }
  },
  components: {
    vNav,
    vFooter
  },
  created() {
    var vm = this;
    this.noLine = false;
    this.hotF = false;
    vm.$router.afterEach((to, from) => {
      if (to.meta.nav != undefined && to.meta.nav == false) {
        vm.nav = to.meta.nav;
      } else {
        vm.nav = true;
      }
      if (to.meta.footer != undefined && to.meta.footer == false) {
        vm.footer = to.meta.footer;
      } else {
        vm.footer = true;
      }

      if (to.meta.menus != undefined && to.meta.menus == false) {
        vm.menus = to.meta.menus;
      } else {
        vm.menus = true;
      }
    });
  },
  watch: {
    loginState: function(val) {
      if (val) {
        this.$message("登录已过期");
        this.openLogin();
      }
    },
    hotState: function(val) {
      if (val) {
        this.hotF = true;
        this.$store.closeHotState();
      }
    },
    refreshState: function(val) {
      if (val) {
        this.noLine = true;
      }
    }
  },
  methods: {
    // 打开登录弹窗
    openLogin() {
      this.$refs.nav.openLogin();
    },
    // 打开登陆授权页面
    openBind() {
      this.$refs.nav.openBind();
    },
    // 更新登录后的用户信息
    getUser() {
      this.$refs.nav.getUser();
    },
    closeHot() {
      this.hotF = false;
      window.location.reload();
    }
  }
};
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.app {
  height: 100%;
}
.contains {
  min-height: 63.5vh;
}
.lang {
  padding-top: 100px;
  min-height: 65.5vh;
}
img {
  background: #e5e5e5 !important;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
  z-index: 2019;
  overflow: hidden;
  .content {
    width: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      display: block;
      background: transparent !important;
    }
    p {
      font-size: 24px;
      color: #000;
      margin: 100px auto 0;
      text-align: center;
      a {
        color: #cf8a16;
        padding: 0 5px;
      }
    }
  }
}
.mask-hot {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.8);
  z-index: 1500;
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 7px 17px 0px rgba(0, 0, 0, 0.13);
    border-radius: 20px;
    padding: 105px 92px 45px;
    .btn {
      width: 40px;
      height: 40px;
      background: url(./img/nav/close.png) no-repeat;
      background-size: cover;
      cursor: pointer;
      position: absolute;
      top: -40px;
      right: -40px;
    }
    img {
      width: 400px;
      background: transparent !important;
      margin: 0 auto 30px;
    }
    p {
      font-size: 24px;
      color: #000;
      margin: 0 auto;
      text-align: center;
    }
  }
}
</style>
