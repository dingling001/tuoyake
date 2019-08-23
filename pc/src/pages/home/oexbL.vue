<template>
  <div>
    <div class="top-wrapper">
      <div class="topbar">
        <a href="/">{{$t('navs[0].name')}}</a>
        »
        <a href="javaScript:;" @click="go">{{$t('navs[3].name')}}</a>
        »
        <a href="javaScript:;">{{$t('oexb')}}</a>
      </div>
    </div>
    <div class="container">
      <!-- 主体部分 -->
      <div class="main">
        <div class="cex">
          <ul>
            <li v-for="(item,index) in online" :key="index" @click="goEx(item.full_url)">
              <img :src="$toThumbsimg(item.exhibition_img,355,152,33,$web)" />
              <div class="slide-item">
                <h4>{{item.exhibition_name}}</h4>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      online: []
    };
  },
  filters: {
    time: function(data) {
      var date = new Date(data);
      var month = date.getMonth() + 1;
      var day = date.getDay();
      return month + "-" + day;
    },
    getYMD: function(date) {
      var year = date.substring(0, 4);
      var month = date.substring(4, 7);
      var day = date.substring(8, 10);
      return year + "年" + month + "月" + day + "日";
    }
  },
  mounted() {
    this.getOnline();
  },
  methods: {
    // 跳转媒体报道
    go() {
      this.$router.push("/exb");
      window.scroll(0, 0);
    },
    // 跳转展厅详情页
    goEx(url) {
      window.location.href = url;
    },
    //网上展厅
    getOnline() {
      let _this = this;
      this.$api.getOnline().then(res => {
        this.online = res.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.top-wrapper {
  background: #e7e7e7;
}
div.container {
  position: relative;
  z-index: 3;
}
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
}
.topbar a:hover {
  color: #b47c2d;
}

.titles {
  width: 100%;
  margin: 0px auto 40px;
}
.titles h3 {
  width: 200px;
  margin: 0 auto;
  padding: 0 30px 10px;
  font-weight: 400;
  color: #000;
  font-size: 26px;
  border-bottom: 2px solid #b47c2d;
}
.ex-banner .swiper-slide img {
  height: 579px;
  width: 100%;
  transition: all ease-in-out 500ms;
}
.slide-item {
  padding: 30px;
  background: #fff;
  margin-top: -4px;

  cursor: pointer;
}
.main {
  width: 1200px;
  margin: 30px auto;
}

.cex {
  overflow: hidden;
  margin-bottom: 75px;
}
.slide-item h4 {
  font-size: 20px;
  margin: 10px 0;
}
.slide-item p {
  font-size: 16px;
  margin-bottom: 10px;
}
.cex li {
  float: left;
  width: 45%;
  margin-bottom: 30px;
  overflow: hidden;
  &:hover {
    box-shadow: 0px 7px 14px 2px rgba(95, 61, 13, 0.14);
    img {
      transform: scale(1.05);
    }
  }
}
.cex li:nth-child(odd) {
  margin-right: 5%;
}
.cex li img {
  width: 100%;
  height: 351px;
  cursor: pointer;
  transition: all ease-in-out 500ms;
}
</style>