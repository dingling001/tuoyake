<template>
  <div class="container">
    <div class="topbar">
      <router-link :to="{path:'/guide'}">{{$t('zhinan')}}</router-link>
      <router-link :to="{path:'/traff'}">{{$t('traff')}}</router-link>
      <router-link :to="{path:'/can'}" class="active">{{$t('can')}}</router-link>
      <router-link :to="{path:'/around'}" v-if="$t('news')">{{$t('around')}}</router-link>
    </div>
    <h3>{{title}}</h3>
    <div v-html="struct" class="intro"></div>
  </div>
</template>
<script>
export default {
  name: "intro",
  data() {
    return {
      struct: "",
      title: ""
    };
  },
  methods: {
    getIntro() {
      this.$api.getRe().then(res => {
        this.title = res.data.title;
        this.struct = res.data.content;
      });
    }
  },
  mounted() {
    this.getIntro();
  }
};
</script>
<style lang="css" scoped>
.container {
  width: 100%;
}
.topbar {
  height: 60px;
  line-height: 60px;
  font-size: 15px;
  text-align: center;
}
.topbar a {
  text-decoration: none;
  color: #999;
  width: 120px;
  padding: 0 10px;
  margin-right: 15px;
  text-align: center;
}
.topbar a:last-child {
  margin-right: 0;
}
.topbar a.active {
  position: relative;
  color: #000;
  z-index: 1;
}
.topbar a.active:after {
  content: "";
  width: 100%;
  height: 10px;
  background: linear-gradient(
    0deg,
    rgba(234, 149, 28, 1),
    rgba(255, 255, 255, 1)
  );
  border-radius: 2px;
  z-index: -1;
  position: absolute;
  bottom: 0;
  left: 0;
}
h3 {
  text-align: center;
  font-size: 15px;
  color: #000;
}
.intro {
  margin: 20px 15px;
  font-size: 14px;
}
.intro /deep/ p {
  font-size: 14px;
  text-indent: 2em;
  line-height: 20px;
  color: #000;
}
.intro /deep/ img {
  display: block;
  width: 100%;
  height: auto;
  text-align: center;
}
</style>
