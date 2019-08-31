<template>
  <div class="container">
    <div class="topbar" :class="{'topbar-en':l==2,'topbar-ri':l==3}">
      <router-link :to="{path:'/teamLeader'}" class="active">{{$t('teamLeader')}}</router-link>
      <router-link :to="{path:'/job'}">{{$t('job')}}</router-link>
      <router-link :to="{path:'/org'}">{{$t('org')}}</router-link>
    </div>
    <div v-html="speak" class="intro"></div>
  </div>
</template>
<script>
export default {
  name: "intro",
  data() {
    return {
      speak: "",
      l: localStorage.l || 1
    };
  },
  methods: {
    getIntro() {
      this.$api.getOrg().then(res => {
        this.speak = res.data.speak;
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
  color: #999;
  font-size: 15px;
  text-align: center;
}
.topbar a {
  text-decoration: none;
  width: 120px;
  padding: 0 10px;
  color: #999;
  margin-right: 30px;
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
.topbar-en {
  white-space: nowrap;
  margin-left: 15px;
}
.topbar-en a {
  margin-right: 5px;
  padding: 0;
}
.topbar-ri a {
  margin-right: 15px;
}
.intro {
  margin: 20px 15px;
  font-size: 14px;
}
.intro /deep/ p {
  font-size: 14px;
  line-height: 24px;
  color: #000;
}
.intro /deep/ img {
  width: 100%;
  margin: 10px auto;
  height: auto;
  display: block;
}
</style>
