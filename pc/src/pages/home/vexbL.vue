<template>
  <div>
    <div class="top-wrapper">
      <div class="topbar">
        <a href="/">{{$t('navs[0].name')}}</a>»
        <a href="javaScript:;" @click="go">{{$t('navs[4].name')}}</a>
        »
        <a href="javaScript:;">{{$t('vexb')}}</a>
      </div>
    </div>

    <div class="container">
      <!-- 主体部分 -->
      <div class="main">
        <!-- 最新展览 -->
        <ul class="ex">
          <li
            v-for="(item,index) in exhibitionList"
            :key="index"
            @click="goDetail(item.exhibition_id)"
          >
            <img :src="item.exhibition_img">
            <div class="slide-item">
              <h4>{{item.exhibition_name}}</h4>
              <p>展览时间：{{item.end_date|getYMD}}</p>
              <p>展览地点：{{item.exhibition_address}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      exhibitionList: []
    };
  },
  mounted() {
    this.getEx();
  },
  filters: {
    getYMD: function(date) {
      var year = date.substring(0, 4);
      var month = date.substring(4, 7);
      var day = date.substring(8, 10);
      return year + "年" + month + "月" + day + "日";
    }
  },
  methods: {
    // 跳转展品
    go() {
      this.$router.push("/exb");
      window.scroll(0, 0);
    },
    getEx() {
      this.$api.getEx().then(res => {
        this.exhibitionList = res.data.temporary_expire;
      });
    },
    goDetail(id) {
      this.$router.push({ path: "/eDetail", query: { id: id } });
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
.banner {
  width: 100%;
  height: 782px;
}

.news-banner .swiper-slide {
  position: relative;
}
.news-banner .slide-item,
.active-banner .slide-item {
  position: absolute;
  color: #fff;
  padding: 0 30px;
  bottom: 30px;

  z-index: 3;
}
.slide-item h4 {
  font-size: 24px;
  margin: 10px 0;
}
.slide-item p {
  font-size: 16px;
  margin-bottom: 10px;
}
.active-banner img {
  height: 578px;
  width: 100%;
}
.titles {
  width: 100%;
  margin: 0px auto 40px;
}
.titles h3 {
  width: 130px;
  margin: 0 auto;
  padding: 0 30px 10px;
  font-weight: 400;
  color: #000;
  font-size: 26px;
  border-bottom: 2px solid #b47c2d;
}
.ex-wrapper .item,
.ex-banner .swiper-slide {
  cursor: pointer;
}
.exs .item:hover,
.ex-c .img:hover,
.ex-banner:hover,
.active-banner:hover,
.last-item:hover,
.ex li:hover,
.cex li:hover {
  transform: scale(1.05);
}
.ex-banner .swiper-slide img {
  height: 579px;
  width: 100%;
}
.active-banner .swiper-pagination /deep/ .swiper-pagination-bullet:focus,
.ex-banner .swiper-pagination /deep/ .swiper-pagination-bullet:active,
.swiper-pagination /deep/ .swiper-pagination-bullet:focus {
  outline: 0 none;
}

.active-banner /deep/ .swiper-pagination-bullet,
.ex-banner /deep/ .swiper-pagination-bullet-active {
  background: #fff !important;
}
.ex li {
  width: 100%;
  margin-bottom: 40px;
}
.ex li img {
  width: 100%;
  height: 521px;
  display: block;
  cursor: pointer;
}
.slide-item {
  padding: 30px 76px 30px 76px;
  background: #fff;
  margin-top: -4px;
  box-shadow: 0px 7px 14px 2px rgba(95, 61, 13, 0.14);
  cursor: pointer;
}
.ex-banner h4 {
  font-size: 20px;
  margin-top: 0;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  margin-bottom: 10px;
}
.ex-banner p {
  margin: 0 0 0.25rem 0;
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.8);
}
.main {
  width: 1200px;
  margin: 30px auto;
}

.h {
  height: 216px;
  width: 186px;
  background: url(../.././img/home/h.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: -83px;
  right: 0;
  z-index: 3;
}

.date {
  display: block;
  float: right;
}

.active-banner /deep/.swiper-pagination-bullet,
.ex-banner /deep/.swiper-pagination-bullet,
.news-banner /deep/.swiper-pagination-bullet {
  background: #ccc;
}
.cex {
  overflow: hidden;
  margin-bottom: 75px;
}
.cex li {
  float: left;
  width: 45%;
  margin-bottom: 30px;
}
.cex li:nth-child(odd) {
  margin-right: 5%;
}
.cex li img {
  width: 100%;
  height: 255px;
  cursor: pointer;
}
.ex-c img {
  width: 100%;
  height: 100%;
}
.info {
  overflow: hidden;
  padding-bottom: 74px;
}
.online {
  width: 100%;
  height: 604px;
}
.active-banner {
  width: 100%;
  height: 100%;
}
h4.tel {
  margin-top: 16px;
}
p.tel-content {
  margin-top: 13px;
  line-height: 20px;
  font-size: 18px;
}
.tel-content /deep/ p {
  margin: 0;
  padding: 0;
  color: #35393c;
  font-size: 18px;
}
.info-r .item {
  width: 350px;
  height: 78px;
  background: url(../.././img/home/p.png) no-repeat;
  background-size: cover;
  margin-top: 15px;
  cursor: pointer;
}
.info-r .item1 {
  background: url(../.././img/home/t.png) no-repeat;
  background-size: cover;
}
.info-r .item2 {
  background: url(../.././img/home/j.png) no-repeat;
  background-size: cover;
}
.bg1 {
  background: #c6ae8b;
  padding: 80px 0;
}
.ex {
  margin-bottom: 75px;
}
.ex h3 {
  margin-top: 73px;
  margin-bottom: 43px;
  font-size: 26px;
  overflow: hidden;
}
.ex h3 i {
  font-size: 26px;
  margin-right: 5px;
}
.ex .btn,
.btn {
  width: 132px;
  margin: 0 auto;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 18px;
  background: rgba(211, 165, 92, 1);
  border-radius: 20px;
}
.ex-container {
  box-shadow: 0px 7px 14px 2px rgba(95, 61, 13, 0.14);
  border-radius: 2px;
}
.ex-wrapper {
  margin-top: 26px;
  overflow: hidden;
  color: #fdfcfc;
  font-size: 24px;
}
.ex-wrapper .item {
  float: left;
  width: 384px;
  height: 235px;
  position: relative;
}
.ex-wrapper div.item:nth-child(2) {
  margin: 0 20px;
}
.ec .item {
  height: 390px;
  width: 390px;
  position: relative;
}
.ex-c .img {
  width: 100%;
  height: 580px;
  position: relative;
}
.ex-wrapper .item .des,
.ex-c .des {
  position: absolute;
  z-index: 3;
  bottom: 0;
  left: 0;
  padding: 30px;
  color: #fff;
  font-size: 26px;
  font-weight: 500;
}
.ec .item .des {
  position: absolute;
  z-index: 3;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  display: none;
  width: 100%;
  height: 100%;
  text-align: center;
  color: #fff;
  font-size: 26px;
  padding: 0;
  padding-top: 170px;
  background: rgba(0, 0, 0, 0.5);
}
.ec .item .des small {
  font-size: 20px;
}
.ec .item:hover .des {
  display: block;
}

.ec div.item:nth-child(2) {
  margin: 0 14px;
}
.ec img {
  width: 100%;
  height: 100%;
}
.last {
  margin: 20px auto;
  overflow: hidden;
}
.last-item {
  width: 593px;
  float: left;
  height: 205px;
  box-shadow: 0px 2px 12px 0px rgba(181, 153, 137, 0.57);
}
div.last-item:first-child {
  margin-right: 14px;
}
.last-item img {
  width: 100%;
  height: auto;
  display: block;
}
</style>