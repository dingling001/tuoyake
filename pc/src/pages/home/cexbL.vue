<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">{{$t('navs[0].name')}}</a>»
        <a href="javaScript:;" @click="go">{{$t('navs[3].name')}}</a>
        »
        <a href="javaScript:;">{{$t('cexb')}}</a>
      </div>
    </div>
    <div class="container">
      <!-- 第一版块 -->

      <!-- 主体部分 -->
      <div class="main">
        <ul class="cex">
          <li
            v-for="(item,index) in cExhibitionList"
            :key="index"
            @click="goDetail(item.exhibition_id)"
          >
            <img :src="item.exhibition_img" />
            <div class="slide-item">
              <h4>{{item.exhibition_name}}</h4>
              <p>{{$t('edate')}}：{{$t('longtime')}}</p>
              <p>{{$t('eaddr')}}：{{item.exhibition_address}}</p>
            </div>
          </li>
        </ul>
      </div>
      <page :totalPages="totalPage" @presentPage="changePage" v-if="totalPage>1"></page>
    </div>
  </div>
</template>
<script>
import page from "../../components/pcpaging.vue";
export default {
  name: "home",
  data() {
    return {
      cExhibitionList: [],
      totalPage: 0
    };
  },
  components: {
    page
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
    this.getEx();
  },
  methods: {
    // 跳转媒体报道
    go() {
      this.$router.push("/exb");
    },
    getEx() {
      this.$api.getEx().then(res => {
        this.cExhibitionList = res.data.theme;
      });
    },
    goDetail(id) {
      this.$router.push({ path: "/eDetail", query: { id: id } });
    },
    changePage(val) {
      this.skip = val * this.take;
      this.getSearch(this.keyword, this.type, this.skip);
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

.banner {
  width: 100%;
  height: 782px;
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
  font-size: 20px;
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

.slide-item {
  padding: 20px 30px;
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
.cex li {
  float: left;
  width: 588px;
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
  margin-right: 23px;
}
.cex li img {
  width: 100%;
  height: 351px;
  cursor: pointer;
  transition: all ease-in-out 500ms;
}
</style>