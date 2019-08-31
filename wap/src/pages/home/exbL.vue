<template>
  <div class="container">
    <div class="topbar">
      <router-link :to="{path:'/exbL'}" class="active">{{$t('exb')}}</router-link>
      <router-link :to="{path:'/cexbL'}">{{$t('cexb')}}</router-link>
      <router-link :to="{path:'/oexbL'}">{{$t('oexb')}}</router-link>
      <router-link :to="{path:'/vexbL'}">{{$t('vexb')}}</router-link>
    </div>
    <div class="swiper-container banner">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item,index) in banners"
          :key="index"
          @click="goEx(item.exhibition_id)"
        >
          <img :src="$toThumbsimg(item.exhibition_img,375,150,33,$web)" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <ul class="ex">
      <li v-for="(item,index) in exhibitionList" :key="index" @click="goEx(item.exhibition_id)">
        <img :src="$toThumbsimg(item.exhibition_img,355,152,33,$web)" />
        <div class="slide-item">
          <h4>{{item.exhibition_name}}</h4>
          <p>展览时间：{{item.end_date|getYMD}}</p>
          <p>展览地点：{{item.exhibition_address}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  name: "traff",
  data() {
    return {
      exhibitionList: [],
      banners: []
    };
  },
  filters: {
    getYMD: function(date) {
      var year = date.substring(0, 4);
      var month = date.substring(5, 7);
      var day = date.substring(8, 10);
      return year + "年" + month + "月" + day + "日";
    }
  },
  methods: {
    initSwiper() {
      this.$api.getEBanner().then(res => {
        this.banners = res.data;
        if (this.banners.length > 5) {
          this.banners = this.banners.splice(0, 5);
        }
        if (this.banners.length > 1) {
          setTimeout(() => {
            let swiper = new Swiper(".banner", {
              autoplay: 3000,
              direction: "horizontal",
              loop: true,
              //手动触发后继续播放
              autoplayDisableOnInteraction: false,
              // 如果需要分页器
              pagination: ".swiper-pagination",
              paginationElement: "span",
              paginationClickable: true
            });
          }, 800);
        }
      });
    },
    getEx() {
      this.$api.getEx().then(res => {
        this.exhibitionList = res.data.temporary_new;
      });
    },
    goEx(id) {
      this.$router.push({ path: "/eDetail", query: { id: id } });
    }
  },
  mounted() {
    this.initSwiper();
    this.getEx();
  }
};
</script>
<style lang="css" scoped>
.container {
  width: 100%;
}
.topbar {
  margin: 0 12px;
  height: 60px;
  line-height: 60px;
  font-size: 15px;
  text-align: center;
  display: flex;
}
.topbar a {
  text-decoration: none;
  color: #999;
  width: 120px;
  padding: 0 10px;
  flex: 1;
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
  bottom: 20px;
  left: 0;
}
.banner {
  width: 100%;
  height: 150px;
}
.banner img {
  width: 100%;
  height: 100%;
}
.swiper-pagination /deep/ .swiper-pagination-bullet {
  background: rgba(255, 255, 255, 0.8);
}

.swiper-pagination / deep/ .swiper-pagination-bullet-active {
  background: #fff;
}
.ex {
  margin: 20px 12px;
}
.ex li {
  width: 100%;
  margin-bottom: 15px;
}
.ex li img {
  width: 100%;
  height: 152px;
  display: block;
  cursor: pointer;
}
.slide-item {
  padding: 10px;
  background: #fff;
  margin-top: -4px;
  box-shadow: 0px 7px 14px 2px rgba(95, 61, 13, 0.14);
  cursor: pointer;
}
.ex h4 {
  font-size: 14px;
  margin-top: 5px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  margin-bottom: 5px;
}
.ex p {
  margin: 0 0 5px 0;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.8);
}
.ex p:last-child {
  margin-bottom: 0;
}
</style>
