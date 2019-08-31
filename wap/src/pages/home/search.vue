<template>
  <div class="search">
    <div class="search-top">
      <i class="iconfont iconsearch"></i>
      <div class="input">
        <input type="text" v-model="keyword" placeholder="搜索您喜欢的" />
      </div>
      <span @click="cancel" v-if="keyword!=''" class="btn-close iconfont iconshan-chu"></span>
      <div class="btns" @click="goBack">取消</div>
    </div>
    <div class="search-main" v-if="searchS.length==0">
      <h3>热门搜索</h3>
      <ul class="hot">
        <li v-for="(item,index) in hots" :key="index" @click="goSearch(item.title)">{{item.title}}</li>
      </ul>
    </div>
    <ul
      class="search-wrapper"
      infinite-scroll-immediate-check="addF"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      v-infinite-scroll="loadMore"
      v-if="searchS.length>0"
    >
      <li v-for="(item,index) in searchS" :key="index" @click="goDetail(item.type,item.oid)">
        <span class="types">{{item.type|types}}</span>
        <span
          v-for="(i,ins) in getTitle(keyword,item.title)"
          :key="ins"
          :class="{'active':i==keyword}"
        >{{i}}</span>
      </li>
    </ul>
    <div class="no" v-if="noFlag">
      <img src="../../img/noSearch.png" alt />
      <p>
        没有找到相关内容
        换个关键词试试~
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "search",
  data() {
    return {
      keyword: "",
      hots: [],
      searchS: [],
      loading: "",
      addF: false,
      noFlag: false,
      take: 20,
      page: 0,
      skip: 0
    };
  },
  watch: {
    keyword: function(val) {
      this.noFlag = false;
      if (val == "") {
        setTimeout(() => {
          this.cancel();
        }, 300);
        return;
      }
      this.goSearch(val);
    }
  },
  filters: {
    types: function(val) {
      if (val == 100) {
        return "展品";
      }
      if (val == 101) return "展厅";
      if (val == 102) return "资讯";
      if (val == 103) return "活动";
    }
  },
  methods: {
    getHots() {
      this.$api.getHot().then(res => {
        this.hots = res.data;
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    cancel() {
      this.keyword = "";
      this.searchS = [];
      this.noFlag = false;
      localStorage.removeItem("keyword");
    },
    goSearch(keyword) {
      this.loading = true;
      this.keyword = keyword;
      this.$api.getSearch(keyword).then(res => {
        this.searchS = res.data.data;
        if (res.data.data.length == 0) {
          this.noFlag = true;
        } else {
          this.noFlag = false;
        }
        if (res.data.data.length < 10) {
          this.addF = false;
        } else {
          this.page = this.page + 1;
          this.addF = true;
        }
      });
    },
    loadMore() {
      this.skip = this.page * this.take;
      this.$api.getSearch(this.keyword, this.skip).then(res => {
        this.searchS.concat(res.data.data);
        if (res.data.data.length < 10) {
          this.addF = false;
        } else {
          this.page = this.page + 1;
          this.addF = true;
        }
      });
    },
    getTitle(key, str) {
      return str.replace(new RegExp(`${key}`, "g"), `%%${key}%%`).split("%%");
    },
    goDetail(type, id) {
      // 跳转展品详情
      if (type == 100) {
        this.$router.push({ path: "/cDetail", query: { id: id } });
      }
      // 跳转展厅详情
      if (type == 101) {
        this.$router.push({ path: "/eDetail", query: { id: id } });
      }
      // 跳转咨询详情
      if (type == 102) {
        this.$router.push({ path: "/adetail", query: { id: id } });
      }
      // 跳转活动详情
      if (type == 103) {
        this.$router.push({
          path: "/active/activedetail",
          query: { active_id: id }
        });
      }
    }
  },
  created() {
    this.getHots();
    this.keyword = localStorage.keyword || "";
  }
};
</script>
<style lang="scss" scoped>
.search-top {
  position: relative;
  padding: 10px;
}
.search-top i.iconsearch {
  font-size: 20px;
  position: absolute;
  top: 50%;
  margin-top: -10px;
  left: 25px;
}
.search-top .input {
  border: 1px solid #b68540;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  font-size: 12px;
  width: 84%;
  text-indent: 40px;
  overflow: hidden;
  display: inline-block;
}
.input input {
  outline: 0 none;
  background: #fff;
  border: 0 none;
  width: 90%;
  height: 100%;
}
.btn-close {
  position: absolute;
  top: 50%;
  left: 72%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  line-height: 20px;
  color: #999;
  margin-top: -10px;
  text-align: center;
}

input:focus {
  outline: 0 none;
}
.search .btns {
  float: right;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  margin-right: 15px;
  color: #999;
}
.search-main {
  padding: 10px;
}
.search-main h3 {
  font-size: 15px;
  color: rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
}
.hot {
  overflow: hidden;
}
.hot li {
  font-size: 13px;
  height: 30px;
  line-height: 30px;
  padding: 0 16px;
  text-align: center;
  border-radius: 20px;
  color: #000;
  float: left;
  border: 1px solid #bfbfbf;
  margin: 0 10px 20px 0;
}
.search-wrapper {
  margin: 0 10px;
}
.search-wrapper li {
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  position: relative;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 50px;
}
.search-wrapper span.types {
  display: inline-block;
  border: 1px solid #b68540;
  color: #000;
  position: absolute;
  top: 50%;
  left: 5px;
  height: 24px;
  line-height: 20px;
  transform: translateY(-50%);
  padding: 2px 4px;
  font-size: 12px;
  border-radius: 2px;
}
.search-wrapper .active {
  color: #b68540;
}
.no {
  width: 300px;
  margin: 0px auto;
}
.no img {
  padding-top: 40px;
  display: block;
  width: 250px;
  margin: 0 auto;
}
.no p {
  color: #929292;
  width: 200px;
  margin: 40px auto;
  font-size: 12px;
  text-align: center;
}
</style>