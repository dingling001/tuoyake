<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">{{$t('navs[0].name')}}</a>
        »
        <a href="javaScript:;">{{$t('navs[4].name')}}</a>
      </div>
    </div>

    <div class="container">
      <!-- 第一版块 -->
      <div class="container-item" v-if="false">
        <div class="swiper-container banner">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item,index) in banners"
              :key="index"
              @click="goDetail(item.exhibit_id)"
            >
              <img :src="item.exhibit_list_img" alt />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="main">
        <div class="search-top">
          <el-select class="select" v-model="exhibition_id" :placeholder="hall">
            <el-option
              v-for="item in list"
              :key="item.exhibition_id"
              :label="item.exhibition_name"
              :value="item.exhibition_id"
            ></el-option>
          </el-select>
          <el-select class="cate" v-model="cate_id" :placeholder="cates">
            <el-option
              v-for="item in cate"
              :key="item.cate_id"
              :label="item.cate_name"
              :value="item.cate_id"
            ></el-option>
          </el-select>
          <input class="input" v-model="keyword" :placeholder="$t('pla')" @keyup.enter="goE" />
          <span class="search" @click="goE">{{$t('search')}}</span>
          <span class="cancel" @click="cancel">{{$t('reset')}}</span>
        </div>
        <div class="main-content">
          <h3 class="travel" v-if="api_token!=''" @click="goCenter">查看我的行程单( {{count}} )～</h3>
          <ul class="collections" v-if="lists.length>0">
            <li v-for="(item,index) in lists" :key="index" @click="goDetail(item.exhibit_id)">
              <img :src="item.exhibit_list_img" alt />
              <h3>{{item.exhibit_name}}</h3>
              <p>{{item.exhibition_name}}</p>
              <p>
                <span class="look">
                  <i class="iconfont iconeyes"></i>
                  {{item.look_num}}
                </span>
                <span class="like">
                  <i class="iconfont iconthumbs-up"></i>
                  {{item.like_num}}
                </span>
              </p>
              <div
                class="join"
                @click.stop="addT(item.exhibit_id,item)"
                v-if="$t('news')&&item.is_traveled==0"
              >
                <i class="iconfont iconaddTodo-nav"></i>
                <span>加入行程单</span>
              </div>
              <div
                class="join2"
                v-if="$t('news')&&item.is_traveled==1"
                @click.stop="addT(item.exhibit_id,item)"
              >
                <i
                  class="iconfont"
                  :class="{'iconjian1':item.is_traveled==1,'iconaddTodo-nav':item.is_traveled==0}"
                ></i>
                <span>取消行程单</span>
              </div>
            </li>
          </ul>
          <div class="no" v-if="noFlag">
            <img src="../../img/noSearch.png" alt />
            <p>{{$t('noD')}}</p>
          </div>
          <page :totalPages="totalPage" @presentPage="changePage" v-if="totalPage>1"></page>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import page from "../../components/pcpaging.vue";
import Swiper from "swiper";
export default {
  name: "home",
  data() {
    return {
      addF: false,
      api_token: localStorage.api_token ? localStorage.api_token : "",
      count: 0,
      banners: [],
      keyword: "",
      noFlag: false,
      language: localStorage.l ? localStorage.l : 1,
      list: [],
      lists: [],
      exhibition_id: "",
      cate_id: "",
      cate: [],
      skip: 0,
      take: 12,
      totalPage: "",
      travels: []
    };
  },
  inject: ["app"],
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
  computed: {
    hall: function() {
      return this.$t("allHall");
    },
    cates: function() {
      return this.$t("cate");
    }
  },
  mounted() {
    // this.initSwiper();
    if (localStorage.api_token) {
      this.getCount();
    }
    this.getList();
    this.getCate();
    this.getExList(
      this.skip,
      this.take,
      this.exhibition_id,
      this.cate_id,
      this.keyword
    );
  },
  watch: {
    exhibition_id: function(val) {
      this.skip = 0;
      this.getExList(
        this.skip,
        this.take,
        this.exhibition_id,
        this.cate_id,
        this.keyword
      );
    },
    cate_id: function(val) {
      this.skip = 0;
      this.getExList(
        this.skip,
        this.take,
        this.exhibition_id,
        this.cate_id,
        this.keyword
      );
    }
  },
  methods: {
    getCount() {
      this.$api.getC().then(res => {
        this.travels = res.data;
        this.travels.map((item, index) => {
          this.count += item.exhibit_count;
        });
      });
    },
    goCenter() {
      this.$router.push("center");
      window.scroll(0, 0);
    },
    // 重置搜索
    cancel() {
      this.keyword = "";
      this.exhibition_id = "";
      this.cate_id = "";
      this.skip = 0;
      this.getExList(
        this.skip,
        this.take,
        this.exhibition_id,
        this.cate_id,
        this.keyword
      );
    },
    // 获取顶部轮播
    initSwiper() {
      this.$api.getCBanner().then(res => {
        this.banners = res.data;
        if (res.data.length > 5) {
          this.banners = this.banners.splice(0, 5);
        }
        if (this.banners.length > 1) {
          setTimeout(() => {
            let swiper = new Swiper(".banner", {
              loop: true,
              autoplay: 3000,
              effect: "fade",
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
    addT(id, item) {
      if (localStorage.api_token == "" || localStorage.api_token == undefined) {
        this.app.openLogin();
        return false;
      }
      if (item.is_traveled == 1) {
        this.$api.cancelTravel(id).then(res => {
          if (res.status == 1) {
            item.is_traveled = 0;
            if (this.count > 1) {
              this.count = this.count - 1;
              return false;
            }
            this.count = 0;
          }
        });
      } else {
        this.$api.addTravel(id).then(res => {
          if (res.status == 1) {
            item.is_traveled = 1;
            this.count = this.count + 1;
          }
        });
      }
    },
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
      this.skip = (val - 1) * this.take;
      this.getExList(
        this.skip,
        this.take,
        this.exhibition_id,
        this.cate_id,
        this.keyword
      );
    },
    // 跳转详情页
    goDetail(id) {
      this.$router.push({ path: "/cDetail", query: { id: id } });
    },
    // 获取所有展厅接口
    getList() {
      this.$api.getExAll().then(res => {
        this.list = res.data;
        this.list.unshift({ exhibition_id: "", exhibition_name: this.hall });
      });
    },
    // 获取分类接口
    getCate() {
      this.$api.getCate().then(res => {
        this.cate = res.data;
        this.cate.unshift({ cate_id: "", cate_name: this.cates });
      });
    },
    // 获取展品列表
    getExList(skip, take, exhibition_id, cate_id, keyword) {
      this.$api
        .getEl(
          localStorage.l,
          skip,
          take,
          exhibition_id,
          "",
          cate_id,
          keyword,
          "",
          1
        )
        .then(res => {
          this.lists = res.data.exhibit;
          if (res.data.exhibit.length <= 0) {
            this.noFlag = true;
          } else {
            this.noFlag = false;
          }
          this.totalPage = Math.floor(res.data.counts / this.take) + 1;
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
.banner {
  width: 100%;
  height: 668px;
}
.swiper-container img {
  width: 100%;
  height: 100%;
}
.swiper-pagination {
  width: 100%;
  margin-top: -30px;
}
.banner .swiper-pagination /deep/ .swiper-pagination-bullet {
  background: transparent;
  width: 18px;
  height: 18px;
  padding: 4px;
  border: 1px solid #b47c2d;
  position: relative;
}
.banner .swiper-pagination /deep/ .swiper-pagination-bullet:after {
  content: "";
  width: 10px;
  height: 10px;
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
  border-radius: 50%;
}
.swiper-pagination /deep/ .swiper-pagination-bullet:focus {
  outline: 0 none;
}
.banner .swiper-pagination /deep/ .swiper-pagination-bullet-active:after {
  background: #b47c2d;
}
.main {
  width: 1200px;
  margin: 0 auto;
  padding: 30px 0;
}
.search-top {
  white-space: nowrap;
}
.select {
  font-size: 18px;
  width: 260px;
}

option {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border: none;
  outline: none;
  /*很关键：将默认的select选择框样式清除*/
  /*将背景改为红色*/
  background: #fff;
}
option:hover {
  background: #b47c2d;
  color: #fff;
}
.cate {
  margin: 0 14px;
  height: 50px;
  line-height: 50px;
}
input {
  width: 365px;
  margin-right: 16px;
  text-indent: 10px;
  border: 1px solid #bfbfbf;
  font-size: 18px;
  height: 50px;
  line-height: 50px;
  border-radius: 4px;
  &:focus {
    border-color: #b47c2d;
  }
}
.select /deep/ .el-input__inner,
.cate /deep/ .el-input__inner {
  border: 1px solid #bfbfbf;
  font-size: 18px;
  height: 50px;
  line-height: 50px;
}
.select /deep/ .el-input.is-focus .el-input__inner,
.cate /deep/ .el-input.is-focus .el-input__inner {
  border-color: #b47c2d;
}
.el-select-dropdown__item.selected {
  color: #b47c2d !important;
}
.search {
  width: 110px;
  height: 50px;
  display: inline-block;
  line-height: 48px;
  color: #fff;
  text-align: center;
  font-size: 18px;
  margin-right: 16px;
  background: rgba(180, 124, 45, 1);
  border: 2px solid rgba(180, 124, 45, 1);
  cursor: pointer;
  border-radius: 4px;
}
.cancel {
  width: 110px;
  height: 50px;
  background: rgba(168, 124, 62, 0.4);
  border: 2px solid transparent;
  color: #000;
  font-size: 18px;
  line-height: 48px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  border-radius: 4px;
}
.main-content {
  padding: 30px 0;
  h3.travel {
    height: 60px;
    line-height: 60px;
    border-radius: 30px;
    background: #ffffff;
    text-align: right;
    font-size: 18px;
    color: #b47c2d;
    display: block;
    margin: 0 0px 20px 0;
    padding-right: 20px;
    box-shadow: 0px 3px 9px 0px rgba(0, 0, 0, 0.09);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    &:after {
      content: "";
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      top: -12px;
      border-top: 1px solid #b47c2d;
    }
  }
}
.collections {
  overflow: hidden;
  margin-bottom: 40px;
}
.collections li {
  width: 290px;
  float: left;
  padding-bottom: 5px;
  margin-bottom: 10px;
  margin-right: 13.3px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  background: #f5f5f5;
  cursor: pointer;
  .join2 {
    width: 22px;
    height: 26px;
    background: url(../.././img/home/cancel.png) no-repeat;
    background-size: contain;
    border-radius: 4px;
    line-height: 32px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    position: absolute;
    white-space: nowrap;
    top: 10px;
    left: 10px;
    span {
      display: none;
      position: absolute;
      left: 30px;
      color: #fff;
      top: 0;
    }
    &:hover span {
      display: block;
    }
  }
  .join {
    width: 32px;
    height: 32px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 50%;
    line-height: 32px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    position: absolute;
    white-space: nowrap;
    top: 10px;
    right: 10px;
    cursor: pointer;
    display: none;
    i {
      transition: all 1s ease-in;
    }
    span {
      display: none;
      position: absolute;
      right: 40px;
      color: #fff;
      top: 0;
      font-size: 14px;
    }
    &:hover span {
      display: inline-block;
    }
    &:hover i {
      animation: rotate ease 1s;
    }
  }
  &:hover {
    .join {
      display: block;
    }
  }
  .d3 {
    width: 32px;
    height: 32px;
    line-height: 32px;
    white-space: nowrap;
    padding-left: 10px;
    text-align: center;
    background: rgba(165, 110, 34, 1);
    border-radius: 20px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    position: absolute;
    top: 10px;
    left: 10px;
    transition: all 300ms ease-in-out;
    span {
      display: none;
    }
    &:hover {
      width: 117px;
    }
    &:hover span {
      display: inline-block;
    }
  }
}
.collections li:nth-child(4n) {
  margin-right: 0;
}
.collections li img {
  width: 290px;
  height: 290px;
  background: #e5e5e5;
  border-radius: 4px 4px 0px 0px;
}
.collections li h3 {
  font-size: 18px;
  color: #353535;
  margin: 16px 20px 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.collections li p {
  padding-bottom: 10px;
  font-size: 16px;
  margin: 0 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
</style>