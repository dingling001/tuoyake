<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">{{$t('navs[0].name')}}</a> »
        <router-link :to="{path:'/class'}">{{$t('navs[7].name')}}</router-link>»
        <a href="javaScript:;">{{$t('bai')}}</a>
      </div>
    </div>
    <ul class="ke">
      <li v-for="(item,index) in bai" :key="index" @click="goD(item.article_id)">
        <img :src="item.img" alt />
        <div class="weeks-title">{{item.title}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bai: ""
    };
  },
  methods: {
    getHall() {
      this.$api.getAd(0, 10, 7, 0).then(res => {
        this.bai = res.data;
      });
    },
    goD(id) {
      this.$router.push({ path: "/baiD", query: { id: id } });
    }
  },
  mounted() {
    this.getHall();
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

.ke {
  overflow: hidden;
  margin: 30px auto 50px;
  width: 1200px;
}
.weeks-title {
  position: absolute;
  left: 0;
  bottom: -69px;
  box-sizing: border-box;
  width: 100%;
  height: 59px;
  padding-left: 20px;
  background: url(../.././img/home/underlay-bg.png);
  background-size: contain;
  line-height: 49px;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #ffffff;
  font-size: 26px;
}
.ke li:hover .weeks-title {
  bottom: 0;
}

.ke li {
  float: left;
  width: 390px;
  height: 556px;
  margin-right: 15px;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  &:after {
    content: "";
    width: 14px;
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
    height: 556px;
  }
}
.ke li:nth-child(3n) {
  margin-right: 0;
}
.ke li img {
  width: 100%;
  height: 100%;
}
</style>