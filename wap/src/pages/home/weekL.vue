<template>
  <div class="container">
    <div class="main">
      <div class="main-content">
        <ul
          class="collections"
          infinite-scroll-immediate-check="addF"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          v-infinite-scroll="loadMore"
        >
          <li v-for="(item,index) in lists" :key="index" @click="goD(item.article_id)">
            <img :src="item.default_img" alt />
            <h3>{{item.title}}</h3>
            <p>{{item.sub_title}}</p>
            <p>
              <span class="look">
                <i class="iconfont iconeyes"></i>
                {{item.views}}
              </span>
              <span class="like">
                <i class="iconfont iconthumbs"></i>
                {{item.agrees}}
              </span>
            </p>
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
      addF: false,
      loading: false,
      userVip: 0,
      api_token: localStorage.app_token ? localStorage.app_token : "",
      count: 0,
      language: localStorage.l ? localStorage.l : 1,
      lists: [],
      skip: 0,
      page: 0,
      take: 20
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
    this.getWeek(this.skip, this.take);
  },
  methods: {
    loadMore() {
      if (this.addF) {
        this.skip = (this.page + 1) * this.take;
        this.goWeek(this.skip);
      }
    },
    goD(id) {
      this.$router.push({ path: "/detail", query: { id: id } });
    },

    getWeek() {
      this.loading = true;
      this.$api.getWeek(this.skip, this.take).then(res => {
        this.loading = false;
        if (this.lists.length > 0) {
          this.lists.concat(res.data.data);
          return false;
        }
        this.lists = res.data.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
div.container {
  position: relative;
  z-index: 3;
  min-height: 80vh;
}

.main {
  width: 100%;
  margin: 10px auto;
}

.collections {
  overflow: hidden;
  padding: 0 10px;
}
.collections li {
  width: 169px;
  margin: 0 auto;
  float: left;
  text-align: left;
  margin-bottom: 10px;
  position: relative;
  background: #f5f5f5;
  overflow: hidden;
  border-radius: 5px;
}
.collections li:nth-child(odd) {
  margin-right: 15px;
}
.collections li .btns {
  padding: 6px 10px;
  color: #fff;
  font-size: 14px;
  border-radius: 20px;
  background: #b47c2d;
  position: absolute;
  bottom: 100px;
  right: 20px;
}
.collections li img {
  width: 169px;
  height: 104px;
  display: block;
  margin: 0 auto;
}
.collections li h3 {
  font-size: 15px;
  color: #353535;
  margin: 8px 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 84%;
  text-align: left;
}
.collections li p {
  padding-bottom: 10px;
  font-size: 14px;
  margin: 0 15px;
  overflow: hidden;
  color: #7b7c7d;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 84%;
}
.look {
  float: left;
  color: #858585;
  font-size: 14px;
  display: block;
  width: 40%;
}
.like {
  float: left;
  color: #858585;
  font-size: 14px;
  display: block;
  width: 40%;
  text-align: right;
}
.main-content h3 {
  text-align: right;
  font-size: 15px;
  color: #b47c2d;
  display: block;
  margin: 10px;
}
</style>
