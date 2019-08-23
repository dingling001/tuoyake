<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">{{$t('navs[0].name')}}</a>
        »
        <a href="javaScript:;" @click="go">{{$t('navs[3].name')}}</a>
        »
        <a href="javaScript:;">{{$t('exb')}}</a>
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
            <img :src="item.exhibition_img" />
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
      var month = date.substring(5, 7);
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
        this.exhibitionList = res.data.temporary_new;
      });
    },
    goDetail(id) {
      this.$router.push({ path: "/eDetail", query: { id: id } });
    }
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
div.container {
  position: relative;
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

.ex li:hover img {
  transform: scale(1.05);
}

.ex li {
  width: 100%;
  margin-bottom: 40px;
  overflow: hidden;
  &:hover {
    box-shadow: 0px 7px 14px 2px rgba(95, 61, 13, 0.14);
  }
}
.ex li img {
  width: 100%;
  height: 521px;
  display: block;
  cursor: pointer;
  transition: all 500ms ease-in-out;
}
.slide-item {
  padding: 20px 30px;
  background: #fff;
  margin-top: -4px;
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