<template>
  <div class="class">
    <div class="topbar">
      <router-link :to="{path:'/class'}">每周一图</router-link>
      <router-link :to="{path:'/baiL'}">海洋百科</router-link>
      <router-link :to="{path:'/answer'}" class="active">互动问答</router-link>
    </div>
    <div class="hu">
      <img src="../.././img/ke1.png" alt />
    </div>
    <div class="btns" @click="goQ">开始问答</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goQ() {
      this.$router.push("/question");
    }
  }
};
</script>
<style lang="scss" scoped>
.class {
  margin: 0 auto;
  width: 100%;
  min-height: 40vh;
  position: relative;
}
.container {
  width: 100%;
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

.hu {
  width: 100%;
  height: 200px;
  background: rgba(245, 245, 245, 1);
  box-shadow: 0px 7px 8px 0px rgba(168, 167, 165, 0.5);
  position: relative;
}
.hu img {
  width: 100%;
  height: 100%;
}
.btns {
  width: 90%;
  height: 40px;
  background: rgba(180, 124, 45, 1);
  border-radius: 20px;
  cursor: pointer;
  line-height: 40px;
  text-align: center;
  font-size: 12px;
  color: #fff;
  position: fixed;
  bottom: 20px;
  left: 50%;
  margin-left: -45%;
}
</style>