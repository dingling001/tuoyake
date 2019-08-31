<template>
  <div class="container">
    <div class="topbar">
      <router-link :to="{path:'/intro'}" class="active">{{$t('g')}}</router-link>
      <router-link :to="{path:'/introL'}" v-if="$t('news')">{{$t('zixun')}}</router-link>
      <router-link :to="{path:'/about'}">{{$t('about')}}</router-link>
    </div>
    <div class="d3" v-if="url!=''">
      <iframe :src="url" frameborder="0" scrolling="no" width="100%" height="100%"></iframe>
    </div>
    <div v-html="intro" class="intro"></div>
    <div class="ex">
      <h5>{{$t('titles')}}</h5>
      <div class="number">
        {{total}}
        <span class="total" v-if="$t('news')"></span>
        <span v-else style="font-size:16px">{{$t('unit')}}</span>
      </div>
      <div class="btn" @click="goElist">{{$t('watch')}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "intro",
  data() {
    return {
      url: "",
      total: "",
      intro: ""
    };
  },
  methods: {
    getIntro() {
      var that = this;
      that.$api.getIntro().then(res => {
        that.url = res.data.url;
        that.intro = res.data.intro;
      });
    },
    getEx() {
      let that = this;
      var l = localStorage.l || 1;
      that.$api.getEl(l, 0, 10, "", "", "", "", 1).then(res => {
        that.total = res.data.count;
      });
    },
    // 跳转展品列表页
    goElist() {
      this.$router.push("/collection");
    }
  },
  mounted() {
    this.getIntro();
    this.getEx();
  }
};
</script>
<style lang="css" scoped>
.container {
  width: 100%;
  font-size: 32px;
}
.topbar {
  height: 47px;
  line-height: 42px;
  font-size: 15px;
  text-align: center;
  background: #fff;
}
.topbar a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
  width: 120px;
  padding: 5px 10px 0;
  display: inline-block;
  text-align: center;
}
.topbar a:last-child {
  margin-right: 0;
}
.topbar a.active {
  position: relative;
  color: #000;
  z-index: 1;
  font-size: 18px;
  font-weight: 600;
}
.topbar a.active:after {
  content: "";
  width: 36px;
  height: 3px;
  background: #b47c2d;
  border-radius: 2px;
  z-index: -1;
  position: absolute;
  border-radius: 1.5px;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
}
.d3 {
  height: 185px;
  width: 100%;
  overflow: hidden;
}
.d3 iframe {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.intro {
  margin: 14px 12px;
}
.intro /deep/ p {
  font-size: 13px;
  /* px */
  line-height: 24px;
  color: rgba(0, 0, 0, 0.8);
  text-align: justify;
}
.intro /deep/ span {
  font-size: 12px !important;
  /* px */
  line-height: 20px;
  color: #000;
}
.intro /deep/ img {
  width: 100%;
  height: auto;
  margin: 10px auto;
}
.ex {
  height: 186px;
  background: url(../.././img/intro/intro_ex.png) no-repeat;
  background-size: cover;
  color: #fff;
  margin: 15px 12px;
  border-radius: 4px;
  /* px */
}
.ex h5 {
  width: 260px;
  text-align: center;
  font-size: 18px;
  /*px*/
  margin: 0px auto;
  padding-top: 30px;
  font-weight: 600;
}
.ex .number {
  width: 260px;
  margin: 20px auto 15px;
  text-align: center;
  font-size: 28px;
  position: relative;
  white-space: nowrap;
}
.ex .btn {
  width: 138px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: rgba(160, 203, 212, 1);
  border-radius: 4px;
  font-size: 14px;
  margin: 0 auto;
  cursor: pointer;
}
.ex span.total {
  width: 24px;
  height: 24px;
  display: inline-block;
  background: url(../.././img/intro/total.png) no-repeat;
  background-size: cover;
}
</style>
