<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">{{$t('navs[0].name')}}</a>
        »
        <a href="javaScript:;">{{$t('navs[2].name')}}</a>
      </div>
    </div>
    <div class="container">
      <div class="title">
        <h3>-{{$t('words')}}-</h3>
      </div>
      <div class="speak" v-html="speak"></div>
      <div class="title">
        <h3>-{{$t('obj')}}-</h3>
      </div>
      <div class="obj" v-html="brief"></div>
      <div class="title">
        <h3>-{{$t('org')}}-</h3>
      </div>
      <div v-html="struct" class="content"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      speak: "",
      brief: "",
      struct: "",
      count: ""
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        var state = val.query.state;
        var that = this;
        switch (state) {
          case "about":
            that.tab_footer(2);
            break;
          case "intro":
            that.tab_footer(0);
            break;
          case "zixun":
            that.tab_footer(1);
            break;
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  filters: {
    getYMD: function(data) {
      if (data == "") {
        return;
      }
      var date = new Date(data);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDay();
      return year + "." + month + "." + day;
    }
  },
  methods: {
    getDetail() {
      this.$api.getOrg().then(res => {
        this.speak = res.data.speak;
        this.brief = res.data.brief;
        this.struct = res.data.struct;
      });
    },
    go() {
      this.$router.push("/intro");
    },
    // 底部切换
    tab_footer(index) {
      let jump = document.querySelectorAll(".title");
      let total = jump[index].offsetTop - 180;
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = total / 100;
      if (total > distance) {
        smoothDown();
      } else {
        let newTotal = distance - total;
        step = newTotal / 50;
        smoothUp();
      }

      function smoothDown() {
        if (distance < total) {
          distance += step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          setTimeout(smoothDown, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
        }
      }

      function smoothUp() {
        if (distance > total) {
          distance -= step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          setTimeout(smoothUp, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
        }
      }
    }
  },
  mounted() {
    this.getDetail();
    setTimeout(() => {
      var state = this.$route.query.state;
      var that = this;
      switch (state) {
        case "about":
          that.tab_footer(2);
          break;
        case "intro":
          that.tab_footer(0);
          break;
        case "zixun":
          that.tab_footer(1);
          break;
      }
    }, 500);
  }
};
</script>
<style lang="scss" scoped>
.topbar-wrapper {
  background-color: #e7e7e7;
  height: 60px;
  line-height: 60px;
  .topbar {
    width: 1200px;
    margin: 0 auto;
    height: 60px;
    line-height: 60px;
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
[v-cloak] {
  display: none;
}
.container {
  width: 1200px;
  margin: 30px auto;
}
.topbar {
  height: 60px;
  line-height: 60px;
  color: #000;
  font-size: 18px;
}
.topbar a {
  text-decoration: none;
  color: #000;
}
.topbar a:hover {
  color: #b47c2d;
}
.title {
  width: 100%;
  margin: 0px auto 40px;
}
.title h3 {
  width: fit-content;
  text-align: center;
  margin: 0 auto;
  padding: 0 30px 10px;
  font-weight: 400;
  color: #000;
  font-size: 26px;
  border-bottom: 2px solid #b47c2d;
}
.speak,
.obj,
.content {
  margin-bottom: 30px;
  margin-top: 50px；;
}
.obj {
  background: #e5e0db;
  padding: 40px 30px 50px;
}
.speak /deep/ p,
.job /deep/ p,
.content /deep/ p {
  font-size: 16px;
  letter-spacing: 1px;
  line-height: 30px;
  color: #666;
  text-indent: 2em;
}
</style>