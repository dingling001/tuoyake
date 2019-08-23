<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">{{$t('navs[0].name')}}</a>
        »
        <a href="javaScript:;" @click="go">{{$t('navs[1].name')}}</a>
        »
        <a href="javaScript:;">海博新闻</a>
      </div>
    </div>

    <div class="container">
      <div class="main-content">
        <div class="menu">
          <div class="btn" :class="{'active':curs==0}" @click="showMedia(0)">媒体报道</div>
          <div class="btn" :class="{'active':curs==1}" @click="showMedia(1)">海博资讯</div>
        </div>
        <div class="search-top">
          <ul v-if="listS.length>0">
            <li v-for="(item,index) in listS" :key="index" @click="goDetail(item.article_id)">
              <span>[{{item.created_at|time}}]</span>
              {{item.title}}
            </li>
          </ul>
          <div class="no" v-if="noFlag">
            <img src="../../img/noSearch.png" alt />
            <p>暂无数据</p>
          </div>
        </div>

        <page :totalPages="totalPage" @presentPage="changePage" v-if="totalPage>1"></page>
      </div>
    </div>
  </div>
</template>
<script>
import page from "../../components/pcpaging.vue";
export default {
  data() {
    return {
      type: "",
      total: 0,
      curs: 0,
      keyword: "",
      take: 20,
      skip: 0,
      listS: [],
      totalPage: 0,
      hots: [],
      noFlag: false,
      types: [
        { name: "全部", value: "" },
        { value: 100, name: "展品" },
        { value: 101, name: "展厅" },
        { value: 102, name: "资讯" },
        { value: 103, name: "活动" }
      ]
    };
  },
  components: {
    page
  },
  filters: {
    time: function(data) {
      if (data == "") {
        return "";
      }
      var year = data.substring(0, 4);
      var month = data.substring(5, 7);
      var day = data.substring(8, 10);
      return year + "-" + month + "-" + day;
    }
  },
  created() {
    if (this.$route.query.curs != undefined) {
      this.curs = this.$route.query.curs;
      console.log(this.curs);
    }
  },
  mounted() {
    this.getList(5);
  },
  methods: {
    changePage(val) {
      this.skip = val * this.take;
      this.getSearch(this.keyword, this.type, this.skip);
    },
    go() {
      this.$router.push("/intro");
    },
    showMedia(index) {
      this.curs = index;
      if (index == 0) {
        return this.getList(5);
      }
      this.getList(1);
    },
    goDetail(id) {
      this.$router.push({
        path: "/detail",
        query: {
          id: id
        }
      });
    },
    getList(type) {
      this.$api.getAd(0, 20, type).then(res => {
        this.listS = res.data;
        if (res.data.length == 0) {
          return (this.noFlag = true);
        } else {
          this.noFlag = false;
        }
      });
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
.container {
  width: 1200px;
  margin: 0 auto;
}
.topbar a:hover {
  color: #b47c2d;
}
.title {
  width: 100%;
  margin: 0px auto 40px;
}
.title h3 {
  width: 210px;
  text-align: center;
  padding: 0 30px 10px;
  font-weight: 400;
  color: #000;
  font-size: 26px;
  border-bottom: 2px solid #b47c2d;
}
.menu {
  height: 30px;
  line-height: 30px;
  margin: 20px 0 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #b37b2d;
}
.menu .btn {
  font-size: 16px;
  color: #000;
  width: 92px;
  float: left;
  text-align: center;
  cursor: pointer;
}
.menu span {
  float: right;
  cursor: pointer;
  color: #6b6b6b;
}
.menu .btn.active {
  color: #fff;
  background: #b47c2d;
}
.news {
  margin-bottom: 50px;
}
.search-top {
  min-height: 700px;
}
.no {
  width: 500px;
  margin: 0px auto;
}
.no img {
  margin-top: 40px;
  display: block;
  width: 500px;
}
.no p {
  color: #929292;
  width: 500px;
  margin: 40px auto;
  font-size: 24px;
  text-align: center;
}
.search-top ul {
  padding: 0;
  margin: 0 0 30px 0;
}
.search-top li {
  height: 40px;
  line-height: 40px;
  width: 100%;
  border-bottom: 1px dashed #ccc;
  font-size: 16px;
  color: #808080;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.search-top li span {
  display: inline-block;
  margin: 0 15px;
}
.search-top li:hover {
  color: #b37b2d;
}
</style>