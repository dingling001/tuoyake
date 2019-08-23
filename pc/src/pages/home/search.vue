<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">{{$t('navs[0].name')}}</a>
        »
        <a href="javaScript:;">搜索</a>
      </div>
    </div>

    <div class="container">
      <div class="main-content">
        <div class="title">
          <h3>搜索结果</h3>
        </div>
        <div class="select">
          <div class="select-type">
            <span>分类：</span>
            <el-select v-model="type" class="select-wrapper" placeholder="请选择">
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="select-input">
            <span>关键字：</span>
            <input
              type="text"
              placeholder="请输入关键字"
              v-model="keyword"
              @keyup.enter="goSearch(keyword)"
            />
            <i class="iconfont iconsearch" @click="goSearch"></i>
          </div>
          <div class="select-total">找到相关记录{{total}}条</div>
        </div>
        <div class="hot">
          <div class="hot-title">搜索热词:</div>
          <ul>
            <li
              v-for="(item,index) in hots"
              :key="index"
              @click="goS(item.title,item.type)"
            >{{item.title}}</li>
          </ul>
        </div>
        <div class="search-top">
          <h5>
            来源
            <span>类型</span>
          </h5>
          <ul v-if="searchD.length>0">
            <li v-for="(item,index) in searchD" :key="index" @click="goDetail(item.oid,item.type)">
              <span class="icon"></span>
              <div class="item">
                <span
                  v-for="(i,ins) in getTitle(keyword,item.title)"
                  :key="ins"
                  :class="{'active':i==keyword}"
                >{{i}}</span>
              </div>
              <div class="type">{{checkType(item.type)}}</div>
            </li>
          </ul>
          <div class="no" v-if="noFlag">
            <img src="../../img/noSearch.png" alt />
            <p>没有找到相关内容 换个关键词试试~</p>
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
      keyword: "",
      take: 10,
      skip: 0,
      searchD: [],
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
  mounted() {
    this.keyword = localStorage.keyword;
    this.getSearch(this.keyword);
    this.getHost();
  },
  methods: {
    checkType: function(val) {
      var that = this;
      for (var i = 0; i < that.types.length; i++) {
        if (that.types[i].value == val) {
          return that.types[i].name;
        }
      }
    },
    getTitle(key, str) {
      return str.replace(new RegExp(`${key}`, "g"), `%%${key}%%`).split("%%");
    },
    goS(title) {
      this.keyword = title;
      location.keyword = title;
      this.getSearch(title);
    },
    goDetail(id, type) {
      // type=100 前往展品
      if (type == 100) {
        this.$router.push({
          path: "/cDetail",
          query: {
            id: id
          }
        });
      }
      // type==101 前往展厅详情
      if (type == 101)
        this.$router.push({
          path: "/eDetail",
          query: {
            id: id
          }
        });
      // 前往资讯情绪
      if (type == 102) {
        this.$router.push({
          path: "/adetail",
          query: {
            id: id
          }
        });
      }
      if (type == 103) {
        this.$router.push({
          path: "/active/activedetail",
          query: {
            active_id: id
          }
        });
      }
    },
    goSearch() {
      if (this.keyword != "") {
        localStorage.keyword = this.keyword;
        this.getSearch(this.keyword);
      } else {
        this.$message("请输入关键字！");
      }
    },
    getSearch(keyword) {
      this.$api.getSearch(keyword, this.type, this.skip).then(res => {
        if (res.data.data.length <= 0) {
          this.noFlag = true;
        } else {
          this.noFlag = false;
        }
        this.searchD = res.data.data;
        this.total = res.data.count;
        this.totalPage = Math.ceil(res.data.count / this.take);
      });
    },
    getHost() {
      this.$api.getHost().then(res => {
        this.hots = res.data;
      });
    },
    changePage(val) {
      console.log(val);
      this.skip = (val - 1) * this.take;
      console.log(this.skip);
      this.getSearch(this.keyword);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 1200px;
  margin: 30px auto 0;
}
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
.title {
  width: 230px;
  margin: 0px auto 40px;
}
.title h3 {
  width: fit-content;
  text-align: center;
  margin: 0 auto;
  padding: 0 30px;
  font-weight: 400;
  color: #000;
  font-size: 26px;
  position: relative;
  vertical-align: middle;
  &:after {
    content: "";
    width: 58px;
    height: 18px;
    position: absolute;
    top: 50%;
    left: -50px;
    margin-top: -6;
    background: url(../.././img/home/t_l.png) no-repeat;
    background-size: cover;
  }
  &:before {
    content: "";
    width: 58px;
    height: 18px;
    position: absolute;
    top: 50%;
    right: -50px;
    margin-top: -6;
    background: url(../.././img/home/t_r.png) no-repeat;
    background-size: cover;
  }
}
.select {
  height: 60px;
  font-weight: normal;
  font-size: 16px;
  color: #000;
}
.select-type {
  width: 238px;
  border: 1px solid #999999;
  float: left;
  height: 40px;
  padding-left: 15px;
}
.select-type .select-wrapper {
  border: 0 none;
  outline: 0 none;
  height: 38px;
  line-height: 38px;
  width: 70%;
  background: #fff;
}
/deep/ .el-input__inner {
  border: 0 none;
  height: 38px;
}
.select-input {
  width: 504px;
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
  margin-left: 20px;
  float: left;
  border: 1px solid #999999;
  position: relative;
}
.select-input input {
  outline: 0 none;
  border: 0 none;
  width: 78%;
}
.iconfont {
  font-size: 30px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 10px;
}
.select-total {
  height: 40px;
  line-height: 40px;
  float: right;
}
.hot {
  margin: 20px 0;
  display: flex;
  font-size: 16px;
  color: #000;
  min-height: 40px;
}
.hot-title {
  width: 80px;
  font-size: 16px;
  color: #000;
  float: left;
}
.hot ul {
  margin: 0;
  padding: 0;
  flex: 1;
  overflow: hidden;
}
.hot ul li {
  float: left;
  padding: 0 15px;
  margin-bottom: 20px;
  cursor: pointer;
}
.hot ul li:hover {
  color: #b47c2d;
}
.search-top {
  min-height: 700px;
}
.search-top h5 {
  margin: 0;
  font-size: 16px;
  color: #000;
  padding-bottom: 23px;
  border-bottom: 5px solid #b47c2d;
}
.search-top h5 span {
  float: right;
  display: inline-block;
  margin-right: 60px;
}
.type {
  width: 120px;
  float: right;
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
  height: 60px;
  line-height: 60px;
  cursor: pointer;
  width: 100%;
  text-indent: 30px;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  color: #000;
  position: relative;
}
.search-top li:hover {
  color: #b47c2d;
}
.item {
  float: left;
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.search-top li span.icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #b47c2d;
  transform: translateY(-50%);
  position: absolute;
  top: 50%;
  left: 10px;
}
.search-top li .active {
  background: #e8d7c0;
}
.main-content {
  padding-bottom: 30px;
}
</style>