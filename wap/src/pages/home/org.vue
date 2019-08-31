<template>
  <div class="container">
    <div class="topbar" :class="{'topbar-en':l==2,'topbar-ri':l==3}">
      <router-link :to="{path:'/teamLeader'}">{{$t('teamLeader')}}</router-link>
      <router-link :to="{path:'/job'}">{{$t('job')}}</router-link>
      <router-link :to="{path:'/org'}" class="active">{{$t('org')}}</router-link>
    </div>
    <div v-html="struct" class="intro"></div>
  </div>
</template>
<script>
export default {
  name: "intro",
  data() {
    return {
      struct: "",
      l: localStorage.l || 1
    };
  },
  methods: {
    getIntro() {
      this.$api.getOrg().then(res => {
        this.struct = res.data.struct;
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
  font-size: 32px;
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
  margin-left: -110px;
}
.topbar-en a {
  margin-right: 5px;
  padding: 0;
}
.topbar-ri a {
  margin-right: 15px;
}
.intro {
  margin: 20px 12px;
  font-size: 14px;
}
.intro /deep/ p {
  font-size: 14px;
  line-height: 24px;
  color: #000;
}
.intro /deep/ img {
  width: 100%;
  height: auto;
  display: block;
}
.intro /deep/ span {
  font-size: 14px !important;
}
</style>
