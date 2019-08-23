<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">{{$t('navs[0].name')}}</a>
        »
        <a href="javaScript:;" @click="go">{{$t('navs[3].name')}}</a>
        »
        <a href="javaScript:;">{{$t('can')}}</a>
      </div>
    </div>

    <div class="container">
      <div v-html="content" class="content"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: ""
    };
  },
  methods: {
    getDetail() {
      this.$api.getRe().then(res => {
        this.content = res.data.content;
      });
    },
    go() {
      this.$router.push("/guide");
    }
  },
  mounted() {
    this.getDetail();
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
  margin: 0 auto;
}

.title {
  font-size: 25px;
  color: #313131;
  width: 500px;
  line-height: 30px;
  text-align: center;
  margin: 30px auto 55px;
}

.content {
  margin-bottom: 30px;
  margin-top: 20px；;
}
.content /deep/ p {
  font-size: 16px;
  letter-spacing: 1px;
  line-height: 30px;
  color: #666;
  text-indent: 2em;
}
</style>