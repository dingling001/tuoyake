<template>
  <div class="class">
    <div class="topbar">
      <router-link :to="{path:'/class'}">每周一图</router-link>
      <router-link :to="{path:'/baiL'}" class="active">海洋百科</router-link>
      <router-link :to="{path:'/answer'}">互动问答</router-link>
    </div>
    <ul class="ke">
      <li v-for="(item,index) in bai" :key="index" @click="goDetail(item.article_id)">
        <img :src="item.img" alt class="img" />
        <div class="weeks-title">{{item.title}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      first: "",
      weeks: "",
      bai: "",
      showD: false,
      showV: false,
      video: ""
    };
  },
  methods: {
    getHall() {
      this.$api.getAd(0, 10, 7, 0).then(res => {
        this.bai = res.data;
      });
    },
    goDetail(id) {
      this.$router.push({ path: "/baiD", query: { id: id } });
    }
  },
  mounted() {
    this.getHall();
  }
};
</script>
<style lang="scss" scoped>
.class {
  margin: 0 auto;
  width: 100%;
  min-height: 100%;
  background: #f5f5f5;
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
.ke {
  overflow: hidden;
  padding: 12px 12px 15px;
}
.ke li {
  float: left;
  width: 169px;
  height: 241.5px;
  margin-right: 12px;
  margin-bottom: 15px;
  position: relative;
  cursor: pointer;
  &:after {
    content: "";
    width: 7px;
    box-shadow: 0 0 11px rgba(0, 0, 0, 0.7);
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      from(rgba(0, 0, 0, 0.3)),
      to(rgba(0, 0, 0, 0))
    );
    position: absolute;
    top: 0;
    left: 0;
    z-index: 33;
    height: 241.5px;
  }
}
.ke li:nth-child(2n) {
  margin-right: 0;
}
.ke li img {
  width: 100%;
  height: 100%;
  position: relative;
  &::after {
    content: "";
    width: 10px;
    height: 241.5px;
    box-shadow: 0 0 3px 2px #000;
    position: absolute;
    top: 0;
    left: 15px;
    z-index: 10;
  }
}
.weeks-title {
  position: absolute;
  bottom: 20px;
  left: 15px;
  line-height: 20px;
  color: #fff;
}
</style>