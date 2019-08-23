<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">{{$t('navs[0].name')}}</a>
        »
        <a href="/class">{{$t('navs[7].name')}}</a>
        »
        <a href="javaScript:;">{{$t('week')}}</a>
      </div>
    </div>
    <div class="container">
      <!-- 第一版块 -->
      <div class="main">
        <div class="main-content">
          <ul class="collections">
            <li v-for="(item,index) in lists" :key="index" @click="goDetail(item.article_id)">
              <img :src="item.default_img" alt />
              <h3>{{item.title}}</h3>
              <!-- <p>{{item.sub_title}}</p> -->
              <p>
                <span class="look">
                  <i class="iconfont iconeyes"></i>
                  {{item.views}}
                </span>
                <span class="like">
                  <i class="iconfont iconthumbs-up"></i>
                  {{item.agrees}}
                </span>
              </p>
            </li>
          </ul>
          <page :totalPages="totalPage" @presentPage="getSearch" v-if="totalPage>1"></page>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import page from "../../components/pcpaging.vue";
export default {
  name: "home",
  data() {
    return {
      api_token: localStorage.api_token ? localStorage.api_token : "",
      language: localStorage.l ? localStorage.l : 1,
      lists: [],
      skip: 0,
      take: 20,
      totalPage: ""
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
  components: {
    page
  },
  mounted() {
    this.getWeek();
  },
  methods: {
    goE() {
      this.getExList(
        this.skip,
        this.take,
        this.exhibition_id,
        this.cate_id,
        this.keyword
      );
    },
    goDetail(id) {
      this.$router.push({ path: "/cDetail", query: { id: id } });
    },
    changePage(val) {
      this.skip = val * this.take;
      this.getWeek();
    },
    // 跳转详情页
    goDetail(id) {
      this.$router.push({ path: "/detail", query: { id: id } });
    },
    getWeek() {
      this.$api.getWeek(this.skip, this.take).then(res => {
        this.lists = res.data.data;
        this.totalPage = Math.floor(res.data.count / this.take) + 1;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.topbar-wrapper {
  background-color: #e7e7e7;
  height: 75px;
  line-height: 75px;
  .topbar {
    width: 1200px;
    margin: 0 auto;
    height: 75px;
    line-height: 75px;
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
.main {
  width: 1200px;
  margin: 0 auto;
  padding: 0 0 30px 0;
}

.main-content {
  padding: 30px 0;
}
.collections {
  overflow: hidden;
  margin-bottom: 40px;
}
.collections li {
  width: 290px;
  float: left;
  padding-bottom: 10px;
  margin-bottom: 13.3px;
  margin-right: 13.3px;
  background: #f5f5f5;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
}
.collections li:nth-child(4n) {
  margin-right: 0;
}
.collections li img {
  width: 290px;
  height: 180px;
}
.collections li h3 {
  font-size: 16px;
  color: #353535;
  margin: 20px 20px;
  text-align: left;
}
.collections li p {
  padding-bottom: 10px;
  font-size: 16px;
  margin: 0 20px;
  overflow: hidden;
  color: #7b7c7d;
}
.look {
  float: left;
  color: #858585;
  font-size: 16px;
  display: block;
  width: 40%;
}
.like {
  float: left;
  color: #858585;
  font-size: 16px;
  display: block;
  width: 40%;
  text-align: right;
}
.main-content h3 {
  text-align: right;
  font-size: 18px;
  color: #b47c2d;
  display: block;
  margin: 0 0 40px 0;
}
</style>