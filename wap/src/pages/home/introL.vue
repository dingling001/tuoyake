<template>
  <div class="container">
    <div class="topbar">
      <router-link :to="{path:'/intro'}">{{$t('g')}}</router-link>
      <router-link :to="{path:'/introL'}" class="active">{{$t('zixun')}}</router-link>
      <router-link :to="{path:'/about'}">{{$t('about')}}</router-link>
    </div>
    <div class="main-content">
      <div class="menu">
        <div class="btn" :class="{'active':curs==0}" @click="showMedia(0)">海博资讯</div>
        <div class="btn" :class="{'active':curs==1}" @click="showMedia(1)">媒体报道</div>
      </div>
      <div class="search-top">
        <ul v-if="listS.length>0">
          <li v-for="(item,index) in listS" :key="index" @click="goDetail(item.article_id)">
            <img :src="$toThumbsimg(item.img,292,176,33,$web)" alt />
            <div class="news-items">
              <h3>{{item.title.length>16?item.title.substring(0,16)+'...':item.title}}</h3>
              <p>{{item.created_at}}</p>
            </div>
          </li>
        </ul>
        <div class="no" v-if="noFlag">
          <img src="../../img/noSearch.png" alt />
          <p>暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
    }
  },
  mounted() {
    this.getList(1);
  },
  methods: {
    go() {
      this.$router.push("/intro");
    },
    showMedia(index) {
      this.curs = index;
      if (index == 0) {
        return this.getList(1);
      }
      this.getList(5);
    },
    goDetail(id) {
      this.$router.push({
        path: "/adetail",
        query: {
          id: id
        }
      });
    },
    getList(type) {
      this.$api.getAd(0, 20, type, 0).then(res => {
        this.listS = res.data.reverse();
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
.container {
  width: 100%;
  margin: 0 auto;
  background: #f5f5f5;
  height: 100%;
}
.topbar {
  height: 47px;
  line-height: 42px;
  font-size: 15px;
  text-align: center;
  background: #fff;
}
.topbar a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
  width: 120px;
  padding: 5px 10px 0;
  display: inline-block;
  text-align: center;
}
.topbar a:last-child {
  margin-right: 0;
}
.topbar a.active {
  position: relative;
  color: #000;
  z-index: 1;
  font-size: 18px;
  font-weight: 600;
}
.topbar a.active:after {
  content: "";
  width: 36px;
  height: 3px;
  background: #b47c2d;
  border-radius: 2px;
  z-index: -1;
  position: absolute;
  border-radius: 1.5px;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
}
.title {
  width: 100%;
  margin: 0px auto 40px;
}
.title h3 {
  width: 190px;
  margin: 0 auto;
  padding: 0 30px 10px;
  font-weight: 400;
  color: #000;
  font-size: 26px;
  border-bottom: 2px solid #b47c2d;
}
.menu {
  height: 40px;
  line-height: 40px;
  margin: 0 0;
  text-align: center;
  border-bottom: 1px solid #b2b2b2;
  /*no*/
}
.menu .btn {
  font-size: 15px;
  color: #000;
  width: 92px;
  float: left;
  text-align: center;
  cursor: pointer;
  margin-left: 60px;
  border-bottom: 1px solid transparent;
  /*no*/
  margin-bottom: 1px;
  /* px */
}
.menu span {
  float: right;
  cursor: pointer;
  color: #6b6b6b;
}
.menu .btn.active {
  color: #b37b2d;
  position: relative;
  &::after {
    content: "";
    width: 100%;
    height: 2px;
    /* px */
    border-radius: 1px;
    background: #b37b2d;
    position: absolute;
    bottom: 1px;
    left: 0;
  }
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
.search-top ul {
  padding: 0 12px;
  margin: 9px 0 30px 0;
}
.search-top ul li {
  display: flex;
  padding-bottom: 9px;
  margin-bottom: 9px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  /*no*/
  cursor: pointer;
  &:last-child {
    border: 0 none;
  }
  img {
    width: 146px;
    height: 88px;
    border-radius: 5px;
    display: block;
  }
  .news-items {
    flex: 1;
    margin-left: 10px;
    h3 {
      font-weight: 500;
      line-height: 24px;
      /*px*/
      font-size: 15px;
      /*px*/
      color: rgba(0, 0, 0, 0.9);
      min-height: 48px;
      /*px*/
      text-align: justify;
    }
    p {
      font-size: 12px;
      /*px*/
      color: rgba(0, 0, 0, 0.6);
      margin-top: 28px;
    }
  }
}
</style>